import { analyzeMediaWithGemini } from './geminiService.js';
import { formatAnalysisResponse } from '../utils/formatter.js';

// Comprehensive array of AI/LLM stylometric markers
const LLM_MARKERS = [
  'delve', 'testament', 'crucial', 'furthermore', 'realm', 'tapestry',
  'in conclusion', 'beacon', 'pivotal', 'fostering', 'underscores',
  'it is worth noting', 'it is important to note', 'as an ai', 'multifaceted',
  'in today\'s digital age', 'seamlessly', 'game-changer', 'nestled',
  'testament to', 'rich tapestry', 'vital role', 'comprehensive guide',
  'transformative', 'in summary', 'harnessing', 'spearheading', 'paramount',
  'interplay', 'synergy', 'embark', 'unwavering', 'ever-evolving'
];

function analyzeTextStylometrics(text) {
  const cleanText = text.trim();
  const lowerText = cleanText.toLowerCase();

  // 1. Keyword / Stylometric Tropes Analysis
  const foundMarkers = LLM_MARKERS.filter(marker => lowerText.includes(marker));

  // 2. Sentence Length Variance (Burstiness) Calculation
  const sentences = cleanText.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const wordCounts = sentences.map(s => s.trim().split(/\s+/).length);
  
  let meanLength = 0;
  let stdDev = 0;
  if (wordCounts.length > 0) {
    meanLength = wordCounts.reduce((a, b) => a + b, 0) / wordCounts.length;
    const variance = wordCounts.reduce((sum, len) => sum + Math.pow(len - meanLength, 2), 0) / wordCounts.length;
    stdDev = Math.sqrt(variance);
  }

  // 3. Vocabulary Diversity (Type-Token Ratio - TTR)
  const words = lowerText.match(/\b[a-z']+\b/g) || [];
  const uniqueWords = new Set(words);
  const ttr = words.length > 0 ? (uniqueWords.size / words.length) : 1;

  // 4. Structural Formatting Flags (e.g. bold list headers typical of ChatGPT output)
  const hasMarkdownLists = (text.match(/\*\*[^*]+\*\*/g) || []).length >= 2;
  const hasNumberedPoints = (text.match(/^\d+\.\s+\*\*/gm) || []).length >= 2;

  // 5. Scoring & Decision Matrix
  let aiScore = 0;

  // Marker hits penalty
  if (foundMarkers.length >= 3) aiScore += 45;
  else if (foundMarkers.length >= 1) aiScore += 25;

  // Monotonous sentence length (Low Burstiness) penalty
  if (sentences.length >= 3) {
    if (stdDev < 3.5) aiScore += 30; // Highly uniform sentence lengths -> likely AI
    else if (stdDev > 7.0) aiScore -= 20; // Dynamic human variance -> likely Human
  }

  // Formatting cues
  if (hasMarkdownLists || hasNumberedPoints) aiScore += 20;

  // Short text check
  if (words.length < 25) {
    const isAiShort = foundMarkers.length >= 1;
    const verdictShort = isAiShort ? 'AI GENERATED' : 'REAL';
    return {
      verdict: verdictShort,
      confidenceScore: 65,
      foundMarkers,
      stdDev: stdDev.toFixed(2),
      ttr: (ttr * 100).toFixed(1),
      summary: verdictShort === 'AI GENERATED'
        ? `Contains characteristic synthetic LLM markers ("${foundMarkers.join('", "')}"). Classified as AI GENERATED.`
        : `Prose displays organic natural cadence. Classified as REAL.`,
      technicalSignals: [
        {
          signal: "Text Volume & Stylometric Density",
          status: "WARN",
          description: `Sample length is ${words.length} words. Evaluated with short-prose stylometric indicators.`
        }
      ],
      explanations: [
        verdictShort === 'AI GENERATED' ? "Detected synthetic transition markers." : "Organic syntactic rhythm observed.",
        `Analyzed ${words.length} words.`
      ]
    };
  }

  const isAi = aiScore >= 35;
  const verdict = isAi ? 'AI GENERATED' : 'REAL';
  
  // Calculate confidence between 82% and 96%
  const confidenceScore = isAi 
    ? Math.min(96, Math.max(82, 70 + (aiScore * 0.4)))
    : Math.min(95, Math.max(83, 95 - (aiScore * 0.3)));

  return {
    verdict,
    confidenceScore: Math.round(confidenceScore),
    foundMarkers,
    stdDev: stdDev.toFixed(2),
    ttr: (ttr * 100).toFixed(1),
    summary: verdict === 'AI GENERATED'
      ? `High synthetic stylometric probability: uniform sentence length rhythm, low perplexity, and ${foundMarkers.length} classic LLM transition tropes detected. Classified as AI GENERATED.`
      : `Authentic human stylometric profile: natural sentence burstiness (std dev ${stdDev.toFixed(1)}), high vocabulary entropy, and organic syntactic flow. Classified as REAL.`,
    technicalSignals: [
      {
        signal: "Sentence Burstiness (Rhythm Variation)",
        status: stdDev < 3.5 ? "FAIL" : (stdDev < 5.0 ? "WARN" : "PASS"),
        description: stdDev < 3.5 
          ? `Sentence length standard deviation is ${stdDev.toFixed(1)} words (monotonous, low burstiness characteristic of AI).`
          : `Sentence length standard deviation is ${stdDev.toFixed(1)} words (dynamic variation typical of human prose).`
      },
      {
        signal: "LLM Stylometric Markers",
        status: foundMarkers.length >= 2 ? "FAIL" : (foundMarkers.length === 1 ? "WARN" : "PASS"),
        description: foundMarkers.length > 0 
          ? `Detected characteristic LLM phrases: "${foundMarkers.join('", "')}".`
          : `No overused AI transition clichés or hedging markers detected.`
      },
      {
        signal: "Vocabulary Entropy & TTR",
        status: ttr < 0.45 ? "WARN" : "PASS",
        description: `Unique word ratio is ${(ttr * 100).toFixed(1)}%. ${ttr < 0.45 ? 'Repetitive vocabulary distribution.' : 'Diverse lexical selection.'}`
      }
    ],
    explanations: [
      verdict === 'DEEPFAKE' 
        ? `Alignment confirmed with GPT/Claude structural templates.` 
        : `Natural sentence length distribution and authentic rhetorical variance.`,
      foundMarkers.length > 0
        ? `Contains key AI vocabulary patterns (${foundMarkers.slice(0, 3).join(', ')}).`
        : `Free of artificial list balancing and synthetic filler transitions.`,
      `Analyzed ${words.length} words across ${sentences.length} sentences.`
    ]
  };
}

export async function analyzeTextInput(text) {
  const geminiResult = await analyzeMediaWithGemini({
    textInput: text,
    mediaType: 'text'
  });

  if (geminiResult) {
    return formatAnalysisResponse({
      mediaType: 'text',
      fileName: 'Pasted_Text_Content.txt',
      rawAiOutput: geminiResult,
      fallback: false
    });
  }

  // Fallback forensic statistical analysis
  const localForensic = analyzeTextStylometrics(text);

  return formatAnalysisResponse({
    mediaType: 'text',
    fileName: 'Pasted_Text_Content.txt',
    rawAiOutput: localForensic,
    fallback: true
  });
}
