# SACHAI - AI Authenticity & Deepfake Detection Platform

![SACHAI Banner](https://img.shields.io/badge/SACHAI-Media%20Authenticity%20Engine-00F2FE?style=for-the-badge&logo=shield)
![Node.js](https://img.shields.io/badge/Node.js-18%2B-green?style=for-the-badge&logo=nodedotjs)
![React](https://img.shields.io/badge/React-18%2B-blue?style=for-the-badge&logo=react)
![Gemini AI](https://img.shields.io/badge/Gemini-2.5%20Flash-purple?style=for-the-badge&logo=google)

SACHAI ("Truth") is an advanced deepfake and media authenticity analysis platform. Powered by Google Gemini AI, SACHAI provides forensic-level detection for Images, Video, Audio, and AI-generated Text.

---

## 🌟 Key Features

- 🖼️ **Image Authenticity Verification**: Detects visual artifacts, GAN/Diffusion patterns, lighting inconsistencies, and forensic anomalies.
- 🎥 **Video Deepfake Detection**: Analyzes frame continuity, lip-sync alignment, and temporal artifacts.
- 🔊 **Voice Clone & Audio Analysis**: Scans spectral frequencies, pitch jumps, and voice synthesis signatures.
- 📝 **AI Text Stylometry**: Analyzes perplexity, burstiness, and structural patterns characteristic of LLMs.
- 📊 **Dynamic Confidence Gauge**: Visualizes real-time confidence scores with detailed forensic breakdowns.

---

## 📁 Repository Structure

```
SACHAI/
├── frontend/         # React + Vite UI with dark glassmorphism design system
├── backend/          # Node.js + Express backend integrated with Gemini API
└── docs/             # Technical architecture, API, and user flow documentation
```

---

## 🚀 Quick Start

### 1. Backend Setup
```bash
cd backend
npm install
cp .env.example .env   # Add your GEMINI_API_KEY
npm start
```
The backend will launch at `http://localhost:5000`.

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
The frontend will open at `http://localhost:5173`.

---

## 📄 License
Distributed under the MIT License. See `LICENSE` for details.
