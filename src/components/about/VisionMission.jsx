import React from 'react';
import { motion } from 'framer-motion';
import { Eye, Target } from 'lucide-react';

const VisionMission = () => {
  return (
    <section className="py-24 px-6 bg-bg-secondary">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-bg-tertiary p-12 gold-border relative group"
          >
            <div className="w-16 h-16 bg-gold/10 flex items-center justify-center mb-8 rounded-full text-gold">
                <Eye size={32} strokeWidth={1.5} />
            </div>
            <h3 className="text-3xl font-serif text-white mb-6">Our Vision</h3>
            <p className="text-ivory-muted leading-relaxed">
              To consistently surpass clients' expectations and establish leadership in quality. We aim to be the definitive benchmark for interior design in India, leading with innovation and sustainable practices.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-bg-tertiary p-12 gold-border relative group"
          >
            <div className="w-16 h-16 bg-gold/10 flex items-center justify-center mb-8 rounded-full text-gold">
                <Target size={32} strokeWidth={1.5} />
            </div>
            <h3 className="text-3xl font-serif text-white mb-6">Our Mission</h3>
            <p className="text-ivory-muted leading-relaxed">
              Enhance client experiences through continuous innovation, quality, and process transparency. We strive to provide functional luxury that improves the daily lives of our residents.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default VisionMission;
