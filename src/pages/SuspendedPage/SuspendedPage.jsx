import React, { useState, useEffect } from 'react';
import { suspendedConfig } from '../../config/suspended.config.js';
import PageBackground from '../../components/suspended/PageBackground.jsx';
import OfflineTitle from '../../components/suspended/OfflineTitle.jsx';
import DogUnplugIllustration from '../../components/suspended/DogUnplugIllustration.jsx';
import './SuspendedPage.css';

export default function SuspendedPage() {
  const [isDisconnected, setIsDisconnected] = useState(false);
  const [isSettled, setIsSettled] = useState(false);

  useEffect(() => {
    // Set document title: "Hosting Inactive"
    document.title = suspendedConfig.documentTitle;

    // Ensure meta robots noindex is set
    let metaRobots = document.querySelector('meta[name="robots"]');
    let createdMeta = false;
    if (!metaRobots) {
      metaRobots = document.createElement('meta');
      metaRobots.name = 'robots';
      document.head.appendChild(metaRobots);
      createdMeta = true;
    }
    const prevRobots = metaRobots.content;
    metaRobots.content = 'noindex, nofollow';

    return () => {
      if (createdMeta && metaRobots.parentNode) {
        metaRobots.parentNode.removeChild(metaRobots);
      } else if (metaRobots) {
        metaRobots.content = prevRobots || 'index, follow';
      }
    };
  }, []);

  return (
    <div className="hosting-inactive-root">
      {/* 1. Full-Screen Background Image Layer with 82% White Overlay */}
      <PageBackground imageUrl={suspendedConfig.backgroundImageUrl} />

      {/* 2. Main Content Viewport (Centered, clean, no card, no box) */}
      <main className="hosting-inactive-main">
        {/* OFFLINE word in 3 colors */}
        <OfflineTitle isDisconnected={isDisconnected} isSettled={isSettled} />

        {/* Label: small caps, gray, letter-spaced */}
        <div className="inactive-label" role="status">
          {suspendedConfig.label}
        </div>

        {/* Heading: clean sans-serif */}
        <h1 className="inactive-heading">
          {suspendedConfig.heading}
        </h1>

        {/* Paragraph: clean gray body */}
        <p className="inactive-paragraph">
          {suspendedConfig.paragraph}
        </p>

        {/* Status row: monospace, small, dot-separated */}
        <div className="inactive-status-row" aria-label="Hosting Status">
          {suspendedConfig.statusRow}
        </div>

        {/* Muted red line */}
        <p className="inactive-warning-line">
          {suspendedConfig.warningLine}
        </p>

        {/* Single dark pill button */}
        <a
          href={suspendedConfig.ctaUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-inactive-contact"
          aria-label="Contact developer at kathiravan.org (opens in a new tab)"
        >
          <span>{suspendedConfig.ctaText}</span>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M7 17L17 7M17 7H7M17 7V17" />
          </svg>
        </a>

        {/* Cartoon Dog Unplug Illustration */}
        <DogUnplugIllustration
          onDisconnect={() => setIsDisconnected(true)}
          onSequenceComplete={() => setIsSettled(true)}
        />
      </main>

      {/* 3. Footer */}
      <footer className="hosting-inactive-footer">
        {suspendedConfig.footerText}
      </footer>
    </div>
  );
}
