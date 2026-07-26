import React from 'react';
import { CheckCircle2, AlertTriangle, XCircle, FileSearch, Lightbulb } from 'lucide-react';
import './ExplanationBox.css';

export function ExplanationBox({ technicalSignals = [], explanations = [] }) {
  const getStatusBadge = (status) => {
    switch (status) {
      case 'PASS':
        return <span className="signal-tag tag-pass"><CheckCircle2 size={14} /> PASS</span>;
      case 'WARN':
        return <span className="signal-tag tag-warn"><AlertTriangle size={14} /> WARN</span>;
      case 'FAIL':
        return <span className="signal-tag tag-fail"><XCircle size={14} /> FAIL</span>;
      default:
        return <span className="signal-tag tag-pass">INFO</span>;
    }
  };

  return (
    <div className="explanation-box-container">
      {/* Technical Signals List */}
      <div className="signals-section glass-card">
        <div className="section-title-bar">
          <FileSearch size={20} className="icon-cyan" />
          <h3>Technical Forensic Indicators</h3>
        </div>

        <div className="signals-grid">
          {technicalSignals.map((item, idx) => (
            <div key={idx} className="signal-card">
              <div className="signal-header">
                <span className="signal-name">{item.signal}</span>
                {getStatusBadge(item.status)}
              </div>
              <p className="signal-desc">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Forensic Observations / Explanations */}
      {explanations.length > 0 && (
        <div className="observations-section glass-card">
          <div className="section-title-bar">
            <Lightbulb size={20} className="icon-cyan" />
            <h3>Key Forensic Observations</h3>
          </div>

          <ul className="observations-list">
            {explanations.map((note, idx) => (
              <li key={idx} className="observation-item">
                <span className="bullet-point"></span>
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
