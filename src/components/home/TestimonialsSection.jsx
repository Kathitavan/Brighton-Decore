import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const reviews = [
  {
    name: 'Sarah M.',
    city: 'Saskatoon',
    initials: 'SM',
    text: 'Brighton Decor installed roller blinds in our entire home. The team was professional, clean, and fast. The blinds look absolutely beautiful — exactly what we wanted!',
    rating: 5,
  },
  {
    name: 'James K.',
    city: 'Saskatoon',
    initials: 'JK',
    text: 'Shoieb came for the free measurement and was incredibly helpful. He recommended the perfect zebra blinds for our living room. Couldn\'t be happier with the result.',
    rating: 5,
  },
  {
    name: 'Priya R.',
    city: 'Saskatoon, SK',
    initials: 'PR',
    text: 'We needed waterproof blinds for the kitchen and bathrooms. Brighton Decor\'s PVC blinds are perfect — wipe clean in seconds. Highly recommend for any wet areas.',
    rating: 5,
  },
  {
    name: 'Michael T.',
    city: 'Saskatchewan',
    initials: 'MT',
    text: 'Had honeycomb blinds installed before winter — what a difference! The insulation is incredible. Our heating bills have noticeably dropped. Amazing product and service.',
    rating: 5,
  },
  {
    name: 'Lisa B.',
    city: 'Saskatoon',
    initials: 'LB',
    text: 'The Dream Curtains collection is stunning. Custom made to our exact measurements and professionally fitted. Brighton Decor transformed our living room completely.',
    rating: 5,
  },
  {
    name: 'Ahmed N.',
    city: 'Saskatoon, SK',
    initials: 'AN',
    text: 'We used Brighton Decor for our office blinds — a large commercial project. Everything was measured and installed on time, on budget. Excellent communication throughout.',
    rating: 5,
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-24 px-6 md:px-12" style={{ background: '#0A1628' }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="section-label">Client Reviews</span>
          <h2 className="text-4xl md:text-5xl font-serif text-white mt-4">
            What Saskatoon <span className="italic" style={{ color: '#C4A265' }}>Says</span>
          </h2>
          <p className="text-sm mt-4" style={{ color: '#C8C0B0' }}>
            Reviews from our Google Business profile
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
              viewport={{ once: true }}
              className="p-8 flex flex-col"
              style={{ background: '#0F1E38', border: '1px solid rgba(196,162,101,0.12)' }}
            >
              {/* Stars */}
              <div className="flex gap-1 mb-5">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star key={i} size={14} fill="#C4A265" style={{ color: '#C4A265' }} />
                ))}
              </div>

              {/* Review text */}
              <p className="text-sm leading-relaxed flex-1 italic mb-6" style={{ color: '#C8C0B0' }}>
                "{review.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold font-serif"
                  style={{ background: 'rgba(196,162,101,0.15)', color: '#C4A265', border: '1px solid rgba(196,162,101,0.3)' }}
                >
                  {review.initials}
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">{review.name}</p>
                  <p className="text-[10px] uppercase tracking-wider" style={{ color: '#8A8070' }}>{review.city}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Google CTA */}
        <div className="text-center mt-12">
          <a
            href="https://maps.app.goo.gl/5iuFnetoc1zvR1oF7"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold pb-1 transition-all hover:opacity-80"
            style={{ color: '#C4A265', borderBottom: '1px solid rgba(196,162,101,0.3)' }}
          >
            View All Reviews on Google →
          </a>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
