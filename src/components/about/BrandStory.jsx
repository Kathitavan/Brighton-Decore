import React from 'react';
import { motion } from 'framer-motion';

const BrandStory = () => {
  return (
    <section className="py-24 px-6 md:px-12 bg-bg-primary overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 space-y-8"
          >
            <div>
              <span className="text-gold uppercase tracking-[0.3em] text-xs font-sans font-bold">Our Story</span>
              <h2 className="text-4xl md:text-6xl font-serif text-white mt-4 leading-tight italic">
                Redefining Indian <br /> Living Spaces
              </h2>
            </div>
            
            <div className="space-y-6 text-ivory-muted text-lg font-light leading-relaxed">
              <p>
                Brighton Decore is India's one-stop shop for creatively useful home design needs. We provide utility products that are both aesthetically pleasing and functional.
              </p>
              <p>
                Founded in 2012, we have always maintained a strong focus on quality, innovation, and a customer-centric mindset. Our products and designs meet international quality standards while catering specifically to the unique needs of Indian households.
              </p>
              <p>
                Whether it's a compact urban studio or a sprawling suburban villa, our approach remains the same: combining utility with luxury to create spaces that tell your unique story.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 relative"
          >
            <div className="aspect-[4/5] gold-border p-2">
                <img 
                    src="https://images.unsplash.com/photo-1616137422495-1e9a47e215b2?auto=format&fit=crop&q=80&w=1000" 
                    alt="Interior Design Work" 
                    className="w-full h-full object-cover grayscale-[20%]"
                />
            </div>
            {/* Stats Overlay */}
            <div className="absolute -bottom-10 -left-10 bg-gold p-8 text-bg-primary hidden md:block">
                <p className="text-4xl font-serif font-bold">12+</p>
                <p className="text-[10px] uppercase font-bold tracking-widest mt-1">Years of Legacy</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BrandStory;
