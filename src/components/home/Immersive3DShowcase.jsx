// src/components/home/Immersive3DShowcase.jsx
// Brighton Decor — Cinematic Window Transformation Experience
import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, Environment, ContactShadows } from '@react-three/drei';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Sun,
  Shield,
  Eye,
  Layers,
  Sliders,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Maximize2,
  RefreshCw
} from 'lucide-react';
import * as THREE from 'three';

// -----------------------------------------------------------------------------
// 3D GEOMETRY SUB-COMPONENTS FOR HERO ARCHITECTURAL WINDOW & TREATMENTS
// -----------------------------------------------------------------------------

/**
 * 1. Architectural Window Frame & Outdoor Backdrop
 */
const WindowFrameAndBackdrop = ({ lightProgress }) => {
  // Physical frame material (Black anodized aluminum with subtle bronze metallic sheen)
  const frameMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#1A1816',
    metalness: 0.8,
    roughness: 0.25,
  }), []);

  // Glass Pane Material (Realistic reflection & translucency)
  const glassMat = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: '#D8ECF8',
    transmission: 0.88,
    opacity: 0.35,
    transparent: true,
    roughness: 0.08,
    metalness: 0.1,
    ior: 1.52,
    clearcoat: 1.0,
    clearcoatRoughness: 0.1,
  }), []);

  // Wall Material
  const wallMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#161514',
    roughness: 0.9,
  }), []);

  // Floor Material (Polished Oak Wood)
  const floorMat = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: '#A6825B',
    roughness: 0.35,
    metalness: 0.05,
    clearcoat: 0.4,
    clearcoatRoughness: 0.2,
  }), []);

  // Sky Backdrop color morphing based on light level
  const skyColor = useMemo(() => new THREE.Color(), []);
  skyColor.setHSL(0.1, 0.4, 0.15 + lightProgress * 0.45);

  return (
    <group>
      {/* Floor */}
      <mesh rotation-x={-Math.PI / 2} position={[0, 0, 0]} material={floorMat} receiveShadow>
        <planeGeometry args={[16, 16]} />
      </mesh>

      {/* Main Wall with Window Frame Cutout Enclosure */}
      {/* Left Wall Segment */}
      <mesh position={[-3.8, 2.5, 0]} material={wallMat} receiveShadow>
        <boxGeometry args={[3.2, 5.0, 0.4]} />
      </mesh>

      {/* Right Wall Segment */}
      <mesh position={[3.8, 2.5, 0]} material={wallMat} receiveShadow>
        <boxGeometry args={[3.2, 5.0, 0.4]} />
      </mesh>

      {/* Top Wall Transom */}
      <mesh position={[0, 4.6, 0]} material={wallMat} receiveShadow>
        <boxGeometry args={[4.4, 0.8, 0.4]} />
      </mesh>

      {/* Bottom Wall Sill Base */}
      <mesh position={[0, 0.25, 0]} material={wallMat} receiveShadow>
        <boxGeometry args={[4.4, 0.5, 0.4]} />
      </mesh>

      {/* Window Casing Frame (Outer & Inner Mullions) */}
      <group position={[0, 2.5, 0]}>
        {/* Outer Perimeter Frame */}
        <mesh material={frameMat} castShadow receiveShadow>
          <boxGeometry args={[4.3, 3.8, 0.12]} />
        </mesh>

        {/* Outer Frame Inner Cutout / Trim */}
        <mesh position={[0, 0, 0.02]} material={frameMat} castShadow receiveShadow>
          <boxGeometry args={[4.05, 3.55, 0.1]} />
        </mesh>

        {/* Center Vertical Mullion Bar */}
        <mesh position={[0, 0, 0.04]} material={frameMat} castShadow receiveShadow>
          <boxGeometry args={[0.08, 3.5, 0.08]} />
        </mesh>

        {/* Center Horizontal Transom Bar */}
        <mesh position={[0, 0.6, 0.04]} material={frameMat} castShadow receiveShadow>
          <boxGeometry args={[4.0, 0.08, 0.08]} />
        </mesh>

        {/* Glass Panes */}
        {/* Left Upper Glass */}
        <mesh position={[-1.0, 1.1, 0.01]} material={glassMat}>
          <planeGeometry args={[1.9, 0.9]} />
        </mesh>
        {/* Right Upper Glass */}
        <mesh position={[1.0, 1.1, 0.01]} material={glassMat}>
          <planeGeometry args={[1.9, 0.9]} />
        </mesh>
        {/* Left Lower Glass */}
        <mesh position={[-1.0, -0.8, 0.01]} material={glassMat}>
          <planeGeometry args={[1.9, 2.6]} />
        </mesh>
        {/* Right Lower Glass */}
        <mesh position={[1.0, -0.8, 0.01]} material={glassMat}>
          <planeGeometry args={[1.9, 2.6]} />
        </mesh>

        {/* Architectural Window Sill Ledge */}
        <mesh position={[0, -2.1, 0.12]} material={frameMat} castShadow receiveShadow>
          <boxGeometry args={[4.4, 0.12, 0.35]} />
        </mesh>
      </group>

      {/* Outdoor View Backdrop */}
      <group position={[0, 2.5, -2.5]}>
        {/* Sky Background Plane */}
        <mesh>
          <planeGeometry args={[18, 12]} />
          <meshBasicMaterial color={skyColor} />
        </mesh>

        {/* Outdoor Horizon / Distant Architectural Pine Silhouettes */}
        <mesh position={[0, -2.0, 0.1]}>
          <planeGeometry args={[16, 4]} />
          <meshBasicMaterial color="#0B130E" transparent opacity={0.85} />
        </mesh>
      </group>
    </group>
  );
};

/**
 * 2. Translucent Sheer Linen Drapery Component with Procedural Ripple Waves
 */
const SheerCurtain = ({ progress, opacity = 1 }) => {
  // Create ripple fold geometry for realistic wavy drapery
  const waveGeometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(2.1, 3.6, 32, 16);
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      // Realistic ripple wave fold along X axis
      const zWave = Math.sin(x * 12.0) * 0.12 + Math.cos(x * 6.0) * 0.04;
      pos.setZ(i, zWave);
    }
    geo.computeVertexNormals();
    return geo;
  }, []);

  // Material: Ethereal Translucent Linen
  const sheerMat = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: '#FAF8F3',
    transmission: 0.78,
    opacity: 0.9 * opacity,
    transparent: true,
    roughness: 0.45,
    ior: 1.2,
    thickness: 0.15,
    side: THREE.DoubleSide,
  }), [opacity]);

  // Slide position: progress 0 -> curtain off-screen on sides, 1 -> closed in center
  const leftX = THREE.MathUtils.lerp(-2.8, -1.0, progress);
  const rightX = THREE.MathUtils.lerp(2.8, 1.0, progress);

  if (opacity <= 0.01) return null;

  return (
    <group position={[0, 2.45, 0.18]}>
      {/* Top Ceiling Curtain Track Housing */}
      <mesh position={[0, 1.82, 0]} castShadow>
        <boxGeometry args={[4.2, 0.06, 0.08]} />
        <meshStandardMaterial color="#1E1C1A" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Left Sheer Panel */}
      <mesh position={[leftX, 0, 0]} geometry={waveGeometry} material={sheerMat} castShadow />

      {/* Right Sheer Panel */}
      <mesh position={[rightX, 0, 0]} geometry={waveGeometry} material={sheerMat} castShadow />
    </group>
  );
};

/**
 * 3. Luxurious Blackout Velvet Drapery Component
 */
const BlackoutCurtain = ({ progress, opacity = 1 }) => {
  // Heavy ripple wave geometry for velvet fabric
  const heavyWaveGeometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(2.2, 3.65, 32, 16);
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const zWave = Math.sin(x * 10.0) * 0.18 + Math.sin(x * 20.0) * 0.03;
      pos.setZ(i, zWave);
    }
    geo.computeVertexNormals();
    return geo;
  }, []);

  // Rich Opaque Dark Bronze / Charcoal Velvet Material
  const blackoutMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#282522',
    roughness: 0.88,
    metalness: 0.1,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: opacity,
  }), [opacity]);

  // Position lerp
  const leftX = THREE.MathUtils.lerp(-2.9, -1.05, progress);
  const rightX = THREE.MathUtils.lerp(2.9, 1.05, progress);

  if (opacity <= 0.01) return null;

  return (
    <group position={[0, 2.42, 0.28]}>
      {/* Front Decorative Brass Track */}
      <mesh position={[0, 1.85, 0]} castShadow>
        <cylinderGeometry args={[0.035, 0.035, 4.3, 16]} rotation={[0, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#C5A35A" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Left Velvet Panel */}
      <mesh position={[leftX, 0, 0]} geometry={heavyWaveGeometry} material={blackoutMat} castShadow />

      {/* Right Velvet Panel */}
      <mesh position={[rightX, 0, 0]} geometry={heavyWaveGeometry} material={blackoutMat} castShadow />
    </group>
  );
};

/**
 * 4. Architectural Motorized Roller Shade Component
 */
const RollerBlind = ({ progress, opacity = 1 }) => {
  // Cassette Box Material
  const cassetteMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#1E1C1A',
    metalness: 0.85,
    roughness: 0.2,
    transparent: true,
    opacity: opacity,
  }), [opacity]);

  // Shade Fabric Material
  const shadeFabricMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#DDD6CA',
    roughness: 0.6,
    metalness: 0.05,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.95 * opacity,
  }), [opacity]);

  // Unroll height calculation (progress: 0 -> closed top, 1 -> fully lowered down)
  const currentHeight = THREE.MathUtils.lerp(0.08, 3.45, progress);
  const currentY = 4.2 - currentHeight / 2;

  if (opacity <= 0.01) return null;

  return (
    <group position={[0, 0, 0.12]}>
      {/* Top Cassette Box */}
      <mesh position={[0, 4.22, 0]} material={cassetteMat} castShadow receiveShadow>
        <boxGeometry args={[4.05, 0.14, 0.14]} />
      </mesh>

      {/* Lowering Shade Fabric */}
      <mesh position={[0, currentY, 0]} material={shadeFabricMat} castShadow receiveShadow>
        <planeGeometry args={[3.95, currentHeight]} />
      </mesh>

      {/* Bottom Aluminum Weight Bar */}
      <mesh position={[0, 4.22 - currentHeight, 0]} material={cassetteMat} castShadow receiveShadow>
        <boxGeometry args={[3.98, 0.06, 0.08]} />
      </mesh>
    </group>
  );
};

/**
 * 5. Modern Dual-Layer Zebra Blind Component
 */
const ZebraBlind = ({ progress, alignmentProgress = 0, opacity = 1 }) => {
  // Cassette material
  const cassetteMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#22201D',
    metalness: 0.8,
    roughness: 0.25,
    transparent: true,
    opacity: opacity,
  }), [opacity]);

  // Fabric band material (Translucent Sheer Stripes)
  const sheerBandMat = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: '#ECE6DC',
    transmission: 0.7,
    opacity: 0.7 * opacity,
    transparent: true,
    roughness: 0.4,
    side: THREE.DoubleSide,
  }), [opacity]);

  // Opaque Privacy Stripe Material
  const opaqueBandMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#4A443C',
    roughness: 0.7,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: opacity,
  }), [opacity]);

  const currentHeight = THREE.MathUtils.lerp(0.1, 3.45, progress);
  const currentY = 4.2 - currentHeight / 2;

  // Generate 12 alternating stripes
  const stripeCount = 12;
  const stripeHeight = currentHeight / stripeCount;

  if (opacity <= 0.01) return null;

  return (
    <group position={[0, 0, 0.16]}>
      {/* Top Cassette */}
      <mesh position={[0, 4.22, 0]} material={cassetteMat} castShadow>
        <boxGeometry args={[4.05, 0.14, 0.14]} />
      </mesh>

      {/* Dual Layer Band Container */}
      <group position={[0, currentY, 0]}>
        {Array.from({ length: stripeCount }).map((_, i) => {
          const stripeY = (stripeCount / 2 - i - 0.5) * stripeHeight;
          const isEven = i % 2 === 0;

          // Alignment offset between front and back layer determines Privacy level!
          const currentMat = isEven
            ? opaqueBandMat
            : (alignmentProgress > 0.5 ? opaqueBandMat : sheerBandMat);

          return (
            <mesh key={i} position={[0, stripeY, 0]} material={currentMat} castShadow>
              <planeGeometry args={[3.95, stripeHeight * 0.94]} />
            </mesh>
          );
        })}
      </group>

      {/* Bottom Weight Bar */}
      <mesh position={[0, 4.22 - currentHeight, 0]} material={cassetteMat} castShadow>
        <boxGeometry args={[3.98, 0.06, 0.08]} />
      </mesh>
    </group>
  );
};

/**
 * 6. Dynamic Physical Lighting & Volumetric Light Shaft Engine
 */
const DynamicLightingSystem = ({ lightLevel, sunAngle = 0 }) => {
  const dirLightRef = useRef();

  const sunIntensity = THREE.MathUtils.lerp(0.1, 4.2, lightLevel);
  const ambientIntensity = THREE.MathUtils.lerp(0.12, 0.65, lightLevel);

  // Volumetric Sun Shaft Opacity
  const shaftOpacity = Math.max(0, (lightLevel - 0.1) * 0.35);

  useFrame(() => {
    if (dirLightRef.current) {
      dirLightRef.current.position.x = 2.8 + Math.sin(sunAngle) * 0.5;
    }
  });

  return (
    <group>
      {/* Ambient Room Fill */}
      <ambientLight intensity={ambientIntensity} color="#F5EFE6" />

      {/* Main Directional Sun Beam */}
      <directionalLight
        ref={dirLightRef}
        position={[2.8, 5.2, -3.2]}
        intensity={sunIntensity}
        color={lightLevel > 0.4 ? '#FFF5E4' : '#D9AA75'}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.0001}
      />

      {/* Soft Secondary Bounce Light */}
      <directionalLight position={[-2.5, 3.0, 4.0]} intensity={ambientIntensity * 0.8} color="#D8ECEF" />

      {/* Volumetric Sun Shaft Plane onto Interior Floor */}
      {shaftOpacity > 0.01 && (
        <mesh position={[0.4, 0.02, 1.8]} rotation={[-Math.PI / 2, 0, 0.2]}>
          <planeGeometry args={[3.8, 4.5]} />
          <meshBasicMaterial
            color="#FFF4DC"
            transparent
            opacity={shaftOpacity}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>
      )}

      {/* Contact Shadows under Window Sill and Floor */}
      <ContactShadows position={[0, 0.01, 0]} opacity={0.45 * lightLevel} scale={14} blur={2.2} far={8} resolution={1024} />
      <Environment preset="apartment" environmentIntensity={0.6 * lightLevel} />
    </group>
  );
};

// -----------------------------------------------------------------------------
// MASTER 3D SCENE CONTROLLER WITH SMOOTH CAMERA LERP & SCROLL MAPPING
// -----------------------------------------------------------------------------

const ArchitecturalWindowScene = ({ scrollProgress, isMobile = false }) => {
  const p = Math.max(0, Math.min(1, scrollProgress));

  // 1. Treatment Visibility & Morph Factors
  let sheerProgress = 0;
  let sheerOpacity = 0;

  let blackoutProgress = 0;
  let blackoutOpacity = 0;

  let rollerProgress = 0;
  let rollerOpacity = 0;

  let zebraProgress = 0;
  let zebraAlignment = 0;
  let zebraOpacity = 0;

  // Light control level (1.0 = Bright Sunlight, 0.05 = Blackout)
  let lightLevel = 1.0;

  if (p < 0.16) {
    // Bare Window
    lightLevel = 1.0;
  } else if (p < 0.35) {
    // Sheer Curtain sliding in
    const t = (p - 0.16) / 0.19;
    sheerProgress = THREE.MathUtils.smoothstep(t, 0, 1);
    sheerOpacity = 1;
    lightLevel = THREE.MathUtils.lerp(1.0, 0.75, t);
  } else if (p < 0.54) {
    // Blackout Velvet Drapery closing
    const t = (p - 0.35) / 0.19;
    sheerProgress = 1;
    sheerOpacity = THREE.MathUtils.lerp(1, 0.3, t);
    blackoutProgress = THREE.MathUtils.smoothstep(t, 0, 1);
    blackoutOpacity = 1;
    lightLevel = THREE.MathUtils.lerp(0.75, 0.3, t);
  } else if (p < 0.70) {
    // Roller Blind unrolling downward
    const t = (p - 0.54) / 0.16;
    blackoutProgress = 1;
    blackoutOpacity = THREE.MathUtils.lerp(1, 0.2, t);
    rollerProgress = THREE.MathUtils.smoothstep(t, 0, 1);
    rollerOpacity = 1;
    lightLevel = THREE.MathUtils.lerp(0.3, 0.15, t);
  } else if (p < 0.85) {
    // Zebra Blind unrolling & stripes shifting alignment
    const t = (p - 0.70) / 0.15;
    rollerOpacity = THREE.MathUtils.lerp(1, 0, t);
    zebraProgress = THREE.MathUtils.smoothstep(t, 0, 1);
    zebraOpacity = 1;
    zebraAlignment = t > 0.5 ? (t - 0.5) * 2 : 0;
    lightLevel = THREE.MathUtils.lerp(0.5, 0.1, t);
  } else {
    // Final Premium Master Setup: Roller + Sheer + Frame
    const t = (p - 0.85) / 0.15;
    sheerProgress = 1;
    sheerOpacity = 0.85;
    blackoutProgress = 0.4;
    blackoutOpacity = 0.9;
    rollerProgress = 0.45;
    rollerOpacity = 0.8;
    lightLevel = THREE.MathUtils.lerp(0.1, 0.65, t);
  }

  // Base camera distance (further on mobile to ensure window fits portrait display)
  const baseCamZ = isMobile ? 9.6 : 7.2;

  // Camera Motion Dynamics
  useFrame((state) => {
    let camX = 0;
    let camY = 2.4;
    let camZ = baseCamZ;

    let lookX = 0;
    let lookY = 2.4;
    let lookZ = 0;

    if (p <= 0.25) {
      // Bare to Sheer: Calm architectural view
      const t = p / 0.25;
      camX = THREE.MathUtils.lerp(0, 0.2, t);
      camY = THREE.MathUtils.lerp(2.4, 2.5, t);
      camZ = THREE.MathUtils.lerp(baseCamZ, baseCamZ - 1.0, t);
    } else if (p <= 0.60) {
      // Sheer to Blackout: Focus closer on fabric texture & fold details
      const t = (p - 0.25) / 0.35;
      camX = THREE.MathUtils.lerp(0.2, -0.4, t);
      camY = THREE.MathUtils.lerp(2.5, 2.3, t);
      camZ = THREE.MathUtils.lerp(baseCamZ - 1.0, baseCamZ - 2.0, t);
      lookX = THREE.MathUtils.lerp(0, -0.1, t);
    } else if (p <= 0.85) {
      // Roller & Zebra: Low angle glide observing light shafts on floor
      const t = (p - 0.60) / 0.25;
      camX = THREE.MathUtils.lerp(-0.4, 0.3, t);
      camY = THREE.MathUtils.lerp(2.3, 2.1, t);
      camZ = THREE.MathUtils.lerp(baseCamZ - 2.0, baseCamZ - 1.4, t);
    } else {
      // Final Scene: Pull back to master hero composition
      const t = (p - 0.85) / 0.15;
      camX = THREE.MathUtils.lerp(0.3, 0, t);
      camY = THREE.MathUtils.lerp(2.1, 2.4, t);
      camZ = THREE.MathUtils.lerp(baseCamZ - 1.4, baseCamZ - 0.4, t);
    }

    // Subtle natural camera breathing motion
    const time = state.clock.getElapsedTime();
    camX += Math.sin(time * 0.4) * 0.03;
    camY += Math.cos(time * 0.5) * 0.02;

    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, camX, 0.06);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, camY, 0.06);
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, camZ, 0.06);

    state.camera.lookAt(lookX, lookY, lookZ);
  });

  return (
    <group>
      {/* 1. Hero Architectural Window Frame & Wall Enclosure */}
      <WindowFrameAndBackdrop lightProgress={lightLevel} />

      {/* 2. Sheer Drapery */}
      <SheerCurtain progress={sheerProgress} opacity={sheerOpacity} />

      {/* 3. Blackout Velvet Drapery */}
      <BlackoutCurtain progress={blackoutProgress} opacity={blackoutOpacity} />

      {/* 4. Motorized Roller Blind */}
      <RollerBlind progress={rollerProgress} opacity={rollerOpacity} />

      {/* 5. Zebra Blind */}
      <ZebraBlind progress={zebraProgress} alignmentProgress={zebraAlignment} opacity={zebraOpacity} />

      {/* 6. Dynamic Physical Lighting & Volumetric Rays */}
      <DynamicLightingSystem lightLevel={lightLevel} sunAngle={p * Math.PI} />
    </group>
  );
};

// -----------------------------------------------------------------------------
// TEXT CONTENT & UI SCENE ANNOTATIONS
// -----------------------------------------------------------------------------

const SCENE_TEXTS = [
  {
    phase: 'BARE WINDOW',
    range: [0.00, 0.16],
    badge: 'SCENE 1 — ARCHITECTURAL CANVAS',
    title: 'TRANSFORM YOUR WINDOW',
    subtitle: 'Designed for the way you live.',
    desc: 'Every space begins with a bare architectural window. Experience how custom drapes, precision shades, and light filtering transform your space.',
    icon: Sparkles,
  },
  {
    phase: 'SHEER CURTAINS',
    range: [0.16, 0.36],
    badge: 'SCENE 2 — SHEER LINEN DRAPERY',
    title: 'SOFT LIGHT DIFFUSION',
    subtitle: 'Translucent Ethereal Waves',
    desc: 'Handcrafted ripple-fold sheer curtains slide gracefully to diffuse harsh sunlight into a warm, inviting glow while preserving outdoor natural light.',
    icon: Sun,
  },
  {
    phase: 'BLACKOUT DRAPERY',
    range: [0.36, 0.56],
    badge: 'SCENE 3 — BLACKOUT VELVET DRAPERY',
    title: 'ACOUSTIC & THERMAL BLACKOUT',
    subtitle: '100% Privacy & Climate Control',
    desc: 'Opulent double-lined blackout drapes block outside light completely, regulating temperature and dampening acoustics for deep rest and comfort.',
    icon: Shield,
  },
  {
    phase: 'MOTORIZED ROLLER SHADES',
    range: [0.56, 0.70],
    badge: 'SCENE 4 — MOTORIZED ROLLER SHADES',
    title: 'SMART ARCHITECTURAL SHADING',
    subtitle: 'Somfy Quiet Motorization',
    desc: 'Unroll sleek architectural roller shades smoothly from hidden ceiling cassettes via smart phone app, remote, or scheduled voice control.',
    icon: Sliders,
  },
  {
    phase: 'ZEBRA DUAL SHADES',
    range: [0.70, 0.85],
    badge: 'SCENE 5 — LIGHT CONTROL & PRIVACY',
    title: 'LIGHT WHEN YOU WANT IT.',
    subtitle: 'PRIVACY WHEN YOU NEED IT.',
    desc: 'Dual-layer zebra shades alternate sheer and opaque fabric bands, offering effortless micro-control between daylight filtering and absolute privacy.',
    icon: Eye,
  },
  {
    phase: 'FINAL LUXURY WINDOW',
    range: [0.85, 1.00],
    badge: 'THE BRIGHTON DECOR DIFFERENCE',
    title: 'TRANSFORM YOUR WINDOW. CONTROL YOUR WORLD.',
    subtitle: 'Bespoke Curtains, Blinds & Motorized Shades across Calgary & Alberta',
    desc: 'Elevate your architecture with tailored window coverings designed and installed by master craftsmen.',
    icon: Layers,
    isFinal: true,
  },
];

// -----------------------------------------------------------------------------
// MAIN CONTAINER COMPONENT
// -----------------------------------------------------------------------------

const Immersive3DShowcase = () => {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const [scrollProgressVal, setScrollProgressVal] = useState(0);
  const [activeTabOverride, setActiveTabOverride] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  // Responsive window resize listener
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Scroll tracking container (420vh tall sticky scroll section)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (v) => {
      if (activeTabOverride === null) {
        setScrollProgressVal(v);
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress, activeTabOverride]);

  // Determine current active text card based on current progress
  const currentTextObj = useMemo(() => {
    const p = activeTabOverride !== null ? activeTabOverride : scrollProgressVal;
    return SCENE_TEXTS.find((item) => p >= item.range[0] && p <= item.range[1]) || SCENE_TEXTS[0];
  }, [scrollProgressVal, activeTabOverride]);

  const effectiveProgress = activeTabOverride !== null ? activeTabOverride : scrollProgressVal;

  return (
    <section
      ref={containerRef}
      className="relative h-[420vh] bg-[#0C0B0A] text-white select-none"
      aria-label="Cinematic Window Transformation Experience"
    >
      {/* Sticky Fullscreen Frame */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between">
        
        {/* 3D WebGL Canvas Layer */}
        <div className="absolute inset-0 z-0">
          <Canvas
            shadows
            gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
          >
            <PerspectiveCamera makeDefault position={[0, 2.4, isMobile ? 9.6 : 7.2]} fov={isMobile ? 54 : 45} />
            <ArchitecturalWindowScene scrollProgress={effectiveProgress} isMobile={isMobile} />
          </Canvas>
        </div>

        {/* Ambient Dark Radial Gradient Vignette Overlay (Ensures text contrast & cinematic look) */}
        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={{ background: 'radial-gradient(circle at center, transparent 35%, rgba(10, 9, 8, 0.85) 100%)' }}
        />

        {/* Top Header & Interactive Category Bar */}
        <div className="relative z-20 pt-6 px-4 md:px-12 flex justify-between items-center max-w-7xl mx-auto w-full">
          <div className="flex items-center gap-3 bg-black/50 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-amber-500/20">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-[11px] md:text-xs font-semibold tracking-widest text-amber-200/90 uppercase">
              {currentTextObj.badge}
            </span>
          </div>

          {/* Interactive Quick-Jump Tabs (Desktop & Tablet) */}
          <div className="hidden sm:flex items-center gap-1.5 bg-black/60 backdrop-blur-md p-1.5 rounded-full border border-white/10">
            {[
              { label: 'Bare Window', val: 0.05 },
              { label: 'Sheer Drapery', val: 0.25 },
              { label: 'Blackout Velvet', val: 0.45 },
              { label: 'Roller Shade', val: 0.62 },
              { label: 'Zebra Blind', val: 0.78 },
              { label: 'Full Suite', val: 0.95 },
            ].map((tab) => {
              const isActive =
                activeTabOverride === tab.val ||
                (activeTabOverride === null &&
                  scrollProgressVal >= tab.val - 0.08 &&
                  scrollProgressVal <= tab.val + 0.08);

              return (
                <button
                  key={tab.label}
                  onClick={() => {
                    setActiveTabOverride(tab.val);
                    setTimeout(() => setActiveTabOverride(null), 4000);
                  }}
                  className={`px-3 py-1 text-[11px] font-medium rounded-full transition-all duration-300 ${
                    isActive
                      ? 'bg-amber-500 text-black font-semibold shadow-lg shadow-amber-500/20'
                      : 'text-zinc-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Storytelling Overlay Card (Floating Architectural Glass Card) */}
        <div className="relative z-20 pb-8 px-4 md:px-12 max-w-7xl mx-auto w-full flex flex-col md:flex-row items-end justify-between gap-4 pointer-events-none">
          {/* Main Card Content */}
          <div className="pointer-events-auto max-w-xl bg-zinc-950/80 backdrop-blur-xl border border-amber-500/20 p-5 md:p-8 rounded-2xl shadow-2xl transition-all duration-500 w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTextObj.phase}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="space-y-2.5"
              >
                <div className="flex items-center gap-2 text-amber-400">
                  <currentTextObj.icon className="w-4 h-4 md:w-5 md:h-5" />
                  <span className="text-[11px] md:text-xs font-bold tracking-wider uppercase">
                    {currentTextObj.subtitle}
                  </span>
                </div>

                <h2 className="text-xl md:text-3xl lg:text-4xl font-serif font-light text-amber-50 leading-tight">
                  {currentTextObj.title}
                </h2>

                <p className="text-xs md:text-base text-zinc-300 font-light leading-relaxed">
                  {currentTextObj.desc}
                </p>

                {currentTextObj.isFinal && (
                  <div className="pt-2 flex items-center gap-4">
                    <button
                      onClick={() => navigate('/products')}
                      className="px-5 py-2.5 md:px-6 md:py-3 bg-amber-400 hover:bg-white text-zinc-950 text-xs md:text-sm font-semibold rounded-xl flex items-center gap-2 transition-all duration-300 shadow-xl shadow-amber-500/20 hover:scale-[1.02]"
                    >
                      Explore Window Treatments
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Scroll Down Cue Indicator */}
          <div className="pointer-events-auto flex items-center gap-3 bg-black/50 backdrop-blur-md px-3.5 py-2 rounded-full border border-white/10 text-xs text-zinc-400 shrink-0">
            <div className="w-3.5 h-6 border-2 border-zinc-500/50 rounded-full flex justify-center pt-1">
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="w-1 h-1.5 bg-amber-400 rounded-full"
              />
            </div>
            <span className="font-light tracking-wide uppercase text-[10px] md:text-[11px]">
              Scroll to Transform Window
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Immersive3DShowcase;
