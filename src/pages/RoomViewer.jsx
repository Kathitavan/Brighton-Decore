import React, { useState, useEffect, Suspense } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ChevronDown, RefreshCcw, Save, X, Sparkles, Check, Info } from 'lucide-react';
import PageTransition from '../components/common/PageTransition';
import RoomCanvas from '../components/room-viewer/RoomCanvas';
import { TEMPLATES } from '../data/roomTemplates';
import { BLIND_PRODUCTS, WALL_COLORS, FLOOR_OPTIONS } from '../data/roomProducts';
import { company } from '../config/company';
import styles from '../styles/pages/roomViewer.module.css';
import useModalScroll from '../hooks/useModalScroll';

const DEFAULT_STATE = {
  floorType: 'lightoak',
  wallColor: '#F5F0E8',
  sofaColor: '#8A8A8A',
  sofaStyle: 'modern',
  blindType: 'roller',
  curtainColor: '#E8E4E0',
  curtainOpen: 0.6,
  rugColor: '#D4D0CC',
  rugPattern: 'solid',
  lightMode: 'warm',
  ceilingLightOn: true,
  floorLampOn: false,
  plantOn: true,
  decorOn: true,
  fanOn: false,
};

const Section = ({ title, id, activeSection, setActiveSection, children, badge }) => {
  const isOpen = activeSection === id;
  return (
    <div className="border-b border-gold/10 overflow-hidden">
      <button 
        onClick={() => setActiveSection(isOpen ? null : id)}
        className={`w-full flex items-center justify-between p-4 text-left transition-all ${isOpen ? 'bg-gold/5' : 'hover:bg-gold/5'}`}
      >
        <div className="flex items-center gap-2">
            <span className={`text-[10px] uppercase font-bold tracking-[0.2em] ${isOpen ? 'text-gold' : 'text-ivory/60'}`}>{title}</span>
            {badge && <span className="text-[8px] bg-gold text-bg-primary px-1.5 py-0.5 rounded-sm font-bold uppercase">{badge}</span>}
        </div>
        <ChevronDown size={14} className={`text-gold transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            className="overflow-hidden"
          >
            <div className="p-4 pt-0 space-y-6">
                {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const RoomViewer = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [activeSection, setActiveSection] = useState(window.innerWidth < 768 ? null : 'presets');
    const [roomState, setRoomState] = useState(DEFAULT_STATE);
    const [showSaveModal, setShowSaveModal] = useState(false);
    useModalScroll(showSaveModal);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (location.state?.preselect) {
            setRoomState(prev => ({ ...prev, blindType: location.state.preselect }));
            setActiveSection('blinds');
        }
    }, [location.state]);

    const updateRoom = (key, value) => setRoomState(prev => ({ ...prev, [key]: value }));
    const resetRoom = () => setRoomState(DEFAULT_STATE);
    const applyTemplate = (template) => setRoomState({ ...DEFAULT_STATE, ...template });

    return (
        <PageTransition>
            <div className={`flex flex-col h-screen w-full overflow-hidden ${styles.roomStudioPage}`}>
                {/* Top Bar */}
                <div className="h-[56px] w-full bg-[#0F0E0C] border-b border-gold/20 flex items-center justify-between px-4 md:px-6 z-[100]">
                    <button 
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-gold border border-gold/30 px-3 md:px-4 py-1.5 rounded-full hover:bg-gold/10 transition-all text-[10px] uppercase font-bold tracking-widest"
                    >
                        <ArrowLeft size={16} /> <span className="hidden md:inline">Back</span>
                    </button>

                    <h1 className="text-white font-serif text-lg md:text-xl flex items-center gap-2">
                        <img src={company.logo} alt={company.name} className="h-7 w-auto object-contain" />
                        <span className="text-gold">✦</span> <span className="italic opacity-80 text-sm md:text-base">3D Room Studio</span>
                    </h1>

                    <div className="flex items-center gap-2 md:gap-4">
                        <button 
                            onClick={() => setShowSaveModal(true)}
                            className="hidden sm:block text-gold border border-gold/30 px-4 py-1.5 text-[10px] uppercase font-bold tracking-widest hover:bg-gold/10 transition-all font-sans"
                        >
                            Save Look
                        </button>
                        <button 
                            onClick={() => navigate('/contact')}
                            className="bg-gold text-bg-primary px-4 md:px-6 py-2 text-[10px] uppercase font-bold tracking-[0.2em] hover:bg-white transition-all transform hover:scale-105 active:scale-95 group flex items-center gap-2"
                        >
                            <span className="hidden sm:inline">Get This Look</span> <ArrowLeft size={14} className="rotate-180" />
                        </button>
                    </div>
                </div>

                {/* Main Area */}
                <div className={`flex-1 flex ${isMobile ? 'flex-col' : 'flex-row'} overflow-hidden relative`}>
                    {/* Sidebar */}
                    <aside className={`${isMobile ? 'w-full h-[45vh] order-2' : 'w-[300px] h-full'} bg-[#0D0C0A] border-r border-gold/10 flex flex-col z-[50]`}>
                        <div className="p-4 pb-0 flex-shrink-0">
                            <span className="text-[9px] uppercase tracking-[0.3em] text-gold font-bold mb-3 block">Customize Your Room</span>
                            
                            {/* Horizontal Category Picker (Mobile/Tablet) */}
                            <div className="flex overflow-x-auto no-scrollbar gap-4 border-b border-gold/5 pb-2 mb-1 scroll-smooth" data-lenis-prevent data-lenis-prevent-wheel data-lenis-prevent-touch>
                                {[
                                    { id: 'presets', l: 'Presets' },
                                    { id: 'floors', l: 'Flooring' },
                                    { id: 'walls', l: 'Wall' },
                                    { id: 'sofa', l: 'Sofa' },
                                    { id: 'blinds', l: 'Blinds' },
                                    { id: 'curtains', l: 'Curtains' },
                                    { id: 'rug', l: 'Rug' },
                                    { id: 'lighting', l: 'Light' },
                                    { id: 'extras', l: 'Decor' },
                                ].map(cat => (
                                    <button
                                        key={cat.id}
                                        onClick={() => {
                                            setActiveSection(cat.id);
                                            const el = document.getElementById(`section-${cat.id}`);
                                            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                        }}
                                        className={`whitespace-nowrap text-[9px] uppercase font-bold tracking-widest pb-2 border-b transition-all ${activeSection === cat.id ? 'text-gold border-gold' : 'text-ivory/30 border-transparent hover:text-ivory/60'}`}
                                    >
                                        {cat.l}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto min-h-0 scrollbar-v3 scroll-smooth touch-pan-y" data-lenis-prevent data-lenis-prevent-wheel data-lenis-prevent-touch style={{ overscrollBehavior: 'contain' }}>
                            <div id="section-presets">
                                <Section title="Quick Presets" id="presets" activeSection={activeSection} setActiveSection={setActiveSection}>
                                    <div className={`flex ${isMobile ? 'flex-row overflow-x-auto pb-4 scrollbar-thin' : 'flex-col'} gap-3`}>
                                        {Object.values(TEMPLATES).map((tpl) => (
                                            <div key={tpl.id} className="min-w-[220px] bg-bg-tertiary p-3 border border-gold/10 flex flex-col gap-3 group hover:border-gold/30 transition-all">
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <h4 className="text-white text-[12px] font-bold">{tpl.name}</h4>
                                                        <p className="text-gold/60 text-[9px] uppercase tracking-tighter">{tpl.style}</p>
                                                    </div>
                                                    <div className="flex gap-1">
                                                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: tpl.wallColor }} />
                                                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: tpl.sofaColor }} />
                                                    </div>
                                                </div>
                                                <button 
                                                    onClick={() => applyTemplate(tpl)}
                                                    className="w-full text-[9px] uppercase font-bold tracking-[0.2em] text-gold border border-gold/20 py-2 hover:bg-gold hover:text-bg-primary transition-all"
                                                >
                                                    Apply Template
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </Section>
                            </div>

                            <div id="section-floors">
                                <Section title="Flooring" id="floors" activeSection={activeSection} setActiveSection={setActiveSection}>
                                    <div className="grid grid-cols-3 gap-2">
                                        {[
                                            { id: 'lightoak', label: 'Light Oak', hex: '#C8A882' },
                                            { id: 'darkwalnut', label: 'Dark Walnut', hex: '#4A3520' },
                                            { id: 'marble', label: 'Marble', hex: '#E8E4E0' },
                                            { id: 'concrete', label: 'Concrete', hex: '#8A8A8A' },
                                            { id: 'herringbone', label: 'Herringbone', hex: '#B8986A' },
                                            { id: 'darktile', label: 'Dark Tile', hex: '#2A2A2A' },
                                        ].map(f => (
                                            <button 
                                                key={f.id} 
                                                onClick={() => updateRoom('floorType', f.id)}
                                                className="flex flex-col items-center gap-1 group"
                                            >
                                                <div className={`w-full aspect-square rounded-sm border-2 transition-all ${roomState.floorType === f.id ? 'border-gold' : 'border-transparent shadow-inner'}`} style={{ backgroundColor: f.hex }} />
                                                <span className={`text-[8px] uppercase tracking-tighter font-bold ${roomState.floorType === f.id ? 'text-gold' : 'text-ivory/40'}`}>{f.label}</span>
                                            </button>
                                        ))}
                                    </div>
                                </Section>
                            </div>

                            <div id="section-walls">
                                <Section title="Wall Color" id="walls" activeSection={activeSection} setActiveSection={setActiveSection}>
                                    <div className="grid grid-cols-4 gap-4 p-2">
                                        {WALL_COLORS.map(c => (
                                            <button
                                                key={c.hex}
                                                onClick={() => updateRoom('wallColor', c.hex)}
                                                className={`w-7 h-7 rounded-full border-2 transition-all relative ${roomState.wallColor === c.hex ? 'border-gold scale-125 shadow-[0_0_10px_rgba(201,165,90,0.3)]' : 'border-transparent'}`}
                                                style={{ backgroundColor: c.hex }}
                                                title={c.label}
                                            />
                                        ))}
                                    </div>
                                </Section>
                            </div>

                            <div id="section-sofa">
                                <Section title="Sofa" id="sofa" activeSection={activeSection} setActiveSection={setActiveSection}>
                                    <div className="space-y-4">
                                        <div>
                                            <p className="text-[9px] uppercase tracking-widest text-gold/60 mb-2 font-bold">Style</p>
                                            <div className="grid grid-cols-3 gap-1">
                                                {['modern', 'chesterfield', 'curved'].map(s => (
                                                    <button 
                                                        key={s} 
                                                        onClick={() => updateRoom('sofaStyle', s)}
                                                        className={`py-2 text-[9px] uppercase font-bold tracking-widest border transition-all ${roomState.sofaStyle === s ? 'bg-gold text-bg-primary border-gold' : 'border-gold/10 text-ivory/40'}`}
                                                    >
                                                        {s}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-[9px] uppercase tracking-widest text-gold/60 mb-2 font-bold">Fabric Color</p>
                                            <div className="grid grid-cols-4 gap-3">
                                                {['#8A8A8A', '#3A2E20', '#4A7A9B', '#8B4513', '#2D4A22', '#F5F0E8', '#1A1814', '#C9A55A'].map(c => (
                                                    <button 
                                                        key={c} 
                                                        onClick={() => updateRoom('sofaColor', c)}
                                                        className={`w-8 h-8 rounded-full border-2 ${roomState.sofaColor === c ? 'border-gold' : 'border-transparent'}`} 
                                                        style={{ backgroundColor: c }} 
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </Section>
                            </div>

                            <div id="section-blinds">
                                <Section title="Window Blinds" id="blinds" activeSection={activeSection} setActiveSection={setActiveSection} badge="Brighton Decor">
                                    <div className="grid grid-cols-2 gap-2.5">
                                        {BLIND_PRODUCTS.map(b => {
                                            const isSelected = roomState.blindType === b.id;
                                            return (
                                                <button 
                                                    key={b.id} 
                                                    type="button"
                                                    onClick={() => updateRoom('blindType', b.id)}
                                                    className={`p-2.5 border rounded-xl bg-bg-tertiary flex flex-col items-center gap-2 transition-all duration-300 relative group cursor-pointer text-left w-full ${
                                                        isSelected 
                                                            ? 'border-gold bg-gold/15 shadow-[0_0_15px_rgba(201,165,90,0.25)] ring-1 ring-gold' 
                                                            : 'border-gold/15 opacity-75 hover:opacity-100 hover:border-gold/40'
                                                    }`}
                                                >
                                                    <div className="w-full aspect-[16/10] rounded-lg overflow-hidden bg-[#1A1814] relative">
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
                                                            <div className="absolute top-1.5 right-1.5 bg-gold text-[#0D0C0A] w-5 h-5 rounded-full flex items-center justify-center shadow-md z-10">
                                                                <Check size={12} strokeWidth={3} />
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="w-full">
                                                        <span className={`text-[10px] font-bold block truncate ${isSelected ? 'text-gold' : 'text-white'}`}>{b.name}</span>
                                                        <span className="text-[8px] text-ivory/60 block mt-0.5 line-clamp-1">{b.shortDesc}</span>
                                                    </div>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </Section>
                            </div>

                            <div id="section-curtains">
                                <Section title="Curtains" id="curtains" activeSection={activeSection} setActiveSection={setActiveSection}>
                                    <div className="space-y-6">
                                        <div>
                                            <p className="text-[9px] uppercase tracking-widest text-gold/60 mb-3 font-bold">Fabric Color</p>
                                            <div className="grid grid-cols-4 gap-4 px-2">
                                                {['#F5F0E8', '#E8E4E0', '#B8D4E8', '#C4956A', '#8B6914', '#2C3E50', '#4A3728', '#CCCCCC'].map(c => (
                                                    <button 
                                                        key={c} 
                                                        onClick={() => updateRoom('curtainColor', c)}
                                                        className={`w-7 h-7 rounded-sm border-2 ${roomState.curtainColor === c ? 'border-gold' : 'border-transparent'}`} 
                                                        style={{ backgroundColor: c }} 
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                        <div>
                                            <div className="flex justify-between items-center mb-2">
                                                <p className="text-[9px] uppercase tracking-widest text-gold/60 font-bold">Opening</p>
                                                <span className="text-white text-[10px] font-mono">{Math.round(roomState.curtainOpen * 100)}%</span>
                                            </div>
                                            <input 
                                                type="range" 
                                                min="0" max="100" 
                                                value={roomState.curtainOpen * 100} 
                                                onChange={(e) => updateRoom('curtainOpen', e.target.value / 100)}
                                                className="w-full h-1 bg-gold/20 appearance-none cursor-pointer accent-gold"
                                            />
                                        </div>
                                    </div>
                                </Section>
                            </div>

                            <div id="section-rug">
                                <Section title="Rug" id="rug" activeSection={activeSection} setActiveSection={setActiveSection}>
                                    <div className="space-y-6">
                                        <div>
                                            <p className="text-[9px] uppercase tracking-widest text-gold/60 mb-3 font-bold">Color</p>
                                            <div className="grid grid-cols-4 gap-4 px-2">
                                                <button onClick={() => updateRoom('rugColor', 'none')} className={`w-7 h-7 border-2 flex items-center justify-center ${roomState.rugColor === 'none' ? 'border-gold' : 'border-gold/20'}`}>
                                                    <X size={12} className="text-gold" />
                                                </button>
                                                {['#D4D0CC', '#C9A55A', '#A0522D', '#2C3E50', '#8B7355', '#F5F0E8'].map(c => (
                                                    <button 
                                                        key={c} 
                                                        onClick={() => updateRoom('rugColor', c)}
                                                        className={`w-7 h-7 rounded-full border-2 ${roomState.rugColor === c ? 'border-gold scale-110' : 'border-transparent'}`} 
                                                        style={{ backgroundColor: c }} 
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                        {roomState.rugColor !== 'none' && (
                                            <div>
                                                <p className="text-[9px] uppercase tracking-widest text-gold/60 mb-2 font-bold">Pattern</p>
                                                <div className="grid grid-cols-2 gap-1">
                                                    {['solid', 'striped', 'geometric', 'ornate'].map(p => (
                                                        <button 
                                                            key={p} 
                                                            onClick={() => updateRoom('rugPattern', p)}
                                                            className={`py-2 text-[9px] uppercase font-bold tracking-widest border ${roomState.rugPattern === p ? 'bg-gold text-bg-primary border-gold' : 'border-gold/10 text-ivory/40'}`}
                                                        >
                                                            {p}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </Section>
                            </div>

                            <div id="section-lighting">
                                <Section title="Lighting" id="lighting" activeSection={activeSection} setActiveSection={setActiveSection}>
                                    <div className="space-y-6">
                                        <div>
                                            <p className="text-[9px] uppercase tracking-widest text-gold/60 mb-2 font-bold">Mood</p>
                                            <div className="grid grid-cols-2 gap-1">
                                                {['warm', 'cool', 'bright', 'dim'].map(m => (
                                                    <button 
                                                        key={m} 
                                                        onClick={() => updateRoom('lightMode', m)}
                                                        className={`py-2 text-[9px] uppercase font-bold tracking-widest border transition-all ${roomState.lightMode === m ? 'bg-gold text-bg-primary border-gold' : 'border-gold/10 text-ivory/40'}`}
                                                    >
                                                        {m}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            {[
                                                { k: 'ceilingLightOn', l: 'Ceiling Light' },
                                                { k: 'floorLampOn', l: 'Floor Lamp' }
                                            ].map(t => (
                                                <div key={t.k} className="flex items-center justify-between">
                                                    <span className="text-white text-[10px] font-bold uppercase tracking-wider">{t.l}</span>
                                                    <button 
                                                        onClick={() => updateRoom(t.k, !roomState[t.k])}
                                                        className={`w-8 h-4 rounded-full relative transition-colors ${roomState[t.k] ? 'bg-gold' : 'bg-white/10'}`}
                                                    >
                                                        <div className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-all ${roomState[t.k] ? 'left-4.5' : 'left-0.5'}`} />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </Section>
                            </div>

                            <div id="section-extras">
                                <Section title="Extras & Decor" id="extras" activeSection={activeSection} setActiveSection={setActiveSection}>
                                    <div className="space-y-3">
                                        {[
                                            { k: 'plantOn', l: 'Indoor Plant' },
                                            { k: 'decorOn', l: 'Decor Items' },
                                            { k: 'fanOn', l: 'Ceiling Fan' }
                                        ].map(t => (
                                            <div key={t.k} className="flex items-center justify-between">
                                                <span className="text-white text-[10px] font-bold uppercase tracking-wider">{t.l}</span>
                                                <button 
                                                    onClick={() => updateRoom(t.k, !roomState[t.k])}
                                                    className={`w-8 h-4 rounded-full relative transition-colors ${roomState[t.k] ? 'bg-gold' : 'bg-white/10'}`}
                                                >
                                                    <div className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-all ${roomState[t.k] ? 'left-4.5' : 'left-0.5'}`} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </Section>
                            </div>
                        </div>

                        {/* Sidebar Footer */}
                        <div className="flex-shrink-0 p-4 border-t border-gold/10 space-y-3 bg-[#0a0908]">
                            <button 
                                onClick={resetRoom}
                                className="w-full flex items-center justify-center gap-2 text-[9px] uppercase tracking-widest text-ivory/40 hover:text-gold transition-colors font-bold py-2"
                            >
                                <RefreshCcw size={12} /> Reset to default
                            </button>
                            <button 
                                onClick={() => setShowSaveModal(true)}
                                className="w-full border border-gold text-gold py-3 text-[10px] uppercase font-bold tracking-widest hover:bg-gold hover:text-bg-primary transition-all"
                            >
                                Save This Look
                            </button>
                            <button 
                                onClick={() => navigate('/contact')}
                                className="w-full bg-gold text-bg-primary py-3.5 text-[10px] uppercase font-bold tracking-widest hover:bg-white transition-all"
                            >
                                Book Free Measurement →
                            </button>
                        </div>
                    </aside>

                    {/* Rendering Canvas */}
                    <div className="flex-1 h-full relative bg-[#050505]">
                        <Suspense fallback={
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-gold">
                                <div className="w-16 h-16 border-2 border-gold/20 border-t-gold rounded-full animate-spin mb-6" />
                                <h3 className="font-serif text-3xl italic animate-pulse">Loading Studio...</h3>
                            </div>
                        }>
                            <RoomCanvas roomState={roomState} />
                        </Suspense>

                        {/* Controls Hint */}
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-none text-center">
                            <p className="text-white/40 text-[9px] uppercase tracking-[0.4em] mb-1">
                                {isMobile ? 'Pinch to zoom · Drag to rotate' : 'Drag to rotate · Scroll to zoom · Right-click to pan'}
                            </p>
                            <div className="w-12 h-[1px] bg-gold/20 mx-auto" />
                        </div>
                    </div>
                </div>

                {/* Save Look Modal */}
                <AnimatePresence>
                    {showSaveModal && (
                        <div 
                            className="fixed inset-0 z-[1000] flex items-center justify-center p-6"
                            role="dialog"
                            aria-modal="true"
                            data-lenis-prevent
                        >
                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 bg-black/80 backdrop-blur-md" 
                                onClick={() => setShowSaveModal(false)} 
                            />
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                                animate={{ scale: 1, opacity: 1, y: 0 }}
                                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                                className="bg-[#1A1814] border border-gold/30 rounded-2xl p-8 md:p-12 max-w-lg w-full relative z-10 shadow-[0_0_100px_rgba(201,165,90,0.15)] overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none">
                                    <Sparkles size={120} className="text-gold" />
                                </div>
                                <button 
                                    onClick={() => setShowSaveModal(false)}
                                    className="absolute top-6 right-6 text-gold/40 hover:text-white transition-colors"
                                >
                                    <X size={24} />
                                </button>

                                <h3 className="text-2xl md:text-3xl font-serif text-gold mb-8 italic">Your Room Design Summary</h3>
                                
                                <div className="grid grid-cols-2 gap-y-4 gap-x-8 mb-10 overflow-y-auto max-h-[40vh] pr-4 modal-scroll-area touch-pan-y" data-lenis-prevent data-lenis-prevent-wheel data-lenis-prevent-touch style={{ overscrollBehavior: 'contain' }}>
                                    {[
                                        { l: 'Floor', v: roomState.floorType },
                                        { l: 'Wall', v: roomState.wallColor },
                                        { l: 'Sofa', v: `${roomState.sofaStyle} | ${roomState.sofaColor}` },
                                        { l: 'Blinds', v: roomState.blindType },
                                        { l: 'Curtains', v: `${roomState.curtainColor} | ${Math.round(roomState.curtainOpen*100)}%` },
                                        { l: 'Rug', v: `${roomState.rugColor} | ${roomState.rugPattern}` },
                                        { l: 'Lighting', v: roomState.lightMode },
                                        { l: 'Extras', v: [roomState.plantOn && 'Plant', roomState.decorOn && 'Decor', roomState.fanOn && 'Fan'].filter(Boolean).join(', ') || 'None' }
                                    ].map((item, i) => (
                                        <div key={i} className="flex flex-col gap-1 border-b border-gold/10 pb-2">
                                            <span className="text-gold/60 text-[9px] uppercase font-bold tracking-widest">{item.l}</span>
                                            <span className="text-ivory text-[11px] truncate uppercase font-bold">{item.v}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex flex-col gap-4 relative z-10">
                                    <button 
                                        onClick={() => navigate('/contact')}
                                        className="w-full bg-gold text-bg-primary py-4 uppercase font-bold text-xs tracking-widest hover:bg-white transition-all transform hover:scale-[1.02] active:scale-95"
                                    >
                                        Book Free Measurement →
                                    </button>
                                    <button 
                                        onClick={() => setShowSaveModal(false)}
                                        className="w-full border border-gold/20 text-ivory py-4 uppercase font-bold text-[10px] tracking-widest hover:bg-gold/10 transition-all"
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
