import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

const CustomizeButton = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    // Entrance delay
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  // Don't show on Room Viewer page
  if (location.pathname === '/room-viewer') return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          onClick={() => navigate('/room-viewer')}
          className="fixed bottom-6 right-6 z-[90] bg-gold text-bg-primary px-6 py-4 rounded-full font-sans font-bold shadow-2xl flex items-center gap-2 hover:scale-105 active:scale-95 transition-all group"
        >
          <Sparkles size={18} className="group-hover:animate-pulse" />
          <span className="hidden md:inline tracking-widest text-xs uppercase">✦ Customize Your Idea</span>
          <span className="md:hidden tracking-widest text-[10px] uppercase font-bold">✦ Try in 3D</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default CustomizeButton;
