import React from 'react';
import PageTransition from '../components/common/PageTransition';
import BrandStory from '../components/about/BrandStory';
import VisionMission from '../components/about/VisionMission';
import TeamSection from '../components/about/TeamSection';
import { motion } from 'framer-motion';
import aboutSplitImg from '../assets/images/misc/about-split.jpg';

const About = () => {
  return (
    <PageTransition>
      {/* Hero Section */}
      <section className="relative h-[60vh] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={aboutSplitImg}
            alt="About Brighton Decor — Saskatoon window blind specialists"
            loading="eager"
            width={1600}
            height={900}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0" style={{ background: 'rgba(10,22,40,0.72)' }} />
        </div>
        <div className="relative z-10 text-center px-6">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="section-label block mb-4"
          >
            Since 2022
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-7xl font-serif text-white italic"
          >
            Our Story
          </motion.h1>
        </div>
      </section>

      <BrandStory />

      {/* USPs Tiles */}
      <section className="py-20 px-6 border-y" style={{ background: '#0A1628', borderColor: 'rgba(196,162,101,0.1)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'Homes Completed', val: '1300+' },
              { label: 'Years in Business', val: '4+' },
              { label: 'Service Coverage', val: 'All of Canada' },
              { label: 'Satisfaction Rate', val: '100%' },
            ].map((item, i) => (
              <div
                key={i}
                className="text-center p-8"
                style={{ border: '1px solid rgba(196,162,101,0.18)', background: '#0F1E38' }}
              >
                <p className="text-3xl md:text-4xl font-serif mb-2" style={{ color: '#C4A265' }}>{item.val}</p>
                <p className="text-[10px] uppercase tracking-widest font-bold" style={{ color: '#C8C0B0' }}>{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <VisionMission />
      <TeamSection />
    </PageTransition>
  );
};

export default About;
