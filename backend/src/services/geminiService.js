import fs from 'fs';
import { getGeminiClient, isGeminiConfigured } from '../config/gemini.js';
import { buildPromptForMediaType } from '../utils/promptBuilder.js';
import { logger } from '../utils/logger.js';

function parseGeminiJsonOutput(rawText) {
  if (!rawText) return null;

  // Remove markdown code fences if present
  let cleaned = rawText.replace(/```json/gi, '').replace(/```/g, '').trim();

  // Try parsing directly
  try {
    return JSON.parse(cleaned);
  } catch (e) {
    // If direct parse fails, try extracting first valid JSON object via regex
    const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      try {
        return JSON.parse(jsonMatch[0]);
      } catch (innerErr) {
        logger.error('Failed to parse extracted JSON block from Gemini output:', innerErr.message);
      }
    }
  }
  return null;
}

export async function analyzeMediaWithGemini({ filePath, mimeType, textInput, mediaType }) {
  if (!isGeminiConfigured()) {
    logger.info(`Running ${mediaType} analysis in SACHAI Advanced Fallback Mode.`);
    return null; // Signals controller/analyzer to use fallback forensic heuristics
  }

  const ai = getGeminiClient();
  const prompt = buildPromptForMediaType(mediaType);

  let contents = [];
  if (textInput) {
    contents = [prompt, `\n\nText Content to Evaluate:\n"${textInput}"`];
  } else if (filePath && fs.existsSync(filePath)) {
    const fileBuffer = fs.readFileSync(filePath);
    const base64Data = fileBuffer.toString('base64');

    contents = [
      prompt,
      {
        inlineData: {
          mimeType,
          data: base64Data
        }
      }
    ];
  } else {
    logger.error(`Invalid input provided for ${mediaType} Gemini analysis.`);
    return null;
  }

  // Model fallback candidate list for @google/generative-ai SDK
  const modelsToTry = ['gemini-1.5-flash', 'gemini-1.5-flash-latest', 'gemini-2.0-flash-exp', 'gemini-1.5-pro-latest'];

  for (const modelName of modelsToTry) {
    try {
      const model = ai.getGenerativeModel({ model: modelName });
      const result = await model.generateContent(contents);
      const response = await result.response;
      const textOutput = response.text() || '';

      logger.info(`Gemini response successfully received using model [${modelName}] for ${mediaType}`);

      const parsedJson = parseGeminiJsonOutput(textOutput);
      if (parsedJson && parsedJson.verdict && parsedJson.confidenceScore !== undefined) {
        return parsedJson;
      }
    } catch (err) {
      logger.warn(`Gemini API call with model [${modelName}] failed for ${mediaType}: ${err.message}`);
    }
  }

  logger.error(`All Gemini model candidates failed for ${mediaType}. Falling back to forensic heuristics.`);
  return null;
}
