import axios from 'axios';
import { API_BASE_URL } from '../utils/constants.js';

const client = axios.create({
  baseURL: API_BASE_URL,
  timeout: 60000 // 60s timeout
});

export async function checkServerHealth() {
  try {
    const res = await client.get('/health');
    return res.data;
  } catch (err) {
    return { status: 'offline', geminiConfigured: false, error: err.message };
  }
}

export async function analyzeMedia(file, type, textContent = '') {
  if (type === 'text') {
    const response = await client.post('/analyze/text', { text: textContent });
    return response.data;
  }

  const formData = new FormData();
  formData.append('file', file);

  const endpoint = `/analyze/${type}`;
  const response = await client.post(endpoint, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });

  return response.data;
}
