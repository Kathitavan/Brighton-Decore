// src/components/about/TeamSection.jsx
import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Sparkles, Linkedin, Mail, ArrowUpRight } from 'lucide-react';

const teamMembers = [
  {
    name: 'Jaspreet Singh',
    role: 'Founder & Principal Director',
    tagline: 'Visionary behind Brighton Decor Ltd’s commitment to Canadian interior excellence.',
    image: '/assets/imgs/about/team-jaspreet.jpg',
    experience: '8+ Yrs Experience',
  },
  {
    name: 'Sumanpreet Kaur',
    role: 'Head of Interior Design & Curation',
    tagline: 'Specializing in light physics, custom blind textiles, and harmonious flooring aesthetics.',
    image: '/assets/imgs/about/team-sumanpreet.jpg',
    experience: 'Master of Fine Arts',
  },
  {
    name: 'Michael Vance',
    role: 'Chief Technical Measurement Specialist',
    tagline: 'Precision laser site measurement specialist ensuring zero-tolerance window fitment.',
    image: '/assets/imgs/about/team-michael.jpg',
    experience: '1,000+ Fits Certified',
  },
];

const TeamCard = ({ member, index }) => {
  const cardRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="flex"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative w-full overflow-hidden backdrop-blur-xl bg-gradient-to-br from-white/[0.04] via-white/[0.01] to-transparent border border-white/10 rounded-2xl p-6 group hover:border-[#C9A55A]/50 transition-all duration-500 shadow-[0_20px_50px_rgba(0,0,0,0.4)] hover:shadow-[0_30px_70px_rgba(201,165,90,0.15)] flex flex-col justify-between"
      >
        {/* Spotlight Follower */}
        <div
          className="pointer-events-none absolute -inset-px transition-opacity duration-500 rounded-[inherit]"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(201, 165, 90, 0.15), transparent 60%)`,
          }}
        />

        <div>
          {/* Member Portrait */}
          <div className="aspect-[4/5] rounded-xl overflow-hidden mb-6 relative bg-[#1F1D1A]">
            <img
              src={member.image}
              alt={member.name}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              loading="lazy"
              onError={(e) => {
                e.target.src = '/assets/imgs/common/placeholder.jpg';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F0E0C] via-transparent to-transparent opacity-60" />

            {/* Experience Tag */}
            <div className="absolute top-3 right-3 backdrop-blur-md bg-[#0F0E0C]/80 border border-[#C9A55A]/30 px-3 py-1 rounded-full text-[9px] uppercase tracking-widest font-mono text-[#C9A55A]">
              {member.experience}
            </div>
          </div>

          {/* Member Details */}
          <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#C9A55A] mb-1 block">
            {member.role}
          </span>

          <h3 className="font-serif text-white text-2xl font-bold mb-3 group-hover:text-[#C9A55A] transition-colors duration-300">
            {member.name}
          </h3>

          <p className="text-white/70 font-sans font-light text-sm leading-relaxed mb-6">
            {member.tagline}
          </p>
        </div>

        {/* Card Footer Actions */}
        <div className="pt-4 border-t border-white/10 flex items-center justify-between">
          <span className="text-[10px] uppercase tracking-widest text-white/40 font-mono">
            Brighton Specialist
          </span>
          <div className="flex items-center gap-2">
            <button
              aria-label={`Contact ${member.name}`}
              className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:bg-[#C9A55A] hover:text-[#0F0E0C] hover:border-[#C9A55A] transition-colors duration-300"
            >
              <ArrowUpRight size={14} />
            </button>
          </div>
        </div>

      </div>
    </motion.div>
  );
};

const TeamSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      ref={sectionRef}
      className="relative py-32 bg-[#0F0E0C] text-white overflow-hidden"
      aria-label="Our team"
    >
      {/* Background Decorative Blur */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-[#C9A55A]/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="inline-flex items-center gap-3 px-3.5 py-1.5 rounded-full bg-[#C9A55A]/10 border border-[#C9A55A]/25 mb-4"
          >
            <Sparkles size={14} className="text-[#C9A55A]" />
            <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#C9A55A]">
              Design Leadership
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="font-serif text-3xl sm:text-4xl md:text-5xl text-white leading-tight mb-6"
          >
            Master Artisans & <br />
            <span className="italic text-[#C9A55A]">Interior Specialists</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-white/60 font-sans font-light text-base"
          >
            Brighton Decor Ltd is propelled by seasoned specialists dedicated to perfection in every Canadian home.
          </motion.p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map((member, idx) => (
            <TeamCard key={member.name} member={member} index={idx} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default TeamSection;
