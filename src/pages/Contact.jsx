// src/pages/Contact.jsx
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Phone, Mail, MapPin, Send, Clock, ChevronDown, Ruler, Sparkles, CheckCircle2, ShieldCheck, Navigation } from 'lucide-react';
import PageTransition from '../components/common/PageTransition';
import WorldGlobe from '../components/contact/WorldGlobe';
import ModernMap from '../components/contact/ModernMap';
import { company, faqItems } from '../config/company';
import styles from '../styles/pages/contact.module.css';

const Contact = () => {
  const [formState, setFormState] = useState({
    name: '', email: '', phone: '', service: '', message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState(null);
  const formRef = useRef(null);
  const isInView = useInView(formRef, { once: true, margin: '-50px' });

  const handleChange = (e) => setFormState({ ...formState, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <PageTransition>
      <div className={styles.contactPage}>
        
        {/* Ambient Radial Emerald Mesh Orbs */}
        <div className={styles.ambientOrbTop} aria-hidden="true" />
        <div className={styles.ambientOrbBottom} aria-hidden="true" />

        {/* 1. Asymmetric Editorial Hero Section */}
        <section className="relative pt-36 pb-12 px-6 md:px-12 z-10">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col lg:flex-row lg:items-end justify-between gap-8"
            >
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#52B788]/18 border border-[#52B788]/40 mb-6">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#52B788] animate-pulse" />
                  <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#52B788] font-sans">
                    Saskatoon Concierge & Site Measurement
                  </span>
                </div>

                <h1
                  className="font-serif text-white leading-[1.08] mb-6 tracking-tight drop-shadow-lg"
                  style={{ fontSize: 'clamp(2.75rem, 5.5vw, 5rem)' }}
                >
                  Let's Start Your<br />
                  <span className="italic text-[#52B788]">Home Transformation.</span>
                </h1>

                <p className="text-white/80 text-lg md:text-xl font-sans font-light leading-relaxed max-w-xl drop-shadow-md">
                  Reach out to book a complimentary in-home site measurement or visit our 
                  flagship showroom in Saskatoon. We provide personal, tailored service across Canada.
                </p>
              </div>

              {/* Saskatoon Local Time & Availability Badge */}
              <div className="flex flex-col sm:flex-row lg:flex-col gap-3 p-5 rounded-2xl bg-[#0A120E]/90 border border-[#52B788]/30 backdrop-blur-xl max-w-sm">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-[#52B788] animate-ping" />
                  <span className="text-xs font-sans text-white font-bold">Concierge Team Available</span>
                </div>
                <div className="text-[11px] font-mono text-[#52B788]">
                  Saskatoon, SK · CST Time Zone
                </div>
                <div className="text-[10px] uppercase tracking-wider text-white/50 font-sans border-t border-white/10 pt-2 mt-1">
                  1 Business Day Response Guaranteed
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 2. Section 1 (Asymmetric Split: 3D Earth Globe & Contact Desk Cards) */}
        <section className="px-6 md:px-12 py-12 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left 7 Columns: Photorealistic 3D Earth Globe */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.15 }}
                className="lg:col-span-7"
              >
                <WorldGlobe />
              </motion.div>

              {/* Right 5 Columns: Interactive Contact Desk Cards */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.25 }}
                className="lg:col-span-5 space-y-5"
              >
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#52B788] mb-2 block font-sans">
                    Reach Out Directly
                  </span>
                  <h2 className="font-serif text-white text-3xl font-bold mb-4">Showroom & Contacts</h2>
                </div>

                {/* Direct Phone */}
                <div className={styles.infoCard}>
                  <div className={styles.iconBox}>
                    <Phone size={20} />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.2em] text-white/60 font-sans font-semibold mb-1">
                      Phone / WhatsApp
                    </div>
                    <a
                      href={`tel:${company.phoneRaw}`}
                      className="font-serif text-white text-xl hover:text-[#52B788] transition-colors font-bold block"
                    >
                      {company.phone}
                    </a>
                    <span className="text-[11px] text-white/50 font-sans">Mon–Sat: 9 AM – 6 PM</span>
                  </div>
                </div>

                {/* Email */}
                <div className={styles.infoCard}>
                  <div className={styles.iconBox}>
                    <Mail size={20} />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.2em] text-white/60 font-sans font-semibold mb-1">
                      Direct Email
                    </div>
                    <a
                      href={`mailto:${company.email}`}
                      className="font-serif text-white text-lg hover:text-[#52B788] transition-colors font-bold block"
                    >
                      {company.email}
                    </a>
                    <span className="text-[11px] text-white/50 font-sans">Fast Response Guaranteed</span>
                  </div>
                </div>

                {/* Showroom Address */}
                <div className={styles.infoCard}>
                  <div className={styles.iconBox}>
                    <MapPin size={20} />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.2em] text-white/60 font-sans font-semibold mb-1">
                      Flagship Showroom
                    </div>
                    <address className="font-serif text-white text-base not-italic leading-snug">
                      {company.address.street}<br />
                      {company.address.city}, {company.address.province}, {company.address.country}
                    </address>
                  </div>
                </div>

                {/* Hours */}
                <div className={styles.infoCard}>
                  <div className={styles.iconBox}>
                    <Clock size={20} />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.2em] text-white/60 font-sans font-semibold mb-1">
                      Operating Hours
                    </div>
                    <div className="font-serif text-white text-base">
                      {company.hours.weekdays}: {company.hours.time}
                    </div>
                  </div>
                </div>

              </motion.div>

            </div>
          </div>
        </section>

        {/* 3. Section 2 (Asymmetric Split: Modern Map & VIP Concierge Measurement Form) */}
        <section ref={formRef} className="px-6 md:px-12 py-16 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              
              {/* Left 6 Columns: Interactive Modern Map */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8 }}
                className="lg:col-span-6"
              >
                <div className="mb-6">
                  <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#52B788] mb-2 block font-sans">
                    Interactive Navigation
                  </span>
                  <h2 className="font-serif text-white text-3xl font-bold">Find Our Showroom</h2>
                </div>

                <ModernMap />
              </motion.div>

              {/* Right 6 Columns: VIP Concierge Measurement Booking Form */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.15 }}
                className="lg:col-span-6"
              >
                {submitted ? (
                  <div className="h-full min-h-[480px] flex flex-col items-center justify-center text-center p-12 rounded-3xl bg-[#0E1E17]/95 border border-[#52B788]/40 backdrop-blur-2xl shadow-[0_30px_80px_rgba(0,0,0,0.85)]">
                    <div className="w-20 h-20 rounded-full bg-[#52B788]/20 border border-[#52B788] flex items-center justify-center mb-6 text-[#52B788] shadow-[0_0_30px_rgba(82,183,136,0.4)]">
                      <CheckCircle2 size={38} />
                    </div>
                    <h3 className="font-serif text-white text-3xl font-bold mb-3">Measurement Request Confirmed!</h3>
                    <p className="text-white/80 text-base font-sans font-light max-w-md mx-auto leading-relaxed mb-8">
                      Thank you for choosing Brighton Decor Ltd. Our Saskatoon design consultant will contact 
                      you within 24 hours to confirm your free site measurement appointment.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="px-8 py-3 rounded-full bg-[#52B788] text-[#0A120E] font-bold text-xs uppercase tracking-widest font-sans hover:bg-white transition-all"
                    >
                      Book Another Measurement
                    </button>
                  </div>
                ) : (
                  <div className={styles.glassCard}>
                    
                    {/* Live Availability Ticker */}
                    <div className="flex items-center justify-between gap-4 p-3.5 rounded-2xl bg-[#52B788]/15 border border-[#52B788]/40 mb-8">
                      <div className="flex items-center gap-2.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#52B788] animate-pulse" />
                        <span className="text-xs font-sans text-[#52B788] font-bold">
                          3 Free Site Measurement Slots Open This Week
                        </span>
                      </div>
                      <span className="text-[10px] uppercase font-mono tracking-wider text-white/60 hidden sm:inline">
                        Saskatoon Hub
                      </span>
                    </div>

                    <div className="flex items-center gap-3 mb-8">
                      <div className="w-10 h-10 rounded-xl bg-[#52B788]/20 border border-[#52B788]/40 flex items-center justify-center text-[#52B788]">
                        <Ruler size={20} />
                      </div>
                      <div>
                        <h3 className="font-serif text-white text-2xl font-bold">Book Free Site Measurement</h3>
                        <p className="text-white/60 text-xs font-sans">Zero cost · Professional measurement · Guaranteed precision</p>
                      </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label htmlFor="contact-name" className="text-[11px] uppercase tracking-[0.2em] text-white/70 font-sans font-bold">
                            Full Name *
                          </label>
                          <input
                            id="contact-name"
                            name="name"
                            type="text"
                            required
                            value={formState.name}
                            onChange={handleChange}
                            placeholder="Jane Smith"
                            className={styles.formInput}
                          />
                        </div>

                        <div className="space-y-2">
                          <label htmlFor="contact-email" className="text-[11px] uppercase tracking-[0.2em] text-white/70 font-sans font-bold">
                            Email Address *
                          </label>
                          <input
                            id="contact-email"
                            name="email"
                            type="email"
                            required
                            value={formState.email}
                            onChange={handleChange}
                            placeholder="jane@example.com"
                            className={styles.formInput}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label htmlFor="contact-phone" className="text-[11px] uppercase tracking-[0.2em] text-white/70 font-sans font-bold">
                            Phone Number
                          </label>
                          <input
                            id="contact-phone"
                            name="phone"
                            type="tel"
                            value={formState.phone}
                            onChange={handleChange}
                            placeholder="+1 (306) 000-0000"
                            className={styles.formInput}
                          />
                        </div>

                        <div className="space-y-2">
                          <label htmlFor="contact-service" className="text-[11px] uppercase tracking-[0.2em] text-white/70 font-sans font-bold">
                            Service Interested In
                          </label>
                          <select
                            id="contact-service"
                            name="service"
                            value={formState.service}
                            onChange={handleChange}
                            className={styles.formInput}
                          >
                            <option value="" className="bg-[#0A120E] text-white">Select a service...</option>
                            <option className="bg-[#0A120E] text-white">Window Blinds (Roller, Zebra, Honeycomb)</option>
                            <option className="bg-[#0A120E] text-white">Custom Window Coverings</option>
                            <option className="bg-[#0A120E] text-white">Luxury Flooring Supply</option>
                            <option className="bg-[#0A120E] text-white">Professional Flooring Installation</option>
                            <option className="bg-[#0A120E] text-white">Full Home Interior Package</option>
                            <option className="bg-[#0A120E] text-white">Design Consultation</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="contact-message" className="text-[11px] uppercase tracking-[0.2em] text-white/70 font-sans font-bold">
                          Tell Us About Your Home Project
                        </label>
                        <textarea
                          id="contact-message"
                          name="message"
                          rows={4}
                          value={formState.message}
                          onChange={handleChange}
                          placeholder="Number of windows, room types, preferred style, estimated timeframe..."
                          className={`${styles.formInput} resize-none`}
                        />
                      </div>

                      <button
                        type="submit"
                        id="contact-submit"
                        className={styles.primaryBtn}
                      >
                        <span className="flex items-center justify-center gap-3">
                          <span>Confirm Measurement Booking</span>
                          <Send size={15} />
                        </span>
                      </button>

                      <div className="flex items-center justify-center gap-6 pt-2 text-[#52B788] text-[11px] font-sans">
                        <span className="flex items-center gap-1.5">
                          <ShieldCheck size={14} /> Free Site Measurement
                        </span>
                        <span className="flex items-center gap-1.5">
                          <CheckCircle2 size={14} /> No Obligation Quote
                        </span>
                      </div>
                    </form>
                  </div>
                )}
              </motion.div>

            </div>
          </div>
        </section>

        {/* 4. Section 3 (Interactive Emerald FAQ Section) */}
        <section className="px-6 md:px-12 py-20 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14">
              <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#52B788] mb-3 block font-sans">
                Clear Answers · Customer Assurance
              </span>
              <h2 className="font-serif text-white text-3xl md:text-4xl font-bold">Frequently Asked Questions</h2>
            </div>

            <div className="space-y-4">
              {faqItems.slice(0, 6).map((item, i) => (
                <div
                  key={i}
                  className="rounded-2xl bg-white/[0.02] border border-[#52B788]/25 overflow-hidden transition-all duration-300 hover:border-[#52B788]/60"
                >
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                    className="w-full flex items-center justify-between gap-6 p-6 text-left"
                    aria-expanded={expandedFaq === i}
                  >
                    <span className={`font-sans text-base font-semibold transition-colors ${expandedFaq === i ? 'text-[#52B788]' : 'text-white'}`}>
                      {item.q}
                    </span>
                    <div className={`w-8 h-8 rounded-full bg-[#52B788]/15 border border-[#52B788]/35 flex items-center justify-center text-[#52B788] flex-shrink-0 transition-transform duration-300 ${expandedFaq === i ? 'rotate-180 bg-[#52B788] text-[#0A120E]' : ''}`}>
                      <ChevronDown size={16} />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {expandedFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 pt-1 text-white/80 text-sm font-sans leading-relaxed border-t border-white/10">
                          {item.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </section>

      </div>
    </PageTransition>
  );
};

export default Contact;
