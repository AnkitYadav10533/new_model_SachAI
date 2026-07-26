import { MAX_FILE_SIZES } from './constants.js';

export function validateSelectedFile(file, type) {
  if (!file) {
    return { valid: false, error: 'No file selected.' };
  }

  const fileTypeKey = type.toUpperCase();
  const maxAllowedSize = MAX_FILE_SIZES[fileTypeKey] || 10 * 1024 * 1024;

  if (file.size > maxAllowedSize) {
    const sizeInMB = Math.round(maxAllowedSize / (1024 * 1024));
    return {
      valid: false,
      error: `File size exceeds maximum limit of ${sizeInMB}MB.`
    };
  }

  if (type === 'image' && !file.type.startsWith('image/')) {
    return { valid: false, error: 'Please select a valid image file (PNG, JPG, WEBP).' };
  }

  if (type === 'video' && !file.type.startsWith('video/')) {
    return { valid: false, error: 'Please select a valid video file (MP4, WEBM, MOV).' };
  }

  if (type === 'audio' && !file.type.startsWith('audio/')) {
    return { valid: false, error: 'Please select a valid audio file (MP3, WAV, OGG).' };
  }

  return { valid: true, error: null };
}
