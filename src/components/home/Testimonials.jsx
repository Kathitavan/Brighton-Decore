// src/components/home/Testimonials.jsx
import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Star, Quote, Sparkles } from 'lucide-react';
import { testimonials } from '../../data/testimonials';

const TestimonialCard = ({ testimonial, index, isInView }) => {
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
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="flex"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative overflow-hidden w-full backdrop-blur-xl bg-gradient-to-br from-white/[0.04] via-white/[0.01] to-transparent border border-white/10 p-8 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.4)] hover:border-[#C9A55A]/50 transition-all duration-500 group flex flex-col justify-between"
      >
        <div
          className="pointer-events-none absolute -inset-px transition-opacity duration-500 rounded-[inherit]"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(350px circle at ${mousePos.x}px ${mousePos.y}px, rgba(201, 165, 90, 0.15), transparent 70%)`,
          }}
        />

        <div>
          {/* Rating Stars & Quote Icon */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex gap-1 text-[#C9A55A]">
              {[...Array(5)].map((_, si) => (
                <Star key={si} size={14} fill="#C9A55A" className="text-[#C9A55A] drop-shadow-[0_0_8px_rgba(201,165,90,0.5)]" />
              ))}
            </div>
            <Quote size={20} className="text-[#C9A55A]/30 group-hover:text-[#C9A55A] transition-colors" />
          </div>

          {/* Quote Body */}
          <p className="text-white/80 text-sm leading-relaxed font-sans italic font-light mb-8">
            "{testimonial.quote}"
          </p>
        </div>

        {/* Author Details */}
        <div className="pt-4 border-t border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {testimonial.avatar && (
              <img
                src={testimonial.avatar}
                alt={testimonial.name}
                className="w-10 h-10 rounded-full object-cover border-2 border-[#C9A55A]/60 shadow-md shrink-0"
              />
            )}
            <div>
              <div className="font-serif text-white font-bold text-base group-hover:text-[#C9A55A] transition-colors">
                {testimonial.name}
              </div>
              <div className="text-[10px] uppercase tracking-[0.2em] font-mono text-[#C9A55A] mt-0.5">
                {testimonial.city}
              </div>
            </div>
          </div>
          {testimonial.service && !testimonial.avatar && (
            <span className="text-[10px] text-white/50 font-sans px-2.5 py-1 rounded-full bg-white/5 border border-white/10">
              {testimonial.service}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const Testimonials = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section
      ref={ref}
      className="py-16 md:py-24 bg-[#0A0908] text-white relative overflow-hidden border-t border-white/10"
      aria-label="Customer testimonials"
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(201,165,90,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(201,165,90,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-[#C9A55A]/5 rounded-full blur-[160px] pointer-events-none" />

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
              Client Testimonials
            </span>
          </div>

          <h2 className="font-serif text-white text-3xl sm:text-4xl md:text-5xl leading-tight">
            Trusted Across Canada
          </h2>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.id} testimonial={t} index={i} isInView={isInView} />
          ))}
        </div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4 }}
          className="mt-14 text-center"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] font-mono text-white/60 bg-white/[0.03] border border-[#C9A55A]/30 px-6 py-2.5 rounded-full inline-block shadow-lg">
            100% Customer Satisfaction · Serving All of Canada
          </span>
        </motion.div>

      </div>
    </section>
  );
};

export default Testimonials;
