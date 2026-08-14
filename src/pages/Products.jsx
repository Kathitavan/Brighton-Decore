// src/pages/Products.jsx
// Brighton Decor Canada — Products Showroom V3 (Photorealistic 3D Window Studio + 3D Card Physics)
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import PageTransition from '../components/common/PageTransition';
import { BLIND_PRODUCTS } from '../data/roomProducts';
import WindowCurtainShowcase from '../components/products/WindowCurtainShowcase';
import { ArrowRight, Tag, Sparkles, Box, Eye, Layers, Check } from 'lucide-react';
import styles from '../styles/pages/products.module.css';

const blindImages = {
  roller: '/assets/imgs/products/roller-blinds.jpg',
  zebra: '/assets/imgs/products/zebra-blinds.jpg',
  honeycomb: '/assets/imgs/products/honeycomb-blinds.jpg',
  vertical: '/assets/imgs/products/vertical-blinds.jpg',
  wooden: '/assets/imgs/products/wooden-blinds.jpg',
  pvc: '/assets/imgs/products/pvc-blinds.jpg',
};

const flooringProducts = [
  { id: 'hardwood',    name: 'Hardwood Flooring',        category: 'Flooring', desc: 'Classic beauty, natural warmth. Durable and timeless.', image: '/assets/imgs/products/hardwood-flooring.jpg' },
  { id: 'laminate',   name: 'Laminate Flooring',         category: 'Flooring', desc: 'Realistic wood look with outstanding durability and easy care.', image: '/assets/imgs/products/laminate-flooring.jpg' },
  { id: 'vinyl',      name: 'Vinyl Plank (LVP)',          category: 'Flooring', desc: '100% waterproof — ideal for basements, bathrooms, and kitchens.', image: '/assets/imgs/products/vinyl-plank.jpg' },
  { id: 'engineered', name: 'Engineered Hardwood',        category: 'Flooring', desc: 'All the beauty of hardwood with superior stability and moisture resistance.', image: '/assets/imgs/products/engineered-hardwood.jpg' },
];

const allProducts = [
  ...BLIND_PRODUCTS.map((b) => ({
    id: b.id,
    name: b.name,
    category: 'Blinds',
    desc: b.shortDesc,
    image: blindImages[b.id] || '/assets/imgs/common/placeholder.jpg',
    swatches: [
      { name: 'Linen White', hex: '#FAF8F5' },
      { name: 'Warm Sand', hex: '#EAE3D2' },
      { name: 'Artisan Oak', hex: '#4A3520' },
      { name: 'Slate Gray', hex: '#7A8288' }
    ]
  })),
  ...flooringProducts.map(f => ({
    ...f,
    swatches: [
      { name: 'Natural Oak', hex: '#C8A882' },
      { name: 'Dark Timber', hex: '#3A2E20' },
      { name: 'Smoked Ash', hex: '#8A8A8A' },
      { name: 'Honey Amber', hex: '#D9A76A' }
    ]
  })),
];

const categories = ['All', 'Blinds', 'Flooring'];

// Product Card Component with Subtle 3D Tilt Physics (Max ±4°), Sheen Beam & Swatches
const ProductCard3D = ({ product, index, navigate }) => {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [selectedSwatch, setSelectedSwatch] = useState(product.swatches[0]);

  // Framer Motion Cursor Coordinates & Physics Springs (Max ±4° for architectural subtlety)
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(mouseY, [0, 1], [4, -4]), { stiffness: 350, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-4, 4]), { stiffness: 350, damping: 30 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
    setIsHovered(false);
  };

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: isHovered ? rotateX : 0,
        rotateY: isHovered ? rotateY : 0,
        transformStyle: 'preserve-3d',
      }}
      className={`${styles.productCard3D} group flex flex-col justify-between select-none transform-gpu`}
    >
      {/* Product Image Stage */}
      <div className="aspect-[4/3] overflow-hidden bg-[#FAF8F5] relative">
        <img
          src={product.image}
          alt={`${product.name} — Brighton Decor Ltd`}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
          loading="lazy"
          onError={(e) => {
            e.target.src = '/assets/imgs/common/placeholder.jpg';
          }}
        />

        {/* Dynamic Specular Sheen Beam Overlay */}
        <div
          className={styles.sheenBeam}
          style={{
            opacity: isHovered ? 1 : 0,
            background: `linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 60%)`,
          }}
        />

        {/* Category Pill Tag */}
        <div className="absolute top-3 left-3 z-20">
          <span className="text-[9px] uppercase font-bold tracking-[0.2em] font-sans text-[#2B1F17] bg-white/85 backdrop-blur-md px-3 py-1 rounded-full border border-[#2B1F17]/10 shadow-sm">
            {product.category}
          </span>
        </div>

        {/* Active Swatch Badge Overlay */}
        <div className="absolute bottom-3 left-3 z-20">
          <span className="text-[9px] font-sans font-semibold text-[#2B1F17] bg-[#FAF8F5]/90 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-[#B89656]/30 flex items-center gap-1 shadow-sm">
            <span className="w-2 h-2 rounded-full border border-black/20" style={{ backgroundColor: selectedSwatch.hex }} />
            <span>{selectedSwatch.name}</span>
          </span>
        </div>
      </div>

      {/* Product Details Body */}
      <div className="p-6 flex flex-col justify-between flex-grow bg-white">
        <div>
          <h3 className="font-serif text-[#2B1F17] text-xl font-medium mb-2 group-hover:text-[#B89656] transition-colors leading-snug">
            {product.name}
          </h3>
          <p className="line-clamp-2 text-[#2B1F17]/70 text-xs font-sans font-light leading-relaxed mb-4">
            {product.desc}
          </p>

          {/* Interactive Material Swatches Bar */}
          <div className="flex items-center gap-2 mb-6 pt-2 border-t border-[#2B1F17]/10">
            <span className="text-[9px] uppercase font-bold tracking-widest text-[#2B1F17]/40 font-sans">
              Finish:
            </span>
            <div className="flex items-center gap-1.5">
              {product.swatches.map((swatch, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedSwatch(swatch);
                  }}
                  onMouseEnter={() => setSelectedSwatch(swatch)}
                  title={swatch.name}
                  className={`${styles.swatchDot} ${selectedSwatch.name === swatch.name ? styles.swatchDotActive : ''}`}
                  style={{ backgroundColor: swatch.hex }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 pt-2">
          <button
            onClick={() => navigate('/contact')}
            className={`${styles.primaryBtn} flex-1 text-[10px] uppercase font-bold tracking-widest font-sans py-3 rounded-xl transition-all flex items-center justify-center gap-1.5`}
          >
            <span>Request Quote</span>
          </button>

          {product.category === 'Blinds' && (
            <button
              onClick={() => navigate('/room-viewer', { state: { preselect: product.id } })}
              className={`${styles.try3dBtn} flex-1 text-[10px] uppercase font-bold tracking-widest font-sans border border-[#2B1F17]/20 text-[#2B1F17] py-3 rounded-xl hover:border-[#B89656] hover:text-[#B89656] transition-all bg-[#FAF8F5] flex items-center justify-center gap-1.5 shadow-[0_0_12px_rgba(184,150,86,0.25)]`}
            >
              <Box size={13} className="text-[#B89656] animate-pulse" />
              <span>Try in 3D</span>
            </button>
          )}
        </div>
      </div>
    </motion.article>
  );
};

const Products = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('All');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const filtered = activeCategory === 'All'
    ? allProducts
    : allProducts.filter((p) => p.category === activeCategory);

  return (
    <PageTransition>
      <div className={`${styles.productsPage} ${styles.gridPattern}`}>
        
        {/* 1. Refined Architectural Header */}
        <section className="relative pt-36 pb-12 px-6 md:px-12 border-b border-[#2B1F17]/10">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-3xl"
            >
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/80 border border-[#2B1F17]/15 text-[#2B1F17] text-[10px] uppercase font-bold tracking-[0.25em] mb-4 shadow-sm backdrop-blur-md">
                <Sparkles size={14} className="text-[#B89656]" />
                <span>3D Architectural Showroom Collection</span>
              </div>
              <h1
                className="font-serif text-[#2B1F17] font-light leading-tight mb-4"
                style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}
              >
                Window Blinds &amp;<br />
                <span className="italic text-[#B89656]">Flooring Collection</span>
              </h1>
              <p className="text-[#2B1F17]/75 text-lg md:text-xl font-sans font-light leading-relaxed">
                Curated Canadian materials, tailored specs, and professional installation. Contact us for a free site measurement and personalized quote.
              </p>
            </motion.div>
          </div>
        </section>

        {/* 2. Interactive 3D Window & Curtain Studio Section */}
        <section className="px-6 md:px-12 max-w-7xl mx-auto pt-6">
          <WindowCurtainShowcase />
        </section>

        {/* 3. Products Catalog & Filters */}
        <section ref={ref} className="py-16 md:py-24 px-6 md:px-12">
          <div className="max-w-7xl mx-auto">
            
            {/* Pricing Policy Banner */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              className="bg-white/80 backdrop-blur-md border border-[#2B1F17]/12 p-6 rounded-2xl mb-12 flex items-start gap-4 shadow-sm"
            >
              <Tag size={20} className="text-[#B89656] mt-0.5 flex-shrink-0" />
              <p className="text-[#2B1F17]/85 text-sm font-sans font-light leading-relaxed">
                <strong className="font-semibold text-[#2B1F17]">Custom Measurement Quoting Policy:</strong>{' '}
                Pricing depends on your exact window dimensions, material specifications, and installation requirements. 
                We offer a <strong className="text-[#B89656] font-semibold">free site measurement across Saskatoon & Canada</strong> to provide an accurate, transparent quote.
              </p>
            </motion.div>

            {/* Category Filter Pills with Framer Motion layoutId Indicator */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 mb-12"
            >
              {categories.map((cat) => {
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`${styles.filterPill} ${isActive ? styles.filterPillActive : styles.filterPillInactive}`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeCategoryIndicator"
                        className="absolute inset-0 bg-[#2B1F17] rounded-full shadow-md -z-10"
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                    <span>{cat}</span>
                  </button>
                );
              })}
            </motion.div>

            {/* Product Cards Grid with 3D Hover Physics */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8"
              >
                {filtered.map((product, i) => (
                  <ProductCard3D
                    key={product.id}
                    product={product}
                    index={i}
                    navigate={navigate}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* 4. CTA Banner */}
        <section className="py-20 px-6 md:px-12 bg-[#2B1F17] text-[#F5F0E6] text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="font-serif text-[#F5F0E6] text-3xl md:text-4xl font-light mb-4">
              Can't find what you're looking for?
            </h2>
            <p className="text-[#F5F0E6]/75 mb-8 text-base font-sans font-light">
              We supply custom fabrications. Reach out to our design team to explore bespoke specifications for your space.
            </p>
            <button
              onClick={() => navigate('/contact')}
              className="group inline-flex items-center gap-3 bg-[#B89656] text-[#2B1F17] px-8 py-4 rounded-full text-xs uppercase tracking-[0.2em] font-bold font-sans hover:bg-white transition-all shadow-xl"
            >
              <span>Talk to Our Team</span>
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </section>

      </div>
    </PageTransition>
  );
};

export default Products;
