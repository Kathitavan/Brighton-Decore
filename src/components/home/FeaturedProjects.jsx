// src/components/home/FeaturedProjects.jsx
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { projects } from '../../data/projects';

const FeaturedProjects = () => {
  const navigate = useNavigate();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const featured = projects.slice(0, 4);

  return (
    <section
      ref={ref}
      className="py-16 md:py-24 bg-[#0A0908] text-white relative overflow-hidden border-t border-white/10"
      aria-label="Featured portfolio projects"
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(201,165,90,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(201,165,90,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-[#C9A55A]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-3 px-3.5 py-1.5 rounded-full bg-[#C9A55A]/10 border border-[#C9A55A]/25 mb-4">
              <Sparkles size={14} className="text-[#C9A55A]" />
              <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#C9A55A]">
                Canadian Portfolio
              </span>
            </div>

            <h2 className="font-serif text-white text-3xl sm:text-4xl md:text-5xl leading-tight">
              Featured Transformations
            </h2>
          </motion.div>

          <motion.button
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            onClick={() => navigate('/portfolio')}
            className="group inline-flex items-center gap-3 border border-white/20 px-6 py-3.5 text-[11px] uppercase tracking-[0.2em] font-bold font-sans text-white hover:border-[#C9A55A] hover:text-[#C9A55A] transition-all duration-300 rounded-full"
          >
            <span>Explore All Projects</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featured.map((project, i) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 36 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="group cursor-pointer backdrop-blur-xl bg-white/[0.02] border border-white/10 p-6 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:border-[#C9A55A]/50 transition-all duration-500"
              onClick={() => navigate('/portfolio')}
            >
              {/* Image Frame */}
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-[#1A1814] mb-6">
                <img
                  src={project.image}
                  alt={`${project.title} — Brighton Decor Ltd`}
                  className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = '/assets/imgs/common/placeholder.jpg';
                  }}
                />
                
                {/* Dark-to-Light Glass Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="backdrop-blur-md bg-[#0A0908]/80 border border-[#C9A55A]/30 text-[#C9A55A] text-[10px] uppercase tracking-[0.2em] font-bold font-sans px-3.5 py-1.5 rounded-full">
                    {project.category}
                  </span>
                </div>

                {/* Subtle Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0908]/80 via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity" />
              </div>

              {/* Information & Arrow */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-serif text-white text-2xl font-bold mb-1 group-hover:text-[#C9A55A] transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-white/60 text-sm font-sans font-light">{project.type}</p>
                </div>
                
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 group-hover:bg-[#C9A55A] group-hover:text-[#0A0908] group-hover:border-[#C9A55A] transition-all duration-300">
                  <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </motion.article>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FeaturedProjects;
