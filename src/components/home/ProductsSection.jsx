import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Check, ArrowRight } from 'lucide-react';
import { PRODUCTS } from '../../data/products';

const ProductsSection = () => {
  return (
    <section className="py-24 px-6 md:px-12 border-y" style={{ background: '#0F1E38', borderColor: 'rgba(196,162,101,0.1)' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <span className="section-label">Our Products</span>
            <h2 className="text-4xl md:text-5xl font-serif text-white mt-4 italic">
              Window Blinds &amp; <span style={{ color: '#C4A265' }}>Curtains</span>
            </h2>
          </div>
          <Link to="/products">
            <button
              className="text-xs uppercase font-bold tracking-widest pb-1 transition-all hover:opacity-80"
              style={{ color: '#C4A265', borderBottom: '1px solid rgba(196,162,101,0.4)' }}
            >
              View All 7 Products
            </button>
          </Link>
        </div>

        {/* 3D Flip Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {PRODUCTS.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
              viewport={{ once: true }}
              className="flip-card h-80"
            >
              <div className="flip-card-inner w-full h-full">
                {/* Front */}
                <div
                  className="flip-card-front w-full h-full relative overflow-hidden"
                  style={{ border: '1px solid rgba(196,162,101,0.15)' }}
                >
                  <img
                    src={product.image}
                    alt={`${product.name} — Brighton Decor Saskatoon`}
                    loading="lazy"
                    decoding="async"
                    width={400}
                    height={320}
                    className="w-full h-full object-cover"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(10,22,40,0.9) 0%, rgba(10,22,40,0.2) 60%)' }} />

                  {/* Badge */}
                  {product.motorized && (
                    <div
                      className="absolute top-3 right-3 text-[9px] uppercase font-bold tracking-widest px-2 py-1"
                      style={{ background: '#C4A265', color: '#0A1628' }}
                    >
                      Motorized
                    </div>
                  )}

                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="text-xl font-serif text-white mb-1">{product.name}</h3>
                    <p className="text-xs" style={{ color: '#C8C0B0' }}>{product.shortDesc}</p>
                  </div>

                  {/* Hover hint */}
                  <div className="absolute top-3 left-3 text-[9px] uppercase tracking-widest font-bold opacity-60"
                    style={{ color: '#C4A265' }}>
                    Hover to view →
                  </div>
                </div>

                {/* Back */}
                <div
                  className="flip-card-back w-full h-full flex flex-col justify-between p-6"
                  style={{ background: '#162844', border: '1px solid rgba(196,162,101,0.3)' }}
                >
                  <div>
                    <h3 className="text-xl font-serif text-white mb-3">{product.name}</h3>
                    <p className="text-xs leading-relaxed mb-4" style={{ color: '#C8C0B0' }}>
                      {product.description.substring(0, 120)}...
                    </p>
                    <ul className="space-y-2">
                      {product.features.slice(0, 3).map((f, i) => (
                        <li key={i} className="flex items-center gap-2 text-[10px] uppercase tracking-wider font-bold"
                          style={{ color: '#C8C0B0' }}>
                          <Check size={12} style={{ color: '#C4A265' }} />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link to="/contact" className="block mt-4">
                    <button
                      className="w-full py-3 text-[10px] uppercase font-bold tracking-widest flex items-center justify-center gap-2 transition-all hover:opacity-90"
                      style={{ background: '#C4A265', color: '#0A1628' }}
                    >
                      Get a Quote <ArrowRight size={12} />
                    </button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
