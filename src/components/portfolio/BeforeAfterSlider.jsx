// src/components/portfolio/BeforeAfterSlider.jsx
// Brighton Decor — Upgraded Gold Luxury Before/After Slider
import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Sparkles, Sliders } from 'lucide-react';

const BeforeAfterSlider = ({ before, after, beforeLabel = 'BEFORE', afterLabel = 'AFTER TRANSFORMATION' }) => {
  const sliderRef = useRef(null);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const handleMove = useCallback((clientX) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = useCallback((e) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  }, [isDragging, handleMove]);

  const handleMouseMove = useCallback((e) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  }, [isDragging, handleMove]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove]);

  if (!before || !after) return null;

  return (
    <div className="relative w-full max-w-5xl mx-auto rounded-xl overflow-hidden border-2 border-[#C9A55A]/30 bg-[#171816] shadow-2xl p-1 select-none group">
      <div
        ref={sliderRef}
        onMouseDown={(e) => {
          setIsDragging(true);
          handleMove(e.clientX);
        }}
        onTouchStart={(e) => {
          setIsDragging(true);
          handleMove(e.touches[0].clientX);
        }}
        onKeyDown={(e) => {
          if (e.key === 'ArrowLeft') setSliderPosition((prev) => Math.max(0, prev - 5));
          if (e.key === 'ArrowRight') setSliderPosition((prev) => Math.min(100, prev + 5));
        }}
        tabIndex={0}
        role="slider"
        aria-valuenow={Math.round(sliderPosition)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Before and after transformation comparison slider"
        className="relative aspect-[16/10] md:aspect-[16/9] w-full overflow-hidden rounded-lg cursor-ew-resize focus:outline-none focus:ring-2 focus:ring-[#C9A55A]"
      >
        {/* Right Image (AFTER) */}
        <img
          src={after}
          alt="After transformation"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          loading="eager"
        />

        {/* Left Image (BEFORE) */}
        <div
          className="absolute inset-0 overflow-hidden pointer-events-none"
          style={{ width: `${sliderPosition}%` }}
        >
          <img
            src={before}
            alt="Before transformation"
            className="absolute inset-0 w-full h-full object-cover pointer-events-none max-w-none"
            style={{ width: sliderRef.current ? `${sliderRef.current.clientWidth}px` : '100%' }}
            loading="eager"
          />
        </div>

        {/* Badges */}
        <div className="absolute top-4 left-4 z-20 pointer-events-none">
          <span className="bg-[#0A0908]/85 border border-white/20 text-white/90 text-[10px] md:text-xs font-bold uppercase tracking-[0.25em] font-sans px-3.5 py-1.5 rounded-md backdrop-blur-md">
            {beforeLabel}
          </span>
        </div>

        <div className="absolute top-4 right-4 z-20 pointer-events-none">
          <span className="bg-[#0A0908]/85 border border-[#C9A55A]/50 text-[#C9A55A] text-[10px] md:text-xs font-bold uppercase tracking-[0.25em] font-sans px-3.5 py-1.5 rounded-md backdrop-blur-md flex items-center gap-1.5">
            <Sparkles size={12} />
            {afterLabel}
          </span>
        </div>

        {/* Handle */}
        <div
          className="absolute top-0 bottom-0 z-30 pointer-events-none"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="h-full w-[2px] bg-[#C9A55A] -translate-x-1/2 shadow-[0_0_15px_rgba(201,165,90,0.8)]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 md:w-11 md:h-11 rounded-full border-2 border-[#C9A55A] bg-[#0A0908]/90 text-[#C9A55A] flex items-center justify-center font-bold text-xs shadow-[0_0_20px_rgba(201,165,90,0.5)] transition-transform group-hover:scale-110">
            <Sliders size={15} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeforeAfterSlider;
