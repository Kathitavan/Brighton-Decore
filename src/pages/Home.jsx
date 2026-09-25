// src/pages/Home.jsx
import React from 'react';
import PageTransition from '../components/common/PageTransition';
import Hero from '../components/home/Hero';
import Stats from '../components/home/Stats';
import ServicesTeaser from '../components/home/ServicesTeaser';
import Immersive3DShowcase from '../components/home/Immersive3DShowcase';
import TransformationSection from '../components/home/TransformationSection';
import WhyBrighton from '../components/home/WhyBrighton';
import AboutSnippet from '../components/home/AboutSnippet';
import ProcessSection from '../components/home/ProcessSection';
import Testimonials from '../components/home/Testimonials';
import FAQSection from '../components/home/FAQSection';
import CTABanner from '../components/home/CTABanner';
import styles from '../styles/pages/home.module.css';

const Home = () => {
  return (
    <PageTransition>
      <div className={styles.homePage}>
        {/* 1. Hero — cinematic video introduction */}
        <Hero />

        {/* 2. Stats — kinetic trust statistics */}
        <Stats />

        {/* 3. Services — architectural offerings */}
        <ServicesTeaser />

        {/* 4. Immersive 3D Room Experience — Scroll-driven architectural showcase */}
        <Immersive3DShowcase />

        {/* 5. Transformation Showcase — Before & After V2 */}
        <TransformationSection />

        {/* 6. Why Brighton Decor */}
        <WhyBrighton />

        {/* 9. About snippet */}
        <AboutSnippet />

        {/* 10. Our process — 7-step journey */}
        <ProcessSection />

        {/* 11. Testimonials */}
        <Testimonials />

        {/* 12. FAQ */}
        <FAQSection />

        {/* 13. Final CTA Banner */}
        <CTABanner />
      </div>
    </PageTransition>
  );
};

export default Home;
