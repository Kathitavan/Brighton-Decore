import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Phone, Mail, MapPin, Clock } from 'lucide-react';
import logoMain from '../../assets/images/logo/logo-main.png';

const Footer = () => {
  const year = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home',         path: '/' },
    { name: 'Our Products', path: '/products' },
    { name: 'Portfolio',    path: '/portfolio' },
    { name: 'Services',     path: '/services' },
    { name: 'About',        path: '/about' },
    { name: 'Contact',      path: '/contact' },
  ];

  const productLinks = [
    'Roller Blinds',
    'Zebra Blinds',
    'Honeycomb Blinds',
    'Vertical Blinds',
    'Wooden & Faux Wood',
    'PVC Blinds',
    'Dream Curtains',
  ];

  return (
    <footer
      className="pt-20 pb-10 px-6 md:px-12 border-t"
      style={{ background: '#0F1E38', borderColor: 'rgba(196,162,101,0.12)' }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Col 1 — Brand */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-3 group">
              <img
                src={logoMain}
                alt="Brighton Decor"
                width={48}
                height={48}
                loading="lazy"
                className="object-contain"
              />
              <div className="flex flex-col -space-y-0.5">
                <span className="text-xl font-serif font-bold tracking-tight text-white group-hover:text-gold transition-colors leading-none">
                  BRIGHTON
                </span>
                <span className="text-[8px] tracking-[0.35em] uppercase text-gold font-sans">
                  DECOR
                </span>
              </div>
            </Link>

            <p className="text-ivory-2 text-sm leading-relaxed max-w-xs">
              Saskatoon's trusted window blind and flooring specialists.
              Brightening homes across Saskatchewan since 2022.
            </p>

            {/* Social */}
            <a
              href="https://www.instagram.com/brightondecor.in"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-gold hover:text-ivory transition-colors text-sm"
              aria-label="Brighton Decor on Instagram"
            >
              <span
                className="w-9 h-9 border flex items-center justify-center rounded-full hover:bg-gold hover:text-bg-primary hover:border-gold transition-all duration-300"
                style={{ borderColor: 'rgba(196,162,101,0.3)', color: '#C4A265' }}
              >
                <Instagram size={16} />
              </span>
              <span className="text-xs tracking-wider">@brightondecor.in</span>
            </a>

            <div className="space-y-2">
              <a href="tel:+13065806476" className="flex items-center gap-2 text-ivory-2 hover:text-gold transition-colors text-sm">
                <Phone size={14} className="text-gold" />
                +1 (306) 580-6476
              </a>
              <a href="mailto:Shoieb@brightondecor.co" className="flex items-center gap-2 text-ivory-2 hover:text-gold transition-colors text-sm">
                <Mail size={14} className="text-gold" />
                Shoieb@brightondecor.co
              </a>
            </div>
          </div>

          {/* Col 2 — Quick Links */}
          <div className="space-y-6">
            <h4 className="text-white font-serif text-xl">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-ivory-2 hover:text-gold text-sm transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-gold/40 group-hover:bg-gold transition-colors" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Our Products */}
          <div className="space-y-6">
            <h4 className="text-white font-serif text-xl">Our Products</h4>
            <ul className="space-y-3">
              {productLinks.map((product) => (
                <li key={product}>
                  <Link
                    to="/products"
                    className="text-ivory-2 hover:text-gold text-sm transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-gold/40 group-hover:bg-gold transition-colors" />
                    {product}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Contact */}
          <div className="space-y-6">
            <h4 className="text-white font-serif text-xl">Contact Us</h4>
            <div className="space-y-4">
              <div className="flex gap-3">
                <MapPin size={16} className="text-gold flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-ivory-2 text-sm leading-relaxed">
                    2911B Cleveland Avenue<br />
                    Saskatoon, SK, Canada
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <Phone size={16} className="text-gold flex-shrink-0 mt-0.5" />
                <a href="tel:+13065806476" className="text-ivory-2 hover:text-gold text-sm transition-colors">
                  +1 (306) 580-6476
                </a>
              </div>
              <div className="flex gap-3">
                <Mail size={16} className="text-gold flex-shrink-0 mt-0.5" />
                <a href="mailto:Shoieb@brightondecor.co" className="text-ivory-2 hover:text-gold text-sm transition-colors break-all">
                  Shoieb@brightondecor.co
                </a>
              </div>
              <div className="flex gap-3">
                <Clock size={16} className="text-gold flex-shrink-0 mt-0.5" />
                <div className="text-ivory-2 text-sm">
                  <p>Mon–Fri: 9:00 AM – 5:00 PM</p>
                  <p>Sat–Sun: By Appointment</p>
                </div>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/13065806476"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border px-4 py-2 text-xs uppercase tracking-widest font-bold text-gold hover:bg-gold hover:text-bg-primary transition-all duration-300 rounded-none"
              style={{ borderColor: 'rgba(196,162,101,0.35)' }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp Us
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderColor: 'rgba(196,162,101,0.1)' }}
        >
          <p className="text-ivory-3 text-[10px] uppercase tracking-widest font-bold">
            &copy; {year} Brighton Decor Ltd. All rights reserved.
          </p>
          <p className="text-[12px] font-sans text-gold/70 tracking-wider">
            Designed &amp; Developed by{' '}
            <a
              href="https://kathiravan.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold border-b hover:text-ivory hover:border-ivory transition-all no-underline"
              style={{ borderColor: 'rgba(196,162,101,0.3)' }}
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
