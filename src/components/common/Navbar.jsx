// src/components/common/Navbar.jsx
// Brighton Decor Canada — Dynamic Route-Aware Architectural Navigation with Official Logo
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone } from 'lucide-react';
import { company } from '../../config/company';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Portfolio', path: '/portfolio' },
  { name: 'Products', path: '/products' },
  { name: '3D Room Studio', path: '/room-viewer' },
  { name: 'Design Ideas', path: '/blog' },
  { name: 'Contact', path: '/contact' },
];

// Returns page-specific navbar color theme settings based on active path
const getNavbarTheme = (pathname, scrolled) => {
  switch (pathname) {
    case '/products':
      return {
        isLight: true,
        bgScrolled: 'bg-[#FAF8F5]/92 backdrop-blur-xl border-b border-[#2B1F17]/15 shadow-md',
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
        bgScrolled: 'bg-[#FBF9F4]/92 backdrop-blur-xl border-b border-[#261C14]/15 shadow-md',
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
        bgScrolled: 'bg-[#0A120E]/92 backdrop-blur-xl border-b border-[#52B788]/20 shadow-2xl',
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
        bgScrolled: 'bg-[#1F1A14]/92 backdrop-blur-xl border-b border-[#D97736]/20 shadow-2xl',
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
        bgScrolled: 'bg-[#0B0E14]/92 backdrop-blur-xl border-b border-[#C9A55A]/20 shadow-2xl',
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
      // Home & Portfolio — Dark Obsidian & Champagne Gold
      return {
        isLight: false,
        bgScrolled: 'bg-[#0A0908]/92 backdrop-blur-xl border-b border-white/10 shadow-2xl',
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
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const theme = getNavbarTheme(location.pathname, scrolled);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    document.body.classList.remove('menu-open');
  }, [location]);

  const toggleMenu = () => {
    setIsOpen((prev) => {
      if (!prev) document.body.classList.add('menu-open');
      else document.body.classList.remove('menu-open');
      return !prev;
    });
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
            className={`fixed inset-0 z-[150] flex flex-col lg:hidden ${theme.mobileBg}`}
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
            <div className="flex-1 flex flex-col justify-center px-8 space-y-1">
              {navLinks.map((link, idx) => {
                const isActive = location.pathname === link.path;
                return (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + idx * 0.03 }}
                  >
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
                  </motion.div>
                );
              })}
            </div>

            {/* Mobile Footer */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="px-8 pb-10 space-y-4"
            >
              <Link
                to="/contact"
                onClick={() => {
                  setIsOpen(false);
                  document.body.classList.remove('menu-open');
                }}
              >
                <button className={`w-full py-4 rounded-full font-sans text-xs uppercase tracking-[0.2em] font-bold transition-all shadow-xl ${theme.ctaBtn}`}>
                  Book Free Site Measurement
                </button>
              </Link>
              <a
                href={`tel:${company.phoneRaw}`}
                className="flex items-center justify-center gap-2 text-current/60 text-sm font-sans"
              >
                <Phone size={15} className={theme.phoneIcon} />
                {company.phone}
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
