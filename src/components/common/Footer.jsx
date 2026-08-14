// src/components/common/Footer.jsx
// Brighton Decor Canada — Dynamic Route-Aware Architectural Footer with Official Logo
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, Instagram, Facebook } from 'lucide-react';
import { company } from '../../config/company';

const getFooterTheme = (pathname) => {
  switch (pathname) {
    case '/products':
      return {
        bgMain: 'bg-[#2B1F17]',
        bgTop: 'bg-[#221812]',
        bgBottom: 'bg-[#1C140E]',
        border: 'border-[#B89656]/20',
        textHeading: 'text-[#FAF6EF]',
        textMuted: 'text-[#FAF6EF]/65',
        accentText: 'text-[#B89656]',
        ctaBtn: 'bg-[#B89656] text-[#2B1F17] hover:bg-white',
        borderBtn: 'border-[#B89656]/30 text-[#FAF6EF] hover:border-white',
      };
    case '/blog':
      return {
        bgMain: 'bg-[#261C14]',
        bgTop: 'bg-[#1E1610]',
        bgBottom: 'bg-[#17110C]',
        border: 'border-[#D96B43]/20',
        textHeading: 'text-[#FFFDF7]',
        textMuted: 'text-[#FFFDF7]/65',
        accentText: 'text-[#D96B43]',
        ctaBtn: 'bg-[#D96B43] text-[#FFFDF7] hover:bg-white hover:text-[#261C14]',
        borderBtn: 'border-[#D96B43]/30 text-[#FFFDF7] hover:border-white',
      };
    case '/contact':
      return {
        bgMain: 'bg-[#0A120E]',
        bgTop: 'bg-[#070E0A]',
        bgBottom: 'bg-[#050907]',
        border: 'border-[#52B788]/20',
        textHeading: 'text-[#E8F5E9]',
        textMuted: 'text-[#E8F5E9]/65',
        accentText: 'text-[#52B788]',
        ctaBtn: 'bg-[#52B788] text-[#0A120E] hover:bg-white',
        borderBtn: 'border-[#52B788]/30 text-[#E8F5E9] hover:border-white',
      };
    case '/about':
      return {
        bgMain: 'bg-[#1F1A14]',
        bgTop: 'bg-[#18140F]',
        bgBottom: 'bg-[#120F0B]',
        border: 'border-[#D97736]/20',
        textHeading: 'text-[#F5EBE1]',
        textMuted: 'text-[#F5EBE1]/65',
        accentText: 'text-[#D97736]',
        ctaBtn: 'bg-[#D97736] text-[#1F1A14] hover:bg-white',
        borderBtn: 'border-[#D97736]/30 text-[#F5EBE1] hover:border-white',
      };
    case '/services':
      return {
        bgMain: 'bg-[#0B0E14]',
        bgTop: 'bg-[#080A0E]',
        bgBottom: 'bg-[#05070A]',
        border: 'border-[#C9A55A]/20',
        textHeading: 'text-[#F2EFE9]',
        textMuted: 'text-[#F2EFE9]/65',
        accentText: 'text-[#C9A55A]',
        ctaBtn: 'bg-[#C9A55A] text-[#0B0E14] hover:bg-white',
        borderBtn: 'border-[#C9A55A]/30 text-[#F2EFE9] hover:border-white',
      };
    default:
      // Home & Portfolio
      return {
        bgMain: 'bg-[#050504]',
        bgTop: 'bg-[#0A0908]',
        bgBottom: 'bg-[#0A0908]',
        border: 'border-white/10',
        textHeading: 'text-[#F5F2EA]',
        textMuted: 'text-white/60',
        accentText: 'text-[#C9A55A]',
        ctaBtn: 'bg-[#C9A55A] text-[#0A0908] hover:bg-white',
        borderBtn: 'border-white/20 text-white/80 hover:border-[#C9A55A] hover:text-[#C9A55A]',
      };
  }
};

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const location = useLocation();
  const theme = getFooterTheme(location.pathname);

  return (
    <footer className={`${theme.bgMain} text-white border-t ${theme.border}`} aria-label="Site footer">
      {/* Top CTA Banner */}
      <div className={`border-b ${theme.border} ${theme.bgTop}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className={`font-serif text-2xl md:text-3xl font-light ${theme.textHeading}`}>
              Ready to transform your space?
            </p>
            <p className={`text-xs md:text-sm font-sans font-light mt-1 ${theme.textMuted}`}>
              Book a free site measurement — no obligation, guaranteed precision.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4 flex-shrink-0">
            <Link to="/contact">
              <button className={`px-7 py-3 rounded-full text-xs uppercase tracking-[0.18em] font-bold font-sans transition-all duration-300 shadow-xl ${theme.ctaBtn}`}>
                Book Free Measurement
              </button>
            </Link>
            <a
              href={`tel:${company.phoneRaw}`}
              className={`border px-7 py-3 rounded-full text-xs uppercase tracking-[0.18em] font-bold font-sans transition-all duration-300 ${theme.borderBtn}`}
            >
              Call Us
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Grid */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand & Logo */}
          <div className="space-y-5 lg:col-span-1">
            <Link to="/">
              <img
                src={company.logo}
                alt={company.name}
                className="h-10 md:h-12 w-auto object-contain mb-3"
              />
            </Link>
            <p className={`font-sans text-xs leading-relaxed max-w-xs font-light ${theme.textMuted}`}>
              {company.description}
            </p>
            {/* Social Links */}
            <div className="flex gap-3 pt-2">
              {company.social.instagram && (
                <a
                  href={company.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Brighton Decor on Instagram"
                  className={`w-9 h-9 border border-white/15 flex items-center justify-center rounded-full transition-all duration-300 ${theme.textMuted} hover:${theme.accentText}`}
                >
                  <Instagram size={15} />
                </a>
              )}
              {company.social.facebook && (
                <a
                  href={company.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Brighton Decor on Facebook"
                  className={`w-9 h-9 border border-white/15 flex items-center justify-center rounded-full transition-all duration-300 ${theme.textMuted} hover:${theme.accentText}`}
                >
                  <Facebook size={15} />
                </a>
              )}
            </div>
          </div>

          {/* Explore Links */}
          <div className="space-y-5">
            <h3 className={`font-serif text-lg font-medium ${theme.textHeading}`}>Explore</h3>
            <ul className="space-y-2.5 font-sans">
              {[
                { label: 'Home', path: '/' },
                { label: 'About Us', path: '/about' },
                { label: 'Services', path: '/services' },
                { label: 'Portfolio', path: '/portfolio' },
                { label: 'Products', path: '/products' },
                { label: '3D Room Studio', path: '/room-viewer' },
                { label: 'Design Ideas', path: '/blog' },
                { label: 'Contact', path: '/contact' },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className={`text-xs transition-colors duration-300 font-light ${theme.textMuted} hover:${theme.accentText}`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-5">
            <h3 className={`font-serif text-lg font-medium ${theme.textHeading}`}>Our Services</h3>
            <ul className="space-y-2.5 font-sans">
              {[
                'Window Blinds',
                'Window Coverings',
                'Flooring Supply',
                'Flooring Installation',
                'Free Site Measurement',
                'Design Consultation',
              ].map((service) => (
                <li key={service}>
                  <Link
                    to="/services"
                    className={`text-xs transition-colors duration-300 font-light ${theme.textMuted} hover:${theme.accentText}`}
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-5 font-sans">
            <h3 className={`font-serif text-lg font-medium ${theme.textHeading}`}>Contact</h3>
            <ul className="space-y-4 text-xs">
              <li className="flex items-start gap-3">
                <MapPin size={15} className={`${theme.accentText} mt-0.5 flex-shrink-0`} />
                <address className={`not-italic leading-relaxed font-light ${theme.textMuted}`}>
                  {company.address.street}<br />
                  {company.address.city}, {company.address.province}<br />
                  {company.address.country}
                </address>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={15} className={`${theme.accentText} flex-shrink-0`} />
                <a
                  href={`tel:${company.phoneRaw}`}
                  className={`transition-colors font-light ${theme.textMuted} hover:${theme.accentText}`}
                >
                  {company.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={15} className={`${theme.accentText} flex-shrink-0`} />
                <a
                  href={`mailto:${company.email}`}
                  className={`transition-colors font-light ${theme.textMuted} hover:${theme.accentText}`}
                >
                  {company.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock size={15} className={`${theme.accentText} mt-0.5 flex-shrink-0`} />
                <div className={`font-light ${theme.textMuted}`}>
                  <p>{company.hours.weekdays}</p>
                  <p>{company.hours.time}</p>
                </div>
              </li>
            </ul>
            <div>
              <p className={`text-[10px] uppercase tracking-[0.2em] font-bold font-sans mb-1 ${theme.accentText}`}>
                Service Area
              </p>
              <p className={`text-xs font-light ${theme.textMuted}`}>{company.serviceArea}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className={`border-t ${theme.border} ${theme.bgBottom}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-6 flex flex-col md:flex-row items-center justify-between gap-3 font-sans">
          <p className={`text-xs font-light ${theme.textMuted}`}>
            &copy; {currentYear} Brighton Decor Ltd. All rights reserved. Based in Saskatoon, Saskatchewan, Canada.
          </p>
          <a
            href="https://maps.app.goo.gl/5iuFnetoc1zvR1oF7"
            target="_blank"
            rel="noopener noreferrer"
            className={`text-xs transition-colors font-light ${theme.textMuted} hover:${theme.accentText}`}
          >
            View on Google Maps
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
