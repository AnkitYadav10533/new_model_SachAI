import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
import { logger } from '../utils/logger.js';

dotenv.config();

let ai = null;
const apiKey = process.env.GEMINI_API_KEY ? process.env.GEMINI_API_KEY.trim() : '';

// Valid Google Gemini API keys start with AIzaSy
const isValidKeyFormat = apiKey && 
  apiKey !== 'your_gemini_api_key_here' && 
  apiKey.startsWith('AIzaSy');

if (isValidKeyFormat) {
  try {
    ai = new GoogleGenerativeAI(apiKey);
    logger.info('Gemini AI client initialized successfully.');
  } catch (err) {
    logger.error('Failed to initialize Gemini AI client:', err.message);
  }
} else {
  if (apiKey && apiKey !== 'your_gemini_api_key_here') {
    logger.warn('GEMINI_API_KEY format is invalid (Google Gemini API keys start with "AIzaSy..."). SACHAI will run in Advanced Forensic Heuristic Mode.');
  } else {
    logger.warn('GEMINI_API_KEY is missing or unconfigured. SACHAI will run in Advanced Forensic Heuristic Mode.');
  }
}

export function getGeminiClient() {
  return ai;
}

export function isGeminiConfigured() {
  return ai !== null && isValidKeyFormat;
}


