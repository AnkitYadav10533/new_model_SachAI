import React, { useRef } from 'react';
import { Upload, Image as ImageIcon, Video, Mic, FileText, AlertCircle } from 'lucide-react';
import { ACCEPTED_EXTENSIONS } from '../../utils/constants.js';
import './UploadBox.css';

export function UploadBox({
  activeTab,
  onTabChange,
  onFileSelect,
  selectedFile,
  textContent,
  setTextContent,
  error
}) {
  const fileInputRef = useRef(null);

  const handleDrop = (e) => {
    e.preventDefault();
    if (activeTab === 'text') return;
    const file = e.dataTransfer.files[0];
    if (file) onFileSelect(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className="upload-box-container">
      {/* Media Type Selector Tabs */}
      <div className="upload-tabs">
        <button
          className={`tab-btn ${activeTab === 'image' ? 'active' : ''}`}
          onClick={() => onTabChange('image')}
        >
          <ImageIcon size={18} />
          Image
        </button>
        <button
          className={`tab-btn ${activeTab === 'video' ? 'active' : ''}`}
          onClick={() => onTabChange('video')}
        >
          <Video size={18} />
          Video
        </button>
        <button
          className={`tab-btn ${activeTab === 'audio' ? 'active' : ''}`}
          onClick={() => onTabChange('audio')}
        >
          <Mic size={18} />
          Audio
        </button>
        <button
          className={`tab-btn ${activeTab === 'text' ? 'active' : ''}`}
          onClick={() => onTabChange('text')}
        >
          <FileText size={18} />
          Text
        </button>
      </div>

      {/* Main Upload Zone */}
      {activeTab === 'text' ? (
        <div className="text-input-zone glass-card">
          <textarea
            className="text-textarea"
            placeholder="Paste text article, social media post, or document content here to analyze LLM stylometry & AI authorship..."
            value={textContent}
            onChange={(e) => setTextContent(e.target.value)}
            rows={8}
          />
          <div className="text-char-count">{textContent.length} characters</div>
        </div>
      ) : (
        <div
          className={`dropzone glass-card ${selectedFile ? 'has-file' : ''}`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: 'none' }}
            accept={ACCEPTED_EXTENSIONS[activeTab.toUpperCase()]}
            onChange={(e) => {
              if (e.target.files[0]) onFileSelect(e.target.files[0]);
            }}
          />

          <div className="dropzone-content">
            <div className="upload-icon-wrapper">
              <Upload size={32} className="upload-icon" />
            </div>
            <h3 className="upload-title">
              Drag & Drop your {activeTab} file here
            </h3>
            <p className="upload-subtitle">
              or click to browse from device ({ACCEPTED_EXTENSIONS[activeTab.toUpperCase()]})
            </p>
          </div>
        </div>
      )}

      {/* Error Alert */}
      {error && (
        <div className="error-banner">
          <AlertCircle size={18} />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
