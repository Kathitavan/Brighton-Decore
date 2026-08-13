import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import logoMain from '../../assets/images/logo/logo-main.png';

const cn = (...args) => twMerge(clsx(args));

const navLinks = [
  { name: 'Home',         path: '/' },
  { name: 'Our Products', path: '/products' },
  { name: 'Portfolio',    path: '/portfolio' },
  { name: 'Services',     path: '/services' },
  { name: 'About',        path: '/about' },
  { name: 'Contact',      path: '/contact' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    document.body.classList.remove('menu-open');
  }, [location]);

  const toggleMenu = () => {
    setIsOpen(v => {
      document.body.classList.toggle('menu-open', !v);
      return !v;
    });
  };

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 left-0 w-full z-[100] transition-all duration-500 px-6 md:px-12',
          scrolled
            ? 'py-3 border-b'
            : 'py-5 bg-transparent'
        )}
        style={scrolled ? {
          background: 'rgba(10,22,40,0.92)',
          backdropFilter: 'blur(20px)',
          borderColor: 'rgba(196,162,101,0.2)',
        } : {
          background: 'rgba(10,22,40,0.15)',
        }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="group flex-shrink-0">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-3"
            >
              <img
                src={logoMain}
                alt="Brighton Decor logo — window blinds Saskatoon"
                width={44}
                height={44}
                loading="eager"
                className="object-contain"
              />
              <div className="flex flex-col -space-y-0.5">
                <span className="text-lg font-serif font-bold tracking-tight text-white group-hover:text-gold transition-colors leading-none">
                  BRIGHTON
                </span>
                <span className="text-[8px] tracking-[0.35em] uppercase text-gold font-sans">
                  DECOR
                </span>
              </div>
            </motion.div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  'text-[11px] uppercase tracking-widest font-sans font-medium transition-colors relative group',
                  location.pathname === link.path
                    ? 'text-gold'
                    : 'text-ivory-2 hover:text-gold'
                )}
              >
                {link.name}
                <span className={cn(
                  'absolute -bottom-1 left-0 h-[1px] bg-gold transition-all duration-300',
                  location.pathname === link.path ? 'w-full' : 'w-0 group-hover:w-full'
                )} />
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Link to="/contact">
              <button
                className="btn-gold px-6 py-2.5 font-sans text-[11px] uppercase tracking-widest font-bold rounded-none"
              >
                Book Free Measurement
              </button>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden text-ivory p-2"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[150] flex flex-col items-center justify-center space-y-6 lg:hidden"
            style={{ background: '#0A1628' }}
          >
            {/* Close */}
            <button
              className="absolute top-6 right-6 text-ivory p-2"
              onClick={toggleMenu}
              aria-label="Close menu"
            >
              <X size={32} />
            </button>

            {/* Logo in mobile */}
            <div className="absolute top-6 left-6 flex items-center gap-3">
              <img src={logoMain} alt="Brighton Decor" width={36} height={36} className="object-contain" />
              <span className="text-white font-serif font-bold text-base tracking-tight">BRIGHTON DECOR</span>
            </div>

            {navLinks.map((link, idx) => (
              <motion.div
                key={link.path}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 + idx * 0.06 }}
              >
                <Link
                  to={link.path}
                  className={cn(
                    'text-3xl font-serif tracking-wide block',
                    location.pathname === link.path ? 'text-gold italic' : 'text-ivory'
                  )}
                  onClick={toggleMenu}
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="pt-6"
            >
              <Link to="/contact" onClick={toggleMenu}>
                <button className="btn-gold px-10 py-4 font-sans text-sm uppercase tracking-widest font-bold rounded-none">
                  Book Free Measurement
                </button>
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
