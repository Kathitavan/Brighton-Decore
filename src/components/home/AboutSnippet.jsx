import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import showroomImg from '../../assets/images/about/showroom.jpg';

const AboutSnippet = () => {
  return (
    <section className="py-24 px-6 md:px-12 overflow-hidden" style={{ background: '#0A1628' }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <span className="section-label">About Brighton Decor</span>
              <h2 className="text-4xl md:text-5xl font-serif text-white mt-4 leading-tight">
                Saskatoon's Trusted <br />
                <span className="italic" style={{ color: '#C4A265' }}>Since 2022</span>
              </h2>
            </div>

            <p className="leading-relaxed text-lg font-light" style={{ color: '#C8C0B0' }}>
              Brighton Decor is Saskatoon's trusted specialist for window blinds, dream curtains,
              and flooring solutions. Since 2022, we have transformed over 1,300 homes and
              businesses across Canada with premium window treatments and professional installation.
            </p>

            <p className="leading-relaxed text-sm" style={{ color: 'rgba(200,192,176,0.8)' }}>
              We believe every home deserves beautiful, functional window coverings — installed
              perfectly, backed by expert advice, and supported with honest service. That's why
              we offer free in-home measurement for every project, no matter the size.
            </p>

            {/* USPs */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              {[
                'Free In-Home Measurement',
                '1 Year Product Warranty',
                'Motorized Blind Experts',
                '1300+ Homes Completed',
              ].map((usp) => (
                <div key={usp} className="flex items-start gap-2">
                  <span className="mt-1 flex-shrink-0 text-xs" style={{ color: '#C4A265' }}>✦</span>
                  <span className="text-xs uppercase tracking-widest font-bold" style={{ color: '#C8C0B0' }}>{usp}</span>
                </div>
              ))}
            </div>

            <Link to="/about" className="inline-block pt-2">
              <button
                className="border-b pb-2 uppercase tracking-widest text-xs font-bold transition-all hover:opacity-80"
                style={{ borderColor: 'rgba(196,162,101,0.4)', color: '#C4A265' }}
              >
                Learn More About Our Story →
              </button>
            </Link>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="p-1" style={{ border: '1px solid rgba(196,162,101,0.25)' }}>
              <img
                src={showroomImg}
                alt="Brighton Decor Saskatoon showroom"
                loading="lazy"
                decoding="async"
                width={600}
                height={450}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decorative corners */}
            <div className="absolute -top-6 -right-6 w-24 h-24 -z-10 hidden md:block"
              style={{ borderTop: '1px solid rgba(196,162,101,0.2)', borderRight: '1px solid rgba(196,162,101,0.2)' }} />
            <div className="absolute -bottom-6 -left-6 w-24 h-24 -z-10 hidden md:block"
              style={{ borderBottom: '1px solid rgba(196,162,101,0.2)', borderLeft: '1px solid rgba(196,162,101,0.2)' }} />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSnippet;
