import React from 'react';
import { motion } from 'framer-motion';

const ProjectCard = ({ project, onClick }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative group cursor-pointer overflow-hidden break-inside-avoid mb-6"
      onClick={() => onClick(project)}
    >
      <div className="overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        />
      </div>
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-bg-primary/80 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6 border border-gold/0 group-hover:border-gold/30">
        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
          <span className="text-gold text-[10px] uppercase font-bold tracking-[0.2em] mb-2 block">
            {project.category}
          </span>
          <h3 className="text-white font-serif text-xl mb-1">{project.title}</h3>
          <p className="text-ivory-muted text-xs uppercase tracking-widest">{project.city}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
