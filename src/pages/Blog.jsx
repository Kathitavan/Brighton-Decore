// src/pages/Blog.jsx
// Brighton Decor Canada — Design Ideas / Blog (Theme: Publisher's Editorial Magazine - Cream Paper & Terracotta)
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import PageTransition from '../components/common/PageTransition';
import { blogPosts, blogCategories } from '../data/blogPosts';
import { ArrowRight, Clock, Tag, BookOpen, Sparkles } from 'lucide-react';
import styles from '../styles/pages/blog.module.css';

const Blog = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('All');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const filtered = activeCategory === 'All'
    ? blogPosts
    : blogPosts.filter((p) => p.category === activeCategory);

  return (
    <PageTransition>
      <div className={styles.blogPage}>
        {/* Header */}
        <section className="relative pt-36 pb-20 px-6 md:px-12 border-b border-[#261C14]/10 bg-[#FBF9F4]">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="max-w-3xl"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D96B43]/10 border border-[#D96B43]/25 text-[#D96B43] text-[10px] uppercase font-bold tracking-[0.25em] mb-4">
                <BookOpen size={13} />
                <span>Editorial Journal</span>
              </div>
              <h1
                className="font-serif text-[#261C14] font-light leading-tight mb-6"
                style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}
              >
                Interior Design Ideas<br />
                <span className="italic text-[#D96B43]">&amp; Architectural Insights</span>
              </h1>
              <p className="text-[#261C14]/75 text-lg md:text-xl font-sans font-light leading-relaxed">
                Expert tips, trends, and material guides for Canadian homeowners — from light-control window choices to enduring hardwood finishes.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Blog Article Grid */}
        <section ref={ref} className="py-16 md:py-24 px-6 md:px-12 bg-[#F6F3EB]">
          <div className="max-w-7xl mx-auto">
            {/* Category Filter Pills */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              className="flex flex-wrap items-center gap-3 mb-12"
            >
              {blogCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-2.5 rounded-full text-xs uppercase tracking-[0.18em] font-bold font-sans transition-all duration-300 ${
                    activeCategory === cat
                      ? 'bg-[#261C14] text-[#FBF9F4] shadow-lg scale-105'
                      : 'bg-white border border-[#261C14]/15 text-[#261C14]/70 hover:border-[#D96B43] hover:text-[#D96B43]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </motion.div>

            {/* Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((post, i) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.55, delay: i * 0.08 }}
                  className="group cursor-pointer bg-white border border-[#261C14]/12 rounded-2xl overflow-hidden hover:border-[#D96B43] transition-all duration-500 flex flex-col justify-between shadow-sm hover:shadow-xl"
                >
                  <div>
                    {/* Image */}
                    <div className="aspect-[16/10] overflow-hidden bg-[#FBF9F4] relative">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                        onError={(e) => {
                          e.target.src = '/assets/imgs/common/placeholder.jpg';
                        }}
                      />
                    </div>
                    {/* Meta & Title Body */}
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#D96B43] font-sans">
                          {post.category}
                        </span>
                        <span className="flex items-center gap-1 text-[#261C14]/50 text-[11px] font-sans">
                          <Clock size={11} className="text-[#D96B43]" />
                          {post.readTime}
                        </span>
                      </div>
                      <h2 className="font-serif text-[#261C14] text-xl font-medium mb-3 group-hover:text-[#D96B43] transition-colors leading-snug">
                        {post.title}
                      </h2>
                      <p className="text-[#261C14]/65 text-xs font-sans font-light leading-relaxed mb-4">
                        {post.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-2">
                    <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] font-bold text-[#D96B43] font-sans group-hover:text-[#261C14] transition-colors">
                      <span>Read Article</span>
                      <ArrowRight size={13} className="group-hover:translate-x-1.5 transition-transform" />
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="py-20 px-6 md:px-12 bg-[#261C14] text-[#FBF9F4] text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="font-serif text-[#FBF9F4] text-3xl md:text-4xl font-light mb-4">
              Need expert advice for your home?
            </h2>
            <p className="text-[#FBF9F4]/75 mb-8 text-base font-sans font-light">
              Talk to our design specialists — free consultation and in-home site measurement included.
            </p>
            <button
              onClick={() => navigate('/contact')}
              className="group inline-flex items-center gap-3 bg-[#D96B43] text-[#FBF9F4] px-8 py-4 rounded-full text-xs uppercase tracking-[0.2em] font-bold font-sans hover:bg-white hover:text-[#261C14] transition-all shadow-xl"
            >
              <span>Book Free Consultation</span>
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default Blog;
