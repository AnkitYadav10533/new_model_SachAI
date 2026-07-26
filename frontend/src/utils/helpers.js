export function formatBytes(bytes, decimals = 2) {
  if (!bytes || bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

export function getStatusColor(verdict) {
  const v = verdict?.toUpperCase() || '';
  if (v === 'REAL' || v === 'AUTHENTIC' || v === 'HUMAN') {
    return 'var(--status-authentic)'; // Green
  }
  if (v === 'AI GENERATED' || v === 'AI_GENERATED' || v === 'DEEPFAKE' || v === 'SYNTHETIC') {
    return 'var(--status-deepfake)'; // Red
  }
  return 'var(--status-uncertain)';
}

export function getStatusBg(verdict) {
  const v = verdict?.toUpperCase() || '';
  if (v === 'REAL' || v === 'AUTHENTIC' || v === 'HUMAN') {
    return 'var(--status-authentic-bg)';
  }
  if (v === 'AI GENERATED' || v === 'AI_GENERATED' || v === 'DEEPFAKE' || v === 'SYNTHETIC') {
    return 'var(--status-deepfake-bg)';
  }
  return 'var(--status-uncertain-bg)';
}
