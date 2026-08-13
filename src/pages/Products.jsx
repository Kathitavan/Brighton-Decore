import React from 'react';
import PageTransition from '../components/common/PageTransition';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import { PRODUCTS } from '../data/products';

const Products = () => {
  return (
    <PageTransition>
      <div className="pt-32 pb-24 px-6 md:px-12 min-h-screen" style={{ background: '#0A1628' }}>
        <div className="max-w-7xl mx-auto">

          {/* Page Hero */}
          <div className="text-center mb-20 pb-12" style={{ borderBottom: '1px solid rgba(196,162,101,0.1)' }}>
            <span className="section-label">Our Collection</span>
            <h1 className="text-5xl md:text-7xl font-serif text-white mb-6 mt-4 italic">
              Window Blinds &amp; Curtains
            </h1>
            <p className="text-lg md:text-xl font-light max-w-2xl mx-auto" style={{ color: '#C8C0B0' }}>
              Seven premium window treatment solutions, custom measured and professionally
              installed across Saskatoon and Saskatchewan.
            </p>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {PRODUCTS.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08 }}
                viewport={{ once: true }}
                className="flex flex-col group"
                style={{ border: '1px solid rgba(196,162,101,0)', transition: 'border-color 0.4s' }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = 'rgba(196,162,101,0.2)'}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(196,162,101,0)'}
              >
                {/* Image */}
                <div className="aspect-[4/3] overflow-hidden relative" style={{ background: '#162844' }}>
                  <img
                    src={product.image}
                    alt={`${product.name} — Brighton Decor Saskatoon`}
                    loading="lazy"
                    decoding="async"
                    width={400}
                    height={300}
                    className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
                  />
                  <div
                    className="absolute top-4 left-4 text-[8px] uppercase font-bold tracking-widest px-2 py-1"
                    style={{ background: '#C4A265', color: '#0A1628' }}
                  >
                    Brighton Decor
                  </div>
                  {product.motorized && (
                    <div
                      className="absolute top-4 right-4 text-[8px] uppercase font-bold tracking-widest px-2 py-1"
                      style={{ background: 'rgba(10,22,40,0.8)', color: '#C4A265', border: '1px solid rgba(196,162,101,0.4)' }}
                    >
                      Motorized ✓
                    </div>
                  )}
                </div>

                {/* Content */}
                <div
                  className="p-8 flex-1 flex flex-col"
                  style={{ background: '#0F1E38' }}
                >
                  <h3
                    className="text-2xl font-serif text-white mb-3 transition-colors group-hover:text-gold"
                    style={{ color: 'white' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#C4A265'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'white'}
                  >
                    {product.name}
                  </h3>
                  <p className="text-sm leading-relaxed mb-6 italic flex-none" style={{ color: '#C8C0B0' }}>
                    {product.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-3 mb-6 flex-1">
                    {product.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-3 text-[11px] uppercase tracking-widest font-bold" style={{ color: 'rgba(200,192,176,0.7)' }}>
                        <Check size={13} style={{ color: '#C4A265' }} className="shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Colors */}
                  <div className="mb-6 pt-4" style={{ borderTop: '1px solid rgba(196,162,101,0.1)' }}>
                    <p className="text-[10px] uppercase tracking-widest font-bold mb-2" style={{ color: '#C4A265' }}>
                      Available Colors
                    </p>
                    <p className="text-xs" style={{ color: '#C8C0B0' }}>{product.colors.join(' · ')}</p>
                  </div>

                  {/* Warranty */}
                  <div className="mb-8">
                    <p className="text-[10px] uppercase tracking-widest font-bold mb-1" style={{ color: '#C4A265' }}>
                      Warranty
                    </p>
                    <p className="text-xs" style={{ color: '#C8C0B0' }}>{product.warranty}</p>
                  </div>

                  {/* CTA */}
                  <Link to="/contact">
                    <button
                      className="w-full py-4 text-[10px] uppercase font-bold tracking-widest flex items-center justify-center gap-2 transition-all hover:opacity-90 rounded-none"
                      style={{ background: '#C4A265', color: '#0A1628' }}
                    >
                      Get a Free Quote <ArrowRight size={13} />
                    </button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div
            className="mt-24 p-12 md:p-20 text-center relative overflow-hidden"
            style={{ background: '#0F1E38', border: '1px solid rgba(196,162,101,0.2)' }}
          >
            <div className="absolute top-0 left-0 w-full h-[1px]" style={{ background: 'linear-gradient(90deg, transparent, #C4A265, transparent)' }} />
            <h2 className="text-4xl md:text-5xl font-serif text-white mb-6 italic leading-tight">
              Not sure which blind is right<br />for your home?
            </h2>
            <p className="mb-10 max-w-xl mx-auto" style={{ color: '#C8C0B0' }}>
              Book a free in-home measurement. We'll assess your windows, your light needs,
              and recommend the perfect product for every room.
            </p>
            <Link to="/contact">
              <button className="btn-gold px-14 py-5 rounded-none uppercase tracking-[0.3em] font-bold text-xs shadow-xl">
                Book Free Measurement →
              </button>
            </Link>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Products;
