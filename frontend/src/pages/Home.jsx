import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Image, Video, Mic, FileText, Cpu, ArrowRight, CheckCircle2, Lock } from 'lucide-react';
import './Home.css';

export function Home() {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-badge glass-card">
          <Cpu size={16} className="icon-cyan" />
          <span>POWERED BY GEMINI MULTIMODAL AI</span>
        </div>

        <h1 className="hero-title">
          Unmask Synthetic Media with <span className="gradient-text">SACHAI</span>
        </h1>

        <p className="hero-subtitle">
          Forensic deepfake detection for Images, Video, Audio, and Text. Protect truth in the era of generative AI.
        </p>

        <div className="hero-cta-group">
          <Link to="/upload" className="btn-primary">
            Start Forensic Scan
            <ArrowRight size={18} />
          </Link>
          <Link to="/about" className="btn-secondary">
            Learn Architecture
          </Link>
        </div>
      </section>

      {/* Feature Cards Grid */}
      <section className="features-section">
        <h2 className="section-heading">Multi-Modal Detection Engines</h2>
        <div className="features-grid">
          <div className="feature-card glass-card">
            <div className="feature-icon-box">
              <Image size={28} className="icon-cyan" />
            </div>
            <h3>Image Forensics</h3>
            <p>Scans pixel lattices, GAN diffusion artifacts, specular lighting inconsistencies, and face warp boundaries.</p>
          </div>

          <div className="feature-card glass-card">
            <div className="feature-icon-box">
              <Video size={28} className="icon-cyan" />
            </div>
            <h3>Video Continuity</h3>
            <p>Analyzes frame-to-frame temporal flow, optical jitter, viseme-phoneme lip sync, and micro-blink dynamics.</p>
          </div>

          <div className="feature-card glass-card">
            <div className="feature-icon-box">
              <Mic size={28} className="icon-cyan" />
            </div>
            <h3>Audio Voice Clones</h3>
            <p>Detects ElevenLabs neural vocoder signatures, phase cancellation, robotic pitch quantization, and artificial silence.</p>
          </div>

          <div className="feature-card glass-card featured">
            <div className="feature-icon-box">
              <FileText size={28} className="icon-cyan" />
            </div>
            <h3>Text AI Stylometry</h3>
            <p>Evaluates sentence perplexity, token probability distributions, and overused LLM syntactic templates.</p>
          </div>
        </div>
      </section>

      {/* Trust & Performance Section */}
      <section className="trust-section glass-card">
        <div className="trust-item">
          <CheckCircle2 size={24} className="icon-cyan trust-icon" />
          <div>
            <h4>Forensic-Grade Metrics</h4>
            <p>Quantitative confidence scores with clear PASS/FAIL signal breakdowns.</p>
          </div>
        </div>
        <div className="trust-item">
          <Lock size={24} className="icon-cyan trust-icon" />
          <div>
            <h4>Privacy Centric</h4>
            <p>Temporary file uploads are purged immediately after processing.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
