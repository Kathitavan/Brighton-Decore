// src/pages/RoomViewer.jsx
// Brighton Decor Ltd — 3D Room Studio Configurator Page
//
// Complete Architectural Upgrade:
//   – Initial view starts clean and pristine with bare architectural window daylight.
//   – Independent Blinds & Curtains layering (use both, either, or clean bare window).
//   – Category Navigation Bar redesign with modern luxury glassmorphism, micro-badges, and chevron scrolling.
//   – Category order: Window Decor (1st / Hero) → Seating → Walls → Flooring → Rug → Lighting → Decor → Room Presets (Final).
//   – Each category includes tailored Quick Presets for 1-click styling.
//   – Desktop left sidebar (with smooth mouse-wheel & drag) + Mobile slide-up drawer.

import React, { useState, useEffect, useRef, Suspense } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  ChevronLeft,
  ChevronRight,
  RefreshCcw, 
  Save, 
  X, 
  Sparkles, 
  Check, 
  Sliders,
  Sun,
  Sunset,
  Moon,
  Ruler
} from 'lucide-react';
import PageTransition from '../components/common/PageTransition';
import RoomCanvas from '../components/room-viewer/RoomCanvas';
import { TEMPLATES } from '../data/roomTemplates';
import { BLIND_PRODUCTS, WALL_COLORS, FLOOR_OPTIONS } from '../data/roomProducts';
import { company } from '../config/company';
import useModalScroll from '../hooks/useModalScroll';

// ─────────────────────────────────────────────────────────────────────────────
// DEFAULT CONFIGURATION: Clean, pristine room with bare architectural window
// ─────────────────────────────────────────────────────────────────────────────
const DEFAULT_STATE = {
  // Window treatments (starts clean & empty as requested)
  blindType: 'none',     // 'none' | 'roller' | 'zebra' | 'roman' | 'wooden' | 'pvc' | 'honeycomb'
  blindOpen: 0.2,        // 0 to 1
  curtainColor: 'none',  // 'none' | '#E8E4E0' (Sheer Linen) | '#262320' (Blackout) | etc.
  curtainOpen: 0.65,     // 0 to 1

  // Architecture & Furniture
  floorType: 'lightoak',
  wallColor: '#F5F0E8',
  sofaColor: '#ECE7DE',
  sofaStyle: 'modern',
  rugColor: '#D8D4CC',
  rugPattern: 'solid',

  // Lighting & Ambiance
  lightMode: 'bright',
  ceilingLightOn: false,
  floorLampOn: false,
  fanOn: false,

  // Decor & Botanicals
  plantOn: true,
  decorOn: true,
};

// ─────────────────────────────────────────────────────────────────────────────
// CATEGORY DEFINITIONS — Window Decor 1st, Room Presets Final
// ─────────────────────────────────────────────────────────────────────────────
const CATEGORIES = [
  { id: 'window',   label: 'Window Decor', icon: '🪟', badge: '1st Focus' },
  { id: 'sofa',     label: 'Seating',      icon: '🛋️' },
  { id: 'walls',    label: 'Walls',        icon: '🎨' },
  { id: 'floors',   label: 'Flooring',     icon: '🪵' },
  { id: 'rug',      label: 'Area Rug',     icon: '🧶' },
  { id: 'lighting', label: 'Lighting',     icon: '💡' },
  { id: 'decor',    label: 'Decor',        icon: '🌿' },
  { id: 'presets',  label: 'Room Presets', icon: '✨', badge: 'Final Look' },
];

// Curtains Color Palette
const CURTAIN_COLORS = [
  { label: 'None (Remove)', hex: 'none' },
  { label: 'Sheer Ivory',   hex: '#F5F0E8' },
  { label: 'Warm Linen',    hex: '#E8E4E0' },
  { label: 'Sand Dune',     hex: '#C4956A' },
  { label: 'Antique Gold',  hex: '#8B6914' },
  { label: 'Charcoal Noir', hex: '#262320' },
  { label: 'Espresso',      hex: '#4A3728' },
  { label: 'Soft Sky',      hex: '#B8D4E8' },
];

const RoomViewer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [roomState, setRoomState] = useState(DEFAULT_STATE);
  const [activeCategory, setActiveCategory] = useState('window');
  const [windowSubTab, setWindowSubTab] = useState('blinds'); // 'blinds' | 'curtains'
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  const desktopNavRef = useRef(null);
  const mobileNavRef = useRef(null);

  const scrollDesktopNav = (offset) => {
    if (desktopNavRef.current) {
      desktopNavRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  const scrollMobileNav = (offset) => {
    if (mobileNavRef.current) {
      mobileNavRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  useModalScroll(showSaveModal);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle incoming route preselect from Product cards or CTAs
  useEffect(() => {
    if (location.state?.preselect) {
      setRoomState((prev) => ({ ...prev, blindType: location.state.preselect }));
      setActiveCategory('window');
      setWindowSubTab('blinds');
      if (isMobile) setMobileDrawerOpen(true);
    }
  }, [location.state, isMobile]);

  const updateRoom = (key, value) => {
    setRoomState((prev) => ({ ...prev, [key]: value }));
  };

  const resetRoom = () => setRoomState(DEFAULT_STATE);
  const applyTemplate = (tpl) => setRoomState((prev) => ({ ...prev, ...tpl }));

  // ─────────────────────────────────────────────────────────────────────────────
  // RENDER CATEGORY CONTENT
  // ─────────────────────────────────────────────────────────────────────────────
  const renderCategoryContent = () => {
    switch (activeCategory) {
      // 1. WINDOW DECOR (FIRST & HERO FOCUS)
      case 'window':
        return (
          <div className="space-y-5">
            <div className="flex items-center justify-between pb-1 border-b border-white/10">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#C9A55A] block">
                  Window Treatments Studio
                </span>
                <span className="text-[9px] text-white/50">
                  Custom blinds & architectural drapery crafted in Saskatoon
                </span>
              </div>
              <span className="text-[8px] bg-[#C9A55A]/20 border border-[#C9A55A]/40 text-[#C9A55A] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                Hero Suite
              </span>
            </div>

            {/* Quick Window Presets */}
            <div>
              <p className="text-[9px] uppercase tracking-widest text-[#C9A55A]/90 mb-2 font-bold flex items-center gap-1.5">
                <Sparkles size={11} /> Quick Window Presets
              </p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  {
                    name: '☀️ Clean Bare Window',
                    desc: 'Empty window, pure daylight & garden view',
                    cfg: { blindType: 'none', curtainColor: 'none' },
                  },
                  {
                    name: '🪟 Modern Solar Roller',
                    desc: 'Solar-screen roller blind in headbox',
                    cfg: { blindType: 'roller', blindOpen: 0.3, curtainColor: 'none' },
                  },
                  {
                    name: '🌾 Pure Sheer Linen',
                    desc: 'Floor-to-ceiling sheer linen drapery',
                    cfg: { blindType: 'none', curtainColor: '#E8E4E0', curtainOpen: 0.65 },
                  },
                  {
                    name: '🪵 Hardwood Venetian',
                    desc: 'Natural Canadian wood slats & tapes',
                    cfg: { blindType: 'wooden', blindOpen: 0.25, curtainColor: 'none' },
                  },
                  {
                    name: '🌙 Blackout Sanctuary',
                    desc: 'Acoustic velvet blackout suite',
                    cfg: { blindType: 'roller', blindOpen: 0.1, curtainColor: '#262320', curtainOpen: 0.25 },
                  },
                  {
                    name: '💎 Layered Luxury',
                    desc: 'Dual-layer zebra blind + sheer drapery',
                    cfg: { blindType: 'zebra', blindOpen: 0.35, curtainColor: '#E8E4E0', curtainOpen: 0.65 },
                  },
                ].map((wp, i) => (
                  <button
                    key={i}
                    onClick={() => setRoomState((prev) => ({ ...prev, ...wp.cfg }))}
                    className="p-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-[#C9A55A]/50 text-left transition-all group"
                  >
                    <span className="text-[10px] font-bold text-white group-hover:text-[#C9A55A] block leading-snug">
                      {wp.name}
                    </span>
                    <span className="text-[8px] text-white/50 block mt-0.5 line-clamp-1">
                      {wp.desc}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Sub-Tabs: Blinds vs Curtains */}
            <div className="flex bg-black/40 p-1 rounded-xl border border-white/10">
              <button
                onClick={() => setWindowSubTab('blinds')}
                className={`flex-1 py-1.5 rounded-lg text-[10px] uppercase font-bold tracking-wider transition-all ${
                  windowSubTab === 'blinds'
                    ? 'bg-[#C9A55A] text-[#0A0908] shadow-md'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                1. Window Blinds ({roomState.blindType === 'none' ? 'None' : roomState.blindType})
              </button>
              <button
                onClick={() => setWindowSubTab('curtains')}
                className={`flex-1 py-1.5 rounded-lg text-[10px] uppercase font-bold tracking-wider transition-all ${
                  windowSubTab === 'curtains'
                    ? 'bg-[#C9A55A] text-[#0A0908] shadow-md'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                2. Drapery ({roomState.curtainColor === 'none' ? 'None' : 'Active'})
              </button>
            </div>

            {/* TAB A: WINDOW BLINDS */}
            {windowSubTab === 'blinds' && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-2.5">
                  {/* Option 0: None / Remove Blinds */}
                  <button
                    type="button"
                    onClick={() => updateRoom('blindType', 'none')}
                    className={`p-2.5 rounded-xl border text-left transition-all duration-300 relative group ${
                      roomState.blindType === 'none'
                        ? 'border-[#C9A55A] bg-[#C9A55A]/15 ring-1 ring-[#C9A55A]'
                        : 'border-white/10 bg-white/[0.02] hover:border-white/25 hover:bg-white/[0.04]'
                    }`}
                  >
                    <div className="aspect-[16/10] rounded-lg overflow-hidden bg-[#161513] relative mb-2 flex items-center justify-center border border-white/10">
                      <span className="text-[10px] font-mono uppercase text-white/50 tracking-widest">
                        Bare Window
                      </span>
                      {roomState.blindType === 'none' && (
                        <div className="absolute top-1.5 right-1.5 bg-[#C9A55A] text-[#0A0908] w-5 h-5 rounded-full flex items-center justify-center shadow-md z-10">
                          <Check size={12} strokeWidth={3} />
                        </div>
                      )}
                    </div>
                    <span className={`text-[11px] font-bold block ${roomState.blindType === 'none' ? 'text-[#C9A55A]' : 'text-white'}`}>
                      No Blinds
                    </span>
                    <span className="text-[8px] text-white/40 block mt-0.5">
                      Empty glass, pure daylight
                    </span>
                  </button>

                  {/* 6 Photoreal Blinds styles */}
                  {BLIND_PRODUCTS.map((b) => {
                    const isSelected = roomState.blindType === b.id;
                    return (
                      <button
                        key={b.id}
                        type="button"
                        onClick={() => updateRoom('blindType', b.id)}
                        className={`p-2.5 rounded-xl border text-left transition-all duration-300 relative group ${
                          isSelected
                            ? 'border-[#C9A55A] bg-[#C9A55A]/15 shadow-[0_0_20px_rgba(201,165,90,0.25)] ring-1 ring-[#C9A55A]'
                            : 'border-white/10 bg-white/[0.02] hover:border-white/25 hover:bg-white/[0.04]'
                        }`}
                      >
                        <div className="aspect-[16/10] rounded-lg overflow-hidden bg-[#161513] relative mb-2">
                          <img
                            src={`/assets/imgs/products/${b.id === 'wooden' ? 'wooden' : b.id}-blinds.jpg`}
                            alt={b.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            onError={(e) => {
                              e.target.src = '/assets/imgs/products/roller-blinds.jpg';
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                          {isSelected && (
                            <div className="absolute top-1.5 right-1.5 bg-[#C9A55A] text-[#0A0908] w-5 h-5 rounded-full flex items-center justify-center shadow-md z-10">
                              <Check size={12} strokeWidth={3} />
                            </div>
                          )}
                        </div>
                        <span className={`text-[11px] font-bold block truncate ${isSelected ? 'text-[#C9A55A]' : 'text-white'}`}>
                          {b.name}
                        </span>
                        {b.materialBadge && (
                          <span className="text-[8px] uppercase tracking-wider text-[#C9A55A] font-semibold block mt-0.5">
                            {b.materialBadge}
                          </span>
                        )}
                        <span className="text-[8px] text-white/50 block mt-0.5 line-clamp-1">
                          {b.shortDesc}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Blind Elevation Slider (when blinds active) */}
                {roomState.blindType !== 'none' && (
                  <div className="bg-white/[0.03] border border-white/10 rounded-xl p-3.5">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[10px] uppercase tracking-widest text-[#C9A55A] font-bold">
                        Blind Height Position
                      </span>
                      <span className="text-white text-xs font-mono font-bold">
                        {Math.round((roomState.blindOpen ?? 0.2) * 100)}% Open
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={(roomState.blindOpen ?? 0.2) * 100}
                      onChange={(e) => updateRoom('blindOpen', e.target.value / 100)}
                      className="w-full h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#C9A55A]"
                    />
                    <div className="flex justify-between text-[8px] text-white/40 uppercase tracking-widest mt-1">
                      <span>Fully Drawn (Closed)</span>
                      <span>Raised (Open)</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB B: ARCHITECTURAL CURTAINS */}
            {windowSubTab === 'curtains' && (
              <div className="space-y-4">
                <div>
                  <p className="text-[9px] uppercase tracking-widest text-[#C9A55A]/80 mb-2.5 font-bold">
                    Drapery Fabric & Color
                  </p>
                  <div className="grid grid-cols-4 gap-2.5">
                    {CURTAIN_COLORS.map((c) => {
                      const isSel = roomState.curtainColor === c.hex;
                      return (
                        <button
                          key={c.hex}
                          onClick={() => updateRoom('curtainColor', c.hex)}
                          className={`flex flex-col items-center gap-1.5 p-2 rounded-xl border transition-all ${
                            isSel ? 'border-[#C9A55A] bg-[#C9A55A]/15 ring-1 ring-[#C9A55A]' : 'border-white/10 bg-white/[0.02] hover:border-white/20'
                          }`}
                        >
                          {c.hex === 'none' ? (
                            <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/60">
                              <X size={14} />
                            </div>
                          ) : (
                            <div
                              className={`w-8 h-8 rounded-full border-2 transition-transform ${
                                isSel ? 'border-[#C9A55A] scale-110 shadow-md' : 'border-transparent'
                              }`}
                              style={{ backgroundColor: c.hex }}
                            />
                          )}
                          <span className="text-[8px] text-white/70 truncate w-full text-center">
                            {c.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Curtain Draw Slider (when curtains active) */}
                {roomState.curtainColor !== 'none' && (
                  <div className="bg-white/[0.03] border border-white/10 rounded-xl p-3.5">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[10px] uppercase tracking-widest text-[#C9A55A] font-bold">
                        Curtain Draw Position
                      </span>
                      <span className="text-white text-xs font-mono font-bold">
                        {Math.round((roomState.curtainOpen ?? 0.65) * 100)}% Parted
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={(roomState.curtainOpen ?? 0.65) * 100}
                      onChange={(e) => updateRoom('curtainOpen', e.target.value / 100)}
                      className="w-full h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#C9A55A]"
                    />
                    <div className="flex justify-between text-[8px] text-white/40 uppercase tracking-widest mt-1">
                      <span>Closed Center</span>
                      <span>Drawn to Reveals</span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        );

      // 2. SOFA & LIVING ROOM SEATING
      case 'sofa':
        return (
          <div className="space-y-5">
            <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#C9A55A] block">
              Living Room Seating
            </span>

            {/* Sofa Presets */}
            <div>
              <p className="text-[9px] uppercase tracking-widest text-[#C9A55A]/80 mb-2 font-bold">
                Designer Seating Presets
              </p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { name: '🛋️ Nordic Bouclé', cfg: { sofaStyle: 'curved', sofaColor: '#ECE7DE' } },
                  { name: '🍂 Italian Saddle Leather', cfg: { sofaStyle: 'modern', sofaColor: '#8B4513' } },
                  { name: '🖤 Midnight Velvet', cfg: { sofaStyle: 'chesterfield', sofaColor: '#2A2928' } },
                  { name: '🌿 Muted Sage Linen', cfg: { sofaStyle: 'modern', sofaColor: '#7A9970' } },
                ].map((sp, i) => (
                  <button
                    key={i}
                    onClick={() => setRoomState((prev) => ({ ...prev, ...sp.cfg }))}
                    className="p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-[#C9A55A]/50 text-left transition-all"
                  >
                    <span className="text-[10px] font-bold text-white block">{sp.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-[9px] uppercase tracking-widest text-[#C9A55A]/80 mb-2 font-bold">
                Silhouette Style
              </p>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'modern', label: 'Tuxedo' },
                  { id: 'curved', label: 'Curved' },
                  { id: 'chesterfield', label: 'Tufted' },
                ].map((s) => (
                  <button
                    key={s.id}
                    onClick={() => updateRoom('sofaStyle', s.id)}
                    className={`py-2 rounded-xl text-[9px] uppercase font-bold tracking-wider border transition-all ${
                      roomState.sofaStyle === s.id
                        ? 'bg-[#C9A55A] text-[#0A0908] border-[#C9A55A] shadow-md'
                        : 'border-white/10 text-white/50 hover:border-white/30'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-[9px] uppercase tracking-widest text-[#C9A55A]/80 mb-2.5 font-bold">
                Upholstery Color
              </p>
              <div className="grid grid-cols-4 gap-2.5">
                {[
                  { label: 'Off-White Bouclé', hex: '#ECE7DE' },
                  { label: 'Oatmeal', hex: '#D5C9B8' },
                  { label: 'Cognac Leather', hex: '#8B4513' },
                  { label: 'Warm Taupe', hex: '#8A7A6A' },
                  { label: 'Sage Velvet', hex: '#7A9970' },
                  { label: 'Pacific Navy', hex: '#2C3E50' },
                  { label: 'Charcoal', hex: '#3A3835' },
                  { label: 'Onyx Noir', hex: '#1C1A18' },
                ].map((c) => (
                  <button
                    key={c.hex}
                    onClick={() => updateRoom('sofaColor', c.hex)}
                    className="flex flex-col items-center gap-1 group"
                  >
                    <div
                      className={`w-8 h-8 rounded-full border-2 transition-transform ${
                        roomState.sofaColor === c.hex ? 'border-[#C9A55A] scale-125 shadow-md' : 'border-transparent group-hover:scale-110'
                      }`}
                      style={{ backgroundColor: c.hex }}
                    />
                    <span className="text-[8px] text-white/50 truncate w-full text-center">
                      {c.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      // 3. WALLS & PAINT
      case 'walls':
        return (
          <div className="space-y-5">
            <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#C9A55A] block">
              Architectural Wall Finishes
            </span>

            {/* Wall Presets */}
            <div>
              <p className="text-[9px] uppercase tracking-widest text-[#C9A55A]/80 mb-2 font-bold">
                Designer Palettes
              </p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { name: '🏛️ Alabaster Limewash', hex: '#F5F0E8' },
                  { name: '🏜️ Prairie Sandstone', hex: '#D4C4A8' },
                  { name: '🍃 Nordic Sage', hex: '#7A9970' },
                  { name: '🌌 Midnight Charcoal', hex: '#2C2B29' },
                ].map((wp, i) => (
                  <button
                    key={i}
                    onClick={() => updateRoom('wallColor', wp.hex)}
                    className="p-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-[#C9A55A]/50 text-left transition-all flex items-center gap-2"
                  >
                    <div className="w-4 h-4 rounded-full border border-white/20 shrink-0" style={{ backgroundColor: wp.hex }} />
                    <span className="text-[9px] font-bold text-white block">{wp.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-[9px] uppercase tracking-widest text-[#C9A55A]/80 mb-2.5 font-bold">
                Full Wall Color Palette
              </p>
              <div className="grid grid-cols-4 gap-3 p-1">
                {WALL_COLORS.map((c) => {
                  const isSel = roomState.wallColor === c.hex;
                  return (
                    <button
                      key={c.hex}
                      onClick={() => updateRoom('wallColor', c.hex)}
                      className="flex flex-col items-center gap-1.5 group"
                      title={c.label}
                    >
                      <div
                        className={`w-8 h-8 rounded-full border-2 transition-transform ${
                          isSel ? 'border-[#C9A55A] scale-125 shadow-[0_0_12px_rgba(201,165,90,0.4)]' : 'border-transparent group-hover:scale-110'
                        }`}
                        style={{ backgroundColor: c.hex }}
                      />
                      <span className="text-[8px] text-white/50 truncate w-full text-center">
                        {c.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        );

      // 4. FLOORING
      case 'floors':
        return (
          <div className="space-y-5">
            <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#C9A55A] block">
              Canadian Flooring Surfaces
            </span>
            <div className="grid grid-cols-3 gap-2.5">
              {[
                { id: 'lightoak', label: 'White Oak', hex: '#C8A882' },
                { id: 'darkwalnut', label: 'Dark Walnut', hex: '#3E2A18' },
                { id: 'bleachedash', label: 'Bleached Ash', hex: '#E4DDD4' },
                { id: 'terrazzo', label: 'Terrazzo Tile', hex: '#D9D5CC' },
                { id: 'herringbone', label: 'Chevron Wood', hex: '#B59468' },
                { id: 'darktile', label: 'Dark Stone', hex: '#252321' },
              ].map((f) => {
                const isSel = roomState.floorType === f.id;
                return (
                  <button
                    key={f.id}
                    onClick={() => updateRoom('floorType', f.id)}
                    className={`flex flex-col items-center gap-2 p-2.5 rounded-xl border transition-all ${
                      isSel ? 'border-[#C9A55A] bg-[#C9A55A]/15 ring-1 ring-[#C9A55A]' : 'border-white/10 bg-white/[0.02] hover:border-white/25'
                    }`}
                  >
                    <div
                      className={`w-full aspect-square rounded-lg border-2 ${
                        isSel ? 'border-[#C9A55A]' : 'border-transparent'
                      }`}
                      style={{ backgroundColor: f.hex }}
                    />
                    <span className="text-[9px] font-bold text-white text-center">
                      {f.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        );

      // 5. AREA RUG
      case 'rug':
        return (
          <div className="space-y-5">
            <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#C9A55A] block">
              Hand-Tufted Area Rug
            </span>

            {/* Rug Presets */}
            <div>
              <p className="text-[9px] uppercase tracking-widest text-[#C9A55A]/80 mb-2 font-bold">
                Rug Presets
              </p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { name: '❌ Bare Hardwood', cfg: { rugColor: 'none' } },
                  { name: '🐑 Plush Wool Cream', cfg: { rugColor: '#D8D4CC', rugPattern: 'solid' } },
                  { name: '🌾 Ribbed Natural Jute', cfg: { rugColor: '#C9A55A', rugPattern: 'striped' } },
                  { name: '📐 Geometric Slate', cfg: { rugColor: '#2C3E50', rugPattern: 'geometric' } },
                ].map((rp, i) => (
                  <button
                    key={i}
                    onClick={() => setRoomState((prev) => ({ ...prev, ...rp.cfg }))}
                    className="p-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-[#C9A55A]/50 text-left transition-all"
                  >
                    <span className="text-[9px] font-bold text-white block">{rp.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-[9px] uppercase tracking-widest text-[#C9A55A]/80 mb-2.5 font-bold">Colors</p>
              <div className="grid grid-cols-4 gap-2.5">
                <button
                  onClick={() => updateRoom('rugColor', 'none')}
                  className={`w-9 h-9 rounded-full border-2 mx-auto flex items-center justify-center ${
                    roomState.rugColor === 'none' ? 'border-[#C9A55A] bg-[#C9A55A]/20' : 'border-white/20'
                  }`}
                  title="No Rug"
                >
                  <X size={14} className="text-[#C9A55A]" />
                </button>
                {['#D8D4CC', '#C9A55A', '#A0522D', '#2C3E50', '#8B7355', '#EAE6DF', '#22201D'].map((c) => (
                  <button
                    key={c}
                    onClick={() => updateRoom('rugColor', c)}
                    className={`w-9 h-9 rounded-full border-2 mx-auto transition-transform ${
                      roomState.rugColor === c ? 'border-[#C9A55A] scale-125 shadow-md' : 'border-transparent hover:scale-110'
                    }`}
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
            </div>

            {roomState.rugColor !== 'none' && (
              <div>
                <p className="text-[9px] uppercase tracking-widest text-[#C9A55A]/80 mb-2 font-bold">Pattern</p>
                <div className="grid grid-cols-3 gap-2">
                  {['solid', 'striped', 'geometric'].map((p) => (
                    <button
                      key={p}
                      onClick={() => updateRoom('rugPattern', p)}
                      className={`py-2 rounded-xl text-[9px] uppercase font-bold tracking-wider border ${
                        roomState.rugPattern === p
                          ? 'bg-[#C9A55A] text-[#0A0908] border-[#C9A55A] shadow-md'
                          : 'border-white/10 text-white/50 hover:border-white/30'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      // 6. LIGHTING & AMBIANCE
      case 'lighting':
        return (
          <div className="space-y-5">
            <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#C9A55A] block">
              Architectural Lighting & Ambiance
            </span>

            {/* Atmosphere Presets */}
            <div>
              <p className="text-[9px] uppercase tracking-widest text-[#C9A55A]/80 mb-2.5 font-bold">
                Daylight & Mood Presets
              </p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'bright', name: '☀️ Daylight Brilliance', desc: '5500K Natural Sun streaming' },
                  { id: 'warm',   name: '🌅 Golden Hour Sunset', desc: '3200K Warm amber luxury bounce' },
                  { id: 'cool',   name: '❄️ Cool Architectural', desc: '4500K Crisp contemporary gallery' },
                  { id: 'dim',    name: '🌙 Twilight Noir', desc: '2700K Moody evening ambiance' },
                ].map((m) => (
                  <button
                    key={m.id}
                    onClick={() => updateRoom('lightMode', m.id)}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      roomState.lightMode === m.id
                        ? 'border-[#C9A55A] bg-[#C9A55A]/15 ring-1 ring-[#C9A55A]'
                        : 'border-white/10 bg-white/[0.02] hover:border-white/20'
                    }`}
                  >
                    <span className="text-[10px] font-bold text-white block">{m.name}</span>
                    <span className="text-[8px] text-white/40 block mt-0.5">{m.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Fixture Toggles */}
            <div className="space-y-2 pt-2 border-t border-white/10">
              <p className="text-[9px] uppercase tracking-widest text-[#C9A55A]/80 mb-1 font-bold">
                Interior Lighting Fixtures
              </p>
              {[
                { k: 'ceilingLightOn', label: 'Minimalist Brass Ceiling Halo', desc: 'High-set unobtrusive ambient bounce' },
                { k: 'floorLampOn',    label: 'Sculptural Arc Floor Lamp', desc: 'Carrara marble base & opal glass globe' },
                { k: 'fanOn',          label: 'Scandinavian Ceiling Fan', desc: 'Teak wood aerodynamic rotation' },
              ].map((t) => (
                <div key={t.k} className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.02] border border-white/10">
                  <div>
                    <span className="text-[10px] text-white font-bold block">{t.label}</span>
                    <span className="text-[8px] text-white/40">{t.desc}</span>
                  </div>
                  <button
                    onClick={() => updateRoom(t.k, !roomState[t.k])}
                    className={`w-9 h-5 rounded-full relative transition-colors ${
                      roomState[t.k] ? 'bg-[#C9A55A]' : 'bg-white/20'
                    }`}
                  >
                    <div
                      className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${
                        roomState[t.k] ? 'left-4.5' : 'left-0.5'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        );

      // 7. DECOR & PLANTS
      case 'decor':
        return (
          <div className="space-y-5">
            <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#C9A55A] block">
              Living Botanical & Curated Decor
            </span>
            <div className="space-y-2.5">
              {[
                { k: 'plantOn', label: 'Living Botanical Olive Tree', desc: 'Multi-branch organic foliage with natural breeze sway physics' },
                { k: 'decorOn', label: 'Architectural Bookshelf & Ceramics', desc: 'Floating smoked oak shelves with stoneware vessels' },
              ].map((t) => (
                <div key={t.k} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/10">
                  <div>
                    <span className="text-[11px] text-white font-bold block">{t.label}</span>
                    <span className="text-[8px] text-white/40">{t.desc}</span>
                  </div>
                  <button
                    onClick={() => updateRoom(t.k, !roomState[t.k])}
                    className={`w-10 h-5.5 rounded-full relative transition-colors ${
                      roomState[t.k] ? 'bg-[#C9A55A]' : 'bg-white/20'
                    }`}
                  >
                    <div
                      className={`absolute top-0.5 w-4.5 h-4.5 rounded-full bg-white transition-all ${
                        roomState[t.k] ? 'left-5' : 'left-0.5'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        );

      // 8. FINAL ROOM PRESETS (FINAL NAV OPTION AS REQUESTED)
      case 'presets':
        return (
          <div className="space-y-4">
            <div className="pb-1 border-b border-white/10">
              <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#C9A55A] block">
                Final Curated Room Presets
              </span>
              <p className="text-[9px] text-white/50">
                1-Click transformations combining window coverings, furniture & light
              </p>
            </div>

            <div className="space-y-3">
              {Object.values(TEMPLATES).map((tpl) => (
                <div
                  key={tpl.id}
                  className="bg-white/[0.02] hover:bg-white/[0.05] p-3.5 rounded-xl border border-white/10 hover:border-[#C9A55A]/50 transition-all flex flex-col gap-2.5 group"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-white text-xs font-bold font-serif group-hover:text-[#C9A55A] transition-colors">
                        {tpl.name}
                      </h4>
                      <p className="text-[#C9A55A]/80 text-[8px] uppercase tracking-wider font-semibold">
                        {tpl.style}
                      </p>
                    </div>
                    <div className="flex gap-1">
                      <div className="w-3 h-3 rounded-full border border-white/20" style={{ backgroundColor: tpl.wallColor }} title="Wall Color" />
                      <div className="w-3 h-3 rounded-full border border-white/20" style={{ backgroundColor: tpl.sofaColor }} title="Sofa Color" />
                    </div>
                  </div>
                  <p className="text-[9px] text-white/60 leading-relaxed font-light">
                    {tpl.desc}
                  </p>
                  <button
                    onClick={() => applyTemplate(tpl)}
                    className="w-full text-[9px] uppercase font-bold tracking-[0.2em] text-[#C9A55A] bg-[#C9A55A]/10 hover:bg-[#C9A55A] hover:text-[#0A0908] border border-[#C9A55A]/30 py-2 rounded-lg transition-all"
                  >
                    Apply Full Look →
                  </button>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <PageTransition>
      <div className="flex flex-col h-screen w-full overflow-hidden bg-[#0A0908] text-white">
        {/* Top Header Bar */}
        <header className="h-[56px] w-full bg-[#0D0C0A] border-b border-white/10 flex items-center justify-between px-4 md:px-6 z-[100] shrink-0">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-[#C9A55A] border border-[#C9A55A]/30 px-3 md:px-4 py-1.5 rounded-full hover:bg-[#C9A55A]/10 transition-all text-[10px] uppercase font-bold tracking-widest"
          >
            <ArrowLeft size={14} /> <span className="hidden sm:inline">Back</span>
          </button>

          <h1 className="text-white font-serif text-base md:text-lg flex items-center gap-2">
            <span className="text-[#C9A55A]">✦</span>
            <span>3D Room Studio</span>
            <span className="hidden sm:inline text-xs text-white/40 font-sans font-light tracking-widest">
              — Interactive Configurator
            </span>
          </h1>

          <div className="flex items-center gap-2 md:gap-3">
            <button
              onClick={() => setShowSaveModal(true)}
              className="text-[#C9A55A] border border-[#C9A55A]/40 px-3.5 py-1.5 rounded-full text-[10px] uppercase font-bold tracking-widest hover:bg-[#C9A55A]/10 transition-all"
            >
              Save Look
            </button>
            <button
              onClick={() => navigate('/contact')}
              className="bg-[#C9A55A] hover:bg-white text-[#0A0908] px-4 md:px-5 py-1.5 rounded-full text-[10px] uppercase font-bold tracking-[0.18em] transition-all"
            >
              Get This Look
            </button>
          </div>
        </header>

        {/* Main Work Area */}
        <div data-lenis-prevent className="flex-1 flex overflow-hidden relative">
          
          {/* Desktop Left Sidebar (>=1024px) */}
          <aside data-lenis-prevent className="hidden lg:flex w-[380px] h-full bg-[#0D0C0A] border-r border-white/10 flex-col shrink-0 z-40 min-h-0 shadow-2xl">
            
            {/* Category Navigation Bar with Luxury Design, Chevrons & Mouse-Wheel */}
            <div className="relative border-b border-[#C9A55A]/20 p-2.5 flex items-center gap-1.5 bg-[#12100E]/95 backdrop-blur-xl">
              <button
                type="button"
                onClick={() => scrollDesktopNav(-160)}
                className="w-7 h-7 flex items-center justify-center rounded-full bg-white/5 hover:bg-[#C9A55A]/20 hover:text-[#C9A55A] text-white/50 transition-colors shrink-0"
                title="Scroll categories left"
                aria-label="Scroll categories left"
              >
                <ChevronLeft size={14} />
              </button>
              
              <div
                ref={desktopNavRef}
                data-lenis-prevent
                onWheel={(e) => {
                  if (e.deltaY) {
                    e.currentTarget.scrollLeft += e.deltaY;
                  }
                }}
                className="overflow-x-auto no-scrollbar flex items-center gap-1.5 scroll-smooth py-1 px-1 w-full"
              >
                {CATEGORIES.map((cat) => {
                  const isSel = activeCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className={`px-3 py-1.5 rounded-full text-[10px] uppercase font-bold tracking-wider whitespace-nowrap transition-all shrink-0 flex items-center gap-1.5 ${
                        isSel
                          ? 'bg-gradient-to-r from-[#C9A55A] to-[#DFBA73] text-[#0A0908] shadow-[0_4px_16px_rgba(201,165,90,0.35)] ring-1 ring-[#C9A55A]'
                          : 'text-white/70 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/10'
                      }`}
                    >
                      <span>{cat.icon}</span>
                      <span>{cat.label}</span>
                      {cat.badge && (
                        <span className={`text-[7px] uppercase font-bold px-1.5 py-0.2 rounded-full ${
                          isSel ? 'bg-black/30 text-black' : 'bg-[#C9A55A]/20 text-[#C9A55A]'
                        }`}>
                          {cat.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={() => scrollDesktopNav(160)}
                className="w-7 h-7 flex items-center justify-center rounded-full bg-white/5 hover:bg-[#C9A55A]/20 hover:text-[#C9A55A] text-white/50 transition-colors shrink-0"
                title="Scroll categories right"
                aria-label="Scroll categories right"
              >
                <ChevronRight size={14} />
              </button>
            </div>

            {/* Category Content Area with Animated Transition & Fluid Scrolling */}
            <div 
              data-lenis-prevent 
              className="flex-1 min-h-0 overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-[#C9A55A]/30 hover:scrollbar-thumb-[#C9A55A] scrollbar-track-transparent"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCategory}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.22 }}
                >
                  {renderCategoryContent()}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Sidebar Action Footer */}
            <div className="p-4 border-t border-white/10 bg-[#0A0908] space-y-2.5">
              <button
                onClick={resetRoom}
                className="w-full flex items-center justify-center gap-2 text-[9px] uppercase tracking-widest text-white/50 hover:text-[#C9A55A] transition-colors font-bold py-1.5"
              >
                <RefreshCcw size={12} /> Reset to Clean Room
              </button>
              <button
                onClick={() => navigate('/contact')}
                className="w-full bg-[#C9A55A] hover:bg-white text-[#0A0908] py-3 rounded-xl text-xs uppercase font-bold tracking-widest transition-all shadow-lg flex items-center justify-center gap-2"
              >
                <Ruler size={13} />
                <span>Book Free Measurement →</span>
              </button>
            </div>
          </aside>

          {/* 3D WebGL Canvas Viewport */}
          <div className="flex-1 h-full relative bg-[#070605] overflow-hidden">
            <Suspense
              fallback={
                <div className="absolute inset-0 flex flex-col items-center justify-center text-[#C9A55A]">
                  <div className="w-12 h-12 border-2 border-[#C9A55A]/30 border-t-[#C9A55A] rounded-full animate-spin mb-4" />
                  <p className="font-serif text-xl italic tracking-wide">Loading 3D Studio...</p>
                </div>
              }
            >
              <RoomCanvas roomState={roomState} />
            </Suspense>

            {/* Orbit / Zoom Controls Hint */}
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 pointer-events-none text-center hidden sm:block">
              <p className="text-white/40 text-[9px] uppercase tracking-[0.35em] font-mono">
                {isMobile ? 'Pinch to zoom · Drag to rotate' : 'Drag to rotate · Scroll to zoom'}
              </p>
            </div>

            {/* Mobile Bottom Control Bar (<1024px) */}
            <div className="lg:hidden absolute bottom-0 left-0 right-0 z-30 p-3 bg-gradient-to-t from-black/95 via-black/80 to-transparent">
              <div className="flex items-center gap-2 max-w-lg mx-auto">
                <button
                  onClick={() => setMobileDrawerOpen(true)}
                  className="flex-1 bg-[#C9A55A] text-[#0A0908] py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl"
                >
                  <Sliders size={14} />
                  <span>Customize Look</span>
                </button>
                <button
                  onClick={() => setShowSaveModal(true)}
                  className="bg-white/10 backdrop-blur-md text-white border border-white/20 p-3 rounded-xl hover:bg-white/20 transition-all"
                  aria-label="Save Look"
                >
                  <Save size={16} />
                </button>
                <button
                  onClick={resetRoom}
                  className="bg-white/10 backdrop-blur-md text-white border border-white/20 p-3 rounded-xl hover:bg-white/20 transition-all"
                  aria-label="Reset Look"
                >
                  <RefreshCcw size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Slide-Up Customizer Drawer (<1024px) */}
        <AnimatePresence>
          {isMobile && mobileDrawerOpen && (
            <div className="fixed inset-0 z-[500] flex flex-col justify-end" role="dialog" aria-modal="true">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileDrawerOpen(false)}
                className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              />

              {/* Bottom Sheet Drawer */}
              <motion.div
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 220 }}
                className="bg-[#12110F] border-t border-[#C9A55A]/30 rounded-t-2xl max-h-[82vh] flex flex-col relative z-10 shadow-2xl overflow-hidden"
              >
                {/* Drawer Header */}
                <div className="p-4 border-b border-white/10 flex items-center justify-between shrink-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[#C9A55A] text-xs">✦</span>
                    <span className="font-serif text-white font-bold text-sm">Room Customizer</span>
                  </div>
                  <button
                    onClick={() => setMobileDrawerOpen(false)}
                    className="p-1.5 rounded-full bg-white/10 text-white/70 hover:text-white"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Horizontal Category Chips */}
                <div className="p-2.5 border-b border-white/10 flex items-center gap-1.5 shrink-0 bg-[#0A0908]/70">
                  <div
                    ref={mobileNavRef}
                    data-lenis-prevent
                    onWheel={(e) => {
                      if (e.deltaY) e.currentTarget.scrollLeft += e.deltaY;
                    }}
                    className="overflow-x-auto no-scrollbar flex gap-1.5 scroll-smooth py-1 w-full"
                  >
                    {CATEGORIES.map((cat) => {
                      const isSel = activeCategory === cat.id;
                      return (
                        <button
                          key={cat.id}
                          onClick={() => setActiveCategory(cat.id)}
                          className={`px-3 py-1.5 rounded-full text-[10px] uppercase font-bold tracking-wider whitespace-nowrap transition-all shrink-0 flex items-center gap-1 ${
                            isSel
                              ? 'bg-gradient-to-r from-[#C9A55A] to-[#DFBA73] text-[#0A0908] shadow-md font-bold'
                              : 'text-white/60 bg-white/5 hover:text-white border border-white/10'
                          }`}
                        >
                          <span>{cat.icon}</span>
                          <span>{cat.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Drawer Content */}
                <div data-lenis-prevent className="flex-1 min-h-0 overflow-y-auto p-4 min-h-[220px]">
                  {renderCategoryContent()}
                </div>

                {/* Drawer Bottom CTAs */}
                <div className="p-4 border-t border-white/10 bg-[#0A0908] flex gap-3 shrink-0">
                  <button
                    onClick={() => {
                      setMobileDrawerOpen(false);
                      setShowSaveModal(true);
                    }}
                    className="flex-1 bg-white/10 text-white py-3 rounded-xl text-xs font-bold uppercase tracking-wider"
                  >
                    Save Look
                  </button>
                  <button
                    onClick={() => {
                      setMobileDrawerOpen(false);
                      navigate('/contact');
                    }}
                    className="flex-1 bg-[#C9A55A] text-[#0A0908] py-3 rounded-xl text-xs font-bold uppercase tracking-wider"
                  >
                    Get This Look →
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Save Look Modal */}
        <AnimatePresence>
          {showSaveModal && (
            <div className="fixed inset-0 z-[600] flex items-center justify-center p-4" role="dialog" aria-modal="true">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowSaveModal(false)}
                className="absolute inset-0 bg-black/80 backdrop-blur-md"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-[#141210] border border-[#C9A55A]/40 rounded-2xl p-6 md:p-8 max-w-md w-full relative z-10 shadow-2xl text-white"
              >
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <Sparkles size={16} className="text-[#C9A55A]" />
                    <h3 className="font-serif text-lg font-bold">Your Custom Room Look</h3>
                  </div>
                  <button onClick={() => setShowSaveModal(false)} className="text-white/50 hover:text-white">
                    <X size={18} />
                  </button>
                </div>

                <div className="my-5 space-y-2 text-xs font-sans text-white/80 bg-white/5 p-4 rounded-xl">
                  <div className="flex justify-between">
                    <span className="text-white/50">Window Blinds:</span>
                    <span className="font-bold text-[#C9A55A] uppercase">{roomState.blindType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/50">Curtains:</span>
                    <span className="font-bold text-[#C9A55A]">{roomState.curtainColor === 'none' ? 'None' : 'Custom'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/50">Flooring:</span>
                    <span className="font-bold">{roomState.floorType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/50">Sofa Silhouette:</span>
                    <span className="font-bold uppercase">{roomState.sofaStyle}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/50">Lighting Ambiance:</span>
                    <span className="font-bold uppercase">{roomState.lightMode}</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      navigator.clipboard?.writeText(window.location.href);
                      alert('Custom configuration saved to clipboard!');
                      setShowSaveModal(false);
                    }}
                    className="flex-1 bg-white/10 hover:bg-white/20 py-3 rounded-xl text-xs uppercase font-bold tracking-wider transition-all"
                  >
                    Copy Link
                  </button>
                  <button
                    onClick={() => {
                      setShowSaveModal(false);
                      navigate('/contact');
                    }}
                    className="flex-1 bg-[#C9A55A] hover:bg-white text-[#0A0908] py-3 rounded-xl text-xs uppercase font-bold tracking-wider transition-all"
                  >
                    Get Free Quote →
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </PageTransition>
  );
};

export default RoomViewer;
