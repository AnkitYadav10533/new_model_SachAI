import React from 'react';
import { X, File, CheckCircle2 } from 'lucide-react';
import { formatBytes } from '../../utils/helpers.js';
import './FilePreview.css';

export function FilePreview({ file, previewUrl, mediaType, onRemove }) {
  if (!file && mediaType !== 'text') return null;

  return (
    <div className="file-preview-card glass-card">
      <div className="preview-media-container">
        {mediaType === 'image' && previewUrl && (
          <img src={previewUrl} alt="Preview" className="preview-image" />
        )}
        {mediaType === 'video' && previewUrl && (
          <video src={previewUrl} controls className="preview-video" />
        )}
        {mediaType === 'audio' && previewUrl && (
          <audio src={previewUrl} controls className="preview-audio" />
        )}
      </div>

      <div className="preview-info">
        <div className="preview-header">
          <CheckCircle2 size={18} className="icon-success" />
          <span className="file-name">{file.name}</span>
          <button className="remove-btn" onClick={onRemove} title="Remove file">
            <X size={16} />
          </button>
        </div>
        <span className="file-size">{formatBytes(file.size)}</span>
      </div>
    </div>
  );
}
