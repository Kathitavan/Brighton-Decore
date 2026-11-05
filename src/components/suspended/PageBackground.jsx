import React, { useState, useEffect } from 'react';

export default function PageBackground({ imageUrl }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!imageUrl || typeof imageUrl !== 'string' || imageUrl.trim() === '') {
      setHasError(true);
      return;
    }

    const img = new Image();
    img.src = imageUrl;
    img.onload = () => {
      setIsLoaded(true);
      setHasError(false);
    };
    img.onerror = () => {
      setHasError(true);
      setIsLoaded(false);
    };

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [imageUrl]);

  return (
    <div className="page-background-container" aria-hidden="true">
      {/* Background Image Layer (only if successfully loaded) */}
      {!hasError && isLoaded && (
        <div
          className="page-background-image"
          style={{
            backgroundImage: `url(${imageUrl})`,
          }}
        />
      )}

      {/* Clean White Translucent Overlay (82% opacity) */}
      <div className="page-background-overlay" />
    </div>
  );
}
