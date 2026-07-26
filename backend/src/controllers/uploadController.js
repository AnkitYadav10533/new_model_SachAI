import fs from 'fs';
import { analyzeImageFile } from '../services/imageAnalyzer.js';
import { analyzeVideoFile } from '../services/videoAnalyzer.js';
import { analyzeAudioFile } from '../services/audioAnalyzer.js';
import { analyzeTextInput } from '../services/textAnalyzer.js';
import { logger } from '../utils/logger.js';

function cleanupFile(filePath) {
  if (filePath && fs.existsSync(filePath)) {
    fs.unlink(filePath, (err) => {
      if (err) logger.error(`Failed to cleanup temp file ${filePath}:`, err.message);
    });
  }
}

export async function handleImageAnalysis(req, res, next) {
  try {
    logger.info(`Analyzing image upload: ${req.file.originalname}`);
    const result = await analyzeImageFile(req.file);
    cleanupFile(req.file.path);
    return res.json(result);
  } catch (err) {
    cleanupFile(req.file?.path);
    next(err);
  }
}

export async function handleVideoAnalysis(req, res, next) {
  try {
    logger.info(`Analyzing video upload: ${req.file.originalname}`);
    const result = await analyzeVideoFile(req.file);
    cleanupFile(req.file.path);
    return res.json(result);
  } catch (err) {
    cleanupFile(req.file?.path);
    next(err);
  }
}

export async function handleAudioAnalysis(req, res, next) {
  try {
    logger.info(`Analyzing audio upload: ${req.file.originalname}`);
    const result = await analyzeAudioFile(req.file);
    cleanupFile(req.file.path);
    return res.json(result);
  } catch (err) {
    cleanupFile(req.file?.path);
    next(err);
  }
}

export async function handleTextAnalysis(req, res, next) {
  try {
    const { text } = req.body;
    if (!text || typeof text !== 'string' || text.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Text input content is required.'
      });
    }

    logger.info(`Analyzing text input (${text.length} characters)`);
    const result = await analyzeTextInput(text);
    return res.json(result);
  } catch (err) {
    next(err);
  }
}
