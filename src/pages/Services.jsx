import React, { useState } from 'react';
import PageTransition from '../components/common/PageTransition';
import { services, processSteps } from '../data/services';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Ruler, Layers, Home, Zap, Briefcase, LayoutGrid } from 'lucide-react';

import { Link } from 'react-router-dom';

const iconMap = {
  Ruler, Layers, Home, Zap, Briefcase,
  Blinds: LayoutGrid,
};


const Services = () => {
  const [expandedId, setExpandedId] = useState(null);

  return (
    <PageTransition>
      {/* Hero */}
      <section className="pt-32 pb-20 px-6" style={{ background: '#0A1628' }}>
        <div className="max-w-7xl mx-auto text-center">
          <span className="section-label">What We Offer</span>
          <h1 className="text-5xl md:text-7xl font-serif text-white mt-4 italic mb-8">Our Services</h1>
          <p className="max-w-2xl mx-auto text-lg font-light" style={{ color: '#C8C0B0' }}>
            From free in-home measurement to professional installation — Brighton Decor handles
            everything your windows and floors need.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-6 border-y" style={{ background: '#0F1E38', borderColor: 'rgba(196,162,101,0.1)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s) => {
              const Icon = iconMap[s.icon] || Grid3X3;
              return (
                <div
                  key={s.id}
                  className="p-8 cursor-pointer transition-all duration-300 group"
                  style={{
                    background: '#162844',
                    border: '1px solid rgba(196,162,101,0.08)',
                  }}
                  onClick={() => setExpandedId(expandedId === s.id ? null : s.id)}
                  onMouseEnter={(e) => e.currentTarget.style.borderColor = 'rgba(196,162,101,0.3)'}
                  onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(196,162,101,0.08)'}
                >
                  <div
                    className="w-12 h-12 flex items-center justify-center mb-6 transition-all group-hover:scale-110"
                    style={{ background: 'rgba(196,162,101,0.1)', color: '#C4A265' }}
                  >
                    <Icon size={22} />
                  </div>
                  <h3 className="text-xl font-serif text-white mb-3">{s.name}</h3>
                  <p className="text-sm leading-relaxed mb-5" style={{ color: '#C8C0B0' }}>
                    {s.description}
                  </p>

                  <div className="flex items-center text-xs uppercase font-bold tracking-widest gap-2" style={{ color: '#C4A265' }}>
                    <span>{expandedId === s.id ? 'Show Less' : 'Learn More'}</span>
                    <ChevronDown
                      size={14}
                      className="transition-transform duration-300"
                      style={{ transform: expandedId === s.id ? 'rotate(180deg)' : 'rotate(0deg)' }}
                    />
                  </div>

                  <AnimatePresence>
                    {expandedId === s.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden mt-5 pt-5"
                        style={{ borderTop: '1px solid rgba(196,162,101,0.1)' }}
                      >
                        <p className="text-sm italic leading-relaxed" style={{ color: '#C8C0B0' }}>
                          {s.longDescription}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-24 px-6" style={{ background: '#0A1628' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="section-label">How We Work</span>
            <h2 className="text-4xl font-serif text-white mt-4">
              Our <span className="italic" style={{ color: '#C4A265' }}>Installation Process</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {processSteps.map((step, i) => (
              <div
                key={i}
                className="p-8 relative overflow-hidden group"
                style={{ background: '#0F1E38', border: '1px solid rgba(196,162,101,0.06)' }}
              >
                <span
                  className="text-7xl font-serif absolute -top-2 -right-2 pointer-events-none select-none transition-colors duration-500"
                  style={{ color: 'rgba(196,162,101,0.05)' }}
                >
                  {step.step}
                </span>
                <div
                  className="w-8 h-8 flex items-center justify-center mb-5 text-xs font-bold font-serif"
                  style={{ border: '1px solid rgba(196,162,101,0.4)', color: '#C4A265' }}
                >
                  {step.step}
                </div>
                <h4 className="text-base font-serif text-white mb-2">{step.title}</h4>
                <p className="text-sm relative z-10 leading-relaxed" style={{ color: '#C8C0B0' }}>
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 text-center border-t" style={{ background: '#0F1E38', borderColor: 'rgba(196,162,101,0.1)' }}>
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-serif text-white mb-6 italic">
            Ready to get started?
          </h2>
          <p className="mb-10 text-sm" style={{ color: '#C8C0B0' }}>
            Book your free in-home measurement today. No obligation — just expert advice and a perfect fit.
          </p>
          <Link to="/contact">
            <button className="btn-gold px-12 py-4 rounded-none uppercase tracking-[0.3em] font-bold text-xs">
              Book Free Measurement
            </button>
          </Link>
        </div>
      </section>
    </PageTransition>
  );
};

export default Services;
