// src/components/about/VisionMission.jsx
import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Eye, Target, Quote, Sparkles } from 'lucide-react';

// Mouse Spotlight Glass Card Component
const GlassSpotlightCard = ({ children, className = '', borderGlow = 'border-[#C9A55A]/30' }) => {
  const cardRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative overflow-hidden backdrop-blur-xl bg-gradient-to-br from-white/[0.05] via-white/[0.02] to-transparent border-t border-l ${borderGlow} border-r border-b border-white/10 rounded-2xl p-8 md:p-12 shadow-[0_30px_70px_rgba(0,0,0,0.5)] transition-all duration-500 hover:shadow-[0_40px_90px_rgba(201,165,90,0.15)] group ${className}`}
    >
      {/* Dynamic Cursor Spotlight Effect */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-500 rounded-[inherit]"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(500px circle at ${mousePos.x}px ${mousePos.y}px, rgba(201, 165, 90, 0.15), transparent 60%)`,
        }}
      />
      {children}
    </div>
  );
};

const VisionMission = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: i * 0.2,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-32 bg-[#0F0E0C] text-white overflow-hidden"
      aria-label="Vision and mission"
    >
      {/* Background Decorative Lighting Blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#C9A55A]/5 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="inline-flex items-center gap-3 px-3.5 py-1.5 rounded-full bg-[#C9A55A]/10 border border-[#C9A55A]/25 mb-4"
          >
            <Sparkles size={14} className="text-[#C9A55A]" />
            <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#C9A55A]">
              Core Purpose & Ideology
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="font-serif text-3xl sm:text-4xl md:text-5xl text-white leading-tight"
          >
            Guided by Vision. Driven by <br />
            <span className="italic text-[#C9A55A]">Architectural Mission.</span>
          </motion.h2>
        </div>

        {/* Asymmetric Luxury Glass Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-stretch">
          
          {/* Vision Card */}
          <motion.div
            custom={0}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={cardVariants}
            className="flex"
          >
            <GlassSpotlightCard className="w-full flex flex-col justify-between" borderGlow="border-[#C9A55A]/40">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-[#C9A55A]/10 border border-[#C9A55A]/30 flex items-center justify-center text-[#C9A55A] mb-8 group-hover:scale-110 transition-transform duration-500">
                  <Eye size={26} />
                </div>

                <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-[#C9A55A] mb-3 block">
                  Our Vision
                </span>

                <h3 className="font-serif text-white text-2xl md:text-3xl leading-snug mb-6">
                  The Premier Standard for Canadian Interior Coverings & Flooring.
                </h3>

                <p className="text-white/70 font-sans font-light text-base leading-relaxed">
                  We envision a Canada where every residence commands thoughtfully designed, flawlessly executed window treatments and premium flooring — delivered with complete pricing transparency, master craftsmanship, and genuine care from coast to coast.
                </p>
              </div>

              <div className="mt-10 pt-6 border-t border-white/10 flex items-center justify-between text-xs text-white/50 font-mono uppercase tracking-widest">
                <span>Vision 2030</span>
                <span className="text-[#C9A55A]">✦ Excellence</span>
              </div>
            </GlassSpotlightCard>
          </motion.div>

          {/* Mission Card */}
          <motion.div
            custom={1}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={cardVariants}
            className="flex"
          >
            <GlassSpotlightCard className="w-full flex flex-col justify-between bg-gradient-to-br from-[#C9A55A]/15 via-white/[0.02] to-transparent" borderGlow="border-[#C9A55A]/60">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-[#C9A55A] text-[#0F0E0C] flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(201,165,90,0.4)] group-hover:scale-110 transition-transform duration-500">
                  <Target size={26} />
                </div>

                <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-white mb-3 block">
                  Our Mission
                </span>

                <h3 className="font-serif text-white text-2xl md:text-3xl leading-snug mb-6">
                  To Elevate Every Home Through Considered Design & Flawless Execution.
                </h3>

                <p className="text-white/80 font-sans font-light text-base leading-relaxed">
                  Our daily mission is to provide homeowners with bespoke window blinds and flooring, expert zero-cost site measurement, and white-glove professional installation — executed with transparency, integrity, and single-minded focus on your total satisfaction.
                </p>
              </div>

              <div className="mt-10 pt-6 border-t border-white/10 flex items-center justify-between text-xs text-white/50 font-mono uppercase tracking-widest">
                <span>Core Mandate</span>
                <span className="text-[#C9A55A]">✦ Precision</span>
              </div>
            </GlassSpotlightCard>
          </motion.div>

        </div>

        {/* Interactive Design Philosophy Quote Block */}
        <motion.div
          custom={2}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={cardVariants}
          className="mt-20 relative max-w-4xl mx-auto backdrop-blur-xl bg-white/[0.02] border border-white/10 p-10 md:p-16 rounded-3xl text-center shadow-[0_30px_70px_rgba(0,0,0,0.5)]"
        >
          {/* Giant Ambient Quotation Mark */}
          <div className="absolute top-6 left-1/2 -translate-x-1/2 text-9xl font-serif text-[#C9A55A]/10 pointer-events-none select-none leading-none">
            “
          </div>

          <div className="relative z-10">
            <div className="w-10 h-10 rounded-full bg-[#C9A55A]/10 border border-[#C9A55A]/30 flex items-center justify-center text-[#C9A55A] mx-auto mb-6">
              <Quote size={18} />
            </div>

            <h3 className="font-serif text-[#C9A55A] text-xs uppercase tracking-[0.3em] font-bold mb-4">
              Our Design Philosophy
            </h3>

            <blockquote className="font-serif text-white text-xl sm:text-2xl md:text-3xl leading-relaxed italic max-w-3xl mx-auto mb-6">
              "The finest interior solutions do not demand attention — they command respect by seamlessly echoing the lifestyle, light, and aesthetic soul of the people who live within."
            </blockquote>

            <p className="text-white/50 font-sans text-xs uppercase tracking-[0.2em]">
              Brighton Decor Ltd · Design Council Statement
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default VisionMission;
