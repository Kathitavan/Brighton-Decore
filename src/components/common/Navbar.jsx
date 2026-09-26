// src/components/common/Navbar.jsx
// Brighton Decor Canada — Dynamic Route-Aware Architectural Navigation
// Includes interactive "Window Blinds Collection" Mega-Menu with photorealistic imagery and 3D Studio integration.

import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, ChevronDown, Sparkles, Box, ArrowRight, Check } from 'lucide-react';
import { company } from '../../config/company';
import { BLIND_PRODUCTS } from '../../data/roomProducts';
import useModalScroll from '../../hooks/useModalScroll';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Portfolio', path: '/portfolio' },
  { name: 'Products', path: '/products', hasMegaMenu: true },
  { name: '3D Room Studio', path: '/room-viewer' },
  { name: 'Design Ideas', path: '/blog' },
  { name: 'Contact', path: '/contact' },
];

const getNavbarTheme = (pathname, scrolled) => {
  switch (pathname) {
    case '/products':
      return {
        isLight: true,
        bgScrolled: 'bg-[#FAF8F5]/94 backdrop-blur-xl border-b border-[#2B1F17]/15 shadow-md',
        bgTop: 'bg-transparent',
        textLink: 'text-[#2B1F17]/80 hover:text-[#B89656]',
        textLinkActive: 'text-[#B89656]',
        lineActive: 'bg-[#B89656]',
        phoneText: 'text-[#2B1F17]/70 hover:text-[#B89656]',
        phoneIcon: 'text-[#B89656]',
        ctaBtn: 'bg-[#2B1F17] hover:bg-[#B89656] text-[#F5F0E6] hover:text-[#2B1F17]',
        mobileBg: 'bg-[#FAF8F5] text-[#2B1F17]',
      };
    case '/blog':
      return {
        isLight: true,
        bgScrolled: 'bg-[#FBF9F4]/94 backdrop-blur-xl border-b border-[#261C14]/15 shadow-md',
        bgTop: 'bg-transparent',
        textLink: 'text-[#261C14]/80 hover:text-[#D96B43]',
        textLinkActive: 'text-[#D96B43]',
        lineActive: 'bg-[#D96B43]',
        phoneText: 'text-[#261C14]/70 hover:text-[#D96B43]',
        phoneIcon: 'text-[#D96B43]',
        ctaBtn: 'bg-[#D96B43] hover:bg-[#261C14] text-[#FBF9F4]',
        mobileBg: 'bg-[#FBF9F4] text-[#261C14]',
      };
    case '/contact':
      return {
        isLight: false,
        bgScrolled: 'bg-[#0A120E]/94 backdrop-blur-xl border-b border-[#52B788]/20 shadow-2xl',
        bgTop: 'bg-transparent',
        textLink: 'text-[#E8F5E9]/80 hover:text-[#52B788]',
        textLinkActive: 'text-[#52B788]',
        lineActive: 'bg-[#52B788]',
        phoneText: 'text-[#E8F5E9]/70 hover:text-[#52B788]',
        phoneIcon: 'text-[#52B788]',
        ctaBtn: 'bg-[#52B788] hover:bg-white text-[#0A120E]',
        mobileBg: 'bg-[#0A120E] text-[#E8F5E9]',
      };
    case '/about':
      return {
        isLight: false,
        bgScrolled: 'bg-[#1F1A14]/94 backdrop-blur-xl border-b border-[#D97736]/20 shadow-2xl',
        bgTop: 'bg-transparent',
        textLink: 'text-[#F5EBE1]/80 hover:text-[#D97736]',
        textLinkActive: 'text-[#D97736]',
        lineActive: 'bg-[#D97736]',
        phoneText: 'text-[#F5EBE1]/70 hover:text-[#D97736]',
        phoneIcon: 'text-[#D97736]',
        ctaBtn: 'bg-[#D97736] hover:bg-white text-[#1F1A14]',
        mobileBg: 'bg-[#1F1A14] text-[#F5EBE1]',
      };
    case '/services':
      return {
        isLight: false,
        bgScrolled: 'bg-[#0B0E14]/94 backdrop-blur-xl border-b border-[#C9A55A]/20 shadow-2xl',
        bgTop: 'bg-transparent',
        textLink: 'text-[#F2EFE9]/80 hover:text-[#C9A55A]',
        textLinkActive: 'text-[#C9A55A]',
        lineActive: 'bg-[#C9A55A]',
        phoneText: 'text-[#F2EFE9]/70 hover:text-[#C9A55A]',
        phoneIcon: 'text-[#C9A55A]',
        ctaBtn: 'bg-[#C9A55A] hover:bg-white text-[#0B0E14]',
        mobileBg: 'bg-[#0B0E14] text-[#F2EFE9]',
      };
    default:
      return {
        isLight: false,
        bgScrolled: 'bg-[#0A0908]/94 backdrop-blur-xl border-b border-white/10 shadow-2xl',
        bgTop: 'bg-transparent',
        textLink: 'text-white/80 hover:text-[#C9A55A]',
        textLinkActive: 'text-[#C9A55A]',
        lineActive: 'bg-[#C9A55A]',
        phoneText: 'text-white/70 hover:text-[#C9A55A]',
        phoneIcon: 'text-[#C9A55A]',
        ctaBtn: 'bg-[#C9A55A] hover:bg-white text-[#0A0908]',
        mobileBg: 'bg-[#0A0908] text-white',
      };
  }
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showMegaMenu, setShowMegaMenu] = useState(false);
  const [mobileBlindsOpen, setMobileBlindsOpen] = useState(false);
  const megaMenuTimeout = useRef(null);
  const navigate = useNavigate();

  useModalScroll(isOpen);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const theme = getNavbarTheme(location.pathname, scrolled);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setShowMegaMenu(false);
    document.body.classList.remove('menu-open');
  }, [location]);

  const toggleMenu = () => {
    setIsOpen((prev) => {
      if (!prev) document.body.classList.add('menu-open');
      else document.body.classList.remove('menu-open');
      return !prev;
    });
  };

  const handleMouseEnterProducts = () => {
    if (megaMenuTimeout.current) clearTimeout(megaMenuTimeout.current);
    setShowMegaMenu(true);
  };

  const handleMouseLeaveProducts = () => {
    megaMenuTimeout.current = setTimeout(() => {
      setShowMegaMenu(false);
    }, 200);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 px-6 md:px-12 ${
          scrolled ? theme.bgScrolled + ' py-3' : theme.bgTop + ' py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Official Brand Logo */}
          <Link to="/" className="group flex-shrink-0">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-3"
            >
              <img
                src={company.logo}
                alt={company.name}
                className="h-10 md:h-12 w-auto object-contain filter drop-shadow-md group-hover:scale-105 transition-transform duration-300"
              />
            </motion.div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-5 xl:gap-7">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              if (link.hasMegaMenu) {
                return (
                  <div
                    key={link.path}
                    className="relative"
                    onMouseEnter={handleMouseEnterProducts}
                    onMouseLeave={handleMouseLeaveProducts}
                  >
                    <Link
                      to={link.path}
                      className={`text-[11px] uppercase tracking-[0.18em] font-sans font-semibold transition-colors duration-300 relative group py-1 inline-flex items-center gap-1 ${
                        isActive || showMegaMenu ? theme.textLinkActive : theme.textLink
                      }`}
                    >
                      <span>{link.name}</span>
                      <ChevronDown
                        size={12}
                        className={`transition-transform duration-300 ${showMegaMenu ? 'rotate-180' : ''}`}
                      />
                      <span
                        className={`absolute -bottom-0.5 left-0 h-[1.5px] transition-all duration-300 ${theme.lineActive} ${
                          isActive || showMegaMenu ? 'w-full' : 'w-0 group-hover:w-full'
                        }`}
                      />
                    </Link>

                    {/* WINDOW BLINDS COLLECTION MEGA-MENU FLYOUT */}
                    <AnimatePresence>
                      {showMegaMenu && (
                        <motion.div
                          initial={{ opacity: 0, y: 12, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.98 }}
                          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                          className="absolute top-full -left-48 w-[720px] pt-3 z-50 max-h-[82vh] overflow-y-auto pointer-events-auto overscroll-contain scrollbar-thin scrollbar-thumb-[#C9A55A]/30 hover:scrollbar-thumb-[#C9A55A] scrollbar-track-transparent"
                          data-lenis-prevent
                        >
                          <div className="bg-[#12100E]/98 backdrop-blur-2xl border border-[#C9A55A]/30 rounded-2xl p-6 shadow-[0_25px_60px_rgba(0,0,0,0.85)] text-white">
                            {/* Header */}
                            <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/10">
                              <div className="flex items-center gap-2.5">
                                <Sparkles size={16} className="text-[#C9A55A]" />
                                <div>
                                  <h4 className="font-serif text-base text-white font-medium tracking-wide">
                                    Window Blinds Collection
                                  </h4>
                                  <p className="text-[10px] text-white/50 font-sans tracking-wider uppercase">
                                    6 Bespoke Architectural Styles · Canadian Craftsmanship
                                  </p>
                                </div>
                              </div>
                              <Link
                                to="/products"
                                onClick={() => setShowMegaMenu(false)}
                                className="text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-[#C9A55A] hover:text-white transition-colors inline-flex items-center gap-1"
                              >
                                <span>All Products</span>
                                <ArrowRight size={11} />
                              </Link>
                            </div>

                            {/* 6 Photorealistic Product Cards */}
                            <div className="grid grid-cols-3 gap-3.5">
                              {BLIND_PRODUCTS.map((blind) => (
                                <div
                                  key={blind.id}
                                  className="group/card rounded-xl p-2.5 bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 hover:border-[#C9A55A]/50 transition-all duration-300 flex flex-col justify-between"
                                >
                                  <div>
                                    <div className="aspect-[16/10] rounded-lg overflow-hidden bg-[#1A1816] mb-2 relative">
                                      <img
                                        src={blind.image}
                                        alt={blind.name}
                                        className="w-full h-full object-cover group-hover/card:scale-108 transition-transform duration-500"
                                      />
                                      <span className="absolute top-1.5 left-1.5 bg-black/60 backdrop-blur-md text-[8px] font-sans font-semibold text-[#C9A55A] px-2 py-0.5 rounded-full border border-[#C9A55A]/30">
                                        {blind.materialBadge || 'Custom Fabric'}
                                      </span>
                                    </div>
                                    <h5 className="font-serif text-sm text-white font-medium group-hover/card:text-[#C9A55A] transition-colors mb-1 leading-snug">
                                      {blind.name}
                                    </h5>
                                    <p className="text-[10px] text-white/60 font-sans font-light line-clamp-2 leading-relaxed mb-2.5">
                                      {blind.shortDesc}
                                    </p>
                                  </div>

                                  {/* Quick Action to 3D Room Studio */}
                                  <button
                                    onClick={() => {
                                      setShowMegaMenu(false);
                                      navigate('/room-viewer', { state: { preselect: blind.id } });
                                    }}
                                    className="w-full py-1.5 rounded-md bg-white/10 hover:bg-[#C9A55A] hover:text-[#0A0908] text-[9px] uppercase tracking-wider font-bold text-white transition-all flex items-center justify-center gap-1.5"
                                  >
                                    <Box size={10} />
                                    <span>Test in 3D</span>
                                  </button>
                                </div>
                              ))}
                            </div>

                            {/* Bottom Consultation Ribbon */}
                            <div className="mt-5 pt-3.5 border-t border-white/10 flex items-center justify-between text-[11px] text-white/70">
                              <span className="font-sans font-light">
                                Serving Saskatoon & Area · Laser Precision Guaranteed
                              </span>
                              <Link
                                to="/contact"
                                onClick={() => setShowMegaMenu(false)}
                                className="text-[#C9A55A] hover:text-white font-bold uppercase tracking-wider flex items-center gap-1"
                              >
                                <span>Book In-Home Consultation</span>
                                <ArrowRight size={11} />
                              </Link>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-[11px] uppercase tracking-[0.18em] font-sans font-semibold transition-colors duration-300 relative group py-1 ${
                    isActive ? theme.textLinkActive : theme.textLink
                  }`}
                >
                  {link.name}
                  <span
                    className={`absolute -bottom-0.5 left-0 h-[1.5px] transition-all duration-300 ${theme.lineActive} ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </Link>
              );
            })}
          </div>

          {/* Desktop CTA Action */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href={`tel:${company.phoneRaw}`}
              className={`text-[11px] transition-colors font-sans tracking-wide flex items-center gap-1.5 ${theme.phoneText}`}
              aria-label={`Call us: ${company.phone}`}
            >
              <Phone size={13} className={theme.phoneIcon} />
              {company.phone}
            </a>
            <Link to="/contact">
              <button
                id="nav-cta-measurement"
                className={`px-5 py-2.5 rounded-full font-sans text-[11px] uppercase tracking-[0.18em] font-bold transition-all duration-300 shadow-md ${theme.ctaBtn}`}
              >
                Free Measurement
              </button>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className={`lg:hidden p-2 transition-colors ${theme.isLight ? 'text-[#2B1F17]' : 'text-white'}`}
            onClick={toggleMenu}
            aria-label="Toggle mobile menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </nav>

      {/* Mobile Fullscreen Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className={`fixed inset-0 z-[150] flex flex-col lg:hidden overflow-y-auto modal-scroll-area touch-pan-y ${theme.mobileBg}`}
            role="dialog"
            aria-modal="true"
            data-lenis-prevent
          >
            {/* Mobile Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-current/10">
              <Link to="/" onClick={() => setIsOpen(false)}>
                <img
                  src={company.logo}
                  alt={company.name}
                  className="h-10 w-auto object-contain"
                />
              </Link>
              <button
                className="p-2"
                onClick={toggleMenu}
                aria-label="Close mobile menu"
              >
                <X size={26} />
              </button>
            </div>

            {/* Mobile Nav Links */}
            <div className="flex-1 flex flex-col justify-start px-8 pt-6 space-y-2">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;

                if (link.hasMegaMenu) {
                  return (
                    <div key={link.path} className="border-b border-current/10 pb-3">
                      <div className="flex items-center justify-between py-2">
                        <Link
                          to={link.path}
                          className={`text-2xl font-serif ${isActive ? theme.textLinkActive : theme.textLink}`}
                          onClick={() => {
                            setIsOpen(false);
                            document.body.classList.remove('menu-open');
                          }}
                        >
                          {link.name}
                        </Link>
                        <button
                          onClick={() => setMobileBlindsOpen((prev) => !prev)}
                          className="p-2 text-current/60"
                        >
                          <ChevronDown
                            size={20}
                            className={`transition-transform duration-300 ${mobileBlindsOpen ? 'rotate-180' : ''}`}
                          />
                        </button>
                      </div>

                      {/* Mobile Window Blinds Sub-Items */}
                      <AnimatePresence>
                        {mobileBlindsOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="grid grid-cols-2 gap-2.5 pt-2 pb-2 overflow-hidden"
                          >
                            {BLIND_PRODUCTS.map((b) => (
                              <button
                                key={b.id}
                                onClick={() => {
                                  setIsOpen(false);
                                  document.body.classList.remove('menu-open');
                                  navigate('/room-viewer', { state: { preselect: b.id } });
                                }}
                                className="flex items-center gap-2 p-2 rounded-lg bg-current/5 text-left"
                              >
                                <img
                                  src={b.image}
                                  alt={b.name}
                                  className="w-10 h-8 rounded object-cover"
                                />
                                <div className="min-w-0">
                                  <div className="text-xs font-serif font-medium truncate">{b.name}</div>
                                  <div className="text-[9px] text-current/60 uppercase">3D Studio</div>
                                </div>
                              </button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                return (
                  <div key={link.path}>
                    <Link
                      to={link.path}
                      className={`block text-2xl font-serif py-2.5 transition-colors border-b border-current/10 ${
                        isActive ? theme.textLinkActive : theme.textLink
                      }`}
                      onClick={() => {
                        setIsOpen(false);
                        document.body.classList.remove('menu-open');
                      }}
                    >
                      {link.name}
                    </Link>
                  </div>
                );
              })}
            </div>

            {/* Mobile Footer */}
            <div className="px-8 pb-10 space-y-4 pt-6">
              <Link
                to="/contact"
                onClick={() => {
                  setIsOpen(false);
                  document.body.classList.remove('menu-open');
                }}
                className="block"
              >
                <button className={`w-full py-4 rounded-full font-sans text-xs uppercase tracking-[0.2em] font-bold shadow-lg ${theme.ctaBtn}`}>
                  Book Free Measurement
                </button>
              </Link>
              <div className="text-center">
                <a
                  href={`tel:${company.phoneRaw}`}
                  className="text-sm font-sans tracking-wide text-current/80 inline-flex items-center gap-2"
                >
                  <Phone size={14} className={theme.phoneIcon} />
                  <span>{company.phone}</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
