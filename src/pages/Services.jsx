// src/pages/Services.jsx
// Brighton Decor Canada — Services V2 3D Interactive Architectural Experience
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import PageTransition from '../components/common/PageTransition';
import { services, processSteps } from '../data/services';
import ServiceDrawer from '../components/services/ServiceDrawer';
import { ArrowRight, Layers, Grid, Hammer, Ruler, Frame, Lightbulb, CheckCircle2, Sparkles, ShieldCheck, FileText, ArrowUpRight, Sun, Shield, Box } from 'lucide-react';
import styles from '../styles/pages/services.module.css';

const trustStats = [
  { value: '1,300+', label: 'Canadian Homes Transformed' },
  { value: '4+', label: 'Years of Atelier Service' },
  { value: '100%', label: 'Customer Satisfaction' },
  { value: '1-Year', label: 'Workmanship Warranty' },
];

const serviceBenefits = [
  {
    icon: Ruler,
    title: 'Guaranteed Precise Fit',
    description: 'Every window shade and flooring plank is laser-measured to within a millimeter before fabrication.',
  },
  {
    icon: Hammer,
    title: 'Professional Technicians',
    description: 'Our in-house master installers prepare subfloors, align drapes, and clean up completely.',
  },
  {
    icon: Sun,
    title: 'Optimal Light Control',
    description: 'Custom opacity levels from soft sheer illumination to 100% total room-darkening blackout.',
  },
  {
    icon: Shield,
    title: 'Canadian Climate Rated',
    description: 'High-R insulation window fabrics and humidity-stable hardwood timber designed for Canadian winters.',
  },
];

// Interactive 3D Card with Mouse Tilt & Radial Laser Spotlight
const ServiceCard3D = ({ service, idx, colSpan, onClick }) => {
  const cardRef = useRef(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const formattedNum = String(idx + 1).padStart(2, '0');

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8; // max 8 deg tilt
    const rotateY = ((x - centerX) / centerX) * 8;
    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: idx * 0.08 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={() => onClick(service)}
      style={{
        transform: isHovered
          ? `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) translateZ(10px)`
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)',
        transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.6s ease-out',
      }}
      className={`${colSpan} group cursor-pointer relative min-h-[400px] rounded-3xl overflow-hidden bg-[#141822] border border-[#C9A55A]/25 hover:border-[#C9A55A]/70 flex flex-col justify-between p-8 shadow-[0_20px_50px_rgba(0,0,0,0.6)] hover:shadow-[0_30px_70px_rgba(201,165,90,0.22)] transition-colors duration-500 select-none transform-gpu`}
    >
      {/* Laser Radial Spotlight Follower */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 z-20 rounded-[inherit]"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(450px circle at ${mousePos.x}px ${mousePos.y}px, rgba(201, 165, 90, 0.22), transparent 70%)`,
        }}
      />

      {/* Background Image Container */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-[#0B0E14]">
        <img
          src={service.image}
          alt={service.name}
          className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-108 filter brightness-[0.5] group-hover:brightness-[0.6]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0E14] via-[#0B0E14]/65 to-transparent opacity-90 group-hover:opacity-75 transition-opacity" />
      </div>

      {/* Top Meta Badges */}
      <div className="relative z-10 flex items-center justify-between pointer-events-none">
        <span className="font-mono text-xs font-bold tracking-widest text-[#F2EFE9] bg-[#0B0E14]/85 backdrop-blur-md px-3.5 py-1.5 rounded-lg border border-white/20 shadow-md">
          {formattedNum}
        </span>
        <span className="text-[10px] uppercase font-bold tracking-[0.2em] font-sans text-[#C9A55A] bg-[#0B0E14]/85 backdrop-blur-md px-3.5 py-1.5 rounded-lg border border-[#C9A55A]/40 shadow-md">
          {service.category}
        </span>
      </div>

      {/* Content Details */}
      <div className="relative z-10 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
        <h3 className={`${styles.superHeading} text-[#F2EFE9] text-2xl md:text-3xl font-normal mb-2 group-hover:text-[#C9A55A] transition-colors leading-tight`}>
          {service.name}
        </h3>
        <p className="line-clamp-2 text-white/70 text-xs md:text-sm font-sans font-light leading-relaxed mb-6">
          {service.description}
        </p>

        <div className="pt-4 border-t border-white/15 flex items-center justify-between text-xs font-sans">
          <span className="text-white/60 font-light">{service.tagline}</span>
          <span className="inline-flex items-center gap-1.5 text-[#C9A55A] font-bold tracking-widest text-[11px] uppercase group-hover:text-white transition-colors">
            <span>Explore Service</span>
            <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
          </span>
        </div>
      </div>
    </motion.article>
  );
};

const Services = () => {
  const navigate = useNavigate();
  const [activeService, setActiveService] = useState(services[0]);
  const [selectedDrawerService, setSelectedDrawerService] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const processRef = useRef(null);
  const isProcessInView = useInView(processRef, { once: true, margin: '-60px' });

  const benefitsRef = useRef(null);
  const isBenefitsInView = useInView(benefitsRef, { once: true, margin: '-60px' });

  const handleOpenDrawer = (service) => {
    setSelectedDrawerService(service);
    setIsDrawerOpen(true);
  };

  return (
    <PageTransition>
      <div className={styles.servicesPage}>
        
        {/* 1. CINEMATIC EDITORIAL HERO SECTION WITH SUPER DISPLAY TYPOGRAPHY */}
        <section className={`relative pt-36 pb-24 px-6 md:px-12 overflow-hidden border-b border-white/10 ${styles.gridPattern}`}>
          {/* Glowing Ambient Radial Orb */}
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#C9A55A]/10 rounded-full blur-[160px] pointer-events-none" />

          <div className="max-w-7xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-4xl"
            >
              {/* Eyebrow Badge */}
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#C9A55A]/15 border border-[#C9A55A]/30 mb-6 backdrop-blur-md">
                <Sparkles size={14} className="text-[#C9A55A]" />
                <span className="text-[10px] md:text-xs uppercase font-bold tracking-[0.25em] text-[#C9A55A] font-sans">
                  Brighton Decor / Architectural Services
                </span>
              </div>

              {/* Super Display Headline using Cinzel / Italiana Serif */}
              <h1
                className={`${styles.superHeading} text-[#F2EFE9] font-normal leading-[1.05] mb-6 tracking-tight drop-shadow-xl`}
                style={{ fontSize: 'clamp(2.75rem, 5.5vw, 5.5rem)' }}
              >
                Designed for the way <br />
                <span className="italic text-[#C9A55A] font-serif">you live.</span>
              </h1>

              {/* Editorial Subtext */}
              <p className="text-white/75 text-lg md:text-xl font-sans font-light leading-relaxed max-w-2xl mb-10">
                From precisely measured window coverings to beautifully finished floors, 
                Brighton Decor brings thoughtful products, professional installation and careful attention to every detail.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={() => navigate('/contact')}
                  className="group inline-flex items-center gap-3 bg-[#C9A55A] text-[#0B0E14] px-8 py-4 text-xs uppercase font-bold tracking-[0.2em] font-sans hover:bg-white transition-all duration-300 rounded-full shadow-[0_10px_30px_rgba(201,165,90,0.35)]"
                >
                  <FileText size={15} />
                  <span>Book Free Measurement</span>
                  <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => navigate('/portfolio')}
                  className="group inline-flex items-center gap-3 border border-white/20 bg-white/5 text-white px-8 py-4 text-xs uppercase font-bold tracking-[0.2em] font-sans hover:border-[#C9A55A] hover:text-[#C9A55A] transition-all duration-300 rounded-full"
                >
                  <span>Explore Portfolio</span>
                  <ArrowUpRight size={15} />
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 2. INTERACTIVE NUMBERED SERVICE DISCOVERY WITH 3D PREVIEW */}
        <section className="py-20 md:py-28 px-6 md:px-12 bg-[#0B0E14] border-b border-white/10 relative">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row items-start justify-between gap-6 mb-16">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#C9A55A] block mb-2 font-sans">
                  3D Interactive Discovery
                </span>
                <h2 className={`${styles.superHeading} text-[#F2EFE9] text-3xl md:text-5xl font-normal`}>
                  Explore What We Create
                </h2>
              </div>
              <p className="text-white/60 font-sans text-xs md:text-sm max-w-md font-light leading-relaxed">
                Select a service to interact with technical specifications, custom materials, and tailored options for your home.
              </p>
            </div>

            {/* Asymmetric Split: Numbered Navigation & Live Service Showcase Panel */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              
              {/* Left 5 Columns: Numbered Editorial Service List */}
              <div className="lg:col-span-5 space-y-3">
                {services.map((service, idx) => {
                  const isActive = activeService.id === service.id;
                  const formattedNum = String(idx + 1).padStart(2, '0');

                  return (
                    <button
                      key={service.id}
                      onClick={() => setActiveService(service)}
                      className={`w-full flex items-center justify-between p-5 rounded-2xl border text-left transition-all duration-500 relative group overflow-hidden ${
                        isActive
                          ? 'bg-[#141822] border-[#C9A55A] text-white shadow-[0_15px_40px_rgba(201,165,90,0.2)]'
                          : 'bg-white/[0.02] border-white/10 text-white/70 hover:border-white/30 hover:text-white'
                      }`}
                    >
                      {/* Active Gold Line Indicator */}
                      {isActive && (
                        <motion.div
                          layoutId="activeServiceLine3D"
                          className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#C9A55A]"
                          transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                        />
                      )}

                      <div className="flex items-center gap-4 relative z-10 pl-2">
                        <span className={`font-mono text-xs font-bold tracking-widest ${isActive ? 'text-[#C9A55A]' : 'text-white/40'}`}>
                          {formattedNum}
                        </span>
                        <div>
                          <span className={`${styles.superHeading} text-lg md:text-xl font-normal block leading-snug`}>
                            {service.name}
                          </span>
                          <span className="text-[10px] uppercase tracking-wider text-white/40 font-sans font-light">
                            {service.category}
                          </span>
                        </div>
                      </div>

                      <ArrowUpRight
                        size={18}
                        className={`relative z-10 transition-transform duration-300 ${
                          isActive ? 'text-[#C9A55A] translate-x-0' : 'text-white/20 -translate-x-2 group-hover:translate-x-0 group-hover:text-white/60'
                        }`}
                      />
                    </button>
                  );
                })}
              </div>

              {/* Right 7 Columns: Rich Selected Service Presentation */}
              <div className="lg:col-span-7">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeService.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="bg-[#141822] border border-[#C9A55A]/30 rounded-3xl p-6 md:p-10 space-y-8 shadow-2xl relative overflow-hidden"
                  >
                    {/* Service Visual Header */}
                    <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-[#0B0E14] border border-white/15 group">
                      <img
                        src={activeService.image}
                        alt={activeService.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#141822] via-transparent to-transparent opacity-80" />
                      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-widest font-sans text-[#C9A55A] bg-[#0B0E14]/85 backdrop-blur-md px-3.5 py-1.5 rounded border border-[#C9A55A]/30">
                          {activeService.tagline}
                        </span>
                      </div>
                    </div>

                    {/* Content Details */}
                    <div>
                      <span className="text-xs font-mono font-bold text-[#C9A55A] tracking-widest uppercase block mb-1">
                        Service Highlight
                      </span>
                      <h3 className={`${styles.superHeading} text-[#F2EFE9] text-2xl md:text-4xl font-normal mb-3`}>
                        {activeService.name}
                      </h3>
                      <p className="text-white/75 font-sans font-light text-sm md:text-base leading-relaxed mb-6">
                        {activeService.longDescription}
                      </p>

                      {/* Capabilities List */}
                      {activeService.features && (
                        <div className="pt-4 border-t border-white/10 space-y-3">
                          <span className="text-[10px] uppercase font-bold tracking-widest text-white/50 block font-sans">
                            Tailored Capabilities
                          </span>
                          <div className="grid grid-cols-2 gap-3 font-sans">
                            {activeService.features.map((feat, idx) => (
                              <div key={idx} className="flex items-center gap-2 text-xs text-white/90">
                                <CheckCircle2 size={14} className="text-[#C9A55A] shrink-0" />
                                <span>{feat}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Action Bar */}
                    <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                      <button
                        onClick={() => handleOpenDrawer(activeService)}
                        className="inline-flex items-center gap-2 bg-[#C9A55A] text-[#0B0E14] px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest font-sans hover:bg-white transition-all shadow-xl"
                      >
                        <span>Explore Full Service</span>
                        <ArrowUpRight size={14} />
                      </button>

                      <button
                        onClick={() => navigate('/contact')}
                        className="text-xs font-sans text-white/70 hover:text-[#C9A55A] transition-colors flex items-center gap-1.5 font-bold"
                      >
                        <span>Request Quote</span>
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

            </div>
          </div>
        </section>

        {/* 3. ASYMMETRIC 3D INTERACTIVE SERVICE SHOWCASE GRID */}
        <section className="py-20 md:py-28 px-6 md:px-12 bg-[#0B0E14] relative">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#C9A55A] block mb-2 font-sans">
                3D Interactive Motion Cards
              </span>
              <h2 className={`${styles.superHeading} text-[#F2EFE9] text-3xl md:text-5xl font-normal`}>
                Architectural Service Cards
              </h2>
            </div>

            {/* Asymmetric 12-Column Grid */}
            <div className="grid grid-cols-1 md:grid-cols-8 lg:grid-cols-12 gap-6 md:gap-8 items-stretch">
              {services.map((service, idx) => {
                const colSpan =
                  idx === 0
                    ? 'col-span-12 lg:col-span-7'
                    : idx === 1
                    ? 'col-span-12 lg:col-span-5'
                    : idx === 2
                    ? 'col-span-12 lg:col-span-5'
                    : idx === 3
                    ? 'col-span-12 lg:col-span-7'
                    : idx === 4
                    ? 'col-span-12 lg:col-span-7'
                    : 'col-span-12 lg:col-span-5';

                return (
                  <ServiceCard3D
                    key={service.id}
                    service={service}
                    idx={idx}
                    colSpan={colSpan}
                    onClick={handleOpenDrawer}
                  />
                );
              })}
            </div>
          </div>
        </section>

        {/* 4. ANIMATED 7-STEP EDITORIAL PROCESS TIMELINE */}
        <section ref={processRef} className="py-20 md:py-28 px-6 md:px-12 bg-[#121620] border-y border-white/10 relative">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#C9A55A] block mb-2 font-sans">
                Methodical Execution
              </span>
              <h2 className={`${styles.superHeading} text-[#F2EFE9] text-3xl md:text-5xl font-normal mb-4`}>
                From first measurement to final detail.
              </h2>
              <p className="text-white/70 font-sans text-sm md:text-base font-light leading-relaxed">
                A considered process keeps every decision clear, every measurement precise, and every installation effortless.
              </p>
            </div>

            {/* Horizontal Timeline Layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
              {processSteps.map((step, i) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isProcessInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                  className="bg-[#141822] border border-white/10 hover:border-[#C9A55A]/50 p-6 md:p-8 rounded-2xl relative space-y-4 group transition-all duration-300 shadow-xl"
                >
                  <div className="flex items-center justify-between">
                    <span className={`${styles.superHeading} text-4xl text-[#C9A55A]/40 group-hover:text-[#C9A55A] transition-colors font-normal`}>
                      {step.step}
                    </span>
                    <span className="w-2 h-2 rounded-full bg-[#C9A55A]" />
                  </div>

                  <h3 className={`${styles.superHeading} text-[#F2EFE9] text-xl font-normal`}>
                    {step.title}
                  </h3>

                  <p className="text-white/65 text-xs md:text-sm font-sans font-light leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. WHY BRIGHTON DECOR & SERVICE BENEFITS */}
        <section ref={benefitsRef} className="py-20 md:py-28 px-6 md:px-12 bg-[#0B0E14] relative">
          <div className="max-w-7xl mx-auto space-y-20">
            
            {/* Statistics Counters */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-[#141822] border border-white/15 p-8 rounded-3xl text-center shadow-2xl">
              {trustStats.map((st, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={isBenefitsInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <span className={`${styles.superHeading} text-3xl md:text-5xl text-[#F2EFE9] font-normal block mb-2`}>
                    {st.value}
                  </span>
                  <span className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-[#C9A55A] font-sans block">
                    {st.label}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Why It Matters Grid */}
            <div className="space-y-12">
              <div className="text-center max-w-xl mx-auto">
                <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#C9A55A] block mb-2 font-sans">
                  The Atelier Difference
                </span>
                <h3 className={`${styles.superHeading} text-[#F2EFE9] text-3xl md:text-4xl font-normal`}>
                  Why It Matters
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {serviceBenefits.map((ben, idx) => {
                  const IconComp = ben.icon;
                  return (
                    <div key={idx} className="bg-[#141822] border border-white/10 p-6 rounded-2xl space-y-3 shadow-md">
                      <div className="w-10 h-10 rounded-xl bg-[#C9A55A]/15 border border-[#C9A55A]/30 flex items-center justify-center text-[#C9A55A]">
                        <IconComp size={20} />
                      </div>
                      <h4 className={`${styles.superHeading} text-[#F2EFE9] text-lg font-normal`}>{ben.title}</h4>
                      <p className="text-white/60 text-xs font-sans font-light leading-relaxed">{ben.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </section>

        {/* 6. CINEMATIC DARK CONVERSION CTA BANNER */}
        <section className="py-20 md:py-28 px-6 md:px-12 bg-gradient-to-b from-[#141822] to-[#0B0E14] border-t border-white/10 text-center relative overflow-hidden">
          <div className="max-w-3xl mx-auto relative z-10">
            <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#C9A55A] block mb-3 font-sans">
              Start Your Project
            </span>
            <h2 className={`${styles.superHeading} text-[#F2EFE9] text-3xl sm:text-4xl md:text-6xl font-normal mb-6 leading-tight`}>
              Let's create a space that feels <br className="hidden sm:inline" />
              <span className="italic text-[#C9A55A]">unmistakably yours.</span>
            </h2>
            <p className="text-white/70 font-sans font-light text-base md:text-lg mb-10 max-w-xl mx-auto leading-relaxed">
              Start with a free site measurement and discover what is possible for your home across Saskatoon and Canada.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => navigate('/contact')}
                className="group inline-flex items-center gap-3 bg-[#C9A55A] text-[#0B0E14] px-8 py-4 text-xs uppercase font-bold tracking-[0.2em] font-sans hover:bg-white transition-all duration-300 rounded-full shadow-2xl"
              >
                <FileText size={15} />
                <span>Book Free Measurement</span>
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => navigate('/portfolio')}
                className="group inline-flex items-center gap-3 border border-white/20 bg-white/5 text-white px-8 py-4 text-xs uppercase font-bold tracking-[0.2em] font-sans hover:border-[#C9A55A] hover:text-[#C9A55A] transition-all duration-300 rounded-full"
              >
                <span>Explore Our Work</span>
                <ArrowUpRight size={15} />
              </button>
            </div>
          </div>
        </section>

        {/* Architectural Service Detail Drawer */}
        <ServiceDrawer
          service={selectedDrawerService}
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
        />
      </div>
    </PageTransition>
  );
};

export default Services;
