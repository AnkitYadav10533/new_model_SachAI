# SACHAI Architecture & System Design

```
User (Browser)
     │
     ▼
React + Vite Frontend (Render / Vercel)
     │
 REST API (HTTPS)
     ▼
Node.js + Express Backend (Render)
     │
 ┌───┴─────────────────────────┐
 │ Upload Validation & Multer  │
 └───┬─────────────────────────┘
     │
 ┌───┴─────────────────────────┐
 │ Prompt Builder & Formatters │
 └───┬─────────────────────────┘
     │
     ▼
Gemini 2.5 Flash Multimodal Engine
     │
     ▼
Structured JSON Analysis Response
```

## System Components

### 1. Frontend Client
- **Tech Stack**: React, Vite, React Router, Axios, Lucide Icons, Custom Glassmorphism CSS design system.
- **Responsibilities**: File drag-and-drop, client-side format & size validation, media preview playback, asynchronous analysis requests, animated confidence meter rendering, and interactive signal explanation displays.

### 2. Express Backend API
- **Tech Stack**: Node.js, Express, Multer, dotenv, CORS, `@google/genai` SDK.
- **Responsibilities**: Multipart form parsing, media format validation, payload chunking, prompt engineering for deepfake analysis, calling Gemini 2.5 Flash, parsing structured JSON responses, clean error handling, and file cleanup.

### 3. Gemini Multimodal Analysis Engine
- **Model**: `gemini-2.5-flash` / `gemini-1.5-flash`
- **Capabilities**:
  - Image: Artifact & lighting analysis, diffusion pattern detection.
  - Video: Temporal frame consistency & audio-visual synchronization analysis.
  - Audio: Spectral noise & voice synthesis signature verification.
  - Text: LLM stylometry & perplexity markers.
