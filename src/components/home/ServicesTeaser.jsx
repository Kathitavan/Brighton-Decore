// src/components/home/ServicesTeaser.jsx
import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Layers, Grid, Hammer, Ruler, Frame, Lightbulb, Sparkles } from 'lucide-react';

const icons = { Layers, Grid, Hammer, Ruler, Frame, Lightbulb };

const services = [
  { icon: 'Layers',    name: 'Window Blinds',          desc: 'Roller, zebra, honeycomb, vertical, wooden & PVC blinds.', path: '/services' },
  { icon: 'Frame',     name: 'Window Coverings',        desc: 'Custom curtains, sheers, and blackout solutions.', path: '/services' },
  { icon: 'Grid',      name: 'Flooring Supply',         desc: 'Hardwood, laminate, vinyl plank, and more.', path: '/services' },
  { icon: 'Hammer',    name: 'Flooring Installation',   desc: 'Professional install with a 1-year warranty.', path: '/services' },
  { icon: 'Ruler',     name: 'Free Site Measurement',   desc: 'Complimentary on-site measuring — no obligation.', path: '/services' },
  { icon: 'Lightbulb', name: 'Design Consultation',     desc: 'Expert, no-pressure guidance in your own home.', path: '/services' },
];

const ServiceTiltCard = ({ service, index, isInView }) => {
  const navigate = useNavigate();
  const cardRef = useRef(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const Icon = icons[service.icon] || Layers;

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 14;
    const rotateY = (centerX - x) / 14;
    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        onClick={() => navigate(service.path)}
        style={{
          transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
          transition: 'transform 0.15s ease-out',
        }}
        className="group relative cursor-pointer overflow-hidden backdrop-blur-xl bg-gradient-to-br from-white/[0.04] via-white/[0.01] to-transparent border border-white/10 p-8 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-500 hover:border-[#C9A55A]/50 hover:shadow-[0_30px_70px_rgba(201,165,90,0.15)] flex flex-col justify-between h-full transform-gpu"
      >
        {/* Mouse Spotlight Glow */}
        <div
          className="pointer-events-none absolute -inset-px transition-opacity duration-500 rounded-[inherit]"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(201, 165, 90, 0.15), transparent 70%)`,
          }}
        />

        {/* Gold Sheen Sweep Effect */}
        {isHovered && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: '200%' }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-[#C9A55A]/20 to-transparent skew-x-12 pointer-events-none"
          />
        )}

        <div>
          <div className="w-12 h-12 rounded-xl bg-[#C9A55A]/10 border border-[#C9A55A]/30 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#C9A55A] group-hover:text-[#0A0908] transition-all duration-300 text-[#C9A55A]">
            <Icon size={22} />
          </div>

          <h3 className="font-serif text-white text-2xl font-bold mb-3 group-hover:text-[#C9A55A] transition-colors duration-300">
            {service.name}
          </h3>

          <p className="text-white/70 font-sans font-light text-sm leading-relaxed mb-6">
            {service.desc}
          </p>
        </div>

        <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[10px] uppercase font-bold tracking-[0.2em] text-[#C9A55A] font-sans">
          <span>Explore Service</span>
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </motion.div>
  );
};

const ServicesTeaser = () => {
  const navigate = useNavigate();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section
      ref={ref}
      className="py-16 md:py-24 bg-[#0A0908] text-white relative overflow-hidden"
      aria-label="Our services"
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(201,165,90,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(201,165,90,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-[#C9A55A]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-3 px-3.5 py-1.5 rounded-full bg-[#C9A55A]/10 border border-[#C9A55A]/25 mb-4">
              <Sparkles size={14} className="text-[#C9A55A]" />
              <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#C9A55A]">
                Comprehensive Offerings
              </span>
            </div>

            <h2 className="font-serif text-white text-3xl sm:text-4xl md:text-5xl leading-tight">
              Architectural Services for <br />
              <span className="italic text-[#C9A55A]">Refined Canadian Spaces</span>
            </h2>
          </motion.div>

          <motion.button
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            onClick={() => navigate('/services')}
            className="group inline-flex items-center gap-3 border border-white/20 px-6 py-3.5 text-[11px] uppercase tracking-[0.2em] font-bold font-sans text-white hover:border-[#C9A55A] hover:text-[#C9A55A] transition-all duration-300 rounded-full"
          >
            <span>View All Services</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <ServiceTiltCard key={service.name} service={service} index={i} isInView={isInView} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default ServicesTeaser;
