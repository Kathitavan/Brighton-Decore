// src/components/home/Hero.jsx
// Brighton Decor Canada — Cinematic Architectural Hero Experience
// Optimized for zero scroll lag, crystal-clear 4K video visibility, and interactive ambient controls.

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
  Compass, 
  Layers 
} from 'lucide-react';
import styles from '../../styles/pages/home.module.css';

const Hero = () => {
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const videoRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

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
      className={`relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0A0908] text-white pt-28 pb-16 ${styles.heroContainer}`}
      aria-label="Hero section"
    >
      {/* 1. Cinematic Background Video — Crystal-Clear, Vibrant & Hardware-Accelerated */}
      <div className="absolute inset-0 z-0 overflow-hidden select-none pointer-events-none transform-gpu">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="/assets/imgs/home/hero-main.jpg"
          onLoadedData={() => setIsVideoLoaded(true)}
          className={`w-full h-full object-cover object-center transition-opacity duration-1000 ${
            isVideoLoaded ? 'opacity-90 contrast-[1.06] brightness-[1.03]' : 'opacity-40'
          }`}
        >
          <source src="/assets/videos/home/hero-background.mp4" type="video/mp4" />
          <source src="/assets/videos/home/LUXURY INTERIOR DESIGN.mp4" type="video/mp4" />
        </video>

        {/* Crisp Cinematic Vignette — Retains vivid room colors while ensuring text readability */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at 50% 45%, rgba(10,9,8,0.12) 0%, rgba(10,9,8,0.62) 80%, rgba(10,9,8,0.92) 100%)',
          }}
        />

        {/* Soft horizontal text-contrast gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0908]/75 via-[#0A0908]/30 to-transparent" />

        {/* Subtle top & bottom floor blends */}
        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#0A0908] via-[#0A0908]/40 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#0A0908]/70 to-transparent" />

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
              className="text-white/90 text-base md:text-lg leading-relaxed font-sans font-light drop-shadow-md bg-black/20 backdrop-blur-xs p-2 rounded-lg"
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

      {/* 3. INNOVATION: Interactive Ambient Video Controller (Bottom Right) */}
      <div className="absolute bottom-8 right-6 md:right-12 z-20 flex items-center gap-2.5">
        {/* Ambient Badge */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/15 text-[10px] text-white/70 font-mono tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>4K Flagship Reel</span>
        </div>

        {/* Play/Pause Button */}
        <button
          onClick={togglePlay}
          className="w-9 h-9 rounded-full bg-black/50 hover:bg-[#C9A55A] hover:text-[#0A0908] text-white/80 border border-white/20 flex items-center justify-center backdrop-blur-md transition-all duration-300 shadow-md focus:outline-none"
          title={isPlaying ? 'Pause video' : 'Play video'}
          aria-label={isPlaying ? 'Pause video' : 'Play video'}
        >
          {isPlaying ? <Pause size={13} /> : <Play size={13} className="ml-0.5" />}
        </button>

        {/* Sound Mute/Unmute Toggle */}
        <button
          onClick={toggleMute}
          className={`h-9 px-3 rounded-full flex items-center gap-2 border backdrop-blur-md transition-all duration-300 shadow-md focus:outline-none ${
            isMuted
              ? 'bg-black/50 text-white/80 border-white/20 hover:border-[#C9A55A]'
              : 'bg-[#C9A55A] text-[#0A0908] border-[#C9A55A] font-bold'
          }`}
          title={isMuted ? 'Unmute ambient sound' : 'Mute ambient sound'}
          aria-label={isMuted ? 'Unmute ambient sound' : 'Mute ambient sound'}
        >
          {isMuted ? (
            <VolumeX size={14} />
          ) : (
            <>
              <Volume2 size={14} />
              {/* Animated mini soundwave bars */}
              <span className="flex items-center gap-0.5 h-3">
                <span className="w-0.5 h-3 bg-current animate-pulse" />
                <span className="w-0.5 h-2 bg-current animate-pulse delay-75" />
                <span className="w-0.5 h-3.5 bg-current animate-pulse delay-150" />
              </span>
            </>
          )}
          <span className="text-[10px] font-sans uppercase tracking-wider hidden md:inline">
            {isMuted ? 'Audio' : 'Playing'}
          </span>
        </button>
      </div>

      {/* 4. Minimal Luxury Scroll Down Indicator (Bottom Center) */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 pointer-events-none"
        aria-hidden="true"
      >
        <div className="w-[1px] h-8 bg-gradient-to-b from-[#C9A55A] to-transparent animate-pulse" />
        <span className="text-[9px] uppercase tracking-[0.3em] text-white/45 font-mono">Scroll</span>
      </div>
    </section>
  );
};

export default Hero;
