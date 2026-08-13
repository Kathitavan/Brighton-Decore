import React from 'react';
import { motion } from 'framer-motion';
import { teamMembers } from '../../data/team';

const TeamSection = () => {
  return (
    <section className="py-24 px-6 md:px-12 border-t" style={{ background: '#0F1E38', borderColor: 'rgba(196,162,101,0.1)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="section-label">The Team</span>
          <h2 className="text-4xl font-serif text-white mt-4">
            Meet the <span className="italic" style={{ color: '#C4A265' }}>Founder</span>
          </h2>
        </div>

        <div className="flex justify-center">
          {teamMembers.map((member) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-sm"
            >
              {/* Avatar / Image */}
              <div
                className="w-48 h-48 mx-auto mb-6 overflow-hidden rounded-none relative"
                style={{ border: '1px solid rgba(196,162,101,0.3)' }}
              >
                <img
                  src={member.image}
                  alt={member.name}
                  loading="lazy"
                  decoding="async"
                  width={200}
                  height={200}
                  className="w-full h-full object-cover"
                />
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ border: '1px solid rgba(196,162,101,0.1)' }}
                />
              </div>

              <h3 className="text-2xl font-serif text-white mb-1">{member.name}</h3>
              <p className="text-xs uppercase tracking-widest font-bold mb-5" style={{ color: '#C4A265' }}>
                {member.role}
              </p>
              <p className="text-sm leading-relaxed italic" style={{ color: '#C8C0B0' }}>
                {member.bio}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
