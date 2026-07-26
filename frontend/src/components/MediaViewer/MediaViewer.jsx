import React from 'react';
import { Eye, FileText } from 'lucide-react';
import './MediaViewer.css';

export function MediaViewer({ previewUrl, mediaType, textContent, fileName }) {
  return (
    <div className="media-viewer-container glass-card">
      <div className="viewer-header">
        <Eye size={18} className="icon-cyan" />
        <h4>Media Inspector: {fileName || 'Analyzed Asset'}</h4>
      </div>

      <div className="viewer-content">
        {mediaType === 'image' && previewUrl && (
          <img src={previewUrl} alt="Analyzed Media" className="viewer-img" />
        )}
        {mediaType === 'video' && previewUrl && (
          <video src={previewUrl} controls className="viewer-vid" />
        )}
        {mediaType === 'audio' && previewUrl && (
          <div className="audio-player-wrapper">
            <audio src={previewUrl} controls className="viewer-aud" />
          </div>
        )}
        {mediaType === 'text' && (
          <div className="text-viewer-box">
            <pre className="text-content-pre">{textContent || 'Pasted text content analyzed.'}</pre>
          </div>
        )}
      </div>
    </div>
  );
}
