import React from 'react';
import { motion } from 'framer-motion';
import { testimonials } from '../../data/testimonials';
import { Quote } from 'lucide-react';

const Testimonials = () => {
  return (
    <section className="py-24 px-6 bg-bg-secondary overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-gold uppercase tracking-[0.3em] text-xs font-sans font-bold">Kind Words</span>
          <h2 className="text-4xl md:text-5xl font-serif text-white mt-4 italic">Client Stories</h2>
        </div>

        <div className="flex flex-nowrap md:grid md:grid-cols-3 gap-8 overflow-x-auto pb-8 md:pb-0 scrollbar-hide snap-x">
          {testimonials.slice(0, 3).map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.2 }}
              viewport={{ once: true }}
              className="min-w-[300px] md:min-w-0 snap-center bg-bg-tertiary p-8 gold-border relative group"
            >
              <Quote className="text-gold/20 absolute top-6 right-6" size={48} />
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 rounded-full overflow-hidden border border-gold/30">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="text-white font-serif text-lg leading-none">{item.name}</h4>
                  <p className="text-gold text-[10px] uppercase tracking-widest mt-1">{item.city}</p>
                </div>
              </div>
              <p className="text-ivory-muted text-sm italic leading-relaxed group-hover:text-ivory transition-colors">
                "{item.quote}"
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
