import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingScreen = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="fixed inset-0 z-[1000] bg-bg-primary flex flex-col items-center justify-center p-6"
        >
          <div className="text-center overflow-hidden">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="mb-2"
            >
              <span className="text-4xl md:text-6xl font-serif font-bold tracking-tighter text-white">
                BRIGHTON
              </span>
            </motion.div>
            
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.5, ease: 'easeInOut' }}
              className="h-[1px] bg-gold w-full mb-2 origin-left"
            />
            
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8, ease: 'easeOut' }}
            >
              <span className="text-xs md:text-sm tracking-[0.6em] uppercase text-gold font-sans font-bold">
                Decore
              </span>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="absolute bottom-12 flex items-center gap-4"
          >
            <div className="w-12 h-[1px] bg-gold/30" />
            <span className="text-[10px] uppercase tracking-[0.2em] text-ivory-muted font-bold italic">Where Spaces Tell Stories</span>
            <div className="w-12 h-[1px] bg-gold/30" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
