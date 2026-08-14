// src/components/contact/ModernMap.jsx
import React, { useState } from 'react';
import { MapPin, Navigation, Layers, ExternalLink, ShieldCheck } from 'lucide-react';

const ModernMap = () => {
  const [mapType, setMapType] = useState('dark');

  const mapUrls = {
    dark: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2454!2d-106.6346!3d52.1332!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sSaskatoon!5e0!3m2!1sen!2sca!4v1697000000000',
    satellite: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2454!2d-106.6346!3d52.1332!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sSaskatoon!5e1!3m2!1sen!2sca!4v1697000000000',
  };

  return (
    <div className="relative rounded-3xl overflow-hidden border border-[#52B788]/35 shadow-[0_30px_80px_rgba(0,0,0,0.8)] group bg-[#0A120E]">
      
      {/* Map Control Header */}
      <div className="absolute top-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl bg-[#0A120E]/90 backdrop-blur-xl border border-[#52B788]/30">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#52B788]/20 border border-[#52B788]/40 flex items-center justify-center text-[#52B788]">
            <MapPin size={18} />
          </div>
          <div>
            <div className="text-white text-xs font-serif font-bold">Saskatoon Showroom</div>
            <div className="text-white/60 text-[10px] font-sans">Saskatchewan, Canada</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setMapType(mapType === 'dark' ? 'satellite' : 'dark')}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-[11px] font-sans transition-all"
          >
            <Layers size={13} className="text-[#52B788]" />
            <span className="capitalize">{mapType} Map</span>
          </button>

          <a
            href="https://maps.google.com/?q=Saskatoon+Saskatchewan+Canada"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#52B788] hover:bg-white text-[#0A120E] text-[11px] font-bold font-sans transition-all shadow-[0_0_18px_rgba(82,183,136,0.4)]"
          >
            <span>Directions</span>
            <ExternalLink size={12} />
          </a>
        </div>
      </div>

      {/* Map Frame */}
      <div className="w-full h-[380px] md:h-[480px]">
        <iframe
          title="Brighton Decor Ltd Interactive Location Map"
          src={mapUrls[mapType]}
          className="w-full h-full border-0 filter grayscale invert contrast-125 opacity-90 transition-all duration-500 group-hover:grayscale-0 group-hover:invert-0 group-hover:opacity-100"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      {/* Bottom Service Banner */}
      <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between p-3.5 rounded-2xl bg-[#0A120E]/90 backdrop-blur-xl border border-[#52B788]/30">
        <div className="flex items-center gap-3">
          <ShieldCheck size={18} className="text-[#52B788]" />
          <span className="text-white text-xs font-sans">
            Free site measurement within <strong className="text-[#52B788]">50km radius of Saskatoon</strong>
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-[#52B788] font-mono font-bold">
          <Navigation size={12} />
          <span>Active Showroom</span>
        </div>
      </div>

    </div>
  );
};

export default ModernMap;
