export function buildPromptForMediaType(mediaType) {
  const commonSchema = `
Return ONLY a valid, raw JSON object (no markdown fences, no text outside JSON). Follow this exact JSON schema:
{
  "verdict": "AI GENERATED" | "REAL",
  "confidenceScore": number (integer between 0 and 100),
  "summary": "Concise executive summary explaining why the content was classified as AI GENERATED or REAL.",
  "technicalSignals": [
    {
      "signal": "Forensic Signal Name",
      "status": "PASS" | "WARN" | "FAIL",
      "description": "Specific forensic observation."
    }
  ],
  "explanations": [
    "Key observation point 1",
    "Key observation point 2"
  ]
}
CRITICAL RULE: The "verdict" field MUST BE STRICTLY EITHER "AI GENERATED" OR "REAL". No other values are permitted.
`;

  switch (mediaType) {
    case 'image':
      return `You are SACHAI Engine, an expert AI Image & Deepfake Forensic Classifier.
Classify whether this image is "AI GENERATED" (created by Midjourney, Stable Diffusion, DALL-E, Flux, Photoshop Generative Fill, FaceSwap) or "REAL" (photographed by a real camera/sensor).

Evaluate:
1. Specular & Optical Physics: Eye catchment reflection alignment, shadow vector consistency, sub-surface skin scattering.
2. Anatomical Precision: Iris geometry, finger/nail count, earlobe structure, hair strand integration.
3. Frequency & Diffusion Signatures: Micro-blurring along edges, high-frequency checkerboard grid artifacts, over-smoothed skin textures.
4. Background Geometry: Warped perspective, melted background objects, illegal geometry.

- If AI generation signatures are detected, set verdict to "AI GENERATED" (confidence 85-99).
- If natural camera optics, authentic sensor noise, and genuine lighting are present, set verdict to "REAL" (confidence 85-99).

${commonSchema}`;

    case 'video':
      return `You are SACHAI Engine, an expert Video Deepfake Classifier.
Classify whether this video/frame sequence is "AI GENERATED" (Sora, Runway, Pika, Kling, DeepFaceLab face swap, Wav2Lip) or "REAL" (genuine video capture).

Evaluate:
1. Temporal Continuity: Seam flickering around jawlines and hairline.
2. Lip-Sync & Viseme Alignment: Mouth shape timing vs speech acoustics.
3. Ocular & Facial Dynamics: Natural eye blink rate and micro-expressions.

- If deepfake/synthetic video markers exist, set verdict to "AI GENERATED".
- If natural camera motion and facial dynamics exist, set verdict to "REAL".

${commonSchema}`;

    case 'audio':
      return `You are SACHAI Engine, an expert Audio & Synthetic Voice Classifier.
Classify whether this audio file is "AI GENERATED" (ElevenLabs, VALL-E, TTS, voice clone) or "REAL" (authentic human speech recording).

Evaluate:
1. Spectral Continuity: High-frequency cut-offs (8kHz/16kHz), robotic pitch quantization.
2. Respiration & Cadence: Natural breath pauses, pitch modulation, background acoustic floor continuity.

- If voice cloning or robotic harmonics exist, set verdict to "AI GENERATED".
- If natural respiration and vocal tract resonance exist, set verdict to "REAL".

${commonSchema}`;

    case 'text':
      return `You are SACHAI Engine, an expert LLM Text Classifier.
Classify whether this text is "AI GENERATED" (written by ChatGPT, GPT-4, Claude, Gemini, LLMs) or "REAL" (written by a human).

Evaluate:
1. Burstiness & Rhythm: Uniform sentence length distribution (low standard deviation = AI GENERATED).
2. LLM Transition Markers: Overuse of AI transition tropes ("delve", "testament", "realm", "tapestry", "crucial", "furthermore", "beacon", "multifaceted").
3. Perplexity & Syntactic Diversity.

- If uniform sentence length, low perplexity, or 2+ LLM tropes exist, set verdict to "AI GENERATED".
- If high sentence length variance, authentic human voice, and organic rhythm exist, set verdict to "REAL".

${commonSchema}`;

    default:
      return `Classify content as "AI GENERATED" or "REAL". ${commonSchema}`;
  }
}
