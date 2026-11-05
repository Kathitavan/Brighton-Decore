import React, { useState, useEffect } from 'react';
import { suspendedConfig } from '../../config/suspended.config.js';
import DogUnplugIllustration from '../../components/suspended/DogUnplugIllustration.jsx';
import OfflineTitle from '../../components/suspended/OfflineTitle.jsx';
import './SuspendedPage.css';

export default function SuspendedPage() {
  const [isDisconnected, setIsDisconnected] = useState(false);
  const [isIdle, setIsIdle] = useState(false);

  useEffect(() => {
    // Set document title
    document.title = suspendedConfig.documentTitle;

    // Ensure meta robots noindex is present
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
    <div className="suspended-page-root">
      <main className="suspended-main-content">
        {/* 1. Colorful Chunky OFFLINE Word */}
        <OfflineTitle isDisconnected={isDisconnected} isIdle={isIdle} />

        {/* 2. Light Gray Label */}
        <div className="suspended-label" role="status">
          {suspendedConfig.label}
        </div>

        {/* 3. Primary Heading */}
        <h1 className="suspended-heading">
          {suspendedConfig.heading}
        </h1>

        {/* 4. Explanatory Paragraph */}
        <p className="suspended-paragraph">
          {suspendedConfig.paragraph}
        </p>

        {/* 5. Monospace Status Row */}
        <div className="suspended-status-row" aria-label="System Status">
          {suspendedConfig.statusRow}
        </div>

        {/* 6. Muted Red Warning Line */}
        <p className="suspended-warning-line">
          {suspendedConfig.warningLine}
        </p>

        {/* 7. Single Dark Pill Button */}
        <a
          href={suspendedConfig.ctaUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-contact"
          aria-label="Contact developer at kathiravan.org (opens in a new tab)"
        >
          <span>{suspendedConfig.ctaText}</span>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M7 17L17 7M17 7H7M17 7V17" />
          </svg>
        </a>

        {/* 8. Interactive Cartoon Dog Unplug Illustration */}
        <DogUnplugIllustration
          onDisconnect={() => setIsDisconnected(true)}
          onSequenceComplete={() => setIsIdle(true)}
        />
      </main>

      {/* 9. Clean Footer */}
      <footer className="suspended-footer">
        {suspendedConfig.footerText}
      </footer>
    </div>
  );
}
