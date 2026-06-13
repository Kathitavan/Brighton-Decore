import React from 'react';
import PageTransition from '../components/common/PageTransition';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import { BLIND_PRODUCTS } from '../data/roomProducts';

const productsData = [
  {
    ...BLIND_PRODUCTS[0],
    desc: "Clean lines and smooth operation make roller blinds the go-to choice for modern homes.",
    features: ["Light filtering / blackout options", "50+ fabric choices", "Motorized available"],
    img: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=600&sig=101"
  },
  {
    ...BLIND_PRODUCTS[1],
    desc: "Dual-layer design with alternating sheer and opaque strips for precise light control.",
    features: ["Day & night visibility control", "Anti-static fabric", "UV protection"],
    img: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=600&sig=102"
  },
  {
    ...BLIND_PRODUCTS[2],
    desc: "Cellular structure traps air for superior insulation — keeps rooms cooler in summer.",
    features: ["Energy efficient", "Sound absorbing", "Cordless operation"],
    img: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=600&sig=103"
  },
  {
    ...BLIND_PRODUCTS[3],
    desc: "Perfect for large windows, sliding doors, and commercial spaces.",
    features: ["Floor-to-ceiling coverage", "Easy tilt & draw", "PVC / fabric variants"],
    img: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=600&sig=104"
  },
  {
    ...BLIND_PRODUCTS[4],
    desc: "The warmth of natural wood with the durability of modern materials.",
    features: ["Moisture resistant", "Real wood / faux options", "Custom stain colors"],
    img: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=600&sig=105"
  },
  {
    ...BLIND_PRODUCTS[5],
    desc: "Wipe-clean waterproof blinds ideal for kitchens, bathrooms, and humid areas.",
    features: ["100% waterproof", "Anti-bacterial coating", "Lowest maintenance"],
    img: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=600&sig=106"
  }
];

const Products = () => {
  const navigate = useNavigate();

  return (
    <PageTransition>
      <div className="pt-32 pb-24 px-6 md:px-12 bg-bg-primary min-h-screen">
        <div className="max-w-7xl mx-auto">
          {/* Section A: Hero */}
          <div className="text-center mb-24 pb-12 border-b border-gold/10">
            <h1 className="text-5xl md:text-7xl font-serif text-white mb-6 italic">Our Blind Collection</h1>
            <p className="text-ivory-muted text-lg md:text-xl font-light max-w-2xl mx-auto">
                Premium window treatments for every space and style, engineered for Indian climate.
            </p>
          </div>

          {/* Section B: Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {productsData.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-bg-secondary flex flex-col group border border-gold/0 hover:border-gold/20 transition-all duration-500"
              >
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img src={product.img} alt={product.name} className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
                  <div className="absolute top-4 left-4 bg-gold text-bg-primary text-[8px] uppercase font-bold tracking-widest px-2 py-1">Brighton Decore</div>
                </div>
                
                <div className="p-8 flex-1 flex flex-col">
                  <h3 className="text-2xl font-serif text-white mb-4 group-hover:text-gold transition-colors">{product.name}</h3>
                  <p className="text-ivory-muted text-sm leading-relaxed mb-6 italic">
                    {product.desc}
                  </p>
                  
                  <ul className="space-y-3 mb-8 flex-1">
                    {product.features.map((f, i) => (
                        <li key={i} className="flex items-start gap-3 text-[11px] text-ivory/60 uppercase tracking-widest font-bold">
                            <Check size={14} className="text-gold shrink-0 mt-0.5" />
                            <span>{f}</span>
                        </li>
                    ))}
                  </ul>

                  <div className="pt-8 border-t border-gold/10 mb-8">
                    <p className="text-gold text-sm font-bold tracking-widest">{product.priceRange}</p>
                  </div>

                  <div className="flex flex-col gap-3">
                    <button className="w-full border border-gold/30 text-ivory py-3 text-[10px] uppercase font-bold tracking-widest hover:border-gold transition-all">
                        View Details
                    </button>
                    <button 
                        onClick={() => navigate('/room-viewer', { state: { preselect: product.id } })}
                        className="w-full bg-gold text-bg-primary py-4 text-[10px] uppercase font-bold tracking-widest hover:bg-white transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2"
                    >
                        Try in 3D Room <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Section C: CTA Banner */}
          <div className="mt-32 bg-bg-tertiary p-12 md:p-20 text-center gold-border relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gold opacity-[0.02] rounded-full blur-3xl pointer-events-none" />
            <h2 className="text-4xl md:text-6xl font-serif text-white mb-8 italic relative z-10 leading-tight">
                Can't decide? <br /> Try them all in our 3D Studio.
            </h2>
            <button 
                onClick={() => navigate('/room-viewer')}
                className="bg-gold text-bg-primary px-12 py-5 rounded-none uppercase tracking-[0.3em] font-bold text-xs hover:bg-white transition-all transform hover:scale-105 relative z-10 shadow-2xl shadow-gold/20"
            >
                Open Room Viewer →
            </button>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Products;
