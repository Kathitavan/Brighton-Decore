// src/components/home/ServicesTeaser.jsx
import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Layers, Grid, Frame, Sparkles, X, FileText, Box, CheckCircle2 } from 'lucide-react';
import useModalScroll from '../../hooks/useModalScroll';

const icons = { Layers, Grid, Frame };

const services = [
  {
    id: 'blinds',
    icon: 'Layers',
    name: 'Window Blinds',
    desc: 'Roller, zebra, honeycomb, vertical, wooden & PVC blinds.',
    path: '/services',
  },
  {
    id: 'window-coverings',
    icon: 'Frame',
    name: 'Window Coverings',
    desc: 'Custom curtains, sheers, and blackout solutions.',
    path: '/services',
  },
  {
    id: 'flooring',
    icon: 'Grid',
    name: 'Flooring',
    desc: 'Hardwood, laminate, vinyl plank, and carpet tile.',
    path: '/services',
  },
];

// Details dataset accessed on click
const blindsDetails = [
  {
    id: 'roller',
    name: 'Roller Blinds',
    desc: 'Clean, minimal, excellent light control for modern spaces.',
    image: '/assets/imgs/products/roller-blinds.jpg',
  },
  {
    id: 'zebra',
    name: 'Zebra Blinds',
    desc: 'Dual-layer sheer & opaque alternating strips for variable light.',
    image: '/assets/imgs/products/zebra-blinds.jpg',
  },
  {
    id: 'honeycomb',
    name: 'Honeycomb Blinds',
    desc: 'Cellular insulation engineering for ultimate energy efficiency.',
    image: '/assets/imgs/products/honeycomb-blinds.jpg',
  },
  {
    id: 'vertical',
    name: 'Vertical Blinds',
    desc: 'Sleek architectural coverage for wide windows & patio doors.',
    image: '/assets/imgs/products/vertical-blinds.jpg',
  },
  {
    id: 'wooden',
    name: 'Wooden & Faux Wood',
    desc: 'Warm natural rich textures with durable moisture resistance.',
    image: '/assets/imgs/products/wooden-blinds.jpg',
  },
  {
    id: 'pvc',
    name: 'PVC Blinds',
    desc: 'Waterproof, easy-clean durability engineered for heavy use.',
    image: '/assets/imgs/products/pvc-blinds.jpg',
  },
];

const flooringDetails = [
  {
    id: 'hardwood',
    name: 'Hardwood',
    desc: 'Rich solid and engineered hardwood timber planks, precision milled for natural grain warmth and long-lasting durability.',
    image: '/assets/imgs/products/hardwood-flooring.jpg',
  },
  {
    id: 'laminate',
    name: 'Laminate',
    desc: 'High-density scratch-resistant laminate flooring replicating real timber aesthetics with effortless maintenance and water resilience.',
    image: '/assets/imgs/products/laminate-flooring.jpg',
  },
  {
    id: 'vinyl',
    name: 'Vinyl Plank',
    desc: '100% waterproof luxury vinyl plank (LVP) flooring engineered for high-traffic family zones, basements, kitchens, and moisture-prone areas.',
    image: '/assets/imgs/products/vinyl-plank.jpg',
  },
  {
    id: 'carpet-tile',
    name: 'Carpet Tile',
    desc: 'Modular, comfortable carpet tiles providing soft underfoot warmth, acoustic insulation, and simple individual tile stain replacement.',
    image: '/assets/imgs/products/engineered-hardwood.jpg',
  },
];

const coveringsDetails = [
  {
    id: 'drapes',
    name: 'Custom Drapery & Curtains',
    desc: 'Bespoke floor-to-ceiling drapery in Belgian linen, velvet, and blackout fabrics tailored to your exact window dimensions.',
    image: '/assets/imgs/products/zebra-blinds.jpg',
  },
  {
    id: 'sheers',
    name: 'Architectural Sheer Panels',
    desc: 'Light-diffusing sheer paneling filtering glare while creating an elegant atmosphere in living spaces.',
    image: '/assets/imgs/products/roller-blinds.jpg',
  },
  {
    id: 'motorized',
    name: 'Smart Motorized Controls',
    desc: 'Somfy & Lutron automated remote control systems integrated with home automation.',
    image: '/assets/imgs/products/honeycomb-blinds.jpg',
  },
];

const ServiceTiltCard = ({ service, index, isInView, onClick }) => {
  const cardRef = useRef(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const Icon = icons[service.icon] || Layers;

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 14;
    const rotateY = (centerX - x) / 14;
    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        onClick={() => onClick(service.id)}
        style={{
          transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
          transition: 'transform 0.15s ease-out',
        }}
        className="group relative cursor-pointer overflow-hidden backdrop-blur-xl bg-gradient-to-br from-white/[0.04] via-white/[0.01] to-transparent border border-white/10 p-8 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-500 hover:border-[#C9A55A]/50 hover:shadow-[0_30px_70px_rgba(201,165,90,0.15)] flex flex-col justify-between h-full transform-gpu"
      >
        {/* Mouse Spotlight Glow */}
        <div
          className="pointer-events-none absolute -inset-px transition-opacity duration-500 rounded-[inherit]"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(201, 165, 90, 0.15), transparent 70%)`,
          }}
        />

        {/* Gold Sheen Sweep Effect */}
        {isHovered && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: '200%' }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-[#C9A55A]/20 to-transparent skew-x-12 pointer-events-none"
          />
        )}

        <div>
          <div className="w-12 h-12 rounded-xl bg-[#C9A55A]/10 border border-[#C9A55A]/30 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#C9A55A] group-hover:text-[#0A0908] transition-all duration-300 text-[#C9A55A]">
            <Icon size={22} />
          </div>

          <h3 className="font-serif text-white text-2xl font-bold mb-3 group-hover:text-[#C9A55A] transition-colors duration-300">
            {service.name}
          </h3>

          <p className="text-white/70 font-sans font-light text-sm leading-relaxed mb-6">
            {service.desc}
          </p>
        </div>

        <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[10px] uppercase font-bold tracking-[0.2em] text-[#C9A55A] font-sans">
          <span>Click to View Options</span>
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </motion.div>
  );
};

const ServicesTeaser = () => {
  const navigate = useNavigate();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const [activeModal, setActiveModal] = useState(null); // 'blinds' | 'flooring' | 'window-coverings' | null

  // Manage body scroll locking cleanly via global hook
  useModalScroll(!!activeModal);

  const handleCardClick = (serviceId) => {
    setActiveModal(serviceId);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  return (
    <section
      ref={ref}
      className="py-16 md:py-24 bg-[#0A0908] text-white relative overflow-hidden"
      aria-label="Our services"
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(201,165,90,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(201,165,90,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-[#C9A55A]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-3 px-3.5 py-1.5 rounded-full bg-[#C9A55A]/10 border border-[#C9A55A]/25 mb-4">
              <Sparkles size={14} className="text-[#C9A55A]" />
              <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#C9A55A]">
                Comprehensive Offerings
              </span>
            </div>

            <h2 className="font-serif text-white text-3xl sm:text-4xl md:text-5xl leading-tight">
              Architectural Services for <br />
              <span className="italic text-[#C9A55A]">Refined Canadian Spaces</span>
            </h2>
          </motion.div>

          <motion.button
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            onClick={() => navigate('/services')}
            className="group inline-flex items-center gap-3 border border-white/20 px-6 py-3.5 text-[11px] uppercase tracking-[0.2em] font-bold font-sans text-white hover:border-[#C9A55A] hover:text-[#C9A55A] transition-all duration-300 rounded-full"
          >
            <span>View All Services</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </div>

        {/* Services Grid (3 Cards: Window Blinds, Window Coverings, Flooring) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <ServiceTiltCard
              key={service.id}
              service={service}
              index={i}
              isInView={isInView}
              onClick={handleCardClick}
            />
          ))}
        </div>

      </div>

      {/* INTERACTIVE MODAL POPUP FOR SERVICE DETAILS */}
      <AnimatePresence>
        {activeModal && (
          <div 
            className="fixed inset-0 z-[250] flex items-center justify-center p-4 sm:p-6 md:p-10"
            role="dialog"
            aria-modal="true"
            data-lenis-prevent
          >
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="fixed inset-0 bg-black/85 backdrop-blur-md"
            />

            {/* Modal Dialog Content Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative z-10 w-full max-w-5xl max-h-[90vh] bg-[#0A0908] border border-[#C9A55A]/40 rounded-2xl shadow-[0_30px_90px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col"
            >
              {/* Modal Header */}
              <div className="bg-[#121210] border-b border-white/10 px-6 sm:px-8 py-5 flex items-center justify-between shrink-0">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#C9A55A] block mb-1 font-sans">
                    {activeModal === 'blinds'
                      ? 'WINDOW COVERINGS SUITE'
                      : activeModal === 'flooring'
                      ? 'CANADIAN FLOORING SUITE'
                      : 'CUSTOM DRAPERY & COVERINGS'}
                  </span>
                  <h3 className="font-serif text-white text-2xl sm:text-3xl font-light">
                    {activeModal === 'blinds'
                      ? 'Bespoke Blinds Collection'
                      : activeModal === 'flooring'
                      ? 'Flooring Collection'
                      : 'Window Coverings Suite'}
                  </h3>
                </div>
                <button
                  onClick={closeModal}
                  aria-label="Close details modal"
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/15 flex items-center justify-center text-white/80 hover:text-[#0A0908] hover:bg-[#C9A55A] hover:border-[#C9A55A] transition-all duration-300"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Modal Body Scroll Area */}
              <div 
                className="p-6 sm:p-8 md:p-10 overflow-y-auto space-y-6 modal-scroll-area touch-pan-y"
                data-lenis-prevent
                data-lenis-prevent-wheel
                data-lenis-prevent-touch
                style={{ overscrollBehavior: 'contain' }}
              >
                {/* 1. WINDOW BLINDS COLLECTION MODAL (PDF Page 3 & 4) */}
                {activeModal === 'blinds' && (
                  <div>
                    <p className="text-white/70 font-sans font-light text-sm md:text-base mb-8 max-w-2xl">
                      Tailored window blinds for Canadian homes. Select a style to request a complimentary quote or test live in 3D.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {blindsDetails.map((blind) => (
                        <div
                          key={blind.id}
                          className="bg-white/[0.03] border border-white/10 hover:border-[#C9A55A]/50 rounded-xl p-4 transition-all duration-300 flex flex-col justify-between group"
                        >
                          <div>
                            <div className="aspect-[16/11] rounded-lg overflow-hidden bg-[#1A1814] mb-4">
                              <img
                                src={blind.image}
                                alt={blind.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                            </div>
                            <span className="text-[9px] uppercase font-bold tracking-[0.2em] text-[#C9A55A] block mb-1 font-sans">
                              Window Blinds
                            </span>
                            <h4 className="font-serif text-white text-lg font-bold mb-2 group-hover:text-[#C9A55A] transition-colors">
                              {blind.name}
                            </h4>
                            <p className="text-xs text-white/60 font-sans font-light leading-relaxed mb-4">
                              {blind.desc}
                            </p>
                          </div>

                          <div className="flex gap-2 pt-3 border-t border-white/10">
                            <button
                              onClick={() => {
                                closeModal();
                                navigate('/contact');
                              }}
                              className="flex-1 inline-flex items-center justify-center gap-1.5 text-[9px] font-bold tracking-wider uppercase font-sans text-[#C9A55A] border border-[#C9A55A]/40 py-2.5 px-3 rounded-lg hover:bg-[#C9A55A] hover:text-[#0A0908] transition-all"
                            >
                              <FileText size={12} />
                              <span>Quote</span>
                            </button>
                            <button
                              onClick={() => {
                                closeModal();
                                navigate('/room-viewer', { state: { preselect: blind.id } });
                              }}
                              className="flex-1 inline-flex items-center justify-center gap-1.5 text-[9px] font-bold tracking-wider uppercase font-sans bg-white/10 text-white py-2.5 px-3 rounded-lg hover:bg-white hover:text-[#0A0908] transition-all"
                            >
                              <Box size={12} />
                              <span>3D Studio</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 2. FLOORING COLLECTION MODAL (PDF Page 1: Hardwood, laminate, vinyl, carpet tile) */}
                {activeModal === 'flooring' && (
                  <div>
                    <p className="text-white/70 font-sans font-light text-sm md:text-base mb-8 max-w-2xl">
                      Explore our complete range of Canadian-rated flooring options — Hardwood, Laminate, Vinyl Plank, and Carpet Tile.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {flooringDetails.map((floor) => (
                        <div
                          key={floor.id}
                          className="bg-white/[0.03] border border-white/10 hover:border-[#C9A55A]/50 rounded-xl p-5 transition-all duration-300 flex flex-col justify-between group"
                        >
                          <div>
                            <div className="aspect-[16/10] rounded-lg overflow-hidden bg-[#1A1814] mb-4">
                              <img
                                src={floor.image}
                                alt={floor.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                            </div>
                            <span className="text-[9px] uppercase font-bold tracking-[0.2em] text-[#C9A55A] block mb-1 font-sans">
                              Flooring Type
                            </span>
                            <h4 className="font-serif text-white text-xl font-bold mb-2 group-hover:text-[#C9A55A] transition-colors">
                              {floor.name}
                            </h4>
                            <p className="text-xs text-white/70 font-sans font-light leading-relaxed mb-4">
                              {floor.desc}
                            </p>
                          </div>

                          <div className="flex gap-3 pt-3 border-t border-white/10">
                            <button
                              onClick={() => {
                                closeModal();
                                navigate('/contact');
                              }}
                              className="flex-1 inline-flex items-center justify-center gap-1.5 text-[10px] font-bold tracking-wider uppercase font-sans text-[#C9A55A] border border-[#C9A55A]/40 py-2.5 px-3 rounded-lg hover:bg-[#C9A55A] hover:text-[#0A0908] transition-all"
                            >
                              <FileText size={12} />
                              <span>Request Quote</span>
                            </button>
                            <button
                              onClick={() => {
                                closeModal();
                                navigate('/room-viewer');
                              }}
                              className="flex-1 inline-flex items-center justify-center gap-1.5 text-[10px] font-bold tracking-wider uppercase font-sans bg-white/10 text-white py-2.5 px-3 rounded-lg hover:bg-white hover:text-[#0A0908] transition-all"
                            >
                              <Box size={12} />
                              <span>3D Studio</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 3. WINDOW COVERINGS MODAL */}
                {activeModal === 'window-coverings' && (
                  <div>
                    <p className="text-white/70 font-sans font-light text-sm md:text-base mb-8 max-w-2xl">
                      Architectural drapery and custom window covering solutions tailored for light control and thermal comfort.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                      {coveringsDetails.map((item) => (
                        <div
                          key={item.id}
                          className="bg-white/[0.03] border border-white/10 hover:border-[#C9A55A]/50 rounded-xl p-5 transition-all duration-300 flex flex-col justify-between group"
                        >
                          <div>
                            <div className="aspect-[16/10] rounded-lg overflow-hidden bg-[#1A1814] mb-4">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                            </div>
                            <span className="text-[9px] uppercase font-bold tracking-[0.2em] text-[#C9A55A] block mb-1 font-sans">
                              Window Covering
                            </span>
                            <h4 className="font-serif text-white text-lg font-bold mb-2 group-hover:text-[#C9A55A] transition-colors">
                              {item.name}
                            </h4>
                            <p className="text-xs text-white/70 font-sans font-light leading-relaxed mb-4">
                              {item.desc}
                            </p>
                          </div>

                          <div className="pt-3 border-t border-white/10">
                            <button
                              onClick={() => {
                                closeModal();
                                navigate('/contact');
                              }}
                              className="w-full inline-flex items-center justify-center gap-1.5 text-[10px] font-bold tracking-wider uppercase font-sans text-[#C9A55A] border border-[#C9A55A]/40 py-2.5 px-3 rounded-lg hover:bg-[#C9A55A] hover:text-[#0A0908] transition-all"
                            >
                              <FileText size={12} />
                              <span>Request Quote</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="bg-[#121210] border-t border-white/10 px-6 sm:px-8 py-4 flex items-center justify-between shrink-0">
                <span className="text-[10px] uppercase font-mono tracking-widest text-white/50">
                  Brighton Decor Guarantee · 1-Year Workmanship Warranty
                </span>
                <button
                  onClick={closeModal}
                  className="px-5 py-2 rounded-full bg-white/10 text-white hover:bg-white hover:text-[#0A0908] text-xs font-bold uppercase tracking-widest font-sans transition-all"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ServicesTeaser;

