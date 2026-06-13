import React, { useState } from 'react';
import PageTransition from '../components/common/PageTransition';
import { services, processSteps, pricingPackages } from '../data/services';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, CheckCircle2, Layout, Home, ChefHat, ShowerHead, Briefcase, Move3d } from 'lucide-react';

const iconMap = {
  Layout, Home, ChefHat, ShowerHead, Briefcase, Move3d
};

const Services = () => {
  const [expandedId, setExpandedId] = useState(null);

  return (
    <PageTransition>
      {/* Hero */}
      <section className="pt-32 pb-24 px-6 bg-bg-primary">
        <div className="max-w-7xl mx-auto text-center">
            <span className="text-gold uppercase tracking-[0.3em] text-xs font-sans font-bold">Expertise</span>
            <h1 className="text-5xl md:text-7xl font-serif text-white mt-4 italic mb-8">What We Do</h1>
            <p className="text-ivory-muted max-w-2xl mx-auto text-lg font-light">
                Comprehensive interior solutions delivered with surgical precision and artistic flair.
            </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 px-6 bg-bg-secondary">
        <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.map((s) => {
                    const Icon = iconMap[s.icon];
                    return (
                        <div 
                            key={s.id}
                            className="bg-bg-tertiary p-8 gold-border group cursor-pointer"
                            onClick={() => setExpandedId(expandedId === s.id ? null : s.id)}
                        >
                            <div className="w-12 h-12 bg-gold/10 flex items-center justify-center mb-6 text-gold transition-all group-hover:scale-110">
                                <Icon size={24} />
                            </div>
                            <h3 className="text-2xl font-serif text-white mb-4">{s.name}</h3>
                            <p className="text-ivory-muted text-sm leading-relaxed mb-6">
                                {s.description}
                            </p>
                            
                            <div className="flex items-center text-gold text-[10px] uppercase font-bold tracking-widest gap-2">
                                <span>{expandedId === s.id ? 'Show Less' : 'Learn More'}</span>
                                <ChevronDown size={14} className={expandedId === s.id ? 'rotate-180' : ''} />
                            </div>

                            <AnimatePresence>
                                {expandedId === s.id && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="overflow-hidden mt-6 pt-6 border-t border-gold/10"
                                    >
                                        <p className="text-ivory-muted text-sm italic">{s.longDescription}</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    );
                })}
            </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-24 px-6 bg-bg-primary">
        <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
                <span className="text-gold uppercase tracking-widest text-xs font-bold">Workflow</span>
                <h2 className="text-4xl font-serif text-white mt-2">The Creation Process</h2>
            </div>
            
            <div className="flex flex-col md:flex-row gap-6">
                {processSteps.map((step, i) => (
                    <div key={i} className="flex-1 p-8 bg-bg-tertiary/50 border border-gold/5 relative overflow-hidden group">
                        <span className="text-6xl font-serif text-gold/5 absolute -top-2 -right-2 transition-all group-hover:text-gold/10">
                            {step.step}
                        </span>
                        <h4 className="text-gold text-xs uppercase tracking-widest font-bold mb-4">{step.title}</h4>
                        <p className="text-ivory-muted text-sm relative z-10">{step.description}</p>
                        {i < processSteps.length - 1 && (
                            <div className="hidden md:block absolute top-1/2 -right-4 translate-x-1/2 -translate-y-1/2 z-10 text-gold/20">
                                <ChevronDown size={32} className="-rotate-90" />
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 px-6 bg-bg-secondary border-t border-gold/10">
        <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
                <span className="text-gold uppercase tracking-widest text-xs font-bold">Investment</span>
                <h2 className="text-4xl font-serif text-white mt-2 italic">Design Packages</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {pricingPackages.map((pkg, i) => (
                    <div 
                        key={i} 
                        className={`p-10 gold-border flex flex-col ${pkg.isPopular ? 'bg-bg-tertiary scale-105 z-10' : 'bg-transparent shadow-none'}`}
                    >
                        {pkg.isPopular && (
                            <span className="bg-gold text-bg-primary text-[10px] uppercase font-bold tracking-widest px-3 py-1 mb-6 w-fit mx-auto">
                                Most Preferred
                            </span>
                        )}
                        <h4 className="text-white font-serif text-3xl text-center mb-2">{pkg.name}</h4>
                        <p className="text-gold font-serif text-4xl text-center mb-10">{pkg.price}</p>
                        
                        <ul className="flex-1 space-y-4 mb-10">
                            {pkg.features.map((f, j) => (
                                <li key={j} className="flex items-start gap-3 text-ivory-muted text-sm">
                                    <CheckCircle2 size={16} className="text-gold mt-0.5 flex-shrink-0" />
                                    <span>{f}</span>
                                </li>
                            ))}
                        </ul>

                        <button className={`w-full py-4 text-xs uppercase tracking-widest font-bold transition-all ${
                            pkg.isPopular ? 'bg-gold text-bg-primary hover:bg-white' : 'border border-gold text-gold hover:bg-gold hover:text-bg-primary'
                        }`}>
                            Enquire Now
                        </button>
                    </div>
                ))}
            </div>
        </div>
      </section>
    </PageTransition>
  );
};

export default Services;
