// src/components/home/FAQSection.jsx
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ChevronDown, Sparkles } from 'lucide-react';
import { faqItems } from '../../config/company';

const FAQItem = ({ item, index, isOpen, onToggle, isInView }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="backdrop-blur-xl bg-white/[0.02] border border-white/10 rounded-2xl overflow-hidden mb-4 transition-colors duration-300 hover:border-[#C9A55A]/40"
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-6 p-6 sm:p-7 text-left group"
        aria-expanded={isOpen}
      >
        <span className={`font-serif text-lg sm:text-xl font-bold transition-colors ${isOpen ? 'text-[#C9A55A]' : 'text-white group-hover:text-[#C9A55A]'}`}>
          {item.q}
        </span>
        <div className={`w-9 h-9 rounded-full flex items-center justify-center border transition-all duration-300 ${isOpen ? 'bg-[#C9A55A] text-[#0A0908] border-[#C9A55A]' : 'bg-white/5 border-white/10 text-white/70 group-hover:border-[#C9A55A] group-hover:text-[#C9A55A]'}`}>
          <ChevronDown
            size={18}
            className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          />
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-7 sm:px-7 text-white/70 font-sans font-light text-base leading-relaxed border-t border-white/5 pt-4">
              {item.a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section
      ref={ref}
      className="py-16 md:py-24 bg-[#0A0908] text-white relative overflow-hidden border-t border-white/10"
      aria-label="Frequently asked questions"
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(201,165,90,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(201,165,90,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-10">
        
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
              Frequently Asked Questions
            </span>
          </div>

          <h2 className="font-serif text-white text-3xl sm:text-4xl md:text-5xl leading-tight mb-4">
            Common Inquiries
          </h2>
          
          <p className="text-white/70 text-base font-sans font-light leading-relaxed">
            Everything you need to know about working with Brighton Decor Ltd.
          </p>
        </motion.div>

        {/* Accordion Container */}
        <div>
          {faqItems.map((item, i) => (
            <FAQItem
              key={i}
              item={item}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              isInView={isInView}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default FAQSection;
