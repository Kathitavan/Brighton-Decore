import React, { useState } from 'react';
import PageTransition from '../components/common/PageTransition';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Mail, MapPin, Send, MessageSquare, ChevronDown, Calendar } from 'lucide-react';

const faq = [
  { q: "How long does a typical project take?", a: "Project timelines vary based on scope. A standard 3BHK typically takes 45-60 working days from design sign-off to handover." },
  { q: "Do you charge for the initial consultation?", a: "The first site visit and consultation are complimentary. After that, we provide a detailed quote based on your requirements." },
  { q: "Can I customize the modular kitchen in a package?", a: "Absolutely! All our packages are highly customizable. You can choose from a wide range of shutters, finishes, and hardware." },
  { q: "Where are your factories located?", a: "We have state-of-the-art manufacturing facilities in Pune and Bangalore, ensuring consistent quality and timelines." },
  { q: "Do you provide design-only services?", a: "Yes, we offer design-only consultancy for clients who prefer to manage their own execution, though we recommend our turnkey solutions for the best results." },
];

const Contact = () => {
  const [expandedFaq, setExpandedFaq] = useState(null);

  return (
    <PageTransition>
      <div className="pt-32 pb-24 px-6 md:px-12 bg-bg-primary min-h-screen">
        <div className="max-w-7xl mx-auto">
          {/* Hero */}
          <div className="text-center mb-20">
            <span className="text-gold uppercase tracking-[0.3em] text-xs font-sans font-bold">Contact</span>
            <h1 className="text-5xl md:text-7xl font-serif text-white mt-4 italic mb-8 leading-tight">
                Let's Create Something <br /> Beautiful
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-24">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-bg-secondary p-8 md:p-12 gold-border"
            >
              <h3 className="text-3xl font-serif text-white mb-8">Start a Conversation</h3>
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-gold font-bold">Full Name</label>
                    <input type="text" className="w-full bg-bg-tertiary border border-gold/10 p-4 text-ivory outline-none focus:border-gold transition-colors" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-gold font-bold">Email Address</label>
                    <input type="email" className="w-full bg-bg-tertiary border border-gold/10 p-4 text-ivory outline-none focus:border-gold transition-colors" placeholder="john@example.com" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-gold font-bold">Phone Number</label>
                    <input type="tel" className="w-full bg-bg-tertiary border border-gold/10 p-4 text-ivory outline-none focus:border-gold transition-colors" placeholder="+91 98765 43210" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-gold font-bold">Project Type</label>
                    <select className="w-full bg-bg-tertiary border border-gold/10 p-4 text-ivory outline-none focus:border-gold transition-colors accent-gold">
                      <option>Residential</option>
                      <option>Commercial</option>
                      <option>Modular Kitchen</option>
                      <option>Luxury Villa</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-gold font-bold">Message</label>
                  <textarea rows={5} className="w-full bg-bg-tertiary border border-gold/10 p-4 text-ivory outline-none focus:border-gold transition-colors" placeholder="Tell us about your dream project..."></textarea>
                </div>
                <button className="w-full bg-gold text-bg-primary py-5 uppercase tracking-[0.3em] font-bold text-xs hover:bg-white transition-all transform hover:scale-[1.02] active:scale-95 duration-300">
                  Send Message
                </button>
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-12"
            >
              <div>
                <h3 className="text-3xl font-serif text-white mb-8">Get In Touch</h3>
                <div className="space-y-8">
                  {[
                    { icon: MapPin, title: 'Regional Office', val: 'Suite 405, Prestige Towers, MG Road, Bangalore 560001' },
                    { icon: Phone, title: 'Call Us', val: '+91 80 4567 8900 / +91 98765 43210' },
                    { icon: Mail, title: 'Email Us', val: 'hello@brightondecore.com' },
                    { icon: MessageSquare, title: 'WhatsApp', val: '+91 98765 01234' }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-6">
                      <div className="w-12 h-12 bg-gold/10 flex items-center justify-center text-gold rounded-full flex-shrink-0">
                        <item.icon size={20} />
                      </div>
                      <div>
                        <p className="text-gold text-[10px] uppercase tracking-widest font-bold mb-1">{item.title}</p>
                        <p className="text-white text-lg font-light">{item.val}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="bg-bg-secondary gold-border p-1 aspect-video">
                <div className="w-full h-full bg-bg-tertiary flex items-center justify-center text-ivory-muted italic text-sm">
                    Interactive Map Integration
                </div>
              </div>

              <div className="p-8 border border-gold/10 bg-gold/5 flex flex-col sm:flex-row items-center gap-6 justify-between">
                <div className="flex items-center gap-4 text-white">
                  <Calendar className="text-gold" />
                  <span className="font-serif text-lg">Book a Free Consultation</span>
                </div>
                <button className="bg-gold text-bg-primary px-8 py-3 text-[10px] uppercase tracking-widest font-bold hover:bg-white transition-all">
                  Pick Date
                </button>
              </div>
            </motion.div>
          </div>

          {/* FAQ */}
          <div className="max-w-4xl mx-auto pt-24 border-t border-gold/10">
            <div className="text-center mb-16">
                <span className="text-gold uppercase tracking-widest text-xs font-bold">Inquiries</span>
                <h2 className="text-4xl font-serif text-white mt-2">Common Questions</h2>
            </div>
            
            <div className="space-y-4">
              {faq.map((item, i) => (
                <div key={i} className="bg-bg-secondary border border-gold/5">
                  <button 
                    className="w-full flex items-center justify-between p-6 text-left"
                    onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                  >
                    <span className="text-white font-serif text-lg">{item.q}</span>
                    <ChevronDown size={20} className={`text-gold transition-transform ${expandedFaq === i ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {expandedFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="p-6 pt-0 text-ivory-muted text-sm leading-relaxed border-t border-gold/5 mt-2">
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
