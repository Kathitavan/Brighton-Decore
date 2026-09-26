// src/pages/RoomViewer.jsx
// Brighton Decor Ltd — 3D Room Studio Configurator Page
//
// Full architectural rebuild:
//   – Window treatments are the hero; the room is the context.
//   – Dark-luxury design system tokens (#0A0908, #C9A55A, Cormorant Garamond, DM Sans).
//   – Responsive: Desktop sidebar + Mobile slide-up drawer / bottom sheet.
//   – Preserves data contract: route state `preselect` triggers blind selection.
//   – Preserves CTAs: "Save This Look", "Get This Look", "Book Free Measurement".

import React, { useState, useEffect, Suspense } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  ChevronDown, 
  RefreshCcw, 
  Save, 
  X, 
  Sparkles, 
  Check, 
  Sliders,
  Maximize2
} from 'lucide-react';
import PageTransition from '../components/common/PageTransition';
import RoomCanvas from '../components/room-viewer/RoomCanvas';
import { TEMPLATES } from '../data/roomTemplates';
import { BLIND_PRODUCTS, WALL_COLORS, FLOOR_OPTIONS } from '../data/roomProducts';
import { company } from '../config/company';
import useModalScroll from '../hooks/useModalScroll';

// Default ArchViz Configuration
const DEFAULT_STATE = {
  floorType: 'lightoak',
  wallColor: '#F5F0E8',
  sofaColor: '#8A8A8A',
  sofaStyle: 'modern',
  blindType: 'roller',
  curtainColor: '#E8E4E0',
  curtainOpen: 0.5,
  rugColor: '#D4D0CC',
  rugPattern: 'solid',
  lightMode: 'warm',
  ceilingLightOn: true,
  floorLampOn: false,
  plantOn: true,
  decorOn: true,
  fanOn: false,
};

const CATEGORIES = [
  { id: 'blinds',   label: 'Blinds',    badge: 'Hero' },
  { id: 'curtains', label: 'Curtains' },
  { id: 'presets',  label: 'Presets' },
  { id: 'walls',    label: 'Walls' },
  { id: 'floors',   label: 'Flooring' },
  { id: 'sofa',     label: 'Sofa' },
  { id: 'rug',      label: 'Rug' },
  { id: 'lighting', label: 'Lighting' },
  { id: 'extras',   label: 'Decor' },
];

const RoomViewer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [roomState, setRoomState] = useState(DEFAULT_STATE);
  const [activeCategory, setActiveCategory] = useState('blinds');
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

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
      setActiveCategory('blinds');
      if (isMobile) setMobileDrawerOpen(true);
    }
  }, [location.state, isMobile]);

  const updateRoom = (key, value) => {
    setRoomState((prev) => ({ ...prev, [key]: value }));
  };

  const resetRoom = () => setRoomState(DEFAULT_STATE);
  const applyTemplate = (tpl) => setRoomState((prev) => ({ ...prev, ...tpl }));

  // Render Category Options
  const renderCategoryContent = () => {
    switch (activeCategory) {
      case 'blinds':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#C9A55A]">
                Window Blinds Collection
              </span>
              <span className="text-[8px] bg-[#C9A55A]/20 border border-[#C9A55A]/40 text-[#C9A55A] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                Hero Focus
              </span>
            </div>

            <p className="text-white/60 text-xs font-sans font-light leading-relaxed">
              Custom-crafted blinds engineered for Canadian light and climate control.
            </p>

            <div className="grid grid-cols-2 gap-2.5">
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
                    <span className="text-[9px] text-white/50 block mt-0.5 line-clamp-1">
                      {b.shortDesc}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        );

      case 'curtains':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#C9A55A]">
                Architectural Drapery
              </span>
              <span className="text-[8px] bg-[#C9A55A]/20 border border-[#C9A55A]/40 text-[#C9A55A] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                S-Fold
              </span>
            </div>

            <div>
              <p className="text-[9px] uppercase tracking-widest text-[#C9A55A]/80 mb-3 font-bold">
                Fabric Color
              </p>
              <div className="grid grid-cols-4 gap-3">
                {[
                  { label: 'Ivory Sheer', hex: '#F5F0E8' },
                  { label: 'Warm Linen',  hex: '#E8E4E0' },
                  { label: 'Soft Sky',    hex: '#B8D4E8' },
                  { label: 'Oatmeal',     hex: '#C4956A' },
                  { label: 'Antique Gold',hex: '#8B6914' },
                  { label: 'Charcoal',    hex: '#262320' },
                  { label: 'Espresso',    hex: '#4A3728' },
                  { label: 'Silver Fog',  hex: '#CCCCCC' },
                ].map((c) => {
                  const isSel = roomState.curtainColor === c.hex;
                  return (
                    <button
                      key={c.hex}
                      onClick={() => updateRoom('curtainColor', c.hex)}
                      className={`flex flex-col items-center gap-1.5 p-1 rounded-lg border transition-all ${
                        isSel ? 'border-[#C9A55A] bg-[#C9A55A]/10' : 'border-transparent hover:border-white/20'
                      }`}
                    >
                      <div
                        className={`w-7 h-7 rounded-md border-2 transition-transform ${
                          isSel ? 'border-[#C9A55A] scale-110 shadow-md' : 'border-transparent'
                        }`}
                        style={{ backgroundColor: c.hex }}
                      />
                      <span className="text-[8px] text-white/60 truncate w-full text-center">
                        {c.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="bg-white/[0.02] border border-white/10 rounded-xl p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] uppercase tracking-widest text-[#C9A55A] font-bold">
                  Curtain Opening
                </span>
                <span className="text-white text-xs font-mono">
                  {Math.round(roomState.curtainOpen * 100)}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={roomState.curtainOpen * 100}
                onChange={(e) => updateRoom('curtainOpen', e.target.value / 100)}
                className="w-full h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#C9A55A]"
              />
              <div className="flex justify-between text-[8px] text-white/40 uppercase tracking-widest mt-1">
                <span>Closed</span>
                <span>Fully Open</span>
              </div>
            </div>
          </div>
        );

      case 'presets':
        return (
          <div className="space-y-4">
            <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#C9A55A] block">
              Curated Room Presets
            </span>
            <div className="space-y-3">
              {Object.values(TEMPLATES).map((tpl) => (
                <div
                  key={tpl.id}
                  className="bg-white/[0.02] hover:bg-white/[0.05] p-3.5 rounded-xl border border-white/10 hover:border-[#C9A55A]/40 transition-all flex flex-col gap-3 group"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-white text-xs font-bold font-serif">{tpl.name}</h4>
                      <p className="text-[#C9A55A]/70 text-[9px] uppercase tracking-wider">{tpl.style}</p>
                    </div>
                    <div className="flex gap-1.5">
                      <div className="w-3.5 h-3.5 rounded-full border border-white/20" style={{ backgroundColor: tpl.wallColor }} title="Wall" />
                      <div className="w-3.5 h-3.5 rounded-full border border-white/20" style={{ backgroundColor: tpl.sofaColor }} title="Sofa" />
                    </div>
                  </div>
                  <button
                    onClick={() => applyTemplate(tpl)}
                    className="w-full text-[9px] uppercase font-bold tracking-[0.2em] text-[#C9A55A] border border-[#C9A55A]/30 py-2 rounded-lg hover:bg-[#C9A55A] hover:text-[#0A0908] transition-all"
                  >
                    Apply Look
                  </button>
                </div>
              ))}
            </div>
          </div>
        );

      case 'walls':
        return (
          <div className="space-y-4">
            <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#C9A55A] block">
              Wall Palette (Matte Limewash)
            </span>
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
        );

      case 'floors':
        return (
          <div className="space-y-4">
            <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#C9A55A] block">
              Flooring Surface
            </span>
            <div className="grid grid-cols-3 gap-2.5">
              {[
                { id: 'lightoak', label: 'Light Oak', hex: '#C8A882' },
                { id: 'darkwalnut', label: 'Dark Walnut', hex: '#3E2A18' },
                { id: 'marble', label: 'Marble', hex: '#EDEAE4' },
                { id: 'concrete', label: 'Concrete', hex: '#888580' },
                { id: 'herringbone', label: 'Chevron', hex: '#B89668' },
                { id: 'darktile', label: 'Dark Tile', hex: '#242322' },
              ].map((f) => {
                const isSel = roomState.floorType === f.id;
                return (
                  <button
                    key={f.id}
                    onClick={() => updateRoom('floorType', f.id)}
                    className={`flex flex-col items-center gap-2 p-2 rounded-xl border transition-all ${
                      isSel ? 'border-[#C9A55A] bg-[#C9A55A]/10' : 'border-white/10 hover:border-white/25'
                    }`}
                  >
                    <div
                      className={`w-full aspect-square rounded-lg border-2 ${
                        isSel ? 'border-[#C9A55A]' : 'border-transparent'
                      }`}
                      style={{ backgroundColor: f.hex }}
                    />
                    <span className={`text-[9px] uppercase font-bold ${isSel ? 'text-[#C9A55A]' : 'text-white/60'}`}>
                      {f.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        );

      case 'sofa':
        return (
          <div className="space-y-6">
            <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#C9A55A] block">
              Living Room Seating
            </span>
            <div>
              <p className="text-[9px] uppercase tracking-widest text-[#C9A55A]/80 mb-2.5 font-bold">
                Silhouette Style
              </p>
              <div className="grid grid-cols-3 gap-2">
                {['modern', 'chesterfield', 'curved'].map((s) => (
                  <button
                    key={s}
                    onClick={() => updateRoom('sofaStyle', s)}
                    className={`py-2 rounded-lg text-[9px] uppercase font-bold tracking-wider border transition-all ${
                      roomState.sofaStyle === s
                        ? 'bg-[#C9A55A] text-[#0A0908] border-[#C9A55A]'
                        : 'border-white/10 text-white/50 hover:border-white/30'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-[9px] uppercase tracking-widest text-[#C9A55A]/80 mb-2.5 font-bold">
                Upholstery Color
              </p>
              <div className="grid grid-cols-4 gap-3">
                {['#8A8A8A', '#3A2E20', '#4A7A9B', '#8B4513', '#2D4A22', '#F5F0E8', '#1A1814', '#C9A55A'].map((c) => (
                  <button
                    key={c}
                    onClick={() => updateRoom('sofaColor', c)}
                    className={`w-8 h-8 rounded-full border-2 mx-auto transition-transform ${
                      roomState.sofaColor === c ? 'border-[#C9A55A] scale-125' : 'border-transparent hover:scale-110'
                    }`}
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
            </div>
          </div>
        );

      case 'rug':
        return (
          <div className="space-y-6">
            <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#C9A55A] block">
              Area Rug Styling
            </span>
            <div>
              <p className="text-[9px] uppercase tracking-widest text-[#C9A55A]/80 mb-3 font-bold">Color</p>
              <div className="grid grid-cols-4 gap-3">
                <button
                  onClick={() => updateRoom('rugColor', 'none')}
                  className={`w-8 h-8 rounded-full border-2 mx-auto flex items-center justify-center ${
                    roomState.rugColor === 'none' ? 'border-[#C9A55A]' : 'border-white/20'
                  }`}
                  title="No Rug"
                >
                  <X size={12} className="text-[#C9A55A]" />
                </button>
                {['#D4D0CC', '#C9A55A', '#A0522D', '#2C3E50', '#8B7355', '#F5F0E8'].map((c) => (
                  <button
                    key={c}
                    onClick={() => updateRoom('rugColor', c)}
                    className={`w-8 h-8 rounded-full border-2 mx-auto transition-transform ${
                      roomState.rugColor === c ? 'border-[#C9A55A] scale-125' : 'border-transparent hover:scale-110'
                    }`}
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
            </div>

            {roomState.rugColor !== 'none' && (
              <div>
                <p className="text-[9px] uppercase tracking-widest text-[#C9A55A]/80 mb-2.5 font-bold">Pattern</p>
                <div className="grid grid-cols-2 gap-2">
                  {['solid', 'striped', 'geometric'].map((p) => (
                    <button
                      key={p}
                      onClick={() => updateRoom('rugPattern', p)}
                      className={`py-2 rounded-lg text-[9px] uppercase font-bold tracking-wider border ${
                        roomState.rugPattern === p
                          ? 'bg-[#C9A55A] text-[#0A0908] border-[#C9A55A]'
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

      case 'lighting':
        return (
          <div className="space-y-6">
            <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#C9A55A] block">
              Ambient Lighting Mood
            </span>
            <div>
              <p className="text-[9px] uppercase tracking-widest text-[#C9A55A]/80 mb-2.5 font-bold">Atmosphere</p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'warm',   l: 'Warm Candle' },
                  { id: 'cool',   l: 'Cool Daylight' },
                  { id: 'bright', l: 'Bright Noon' },
                  { id: 'dim',    l: 'Twilight Dim' },
                ].map((m) => (
                  <button
                    key={m.id}
                    onClick={() => updateRoom('lightMode', m.id)}
                    className={`py-2.5 rounded-lg text-[9px] uppercase font-bold tracking-wider border transition-all ${
                      roomState.lightMode === m.id
                        ? 'bg-[#C9A55A] text-[#0A0908] border-[#C9A55A]'
                        : 'border-white/10 text-white/50 hover:border-white/30'
                    }`}
                  >
                    {m.l}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3 pt-2 border-t border-white/10">
              {[
                { k: 'ceilingLightOn', l: 'Ceiling Pendant' },
                { k: 'floorLampOn',    l: 'Architectural Floor Lamp' },
              ].map((t) => (
                <div key={t.k} className="flex items-center justify-between">
                  <span className="text-white text-[10px] font-bold uppercase tracking-wider">{t.l}</span>
                  <button
                    onClick={() => updateRoom(t.k, !roomState[t.k])}
                    className={`w-9 h-5 rounded-full relative transition-colors ${
                      roomState[t.k] ? 'bg-[#C9A55A]' : 'bg-white/10'
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

      case 'extras':
        return (
          <div className="space-y-4">
            <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#C9A55A] block">
              Architectural Accessories
            </span>
            <div className="space-y-3">
              {[
                { k: 'plantOn', l: 'Indoor Plant' },
                { k: 'decorOn', l: 'Floating Wall Shelf & Books' },
                { k: 'fanOn',   l: 'Ceiling Fan (Animated)' },
              ].map((t) => (
                <div key={t.k} className="flex items-center justify-between p-2 rounded-lg bg-white/[0.02]">
                  <span className="text-white text-[10px] font-bold uppercase tracking-wider">{t.l}</span>
                  <button
                    onClick={() => updateRoom(t.k, !roomState[t.k])}
                    className={`w-9 h-5 rounded-full relative transition-colors ${
                      roomState[t.k] ? 'bg-[#C9A55A]' : 'bg-white/10'
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
        <div className="flex-1 flex overflow-hidden relative">
          {/* Desktop Left Sidebar (>=1024px) */}
          <aside className="hidden lg:flex w-[360px] h-full bg-[#0D0C0A] border-r border-white/10 flex-col shrink-0 z-40">
            {/* Category Navigation Pills */}
            <div className="p-3 border-b border-white/10 overflow-x-auto no-scrollbar">
              <div className="flex gap-1.5">
                {CATEGORIES.map((cat) => {
                  const isSel = activeCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className={`px-3 py-1.5 rounded-full text-[10px] uppercase font-bold tracking-wider whitespace-nowrap transition-all ${
                        isSel
                          ? 'bg-[#C9A55A] text-[#0A0908] shadow-sm'
                          : 'text-white/60 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {cat.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Category Content Area with Animated Transition */}
            <div className="flex-1 overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-white/10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCategory}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
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
                <RefreshCcw size={12} /> Reset to Default
              </button>
              <button
                onClick={() => navigate('/contact')}
                className="w-full bg-[#C9A55A] hover:bg-white text-[#0A0908] py-3 rounded-xl text-xs uppercase font-bold tracking-widest transition-all shadow-lg"
              >
                Book Free Measurement →
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
            <div className="lg:hidden absolute bottom-0 left-0 right-0 z-30 p-3 bg-gradient-to-t from-black/90 via-black/70 to-transparent">
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
                className="bg-[#12110F] border-t border-[#C9A55A]/30 rounded-t-2xl max-h-[75vh] flex flex-col relative z-10 shadow-2xl overflow-hidden"
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
                <div className="p-3 border-b border-white/10 overflow-x-auto no-scrollbar shrink-0">
                  <div className="flex gap-2">
                    {CATEGORIES.map((cat) => {
                      const isSel = activeCategory === cat.id;
                      return (
                        <button
                          key={cat.id}
                          onClick={() => setActiveCategory(cat.id)}
                          className={`px-3 py-1.5 rounded-full text-[10px] uppercase font-bold tracking-wider whitespace-nowrap transition-all ${
                            isSel
                              ? 'bg-[#C9A55A] text-[#0A0908]'
                              : 'text-white/60 bg-white/5 hover:text-white'
                          }`}
                        >
                          {cat.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Drawer Content */}
                <div className="flex-1 overflow-y-auto p-4 min-h-[220px]">
                  {renderCategoryContent()}
                </div>

                {/* Drawer Bottom CTAs */}
                <div className="p-4 border-t border-white/10 bg-[#0A0908] flex gap-3 shrink-0">
                  <button
                    onClick={() => {
                      setMobileDrawerOpen(false);
                      setShowSaveModal(true);
                    }}
                    className="flex-1 border border-[#C9A55A]/40 text-[#C9A55A] py-3 rounded-xl text-[10px] uppercase font-bold tracking-widest"
                  >
                    Save Look
                  </button>
                  <button
                    onClick={() => navigate('/contact')}
                    className="flex-1 bg-[#C9A55A] text-[#0A0908] py-3 rounded-xl text-[10px] uppercase font-bold tracking-widest"
                  >
                    Get This Look
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Save This Look Modal */}
        <AnimatePresence>
          {showSaveModal && (
            <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-6" role="dialog" aria-modal="true">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/85 backdrop-blur-md"
                onClick={() => setShowSaveModal(false)}
              />
              <motion.div
                initial={{ scale: 0.94, opacity: 0, y: 15 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.94, opacity: 0, y: 15 }}
                className="bg-[#161513] border border-[#C9A55A]/35 rounded-2xl p-6 md:p-10 max-w-lg w-full relative z-10 shadow-2xl overflow-hidden"
              >
                <button
                  onClick={() => setShowSaveModal(false)}
                  className="absolute top-5 right-5 text-white/50 hover:text-white p-2"
                >
                  <X size={20} />
                </button>

                <div className="flex items-center gap-2 text-[#C9A55A] mb-2">
                  <Sparkles size={16} />
                  <span className="text-[10px] uppercase font-bold tracking-[0.25em]">
                    Custom Room Specification
                  </span>
                </div>

                <h3 className="text-2xl font-serif text-white font-light mb-6">
                  Your Styled Window & Room Look
                </h3>

                <div className="grid grid-cols-2 gap-3 mb-8 max-h-[40vh] overflow-y-auto pr-2">
                  {[
                    { l: 'Window Blinds', v: roomState.blindType.toUpperCase() },
                    { l: 'Curtains',      v: `${roomState.curtainColor} (${Math.round(roomState.curtainOpen * 100)}% Open)` },
                    { l: 'Wall Color',    v: roomState.wallColor },
                    { l: 'Flooring',      v: roomState.floorType.toUpperCase() },
                    { l: 'Sofa',          v: `${roomState.sofaStyle} · ${roomState.sofaColor}` },
                    { l: 'Area Rug',      v: `${roomState.rugColor} · ${roomState.rugPattern}` },
                    { l: 'Lighting',      v: roomState.lightMode.toUpperCase() },
                    { l: 'Decor Extras',  v: [roomState.plantOn && 'Plant', roomState.decorOn && 'Shelf', roomState.fanOn && 'Fan'].filter(Boolean).join(', ') || 'None' },
                  ].map((item, i) => (
                    <div key={i} className="p-2.5 rounded-lg bg-white/[0.02] border border-white/5 flex flex-col gap-1">
                      <span className="text-[9px] uppercase font-bold text-[#C9A55A] tracking-wider">
                        {item.l}
                      </span>
                      <span className="text-xs text-white/90 truncate font-mono">
                        {item.v}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => navigate('/contact')}
                    className="w-full bg-[#C9A55A] hover:bg-white text-[#0A0908] py-3.5 rounded-xl uppercase font-bold text-xs tracking-widest transition-all shadow-lg"
                  >
                    Book Free Measurement with This Look →
                  </button>
                  <button
                    onClick={() => setShowSaveModal(false)}
                    className="w-full border border-white/15 text-white/70 py-3 rounded-xl uppercase font-bold text-[10px] tracking-widest hover:border-white/30"
                  >
                    Continue Customizing
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
