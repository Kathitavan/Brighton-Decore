// src/components/home/ProductsSection.jsx
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles, Box, FileText, ChevronLeft, ChevronRight } from 'lucide-react';

const blindTypes = [
  { id: 'roller',    name: 'Roller Blinds',     desc: 'Clean, minimal, excellent light control for modern spaces.',    image: '/assets/imgs/products/roller-blinds.jpg' },
  { id: 'zebra',     name: 'Zebra Blinds',       desc: 'Dual-layer sheer & opaque alternating strips for variable light.', image: '/assets/imgs/products/zebra-blinds.jpg' },
  { id: 'honeycomb', name: 'Honeycomb Blinds',   desc: 'Cellular insulation engineering for ultimate energy efficiency.', image: '/assets/imgs/products/honeycomb-blinds.jpg' },
  { id: 'vertical',  name: 'Vertical Blinds',    desc: 'Sleek architectural coverage for wide windows & patio doors.', image: '/assets/imgs/products/vertical-blinds.jpg' },
  { id: 'wooden',    name: 'Wooden & Faux Wood', desc: 'Warm natural rich textures with durable moisture resistance.',  image: '/assets/imgs/products/wooden-blinds.jpg' },
  { id: 'pvc',       name: 'PVC Blinds',         desc: 'Waterproof, easy-clean durability engineered for heavy use.', image: '/assets/imgs/products/pvc-blinds.jpg' },
];

const ProductsSection = () => {
  const navigate = useNavigate();
  const ref = useRef(null);
  const scrollTrackRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  const scroll = (direction) => {
    if (scrollTrackRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      scrollTrackRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="products-section"
      ref={ref}
      className="py-12 md:py-16 bg-[#0A0908] text-white relative overflow-hidden border-t border-white/10"
      aria-label="Our window blinds collection"
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(201,165,90,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(201,165,90,0.03)_1px,transparent_1px)] bg-[size:45px_45px] pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-[#C9A55A]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 md:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-3 px-3.5 py-1.5 rounded-full bg-[#C9A55A]/10 border border-[#C9A55A]/25 mb-3">
              <Sparkles size={14} className="text-[#C9A55A]" />
              <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#C9A55A]">
                Window Coverings Suite
              </span>
            </div>

            <h2 className="font-serif text-white text-3xl sm:text-4xl md:text-5xl leading-tight">
              Bespoke Blinds Collection
            </h2>
            <p className="text-white/60 text-sm md:text-base mt-2 max-w-lg font-sans font-light">
              Tailored window blinds for Canadian homes. Select a style to request a complimentary quote or test live in 3D.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-4"
          >
            {/* Scroll Navigation Arrows */}
            <div className="hidden sm:flex items-center gap-2">
              <button
                onClick={() => scroll('left')}
                aria-label="Scroll left"
                className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:border-[#C9A55A] hover:bg-[#C9A55A]/10 transition-all duration-300"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => scroll('right')}
                aria-label="Scroll right"
                className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:border-[#C9A55A] hover:bg-[#C9A55A]/10 transition-all duration-300"
              >
                <ChevronRight size={18} />
              </button>
            </div>

            <button
              onClick={() => navigate('/products')}
              className="group inline-flex items-center gap-2.5 border border-white/20 px-5 py-3 text-[10px] uppercase tracking-[0.2em] font-bold font-sans text-white hover:border-[#C9A55A] hover:text-[#C9A55A] transition-all duration-300 rounded-full"
            >
              <span>View All Products</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>

        {/* Polished Horizontal Smooth-Scroll Track */}
        <div
          ref={scrollTrackRef}
          className="flex overflow-x-auto pb-4 gap-4 md:gap-5 snap-x cursor-grab active:cursor-grabbing scrollbar-thin scrollbar-thumb-[#C9A55A]/40 scrollbar-track-white/5"
        >
          {blindTypes.map((blind, i) => (
            <motion.div
              key={blind.id}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="min-w-[220px] md:min-w-[260px] lg:min-w-[280px] max-w-[280px] snap-start group cursor-pointer flex-shrink-0 backdrop-blur-xl bg-white/[0.03] border border-white/10 p-3.5 md:p-4 rounded-xl shadow-[0_15px_35px_rgba(0,0,0,0.4)] hover:border-[#C9A55A]/50 transition-all duration-500 flex flex-col justify-between"
              onClick={() => navigate('/products')}
            >
              <div>
                {/* Horizontal-friendly Compact Image Container */}
                <div className="aspect-[16/11] max-h-[190px] overflow-hidden rounded-lg bg-[#1A1814] mb-3.5 relative">
                  <img
                    src={blind.image}
                    alt={`${blind.name} — Brighton Decor Ltd`}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    loading="lazy"
                    onError={(e) => {
                      e.target.src = '/assets/imgs/common/placeholder.jpg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0908]/80 via-transparent to-transparent opacity-60" />
                </div>

                {/* Information */}
                <span className="text-[9px] uppercase font-bold tracking-[0.2em] text-[#C9A55A] mb-1 block font-sans">
                  Window Blinds
                </span>
                <h3 className="font-serif text-white text-base md:text-lg font-bold mb-1 group-hover:text-[#C9A55A] transition-colors">
                  {blind.name}
                </h3>
                <p className="line-clamp-2 text-xs md:text-sm text-white/60 mb-4 font-sans font-light leading-relaxed">
                  {blind.desc}
                </p>
              </div>

              {/* Action CTA Buttons */}
              <div className="flex gap-2 pt-3 border-t border-white/10">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate('/contact');
                  }}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 text-[9px] font-bold tracking-wider uppercase font-sans text-[#C9A55A] border border-[#C9A55A]/40 py-2 px-2 rounded-lg hover:bg-[#C9A55A] hover:text-[#0A0908] transition-all duration-300"
                >
                  <FileText size={11} />
                  <span>Quote</span>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate('/room-viewer', { state: { preselect: blind.id } });
                  }}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 text-[9px] font-bold tracking-wider uppercase font-sans bg-white/10 text-white py-2 px-2 rounded-lg hover:bg-white hover:text-[#0A0908] transition-all duration-300"
                >
                  <Box size={11} />
                  <span>3D Studio</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ProductsSection;
