import React, { useEffect, useState } from 'react';
import { getStatusColor } from '../../utils/helpers.js';
import './ConfidenceMeter.css';

export function ConfidenceMeter({ percentage = 88, verdict = 'AUTHENTIC' }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = percentage;
    const duration = 1200;
    const stepTime = Math.abs(Math.floor(duration / (end || 1)));

    const timer = setInterval(() => {
      start += 1;
      setDisplayValue(start);
      if (start >= end) clearInterval(timer);
    }, stepTime);

    return () => clearInterval(timer);
  }, [percentage]);

  const strokeDashoffset = 440 - (440 * displayValue) / 100;
  const statusColor = getStatusColor(verdict);

  return (
    <div className="confidence-meter-container">
      <div className="gauge-wrapper">
        <svg className="gauge-svg" viewBox="0 0 160 160">
          <circle
            className="gauge-bg"
            cx="80"
            cy="80"
            r="70"
          />
          <circle
            className="gauge-fill"
            cx="80"
            cy="80"
            r="70"
            style={{
              stroke: statusColor,
              strokeDasharray: 440,
              strokeDashoffset
            }}
          />
        </svg>

        <div className="gauge-center-text">
          <span className="gauge-number" style={{ color: statusColor }}>
            {displayValue}%
          </span>
          <span className="gauge-label">
            {(verdict === 'REAL' || verdict === 'AUTHENTIC') ? 'Real Media' : 'AI Generated'}
          </span>
        </div>
      </div>
    </div>
  );
}
