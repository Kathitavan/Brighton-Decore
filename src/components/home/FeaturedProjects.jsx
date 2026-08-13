import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { projects } from '../../data/projects';
import { ArrowUpRight } from 'lucide-react';

const FeaturedProjects = () => {
  const featured = projects.slice(0, 3);

  return (
    <section className="py-24 px-6 md:px-12 overflow-hidden" style={{ background: '#0A1628' }}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 space-y-6 md:space-y-0">
          <div className="max-w-2xl">
            <span className="section-label">Our Work</span>
            <h2 className="text-4xl md:text-5xl font-serif text-white mt-4">Recent <span className="italic" style={{ color: '#C4A265' }}>Installations</span></h2>
          </div>
          <Link
            to="/portfolio"
            className="group flex items-center space-x-2 uppercase tracking-widest text-xs font-bold pb-2 transition-all"
            style={{ color: '#C4A265', borderBottom: '1px solid rgba(196,162,101,0.3)' }}
          >
            <span>View All Projects</span>
            <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
        </div>

        {/* Asymmetric Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Large Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 relative group overflow-hidden"
          >
            <div className="aspect-[4/5] md:aspect-[16/10] overflow-hidden">
              <img
                src={featured[0].image}
                alt={`${featured[0].product} installation Saskatoon`}
                loading="lazy"
                decoding="async"
                width={700}
                height={450}
                className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
              />
            </div>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8"
              style={{ background: 'rgba(10,22,40,0.7)' }}>
              <span className="px-3 py-1 text-[10px] uppercase font-bold tracking-widest w-fit mb-4 text-bg-primary"
                style={{ background: '#C4A265' }}>
                {featured[0].category}
              </span>
              <h3 className="text-3xl font-serif text-white mb-2">{featured[0].title}</h3>
              <p className="text-sm mb-6" style={{ color: '#C8C0B0' }}>{featured[0].city}</p>
              <Link to="/portfolio" className="text-white uppercase tracking-[0.2em] text-xs font-bold border-b border-white w-fit pb-1">
                View Project
              </Link>
            </div>
          </motion.div>

          {/* Right Stack */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            {featured.slice(1, 3).map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + idx * 0.2 }}
                viewport={{ once: true }}
                className="relative group overflow-hidden"
              >
                <div className="aspect-[16/9] overflow-hidden">
                  <img
                    src={project.image}
                    alt={`${project.product} installation Saskatoon`}
                    loading="lazy"
                    decoding="async"
                    width={500}
                    height={280}
                    className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
                  />
                </div>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6"
                  style={{ background: 'rgba(10,22,40,0.7)' }}>
                  <span className="px-3 py-1 text-[10px] uppercase font-bold tracking-widest w-fit mb-3 text-bg-primary"
                    style={{ background: '#C4A265' }}>
                    {project.category}
                  </span>
                  <h3 className="text-xl font-serif text-white mb-1">{project.title}</h3>
                  <p className="text-xs mb-4" style={{ color: '#C8C0B0' }}>{project.city}</p>
                  <Link to="/portfolio" className="text-white uppercase tracking-[0.2em] text-[10px] font-bold border-b border-white w-fit pb-1">
                    View Project
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
