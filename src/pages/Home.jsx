import React from 'react';
import PageTransition from '../components/common/PageTransition';
import Hero from '../components/home/Hero';
import Stats from '../components/home/Stats';
import AboutSnippet from '../components/home/AboutSnippet';
import ProductsSection from '../components/home/ProductsSection';
import FeaturedProjects from '../components/home/FeaturedProjects';
import ServicesTeaser from '../components/home/ServicesTeaser';
import WhyBrighton from '../components/home/WhyBrighton';
import ProcessSection from '../components/home/ProcessSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import FAQSection from '../components/home/FAQSection';
import CTABanner from '../components/home/CTABanner';

const Home = () => {
  return (
    <PageTransition>
      {/* Section 1: Hero — Full screen background, headline, CTAs */}
      <Hero />

      {/* Stats Strip */}
      <Stats />

      {/* Section 2: About Split */}
      <AboutSnippet />

      {/* Section 3: Products — 7 x 3D flip cards */}
      <ProductsSection />

      {/* Section 4: Portfolio — Featured 3 projects */}
      <FeaturedProjects />

      {/* Section 5: Services — 3 service teaser */}
      <ServicesTeaser />

      {/* Section 6: Why Brighton — 6 USP cards */}
      <WhyBrighton />

      {/* Section 7: Process — 6-step animated timeline */}
      <ProcessSection />

      {/* Section 8: Testimonials — 6 mock reviews */}
      <TestimonialsSection />

      {/* Section 9: FAQ — 6 accordion items */}
      <FAQSection />

      {/* Section 10: CTA Banner */}
      <CTABanner />
    </PageTransition>
  );
};

export default Home;
