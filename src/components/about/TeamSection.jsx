import React from 'react';
import { motion } from 'framer-motion';
import { teamMembers } from '../../data/team';

const TeamSection = () => {
  return (
    <section className="py-24 px-6 bg-bg-primary">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-gold uppercase tracking-[0.3em] text-xs font-sans font-bold">The Minds</span>
          <h2 className="text-4xl md:text-5xl font-serif text-white mt-4 italic">Meet Our Experts</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, idx) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="aspect-[3/4] overflow-hidden gold-border p-1 mb-6 relative">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <h4 className="text-xl font-serif text-white mb-1">{member.name}</h4>
              <p className="text-gold text-[10px] uppercase tracking-widest font-bold">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
