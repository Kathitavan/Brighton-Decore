import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Ruler, Layers, Home, Zap, Briefcase } from 'lucide-react';

const teaserServices = [
  { icon: Ruler, title: 'Free Measurement', desc: 'We visit your home and measure every window at no cost.' },
  { icon: Layers, title: 'Blind Installation', desc: 'Professional fitting of roller, zebra, honeycomb, and more.' },
  { icon: Home, title: 'Flooring & Curtains', desc: 'Premium flooring supply and Dream Curtains installation.' },
];

const ServicesTeaser = () => {
  return (
    <section className="py-24 px-6 border-y" style={{ background: '#0F1E38', borderColor: 'rgba(196,162,101,0.1)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="section-label">Our Services</span>
          <h2 className="text-4xl md:text-5xl font-serif text-white mt-4">
            Everything Your <span className="italic" style={{ color: '#C4A265' }}>Windows Need</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {teaserServices.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.15 }}
              viewport={{ once: true }}
              className="text-center group"
            >
              <div
                className="w-16 h-16 flex items-center justify-center mx-auto mb-8 rounded-full group-hover:scale-110 transition-all duration-500"
                style={{ border: '1px solid rgba(196,162,101,0.25)' }}
              >
                <service.icon
                  size={26}
                  strokeWidth={1.5}
                  style={{ color: '#C4A265' }}
                />
              </div>
              <h3 className="text-2xl font-serif text-white mb-4">{service.title}</h3>
              <p className="text-sm leading-relaxed max-w-xs mx-auto" style={{ color: '#C8C0B0' }}>
                {service.desc}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-16">
          <Link to="/services">
            <button className="btn-gold px-10 py-4 font-sans text-xs uppercase tracking-widest font-bold rounded-none">
              View All Services
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesTeaser;
