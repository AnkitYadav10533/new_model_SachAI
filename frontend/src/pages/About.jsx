import React from 'react';
import { ShieldCheck, Cpu, Code, Layers } from 'lucide-react';
import './About.css';

export function About() {
  return (
    <div className="about-page-container">
      <div className="about-header">
        <h2 className="page-title">
          About <span className="gradient-text">SACHAI</span>
        </h2>
        <p className="page-subtitle">
          Empowering digital trust through AI-driven forensic media verification.
        </p>
      </div>

      <div className="about-grid">
        <div className="about-card glass-card">
          <div className="card-icon"><ShieldCheck className="icon-cyan" size={28} /></div>
          <h3>Mission</h3>
          <p>
            As generative AI models create hyper-realistic images, deepfake videos, and synthetic voice clones, SACHAI provides transparent, reproducible forensic analysis to detect synthetic media manipulation.
          </p>
        </div>

        <div className="about-card glass-card">
          <div className="card-icon"><Cpu className="icon-cyan" size={28} /></div>
          <h3>AI Engine</h3>
          <p>
            Integrated directly with <strong>Google Gemini 2.5 Flash</strong>, leveraging state-of-the-art vision-language understanding to evaluate subtle compression, lighting, frequency, and optical flow anomalies.
          </p>
        </div>

        <div className="about-card glass-card">
          <div className="card-icon"><Layers className="icon-cyan" size={28} /></div>
          <h3>Architecture</h3>
          <p>
            Built using a decoupled client-server architecture. The React + Vite frontend handles file previews and animated gauges, while the Express Node.js backend manages uploads and prompt engineering.
          </p>
        </div>

        <div className="about-card glass-card">
          <div className="card-icon"><Code className="icon-cyan" size={28} /></div>
          <h3>Open & Secure</h3>
          <p>
            All submitted files are processed temporarily in memory/disk and immediately deleted after analysis. No user content is stored permanently or retained.
          </p>
        </div>
      </div>
    </div>
  );
}
