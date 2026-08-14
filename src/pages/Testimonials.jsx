// src/pages/Testimonials.jsx
// Brighton Decor Canada — Customer Reviews (Nordic Velvet & Emerald Glow Theme)
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import PageTransition from '../components/common/PageTransition';
import { testimonials } from '../data/testimonials';
import { Star, ArrowRight, Quote, Sparkles } from 'lucide-react';
import styles from '../styles/pages/testimonials.module.css';

const Testimonials = () => {
  const navigate = useNavigate();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <PageTransition>
      <div className={styles.testimonialsPage}>
        {/* Header */}
        <section className="relative pt-36 pb-20 px-6 md:px-12 border-b border-[#F5B83D]/20">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="max-w-3xl"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F5B83D]/15 border border-[#F5B83D]/30 text-[#F5B83D] text-[10px] uppercase font-bold tracking-[0.25em] mb-4">
                <Sparkles size={13} />
                <span>Verified Client Reviews</span>
              </div>
              <h1
                className="font-serif text-[#E4EFEA] font-light leading-tight mb-6"
                style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}
              >
                What Our Canadian<br />
                <span className="italic text-[#F5B83D]">Customers Say</span>
              </h1>
              <p className="text-[#E4EFEA]/75 text-lg md:text-xl font-sans font-light leading-relaxed">
                We're proud of our 100% customer satisfaction record. Here's what clients have shared about their experience with Brighton Decor.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Testimonials Grid */}
        <section ref={ref} className="py-16 md:py-24 px-6 md:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {testimonials.map((t, i) => (
                <motion.div
                  key={t.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="bg-[#12231E] p-8 md:p-10 border border-[#F5B83D]/25 rounded-2xl relative overflow-hidden group hover:border-[#F5B83D]/60 transition-all shadow-xl"
                >
                  <Quote size={80} className="absolute -top-3 -right-3 text-[#F5B83D]/10 pointer-events-none" />
                  
                  <div className="flex gap-1 mb-5">
                    {[...Array(5)].map((_, si) => (
                      <Star key={si} size={16} fill="#F5B83D" className="text-[#F5B83D]" />
                    ))}
                  </div>

                  <p className="text-[#E4EFEA]/90 text-base font-sans font-light leading-relaxed italic mb-6 relative z-10">
                    "{t.quote}"
                  </p>

                  <div className="border-t border-white/10 pt-5 relative z-10">
                    <div className="font-serif text-[#E4EFEA] text-xl font-medium">{t.name}</div>
                    <div className="text-[11px] uppercase tracking-[0.18em] text-[#F5B83D] font-sans font-bold mt-1">{t.city}</div>
                    {t.service && (
                      <div className="text-[#E4EFEA]/60 text-xs font-sans mt-1">{t.service}</div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Satisfaction badge */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 }}
              className="mt-16 text-center bg-[#12231E] border border-[#F5B83D]/30 p-10 rounded-2xl shadow-xl max-w-2xl mx-auto"
            >
              <div className="font-serif text-[#F5B83D] text-6xl font-light mb-2">100%</div>
              <div className="font-serif text-[#E4EFEA] text-2xl mb-3">Customer Satisfaction</div>
              <p className="text-[#E4EFEA]/75 text-sm font-sans font-light leading-relaxed">
                We're not satisfied until you are. That's not just a tagline — it's how we approach every single installation across Canada.
              </p>
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-6 md:px-12 bg-gradient-to-b from-[#12231E] to-[#0B1713] border-t border-[#F5B83D]/20 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="font-serif text-[#E4EFEA] text-3xl md:text-4xl font-light mb-4">
              Ready to join our satisfied customers?
            </h2>
            <p className="text-[#E4EFEA]/75 mb-8 font-sans font-light">
              Book your free site measurement today across Saskatoon & Canada.
            </p>
            <button
              onClick={() => navigate('/contact')}
              className="group inline-flex items-center gap-3 bg-[#F5B83D] text-[#0B1713] px-8 py-4 rounded-full text-xs uppercase tracking-[0.2em] font-bold font-sans hover:bg-white transition-all shadow-xl"
            >
              <span>Book Free Measurement</span>
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default Testimonials;
