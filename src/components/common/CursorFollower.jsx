import React, { useState, useEffect } from 'react';
import { useCursorFollower } from '../../hooks/useCursorFollower';
import { motion, AnimatePresence } from 'framer-motion';

const CursorFollower = () => {
  const { position, isHovering } = useCursorFollower();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const onMouseMove = () => setIsVisible(true);
    window.addEventListener('mousemove', onMouseMove, { once: true });
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 w-6 h-6 border-2 border-gold rounded-full pointer-events-none z-[9999] hidden md:block"
      animate={{
        x: position.x - 12,
        y: position.y - 12,
        scale: isHovering ? 2.5 : 1,
        backgroundColor: isHovering ? 'rgba(201, 165, 90, 0.2)' : 'transparent',
      }}
      transition={{
        type: 'spring',
        damping: 25,
        stiffness: 250,
        mass: 0.5,
      }}
    />
  );
};

export default CursorFollower;
