import React from 'react';

const LETTERS = [
  { char: 'O', color: '#F5222D', delay: 0.05 },
  { char: 'F', color: '#F5222D', delay: 0.12 },
  { char: 'F', color: '#12B5E5', delay: 0.19 },
  { char: 'L', color: '#12B5E5', delay: 0.26 },
  { char: 'I', color: '#12B5E5', delay: 0.33 },
  { char: 'N', color: '#FFB800', delay: 0.40 },
  { char: 'E', color: '#FFB800', delay: 0.47 },
];

export default function OfflineTitle({ isDisconnected, isSettled }) {
  return (
    <div
      className={`offline-title-wrapper ${isDisconnected ? 'is-disconnected' : ''} ${isSettled ? 'is-settled' : ''}`}
      aria-label="OFFLINE"
    >
      <div className="offline-letters-container">
        {LETTERS.map(({ char, color, delay }, idx) => (
          <span
            key={idx}
            className="offline-letter"
            style={{
              color,
              animationDelay: `${delay}s`,
            }}
          >
            {char}
          </span>
        ))}
      </div>
    </div>
  );
}
