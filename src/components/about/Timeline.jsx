import React from 'react';
import { motion } from 'framer-motion';

const milestones = [
  { year: '2012', title: 'The Beginning', desc: 'Brighton Decore founded in Kolkata with a small team of 3.' },
  { year: '2015', title: 'Expansion', desc: 'Opened our first design experience center and reached 100+ projects.' },
  { year: '2018', title: 'International Standards', desc: 'Adopted global quality protocols and modular kitchen innovations.' },
  { year: '2021', title: 'Pan-India Presence', desc: 'Expanded services to 20 cities including Mumbai and Bangalore.' },
  { year: '2023', title: 'Innovation Lead', desc: 'Launched AI-integrated 3D visualization and virtual reality previews.' },
  { year: '2025', title: 'Future Living', desc: 'Surpassed 500+ projects and established leadership in luxury design.' },
];

const Timeline = () => {
  return (
    <section className="py-24 px-6 bg-bg-secondary overflow-hidden border-t border-gold/10">
      <div className="max-w-7xl mx-auto mb-16">
        <span className="text-gold uppercase tracking-[0.3em] text-xs font-sans font-bold">Chronology</span>
        <h2 className="text-4xl md:text-5xl font-serif text-white mt-4">Company <span className="italic">Milestones</span></h2>
      </div>

      <div className="flex overflow-x-auto pb-12 px-6 no-scrollbar cursor-grab active:cursor-grabbing snap-x">
        {milestones.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            viewport={{ once: true }}
            className="flex-shrink-0 w-80 mr-12 snap-start flex flex-col pt-10 relative"
          >
            {/* Year dot and line */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gold/20" />
            <div className="absolute top-0 left-0 w-4 h-4 bg-gold rounded-full -translate-y-1/2 shadow-[0_0_15px_rgba(201,165,90,0.5)]" />
            
            <h3 className="text-4xl font-serif text-gold mb-4 leading-none">{item.year}</h3>
            <h4 className="text-xl font-serif text-white mb-4">{item.title}</h4>
            <p className="text-ivory-muted text-sm leading-relaxed">
              {item.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Timeline;
