// src/components/common/InnovativeAddressBlock.jsx
import React, { useState } from 'react';
import { MapPin, Copy, Check, ExternalLink, Navigation } from 'lucide-react';
import { company } from '../../config/company';

/**
 * InnovativeAddressBlock
 * Innovative address representation:
 * - Line 1: 2911B Cleveland Ave
 * - Line 2: Saskatoon, SK S7K 8A9 (with highlighted postal chip)
 * - 1-Click Clipboard copy for the full address or postal code with animated visual feedback
 * - Instant Google Maps navigation deep link
 */
const InnovativeAddressBlock = ({
  variant = 'card', // 'card' | 'footer' | 'feature' | 'compact'
  accentColor = '#52B788', // '#52B788' | '#C9A55A' | '#B89656' | 'currentColor'
  isLight = false,
  className = '',
}) => {
  const [copied, setCopied] = useState(false);
  const [copiedPostal, setCopiedPostal] = useState(false);

  const fullAddress = company.address.full || '2911B Cleveland Ave, Saskatoon, SK S7K 8A9';
  const postalCode = company.address.postalCode || 'S7K 8A9';
  const street = company.address.street || '2911B Cleveland Ave';
  const cityProvince = `${company.address.city}, ${company.address.province}`;
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`;

  const handleCopyFull = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(fullAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  const handleCopyPostal = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(postalCode);
      setCopiedPostal(true);
      setTimeout(() => setCopiedPostal(false), 2200);
    }
  };

  // 1. FOOTER VARIANT
  if (variant === 'footer') {
    return (
      <div className={`space-y-2.5 font-sans ${className}`}>
        <div className="flex items-start gap-3">
          <MapPin size={15} className="mt-1 flex-shrink-0" style={{ color: accentColor }} />
          <div className="text-xs leading-relaxed">
            <div className={`font-medium ${isLight ? 'text-[#2B1F17]' : 'text-white'}`}>
              {street}
            </div>
            <div className={`flex items-center flex-wrap gap-1.5 pt-0.5 ${isLight ? 'text-[#2B1F17]/70' : 'text-white/70'}`}>
              <span>{cityProvince}</span>
              <button
                type="button"
                onClick={handleCopyPostal}
                title="Click to copy postal code"
                className={`group/pc inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[11px] font-mono tracking-wider transition-all duration-200 cursor-pointer ${
                  isLight
                    ? 'bg-[#2B1F17]/5 text-[#2B1F17] hover:bg-[#2B1F17]/10 border border-[#2B1F17]/15'
                    : 'bg-white/10 text-white hover:bg-white/20 border border-white/15'
                }`}
              >
                <span>{postalCode}</span>
                {copiedPostal ? (
                  <Check size={10} className="text-emerald-400" />
                ) : (
                  <Copy size={9} className="opacity-40 group-hover/pc:opacity-100 transition-opacity" />
                )}
              </button>
            </div>
            <div className={`text-[11px] pt-0.5 ${isLight ? 'text-[#2B1F17]/50' : 'text-white/40'}`}>
              {company.address.country}
            </div>
          </div>
        </div>

        {/* Micro Action Buttons */}
        <div className="flex items-center gap-2 pl-6 pt-0.5">
          <button
            type="button"
            onClick={handleCopyFull}
            className={`inline-flex items-center gap-1.5 text-[11px] font-medium transition-colors cursor-pointer ${
              isLight ? 'text-[#2B1F17]/70 hover:text-[#2B1F17]' : 'text-white/60 hover:text-white'
            }`}
          >
            {copied ? (
              <>
                <Check size={12} className="text-emerald-400" />
                <span className="text-emerald-400 font-semibold">Address Copied!</span>
              </>
            ) : (
              <>
                <Copy size={11} style={{ color: accentColor }} />
                <span>Copy</span>
              </>
            )}
          </button>

          <span className={`text-[10px] ${isLight ? 'text-[#2B1F17]/25' : 'text-white/20'}`}>•</span>

          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-1 text-[11px] font-medium transition-colors ${
              isLight ? 'text-[#2B1F17]/70 hover:text-[#2B1F17]' : 'text-white/60 hover:text-white'
            }`}
          >
            <span>Directions</span>
            <ExternalLink size={10} style={{ color: accentColor }} />
          </a>
        </div>
      </div>
    );
  }

  // 2. FEATURE VARIANT (e.g. About Page / Highlighted Studio)
  if (variant === 'feature') {
    return (
      <div className={`p-6 rounded-2xl backdrop-blur-xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all duration-300 relative group ${className}`}>
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 border"
              style={{
                backgroundColor: `${accentColor}18`,
                borderColor: `${accentColor}40`,
                color: accentColor,
              }}
            >
              <MapPin size={22} />
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-white/50 font-sans">
                  Flagship Design Studio & Hub
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              </div>

              {/* Exact 2-line layout */}
              <div className="font-serif text-white text-xl sm:text-2xl font-bold tracking-tight">
                {street}
              </div>

              <div className="flex flex-wrap items-center gap-2 mt-1.5">
                <span className="text-white/80 font-sans text-sm">{cityProvince}</span>
                <button
                  type="button"
                  onClick={handleCopyPostal}
                  title="Click to copy Canadian postal code"
                  className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-white/10 hover:bg-white/20 border border-white/20 text-white font-mono text-xs font-semibold tracking-wider transition-all duration-200 cursor-pointer shadow-sm group/btn"
                >
                  <span className="text-xs">🇨🇦</span>
                  <span>{postalCode}</span>
                  {copiedPostal ? (
                    <Check size={11} className="text-emerald-400" />
                  ) : (
                    <Copy size={11} className="text-white/50 group-hover/btn:text-white transition-colors" />
                  )}
                </button>
                <span className="text-white/40 text-xs font-sans">· Canada</span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex sm:flex-col items-center sm:items-end gap-2.5 pt-2 sm:pt-0 border-t sm:border-t-0 border-white/10">
            <button
              type="button"
              onClick={handleCopyFull}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-sans font-medium transition-all cursor-pointer border border-white/15"
            >
              {copied ? (
                <>
                  <Check size={13} className="text-emerald-400" />
                  <span className="text-emerald-400 font-semibold">Copied!</span>
                </>
              ) : (
                <>
                  <Copy size={13} style={{ color: accentColor }} />
                  <span>Copy Address</span>
                </>
              )}
            </button>

            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-sans font-bold transition-all shadow-md"
              style={{
                backgroundColor: accentColor,
                color: '#0A0908',
              }}
            >
              <Navigation size={13} />
              <span>Get Directions</span>
              <ExternalLink size={11} />
            </a>
          </div>
        </div>

        {copied && (
          <div className="mt-3 text-[11px] text-emerald-400 font-sans flex items-center gap-1.5">
            <Check size={12} />
            <span>Full address copied to clipboard: "{fullAddress}"</span>
          </div>
        )}
      </div>
    );
  }

  // 3. CARD VARIANT (Default — Contact Page Sidebar, etc.)
  return (
    <div className={`p-5 rounded-2xl backdrop-blur-xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all duration-300 ${className}`}>
      <div className="flex items-start gap-4">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 border"
          style={{
            backgroundColor: `${accentColor}18`,
            borderColor: `${accentColor}35`,
            color: accentColor,
          }}
        >
          <MapPin size={20} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-1">
            <span className="text-[10px] uppercase tracking-[0.2em] text-white/50 font-sans font-semibold">
              Flagship Office & Studio
            </span>
            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 text-[9px] font-mono font-medium border border-emerald-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Saskatoon Hub
            </span>
          </div>

          {/* Exact 2-line structure matching screenshot */}
          <div className="font-serif text-white text-base sm:text-lg font-bold leading-tight">
            {street}
          </div>

          <div className="flex flex-wrap items-center gap-2 mt-1">
            <span className="text-white/80 font-sans text-xs sm:text-sm">{cityProvince}</span>
            <button
              type="button"
              onClick={handleCopyPostal}
              title="Click to copy postal code"
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 border border-white/20 text-white font-mono text-[11px] font-semibold tracking-wider transition-all duration-200 cursor-pointer group/chip"
            >
              <span>{postalCode}</span>
              {copiedPostal ? (
                <Check size={10} className="text-emerald-400" />
              ) : (
                <Copy size={9} className="opacity-50 group-hover/chip:opacity-100 transition-opacity" />
              )}
            </button>
          </div>

          {/* Innovative Quick Action Bar */}
          <div className="flex items-center gap-3 mt-3 pt-3 border-t border-white/10">
            <button
              type="button"
              onClick={handleCopyFull}
              className="inline-flex items-center gap-1.5 text-xs text-white/70 hover:text-white transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check size={12} className="text-emerald-400" />
                  <span className="text-emerald-400 font-medium">Copied!</span>
                </>
              ) : (
                <>
                  <Copy size={12} style={{ color: accentColor }} />
                  <span>Copy Address</span>
                </>
              )}
            </button>

            <span className="text-white/20 text-xs">•</span>

            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold transition-colors"
              style={{ color: accentColor }}
            >
              <Navigation size={12} />
              <span>Get Directions</span>
              <ExternalLink size={10} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InnovativeAddressBlock;
