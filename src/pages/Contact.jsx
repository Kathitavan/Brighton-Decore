import React, { useState } from 'react';
import PageTransition from '../components/common/PageTransition';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, ChevronDown } from 'lucide-react';

const faq = [
  { q: 'Do you offer free measurement?', a: 'Yes — we offer free in-home measurement to all customers in Saskatoon and surrounding areas. No obligation, no cost.' },
  { q: 'How long does installation take?', a: 'Most residential installations are completed in a single visit, typically 1–3 hours depending on the number of windows.' },
  { q: 'Are motorized blinds available?', a: 'Yes — motorized options are available for roller, zebra, and honeycomb blinds. Compatible with most smart home systems.' },
  { q: 'Can you cover large patio doors?', a: 'Absolutely. Our vertical blinds are specifically designed for large windows and sliding patio doors.' },
  { q: 'Do you offer commercial installations?', a: 'Yes — we handle large-scale commercial projects for offices, retail, and hospitality across Saskatoon.' },
  { q: 'What is your service area?', a: 'We primarily serve Saskatoon and surrounding Saskatchewan communities. Contact us to confirm coverage.' },
];

const Contact = () => {
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [formData, setFormData] = useState({
    name: '', phone: '', email: '', city: '', service: '', message: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic here
    alert('Thank you! We\'ll be in touch within a few hours.');
  };

  return (
    <PageTransition>
      <div className="pt-32 pb-24 px-6 md:px-12 min-h-screen" style={{ background: '#0A1628' }}>
        <div className="max-w-7xl mx-auto">

          {/* Hero */}
          <div className="text-center mb-16">
            <span className="section-label">Get In Touch</span>
            <h1 className="text-5xl md:text-7xl font-serif text-white mt-4 italic mb-6 leading-tight">
              Book Your Free<br />Measurement
            </h1>
            <p className="text-sm max-w-xl mx-auto" style={{ color: '#C8C0B0' }}>
              Fill the form or call us directly. We'll schedule a visit at a time that suits you.
            </p>
          </div>

          {/* Split Layout: Form + Info */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="p-8 md:p-12"
              style={{ background: '#0F1E38', border: '1px solid rgba(196,162,101,0.2)' }}
            >
              <h3 className="text-3xl font-serif text-white mb-8">Request Free Measurement</h3>
              <form className="space-y-5" onSubmit={handleSubmit}>

                {/* Row 1: Name + Phone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold" style={{ color: '#C4A265' }}>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Smith"
                      className="w-full p-4 text-sm outline-none transition-colors"
                      style={{ background: '#162844', border: '1px solid rgba(196,162,101,0.15)', color: '#F5F2EC' }}
                      onFocus={(e) => e.target.style.borderColor = '#C4A265'}
                      onBlur={(e) => e.target.style.borderColor = 'rgba(196,162,101,0.15)'}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold" style={{ color: '#C4A265' }}>
                      Phone *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 (306) 000-0000"
                      className="w-full p-4 text-sm outline-none transition-colors"
                      style={{ background: '#162844', border: '1px solid rgba(196,162,101,0.15)', color: '#F5F2EC' }}
                      onFocus={(e) => e.target.style.borderColor = '#C4A265'}
                      onBlur={(e) => e.target.style.borderColor = 'rgba(196,162,101,0.15)'}
                    />
                  </div>
                </div>

                {/* Row 2: Email + City */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold" style={{ color: '#C4A265' }}>
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className="w-full p-4 text-sm outline-none transition-colors"
                      style={{ background: '#162844', border: '1px solid rgba(196,162,101,0.15)', color: '#F5F2EC' }}
                      onFocus={(e) => e.target.style.borderColor = '#C4A265'}
                      onBlur={(e) => e.target.style.borderColor = 'rgba(196,162,101,0.15)'}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold" style={{ color: '#C4A265' }}>
                      City / Area *
                    </label>
                    <input
                      type="text"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="Saskatoon"
                      className="w-full p-4 text-sm outline-none transition-colors"
                      style={{ background: '#162844', border: '1px solid rgba(196,162,101,0.15)', color: '#F5F2EC' }}
                      onFocus={(e) => e.target.style.borderColor = '#C4A265'}
                      onBlur={(e) => e.target.style.borderColor = 'rgba(196,162,101,0.15)'}
                    />
                  </div>
                </div>

                {/* Service Dropdown */}
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold" style={{ color: '#C4A265' }}>
                    Service Needed *
                  </label>
                  <select
                    name="service"
                    required
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full p-4 text-sm outline-none transition-colors"
                    style={{ background: '#162844', border: '1px solid rgba(196,162,101,0.15)', color: formData.service ? '#F5F2EC' : '#8A8070' }}
                    onFocus={(e) => e.target.style.borderColor = '#C4A265'}
                    onBlur={(e) => e.target.style.borderColor = 'rgba(196,162,101,0.15)'}
                  >
                    <option value="">Select a service...</option>
                    <option value="blinds">Window Blinds</option>
                    <option value="curtains">Dream Curtains</option>
                    <option value="flooring">Flooring</option>
                    <option value="unsure">Not Sure — Need Advice</option>
                  </select>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold" style={{ color: '#C4A265' }}>
                    Message (Optional)
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your home, number of windows, or anything else..."
                    className="w-full p-4 text-sm outline-none transition-colors resize-none"
                    style={{ background: '#162844', border: '1px solid rgba(196,162,101,0.15)', color: '#F5F2EC' }}
                    onFocus={(e) => e.target.style.borderColor = '#C4A265'}
                    onBlur={(e) => e.target.style.borderColor = 'rgba(196,162,101,0.15)'}
                  />
                </div>

                <button
                  type="submit"
                  className="btn-gold w-full py-5 uppercase tracking-[0.3em] font-bold text-xs rounded-none transition-all active:scale-95"
                >
                  Request Free Measurement
                </button>

                <p className="text-[10px] text-center" style={{ color: '#8A8070' }}>
                  We typically respond within a few hours during business hours (Mon–Fri 9AM–5PM).
                </p>
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-10"
            >
              <div>
                <h3 className="text-3xl font-serif text-white mb-8">Contact Information</h3>
                <div className="space-y-7">
                  {[
                    { icon: MapPin, title: 'Address', val: '2911B Cleveland Avenue\nSaskatoon, Saskatchewan, Canada' },
                    { icon: Phone, title: 'Call Us', val: '+1 (306) 580-6476', href: 'tel:+13065806476' },
                    { icon: Mail, title: 'Email Us', val: 'Shoieb@brightondecor.co', href: 'mailto:Shoieb@brightondecor.co' },
                    { icon: Clock, title: 'Business Hours', val: 'Mon–Fri: 9:00 AM – 5:00 PM\nSat–Sun: By Appointment' },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-5">
                      <div
                        className="w-12 h-12 flex items-center justify-center rounded-full flex-shrink-0"
                        style={{ background: 'rgba(196,162,101,0.1)', color: '#C4A265' }}
                      >
                        <item.icon size={20} />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-widest font-bold mb-1" style={{ color: '#C4A265' }}>
                          {item.title}
                        </p>
                        {item.href ? (
                          <a href={item.href} className="font-light text-lg text-white hover:text-gold transition-colors" style={{ whiteSpace: 'pre-line' }}>
                            {item.val}
                          </a>
                        ) : (
                          <p className="font-light text-base text-white" style={{ whiteSpace: 'pre-line' }}>{item.val}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Google Maps Embed */}
              <div style={{ border: '1px solid rgba(196,162,101,0.2)' }}>
                <iframe
                  title="Brighton Decor Saskatoon location"
                  src="https://maps.google.com/maps?q=2911B+Cleveland+Avenue+Saskatoon+SK+Canada&output=embed"
                  width="100%"
                  height="260"
                  style={{ border: 'none', display: 'block' }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              {/* WhatsApp CTA */}
              <a
                href="https://wa.me/13065806476"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 py-5 text-sm uppercase tracking-widest font-bold transition-all hover:opacity-90"
                style={{ background: '#25D366', color: 'white' }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Chat on WhatsApp
              </a>
            </motion.div>
          </div>

          {/* FAQ Section */}
          <div className="max-w-4xl mx-auto pt-16" style={{ borderTop: '1px solid rgba(196,162,101,0.1)' }}>
            <div className="text-center mb-12">
              <span className="section-label">Questions</span>
              <h2 className="text-4xl font-serif text-white mt-4">
                Common <span className="italic" style={{ color: '#C4A265' }}>Questions</span>
              </h2>
            </div>

            <div className="space-y-3">
              {faq.map((item, i) => (
                <div
                  key={i}
                  className="overflow-hidden"
                  style={{ background: '#0F1E38', border: '1px solid rgba(196,162,101,0.1)' }}
                >
                  <button
                    className="w-full flex items-center justify-between p-6 text-left"
                    onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                  >
                    <span className="text-white font-serif text-lg pr-4">{item.q}</span>
                    <ChevronDown
                      size={20}
                      className="flex-shrink-0 transition-transform duration-300"
                      style={{
                        color: '#C4A265',
                        transform: expandedFaq === i ? 'rotate(180deg)' : 'rotate(0deg)',
                      }}
                    />
                  </button>
                  <AnimatePresence>
                    {expandedFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div
                          className="px-6 pb-6 text-sm leading-relaxed pt-2"
                          style={{ color: '#C8C0B0', borderTop: '1px solid rgba(196,162,101,0.08)' }}
                        >
                          {item.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Contact;
