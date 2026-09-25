// src/components/home/TransformationSection.jsx
// Brighton Decor — Cinematic Room Transformation V2 Master Component
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, Maximize2, X, Sliders, CheckCircle2, FileText, LayoutGrid } from 'lucide-react';

const transformationPairs = [
  {
    id: 'living-room',
    title: 'Living Room Suite',
    subtitle: 'Full Architectural Transformation',
    beforeImage: '/assets/imgs/before-after/living-room-before.png',
    afterImage: '/assets/imgs/before-after/living-room-after.png',
    meta: [
      { num: '01', title: 'WINDOW TREATMENT', desc: 'Sleek motorized zebra blinds with gold fixtures & floor-to-ceiling linen drapery' },
      { num: '02', title: 'FLOORING & RUG', desc: 'Rich Canadian oak hardwood flooring with plush wool geometric area rug' },
      { num: '03', title: 'SOFA & STYLING', desc: 'Upholstered charcoal velvet seating with gold accent cushions & ambient lighting' },
    ]
  },
  {
    id: 'window-focus',
    title: 'Architectural Window',
    subtitle: 'Motorized Solar & Privacy Control',
    beforeImage: '/assets/imgs/before-after/living-room-before.png',
    afterImage: '/assets/imgs/before-after/living-room-after.png',
    meta: [
      { num: '01', title: 'SOLAR FILTERING', desc: 'Precision UV glare suppression preserving full outdoor natural light' },
      { num: '02', title: 'SMART MOTORIZATION', desc: 'App & voice-controlled quiet Somfy actuator integration' },
      { num: '03', title: 'CUSTOM VALANCE', desc: 'Recessed ceiling track housing with zero visible hardware' },
    ]
  },
  {
    id: 'master-bedroom',
    title: 'Master Bedroom',
    subtitle: 'Total Blackout & Thermal Insulation',
    beforeImage: '/assets/imgs/portfolio/before-1.jpg',
    afterImage: '/assets/imgs/portfolio/after-1.jpg',
    meta: [
      { num: '01', title: 'CELLULAR BLACKOUT', desc: 'Double-honeycomb R-value insulation for 100% night darkness' },
      { num: '02', title: 'ACOUSTIC PANELS', desc: 'Custom velvet drapery side panels for whisper-quiet sleeping comfort' },
      { num: '03', title: 'PRAIRIE SEASONS', desc: 'Heat-reflective aluminum core for cold winters & long summer daylight' },
    ]
  }
];

const TransformationSection = () => {
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const sliderRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  const [activeTab, setActiveTab] = useState('living-room');
  const [sliderPosition, setSliderPosition] = useState(50); // percentage (0 to 100)
  const [isDragging, setIsDragging] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const currentPair = transformationPairs.find((p) => p.id === activeTab) || transformationPairs[0];

  // Drag logic handling
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

  // Keyboard Accessibility Arrow Keys
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      setSliderPosition((prev) => Math.max(0, prev - 5));
    } else if (e.key === 'ArrowRight') {
      setSliderPosition((prev) => Math.min(100, prev + 5));
    }
  };

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-28 px-6 md:px-12 bg-[#0A0908] text-white relative overflow-hidden border-t border-white/10"
      aria-label="Room Transformation Showcase"
    >
      {/* Background Gold Ambient Glow & Grid Accent */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(201,165,90,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(201,165,90,0.03)_1px,transparent_1px)] bg-[size:45px_45px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#C9A55A]/5 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* 1. CINEMATIC SECTION INTRO */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#C9A55A]/10 border border-[#C9A55A]/30 mb-4"
          >
            <Sparkles size={14} className="text-[#C9A55A]" />
            <span className="text-[10px] md:text-xs uppercase font-bold tracking-[0.25em] text-[#C9A55A] font-sans">
              THE TRANSFORMATION
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-serif text-[#F5F2EA] text-3xl sm:text-5xl md:text-6xl font-light tracking-tight leading-tight mb-4"
          >
            From Ordinary <br className="hidden sm:inline" />
            <span className="italic text-[#C9A55A]">to Extraordinary.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-white/70 font-sans font-light text-base md:text-lg leading-relaxed max-w-xl mx-auto"
          >
            See how thoughtful window treatments, refined materials, and considered interior styling completely transform the exact same physical space.
          </motion.p>

          {/* Transformation Category Selector Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-3 mt-8"
          >
            {transformationPairs.map((pair) => {
              const isActive = activeTab === pair.id;
              return (
                <button
                  key={pair.id}
                  onClick={() => {
                    setActiveTab(pair.id);
                    setSliderPosition(50);
                  }}
                  className={`px-5 py-2.5 rounded-full text-xs font-sans tracking-[0.15em] uppercase font-bold transition-all duration-300 ${
                    isActive
                      ? 'bg-[#C9A55A] text-[#0A0908] shadow-[0_0_20px_rgba(201,165,90,0.3)] scale-105'
                      : 'bg-white/[0.03] text-white/70 border border-white/15 hover:border-[#C9A55A]/50 hover:text-white'
                  }`}
                >
                  {pair.title}
                </button>
              );
            })}
          </motion.div>
        </div>

        {/* 2. INTERACTIVE BEFORE / AFTER SLIDER CONTAINER */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98, clipPath: 'inset(10% 0 10% 0)' }}
          animate={isInView ? { opacity: 1, scale: 1, clipPath: 'inset(0% 0 0% 0)' } : {}}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative max-w-5xl mx-auto rounded-2xl overflow-hidden border-2 border-[#C9A55A]/30 bg-[#171816] shadow-[0_25px_70px_rgba(0,0,0,0.8)] p-1 md:p-2 select-none group"
        >
          {/* Main Slider Canvas Frame */}
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
            onKeyDown={handleKeyDown}
            tabIndex={0}
            role="slider"
            aria-valuenow={Math.round(sliderPosition)}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Interactive room transformation comparison slider. Use left and right arrow keys to compare."
            className="relative aspect-[16/10] md:aspect-[16/9] w-full overflow-hidden rounded-xl cursor-ew-resize focus:outline-none focus:ring-2 focus:ring-[#C9A55A]"
          >
            {/* Right Image (AFTER TRANSFORMATION - Full Base) */}
            <img
              src={currentPair.afterImage}
              alt={`${currentPair.title} — After Brighton Decor Transformation`}
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              loading="eager"
            />

            {/* Left Image (BEFORE - Clipped Layer) */}
            <div
              className="absolute inset-0 overflow-hidden pointer-events-none"
              style={{ width: `${sliderPosition}%` }}
            >
              <img
                src={currentPair.beforeImage}
                alt={`${currentPair.title} — Before Interior Treatment`}
                className="absolute inset-0 w-full h-full object-cover pointer-events-none max-w-none"
                style={{ width: sliderRef.current ? `${sliderRef.current.clientWidth}px` : '100%' }}
                loading="eager"
              />
            </div>

            {/* Floating Luxury Badges */}
            <div className="absolute top-4 left-4 z-20 pointer-events-none">
              <span className="bg-[#0A0908]/85 border border-white/20 text-white/90 text-[10px] md:text-xs font-bold uppercase tracking-[0.25em] font-sans px-3.5 py-1.5 rounded-md backdrop-blur-md shadow-lg">
                BEFORE
              </span>
            </div>

            <div className="absolute top-4 right-4 z-20 pointer-events-none">
              <span className="bg-[#0A0908]/85 border border-[#C9A55A]/50 text-[#C9A55A] text-[10px] md:text-xs font-bold uppercase tracking-[0.25em] font-sans px-3.5 py-1.5 rounded-md backdrop-blur-md shadow-lg flex items-center gap-1.5">
                <Sparkles size={12} />
                AFTER TRANSFORMATION
              </span>
            </div>

            {/* Floating Fullscreen Toggle Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsFullscreen(true);
              }}
              aria-label="View Fullscreen"
              className="absolute bottom-4 right-4 z-20 bg-[#0A0908]/80 hover:bg-[#C9A55A] hover:text-[#0A0908] text-white p-2.5 rounded-lg border border-white/20 transition-all duration-300 flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest font-sans"
            >
              <Maximize2 size={13} />
              <span className="hidden sm:inline">Fullscreen</span>
            </button>

            {/* Gold Vertical Divider Bar */}
            <div
              className="absolute top-0 bottom-0 z-30 pointer-events-none"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="h-full w-[2px] bg-[#C9A55A] -translate-x-1/2 shadow-[0_0_15px_rgba(201,165,90,0.8)]" />

              {/* Luxury Circular Gold Handle */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 md:w-12 md:h-12 rounded-full border-2 border-[#C9A55A] bg-[#0A0908]/90 text-[#C9A55A] flex items-center justify-center font-bold text-xs tracking-wider shadow-[0_0_25px_rgba(201,165,90,0.5)] transition-transform group-hover:scale-110">
                <Sliders size={16} />
              </div>
            </div>
          </div>
        </motion.div>



        {/* 4. SECTION CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="mt-16 text-center max-w-xl mx-auto pt-10 border-t border-white/10"
        >
          <h3 className="font-serif text-[#F5F2EA] text-2xl md:text-3xl font-light mb-2">
            Ready to transform your space?
          </h3>
          <p className="text-white/60 text-xs md:text-sm font-sans font-light mb-6">
            Book a complimentary in-home measurement with our Canadian window & flooring specialists.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => navigate('/contact')}
              className="group inline-flex items-center gap-2.5 bg-[#C9A55A] text-[#0A0908] px-7 py-3.5 text-xs font-bold uppercase tracking-[0.2em] font-sans hover:bg-white transition-all duration-300 rounded-full shadow-xl"
            >
              <FileText size={14} />
              <span>BOOK FREE MEASUREMENT</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => navigate('/portfolio')}
              className="inline-flex items-center gap-2.5 border border-white/20 bg-white/5 text-white px-7 py-3.5 text-xs font-bold uppercase tracking-[0.2em] font-sans hover:border-[#C9A55A] hover:text-[#C9A55A] transition-all duration-300 rounded-full"
            >
              <LayoutGrid size={14} />
              <span>EXPLORE OUR WORK</span>
            </button>
          </div>
        </motion.div>

      </div>

      {/* Fullscreen Lightbox Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 z-[300] bg-black/98 flex flex-col items-center justify-center p-4">
          <button
            onClick={() => setIsFullscreen(false)}
            aria-label="Close Fullscreen"
            className="absolute top-6 right-6 p-3 text-white bg-white/10 rounded-full hover:bg-[#C9A55A] hover:text-[#0A0908] transition-colors"
          >
            <X size={24} />
          </button>
          <div className="relative max-w-6xl w-full max-h-[85vh] rounded-xl overflow-hidden border border-white/20">
            <img
              src={currentPair.afterImage}
              alt="Transformation After Fullscreen View"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default TransformationSection;
