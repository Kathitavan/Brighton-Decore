import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=2000"
          alt="Luxury Interior"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-gold uppercase tracking-[0.4em] text-xs md:text-sm font-sans block mb-6"
        >
          Brighton Decore Studio
        </motion.span>
        
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
          className="text-5xl md:text-7xl lg:text-8xl font-serif text-white mb-8 leading-tight"
        >
          Where Spaces <br /> <span className="italic">Tell Stories</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-ivory-muted text-base md:text-xl font-light mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          India's premier interior design studio creating bespoke luxury environments for modern living.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <Link to="/portfolio" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto border border-gold text-gold px-10 py-4 uppercase tracking-widest text-xs font-bold hover:bg-gold hover:text-bg-primary transition-all duration-300">
              Explore Our Work
            </button>
          </Link>
          <Link to="/contact" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto bg-gold text-bg-primary border border-gold px-10 py-4 uppercase tracking-widest text-xs font-bold hover:bg-white hover:border-white transition-all duration-300">
              Book a Consultation
            </button>
          </Link>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 text-gold"
      >
        <ChevronDown size={32} strokeWidth={1} />
      </motion.div>
    </section>
  );
};

export default Hero;
