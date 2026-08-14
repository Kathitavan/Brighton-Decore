// src/components/home/Hero.jsx
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Ruler, Sparkles } from 'lucide-react';
import styles from '../../styles/pages/home.module.css';

const Hero = () => {
  const navigate = useNavigate();
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const videoY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -40]);

  const rollUpVariants = {
    hidden: { y: '100%', opacity: 0 },
    visible: (i = 0) => ({
      y: '0%',
      opacity: 1,
      transition: {
        duration: 0.9,
        delay: i * 0.12,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  };

  const trustStats = [
    { value: '1,300+', label: 'Homes Transformed' },
    { value: '4+',     label: 'Years Experience' },
    { value: '100%',   label: 'Satisfaction' },
    { value: 'Free',   label: 'Site Measurement' },
  ];

  return (
    <section
      ref={heroRef}
      className={`relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0A0908] text-white pt-32 pb-20 ${styles.heroContainer}`}
      aria-label="Hero section"
    >
      {/* 1. Cinematic Background Video */}
      <motion.div
        style={{ scale: videoScale, y: videoY }}
        className="absolute inset-0 z-0 transform-gpu will-change-transform"
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="/assets/imgs/home/hero-main.jpg"
          className={`w-full h-full object-cover object-center opacity-95 ${styles.heroVideo}`}
        >
          <source src="/assets/videos/home/hero-background.mp4" type="video/mp4" />
          <source src="/assets/videos/home/LUXURY INTERIOR DESIGN.mp4" type="video/mp4" />
        </video>

        {/* Multi-layer Gradient Overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at center, rgba(10,9,8,0.2) 0%, rgba(10,9,8,0.7) 100%)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/35 to-black/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0908] via-transparent to-[#0A0908]/40" />
      </motion.div>

      {/* Architectural Grid Linework */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(201,165,90,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(201,165,90,0.05)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none z-0" />

      {/* Ambient Champagne Gold Glow Orb */}
      <div className={`absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#C9A55A]/12 rounded-full blur-[160px] pointer-events-none z-0 ${styles.heroGlowOrb}`} />

      {/* 2. Content */}
      <motion.div
        style={{ y: textY }}
        className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full"
      >
        <div className="max-w-3xl">
          
          {/* Label Pill */}
          <div className="overflow-hidden inline-block mb-6">
            <motion.div
              custom={0}
              initial="hidden"
              animate="visible"
              variants={rollUpVariants}
              className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full backdrop-blur-md bg-black/50 border border-[#C9A55A]/30 shadow-lg"
            >
              <div className="w-2 h-2 rounded-full bg-[#C9A55A] animate-pulse" />
              <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#C9A55A] font-sans">
                Saskatoon, Saskatchewan · Est. 2022
              </span>
            </motion.div>
          </div>

          {/* Headline Roll-Up */}
          <h1
            className={`font-serif text-white leading-[1.08] mb-6 tracking-tight drop-shadow-2xl ${styles.textShadow}`}
            style={{ fontSize: 'clamp(2.85rem, 5.5vw, 5.25rem)' }}
          >
            <div className="overflow-hidden">
              <motion.span
                custom={1}
                initial="hidden"
                animate="visible"
                variants={rollUpVariants}
                className="block drop-shadow-lg"
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
                className="block italic text-[#C9A55A] drop-shadow-lg"
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
                className="block drop-shadow-lg"
              >
                Defining Your Space.
              </motion.span>
            </div>
          </h1>

          {/* Sub-copy */}
          <div className="overflow-hidden mb-10 max-w-xl">
            <motion.p
              custom={4}
              initial="hidden"
              animate="visible"
              variants={rollUpVariants}
              className="text-white/90 text-lg md:text-xl leading-relaxed font-sans font-light drop-shadow-md"
            >
              Thoughtfully selected window coverings and premium flooring, 
              professionally installed across Canada. Serving homes from Saskatoon 
              to coast to coast.
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
                className="group relative inline-flex items-center justify-center gap-3 bg-[#C9A55A] text-[#0A0908] px-8 py-4 text-[11px] uppercase font-bold tracking-[0.2em] font-sans hover:bg-white transition-all duration-300 shadow-[0_10px_30px_rgba(201,165,90,0.4)] transform hover:-translate-y-0.5 rounded-full"
              >
                <Ruler size={15} />
                <span>Book Free Measurement</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                id="hero-cta-3d"
                onClick={() => navigate('/room-viewer')}
                className="group relative inline-flex items-center justify-center gap-3 backdrop-blur-xl bg-black/40 border border-white/25 text-white px-8 py-4 text-[11px] uppercase font-bold tracking-[0.2em] font-sans hover:border-[#C9A55A] hover:text-[#C9A55A] transition-all duration-300 rounded-full"
              >
                <span>Explore 3D Room Studio</span>
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
            className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-14 pt-8 border-t border-white/15"
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
      </motion.div>

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <div className="w-[1px] h-10 bg-gradient-to-b from-[#C9A55A] to-transparent animate-pulse" />
        <span className="text-[9px] uppercase tracking-[0.3em] text-white/50 font-mono">Scroll</span>
      </motion.div>
    </section>
  );
};

export default Hero;
