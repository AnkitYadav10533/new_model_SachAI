import express from 'express';
import { upload } from '../middleware/upload.js';
import { validateMediaFile } from '../middleware/validateFile.js';
import {
  handleImageAnalysis,
  handleVideoAnalysis,
  handleAudioAnalysis,
  handleTextAnalysis
} from '../controllers/uploadController.js';

const router = express.Router();

// POST /api/analyze/image
router.post(
  '/analyze/image',
  upload.single('file'),
  validateMediaFile(['image/']),
  handleImageAnalysis
);

// POST /api/analyze/video
router.post(
  '/analyze/video',
  upload.single('file'),
  validateMediaFile(['video/']),
  handleVideoAnalysis
);

// POST /api/analyze/audio
router.post(
  '/analyze/audio',
  upload.single('file'),
  validateMediaFile(['audio/']),
  handleAudioAnalysis
);

// POST /api/analyze/text
router.post('/analyze/text', handleTextAnalysis);

export default router;
