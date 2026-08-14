// src/components/portfolio/ProjectModal.jsx
// Brighton Decor Canada — Immersive Architectural Project Viewer V3
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Tag, Calendar, Maximize2, ArrowLeft, ArrowRight, CheckCircle2, Box, FileText, ChevronLeft, ChevronRight, Layers } from 'lucide-react';
import BeforeAfterSlider from './BeforeAfterSlider';
import { useNavigate } from 'react-router-dom';

const ProjectModal = ({ project, projectsList = [], isOpen, onClose, onSelectProject }) => {
  const navigate = useNavigate();
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  useEffect(() => {
    setActiveGalleryIndex(0);
    setLightboxIndex(0);
  }, [project]);

  // Lock body scroll when viewer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle Keyboard Navigation (ESC to close, Left/Right for gallery/projects)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === 'Escape') {
        if (lightboxOpen) {
          setLightboxOpen(false);
        } else {
          onClose();
        }
      } else if (lightboxOpen) {
        if (e.key === 'ArrowLeft') {
          setLightboxIndex((prev) => (prev > 0 ? prev - 1 : galleryImages.length - 1));
        } else if (e.key === 'ArrowRight') {
          setLightboxIndex((prev) => (prev < galleryImages.length - 1 ? prev + 1 : 0));
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, lightboxOpen, onClose]);

  if (!project || !isOpen) return null;

  // Find index of current project for Next / Prev navigation loop
  const currentIndex = projectsList.findIndex((p) => p.id === project.id);
  const formattedIndex = String(currentIndex >= 0 ? currentIndex + 1 : 1).padStart(2, '0');
  const prevProject = currentIndex > 0 ? projectsList[currentIndex - 1] : projectsList[projectsList.length - 1];
  const nextProject = currentIndex < projectsList.length - 1 ? projectsList[currentIndex + 1] : projectsList[0];

  const galleryImages = project.gallery && project.gallery.length > 0 ? project.gallery : [project.image];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[200] bg-[#0A0908] text-white overflow-y-auto overflow-x-hidden selection:bg-[#C9A55A] selection:text-[#0A0908]"
        >
          {/* Top Sticky Minimalist Architectural Header Bar */}
          <div className="sticky top-0 z-50 bg-[#0A0908]/90 backdrop-blur-xl border-b border-white/10 px-6 md:px-12 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="font-mono text-xs text-[#C9A55A] tracking-widest uppercase font-bold">
                {formattedIndex} / {project.category}
              </span>
              <span className="hidden sm:inline w-1 h-1 rounded-full bg-white/30" />
              <span className="hidden sm:inline text-xs font-sans text-white/70 font-light">
                {project.city}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="hidden md:inline text-[10px] uppercase font-mono tracking-widest text-white/50">
                Press ESC to exit
              </span>
              <button
                onClick={onClose}
                aria-label="Close project viewer"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/15 flex items-center justify-center text-white/80 hover:text-white hover:border-[#C9A55A] hover:bg-[#C9A55A] hover:text-[#0A0908] transition-all duration-300"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* MAIN EDITORIAL STORY CONTENT WRAPPER */}
          <div className="w-full pb-24">
            
            {/* 1. FULL-WIDTH WIDESCREEN HERO IMAGE */}
            <motion.div
              layoutId={`project-img-container-${project.id}`}
              className="relative w-full h-[65vh] md:h-[80vh] bg-[#121210] overflow-hidden"
            >
              <motion.img
                layoutId={`project-img-${project.id}`}
                src={project.image}
                alt={`${project.title} — Brighton Decor`}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0908] via-transparent to-transparent opacity-90" />

              {/* Floating Hero Title & Meta Overlay */}
              <div className="absolute bottom-8 left-6 right-6 md:left-12 md:right-12 max-w-5xl">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-[#C9A55A]/15 border border-[#C9A55A]/30 text-[#C9A55A] text-[11px] uppercase tracking-[0.2em] font-bold font-sans mb-3 backdrop-blur-md">
                  <Tag size={12} />
                  <span>{project.type}</span>
                </div>
                <h1 className="font-serif text-white text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light leading-tight drop-shadow-lg mb-3">
                  {project.title}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-xs font-sans text-white/70">
                  {project.city && (
                    <span className="flex items-center gap-1.5">
                      <MapPin size={14} className="text-[#C9A55A]" />
                      {project.city}
                    </span>
                  )}
                  {project.completion && (
                    <>
                      <span className="w-1 h-1 rounded-full bg-white/30" />
                      <span className="flex items-center gap-1.5">
                        <Calendar size={14} />
                        {project.completion}
                      </span>
                    </>
                  )}
                  {project.area && (
                    <>
                      <span className="w-1 h-1 rounded-full bg-white/30" />
                      <span>{project.area}</span>
                    </>
                  )}
                </div>
              </div>
            </motion.div>

            {/* 2. PROJECT OVERVIEW & SPECIFICATIONS GRID */}
            <div className="max-w-7xl mx-auto px-6 md:px-12 mt-12 md:mt-16 space-y-16">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                
                {/* Left 7 Columns: Long Editorial Narrative */}
                <div className="lg:col-span-7 space-y-6">
                  <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#C9A55A] block font-sans">
                    Architectural Overview
                  </span>
                  <p className="text-white/80 font-sans font-light text-lg md:text-2xl leading-relaxed">
                    {project.longDescription || project.description}
                  </p>
                </div>

                {/* Right 5 Columns: Dynamic Specifications Card */}
                <div className="lg:col-span-5 bg-[#171816] border border-white/15 p-6 md:p-8 rounded-2xl space-y-6 shadow-2xl">
                  <h3 className="font-serif text-white text-xl font-bold border-b border-white/10 pb-4">
                    Project Specifications
                  </h3>

                  <div className="grid grid-cols-2 gap-6 text-xs font-sans">
                    {project.category && (
                      <div>
                        <span className="text-white/50 block mb-1 uppercase tracking-wider text-[10px]">Category</span>
                        <span className="text-white font-medium">{project.category}</span>
                      </div>
                    )}
                    {project.type && (
                      <div>
                        <span className="text-white/50 block mb-1 uppercase tracking-wider text-[10px]">Type</span>
                        <span className="text-white font-medium">{project.type}</span>
                      </div>
                    )}
                    {project.city && (
                      <div>
                        <span className="text-white/50 block mb-1 uppercase tracking-wider text-[10px]">Location</span>
                        <span className="text-white font-medium">{project.city}</span>
                      </div>
                    )}
                    {project.area && (
                      <div>
                        <span className="text-white/50 block mb-1 uppercase tracking-wider text-[10px]">Scale / Area</span>
                        <span className="text-white font-medium">{project.area}</span>
                      </div>
                    )}
                  </div>

                  {/* Services & Materials */}
                  {project.services && project.services.length > 0 && (
                    <div className="pt-4 border-t border-white/10 space-y-2">
                      <span className="text-[10px] uppercase font-bold tracking-widest text-[#C9A55A] block font-sans">
                        Executed Services
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {project.services.map((srv, idx) => (
                          <span key={idx} className="bg-white/5 border border-white/10 px-3 py-1 rounded-md text-[11px] text-white/80 font-sans">
                            {srv}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {project.materials && project.materials.length > 0 && (
                    <div className="pt-4 border-t border-white/10 space-y-2">
                      <span className="text-[10px] uppercase font-bold tracking-widest text-[#C9A55A] block font-sans">
                        Specified Materials
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {project.materials.map((mat, idx) => (
                          <span key={idx} className="bg-[#C9A55A]/10 border border-[#C9A55A]/30 px-3 py-1 rounded-md text-[11px] text-[#C9A55A] font-sans">
                            {mat}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* 3. EDITORIAL PROJECT GALLERY GRID */}
              {galleryImages.length > 0 && (
                <div className="pt-12 border-t border-white/10 space-y-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#C9A55A] block font-sans mb-1">
                        Curated Photography
                      </span>
                      <h3 className="font-serif text-white text-2xl md:text-4xl font-light">
                        Editorial Image Gallery
                      </h3>
                    </div>
                    <span className="text-xs font-mono text-white/50">
                      {galleryImages.length} Photographs
                    </span>
                  </div>

                  {/* Asymmetric Gallery Layout */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    {galleryImages.map((img, idx) => {
                      // Determine editorial grid span for visual rhythm
                      const isFull = idx % 3 === 0;
                      const colSpan = isFull ? 'md:col-span-12' : 'md:col-span-6';
                      const aspect = isFull ? 'aspect-[21/9] md:aspect-[16/8]' : 'aspect-[4/3]';

                      return (
                        <div
                          key={idx}
                          onClick={() => {
                            setLightboxIndex(idx);
                            setLightboxOpen(true);
                          }}
                          className={`${colSpan} relative ${aspect} rounded-2xl overflow-hidden bg-[#121210] border border-white/15 cursor-pointer group shadow-xl`}
                        >
                          <img
                            src={img}
                            alt={`${project.title} gallery detail ${idx + 1}`}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <span className="inline-flex items-center gap-2 bg-[#C9A55A] text-[#0A0908] px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest font-sans shadow-xl transform translate-y-2 group-hover:translate-y-0 transition-transform">
                              <Maximize2 size={13} />
                              Expand Lightbox
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* 4. EDITORIAL STORY NARRATIVE */}
              {project.story && (
                <div className="pt-12 border-t border-white/10 space-y-8">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#C9A55A] block font-sans mb-1">
                      Design Process
                    </span>
                    <h3 className="font-serif text-white text-2xl md:text-4xl font-light">
                      The Architectural Story
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-sans">
                    {project.story.brief && (
                      <div className="bg-[#171816] border border-white/10 p-6 rounded-2xl">
                        <span className="text-xs font-bold text-[#C9A55A] uppercase tracking-wider block mb-2 font-mono">01 / THE BRIEF</span>
                        <p className="text-sm text-white/80 leading-relaxed font-light">{project.story.brief}</p>
                      </div>
                    )}
                    {project.story.approach && (
                      <div className="bg-[#171816] border border-white/10 p-6 rounded-2xl">
                        <span className="text-xs font-bold text-[#C9A55A] uppercase tracking-wider block mb-2 font-mono">02 / THE APPROACH</span>
                        <p className="text-sm text-white/80 leading-relaxed font-light">{project.story.approach}</p>
                      </div>
                    )}
                    {project.story.materials && (
                      <div className="bg-[#171816] border border-white/10 p-6 rounded-2xl">
                        <span className="text-xs font-bold text-[#C9A55A] uppercase tracking-wider block mb-2 font-mono">03 / MATERIALS</span>
                        <p className="text-sm text-white/80 leading-relaxed font-light">{project.story.materials}</p>
                      </div>
                    )}
                    {project.story.result && (
                      <div className="bg-[#171816] border border-white/10 p-6 rounded-2xl">
                        <span className="text-xs font-bold text-[#C9A55A] uppercase tracking-wider block mb-2 font-mono">04 / THE OUTCOME</span>
                        <p className="text-sm text-white/80 leading-relaxed font-light">{project.story.result}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* 5. INTERACTIVE BEFORE & AFTER SLIDER */}
              {project.beforeImage && project.afterImage && (
                <div className="pt-12 border-t border-white/10 space-y-8">
                  <div className="text-center max-w-xl mx-auto">
                    <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#C9A55A] block font-sans mb-1">
                      Transformation Reveal
                    </span>
                    <h3 className="font-serif text-white text-2xl md:text-4xl font-light">
                      Before & After Room Transformation
                    </h3>
                  </div>

                  <BeforeAfterSlider before={project.beforeImage} after={project.afterImage} />
                </div>
              )}

              {/* 6. NEXT / PREVIOUS PROJECT NAVIGATION LOOP */}
              {projectsList.length > 1 && (
                <div className="pt-12 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6 font-sans">
                  <button
                    onClick={() => onSelectProject && onSelectProject(prevProject)}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-3 border border-white/20 bg-white/5 px-6 py-4 rounded-xl text-xs uppercase font-bold tracking-wider hover:border-[#C9A55A] hover:text-[#C9A55A] transition-all duration-300"
                  >
                    <ArrowLeft size={16} />
                    <span>Previous: {prevProject.title}</span>
                  </button>

                  <button
                    onClick={() => onSelectProject && onSelectProject(nextProject)}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#C9A55A] text-[#0A0908] px-6 py-4 rounded-xl text-xs uppercase font-bold tracking-wider hover:bg-white transition-all duration-300 shadow-xl"
                  >
                    <span>Next: {nextProject.title}</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              )}

              {/* 7. CONVERSION CTA BANNER */}
              <div className="pt-12 border-t border-white/10 text-center bg-gradient-to-b from-[#171816] to-[#0A0908] p-10 md:p-14 rounded-3xl border border-white/15 shadow-2xl">
                <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#C9A55A] block font-sans mb-2">
                  Bespoke Canadian Interiors
                </span>
                <h3 className="font-serif text-3xl md:text-4xl text-white mb-3 font-light">
                  Inspired by this space?
                </h3>
                <p className="text-white/70 text-sm md:text-base max-w-lg mx-auto mb-8 font-sans font-light">
                  Let’s create something considered for your home. Book a free in-home site measurement with our specialists.
                </p>

                <div className="flex flex-wrap items-center justify-center gap-4">
                  <button
                    onClick={() => {
                      onClose();
                      navigate('/contact');
                    }}
                    className="inline-flex items-center gap-2.5 bg-[#C9A55A] text-[#0A0908] px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest font-sans hover:bg-white transition-all shadow-xl"
                  >
                    <FileText size={15} />
                    <span>Book Free Measurement</span>
                  </button>

                  <button
                    onClick={() => {
                      onClose();
                      navigate('/room-viewer');
                    }}
                    className="inline-flex items-center gap-2.5 bg-white/10 text-white px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest font-sans hover:bg-white hover:text-[#0A0908] transition-all border border-white/20"
                  >
                    <Box size={15} />
                    <span>Test in 3D Studio</span>
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* FULLSCREEN LIGHTBOX MODAL */}
          {lightboxOpen && (
            <div className="fixed inset-0 z-[300] bg-black/98 flex items-center justify-center p-4">
              <button
                onClick={() => setLightboxOpen(false)}
                className="absolute top-6 right-6 p-3 text-white bg-white/10 rounded-full hover:bg-[#C9A55A] hover:text-[#0A0908] transition-colors z-30"
              >
                <X size={22} />
              </button>

              <div className="relative max-w-6xl w-full max-h-[90vh] flex items-center justify-center">
                <img
                  src={galleryImages[lightboxIndex]}
                  alt={`Enlarged view ${lightboxIndex + 1}`}
                  className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl"
                />

                {/* Lightbox Prev / Next controls */}
                {galleryImages.length > 1 && (
                  <>
                    <button
                      onClick={() => setLightboxIndex((prev) => (prev > 0 ? prev - 1 : galleryImages.length - 1))}
                      className="absolute left-4 p-3 bg-black/70 hover:bg-[#C9A55A] hover:text-[#0A0908] text-white rounded-full transition-colors border border-white/20"
                    >
                      <ChevronLeft size={24} />
                    </button>
                    <button
                      onClick={() => setLightboxIndex((prev) => (prev < galleryImages.length - 1 ? prev + 1 : 0))}
                      className="absolute right-4 p-3 bg-black/70 hover:bg-[#C9A55A] hover:text-[#0A0908] text-white rounded-full transition-colors border border-white/20"
                    >
                      <ChevronRight size={24} />
                    </button>
                  </>
                )}

                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-black/80 text-white/80 font-mono text-xs border border-white/20">
                  {lightboxIndex + 1} / {galleryImages.length}
                </div>
              </div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;
