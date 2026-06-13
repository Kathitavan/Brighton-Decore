import React from 'react';
import PageTransition from '../components/common/PageTransition';
import BrandStory from '../components/about/BrandStory';
import VisionMission from '../components/about/VisionMission';
import Timeline from '../components/about/Timeline';
import TeamSection from '../components/about/TeamSection';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <PageTransition>
      {/* Hero Section */}
      <section className="relative h-[60vh] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2000"
            alt="About Brighton Decore"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-bg-primary/70 backdrop-blur-sm" />
        </div>
        <div className="relative z-10 text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-gold uppercase tracking-[0.4em] text-xs font-sans font-bold block mb-4"
          >
            Since 2012
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-7xl font-serif text-white italic"
          >
            The Brand Story
          </motion.h1>
        </div>
      </section>

      <BrandStory />

      {/* USPS Tiles */}
      <section className="py-24 px-6 bg-bg-primary border-y border-gold/10">
        <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                    { label: 'International Quality', val: 'Global Standards' },
                    { label: 'In-house Innovation', val: 'Bespoke Solutions' },
                    { label: 'End-to-End Service', val: 'Turnkey Execution' },
                    { label: '500+ Happy Homes', val: 'Proven Excellence' }
                ].map((item, i) => (
                    <div key={i} className="text-center p-8 gold-border bg-bg-tertiary">
                        <p className="text-gold text-[10px] uppercase tracking-widest font-bold mb-2">{item.label}</p>
                        <p className="text-white font-serif text-xl">{item.val}</p>
                    </div>
                ))}
            </div>
        </div>
      </section>

      <VisionMission />
      <TeamSection />
      <Timeline />
    </PageTransition>
  );
};

export default About;
