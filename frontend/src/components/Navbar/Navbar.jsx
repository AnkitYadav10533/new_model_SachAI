import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShieldCheck, Cpu, UploadCloud, Info } from 'lucide-react';
import './Navbar.css';

export function Navbar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar-container glass-card">
      <div className="navbar-inner">
        <Link to="/" className="navbar-brand">
          <div className="brand-icon">
            <ShieldCheck className="icon-shield" />
          </div>
          <div className="brand-text">
            <span className="brand-name gradient-text">SACHAI</span>
            <span className="brand-tagline">AI AUTHENTICITY</span>
          </div>
        </Link>

        <div className="navbar-links">
          <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>
            Home
          </Link>
          <Link to="/upload" className={`nav-link ${isActive('/upload') ? 'active' : ''}`}>
            <UploadCloud size={18} />
            Scanner
          </Link>
          <Link to="/about" className={`nav-link ${isActive('/about') ? 'active' : ''}`}>
            <Info size={18} />
            About
          </Link>
        </div>

        <div className="navbar-status">
          <span className="status-indicator"></span>
          <span className="status-text">Gemini 2.5 Active</span>
        </div>
      </div>
    </nav>
  );
}
