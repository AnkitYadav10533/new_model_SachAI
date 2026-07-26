export function formatAnalysisResponse({
  mediaType,
  fileName = 'input_content',
  rawAiOutput = {},
  fallback = false
}) {
  let rawVerdict = (rawAiOutput.verdict || '').toUpperCase().trim();
  const confidenceScore = Math.min(100, Math.max(0, parseInt(rawAiOutput.confidenceScore || 85, 10)));
  
  // Strictly map all outputs to binary classification: "AI GENERATED" vs "REAL"
  let verdict = 'REAL';
  if (
    rawVerdict === 'AI GENERATED' ||
    rawVerdict === 'AI_GENERATED' ||
    rawVerdict === 'DEEPFAKE' ||
    rawVerdict === 'SYNTHETIC' ||
    rawVerdict === 'AI'
  ) {
    verdict = 'AI GENERATED';
  } else if (
    rawVerdict === 'REAL' ||
    rawVerdict === 'AUTHENTIC' ||
    rawVerdict === 'HUMAN'
  ) {
    verdict = 'REAL';
  } else {
    // If ambiguous or UNCERTAIN, resolve to binary choice based on confidence score threshold
    verdict = confidenceScore >= 50 && rawAiOutput.aiProbability > 50 ? 'AI GENERATED' : (confidenceScore < 50 ? 'AI GENERATED' : 'REAL');
  }

  const authenticityPercentage = verdict === 'REAL' 
    ? confidenceScore 
    : (100 - confidenceScore);

  const aiGeneratedProbability = 100 - authenticityPercentage;

  return {
    success: true,
    mediaType,
    fileName,
    verdict, // Binary: "AI GENERATED" | "REAL"
    confidenceScore,
    authenticityPercentage,
    aiGeneratedProbability,
    summary: rawAiOutput.summary || `Analysis complete for ${fileName}. Verdict: ${verdict}.`,
    technicalSignals: Array.isArray(rawAiOutput.technicalSignals) ? rawAiOutput.technicalSignals : [],
    explanations: Array.isArray(rawAiOutput.explanations) ? rawAiOutput.explanations : [],
    metadata: rawAiOutput.metadata || {
      analyzedAt: new Date().toISOString(),
      engine: fallback ? 'SACHAI Forensic Rules Engine' : 'Google Gemini Multimodal AI Engine'
    },
    timestamp: new Date().toISOString()
  };
}
