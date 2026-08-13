import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Phone } from 'lucide-react';
import ctaBg from '../../assets/images/misc/cta-bg.jpg';

const CTABanner = () => {
  return (
    <section className="py-28 px-6 md:px-12 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src={ctaBg}
          alt="Book your free window blind measurement in Saskatoon"
          loading="lazy"
          decoding="async"
          width={1200}
          height={600}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: 'rgba(10,22,40,0.82)' }} />
      </div>

      {/* Gold line top */}
      <div className="absolute top-0 left-0 w-full h-[1px]" style={{
        background: 'linear-gradient(90deg, transparent, rgba(196,162,101,0.5), transparent)'
      }} />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="section-label block mb-6"
        >
          Ready to Transform Your Windows?
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-serif text-white mb-8 leading-tight italic"
        >
          Book Your Free<br />
          <span style={{ color: '#C4A265' }}>In-Home Measurement</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
          className="text-lg mb-12 max-w-xl mx-auto"
          style={{ color: '#C8C0B0' }}
        >
          No obligation, no pressure. We come to you, measure every window, and help you
          choose the perfect blinds or curtains for your home.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link to="/contact">
            <button className="btn-gold px-10 py-4 rounded-none uppercase tracking-[0.25em] font-sans font-bold text-xs shadow-xl">
              Book Free Measurement
            </button>
          </Link>

          <a href="tel:+13065806476">
            <button
              className="flex items-center gap-2 border px-10 py-4 rounded-none uppercase tracking-[0.25em] font-sans font-bold text-xs transition-all hover:bg-gold/10 duration-300"
              style={{ borderColor: 'rgba(196,162,101,0.4)', color: '#F5F2EC' }}
            >
              <Phone size={14} />
              +1 (306) 580-6476
            </button>
          </a>

          <a
            href="https://wa.me/13065806476"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button
              className="flex items-center gap-2 border px-8 py-4 rounded-none uppercase tracking-[0.2em] font-sans font-bold text-xs transition-all duration-300"
              style={{ borderColor: 'rgba(196,162,101,0.25)', color: '#C4A265' }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp
            </button>
          </a>
        </motion.div>
      </div>

      {/* Gold line bottom */}
      <div className="absolute bottom-0 left-0 w-full h-[1px]" style={{
        background: 'linear-gradient(90deg, transparent, rgba(196,162,101,0.5), transparent)'
      }} />
    </section>
  );
};

export default CTABanner;
