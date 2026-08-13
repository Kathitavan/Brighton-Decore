import React from 'react';
import { motion } from 'framer-motion';

const steps = [
  { num: '01', title: 'Contact Us', desc: 'Call, WhatsApp, or fill out our simple form. Tell us about your home and what you\'re looking for.' },
  { num: '02', title: 'Free Measurement', desc: 'We visit your home at a time that suits you and measure every window precisely — at no charge.' },
  { num: '03', title: 'Choose Your Product', desc: 'We guide you through fabrics, styles, and colors. No pressure — just expert advice tailored to your space.' },
  { num: '04', title: 'Custom Manufacturing', desc: 'Your blinds or curtains are made to your exact measurements with premium, durable materials.' },
  { num: '05', title: 'Professional Installation', desc: 'Our team installs everything cleanly and precisely. Most residential homes are done in a single visit.' },
  { num: '06', title: 'You Love It', desc: '100% satisfaction guaranteed — backed by a 1-year warranty on every product we install.' },
];

const ProcessSection = () => {
  return (
    <section className="py-24 px-6 md:px-12 border-y" style={{ background: '#0F1E38', borderColor: 'rgba(196,162,101,0.1)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <span className="section-label">How It Works</span>
          <h2 className="text-4xl md:text-5xl font-serif text-white mt-4">
            Our Simple <span className="italic" style={{ color: '#C4A265' }}>6-Step Process</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="relative p-8 group"
              style={{ background: '#162844', border: '1px solid rgba(196,162,101,0.08)' }}
            >
              {/* Big number background */}
              <span
                className="absolute top-4 right-4 text-7xl font-serif pointer-events-none select-none transition-all duration-500"
                style={{ color: 'rgba(196,162,101,0.06)' }}
              >
                {step.num}
              </span>

              {/* Step number badge */}
              <div
                className="w-10 h-10 flex items-center justify-center mb-6 text-sm font-bold font-serif"
                style={{ border: '1px solid rgba(196,162,101,0.4)', color: '#C4A265' }}
              >
                {step.num}
              </div>

              <h4 className="text-lg font-serif text-white mb-3">{step.title}</h4>
              <p className="text-sm leading-relaxed relative z-10" style={{ color: '#C8C0B0' }}>{step.desc}</p>

              {/* Connector arrow (except last two on last row) */}
              {idx < steps.length - 1 && (idx + 1) % 3 !== 0 && (
                <div className="absolute top-1/2 -right-4 -translate-y-1/2 hidden lg:flex items-center z-20">
                  <svg width="24" height="16" viewBox="0 0 24 16" fill="none">
                    <path d="M0 8 H20 M14 2 L20 8 L14 14" stroke="#C4A265" strokeWidth="1" opacity="0.3"/>
                  </svg>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
