import React from 'react';
import { motion } from 'framer-motion';
import { Layout, Home, Move3d } from 'lucide-react';

const teaserServices = [
  { icon: Layout, title: 'Interior Design', desc: 'Crafting aesthetic and functional living environments.' },
  { icon: Home, title: 'Space Planning', desc: 'Optimizing layouts for comfort and efficient usage.' },
  { icon: Move3d, title: '3D Visualization', desc: 'Pre-visualize your dream space with photorealistic renders.' },
];

const ServicesTeaser = () => {
  return (
    <section className="py-24 px-6 bg-bg-secondary border-y border-gold/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {teaserServices.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.2 }}
              viewport={{ once: true }}
              className="text-center group"
            >
              <div className="w-16 h-16 border border-gold/20 flex items-center justify-center mx-auto mb-8 group-hover:bg-gold transition-all duration-500 rounded-full group-hover:scale-110">
                <service.icon className="text-gold group-hover:text-bg-primary transition-colors duration-500" size={28} strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl font-serif text-white mb-4">{service.title}</h3>
              <p className="text-ivory-muted text-sm leading-relaxed max-w-xs mx-auto">
                {service.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesTeaser;
