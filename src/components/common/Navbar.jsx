import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const cn = (...args) => twMerge(clsx(args));

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Portfolio', path: '/portfolio' },
  { name: 'Products', path: '/products' },
  { name: 'Services', path: '/services' },
  { name: '3D Room ✦', path: '/room-viewer' },
  { name: 'Blog', path: '/blog' },
  { name: 'Contact', path: '/contact' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 left-0 w-full z-[100] transition-all duration-500 px-6 md:px-12 py-4',
          scrolled ? 'bg-bg-primary/90 backdrop-blur-md py-3 border-b border-gold/10' : 'bg-transparent py-6'
        )}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="group">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col"
            >
              <span className="text-2xl font-serif font-bold tracking-tight text-white group-hover:text-gold transition-colors">
                BRIGHTON
              </span>
              <span className="text-[10px] tracking-[0.3em] uppercase text-gold -mt-1 font-sans">
                Decore
              </span>
            </motion.div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  'text-sm uppercase tracking-widest font-sans transition-colors relative group',
                  location.pathname === link.path ? 'text-gold' : 'text-ivory hover:text-gold'
                )}
              >
                {link.name}
                <span className={cn(
                  'absolute -bottom-1 left-0 w-0 h-[1px] bg-gold transition-all duration-300',
                  location.pathname === link.path ? 'w-full' : 'group-hover:w-full'
                )} />
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Link to="/contact">
              <button className="bg-gold text-bg-primary px-6 py-2.5 rounded-none font-sans text-xs uppercase tracking-widest font-bold hover:bg-white transition-all duration-300">
                Book Consultation
              </button>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden text-ivory p-2"
            onClick={() => setIsOpen(!isOpen)}
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
            transition={{ type: 'tween', duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 bg-bg-primary z-[150] flex flex-col items-center justify-center space-y-8 lg:hidden"
          >
            <button
              className="absolute top-6 right-6 text-ivory p-2"
              onClick={() => setIsOpen(false)}
            >
              <X size={32} />
            </button>

            {navLinks.map((link, idx) => (
              <motion.div
                key={link.path}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + idx * 0.05 }}
              >
                <Link
                  to={link.path}
                  className={cn(
                    'text-3xl font-serif tracking-wide',
                    location.pathname === link.path ? 'text-gold' : 'text-ivory'
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="pt-8"
            >
              <Link to="/contact">
                <button className="bg-gold text-bg-primary px-10 py-4 rounded-none font-sans text-sm uppercase tracking-widest font-bold">
                  Book Now
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
