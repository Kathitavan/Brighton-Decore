import React from 'react';
import { motion } from 'framer-motion';

const usps = [
  { icon: '✦', title: 'Free In-Home Measurement', desc: 'We visit your home at no cost and measure every window perfectly.' },
  { icon: '✦', title: 'Professional Installation Team', desc: 'Certified installers ensure a clean, precise fit every time.' },
  { icon: '✦', title: '1300+ Homes Completed', desc: "Saskatoon's most experienced blind and flooring team." },
  { icon: '✦', title: '1 Year Product Warranty', desc: 'Every product we install is backed by a full year of warranty.' },
  { icon: '✦', title: 'Motorized Blind Experts', desc: 'Smart home-ready motorized blinds for the modern lifestyle.' },
  { icon: '✦', title: "Saskatoon's Trusted Choice", desc: 'Serving Saskatoon and Saskatchewan proudly since 2022.' },
];

const WhyBrighton = () => {
  return (
    <section className="py-24 px-6 md:px-12" style={{ background: '#0A1628' }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="section-label">Why Choose Us</span>
          <h2 className="text-4xl md:text-5xl font-serif text-white mt-4">
            Why <span className="italic" style={{ color: '#C4A265' }}>Brighton Decor</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {usps.map((usp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="p-8 group cursor-default transition-all duration-300"
              style={{
                background: '#0F1E38',
                border: '1px solid rgba(196,162,101,0.1)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(196,162,101,0.3)';
                e.currentTarget.style.background = '#162844';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(196,162,101,0.1)';
                e.currentTarget.style.background = '#0F1E38';
              }}
            >
              <span className="text-2xl mb-4 block" style={{ color: '#C4A265' }}>{usp.icon}</span>
              <h3 className="text-lg font-serif text-white mb-3">{usp.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: '#C8C0B0' }}>{usp.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyBrighton;
