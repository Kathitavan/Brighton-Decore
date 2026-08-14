// src/components/products/WindowCurtainShowcase.jsx
// Brighton Decor Canada — Photorealistic Architectural Window & Drapery Studio (R3F)
import React, { useState, useRef, useMemo, Suspense, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows, Html, OrbitControls, Environment } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import { Sparkles, Shield, Ruler, Layers, Sliders, Sun, Moon, RefreshCcw, ArrowRight, Eye, Check } from 'lucide-react';

const fabricTints = [
  { id: 'linen', name: 'Linen White', hex: '#FAF8F5', roughness: 0.4, sheenColor: '#D9C5A0' },
  { id: 'sand', name: 'Warm Sand', hex: '#E6DCB8', roughness: 0.35, sheenColor: '#B89656' },
  { id: 'walnut', name: 'Artisan Walnut', hex: '#3D2B1F', roughness: 0.45, sheenColor: '#8C6747' },
  { id: 'sage', name: 'Botanical Sage', hex: '#7A8C78', roughness: 0.38, sheenColor: '#A3B8A1' },
];

const lightingModes = [
  { id: 'daylight', name: 'Bright Daylight', sunColor: '#FFF8EE', intensity: 1.6, sunPos: [5, 6, 4], bgGradient: 'from-[#E0ECEB] to-[#F5F0E6]' },
  { id: 'evening', name: 'Warm Evening', sunColor: '#FFD8A8', intensity: 1.1, sunPos: [6, 3, 3], bgGradient: 'from-[#2C241D] to-[#140F0B]' },
];

// Procedural S-Fold Drapery Curtain Mesh with Vertical Wave Folds & Breeze
function SculptedSFoldCurtain({ isLeft, curtainOpen, fabricTint, breezeAmount = 1 }) {
  const meshRef = useRef();
  const width = 1.8;
  const height = 3.3;
  const segsX = 64;
  const segsY = 64;

  // Base BufferGeometry with vertical S-fold sinusoidal deformation
  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(width, height, segsX, segsY);
    const pos = geo.attributes.position;
    const waveFreq = 16; // vertical S-folds frequency

    for (let i = 0; i < pos.count; i++) {
      const u = (pos.getX(i) + width / 2) / width; // 0 to 1 along width
      const v = (pos.getY(i) + height / 2) / height; // 0 to 1 along height

      // Sinusoidal vertical fold depth Z
      const foldZ = Math.sin(u * Math.PI * waveFreq) * 0.08 * (0.4 + 0.6 * v);
      pos.setZ(i, foldZ);
    }

    geo.computeVertexNormals();
    return geo;
  }, [width, height, segsX, segsY]);

  // Animate curtain gather X position, scale, and subtle airflow breeze in useFrame
  useFrame((state, delta) => {
    if (!meshRef.current) return;
    const time = state.clock.elapsedTime;
    const breeze = Math.sin(time * 1.8 + (isLeft ? 0 : Math.PI)) * 0.015 * breezeAmount;

    // Determine target X and gather compression
    // Left curtain: -0.85 (closed) -> -2.1 (open)
    // Right curtain: 0.85 (closed) -> 2.1 (open)
    const baseClosedX = isLeft ? -0.9 : 0.9;
    const openOffset = isLeft ? -1.15 : 1.15;
    const targetX = baseClosedX + curtainOpen * openOffset;

    // Gather factor: fabric bunching compresses scale X
    const targetScaleX = 1 - curtainOpen * 0.6;

    // Smooth spring dampening
    meshRef.current.position.x = THREE.MathUtils.damp(meshRef.current.position.x, targetX + breeze, 4, delta);
    meshRef.current.scale.x = THREE.MathUtils.damp(meshRef.current.scale.x, targetScaleX, 4, delta);

    // Dynamic Z-fold modulation based on gather density
    meshRef.current.position.z = 0.15 + (1 - targetScaleX) * 0.05;

    // Subtle sway rotation at the hem
    meshRef.current.rotation.z = breeze * 0.6;
  });

  return (
    <group>
      <mesh ref={meshRef} geometry={geometry} castShadow receiveShadow position={[isLeft ? -0.9 : 0.9, 0, 0.15]}>
        <meshPhysicalMaterial
          color={fabricTint.hex}
          roughness={fabricTint.roughness}
          metalness={0.02}
          sheen={0.9}
          sheenColor={fabricTint.sheenColor}
          transmission={0.12}
          thickness={0.08}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Top Wave Track Attachment Rings */}
      <group position={[isLeft ? -0.9 : 0.9, 1.62, 0.16]}>
        {[-0.8, -0.4, 0, 0.4, 0.8].map((ringX, idx) => (
          <mesh key={idx} position={[ringX * (1 - curtainOpen * 0.5), 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.035, 0.008, 12, 24]} />
            <meshStandardMaterial color="#B89656" metalness={0.85} roughness={0.2} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

// Architectural Window Assembly (Frame, Double Glazing, Quartz Sill, Tilted Blinds)
function ArchitecturalWindowAssembly({ blindTilt, lightMode }) {
  const slatGroupRef = useRef();

  // Pivot slat rotations on horizontal axis when blindTilt changes
  useFrame((state, delta) => {
    if (!slatGroupRef.current) return;
    const targetAngle = (1 - blindTilt) * (Math.PI / 2.2); // 0 to ~78 degrees
    slatGroupRef.current.children.forEach((slat) => {
      slat.rotation.x = THREE.MathUtils.damp(slat.rotation.x, targetAngle, 6, delta);
    });
  });

  return (
    <group position={[0, 0, 0]}>
      {/* 1. Surrounding Interior Wall with Window Recess Opening */}
      <group position={[0, 0, -0.65]}>
        {/* Main Wall Face */}
        <mesh position={[0, 0, 0]} receiveShadow>
          <boxGeometry args={[7, 4.4, 0.15]} />
          <meshStandardMaterial color="#F5F0E6" roughness={0.65} />
        </mesh>
        {/* Recess Depth Cutout Lining */}
        <mesh position={[-2.05, 0, 0.3]} receiveShadow>
          <boxGeometry args={[0.15, 3.1, 0.6]} />
          <meshStandardMaterial color="#EAE3D2" roughness={0.5} />
        </mesh>
        <mesh position={[2.05, 0, 0.3]} receiveShadow>
          <boxGeometry args={[0.15, 3.1, 0.6]} />
          <meshStandardMaterial color="#EAE3D2" roughness={0.5} />
        </mesh>
        <mesh position={[0, 1.55, 0.3]} receiveShadow>
          <boxGeometry args={[4.2, 0.15, 0.6]} />
          <meshStandardMaterial color="#EAE3D2" roughness={0.5} />
        </mesh>
      </group>

      {/* 2. Quartz Architectural Window Stool / Sill */}
      <mesh position={[0, -1.55, -0.25]} receiveShadow castShadow>
        <boxGeometry args={[4.5, 0.12, 0.7]} />
        <meshPhysicalMaterial
          color="#FAF8F5"
          roughness={0.2}
          clearcoat={0.8}
          clearcoatRoughness={0.1}
          reflectivity={0.9}
        />
      </mesh>

      {/* 3. Outer & Inner Window Casing Frame */}
      <group position={[0, 0, -0.55]}>
        {/* Top Rail */}
        <mesh position={[0, 1.45, 0]} castShadow receiveShadow>
          <boxGeometry args={[4.0, 0.14, 0.12]} />
          <meshStandardMaterial color="#FAF8F5" roughness={0.3} />
        </mesh>
        {/* Bottom Rail */}
        <mesh position={[0, -1.45, 0]} castShadow receiveShadow>
          <boxGeometry args={[4.0, 0.14, 0.12]} />
          <meshStandardMaterial color="#FAF8F5" roughness={0.3} />
        </mesh>
        {/* Left Jamb */}
        <mesh position={[-1.93, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.14, 2.76, 0.12]} />
          <meshStandardMaterial color="#FAF8F5" roughness={0.3} />
        </mesh>
        {/* Right Jamb */}
        <mesh position={[1.93, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.14, 2.76, 0.12]} />
          <meshStandardMaterial color="#FAF8F5" roughness={0.3} />
        </mesh>

        {/* Center Vertical & Horizontal Mullion Dividers */}
        <mesh position={[0, 0, 0.02]} castShadow>
          <boxGeometry args={[0.06, 2.76, 0.08]} />
          <meshStandardMaterial color="#FAF8F5" roughness={0.3} />
        </mesh>
        <mesh position={[0, 0, 0.02]} castShadow>
          <boxGeometry args={[3.72, 0.06, 0.08]} />
          <meshStandardMaterial color="#FAF8F5" roughness={0.3} />
        </mesh>
      </group>

      {/* 4. Double-Pane Insulated Glazing (Outer & Inner Pane with Air Gap) */}
      <group position={[0, 0, -0.55]}>
        {/* Outer Pane */}
        <mesh position={[0, 0, -0.03]}>
          <planeGeometry args={[3.72, 2.76]} />
          <meshPhysicalMaterial
            transmission={0.94}
            roughness={0.03}
            ior={1.52}
            thickness={0.1}
            transparent
            opacity={0.35}
            color="#FFFFFF"
          />
        </mesh>
        {/* Inner Pane */}
        <mesh position={[0, 0, 0.03]}>
          <planeGeometry args={[3.72, 2.76]} />
          <meshPhysicalMaterial
            transmission={0.94}
            roughness={0.03}
            ior={1.52}
            thickness={0.1}
            transparent
            opacity={0.35}
            color="#FFFFFF"
          />
        </mesh>
      </group>

      {/* 5. Venetian Blind Slats Assembly (Mounted inside Window Recess) */}
      <group ref={slatGroupRef} position={[0, 0, -0.42]}>
        {[-1.25, -1.0, -0.75, -0.5, -0.25, 0, 0.25, 0.5, 0.75, 1.0, 1.25].map((y, i) => (
          <mesh key={i} position={[0, y, 0]} castShadow receiveShadow>
            <boxGeometry args={[3.68, 0.09, 0.015]} />
            <meshStandardMaterial color="#FAF8F5" roughness={0.35} metalness={0.05} />
          </mesh>
        ))}
      </group>

      {/* 6. Motorized Curtain Wave Track */}
      <mesh position={[0, 1.65, 0.16]} castShadow>
        <cylinderGeometry args={[0.035, 0.035, 4.4, 16]} rotation={[0, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#B89656" metalness={0.85} roughness={0.18} />
      </mesh>
      {/* End Caps */}
      <mesh position={[-2.2, 1.65, 0.16]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.06, 0.06, 0.08, 16]} />
        <meshStandardMaterial color="#B89656" metalness={0.85} roughness={0.18} />
      </mesh>
      <mesh position={[2.2, 1.65, 0.16]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.06, 0.06, 0.08, 16]} />
        <meshStandardMaterial color="#B89656" metalness={0.85} roughness={0.18} />
      </mesh>

      {/* 7. Canadian Oak Engineered Hardwood Floor */}
      <mesh position={[0, -1.62, 0.6]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[8, 3.5]} />
        <meshPhysicalMaterial
          color="#3D2B1F"
          roughness={0.35}
          clearcoat={0.6}
          clearcoatRoughness={0.15}
          reflectivity={0.7}
        />
      </mesh>
    </group>
  );
}

// Outdoor Canadian Garden Landscape Backdrop
function OutdoorLandscapeBackdrop({ lightMode }) {
  return (
    <group position={[0, 0, -2.5]}>
      {/* Sky Plane */}
      <mesh position={[0, 0.8, 0]}>
        <planeGeometry args={[12, 7]} />
        <meshBasicMaterial color={lightMode.id === 'daylight' ? '#D6E6F2' : '#2B1F17'} />
      </mesh>
      {/* Distant Sun Glow Disk */}
      <mesh position={[2.2, 1.6, 0.05]}>
        <circleGeometry args={[1.8, 32]} />
        <meshBasicMaterial
          color={lightMode.id === 'daylight' ? '#FFF5DC' : '#FFB067'}
          transparent
          opacity={0.85}
        />
      </mesh>
    </group>
  );
}

const WindowCurtainShowcase = () => {
  const [curtainOpen, setCurtainOpen] = useState(0.4); // 0 = closed, 1 = open
  const [blindTilt, setBlindTilt] = useState(0.75); // 0 = closed, 1 = open
  const [activeTint, setActiveTint] = useState(fabricTints[0]);
  const [activeLight, setActiveLight] = useState(lightingModes[0]);
  const [webglError, setWebglError] = useState(false);

  return (
    <section className="my-12 rounded-3xl bg-[#FAF8F5] border border-[#2B1F17]/12 overflow-hidden shadow-xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        
        {/* Left Column: Architectural Editorial Content & Controls */}
        <div className="lg:col-span-5 p-8 md:p-12 bg-[#F5F0E6] flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#2B1F17]/10">
          <div className="space-y-6">
            
            {/* Brand Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-[#2B1F17]/15 text-[#2B1F17] text-[10px] uppercase font-bold tracking-[0.25em] shadow-sm backdrop-blur-md">
              <Sparkles size={13} className="text-[#B89656]" />
              <span>Precision Tailoring &amp; Installation</span>
            </div>

            {/* Headline */}
            <h2 className="font-serif text-[#2B1F17] text-3xl md:text-4xl font-light leading-tight">
              Experience Light &amp;<br />
              <span className="italic text-[#B89656]">Texture in Real-Time</span>
            </h2>

            <p className="text-[#2B1F17]/75 text-sm md:text-base font-sans font-light leading-relaxed">
              Interact with our 3D drapery studio to visualize daylight filtering, motorized fabric gathering, and tailored window shade tilts for your home.
            </p>

            {/* Value Points */}
            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-white border border-[#2B1F17]/10 flex items-center justify-center text-[#B89656] flex-shrink-0 mt-0.5 shadow-sm">
                  <Layers size={16} />
                </div>
                <div>
                  <h4 className="font-serif text-[#2B1F17] font-medium text-sm">Custom Drapery &amp; Motorized Tracks</h4>
                  <p className="text-[#2B1F17]/65 text-xs font-sans font-light">Hand-finished fabrics, motorized Somfy/Lutron tracks, and 100% room blackout options.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-white border border-[#2B1F17]/10 flex items-center justify-center text-[#B89656] flex-shrink-0 mt-0.5 shadow-sm">
                  <Ruler size={16} />
                </div>
                <div>
                  <h4 className="font-serif text-[#2B1F17] font-medium text-sm">Precision Laser Site Measurement</h4>
                  <p className="text-[#2B1F17]/65 text-xs font-sans font-light">Zero-error millimeter tolerance custom fabrication for every Canadian window frame.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-white border border-[#2B1F17]/10 flex items-center justify-center text-[#B89656] flex-shrink-0 mt-0.5 shadow-sm">
                  <Shield size={16} />
                </div>
                <div>
                  <h4 className="font-serif text-[#2B1F17] font-medium text-sm">1-Year Workmanship Warranty</h4>
                  <p className="text-[#2B1F17]/65 text-xs font-sans font-light">Complete installation confidence backed by our Saskatoon master installation team.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Drapery Controls Panel */}
          <div className="mt-8 pt-6 border-t border-[#2B1F17]/10 space-y-5 bg-white/70 p-5 rounded-2xl border border-white/80 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#2B1F17] font-sans flex items-center gap-1.5">
                <Sliders size={13} className="text-[#B89656]" />
                <span>3D Drapery Controls</span>
              </span>
              <button
                onClick={() => {
                  setCurtainOpen(0.4);
                  setBlindTilt(0.75);
                  setActiveTint(fabricTints[0]);
                  setActiveLight(lightingModes[0]);
                }}
                className="text-[9px] uppercase font-bold tracking-widest text-[#B89656] hover:text-[#2B1F17] transition-colors flex items-center gap-1"
              >
                <RefreshCcw size={10} /> Reset
              </button>
            </div>

            {/* Curtain Gather Slider */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-xs font-sans text-[#2B1F17]/80 font-medium">Curtain Gather</span>
                <span className="text-xs font-mono font-bold text-[#B89656]">{Math.round(curtainOpen * 100)}% Open</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={curtainOpen}
                onChange={(e) => setCurtainOpen(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-[#EAE3D2] rounded-lg appearance-none cursor-pointer accent-[#B89656]"
              />
            </div>

            {/* Blind Slat Tilt Slider */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-xs font-sans text-[#2B1F17]/80 font-medium">Blind Slat Tilt</span>
                <span className="text-xs font-mono font-bold text-[#B89656]">{Math.round(blindTilt * 100)}% Daylight</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={blindTilt}
                onChange={(e) => setBlindTilt(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-[#EAE3D2] rounded-lg appearance-none cursor-pointer accent-[#B89656]"
              />
            </div>

            {/* Fabric Tint Swatch Switcher */}
            <div>
              <span className="text-xs font-sans text-[#2B1F17]/80 font-medium block mb-2">Fabric Specification:</span>
              <div className="grid grid-cols-4 gap-2">
                {fabricTints.map((tint) => (
                  <button
                    key={tint.id}
                    onClick={() => setActiveTint(tint)}
                    className={`py-1.5 px-2 rounded-lg text-[9px] font-sans font-bold uppercase tracking-wider border flex items-center justify-center gap-1 transition-all ${
                      activeTint.id === tint.id
                        ? 'bg-[#2B1F17] text-white border-[#2B1F17] shadow-sm'
                        : 'bg-white text-[#2B1F17]/70 border-[#2B1F17]/15 hover:border-[#B89656]'
                    }`}
                  >
                    <span className="w-2.5 h-2.5 rounded-full border border-black/20" style={{ backgroundColor: tint.hex }} />
                    <span className="truncate">{tint.name.split(' ')[0]}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Lighting Scene Selector */}
            <div className="pt-2 border-t border-[#2B1F17]/10 flex items-center justify-between">
              <span className="text-xs font-sans text-[#2B1F17]/80 font-medium">Lighting Atmosphere:</span>
              <div className="flex gap-2">
                {lightingModes.map((mode) => (
                  <button
                    key={mode.id}
                    onClick={() => setActiveLight(mode)}
                    className={`px-3 py-1 rounded-full text-[9px] font-sans font-bold uppercase tracking-wider border transition-all ${
                      activeLight.id === mode.id
                        ? 'bg-[#B89656] text-[#2B1F17] border-[#B89656]'
                        : 'bg-white text-[#2B1F17]/60 border-[#2B1F17]/15'
                    }`}
                  >
                    {mode.name.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: 3D Photorealistic Canvas Stage */}
        <div className={`lg:col-span-7 h-[480px] lg:h-auto min-h-[460px] relative bg-gradient-to-b ${activeLight.bgGradient} transition-colors duration-700`}>
          {!webglError ? (
            <Canvas
              shadows
              camera={{ position: [0, 0, 4.3], fov: 44 }}
              gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
              className="w-full h-full cursor-grab active:cursor-grabbing"
              onError={() => setWebglError(true)}
            >
              {/* Lighting Configuration */}
              <ambientLight intensity={0.5} />
              <directionalLight
                position={activeLight.sunPos}
                intensity={activeLight.intensity}
                color={activeLight.sunColor}
                castShadow
                shadow-mapSize-width={1024}
                shadow-mapSize-height={1024}
                shadow-bias={-0.0001}
              />
              <pointLight position={[-4, 3, -1]} intensity={0.6} color="#B89656" />

              <Suspense fallback={
                <Html center>
                  <div className="flex flex-col items-center gap-3 bg-[#FAF8F5]/90 backdrop-blur-md px-6 py-4 rounded-2xl border border-[#2B1F17]/15 shadow-xl text-center">
                    <div className="w-6 h-6 border-2 border-[#B89656] border-t-transparent rounded-full animate-spin" />
                    <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#2B1F17] font-sans">
                      Building Architectural View...
                    </span>
                  </div>
                </Html>
              }>
                <OutdoorLandscapeBackdrop lightMode={activeLight} />
                
                <ArchitecturalWindowAssembly
                  blindTilt={blindTilt}
                  lightMode={activeLight}
                />

                <SculptedSFoldCurtain
                  isLeft={true}
                  curtainOpen={curtainOpen}
                  fabricTint={activeTint}
                />
                
                <SculptedSFoldCurtain
                  isLeft={false}
                  curtainOpen={curtainOpen}
                  fabricTint={activeTint}
                />

                <OrbitControls
                  enableZoom={true}
                  minDistance={3.2}
                  maxDistance={5.8}
                  maxPolarAngle={Math.PI / 2.05}
                  minPolarAngle={Math.PI / 3.5}
                  maxAzimuthAngle={Math.PI / 6}
                  minAzimuthAngle={-Math.PI / 6}
                />
              </Suspense>
            </Canvas>
          ) : (
            /* WebGL Fallback Image */
            <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-[#FAF8F5]">
              <img
                src="/assets/imgs/portfolio/project-1.jpg"
                alt="Brighton Decor Installed Window"
                className="w-full h-full object-cover rounded-2xl"
              />
              <span className="text-xs uppercase font-bold tracking-widest text-[#2B1F17] mt-4 font-sans">
                Explore The Collection Below
              </span>
            </div>
          )}

          {/* Floating Studio Badge */}
          <div className="absolute top-4 right-4 pointer-events-none">
            <span className="text-[9px] uppercase font-bold tracking-[0.25em] text-[#2B1F17] font-sans bg-white/85 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#2B1F17]/15 shadow-sm">
              Photorealistic WebGL Studio ✦
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default WindowCurtainShowcase;
