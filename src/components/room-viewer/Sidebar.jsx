import React from 'react';
import { roomProducts } from '../../data/roomProducts';
import { ChevronDown, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ roomState, onUpdate, onSave }) => {
  const navigate = useNavigate();

  const handleUpdate = (val) => {
    onUpdate(val);
  };

  return (
    <div className="flex flex-col w-full md:w-[300px] h-[45vh] md:h-full bg-bg-secondary border-r border-gold/10 overflow-hidden shrink-0">
      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden min-h-0 p-4 scrollbar-thin scrollbar-thumb-gold/30 touch-pan-y" data-lenis-prevent data-lenis-prevent-wheel data-lenis-prevent-touch style={{ overscrollBehavior: 'contain' }}>
        <div className="space-y-10 pb-10">
          
          {/* Section 1: Room Type */}
          <section>
            <label className="text-[10px] uppercase tracking-widest text-gold font-bold mb-4 block">Room type</label>
            <div className="grid grid-cols-2 gap-2">
              {roomProducts.rooms.map((room) => (
                <button
                  key={room.id}
                  onClick={() => handleUpdate({ roomType: room.id })}
                  className={`py-3 text-[10px] uppercase tracking-widest font-bold border transition-all ${
                    roomState.roomType === room.id ? 'border-gold text-gold bg-gold/5 shadow-[0_0_15px_rgba(201,165,90,0.1)]' : 'border-gold/10 text-ivory/40 hover:border-gold/30'
                  }`}
                >
                  {room.name}
                </button>
              ))}
            </div>
          </section>

          {/* Section 2: Brighton Blinds */}
          <section>
            <div className="flex items-center justify-between mb-4">
                <label className="text-[10px] uppercase tracking-widest text-gold font-bold">Window blinds</label>
                <span className="text-[8px] bg-gold text-bg-primary px-1.5 py-0.5 font-bold tracking-tighter uppercase">Brighton Decore</span>
            </div>
            <div className="space-y-3">
              {roomProducts.categories.blinds.map((blind, idx) => (
                <div 
                  key={blind.id}
                  onClick={() => handleUpdate({ blindType: blind.id })}
                  className={`p-3 border cursor-pointer transition-all flex items-start gap-3 group relative ${
                    roomState.blindType === blind.id ? 'border-gold border-[1.5px] bg-gold/5' : 'border-gold/10 hover:border-gold/30'
                  }`}
                >
                  <div className="w-16 h-12 shrink-0 bg-bg-tertiary overflow-hidden">
                    <img 
                        src={`/assets/imgs/products/${blind.id}-blinds.jpg`} 
                        alt="" 
                        className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all"
                        onError={(e) => {
                          e.target.src = '/assets/imgs/common/placeholder.jpg';
                        }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-white text-[11px] font-bold tracking-wide">{blind.name}</h4>
                    <p className="text-ivory-muted text-[9px] truncate mt-0.5">{blind.shortDesc}</p>
                    <p className="text-gold text-[9px] font-bold mt-1 opacity-70">{blind.priceRange}</p>
                  </div>
                  {roomState.blindType === blind.id && (
                      <div className="absolute top-2 right-2 text-gold">
                        <Check size={14} />
                      </div>
                  )}
                  <button className={`w-full absolute inset-0 z-10 opacity-0`}>Apply</button>
                </div>
              ))}
            </div>
          </section>

          {/* Section 3: Wall Color */}
          <section>
            <label className="text-[10px] uppercase tracking-widest text-gold font-bold mb-4 block">Wall color</label>
            <div className="grid grid-cols-4 gap-4 px-2">
              {roomProducts.categories.wallColors.map((color) => (
                <button
                  key={color.hex}
                  onClick={() => handleUpdate({ wallColor: color.hex })}
                  className={`w-8 h-8 rounded-full border-2 transition-transform transform hover:scale-110 ${
                    roomState.wallColor === color.hex ? 'border-gold scale-125' : 'border-transparent'
                  }`}
                  style={{ backgroundColor: color.hex }}
                  title={color.label}
                />
              ))}
            </div>
          </section>

          {/* Section 4: Flooring */}
          <section>
            <label className="text-[10px] uppercase tracking-widest text-gold font-bold mb-4 block">Flooring</label>
            <div className="grid grid-cols-3 gap-3">
              {roomProducts.categories.flooring.map((floor) => (
                <div 
                    key={floor.label} 
                    className="flex flex-col items-center gap-2 cursor-pointer group"
                    onClick={() => handleUpdate({ floorColor: floor.color })}
                >
                    <div className={`w-10 h-10 rounded-sm border-2 transition-all ${
                        roomState.floorColor === floor.color ? 'border-gold scale-110' : 'border-transparent'
                    }`} style={{ backgroundColor: floor.color }} />
                    <span className={`text-[8px] uppercase font-bold tracking-tighter ${
                        roomState.floorColor === floor.color ? 'text-gold' : 'text-ivory/40'
                    }`}>{floor.label}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Section 5: Lighting */}
          <section>
            <label className="text-[10px] uppercase tracking-widest text-gold font-bold mb-4 block">Lighting mood</label>
            <div className="grid grid-cols-2 gap-2">
                {['warm', 'cool', 'bright', 'dim'].map(l => (
                    <button
                        key={l}
                        onClick={() => handleUpdate({ lightMode: l })}
                        className={`py-3 text-[10px] uppercase tracking-widest font-bold border ${
                            roomState.lightMode === l ? 'bg-gold text-bg-primary border-gold shadow-lg shadow-gold/10' : 'border-gold/10 text-ivory/40 hover:border-gold/30'
                        }`}
                    >
                        {l}
                    </button>
                ))}
            </div>
          </section>

          {/* Section 6: Rug */}
          <section>
            <label className="text-[10px] uppercase tracking-widest text-gold font-bold mb-4 block">Rug color</label>
            <div className="flex flex-wrap gap-4 px-2">
              {roomProducts.categories.rugs.map((rug) => (
                <button
                  key={rug.id}
                  onClick={() => handleUpdate({ rugColor: rug.id })}
                  className={`w-6 h-6 rounded-full border-2 transition-all ${
                    roomState.rugColor === rug.id ? 'border-gold scale-125' : 'border-transparent'
                  } ${rug.color === 'transparent' ? 'bg-white/10 overflow-hidden' : ''}`}
                  style={rug.color !== 'transparent' ? { backgroundColor: rug.color } : {}}
                  title={rug.name}
                >
                    {rug.color === 'transparent' && <div className="w-full h-full border-t border-red-500 -rotate-45" />}
                </button>
              ))}
            </div>
          </section>

        </div>
      </div>

      {/* Sidebar Footer */}
      <div className="p-4 bg-bg-tertiary border-t border-gold/20 shrink-0 flex flex-col gap-3">
        <button 
           onClick={onSave}
           className="w-full border border-gold text-gold py-3 px-4 text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-gold hover:text-bg-primary transition-all duration-300"
        >
          Save This Look
        </button>
        <button 
            onClick={() => navigate('/contact')}
            className="w-full bg-gold text-bg-primary py-4 px-4 text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-white transition-all transform hover:scale-[1.02] active:scale-95 duration-300 shadow-xl shadow-gold/10"
        >
            Place & Book Design
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
