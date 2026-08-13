import React from 'react';
import { useNavigate } from 'react-router-dom';
import PageTransition from '../components/common/PageTransition';
import Hero from '../components/home/Hero';
import Stats from '../components/home/Stats';
import FeaturedProjects from '../components/home/FeaturedProjects';
import ServicesTeaser from '../components/home/ServicesTeaser';
import AboutSnippet from '../components/home/AboutSnippet';
import Testimonials from '../components/home/Testimonials';
import CTABanner from '../components/home/CTABanner';

const Home = () => {
  const navigate = useNavigate();

  return (
    <PageTransition>
      <Hero />
      <Stats />
      <FeaturedProjects />
      <ServicesTeaser />
      
      {/* Signature Blinds Collection */}
      <section className="py-24 px-6 md:px-12 bg-bg-primary overflow-hidden border-y border-gold/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <span className="text-gold uppercase tracking-[0.3em] text-xs font-sans font-bold">Signature</span>
              <h2 className="text-4xl md:text-5xl font-serif text-white mt-4 italic">Blinds Collection</h2>
            </div>
            <button 
                onClick={() => navigate('/products')}
                className="text-gold uppercase tracking-[0.2em] text-[10px] font-bold border-b border-gold/40 hover:border-gold pb-1 transition-all"
            >
                View All Collection
            </button>
          </div>

          <div className="flex overflow-x-auto pb-12 gap-6 no-scrollbar snap-x cursor-grab">
            {[
                { name: 'Roller Blinds', price: '₹450', id: 'roller' },
                { name: 'Zebra Blinds', price: '₹550', id: 'zebra' },
                { name: 'Honeycomb', price: '₹680', id: 'honeycomb' },
                { name: 'Vertical Blinds', price: '₹380', id: 'vertical' },
                { name: 'Wooden/Faux', price: '₹720', id: 'wooden' },
                { name: 'PVC Blinds', price: '₹320', id: 'pvc' }
            ].map((blind, idx) => (
                <div key={idx} className="min-w-[280px] md:min-w-[320px] bg-bg-secondary p-6 snap-start gold-border group">
                    <div className="aspect-[4/3] mb-6 overflow-hidden">
                        <img 
                            src={`https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=400&sig=${idx + 200}`} 
                            alt={blind.name} 
                            className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                        />
                    </div>
                    <h4 className="text-white font-serif text-xl mb-1">{blind.name}</h4>
                    <p className="text-gold text-[10px] font-bold uppercase tracking-widest mb-6">From {blind.price}/sqft</p>
                    <div className="flex gap-4">
                        <button 
                            onClick={() => navigate('/products')}
                            className="flex-1 text-[10px] uppercase font-bold tracking-widest text-ivory/60 border border-gold/10 py-3 hover:border-gold/40 transition-colors"
                        >
                            Details
                        </button>
                        <button 
                            onClick={() => navigate('/room-viewer', { state: { preselect: blind.id } })}
                            className="flex-1 text-[10px] uppercase font-bold tracking-widest bg-gold text-bg-primary py-3 hover:bg-white transition-all transform group-hover:translate-y-[-2px] shadow-lg shadow-gold/5"
                        >
                            Try in 3D
                        </button>
                    </div>
                </div>
            ))}
          </div>
        </div>
      </section>

      <AboutSnippet />
      <Testimonials />
      <CTABanner />
    </PageTransition>
  );
};

export default Home;
