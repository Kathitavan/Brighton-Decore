import React, { useState } from 'react';
import PageTransition from '../components/common/PageTransition';
import { blogPosts } from '../data/blogPosts';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Calendar, Clock, User } from 'lucide-react';

const categories = ['All', 'Design Tips', 'Trends', 'Materials', 'Color Theory', 'Client Stories'];

const Blog = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredPosts = activeFilter === 'All' 
    ? blogPosts 
    : blogPosts.filter(p => p.category === activeFilter);

  return (
    <PageTransition>
      <div className="pt-32 pb-24 px-6 md:px-12 bg-bg-primary min-h-screen">
        <div className="max-w-7xl mx-auto">
          {/* Hero */}
          <div className="text-center mb-20">
            <span className="text-gold uppercase tracking-[0.3em] text-xs font-sans font-bold">Journal</span>
            <h1 className="text-5xl md:text-7xl font-serif text-white mt-4 italic mb-8">Design Stories</h1>
          </div>

          {/* Featured Article */}
          <div className="mb-24 group cursor-pointer relative overflow-hidden gold-border p-1">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="aspect-[16/10] overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1200" 
                  alt="Featured Post" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-8 md:p-16 flex flex-col justify-center bg-bg-secondary">
                <span className="text-gold text-[10px] uppercase font-bold tracking-widest mb-6 block">Trending Feature</span>
                <h2 className="text-3xl md:text-5xl font-serif text-white mb-6 leading-tight group-hover:text-gold transition-colors">
                  The Future of Luxury: Sustainable Materials and Craftsmanship
                </h2>
                <p className="text-ivory-muted text-sm md:text-base leading-relaxed mb-8 italic">
                  Explore how Brighton Decore is leading the charge in eco-conscious luxury interior design in 2025...
                </p>
                <div className="flex items-center text-ivory-muted text-[10px] uppercase tracking-widest space-x-6">
                  <span className="flex items-center gap-2"><Calendar size={14} className="text-gold"/> June 12, 2025</span>
                  <span className="flex items-center gap-2"><Clock size={14} className="text-gold"/> 12 min read</span>
                </div>
              </div>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-16 px-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`uppercase tracking-widest text-[10px] font-bold py-2 px-6 transition-all duration-300 border ${
                  activeFilter === cat ? 'text-gold border-gold/40 bg-gold/5' : 'text-ivory-muted border-transparent hover:text-ivory'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredPosts.map((post) => (
                <motion.div
                  layout
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-bg-secondary p-1 flex flex-col group"
                >
                  <div className="aspect-[16/10] overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" 
                    />
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <span className="text-gold text-[10px] uppercase font-bold tracking-widest mb-4 block">
                      {post.category}
                    </span>
                    <h3 className="text-xl font-serif text-white mb-4 line-clamp-2 leading-tight group-hover:text-gold transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-ivory-muted text-sm mb-6 flex-1 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="pt-6 border-t border-gold/5 flex items-center justify-between">
                      <span className="text-ivory-muted text-[10px] uppercase">{post.date}</span>
                      <button className="text-gold hover:text-white transition-colors flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest group/btn">
                        Read More <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Load More */}
          <div className="mt-20 text-center">
            <button className="border border-gold text-gold px-12 py-4 uppercase tracking-[0.2em] text-xs font-bold hover:bg-gold hover:text-bg-primary transition-all">
                Load More Articles
            </button>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Blog;
