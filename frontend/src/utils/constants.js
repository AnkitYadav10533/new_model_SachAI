export const API_BASE_URL = '/api';

export const MEDIA_TYPES = {
  IMAGE: 'image',
  VIDEO: 'video',
  AUDIO: 'audio',
  TEXT: 'text'
};

export const MAX_FILE_SIZES = {
  IMAGE: 10 * 1024 * 1024,  // 10MB
  VIDEO: 50 * 1024 * 1024,  // 50MB
  AUDIO: 20 * 1024 * 1024   // 20MB
};

export const ACCEPTED_EXTENSIONS = {
  IMAGE: '.jpg, .jpeg, .png, .webp, .gif',
  VIDEO: '.mp4, .webm, .mov',
  AUDIO: '.mp3, .wav, .ogg'
};
