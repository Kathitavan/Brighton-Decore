import React from 'react';
import { motion } from 'framer-motion';
import { ABOUT_TEXT } from '../../data/team';
import showroomImg from '../../assets/images/about/showroom.jpg';

const BrandStory = () => {
  const paragraphs = ABOUT_TEXT.trim().split('\n\n').filter(Boolean);

  return (
    <section className="py-24 px-6 md:px-12" style={{ background: '#0F1E38' }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Story Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div>
              <span className="section-label">Our Story</span>
              <h2 className="text-4xl md:text-5xl font-serif text-white mt-4 leading-tight">
                Brightening Homes <br />
                <span className="italic" style={{ color: '#C4A265' }}>Across Canada</span>
              </h2>
            </div>

            {paragraphs.map((para, i) => (
              <p key={i} className="text-sm md:text-base leading-relaxed font-light" style={{ color: '#C8C0B0' }}>
                {para.trim()}
              </p>
            ))}
          </motion.div>

          {/* Showroom Image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative mt-12 lg:mt-0"
          >
            <div className="p-1" style={{ border: '1px solid rgba(196,162,101,0.3)' }}>
              <img
                src={showroomImg}
                alt="Brighton Decor Saskatoon showroom and team"
                loading="lazy"
                decoding="async"
                width={600}
                height={450}
                className="w-full h-auto object-cover"
              />
            </div>
            {/* Decorative corner */}
            <div
              className="absolute -top-5 -right-5 w-20 h-20 hidden md:block"
              style={{ borderTop: '1px solid rgba(196,162,101,0.25)', borderRight: '1px solid rgba(196,162,101,0.25)' }}
            />
            <div
              className="absolute -bottom-5 -left-5 w-20 h-20 hidden md:block"
              style={{ borderBottom: '1px solid rgba(196,162,101,0.25)', borderLeft: '1px solid rgba(196,162,101,0.25)' }}
            />

            {/* Stat card */}
            <div
              className="absolute bottom-8 -left-6 px-6 py-4 hidden md:block"
              style={{ background: '#0A1628', border: '1px solid rgba(196,162,101,0.3)' }}
            >
              <p className="text-3xl font-serif" style={{ color: '#C4A265' }}>1300+</p>
              <p className="text-[10px] uppercase tracking-widest font-bold mt-1" style={{ color: '#C8C0B0' }}>
                Homes Brightened
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BrandStory;
