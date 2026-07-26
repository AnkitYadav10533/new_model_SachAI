import React from 'react';
import { ShieldCheck, ShieldAlert, AlertTriangle, FileText, Calendar, Cpu, Sliders, Activity, Percent } from 'lucide-react';
import { ConfidenceMeter } from '../ConfidenceMeter/ConfidenceMeter.jsx';
import { getStatusColor, getStatusBg } from '../../utils/helpers.js';
import './ResultCard.css';

export function ResultCard({ result }) {
  if (!result) return null;

  const { verdict, confidenceScore, authenticityPercentage, aiGeneratedProbability, summary, fileName, mediaType, metadata, technicalSignals = [] } = result;

  const statusColor = getStatusColor(verdict);
  const statusBg = getStatusBg(verdict);

  const getVerdictIcon = () => {
    if (verdict === 'REAL' || verdict === 'AUTHENTIC') {
      return <ShieldCheck size={32} style={{ color: statusColor }} />;
    }
    return <ShieldAlert size={32} style={{ color: statusColor }} />;
  };

  return (
    <div className="result-card-container glass-card">
      <div className="result-card-header">
        <div className="verdict-badge-wrapper" style={{ background: statusBg, borderColor: statusColor }}>
          {getVerdictIcon()}
          <div className="verdict-title-group">
            <span className="verdict-label" style={{ color: statusColor }}>
              VERDICT: {verdict}
            </span>
            <span className="file-target-name">{fileName || 'Submitted Content'}</span>
          </div>
        </div>

        <ConfidenceMeter percentage={authenticityPercentage} verdict={verdict} />
      </div>

      <div className="result-summary-box">
        <h4 className="summary-heading">Forensic Executive Summary</h4>
        <p className="summary-text">{summary}</p>
      </div>

      {/* Model Parameters & Metrics Matrix */}
      <div className="model-params-box">
        <h4 className="params-heading">
          <Sliders size={16} /> Model Parameters & Forensic Metrics Evaluated
        </h4>
        <div className="params-grid">
          <div className="param-card">
            <span className="param-label"><Cpu size={14} /> Detection Engine</span>
            <span className="param-value cyan">{metadata?.engine || 'SACHAI Engine'}</span>
          </div>

          <div className="param-card">
            <span className="param-label"><Activity size={14} /> Model Confidence</span>
            <span className="param-value gold">{confidenceScore}%</span>
          </div>

          <div className="param-card">
            <span className="param-label"><Percent size={14} /> AI Probability</span>
            <span className="param-value red">{aiGeneratedProbability !== undefined ? aiGeneratedProbability : (100 - (authenticityPercentage || 50))}%</span>
          </div>

          <div className="param-card">
            <span className="param-label"><ShieldCheck size={14} /> Authenticity Score</span>
            <span className="param-value green">{authenticityPercentage}%</span>
          </div>

          <div className="param-card">
            <span className="param-label"><FileText size={14} /> Media Type Analyzed</span>
            <span className="param-value">{mediaType?.toUpperCase()}</span>
          </div>

          <div className="param-card">
            <span className="param-label"><Sliders size={14} /> Indicators Evaluated</span>
            <span className="param-value">{technicalSignals.length} Parameters</span>
          </div>
        </div>
      </div>

      <div className="result-meta-footer">
        <div className="meta-item">
          <Cpu size={14} />
          <span>{metadata?.engine || 'SACHAI Engine'}</span>
        </div>
        <div className="meta-item">
          <FileText size={14} />
          <span>Type: {mediaType?.toUpperCase()}</span>
        </div>
        <div className="meta-item">
          <Calendar size={14} />
          <span>{new Date(result.timestamp || Date.now()).toLocaleTimeString()}</span>
        </div>
      </div>
    </div>
  );
}
