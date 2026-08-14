// src/pages/NotFound.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowRight, Compass } from 'lucide-react';
import { company } from '../config/company';
import styles from '../styles/pages/notFound.module.css';

const NotFound = () => {
  return (
    <div className={styles.pageWrapper}>
      {/* 404 Watermark Background */}
      <div className={styles.watermark404} aria-hidden="true">
        404
      </div>

      <div className="relative z-10 max-w-xl mx-auto px-6 text-center">
        
        {/* Floating Icon */}
        <div className={`w-20 h-20 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] mx-auto mb-8 shadow-[0_0_30px_rgba(212,175,55,0.2)] ${styles.floatingIcon}`}>
          <Compass size={36} />
        </div>

        {/* Content */}
        <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-[#D4AF37] mb-3 block font-sans">
          Lost In Space · Error 404
        </span>

        <h1 className="font-serif text-white text-4xl md:text-5xl font-bold mb-4 leading-tight">
          Destination Uncharted.
        </h1>

        <p className="text-white/70 text-base font-sans font-light mb-10 max-w-md mx-auto leading-relaxed">
          The interior space or resource you are looking for has been relocated or no longer exists.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/">
            <button className={styles.magneticBtn}>
              <span className="flex items-center gap-2.5">
                <Home size={15} />
                <span>Return to Home</span>
              </span>
            </button>
          </Link>

          <Link to="/contact">
            <button className="group flex items-center gap-2.5 backdrop-blur-xl bg-white/[0.04] border border-white/20 text-white px-8 py-4 text-[11px] uppercase tracking-[0.2em] font-bold font-sans hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all duration-300 rounded-full">
              <span>Contact Concierge</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
        </div>

        {/* Brand Signoff */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col items-center">
          <img src={company.logo} alt={company.name} className="h-10 w-auto object-contain mb-2" />
          <div className="text-[9px] tracking-[0.35em] uppercase text-[#D4AF37] font-mono font-bold">
            Architectural Visualizer
          </div>
        </div>

      </div>
    </div>
  );
};

export default NotFound;
