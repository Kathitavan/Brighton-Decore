// src/components/home/BrandMarquee.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Crown, Shield, Award, Gem, Layers, Sun, Compass, Feather, Star } from 'lucide-react';

const row1Brands = [
  { name: 'Hunter Douglas', category: 'Automated Shading', icon: Sun },
  { name: 'Somfy', category: 'Smart Motorization', icon: Layers },
  { name: 'Lutron', category: 'Lighting & Control', icon: Sparkles },
  { name: 'Graber', category: 'Custom Treatments', icon: Shield },
  { name: 'Norman', category: 'Architectural Shutters', icon: Crown },
  { name: 'Kravet', category: 'Haute Textiles', icon: Gem },
  { name: 'Sunbrella', category: 'Performance Fabrics', icon: Sun },
  { name: 'Maharam', category: 'Architectural Weaves', icon: Compass },
  { name: 'Romo', category: 'British Atelier', icon: Feather },
  { name: 'Osborne & Little', category: 'Designer Wallpapers', icon: Star },
];

const row2Brands = [
  { name: 'Dedar', category: 'Milanese Textile Art', icon: Crown },
  { name: 'Sahco', category: 'Couture Velvet', icon: Gem },
  { name: 'Schumacher', category: 'Historic Fabrics', icon: Award },
  { name: 'Élitis', category: 'French Wallcoverings', icon: Sparkles },
  { name: 'Phillip Jeffries', category: 'Handcrafted Walls', icon: Layers },
  { name: 'Rubelli', category: 'Venetian Master Weavers', icon: Shield },
  { name: 'Holly Hunt', category: 'Modern Interiors', icon: Compass },
  { name: 'Pierre Frey', category: 'Parisian Fine Weaves', icon: Feather },
  { name: 'Designers Guild', category: 'Contemporary Prints', icon: Star },
  { name: 'Casamance', category: 'Refined Drapery', icon: Sun },
];

const BrandBadge = ({ brand }) => {
  const IconComponent = brand.icon || Sparkles;
  return (
    <div className="backdrop-blur-md bg-white/[0.02] border border-white/8 hover:border-[#C9A55A]/40 rounded-xl px-6 py-3.5 flex items-center justify-center gap-3 transition-all duration-300 group cursor-default shadow-sm hover:bg-white/[0.05] hover:shadow-[0_4px_25px_rgba(201,165,90,0.12)] shrink-0">
      <span className="w-6 h-6 rounded-full bg-[#C9A55A]/10 border border-[#C9A55A]/20 flex items-center justify-center text-[#C9A55A] group-hover:bg-[#C9A55A] group-hover:text-[#0A0908] transition-all duration-300">
        <IconComponent size={12} className="transition-transform group-hover:scale-110" />
      </span>
      <div className="flex flex-col">
        <span className="text-white/70 group-hover:text-white text-xs md:text-sm font-medium tracking-[0.2em] uppercase font-sans whitespace-nowrap transition-colors">
          {brand.name}
        </span>
      </div>
    </div>
  );
};

const BrandMarquee = () => {
  // Duplicate array multiple times to ensure seamless infinite looping on all screen sizes
  const quadRow1 = [...row1Brands, ...row1Brands, ...row1Brands, ...row1Brands];
  const quadRow2 = [...row2Brands, ...row2Brands, ...row2Brands, ...row2Brands];

  return (
    <section className="py-12 md:py-16 bg-[#0A0908] text-white relative overflow-hidden border-t border-white/10" aria-label="Brand Partners">
      {/* Background Subtle Grid Accent */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(201,165,90,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(201,165,90,0.02)_1px,transparent_1px)] bg-[size:45px_45px] pointer-events-none" />

      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-8 md:mb-10 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C9A55A]/10 border border-[#C9A55A]/25 mb-3"
        >
          <Sparkles size={13} className="text-[#C9A55A]" />
          <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#C9A55A]">
            Curated World-Class Atelier Partners
          </span>
        </motion.div>
        <motion.h3
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-serif text-white text-2xl md:text-3xl font-light tracking-wide"
        >
          Endorsed by Global Interiors & Textile Houses
        </motion.h3>
      </div>

      {/* Marquee Track Container with Gradient Edge Masks */}
      <div className="relative w-full overflow-hidden py-2">
        {/* Left & Right Soft Luxury Edge Fade Overlays */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-r from-[#0A0908] via-[#0A0908]/80 to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-l from-[#0A0908] via-[#0A0908]/80 to-transparent z-10" />

        {/* Row 1: Right to Left */}
        <div className="marquee-row-wrapper mb-4 md:mb-5 flex overflow-hidden select-none group/row1">
          <div className="marquee-track-left flex gap-4 md:gap-5 w-max group-hover/row1:[animation-play-state:paused]">
            {quadRow1.map((brand, index) => (
              <BrandBadge key={`r1-${brand.name}-${index}`} brand={brand} />
            ))}
          </div>
        </div>

        {/* Row 2: Left to Right at offset velocity */}
        <div className="marquee-row-wrapper flex overflow-hidden select-none group/row2">
          <div className="marquee-track-right flex gap-4 md:gap-5 w-max group-hover/row2:[animation-play-state:paused]">
            {quadRow2.map((brand, index) => (
              <BrandBadge key={`r2-${brand.name}-${index}`} brand={brand} />
            ))}
          </div>
        </div>
      </div>

      {/* Embedded Styles for Infinite Marquee Animations */}
      <style>{`
        @keyframes marqueeScrollLeft {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }

        @keyframes marqueeScrollRight {
          0% {
            transform: translate3d(-50%, 0, 0);
          }
          100% {
            transform: translate3d(0, 0, 0);
          }
        }

        .marquee-track-left {
          animation: marqueeScrollLeft 38s linear infinite;
          will-change: transform;
        }

        .marquee-track-right {
          animation: marqueeScrollRight 46s linear infinite;
          will-change: transform;
        }
      `}</style>
    </section>
  );
};

export default BrandMarquee;
