// src/components/home/WhyBrighton.jsx
import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Shield, Clock, Star, MapPin, Ruler, Wrench, Sparkles } from 'lucide-react';

const reasons = [
  {
    icon: Wrench,
    title: 'Professional Installation',
    desc: 'Trained technicians who take pride in their work — every blind and floor installed perfectly.',
  },
  {
    icon: Shield,
    title: '1-Year Warranty',
    desc: 'Every installation is backed by a 1-year workmanship warranty. We stand behind our work.',
  },
  {
    icon: Star,
    title: '100% Satisfaction',
    desc: "We don't consider a project finished until you are completely satisfied with the result.",
  },
  {
    icon: MapPin,
    title: 'Canada-Wide Service',
    desc: 'Based in Saskatoon, we serve customers across Canada with the same high standards.',
  },
  {
    icon: Clock,
    title: 'Est. Since 2022',
    desc: '1,300+ homes transformed since our founding. Experience you can trust.',
  },
];

const ReasonGlassCard = ({ reason, index, isInView }) => {
  const cardRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const Icon = reason.icon;

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
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
        onMouseLeave={() => setIsHovered(false)}
        className="relative overflow-hidden backdrop-blur-xl bg-white/[0.03] border border-white/10 p-8 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.4)] hover:border-[#C9A55A]/50 transition-all duration-500 group h-full flex flex-col justify-between"
      >
        <div
          className="pointer-events-none absolute -inset-px transition-opacity duration-500 rounded-[inherit]"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(350px circle at ${mousePos.x}px ${mousePos.y}px, rgba(201, 165, 90, 0.15), transparent 70%)`,
          }}
        />

        <div>
          <div className="w-12 h-12 rounded-xl bg-[#C9A55A]/10 border border-[#C9A55A]/30 flex items-center justify-center mb-6 text-[#C9A55A] group-hover:bg-[#C9A55A] group-hover:text-[#0A0908] group-hover:scale-110 transition-all duration-300 shadow-[0_0_20px_rgba(201,165,90,0.2)]">
            <Icon size={22} />
          </div>

          <h3 className="font-serif text-white text-xl font-bold mb-3 group-hover:text-[#C9A55A] transition-colors duration-300">
            {reason.title}
          </h3>

          <p className="text-white/70 font-sans font-light text-sm leading-relaxed">
            {reason.desc}
          </p>
        </div>

        <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-[10px] uppercase font-mono tracking-widest text-white/40">
          <span>Brighton Standard</span>
          <span className="text-[#C9A55A]">✦ Guaranteed</span>
        </div>
      </div>
    </motion.div>
  );
};

const WhyBrighton = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section
      ref={ref}
      className="py-16 md:py-24 bg-[#0A0908] text-white relative overflow-hidden border-t border-white/10"
      aria-label="Why choose Brighton Decor"
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(201,165,90,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(201,165,90,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/4 w-[450px] h-[450px] bg-[#C9A55A]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-3 px-3.5 py-1.5 rounded-full bg-[#C9A55A]/10 border border-[#C9A55A]/25 mb-4">
            <Sparkles size={14} className="text-[#C9A55A]" />
            <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#C9A55A]">
              Why Brighton Decor
            </span>
          </div>

          <h2 className="font-serif text-white text-3xl sm:text-4xl md:text-5xl leading-tight mb-4">
            What Makes Us Different
          </h2>
          
          <p className="text-white/70 text-base font-sans font-light leading-relaxed">
            We believe your home deserves more than a quick install. Every job 
            we do reflects our commitment to quality, honesty, and craftsmanship.
          </p>
        </motion.div>

        {/* Reasons Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, i) => (
            <ReasonGlassCard key={reason.title} reason={reason} index={i} isInView={isInView} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default WhyBrighton;
