import React from 'react';
import PageTransition from '../components/common/PageTransition';
import { testimonials } from '../data/testimonials';
import BeforeAfterSlider from '../components/portfolio/BeforeAfterSlider';
import { projects } from '../data/projects';
import { motion } from 'framer-motion';
import { Quote, Star, Play } from 'lucide-react';

const Testimonials = () => {
  return (
    <PageTransition>
      <div className="pt-32 pb-24 px-6 md:px-12 bg-bg-primary min-h-screen">
        <div className="max-w-7xl mx-auto">
          {/* Hero */}
          <div className="text-center mb-20">
            <span className="text-gold uppercase tracking-[0.3em] text-xs font-sans font-bold">Voices</span>
            <h1 className="text-5xl md:text-7xl font-serif text-white mt-4 italic mb-8">Client Testimonials</h1>
            
            {/* Stats strip */}
            <div className="flex flex-wrap justify-center gap-8 md:gap-16 pt-8 border-t border-gold/10">
                <div className="text-center">
                    <p className="text-4xl font-serif text-gold">500+</p>
                    <p className="text-[10px] uppercase font-bold tracking-widest text-ivory-muted/60">Projects</p>
                </div>
                <div className="text-center">
                    <p className="text-4xl font-serif text-gold">4.9/5</p>
                    <p className="text-[10px] uppercase font-bold tracking-widest text-ivory-muted/60">Average Rating</p>
                </div>
                <div className="text-center">
                    <p className="text-4xl font-serif text-gold">12</p>
                    <p className="text-[10px] uppercase font-bold tracking-widest text-ivory-muted/60">Cities</p>
                </div>
            </div>
          </div>

          {/* Video Testimonials Grid (Mock) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
            {[1, 2].map((i) => (
                <div key={i} className="relative group overflow-hidden gold-border p-1">
                    <div className="aspect-video relative overflow-hidden">
                        <img 
                            src={`https://images.unsplash.com/photo-${i === 1 ? '1618219908412-a29a1bb7b86e' : '1616486701797-0f33f6199611'}?auto=format&fit=crop&q=80&w=1200`} 
                            alt="Video Thumbnail" 
                            className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-16 h-16 bg-gold flex items-center justify-center rounded-full text-bg-primary transform transition-all group-hover:scale-110 shadow-xl">
                                <Play size={24} fill="currentColor" />
                            </div>
                        </div>
                    </div>
                </div>
            ))}
          </div>

          {/* Text Testimonials Masonry */}
          <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8 mb-24">
            {/* Generate more by duplicating/mapping */}
            {[...testimonials, ...testimonials, ...testimonials].map((item, idx) => (
              <motion.div
                key={`${item.id}-${idx}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="break-inside-avoid bg-bg-secondary p-8 gold-border relative group"
              >
                <Quote className="text-gold/10 absolute top-6 right-6" size={40} />
                <div className="flex items-center gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map(s => <Star key={s} size={12} className="text-gold fill-gold" />)}
                </div>
                <p className="text-ivory-muted text-sm leading-relaxed italic mb-6">
                    "{item.quote}"
                </p>
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-full border border-gold/30 p-0.5">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-full" />
                  </div>
                  <div>
                    <h4 className="text-white font-serif text-base">{item.name}</h4>
                    <p className="text-gold text-[9px] uppercase tracking-widest">{item.city}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Before/After Gallery Section */}
          <div className="pt-24 border-t border-gold/10">
            <div className="text-center mb-16">
                <span className="text-gold uppercase tracking-widest text-xs font-bold">The Reveal</span>
                <h2 className="text-4xl font-serif text-white mt-2">Before & After Project Map</h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                {projects.slice(0, 4).map((p) => (
                    <div key={p.id} className="space-y-6">
                        <BeforeAfterSlider before={p.beforeImage} after={p.image} />
                        <div className="text-center">
                            <h4 className="text-white font-serif text-xl">{p.title}</h4>
                            <p className="text-gold text-[10px] uppercase tracking-widest font-bold mt-1">{p.category}</p>
                        </div>
                    </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Testimonials;
