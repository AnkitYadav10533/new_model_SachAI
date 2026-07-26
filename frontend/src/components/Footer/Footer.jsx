import React from 'react';
import { Shield, Github, Globe, Heart } from 'lucide-react';
import './Footer.css';

export function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-brand">
          <div className="footer-logo">
            <Shield size={20} className="icon-cyan" />
            <span className="footer-name">SACHAI</span>
          </div>
          <p className="footer-desc">
            Forensic AI Authenticity & Deepfake Detection Platform powered by Google Gemini.
          </p>
        </div>

        <div className="footer-links-group">
          <div className="footer-column">
            <h4>Detection Engine</h4>
            <span>Image Forensics</span>
            <span>Video Continuity</span>
            <span>Audio Voice Clones</span>
            <span>Text Stylometry</span>
          </div>
          <div className="footer-column">
            <h4>Technology</h4>
            <span>Gemini 2.5 Flash</span>
            <span>React + Vite</span>
            <span>Express Node.js</span>
            <span>Render Cloud</span>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2026 SACHAI Platform. All rights reserved.</span>
        <div className="footer-socials">
          <Github size={18} />
          <Globe size={18} />
        </div>
      </div>
    </footer>
  );
}
