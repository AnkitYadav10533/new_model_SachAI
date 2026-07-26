import React from 'react';
import { Cpu, ShieldAlert } from 'lucide-react';
import './LoadingSpinner.css';

export function LoadingSpinner({ mediaType }) {
  return (
    <div className="scanner-loading-container glass-card">
      <div className="radar-scanner">
        <div className="radar-sweep"></div>
        <div className="radar-center">
          <Cpu className="radar-icon" size={32} />
        </div>
        <div className="radar-ring ring-1"></div>
        <div className="radar-ring ring-2"></div>
      </div>

      <div className="loading-status">
        <h3 className="loading-title gradient-text">
          SACHAI Forensic Scan Active
        </h3>
        <p className="loading-subtitle">
          Analyzing {mediaType} with Gemini 2.5 Flash Multimodal Engine...
        </p>

        <div className="scan-steps">
          <span className="step-item step-1">🔍 Extracting metadata & frequency layers</span>
          <span className="step-item step-2">🧬 Evaluating GAN/Diffusion & synthesis markers</span>
          <span className="step-item step-3">📊 Computing authenticity confidence score</span>
        </div>
      </div>
    </div>
  );
}
