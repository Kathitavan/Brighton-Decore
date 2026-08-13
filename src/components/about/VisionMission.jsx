import React from 'react';
import { motion } from 'framer-motion';
import { VISION, MISSION } from '../../data/team';

const VisionMission = () => {
  return (
    <section className="py-24 px-6 md:px-12" style={{ background: '#0A1628' }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="section-label">What Drives Us</span>
          <h2 className="text-4xl font-serif text-white mt-4">
            Vision &amp; <span className="italic" style={{ color: '#C4A265' }}>Mission</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            { label: 'Our Vision', text: VISION, icon: '◈' },
            { label: 'Our Mission', text: MISSION, icon: '◆' },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              viewport={{ once: true }}
              className="p-10"
              style={{ background: '#0F1E38', border: '1px solid rgba(196,162,101,0.15)' }}
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl" style={{ color: '#C4A265' }}>{item.icon}</span>
                <h3 className="text-2xl font-serif text-white">{item.label}</h3>
              </div>
              <p className="text-sm md:text-base leading-relaxed font-light italic" style={{ color: '#C8C0B0' }}>
                {item.text.trim()}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VisionMission;
