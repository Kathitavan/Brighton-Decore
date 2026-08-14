// src/components/home/AboutSnippet.jsx
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, CheckCircle, Sparkles } from 'lucide-react';
import styles from '../../styles/pages/home.module.css';

const highlights = [
  'Free on-site measurement, no obligation',
  'Professional installation by trained technicians',
  '1-year warranty on all workmanship',
  'Serving Saskatoon and all of Canada',
  'Established 2022 — 1,300+ homes transformed',
];

const AboutSnippet = () => {
  const navigate = useNavigate();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section
      ref={ref}
      className="py-16 md:py-24 bg-[#0A0908] text-white relative overflow-hidden border-t border-white/10"
      aria-label="About Brighton Decor"
    >
      {/* Background Grid & Ambient Glow */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(201,165,90,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(201,165,90,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[450px] h-[450px] bg-[#C9A55A]/8 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Tightly Integrated Image Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.7)] border border-white/15 group">
              <div className="aspect-[4/5] overflow-hidden bg-[#1A1814]">
                <img
                  src="/assets/imgs/home/about-snippet.jpg"
                  alt="Brighton Decor Ltd showroom — Saskatoon, Saskatchewan"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = '/assets/imgs/common/placeholder.jpg';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0908] via-transparent to-transparent opacity-70" />
              </div>

              {/* Gold Outline Sheen Overlay */}
              <div className="absolute inset-0 border border-[#C9A55A]/30 rounded-2xl pointer-events-none" />
            </div>

            {/* Floating Glass Accent Badge */}
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : {}}
              transition={{ delay: 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="absolute -bottom-5 -right-5 backdrop-blur-2xl bg-[#0A0908]/90 border border-[#C9A55A]/40 p-5 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.7)] flex items-center gap-3.5 z-20"
            >
              <div className="w-11 h-11 rounded-xl bg-[#C9A55A] text-[#0A0908] flex items-center justify-center font-serif text-2xl font-bold shadow-[0_0_15px_rgba(201,165,90,0.4)]">
                4+
              </div>
              <div>
                <div className="font-serif text-white text-sm font-bold">Years of Excellence</div>
                <div className="text-white/60 text-[11px] font-sans font-light">Est. 2022 · Saskatoon</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Text Content Column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="inline-flex items-center gap-3 px-3.5 py-1.5 rounded-full bg-[#C9A55A]/10 border border-[#C9A55A]/30">
              <Sparkles size={14} className="text-[#C9A55A]" />
              <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#C9A55A]">
                Our Heritage & Mission
              </span>
            </div>

            <h2 className="font-serif text-white text-3xl sm:text-4xl md:text-5xl leading-tight">
              Thoughtful Interiors,<br />
              <span className="italic text-[#C9A55A]">Expertly Delivered.</span>
            </h2>

            <p className="text-white/80 text-lg leading-relaxed font-sans font-light">
              Brighton Decor Ltd was founded in Saskatoon, Saskatchewan in 2022 with a single purpose: 
              to bring beautifully chosen window coverings and quality flooring to Canadian homes — 
              installed with the precision and care that homeowners deserve.
            </p>

            <p className="text-white/60 text-base leading-relaxed font-sans font-light">
              Since opening, we've transformed over 1,300 homes across Canada. Every project starts 
              with a free on-site measurement and ends with a space you'll love to live in.
            </p>

            {/* Checklist Highlights */}
            <ul className="space-y-3 pt-4 border-t border-white/10">
              {highlights.map((item, idx) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.25 + idx * 0.08 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-5 h-5 rounded-full bg-[#C9A55A]/15 border border-[#C9A55A]/40 flex items-center justify-center text-[#C9A55A] flex-shrink-0">
                    <CheckCircle size={13} />
                  </div>
                  <span className="text-white/80 text-sm font-sans font-medium">{item}</span>
                </motion.li>
              ))}
            </ul>

            <div className="pt-2">
              <button
                onClick={() => navigate('/about')}
                className="group relative inline-flex items-center gap-3 bg-[#C9A55A] text-[#0A0908] px-8 py-4 text-[11px] uppercase font-bold tracking-[0.2em] hover:bg-white transition-all duration-300 shadow-[0_10px_30px_rgba(201,165,90,0.3)] rounded-full"
              >
                <span>Learn More About Us</span>
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default AboutSnippet;
