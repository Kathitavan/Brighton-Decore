// src/components/portfolio/ProjectCard.jsx
// Brighton Decor — Architectural Editorial Gallery Card
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, MapPin, Tag } from 'lucide-react';

const ProjectCard = ({ project, index, onClick, colSpan = 'col-span-12 md:col-span-6 lg:col-span-4', isFeatured = false }) => {
  const formattedIndex = String(index + 1).padStart(2, '0');

  // Height and aspect ratio styling based on featured state
  const heightClass = isFeatured
    ? 'min-h-[420px] md:min-h-[540px]'
    : 'min-h-[360px] md:min-h-[440px]';

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 35, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: (index % 4) * 0.08, ease: [0.16, 1, 0.3, 1] }}
      onClick={() => onClick(project)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick(project);
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`View project details for ${project.title} in ${project.city}`}
      className={`group cursor-pointer relative flex flex-col justify-end ${colSpan} ${heightClass} rounded-2xl overflow-hidden backdrop-blur-xl bg-[#171816] border border-white/10 hover:border-[#C9A55A]/60 shadow-[0_20px_50px_rgba(0,0,0,0.6)] hover:shadow-[0_30px_70px_rgba(201,165,90,0.2)] transition-all duration-700 select-none transform-gpu`}
    >
      {/* Background Image Container with Shared Layout ID */}
      <motion.div
        layoutId={`project-img-container-${project.id}`}
        className="absolute inset-0 z-0 overflow-hidden bg-[#121210]"
      >
        <motion.img
          layoutId={`project-img-${project.id}`}
          src={project.image}
          alt={`${project.title} — Brighton Decor Canada`}
          className="w-full h-full object-cover object-center transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
          loading={index < 2 ? 'eager' : 'lazy'}
          onError={(e) => {
            e.target.src = '/assets/imgs/common/placeholder.jpg';
          }}
        />

        {/* Animated Gold Sheen Sweep on Hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#C9A55A]/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none z-10" />

        {/* Dynamic Multi-Layer Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0908] via-[#0A0908]/50 to-transparent opacity-85 group-hover:opacity-70 transition-opacity duration-500 z-10" />
      </motion.div>

      {/* Top Floating Badges (Index & Category) */}
      <div className="absolute top-5 left-5 right-5 flex items-center justify-between z-20 pointer-events-none">
        <span className="font-mono text-xs font-bold tracking-widest uppercase text-[#F5F2EA] bg-[#0A0908]/85 backdrop-blur-md px-3.5 py-1.5 rounded-lg border border-white/20 shadow-md">
          {formattedIndex}
        </span>
        <span className="text-[10px] uppercase font-bold tracking-[0.2em] font-sans text-[#C9A55A] bg-[#0A0908]/85 backdrop-blur-md px-3.5 py-1.5 rounded-lg border border-[#C9A55A]/40 flex items-center gap-1.5 shadow-md">
          <Tag size={11} />
          {project.category}
        </span>
      </div>

      {/* Card Content Body (Rising Upward on Hover) */}
      <div className="relative z-20 p-6 md:p-8 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500 ease-out">
        {project.city && (
          <div className="flex items-center gap-2 text-[#C9A55A] text-xs font-sans font-medium mb-2 tracking-wide">
            <MapPin size={13} />
            <span>{project.city}</span>
            {project.completion && (
              <>
                <span className="w-1 h-1 rounded-full bg-white/30" />
                <span className="text-white/60 font-light">{project.completion}</span>
              </>
            )}
          </div>
        )}

        <h3 className="font-serif text-[#F5F2EA] text-2xl md:text-3xl lg:text-4xl font-light mb-2 group-hover:text-[#C9A55A] transition-colors duration-300 leading-tight">
          {project.title}
        </h3>

        <p className="line-clamp-2 text-white/70 text-xs md:text-sm font-sans font-light leading-relaxed mb-6 max-w-xl opacity-90 group-hover:opacity-100 transition-opacity">
          {project.description}
        </p>

        {/* Footer Explore Indicator */}
        <div className="pt-4 border-t border-white/15 flex items-center justify-between text-xs font-sans">
          <span className="text-white/50 group-hover:text-white/80 font-light transition-colors">
            {project.type}
          </span>

          <span className="inline-flex items-center gap-2 text-[#C9A55A] font-bold tracking-widest text-[11px] uppercase group-hover:text-white transition-colors">
            <span>Explore Project</span>
            <ArrowUpRight size={15} className="group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform duration-300" />
          </span>
        </div>
      </div>
    </motion.article>
  );
};

export default ProjectCard;
