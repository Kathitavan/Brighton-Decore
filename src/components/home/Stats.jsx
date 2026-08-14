// src/components/home/Stats.jsx
import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

const stats = [
  { value: '1,300+', label: 'Homes Transformed', sub: 'Across Canada' },
  { value: '4+',     label: 'Years of Excellence', sub: 'Est. 2022' },
  { value: '100%',   label: 'Customer Satisfaction', sub: 'Guaranteed' },
  { value: '1 Year', label: 'Warranty', sub: 'On All Installations' },
];

const KineticCountUp = ({ value }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [displayValue, setDisplayValue] = useState('0');

  useEffect(() => {
    if (!isInView) return;

    const numericStr = value.replace(/[^0-9]/g, '');
    if (!numericStr) {
      setDisplayValue(value);
      return;
    }

    const targetNum = parseInt(numericStr, 10);
    const hasPlus = value.includes('+');
    const hasPercent = value.includes('%');

    let startTime;
    let animationFrame;

    const animateCount = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / 1800, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(easeProgress * targetNum);

      let formatted = current.toLocaleString();
      if (hasPlus) formatted += '+';
      if (hasPercent) formatted += '%';

      setDisplayValue(formatted);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animateCount);
      }
    };

    animationFrame = requestAnimationFrame(animateCount);
    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, value]);

  return <span ref={ref}>{displayValue}</span>;
};

const StatItem = ({ value, label, sub, index }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: '-60px' });
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
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative text-center p-6 md:p-8 rounded-xl bg-white/[0.02] border border-white/5 overflow-hidden group hover:border-[#C9A55A]/40 transition-colors duration-500"
    >
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-500 rounded-[inherit]"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(300px circle at ${mousePos.x}px ${mousePos.y}px, rgba(201, 165, 90, 0.18), transparent 70%)`,
        }}
      />

      <div className="font-serif text-[#C9A55A] text-3xl sm:text-4xl lg:text-5xl font-bold mb-2 tracking-tight group-hover:scale-105 transition-transform duration-300 drop-shadow-md">
        <KineticCountUp value={value} />
      </div>
      <div className="text-white font-sans font-semibold text-sm mb-1">{label}</div>
      <div className="text-white/50 font-sans text-[10px] uppercase tracking-[0.2em] font-medium">{sub}</div>
    </motion.div>
  );
};

const Stats = () => {
  return (
    <section
      className="relative z-20 -mt-12 md:-mt-16 px-6 md:px-12 max-w-7xl mx-auto"
      aria-label="Our statistics"
    >
      <div className="backdrop-blur-2xl bg-[#0A0908]/90 border border-[#C9A55A]/25 p-4 sm:p-6 rounded-2xl shadow-[0_30px_70px_rgba(0,0,0,0.7)]">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 divide-y lg:divide-y-0 lg:divide-x divide-white/10">
          {stats.map((stat, i) => (
            <StatItem key={stat.label} {...stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
