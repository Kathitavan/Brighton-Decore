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
import RoomViewer from './pages/RoomViewer';
import Blog from './pages/Blog';
import Testimonials from './pages/Testimonials';
import Contact from './pages/Contact';
import Products from './pages/Products';
import NotFound from './pages/NotFound';
import CustomizeButton from './components/common/CustomizeButton';

function App() {
  const location = useLocation();
  const isRoomViewer = location.pathname === '/room-viewer';

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
      prevent: (node) => {
        return (
          node.hasAttribute('data-lenis-prevent') ||
          node.closest('[data-lenis-prevent]') !== null ||
          node.closest('.lenis-prevent') !== null ||
          node.closest('[role="dialog"]') !== null ||
          node.closest('.modal-scroll-area') !== null ||
          node.closest('.fixed') !== null ||
          document.body.classList.contains('modal-open') ||
          document.body.style.overflow === 'hidden'
        );
      },
    });

    if (isRoomViewer) {
      lenis.stop();
    } else {
      lenis.start();
    }

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, [isRoomViewer]);

  return (
    <div className="min-h-screen w-full">
      <LoadingScreen />
      <ScrollToTop />
      <CursorFollower />
      {!isRoomViewer && <Navbar />}

      <main>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/room-viewer" element={<RoomViewer />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/products" element={<Products />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </main>

      {!isRoomViewer && <CustomizeButton />}
      {!isRoomViewer && <Footer />}
    </div>
  );
}

export default App;
