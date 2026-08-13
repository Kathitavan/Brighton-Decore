import React from 'react';
import { motion } from 'framer-motion';

const stats = [
  { label: 'Homes Completed', value: '1300+' },
  { label: 'Years Experience', value: '4+' },
  { label: 'Satisfaction Rate', value: '100%' },
  { label: 'In-Home Measurement', value: 'Free' },
];

const Stats = () => {
  return (
    <section className="py-12 px-6 border-b" style={{ background: '#0F1E38', borderColor: 'rgba(196,162,101,0.12)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="text-center py-4 relative"
            >
              {/* Vertical separator */}
              {idx < stats.length - 1 && (
                <div
                  className="absolute right-0 top-1/2 -translate-y-1/2 h-12 w-[1px] hidden md:block"
                  style={{ background: 'rgba(196,162,101,0.2)' }}
                />
              )}
              <h3 className="text-3xl md:text-5xl font-serif mb-2" style={{ color: '#C4A265' }}>
                {stat.value}
              </h3>
              <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] font-sans font-bold" style={{ color: '#C8C0B0' }}>
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
