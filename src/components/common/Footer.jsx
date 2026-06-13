import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Send } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-bg-secondary pt-20 pb-10 px-6 md:px-12 border-t border-gold/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Info */}
          <div className="space-y-6">
            <div>
              <span className="text-3xl font-serif font-bold tracking-tight text-white block">
                BRIGHTON
              </span>
              <span className="text-sm tracking-[0.3em] uppercase text-gold font-sans block -mt-1">
                Decore
              </span>
            </div>
            <p className="text-ivory-muted text-sm leading-relaxed max-w-xs">
              India's one-stop shop for creatively useful home design needs. Enhancing experiences through innovation and quality.
            </p>
            <div className="flex space-x-4">
              {[Instagram, Facebook, Linkedin, Twitter].map((Icon, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="w-10 h-10 border border-gold/20 flex items-center justify-center rounded-full text-gold hover:bg-gold hover:text-bg-primary transition-all duration-300"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-white font-serif text-xl">Quick Links</h4>
            <ul className="space-y-3">
              {['Home', 'About', 'Portfolio', 'Services', 'Blog', 'Contact'].map((link) => (
                <li key={link}>
                  <Link
                    to={link === 'Home' ? '/' : `/${link.toLowerCase()}`}
                    className="text-ivory-muted hover:text-gold text-sm transition-colors duration-300"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-6">
            <h4 className="text-white font-serif text-xl">Our Services</h4>
            <ul className="space-y-3">
              {[
                'Interior Design',
                'Space Planning',
                '3D Visualization',
                'Modular Kitchen',
                'Luxury Bathrooms',
                'Commercial Design',
              ].map((service) => (
                <li key={service} className="text-ivory-muted text-sm hover:text-gold cursor-pointer transition-colors">
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-6">
            <h4 className="text-white font-serif text-xl">Newsletter</h4>
            <p className="text-ivory-muted text-sm">
              Subscribe for design inspiration and updates.
            </p>
            <div className="relative">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full bg-bg-tertiary border border-gold/20 px-4 py-3 text-sm text-ivory outline-none focus:border-gold transition-colors"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gold hover:text-white transition-colors">
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-gold/10 flex flex-col items-center justify-center gap-4">
          <p className="text-ivory-muted text-[10px] uppercase tracking-widest font-bold">
            &copy; {new Date().getFullYear()} Brighton Decore. All rights reserved.
          </p>
          <p className="text-[12px] font-sans text-gold/70 tracking-wider">
            Designed & Developed by{' '}
            <a 
              href="https://kathiravan.org" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gold border-b border-gold/30 hover:text-ivory hover:border-ivory transition-all no-underline"
            >
              Kathiravan
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
