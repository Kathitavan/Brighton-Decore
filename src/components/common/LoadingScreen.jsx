// src/components/common/LoadingScreen.jsx
// Brighton Decor Canada — Opening Animation with Official Brand Logo
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { company } from '../../config/company';

const LoadingScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setIsLoading(false), 200);
            return 100;
          }
          return prev + Math.random() * 18 + 8;
        });
      }, 80);
      return () => clearInterval(interval);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: 'easeInOut' } }}
          className="fixed inset-0 z-[999] bg-[#0A0908] flex flex-col items-center justify-center p-6 select-none"
        >
          {/* Brand Logo Opening Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center text-center mb-12"
          >
            <img
              src={company.logo}
              alt={company.name}
              className="h-20 md:h-24 w-auto object-contain mb-3 filter drop-shadow-[0_0_20px_rgba(201,165,90,0.3)]"
            />
            <div className="text-[10px] tracking-[0.4em] uppercase text-[#C9A55A] font-sans font-semibold">
              Decor Ltd — Canada
            </div>
          </motion.div>

          {/* Progress Bar */}
          <div className="w-56 h-[1.5px] bg-white/10 relative overflow-hidden rounded-full">
            <motion.div
              className="absolute inset-y-0 left-0 bg-[#C9A55A] shadow-[0_0_12px_#C9A55A]"
              style={{ width: `${progress}%` }}
              transition={{ ease: 'linear' }}
            />
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 0.3 }}
            className="text-white/50 text-[10px] tracking-[0.3em] uppercase font-sans mt-6"
          >
            Saskatoon, Saskatchewan
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
