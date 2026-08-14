// src/components/about/BrandStory.jsx
import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles, ShieldCheck, Award } from 'lucide-react';

const BrandStory = () => {
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const isTextInView = useInView(textRef, { once: true, margin: '-100px' });

  // Parallax scroll effect for image
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [-40, 40]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1.05, 0.98]);

  const paragraphVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: i * 0.15,
        ease: [0.16, 1, 0.3, 1]
      }
    })
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-32 bg-[#0F0E0C] text-white overflow-hidden"
      aria-label="Company story"
    >
      {/* Background Subtle Ambient Glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-[#C9A55A]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Parallax Interactive Image (5 cols) */}
          <div className="lg:col-span-5 relative">
            <motion.div 
              style={{ y: imageY, scale: imageScale }}
              className="relative rounded-2xl overflow-hidden shadow-[0_30px_70px_rgba(0,0,0,0.6)] border border-white/10 group transform-gpu"
            >
              {/* Image Container with Sheen Overlay */}
              <div className="aspect-[4/5] relative overflow-hidden bg-[#1A1814]">
                <img
                  src="/assets/imgs/about/showroom-saskatoon.jpg"
                  alt="Brighton Decor Ltd — Luxury Interior Showroom"
                  className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = '/assets/imgs/common/placeholder.jpg';
                  }}
                />

                {/* Animated Gold Sheen Sweep */}
                <motion.div
                  initial={{ x: '-100%' }}
                  animate={{ x: '200%' }}
                  transition={{
                    repeat: Infinity,
                    duration: 4,
                    repeatDelay: 3,
                    ease: 'easeInOut'
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-[#C9A55A]/20 to-transparent skew-x-12 pointer-events-none"
                />

                {/* Gradient Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F0E0C]/90 via-transparent to-transparent opacity-80" />
              </div>

              {/* Floating Badge */}
              <div className="absolute bottom-6 left-6 right-6 backdrop-blur-xl bg-[#0F0E0C]/80 border border-[#C9A55A]/30 p-4 rounded-xl flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#C9A55A]/10 border border-[#C9A55A]/40 flex items-center justify-center text-[#C9A55A] flex-shrink-0">
                  <Sparkles size={18} />
                </div>
                <div>
                  <h4 className="font-serif text-white text-sm font-bold">Est. 2022 · Saskatoon</h4>
                  <p className="text-white/60 text-[11px] font-sans">Crafting Bespoke Interiors Across Canada</p>
                </div>
              </div>
            </motion.div>

            {/* Architectural Frame Accent */}
            <div className="absolute -bottom-6 -right-6 w-full h-full border border-[#C9A55A]/20 rounded-2xl -z-10 hidden sm:block" />
          </div>

          {/* Staggered Story Content (7 cols) */}
          <div ref={textRef} className="lg:col-span-7 space-y-8">
            <motion.div
              custom={0}
              initial="hidden"
              animate={isTextInView ? 'visible' : 'hidden'}
              variants={paragraphVariants}
              className="inline-flex items-center gap-3 px-3.5 py-1.5 rounded-full bg-[#C9A55A]/10 border border-[#C9A55A]/25"
            >
              <div className="w-2 h-2 rounded-full bg-[#C9A55A] animate-pulse" />
              <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#C9A55A]">
                Our Brand Heritage
              </span>
            </motion.div>

            <motion.h2
              custom={1}
              initial="hidden"
              animate={isTextInView ? 'visible' : 'hidden'}
              variants={paragraphVariants}
              className="font-serif text-3xl sm:text-4xl md:text-5xl text-white leading-[1.15]"
            >
              A Canadian Heritage Built on <br />
              <span className="italic text-[#C9A55A]">Precision, Elegance & Care</span>
            </motion.h2>

            <div className="space-y-5 text-white/70 font-sans font-light text-base md:text-lg leading-relaxed">
              <motion.p
                custom={2}
                initial="hidden"
                animate={isTextInView ? 'visible' : 'hidden'}
                variants={paragraphVariants}
              >
                Brighton Decor Ltd was established in Saskatoon, Saskatchewan in 2022 with a clear architectural mandate: to transform Canadian living spaces through meticulously crafted window treatments and bespoke flooring installations.
              </motion.p>

              <motion.p
                custom={3}
                initial="hidden"
                animate={isTextInView ? 'visible' : 'hidden'}
                variants={paragraphVariants}
              >
                What began as a specialized boutique firm has evolved into a nation-wide studio. Over <strong className="text-white font-medium">1,300 homes</strong> transformed across Canada reflect our relentless standard of excellence — where exact measurements meet timeless aesthetic design.
              </motion.p>

              <motion.p
                custom={4}
                initial="hidden"
                animate={isTextInView ? 'visible' : 'hidden'}
                variants={paragraphVariants}
                className="text-white/90 font-normal italic border-l-2 border-[#C9A55A] pl-4 py-1"
              >
                "We measure with rigor, curate with discernment, and install with perfection. No compromise, no shortcuts."
              </motion.p>
            </div>

            {/* Feature Highlights */}
            <motion.div
              custom={5}
              initial="hidden"
              animate={isTextInView ? 'visible' : 'hidden'}
              variants={paragraphVariants}
              className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10"
            >
              <div className="flex items-center gap-3">
                <ShieldCheck size={18} className="text-[#C9A55A]" />
                <span className="text-xs uppercase tracking-wider text-white/80 font-medium">Precision Measurement</span>
              </div>
              <div className="flex items-center gap-3">
                <Award size={18} className="text-[#C9A55A]" />
                <span className="text-xs uppercase tracking-wider text-white/80 font-medium">Canada-Wide Guarantee</span>
              </div>
            </motion.div>

            {/* CTA Button */}
            <motion.div
              custom={6}
              initial="hidden"
              animate={isTextInView ? 'visible' : 'hidden'}
              variants={paragraphVariants}
              className="pt-2"
            >
              <button
                onClick={() => navigate('/contact')}
                className="group relative inline-flex items-center gap-3 bg-[#C9A55A] text-[#0F0E0C] px-8 py-4 text-[11px] uppercase font-bold tracking-[0.2em] hover:bg-white transition-all duration-300 shadow-[0_10px_30px_rgba(201,165,90,0.25)] transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Initiate Your Design Consultation</span>
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default BrandStory;
