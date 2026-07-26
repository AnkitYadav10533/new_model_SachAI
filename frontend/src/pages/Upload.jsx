import React from 'react';
import { useUpload } from '../hooks/useUpload.js';
import { UploadBox } from '../components/UploadBox/UploadBox.jsx';
import { FilePreview } from '../components/FilePreview/FilePreview.jsx';
import { LoadingSpinner } from '../components/LoadingSpinner/LoadingSpinner.jsx';
import { Result } from './Result.jsx';
import { Cpu, ShieldCheck } from 'lucide-react';
import './Upload.css';

export function Upload() {
  const {
    selectedFile,
    previewUrl,
    textContent,
    setTextContent,
    activeTab,
    loading,
    error,
    result,
    handleFileSelect,
    handleTabChange,
    triggerAnalysis,
    resetUpload
  } = useUpload();

  if (result) {
    return (
      <Result
        result={result}
        previewUrl={previewUrl}
        textContent={textContent}
        onAnalyzeAnother={resetUpload}
      />
    );
  }

  return (
    <div className="upload-page-container">
      <div className="upload-page-header">
        <h2 className="page-title">
          Forensic <span className="gradient-text">Analysis Workspace</span>
        </h2>
        <p className="page-subtitle">
          Submit media files or paste text to perform deepfake verification using Gemini 2.5 Flash.
        </p>
      </div>

      <div className="upload-workspace-card glass-card">
        {loading ? (
          <LoadingSpinner mediaType={activeTab} />
        ) : (
          <div className="workspace-inner">
            <UploadBox
              activeTab={activeTab}
              onTabChange={handleTabChange}
              onFileSelect={handleFileSelect}
              selectedFile={selectedFile}
              textContent={textContent}
              setTextContent={setTextContent}
              error={error}
            />

            {selectedFile && (
              <FilePreview
                file={selectedFile}
                previewUrl={previewUrl}
                mediaType={activeTab}
                onRemove={resetUpload}
              />
            )}

            <div className="workspace-action-bar">
              <button
                className="btn-primary analyze-btn"
                onClick={triggerAnalysis}
                disabled={loading}
              >
                <ShieldCheck size={20} />
                Analyze Authenticity
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
