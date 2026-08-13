import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    q: 'Do you offer free measurement?',
    a: 'Yes — we offer free in-home measurement to all customers in Saskatoon and surrounding areas. No obligation, no cost.',
  },
  {
    q: 'How long does installation take?',
    a: 'Most residential installations are completed in a single visit, typically 1–3 hours depending on the number of windows.',
  },
  {
    q: 'Are motorized blinds available?',
    a: 'Yes — motorized options are available for roller, zebra, and honeycomb blinds. Compatible with most smart home systems.',
  },
  {
    q: 'Can you cover large patio doors?',
    a: 'Absolutely. Our vertical blinds are specifically designed for large windows and sliding patio doors — custom cut to any size.',
  },
  {
    q: 'Do you offer commercial installations?',
    a: 'Yes — we handle large-scale commercial projects for offices, retail stores, hotels, and more across Saskatoon and Saskatchewan.',
  },
  {
    q: 'What is your service area?',
    a: 'We primarily serve Saskatoon and surrounding Saskatchewan communities. Contact us to confirm if we cover your area.',
  },
];

const FAQSection = () => {
  const [expanded, setExpanded] = useState(null);

  return (
    <section className="py-24 px-6 md:px-12 border-t" style={{ background: '#0F1E38', borderColor: 'rgba(196,162,101,0.1)' }}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <span className="section-label">Questions</span>
          <h2 className="text-4xl md:text-5xl font-serif text-white mt-4">
            Frequently <span className="italic" style={{ color: '#C4A265' }}>Asked</span>
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((item, i) => (
            <div
              key={i}
              className="overflow-hidden"
              style={{ border: '1px solid rgba(196,162,101,0.1)', background: '#162844' }}
            >
              <button
                className="w-full flex items-center justify-between p-6 text-left"
                onClick={() => setExpanded(expanded === i ? null : i)}
              >
                <span className="text-white font-serif text-lg pr-4">{item.q}</span>
                <ChevronDown
                  size={20}
                  className="flex-shrink-0 transition-transform duration-300"
                  style={{
                    color: '#C4A265',
                    transform: expanded === i ? 'rotate(180deg)' : 'rotate(0deg)',
                  }}
                />
              </button>
              <AnimatePresence>
                {expanded === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div
                      className="px-6 pb-6 text-sm leading-relaxed"
                      style={{ color: '#C8C0B0', borderTop: '1px solid rgba(196,162,101,0.08)' }}
                    >
                      <div className="pt-4">{item.a}</div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
