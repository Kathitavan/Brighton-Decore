import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Tag, ChevronRight, ChevronLeft } from 'lucide-react';
import BeforeAfterSlider from './BeforeAfterSlider';

const ProjectModal = ({ project, isOpen, onClose }) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8"
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-bg-primary/95 backdrop-blur-xl" onClick={onClose} />

          {/* Content */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            className="relative w-full max-w-6xl max-h-[90vh] bg-bg-secondary overflow-y-auto no-scrollbar gold-border"
          >
            <button
              onClick={onClose}
              className="fixed md:absolute top-4 right-4 z-50 p-2 bg-gold text-bg-primary hover:bg-white transition-colors"
            >
              <X size={24} />
            </button>

            <div className="p-6 md:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Left: Info */}
                <div className="space-y-8">
                  <div>
                    <div className="flex items-center space-x-2 text-gold text-xs uppercase tracking-widest font-bold mb-4">
                      <Tag size={14} />
                      <span>{project.category}</span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-serif text-white mb-4 leading-tight">
                      {project.title}
                    </h2>
                    <div className="flex items-center space-x-2 text-ivory-muted text-sm uppercase tracking-widest">
                      <MapPin size={16} className="text-gold" />
                      <span>{project.city}, India</span>
                    </div>
                  </div>

                  <p className="text-ivory-muted leading-relaxed text-lg font-light">
                    {project.description}
                  </p>

                  <div className="pt-8 border-t border-gold/10 grid grid-cols-2 gap-8">
                    <div>
                      <p className="text-xs uppercase tracking-widest text-gold mb-2">Completion</p>
                      <p className="text-white text-sm">October 2024</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-widest text-gold mb-2">Area</p>
                      <p className="text-white text-sm">3,500 Sq. Ft.</p>
                    </div>
                  </div>
                </div>

                {/* Right: Gallery Preview */}
                <div className="grid grid-cols-2 gap-4">
                  {project.gallery?.map((img, idx) => (
                    <div key={idx} className={idx === 0 ? 'col-span-2' : ''}>
                      <img src={img} alt="" className="w-full h-full object-cover gold-border p-1" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Before/After Section */}
              <div className="mt-20">
                <div className="text-center mb-12">
                  <span className="text-gold uppercase tracking-widest text-xs font-bold">Transformation</span>
                  <h3 className="text-3xl font-serif text-white mt-2">Visualizing Change</h3>
                </div>
                <BeforeAfterSlider before={project.beforeImage} after={project.image} />
              </div>
              
              {/* Footer CTA */}
              <div className="mt-20 pt-10 border-t border-gold/10 text-center">
                <p className="text-ivory-muted mb-6 italic">Inspired by this project?</p>
                <button className="bg-gold text-bg-primary px-10 py-4 uppercase tracking-[0.2em] text-xs font-bold hover:bg-white transition-all">
                  Get a Similar Look
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;
