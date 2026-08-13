import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronDown, ArrowRight } from 'lucide-react';
import heroImg from '../../assets/images/hero/hero-1.jpg';

const Hero = () => {
  const ref = useRef(null);

  return (
    <section ref={ref} className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImg}
          alt="Bright modern room with premium window blinds installed — Brighton Decor Saskatoon"
          className="w-full h-full object-cover"
          loading="eager"
          fetchPriority="high"
          width={1920}
          height={1080}
        />
        {/* Deep navy overlay */}
        <div className="absolute inset-0" style={{ background: 'rgba(10,22,40,0.65)' }} />
        {/* Gradient vignette */}
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse at center, transparent 30%, rgba(10,22,40,0.7) 100%)'
        }} />
      </div>

      {/* Decorative gold lines */}
      <div className="absolute top-0 left-0 w-full h-[1px] opacity-30" style={{
        background: 'linear-gradient(90deg, transparent, #C4A265, transparent)'
      }} />
      <div className="absolute bottom-0 left-0 w-full h-[1px] opacity-30" style={{
        background: 'linear-gradient(90deg, transparent, #C4A265, transparent)'
      }} />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Small label */}
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="section-label block mb-8"
        >
          Saskatoon's Blind &amp; Flooring Specialists
        </motion.span>

        {/* H1 */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
          className="text-5xl md:text-7xl lg:text-8xl font-serif text-white mb-8 leading-tight"
        >
          Brightening<br />
          <span className="italic" style={{ color: '#C4A265' }}>Your Home.</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-base md:text-xl font-light mb-12 max-w-2xl mx-auto leading-relaxed"
          style={{ color: '#C8C0B0' }}
        >
          Premium window blinds, dream curtains, and flooring — measured and installed
          by Saskatoon's most trusted team.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link to="/contact" className="w-full sm:w-auto">
            <button className="btn-gold w-full sm:w-auto px-10 py-4 uppercase tracking-widest text-xs font-bold rounded-none flex items-center justify-center gap-2">
              Book Free Measurement
              <ArrowRight size={14} />
            </button>
          </Link>
          <Link to="/portfolio" className="w-full sm:w-auto">
            <button
              className="w-full sm:w-auto border px-10 py-4 uppercase tracking-widest text-xs font-bold hover:bg-gold/10 transition-all duration-300 rounded-none"
              style={{ borderColor: 'rgba(196,162,101,0.4)', color: '#F5F2EC' }}
            >
              View Our Work
            </button>
          </Link>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
        style={{ color: '#C4A265' }}
      >
        <ChevronDown size={32} strokeWidth={1} />
      </motion.div>
    </section>
  );
};

export default Hero;
