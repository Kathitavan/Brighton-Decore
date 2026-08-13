import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const CTABanner = () => {
  return (
    <section className="py-24 px-6 md:px-12 bg-bg-primary relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] border border-gold/5 rounded-full -z-0" />
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-serif text-white mb-8 leading-tight italic"
        >
          Ready to transform <br /> your living space?
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
          className="text-ivory-muted text-lg mb-12 max-w-xl mx-auto"
        >
          Schedule a consultation with our design experts and take the first step towards your dream home.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Link to="/contact">
            <button className="bg-gold text-bg-primary px-12 py-5 rounded-none uppercase tracking-[0.3em] font-sans font-bold text-xs hover:bg-white transition-all transform hover:scale-105 duration-300 shadow-2xl shadow-gold/20">
              Start Your Project
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default CTABanner;
