import React, { useState, useMemo } from 'react';
import PageTransition from '../components/common/PageTransition';
import ProjectCard from '../components/portfolio/ProjectCard';
import ProjectModal from '../components/portfolio/ProjectModal';
import { projects } from '../data/projects';
import { motion, AnimatePresence } from 'framer-motion';

const categories = ['All', 'Residential', 'Commercial', 'Luxury', 'Hospitality'];

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') return projects;
    return projects.filter(p => p.category === activeFilter);
  }, [activeFilter]);

  return (
    <PageTransition>
      <div className="pt-32 pb-24 px-6 md:px-12 bg-bg-primary min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <span className="text-gold uppercase tracking-[0.3em] text-xs font-sans font-bold">Showcase</span>
            <h1 className="text-5xl md:text-7xl font-serif text-white mt-4 italic">Portfolio</h1>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-16 px-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`uppercase tracking-widest text-[10px] md:text-xs font-bold py-2 px-6 transition-all duration-300 relative border ${
                  activeFilter === cat ? 'text-gold border-gold/40 bg-gold/5' : 'text-ivory-muted border-transparent hover:text-ivory'
                }`}
              >
                {cat}
                {activeFilter === cat && (
                  <motion.div
                    layoutId="activeFilter"
                    className="absolute -bottom-1 left-0 w-full h-[2px] bg-gold"
                  />
                )}
              </button>
            ))}
          </div>

          {/* Masonry-like Grid */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onClick={setSelectedProject}
                />
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </PageTransition>
  );
};

export default Portfolio;
