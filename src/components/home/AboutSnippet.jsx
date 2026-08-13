import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const AboutSnippet = () => {
  return (
    <section className="py-24 px-6 md:px-12 bg-bg-primary overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <span className="text-gold uppercase tracking-[0.3em] text-xs font-sans font-bold">About Us</span>
              <h2 className="text-4xl md:text-5xl font-serif text-white mt-4 leading-tight">
                Crafting Excellence <br /> <span className="italic text-gold/80">Since 2012</span>
              </h2>
            </div>
            
            <p className="text-ivory-muted leading-relaxed text-lg font-light">
              Brighton Decore is India's one-stop shop for creatively useful home design needs. We provide utility products that are both aesthetically pleasing and functional.
            </p>
            
            <p className="text-ivory-muted/80 leading-relaxed text-sm">
              Our vision is to consistently surpass clients' expectations and establish leadership in quality. We focus on innovation and a customer-centric mindset, ensuring every project meets international standards.
            </p>

            <Link to="/about" className="inline-block pt-4">
              <button className="border-b border-gold/40 text-gold uppercase tracking-widest text-xs font-bold pb-2 hover:border-gold transition-all">
                Learn More About Our Story
              </button>
            </Link>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="p-4 border border-gold/10">
              <img 
                src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=1000" 
                alt="Brighton Decore Studio" 
                className="w-full h-full object-cover grayscale-[30%]"
              />
            </div>
            {/* Decorative frame */}
            <div className="absolute -top-8 -right-8 w-32 h-32 border-t border-r border-gold/20 -z-10 hidden md:block" />
            <div className="absolute -bottom-8 -left-8 w-32 h-32 border-b border-l border-gold/20 -z-10 hidden md:block" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSnippet;
