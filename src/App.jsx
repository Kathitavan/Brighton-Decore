import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';

// Components
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import CursorFollower from './components/common/CursorFollower';
import ScrollToTop from './components/common/ScrollToTop';
import LoadingScreen from './components/common/LoadingScreen';

// Pages
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Products from './pages/Products';
import NotFound from './pages/NotFound';

function App() {
  const location = useLocation();

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen" style={{ background: '#0A1628', color: '#F5F2EC' }}>
      <LoadingScreen />
      <ScrollToTop />
      <CursorFollower />
      <Navbar />

      <main>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/"          element={<Home />} />
            <Route path="/products"  element={<Products />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/services"  element={<Services />} />
            <Route path="/about"     element={<About />} />
            <Route path="/contact"   element={<Contact />} />
            <Route path="*"          element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}

export default App;
