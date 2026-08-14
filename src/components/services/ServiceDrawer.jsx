// src/components/services/ServiceDrawer.jsx
// Brighton Decor Canada — Full-Height Immersive Service Detail Drawer
import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, CheckCircle2, FileText, Sparkles, MapPin, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ServiceDrawer = ({ service, isOpen, onClose }) => {
  const navigate = useNavigate();

  // Handle ESC key to close drawer
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!service || !isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex justify-end">
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Full-Height Architectural Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="relative z-10 w-full max-w-2xl h-full bg-[#0A0908] text-white border-l border-white/15 shadow-2xl flex flex-col justify-between overflow-y-auto"
          >
            {/* Header Sticky Bar */}
            <div className="sticky top-0 z-20 bg-[#0A0908]/90 backdrop-blur-xl border-b border-white/10 px-8 py-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold text-[#C9A55A] uppercase tracking-widest">
                  {service.category || 'BRIGHTON SERVICE'}
                </span>
              </div>
              <button
                onClick={onClose}
                aria-label="Close service details"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/15 flex items-center justify-center text-white/80 hover:text-[#0A0908] hover:bg-[#C9A55A] hover:border-[#C9A55A] transition-all duration-300"
              >
                <X size={20} />
              </button>
            </div>

            {/* Main Content Body */}
            <div className="p-8 md:p-12 space-y-8 flex-grow">
              {/* Service Hero Image */}
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-[#121210] border border-white/15 shadow-xl">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0908] via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] font-sans text-[#C9A55A] bg-[#0A0908]/80 backdrop-blur-md px-3.5 py-1.5 rounded border border-[#C9A55A]/30">
                    {service.tagline || service.name}
                  </span>
                </div>
              </div>

              {/* Title & Descriptions */}
              <div>
                <h2 className="font-serif text-3xl md:text-4xl text-[#F5F2EA] font-light mb-4">
                  {service.name}
                </h2>
                <p className="text-lg text-[#C9A55A] font-serif italic mb-6">
                  "{service.description}"
                </p>
                <p className="text-white/75 font-sans font-light text-base leading-relaxed">
                  {service.longDescription}
                </p>
              </div>

              {/* Features List */}
              {service.features && (
                <div className="pt-6 border-t border-white/10 space-y-4">
                  <h3 className="font-mono text-xs uppercase tracking-widest text-[#C9A55A] font-bold">
                    Included Capabilities & Styles
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {service.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-3 bg-white/[0.03] p-3 rounded-xl border border-white/10">
                        <CheckCircle2 size={16} className="text-[#C9A55A] shrink-0" />
                        <span className="text-xs text-white/90 font-sans font-medium">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Saskatoon Assurance */}
              <div className="p-5 rounded-2xl bg-[#C9A55A]/10 border border-[#C9A55A]/30 flex items-start gap-4">
                <ShieldCheck size={24} className="text-[#C9A55A] shrink-0 mt-0.5" />
                <div className="text-xs font-sans">
                  <strong className="text-white font-bold block mb-1">Brighton Decor Workmanship Guarantee</strong>
                  <span className="text-white/70 leading-relaxed font-light">
                    All window treatments and flooring installations across Saskatoon & area come backed by our 1-Year Workmanship Guarantee.
                  </span>
                </div>
              </div>
            </div>

            {/* Footer Action Bar */}
            <div className="sticky bottom-0 bg-[#0A0908] border-t border-white/10 p-6 md:p-8 flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => {
                  onClose();
                  navigate('/contact');
                }}
                className="w-full sm:w-1/2 flex items-center justify-center gap-3 bg-[#C9A55A] text-[#0A0908] px-6 py-4 rounded-full text-xs font-bold uppercase tracking-widest font-sans hover:bg-white transition-all shadow-xl"
              >
                <FileText size={15} />
                <span>Book Free Measurement</span>
              </button>

              <button
                onClick={() => {
                  onClose();
                  navigate('/contact');
                }}
                className="w-full sm:w-1/2 flex items-center justify-center gap-3 border border-white/20 bg-white/5 text-white px-6 py-4 rounded-full text-xs font-bold uppercase tracking-widest font-sans hover:border-[#C9A55A] hover:text-[#C9A55A] transition-all"
              >
                <span>Request Quote</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ServiceDrawer;
