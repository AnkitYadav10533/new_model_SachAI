import React from 'react';
import { Link } from 'react-router-dom';
import { AlertOctagon, Home as HomeIcon } from 'lucide-react';
import './NotFound.css';

export function NotFound() {
  return (
    <div className="notfound-container">
      <div className="notfound-card glass-card">
        <AlertOctagon size={64} className="icon-red" />
        <h1>404 - Page Not Found</h1>
        <p>The forensic path you are looking for does not exist or has been moved.</p>
        <Link to="/" className="btn-primary">
          <HomeIcon size={18} />
          Return to Home
        </Link>
      </div>
    </div>
  );
}
