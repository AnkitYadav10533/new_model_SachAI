import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import uploadRoutes from './routes/uploadRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';
import { isGeminiConfigured } from './config/gemini.js';

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Root Welcome Endpoint
app.get('/', (req, res) => {
  res.json({
    status: 'online',
    service: 'SACHAI Authenticity & Deepfake Engine API',
    version: '1.0.0',
    health: '/api/health',
    endpoints: {
      analyzeText: 'POST /api/analyze/text',
      analyzeImage: 'POST /api/analyze/image',
      analyzeVideo: 'POST /api/analyze/video',
      analyzeAudio: 'POST /api/analyze/audio'
    }
  });
});

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    timestamp: new Date().toISOString(),
    service: 'SACHAI Authenticity & Deepfake Engine',
    geminiConfigured: isGeminiConfigured()
  });
});

// API Routes
app.use('/api', uploadRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: `Endpoint ${req.method} ${req.url} not found`
  });
});

// Global Error Middleware
app.use(errorHandler);

export default app;
