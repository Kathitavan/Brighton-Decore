import React, { useState, useMemo } from 'react';
import PageTransition from '../components/common/PageTransition';
import { projects } from '../data/projects';
import { motion, AnimatePresence } from 'framer-motion';

const categories = ['All', 'Residential', 'Commercial', 'Flooring'];

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') return projects;
    return projects.filter(p => p.category === activeFilter);
  }, [activeFilter]);

  return (
    <PageTransition>
      <div className="pt-32 pb-24 px-6 md:px-12 min-h-screen" style={{ background: '#0A1628' }}>
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <span className="section-label">Our Work</span>
            <h1 className="text-5xl md:text-7xl font-serif text-white mt-4 italic">Portfolio</h1>
            <p className="mt-6 max-w-xl mx-auto text-sm" style={{ color: '#C8C0B0' }}>
              1300+ installations across Saskatoon and Saskatchewan.
              Every project is measured, custom-made, and professionally installed.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-16 px-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className="uppercase tracking-widest text-[10px] md:text-xs font-bold py-2 px-6 transition-all duration-300 relative"
                style={{
                  color: activeFilter === cat ? '#C4A265' : '#C8C0B0',
                  border: activeFilter === cat
                    ? '1px solid rgba(196,162,101,0.4)'
                    : '1px solid transparent',
                  background: activeFilter === cat ? 'rgba(196,162,101,0.05)' : 'transparent',
                }}
              >
                {cat}
                {activeFilter === cat && (
                  <motion.div
                    layoutId="activeFilter"
                    className="absolute -bottom-1 left-0 w-full h-[2px]"
                    style={{ background: '#C4A265' }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Masonry Grid */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="relative group overflow-hidden break-inside-avoid mb-5"
                  style={{ border: '1px solid rgba(196,162,101,0.08)' }}
                >
                  <img
                    src={project.image}
                    alt={`${project.product} installation Saskatoon`}
                    loading="lazy"
                    decoding="async"
                    width={600}
                    height={450}
                    className="w-full h-auto object-cover block transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Hover Overlay */}
                  <div
                    className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                    style={{ background: 'linear-gradient(to top, rgba(10,22,40,0.95) 0%, rgba(10,22,40,0.3) 60%)' }}
                  >
                    <div
                      className="text-[9px] uppercase font-bold tracking-widest px-2 py-1 w-fit mb-3"
                      style={{ background: '#C4A265', color: '#0A1628' }}
                    >
                      {project.product}
                    </div>
                    <h3 className="text-white font-serif text-lg">{project.title}</h3>
                    <p className="text-xs mt-1" style={{ color: '#C8C0B0' }}>{project.city}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-20">
            <p className="mb-6 text-sm" style={{ color: '#C8C0B0' }}>
              Like what you see? Let's transform your home next.
            </p>
            <a href="/contact">
              <button className="btn-gold px-12 py-4 rounded-none uppercase tracking-[0.3em] font-bold text-xs">
                Book Free Measurement
              </button>
            </a>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Portfolio;
