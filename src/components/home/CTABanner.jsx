// src/components/home/CTABanner.jsx
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Phone, Ruler, Sparkles } from 'lucide-react';
import { company } from '../../config/company';

const CTABanner = () => {
  const navigate = useNavigate();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section
      ref={ref}
      className="relative bg-[#0A0908] text-white py-16 md:py-24 px-6 md:px-12 overflow-hidden border-t border-white/10"
      aria-label="Call to action — book free measurement"
    >
      {/* Blueprint Grid & Ambient Radial Light Glow */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(201,165,90,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(201,165,90,0.03)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#C9A55A]/10 rounded-full blur-[200px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="backdrop-blur-2xl bg-white/[0.03] border border-[#C9A55A]/30 p-10 md:p-16 rounded-3xl shadow-[0_30px_80px_rgba(0,0,0,0.6)]">
          
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            
            {/* Copy Column */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-2xl"
            >
              <div className="inline-flex items-center gap-3 px-3.5 py-1.5 rounded-full bg-[#C9A55A]/10 border border-[#C9A55A]/25 mb-6">
                <Sparkles size={14} className="text-[#C9A55A]" />
                <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#C9A55A]">
                  Zero Cost · Zero Obligation
                </span>
              </div>

              <h2 className="font-serif text-white text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-6">
                Book Your Free Site Measurement Today.
              </h2>

              <p className="text-white/80 text-lg font-sans font-light leading-relaxed">
                We come to you. We measure. We recommend. You decide — completely 
                free and with zero pressure. Available across Saskatoon and all of Canada.
              </p>
            </motion.div>

            {/* Action Buttons Column */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row lg:flex-col gap-5 flex-shrink-0 w-full sm:w-auto"
            >
              <button
                id="cta-banner-measurement"
                onClick={() => navigate('/contact')}
                className="group relative inline-flex items-center justify-center gap-3 bg-[#C9A55A] text-[#0A0908] px-8 py-5 text-[11px] uppercase font-bold tracking-[0.2em] font-sans hover:bg-white transition-all duration-300 shadow-[0_15px_40px_rgba(201,165,90,0.3)] transform hover:-translate-y-1 rounded-full"
              >
                <Ruler size={16} />
                <span>Book Free Measurement</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href={`tel:${company.phoneRaw}`}
                className="group inline-flex items-center justify-center gap-3 backdrop-blur-xl bg-white/[0.05] border border-white/20 text-white px-8 py-5 text-[11px] uppercase font-bold tracking-[0.2em] font-sans hover:border-[#C9A55A] hover:text-[#C9A55A] transition-all duration-300 rounded-full"
              >
                <Phone size={16} />
                <span>{company.phone}</span>
              </a>
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default CTABanner;
