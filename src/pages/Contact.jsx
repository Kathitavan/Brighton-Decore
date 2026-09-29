import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Phone, Mail, MapPin, Send, Clock, ChevronDown, Ruler, Sparkles, CheckCircle2, ShieldCheck, Navigation, AlertCircle, Loader2 } from 'lucide-react';
import PageTransition from '../components/common/PageTransition';
import SEO from '../components/common/SEO';
import WorldGlobe from '../components/contact/WorldGlobe';
import ModernMap from '../components/contact/ModernMap';
import InnovativeAddressBlock from '../components/common/InnovativeAddressBlock';
import { company, faqItems } from '../config/company';
import { submitLead } from '../services/leadService';
import styles from '../styles/pages/contact.module.css';

const Contact = () => {
  const location = useLocation();
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
    website: '', // Honeypot field
    preferredDate: '',
    preferredTime: '',
  });

  const [leadType, setLeadType] = useState('general');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [referenceId, setReferenceId] = useState('');
  const [expandedFaq, setExpandedFaq] = useState(null);
  const formRef = useRef(null);
  const isInView = useInView(formRef, { once: true, margin: '-50px' });

  // Handle incoming route handshakes (3D studio, quote, measurement, team)
  useEffect(() => {
    const state = location.state || {};
    const determinedType = state.type || (state.roomLook ? '3d_studio' : 'general');
    setLeadType(determinedType);

    if (determinedType === '3d_studio' && state.roomLook) {
      const { blindType, curtainColor, floorType, wallColor } = state.roomLook;
      setFormState((prev) => ({
        ...prev,
        service: 'Window Blinds & Custom Room Look',
        message: `Inquiry from 3D Room Studio:\n• Blinds: ${blindType || 'None'}\n• Drapery: ${curtainColor !== 'none' ? 'Yes' : 'None'}\n• Room Floor Tone: ${floorType || 'Standard'}\n• Wall Tone: ${wallColor || '#F5F0E8'}\nLooking for an in-home measurement and detailed quote.`,
      }));
    } else if (determinedType === 'quote') {
      setFormState((prev) => ({
        ...prev,
        service: state.category ? `${state.category} Quote` : 'Product Price Quote',
        message: state.message || `Price quote inquiry for: ${state.productName || 'Custom Product'}${state.productId ? ` (${state.productId})` : ''}${state.finish ? ` in ${state.finish} finish` : ''}.`,
      }));
    } else if (determinedType === 'measurement') {
      setFormState((prev) => ({
        ...prev,
        service: state.serviceName || 'Free Site Measurement',
        message: state.message || 'Requesting a complimentary in-home site measurement and consultation.',
      }));
    } else if (determinedType === 'team') {
      setFormState((prev) => ({
        ...prev,
        service: 'Design Consultation',
        message: state.message || 'Inquiry from website: Talk to Our Team about custom fabrications.',
      }));
    }
  }, [location.state]);

  const handleChange = (e) => setFormState({ ...formState, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const payload = {
        type: leadType,
        name: formState.name,
        email: formState.email,
        phone: formState.phone,
        message: formState.message,
        website: formState.website, // Honeypot (silent drop if filled)
      };

      if (leadType === '3d_studio') {
        payload.roomLook = location.state?.roomLook;
        payload.screenshotBase64 = location.state?.screenshotBase64;
      } else if (leadType === 'quote') {
        payload.productName = location.state?.productName;
        payload.productId = location.state?.productId;
      } else if (leadType === 'measurement') {
        payload.serviceName = location.state?.serviceName || formState.service;
        payload.preferredDate = formState.preferredDate;
        payload.preferredTime = formState.preferredTime;
      }

      const res = await submitLead(payload);
      setReferenceId(res.referenceId);
      setSubmitted(true);
    } catch (err) {
      console.error('[Lead Submission Error]:', err);
      setError(err.message || 'Unable to submit your request. Please call us directly at +1 (306) 580-6476.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageTransition>
      <SEO
        title="Book a Free Site Measurement & Consultation"
        description="Schedule your complimentary zero-cost, no-obligation window measurement and custom window decor consultation with Brighton Decor Ltd in Saskatoon, SK. Call +1 (306) 580-6476."
      />
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
                  flagship office in Saskatoon. We provide personal, tailored service across Canada.
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
                  <h2 className="font-serif text-white text-3xl font-bold mb-4">Office & Contacts</h2>
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

                {/* Office Address — Innovative Interactive Block */}
                <InnovativeAddressBlock
                  variant="card"
                  accentColor="#52B788"
                  className="mb-1"
                />

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
                  <h2 className="font-serif text-white text-3xl font-bold">Find Our Office</h2>
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
                  <div className="h-full min-h-[480px] flex flex-col items-center justify-center text-center p-8 md:p-12 rounded-3xl bg-[#0E1E17]/95 border border-[#52B788]/40 backdrop-blur-2xl shadow-[0_30px_80px_rgba(0,0,0,0.85)]">
                    <div className="w-20 h-20 rounded-full bg-[#52B788]/20 border border-[#52B788] flex items-center justify-center mb-6 text-[#52B788] shadow-[0_0_30px_rgba(82,183,136,0.4)]">
                      <CheckCircle2 size={38} />
                    </div>

                    <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#52B788]/20 border border-[#52B788] mb-5">
                      <span className="text-xs uppercase font-mono tracking-[0.2em] text-[#52B788] font-bold">
                        REFERENCE: {referenceId}
                      </span>
                    </div>

                    <h3 className="font-serif text-white text-3xl font-bold mb-3">Request Confirmed!</h3>
                    <p className="text-white/80 text-base font-sans font-light max-w-md mx-auto leading-relaxed mb-4">
                      Thank you for choosing Brighton Decor Ltd. A confirmation receipt has been dispatched to{' '}
                      <strong className="text-[#52B788]">{formState.email}</strong>.
                    </p>
                    <p className="text-white/60 text-xs font-sans max-w-sm mx-auto mb-8">
                      Our Saskatoon design concierge will contact you within 1 business day to confirm your details.
                    </p>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setReferenceId('');
                      }}
                      className="px-8 py-3 rounded-full bg-[#52B788] text-[#0A120E] font-bold text-xs uppercase tracking-widest font-sans hover:bg-white transition-all shadow-lg"
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                ) : (
                  <div className={styles.glassCard}>
                    
                    {/* Live Availability Ticker */}
                    <div className="flex items-center justify-between gap-4 p-3.5 rounded-2xl bg-[#52B788]/15 border border-[#52B788]/40 mb-8">
                      <div className="flex items-center gap-2.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#52B788] animate-pulse" />
                        <span className="text-xs font-sans text-[#52B788] font-bold">
                          {leadType === '3d_studio' ? '3D Studio Look Loaded' : (leadType === 'quote' ? 'Priority Quote Queue Active' : '3 Free Site Measurement Slots Open This Week')}
                        </span>
                      </div>
                      <span className="text-[10px] uppercase font-mono tracking-wider text-white/60 hidden sm:inline">
                        Saskatoon Hub
                      </span>
                    </div>

                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-xl bg-[#52B788]/20 border border-[#52B788]/40 flex items-center justify-center text-[#52B788]">
                        <Ruler size={20} />
                      </div>
                      <div>
                        <h3 className="font-serif text-white text-2xl font-bold">
                          {leadType === '3d_studio' ? 'Finalize Your 3D Look' : (leadType === 'quote' ? 'Request Product Quote' : (leadType === 'team' ? 'Connect With Our Team' : 'Book Free Site Measurement'))}
                        </h3>
                        <p className="text-white/60 text-xs font-sans">Zero cost · Professional measurement · Guaranteed precision</p>
                      </div>
                    </div>

                    {/* Error Banner */}
                    {error && (
                      <div className="mb-6 p-4 rounded-xl bg-red-500/15 border border-red-500/40 text-red-200 text-xs font-sans flex items-start gap-3">
                        <AlertCircle size={16} className="text-red-400 shrink-0 mt-0.5" />
                        <div>
                          <strong>Submission Note:</strong> {error}
                        </div>
                      </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Anti-spam Honeypot field (hidden from legitimate humans) */}
                      <div className="hidden" aria-hidden="true" style={{ display: 'none', position: 'absolute', left: '-9999px' }}>
                        <label htmlFor="contact-website">Leave this field blank</label>
                        <input
                          id="contact-website"
                          name="website"
                          type="text"
                          tabIndex={-1}
                          autoComplete="off"
                          value={formState.website}
                          onChange={handleChange}
                        />
                      </div>

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
                            <option className="bg-[#0A120E] text-white">Window Blinds & Custom Room Look</option>
                            <option className="bg-[#0A120E] text-white">Window Blinds (Roller, Zebra, Honeycomb)</option>
                            <option className="bg-[#0A120E] text-white">Custom Drapery & Curtains</option>
                            <option className="bg-[#0A120E] text-white">Smart Motorized Shading & Automation</option>
                            <option className="bg-[#0A120E] text-white">Full Home Window Treatment Package</option>
                            <option className="bg-[#0A120E] text-white">Free Site Measurement & Consultation</option>
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
                        disabled={loading}
                        className={`${styles.primaryBtn} ${loading ? 'opacity-70 cursor-wait' : ''}`}
                      >
                        <span className="flex items-center justify-center gap-3">
                          {loading ? (
                            <>
                              <Loader2 size={16} className="animate-spin text-[#0A120E]" />
                              <span>Transmitting Request...</span>
                            </>
                          ) : (
                            <>
                              <span>
                                {leadType === 'quote'
                                  ? 'Request Price Quote'
                                  : (leadType === 'team'
                                    ? 'Connect With Design Team'
                                    : 'Confirm Measurement Booking')}
                              </span>
                              <Send size={15} />
                            </>
                          )}
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
