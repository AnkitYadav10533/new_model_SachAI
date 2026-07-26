# SACHAI API Specification

Base URL: `http://localhost:5000/api`

---

## Endpoints

### 1. Health Check
- **GET** `/health`
- **Response**:
```json
{
  "status": "online",
  "timestamp": "2026-07-26T14:30:00Z",
  "service": "SACHAI Backend",
  "geminiConfigured": true
}
```

---

### 2. Image Authenticity Analysis
- **POST** `/analyze/image`
- **Content-Type**: `multipart/form-data`
- **Body**: `file` (Image: JPEG, PNG, WEBP, GIF, max 10MB)
- **Response**:
```json
{
  "success": true,
  "mediaType": "image",
  "fileName": "sample.png",
  "verdict": "AUTHENTIC" | "DEEPFAKE" | "UNCERTAIN",
  "confidenceScore": 88,
  "authenticityPercentage": 88,
  "aiGeneratedProbability": 12,
  "summary": "High likelihood of authentic camera capture with consistent lighting.",
  "technicalSignals": [
    {
      "signal": "Lighting & Shadows",
      "status": "PASS",
      "description": "Natural ray tracing and highlight directions across objects."
    },
    {
      "signal": "Pixel Artifacts",
      "status": "PASS",
      "description": "No checkerboard patterns typical of GAN/Diffusion generators."
    }
  ],
  "explanations": [
    "Consistent EXIF metadata structure detected.",
    "Natural skin texture details without over-smoothing."
  ],
  "timestamp": "2026-07-26T14:30:00Z"
}
```

---

### 3. Video Authenticity Analysis
- **POST** `/analyze/video`
- **Content-Type**: `multipart/form-data`
- **Body**: `file` (Video: MP4, WEBM, MOV, max 50MB)
- **Response**: Similar format with video-specific temporal analysis.

---

### 4. Audio Authenticity Analysis
- **POST** `/analyze/audio`
- **Content-Type**: `multipart/form-data`
- **Body**: `file` (Audio: MP3, WAV, OGG, max 20MB)
- **Response**: Similar format with acoustic voice clone metrics.

---

### 5. Text Authenticity Analysis
- **POST** `/analyze/text`
- **Content-Type**: `application/json`
- **Body**: `{ "text": "Content to evaluate..." }`
- **Response**: Similar format with LLM perplexity and stylometry scores.
