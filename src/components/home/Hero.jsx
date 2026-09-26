// src/components/home/Hero.jsx
// Brighton Decor Canada — Cinematic Architectural Hero Experience
// Engineered with instant zero-latency playback, live atmosphere color grading,
// viewport-aware GPU optimization, and interactive ambient controls.

import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  Ruler, 
  Volume2, 
  VolumeX, 
  Play, 
  Pause, 
  Sparkles, 
  Sun, 
  Sunset, 
  Moon, 
  Compass 
} from 'lucide-react';
import styles from '../../styles/pages/home.module.css';

// ─────────────────────────────────────────────────────────────────────────────
// INNOVATION: ATMOSPHERE LIGHTING PRESETS (Real-time live video color grading)
// ─────────────────────────────────────────────────────────────────────────────
const ATMOSPHERES = {
  natural: {
    id: 'natural',
    name: 'Daylight',
    icon: Sun,
    filter: 'contrast(1.05) brightness(1.03) saturate(1.05)',
    gradient: 'radial-gradient(ellipse at 50% 45%, rgba(10,9,8,0.10) 0%, rgba(10,9,8,0.58) 75%, rgba(10,9,8,0.92) 100%)',
    tag: '5500K Pure Day',
  },
  golden: {
    id: 'golden',
    name: 'Golden Hour',
    icon: Sunset,
    filter: 'contrast(1.08) brightness(1.06) saturate(1.25) sepia(0.20)',
    gradient: 'radial-gradient(ellipse at 50% 45%, rgba(201,165,90,0.12) 0%, rgba(10,9,8,0.62) 75%, rgba(10,9,8,0.94) 100%)',
    tag: '3200K Warm Luxe',
  },
  noir: {
    id: 'noir',
    name: 'Twilight Noir',
    icon: Moon,
    filter: 'contrast(1.14) brightness(0.88) saturate(0.92) hue-rotate(-8deg)',
    gradient: 'radial-gradient(ellipse at 50% 45%, rgba(18,24,36,0.22) 0%, rgba(10,9,8,0.72) 75%, rgba(10,9,8,0.97) 100%)',
    tag: '2700K Architectural',
  },
};

const Hero = () => {
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const videoRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [atmosphere, setAtmosphere] = useState('natural');
  const [progress, setProgress] = useState(0);

  // 1. Instant Safe Autoplay & Lifecycle Handling
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // React JSX doesn't always bind muted attribute reliably on initial render
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;

    const onPlayReady = () => {
      setIsVideoReady(true);
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch((err) => {
            console.warn('Autoplay waiting for gesture:', err);
            setIsPlaying(false);
          });
      }
    };

    if (video.readyState >= 2) {
      onPlayReady();
    } else {
      video.addEventListener('loadeddata', onPlayReady, { once: true });
      video.addEventListener('canplay', onPlayReady, { once: true });
    }

    const onTimeUpdate = () => {
      if (video.duration) {
        setProgress((video.currentTime / video.duration) * 100);
      }
    };

    video.addEventListener('timeupdate', onTimeUpdate);

    return () => {
      video.removeEventListener('timeupdate', onTimeUpdate);
    };
  }, []);

  // 2. Viewport-Aware Resource Optimization
  // Automatically pause decoding when scrolled out of view to eliminate scroll lag & frame drops
  useEffect(() => {
    const video = videoRef.current;
    const heroEl = heroRef.current;
    if (!video || !heroEl || !window.IntersectionObserver) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (video.paused && isPlaying) {
              video.play().catch(() => {});
            }
          } else {
            if (!video.paused) {
              video.pause();
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(heroEl);
    return () => observer.disconnect();
  }, [isPlaying]);

  // Toggle Video Playback
  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  // Toggle Video Audio
  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const currentAtmo = ATMOSPHERES[atmosphere];

  const rollUpVariants = {
    hidden: { y: '100%', opacity: 0 },
    visible: (i = 0) => ({
      y: '0%',
      opacity: 1,
      transition: {
        duration: 0.85,
        delay: i * 0.1,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  };

  const trustStats = [
    { value: '1,300+', label: 'Canadian Homes Transformed' },
    { value: '4+ Years', label: 'Saskatoon Craftsmanship' },
    { value: '100%',   label: 'Tailored Satisfaction' },
    { value: 'Free',   label: 'In-Home Measurement' },
  ];

  return (
    <section
      ref={heroRef}
      className={`relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0A0908] text-white pt-28 pb-20 ${styles.heroContainer}`}
      aria-label="Hero section"
    >
      {/* 1. Cinematic Background Video Stage */}
      <div className="absolute inset-0 z-0 overflow-hidden select-none pointer-events-none">
        
        {/* Instant Fallback Poster Image — ZERO blank/black frame latency */}
        <img
          src="/assets/imgs/home/hero-main.jpg"
          alt="Brighton Decor Hero Ambience"
          className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000 ${
            isVideoReady ? 'opacity-0' : 'opacity-100'
          }`}
          loading="eager"
          fetchpriority="high"
        />

        {/* 4K Hardware-Accelerated Video with Live Atmosphere Color Grading */}
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          onPlaying={() => setIsVideoReady(true)}
          onCanPlay={() => setIsVideoReady(true)}
          className={`w-full h-full object-cover object-center transition-all duration-700 ${
            isVideoReady ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ filter: currentAtmo.filter }}
        >
          <source src="/assets/videos/home/hero-background.mp4" type="video/mp4" />
          <source src="/assets/videos/home/LUXURY INTERIOR DESIGN.mp4" type="video/mp4" />
        </video>

        {/* Dynamic Architectural Vignette based on Atmosphere */}
        <div
          className="absolute inset-0 transition-all duration-700"
          style={{ background: currentAtmo.gradient }}
        />

        {/* Soft horizontal text-contrast gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0908]/80 via-[#0A0908]/35 to-transparent" />

        {/* Subtle top & bottom floor blends */}
        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#0A0908] via-[#0A0908]/50 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#0A0908]/75 to-transparent" />

        {/* Architectural Grid Linework */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(201,165,90,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(201,165,90,0.04)_1px,transparent_1px)] bg-[size:64px_64px]" />
      </div>

      {/* 2. Hero Content Stage */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full mt-6">
        <div className="max-w-3xl">
          
          {/* Label Pill */}
          <div className="overflow-hidden inline-block mb-6">
            <motion.div
              custom={0}
              initial="hidden"
              animate="visible"
              variants={rollUpVariants}
              className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full backdrop-blur-md bg-black/45 border border-[#C9A55A]/35 shadow-lg"
            >
              <div className="w-2 h-2 rounded-full bg-[#C9A55A] animate-pulse" />
              <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#C9A55A] font-sans">
                Saskatoon Flagship · Handcrafted in Canada
              </span>
            </motion.div>
          </div>

          {/* Headline Roll-Up */}
          <h1
            className="font-serif text-white leading-[1.08] mb-6 tracking-tight drop-shadow-2xl"
            style={{ fontSize: 'clamp(2.75rem, 5.2vw, 5.15rem)' }}
          >
            <div className="overflow-hidden">
              <motion.span
                custom={1}
                initial="hidden"
                animate="visible"
                variants={rollUpVariants}
                className="block"
              >
                Brightening
              </motion.span>
            </div>
            <div className="overflow-hidden">
              <motion.span
                custom={2}
                initial="hidden"
                animate="visible"
                variants={rollUpVariants}
                className="block italic text-[#C9A55A]"
              >
                Your Home.
              </motion.span>
            </div>
            <div className="overflow-hidden">
              <motion.span
                custom={3}
                initial="hidden"
                animate="visible"
                variants={rollUpVariants}
                className="block"
              >
                Defining Your Space.
              </motion.span>
            </div>
          </h1>

          {/* Sub-copy with frosted backdrop for perfect legibility */}
          <div className="overflow-hidden mb-9 max-w-xl">
            <motion.p
              custom={4}
              initial="hidden"
              animate="visible"
              variants={rollUpVariants}
              className="text-white/90 text-base md:text-lg leading-relaxed font-sans font-light drop-shadow-md bg-black/25 backdrop-blur-xs p-2.5 rounded-lg border border-white/5"
            >
              Custom-engineered window blinds, architectural drapery, and luxury Canadian flooring. 
              Precision laser measurement, white-glove installation, and enduring beauty.
            </motion.p>
          </div>

          {/* Action CTAs */}
          <div className="overflow-hidden inline-block">
            <motion.div
              custom={5}
              initial="hidden"
              animate="visible"
              variants={rollUpVariants}
              className="flex flex-col sm:flex-row gap-4"
            >
              <button
                id="hero-cta-measurement"
                onClick={() => navigate('/contact')}
                className="group relative inline-flex items-center justify-center gap-3 bg-[#C9A55A] text-[#0A0908] px-8 py-4 text-[11px] uppercase font-bold tracking-[0.2em] font-sans hover:bg-white transition-all duration-300 shadow-[0_10px_30px_rgba(201,165,90,0.35)] transform hover:-translate-y-0.5 rounded-full"
              >
                <Ruler size={15} />
                <span>Book Free Measurement</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                id="hero-cta-3d"
                onClick={() => navigate('/room-viewer')}
                className="group relative inline-flex items-center justify-center gap-3 backdrop-blur-xl bg-black/45 border border-white/30 text-white px-8 py-4 text-[11px] uppercase font-bold tracking-[0.2em] font-sans hover:border-[#C9A55A] hover:bg-[#C9A55A]/15 hover:text-[#C9A55A] transition-all duration-300 rounded-full shadow-lg"
              >
                <Sparkles size={14} className="text-[#C9A55A]" />
                <span>Launch 3D Room Studio</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          </div>

          {/* Trust Badges */}
          <motion.div
            custom={6}
            initial="hidden"
            animate="visible"
            variants={rollUpVariants}
            className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-12 pt-7 border-t border-white/15"
          >
            {trustStats.map((stat) => (
              <div key={stat.label} className="group">
                <div className="font-serif text-2xl sm:text-3xl font-bold text-[#C9A55A] group-hover:scale-105 transition-transform origin-left drop-shadow-md">
                  {stat.value}
                </div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-white/70 font-sans font-medium mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>

        </div>
      </div>

      {/* 3. INNOVATION: Interactive Ambient Video Control Center (Bottom Right) */}
      <div className="absolute bottom-6 right-4 sm:right-8 md:right-12 z-20 flex flex-col items-end gap-2.5">
        
        {/* Floating Glassmorphism Controller Bar */}
        <div className="flex items-center gap-2 p-1.5 rounded-full bg-[#12100E]/80 backdrop-blur-xl border border-white/15 shadow-[0_15px_35px_rgba(0,0,0,0.6)]">
          
          {/* Atmosphere Lighting Mode Switcher */}
          <div className="flex items-center gap-1 bg-black/40 p-1 rounded-full border border-white/10">
            {Object.values(ATMOSPHERES).map((atmo) => {
              const Icon = atmo.icon;
              const isSelected = atmosphere === atmo.id;
              return (
                <button
                  key={atmo.id}
                  onClick={() => setAtmosphere(atmo.id)}
                  className={`relative px-2.5 py-1 rounded-full text-[9px] uppercase tracking-wider font-sans font-bold flex items-center gap-1.5 transition-all duration-300 ${
                    isSelected
                      ? 'bg-[#C9A55A] text-[#0A0908] shadow-[0_0_12px_rgba(201,165,90,0.5)]'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                  title={`Switch to ${atmo.name} lighting`}
                >
                  <Icon size={11} />
                  <span className="hidden md:inline">{atmo.name}</span>
                </button>
              );
            })}
          </div>

          <div className="h-4 w-[1px] bg-white/15 mx-0.5" />

          {/* Play/Pause Button */}
          <button
            onClick={togglePlay}
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-[#C9A55A] hover:text-[#0A0908] text-white/80 border border-white/10 flex items-center justify-center transition-all duration-300 focus:outline-none"
            title={isPlaying ? 'Pause video' : 'Play video'}
            aria-label={isPlaying ? 'Pause video' : 'Play video'}
          >
            {isPlaying ? <Pause size={12} /> : <Play size={12} className="ml-0.5" />}
          </button>

          {/* Sound Mute/Unmute Toggle */}
          <button
            onClick={toggleMute}
            className={`h-8 px-2.5 rounded-full flex items-center gap-1.5 border transition-all duration-300 focus:outline-none ${
              isMuted
                ? 'bg-white/5 text-white/70 border-white/10 hover:border-[#C9A55A] hover:text-white'
                : 'bg-[#C9A55A] text-[#0A0908] border-[#C9A55A] font-bold shadow-[0_0_12px_rgba(201,165,90,0.4)]'
            }`}
            title={isMuted ? 'Unmute ambient sound' : 'Mute ambient sound'}
            aria-label={isMuted ? 'Unmute ambient sound' : 'Mute ambient sound'}
          >
            {isMuted ? (
              <VolumeX size={13} />
            ) : (
              <>
                <Volume2 size={13} />
                <span className="flex items-center gap-0.5 h-2.5">
                  <span className="w-0.5 h-2.5 bg-current animate-pulse" />
                  <span className="w-0.5 h-1.5 bg-current animate-pulse delay-75" />
                  <span className="w-0.5 h-3 bg-current animate-pulse delay-150" />
                </span>
              </>
            )}
            <span className="text-[9px] font-sans uppercase tracking-wider hidden sm:inline">
              {isMuted ? 'Muted' : 'Audio'}
            </span>
          </button>
        </div>

        {/* Live Playback Indicator Pill */}
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-[9px] font-mono text-white/60">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>4K Flagship Reel</span>
          <span className="text-white/30">·</span>
          <span className="text-[#C9A55A]">{currentAtmo.tag}</span>
        </div>
      </div>

      {/* 4. Real-time Video Timeline Scrubber Bar along bottom of hero */}
      <div className="absolute bottom-0 inset-x-0 h-0.5 bg-white/10 z-20">
        <div
          className="h-full bg-gradient-to-r from-[#C9A55A] to-[#E5CF9E] transition-all duration-200"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* 5. Minimal Luxury Scroll Down Indicator */}
      <div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden sm:flex flex-col items-center gap-1.5 pointer-events-none"
        aria-hidden="true"
      >
        <div className="w-[1px] h-6 bg-gradient-to-b from-[#C9A55A] to-transparent animate-pulse" />
        <span className="text-[8px] uppercase tracking-[0.3em] text-white/40 font-mono">Scroll</span>
      </div>
    </section>
  );
};

export default Hero;
