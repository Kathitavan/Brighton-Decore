import React from 'react';
import { motion } from 'framer-motion';

const stats = [
  { label: 'Projects Completed', value: '500+' },
  { label: 'Years Experience', value: '12+' },
  { label: 'Cities Covered', value: '48' },
  { label: 'Satisfied Clients', value: '98%' },
];

const Stats = () => {
  return (
    <section className="bg-bg-secondary py-12 px-6 border-b border-gold/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <h3 className="text-3xl md:text-5xl font-serif text-gold mb-2">{stat.value}</h3>
              <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-ivory-muted font-sans font-bold">
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
