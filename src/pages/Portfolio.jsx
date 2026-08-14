// src/pages/Portfolio.jsx
// Brighton Decor Canada — Portfolio Gallery V3 Architectural Editorial Grid
import React, { useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import PageTransition from '../components/common/PageTransition';
import { projects, portfolioCategories } from '../data/projects';
import ProjectCard from '../components/portfolio/ProjectCard';
import ProjectModal from '../components/portfolio/ProjectModal';
import TransformationSection from '../components/home/TransformationSection';
import { ArrowRight, Sparkles, SlidersHorizontal, Box, FileText, CheckCircle2, Crown, Search } from 'lucide-react';
import styles from '../styles/pages/portfolio.module.css';

const statsData = [
  { value: '1,300+', label: 'Canadian Homes Transformed' },
  { value: '4+', label: 'Years of Atelier Design' },
  { value: '100%', label: 'Client Satisfaction Rate' },
  { value: '5', label: 'Provinces Served Nationwide' },
];

const Portfolio = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const heroRef = useRef(null);
  const gridRef = useRef(null);

  // Parallax scroll-driven transforms for hero reveal
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.2]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 50]);

  // Compute category counts
  const categoryCounts = useMemo(() => {
    const counts = { All: projects.length };
    portfolioCategories.forEach((cat) => {
      if (cat === 'All') return;
      counts[cat] = projects.filter(
        (p) => p.category === cat || (p.categories && p.categories.includes(cat))
      ).length;
    });
    return counts;
  }, []);

  // Filter projects by active category and search query
  const filteredProjects = useMemo(() => {
    let result = activeCategory === 'All'
      ? projects
      : projects.filter(
          (p) => p.category === activeCategory || (p.categories && p.categories.includes(activeCategory))
        );

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.city.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.type.toLowerCase().includes(q)
      );
    }
    return result;
  }, [activeCategory, searchQuery]);

  const handleOpenProject = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseProject = () => {
    setIsModalOpen(false);
  };

  // Compute 12-column grid spans dynamically for editorial rhythm
  const getColSpan = (index) => {
    if (index === 0) return 'col-span-12 lg:col-span-8'; // Featured Hero Project
    if (index === 1) return 'col-span-12 md:col-span-6 lg:col-span-4';
    if (index % 6 === 2) return 'col-span-12 md:col-span-6 lg:col-span-5';
    if (index % 6 === 3) return 'col-span-12 md:col-span-6 lg:col-span-7';
    if (index % 6 === 4) return 'col-span-12 md:col-span-6 lg:col-span-7';
    if (index % 6 === 5) return 'col-span-12 md:col-span-6 lg:col-span-5';
    return 'col-span-12 md:col-span-6 lg:col-span-4';
  };

  return (
    <PageTransition>
      <div className={styles.portfolioPage}>
        
        {/* 1. CINEMATIC SCROLL HERO SECTION */}
        <section
          ref={heroRef}
          className="relative min-h-[85vh] flex items-center justify-center pt-32 pb-20 px-6 md:px-12 overflow-hidden border-b border-white/10"
          aria-label="Portfolio Introduction"
        >
          {/* Background Image Reveal with Scroll Scaling */}
          <motion.div
            style={{ scale: heroScale, opacity: heroOpacity }}
            className="absolute inset-0 z-0 pointer-events-none"
          >
            <img
              src="/assets/imgs/portfolio/project-1.jpg"
              alt="Brighton Decor Architectural Interior"
              className="w-full h-full object-cover filter brightness-[0.35] contrast-[1.1]"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0908] via-[#0A0908]/70 to-transparent" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(201,165,90,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(201,165,90,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
          </motion.div>

          <div className="max-w-7xl mx-auto w-full relative z-10 text-center">
            <motion.div style={{ y: textY }} className="max-w-4xl mx-auto">
              {/* Eyebrow Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#C9A55A]/15 border border-[#C9A55A]/30 mb-6 backdrop-blur-md"
              >
                <Sparkles size={14} className="text-[#C9A55A]" />
                <span className="text-[10px] md:text-xs uppercase font-bold tracking-[0.25em] text-[#C9A55A] font-sans">
                  Brighton Decor / Canadian Portfolio
                </span>
              </motion.div>

              {/* Main Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="font-serif text-[#F5F2EA] text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-tight leading-[1.05] mb-6"
              >
                Spaces Designed <br className="hidden sm:inline" />
                To Be Lived In.
              </motion.h1>

              {/* Editorial Subtext */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-white/70 font-sans font-light text-base md:text-xl leading-relaxed max-w-2xl mx-auto mb-12"
              >
                Explore a curated collection of residential interiors, refined window solutions, and bespoke flooring installations created for homes across Canada.
              </motion.p>

              {/* Animated Statistics Counters */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 pt-8 border-t border-white/15 bg-[#171816]/60 backdrop-blur-xl p-6 rounded-2xl border"
              >
                {statsData.map((stat, idx) => (
                  <div key={idx} className="text-center">
                    <span className="font-serif text-2xl md:text-4xl text-[#F5F2EA] font-medium block mb-1">
                      {stat.value}
                    </span>
                    <span className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-[#C9A55A] font-sans block">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* 2. ARCHITECTURAL EDITORIAL 12-COLUMN GALLERY GRID */}
        <section ref={gridRef} className="py-16 md:py-24 px-6 md:px-12 bg-[#0A0908] relative">
          <div className="max-w-7xl mx-auto">
            
            {/* Gallery Header Controls */}
            <div className="flex flex-col gap-8 mb-12">
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                <div>
                  <div className="inline-flex items-center gap-2 text-[#C9A55A] text-xs font-sans uppercase tracking-[0.2em] font-bold mb-2">
                    <SlidersHorizontal size={14} />
                    <span>Editorial Collection</span>
                  </div>
                  <h2 className="font-serif text-[#F5F2EA] text-3xl md:text-5xl font-light">
                    Featured Project Showcase
                  </h2>
                </div>

                {/* Real-time Search Query Input */}
                <div className="relative w-full lg:w-72">
                  <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search city, blind style, timber..."
                    className="w-full pl-10 pr-4 py-3 rounded-full bg-white/[0.04] border border-white/15 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#C9A55A] focus:bg-white/[0.08] transition-all font-sans"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-white/50 hover:text-white"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>

              {/* Sliding Pill Category Filter Bar */}
              <div className="flex items-center gap-2 overflow-x-auto pb-3 pt-1 scrollbar-thin no-scrollbar select-none border-b border-white/10">
                {portfolioCategories.map((cat) => {
                  const isActive = activeCategory === cat;
                  const count = categoryCounts[cat] || 0;

                  return (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`relative px-5 py-2.5 rounded-full text-xs font-sans tracking-[0.15em] uppercase transition-all duration-300 whitespace-nowrap shrink-0 flex items-center gap-2 ${
                        isActive
                          ? 'text-[#0A0908] font-bold shadow-lg scale-105'
                          : 'text-white/70 hover:text-white'
                      }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activeCategoryPillV3"
                          className="absolute inset-0 bg-[#F5F2EA] rounded-full z-0 shadow-[0_0_20px_rgba(245,242,234,0.4)]"
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                      <span className="relative z-10">{cat}</span>
                      <span
                        className={`relative z-10 font-mono text-[10px] px-2 py-0.5 rounded-full transition-colors ${
                          isActive
                            ? 'bg-[#0A0908]/15 text-[#0A0908]'
                            : 'bg-white/10 text-white/60'
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Live Count Indicator */}
              <div className="flex items-center justify-between text-xs text-white/50 font-sans">
                <span>
                  Showing <strong className="text-[#C9A55A] font-mono">{filteredProjects.length}</strong> of {projects.length} Canadian Portfolio Residences
                </span>
                {searchQuery && (
                  <span>
                    Filtered by "<span className="text-[#C9A55A]">{searchQuery}</span>"
                  </span>
                )}
              </div>
            </div>

            {/* Asymmetric 12-Column Editorial Grid */}
            {filteredProjects.length === 0 ? (
              <div className="text-center py-20 bg-white/[0.02] rounded-2xl border border-white/10">
                <p className="text-white/60 font-sans text-base mb-4">No projects found matching your filter criteria.</p>
                <button
                  onClick={() => {
                    setActiveCategory('All');
                    setSearchQuery('');
                  }}
                  className="px-6 py-2.5 rounded-full bg-[#C9A55A] text-[#0A0908] text-xs font-bold uppercase tracking-widest font-sans"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeCategory}-${searchQuery}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="grid grid-cols-1 md:grid-cols-8 lg:grid-cols-12 gap-6 md:gap-8 items-stretch"
                >
                  {filteredProjects.map((project, i) => {
                    const colSpan = getColSpan(i);
                    const isFeatured = i === 0;

                    return (
                      <ProjectCard
                        key={project.id}
                        project={project}
                        index={i}
                        colSpan={colSpan}
                        isFeatured={isFeatured}
                        onClick={handleOpenProject}
                      />
                    );
                  })}
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        </section>

        {/* 3. DESIGN PHILOSOPHY SECTION */}
        <section className="py-20 md:py-28 px-6 md:px-12 bg-[#121210] border-y border-white/10 relative overflow-hidden">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C9A55A]/10 border border-[#C9A55A]/25 text-[#C9A55A] text-[10px] uppercase font-bold tracking-[0.25em]">
                <Crown size={13} />
                <span>Atelier Philosophy</span>
              </div>
              <h2 className="font-serif text-[#F5F2EA] text-3xl md:text-5xl font-light leading-tight">
                Considered Details. <br /> Uncompromising Quality.
              </h2>
              <p className="text-white/70 font-sans font-light text-base leading-relaxed">
                At Brighton Decor Canada, every shade, custom drape, and hardwood plank is selected to harmonize light, acoustic comfort, and long-lasting durability across Canadian seasons.
              </p>

              <div className="pt-4 space-y-3 font-sans">
                <div className="flex items-center gap-3 text-sm text-white/80">
                  <CheckCircle2 size={16} className="text-[#C9A55A]" />
                  <span>Precision measure & custom architectural installation</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-white/80">
                  <CheckCircle2 size={16} className="text-[#C9A55A]" />
                  <span>High-R thermal insulation for harsh winters & bright summers</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-white/80">
                  <CheckCircle2 size={16} className="text-[#C9A55A]" />
                  <span>Integrated motorized smart home automation (Somfy & Lutron)</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 group">
                <img
                  src="/assets/imgs/portfolio/project-3.jpg"
                  alt="Minimalist Living Space"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 group sm:translate-y-8">
                <img
                  src="/assets/imgs/portfolio/project-4.jpg"
                  alt="Architectural Hardwood Detail"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>
          </div>
        </section>

        {/* 4. CINEMATIC BEFORE & AFTER TRANSFORMATION SHOWCASE V2 */}
        <TransformationSection />

        {/* 5. FINAL CONVERSION CTA BANNER */}
        <section className="py-20 md:py-28 px-6 md:px-12 bg-gradient-to-b from-[#121210] to-[#0A0908] border-t border-white/10 text-center relative overflow-hidden">
          <div className="max-w-3xl mx-auto relative z-10">
            <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#C9A55A] block mb-3 font-sans">
              Start Your Design Journey
            </span>
            <h2 className="font-serif text-[#F5F2EA] text-3xl sm:text-4xl md:text-6xl font-light mb-6 leading-tight">
              Inspired by these spaces?
            </h2>
            <p className="text-white/70 font-sans font-light text-base md:text-lg mb-10 max-w-xl mx-auto">
              Let's create something considered for your home. Book a complimentary in-home measurement or test your layout in 3D.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => navigate('/contact')}
                className="group inline-flex items-center gap-3 bg-[#C9A55A] text-[#0A0908] px-8 py-4 text-xs uppercase font-bold tracking-[0.2em] font-sans hover:bg-white transition-all duration-300 rounded-full shadow-2xl"
              >
                <FileText size={15} />
                <span>Book Free Measurement</span>
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => navigate('/room-viewer')}
                className="group inline-flex items-center gap-3 border border-white/20 bg-white/5 text-white px-8 py-4 text-xs uppercase font-bold tracking-[0.2em] font-sans hover:border-[#C9A55A] hover:text-[#C9A55A] transition-all duration-300 rounded-full"
              >
                <Box size={15} />
                <span>Explore 3D Studio</span>
              </button>
            </div>
          </div>
        </section>

        {/* Dynamic Immersive Project Viewer Modal */}
        <ProjectModal
          project={selectedProject}
          projectsList={filteredProjects}
          isOpen={isModalOpen}
          onClose={handleCloseProject}
          onSelectProject={(newProject) => setSelectedProject(newProject)}
        />
      </div>
    </PageTransition>
  );
};

export default Portfolio;
