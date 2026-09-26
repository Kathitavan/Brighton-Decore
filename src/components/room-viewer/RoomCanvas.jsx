// src/components/room-viewer/RoomCanvas.jsx
// Brighton Decor Ltd — 3D Room Studio Architectural Canvas
//
// The window is the hero. The room is the context.
// HDRI image-based lighting + directional sun with soft shadows + PBR materials.
// Damped orbit camera controls with constrained bounds.

import React, { Suspense, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  OrbitControls, 
  PerspectiveCamera, 
  Environment, 
  ContactShadows, 
  useTexture 
} from '@react-three/drei';
import * as THREE from 'three';

// ─────────────────────────────────────────────────────────────────────────────
// PROCEDURAL PBR TEXTURES (0KB, instant generation, no network latency)
// ─────────────────────────────────────────────────────────────────────────────
function createProceduralBump(type) {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');
  const imgData = ctx.createImageData(128, 128);
  const data = imgData.data;

  for (let y = 0; y < 128; y++) {
    for (let x = 0; x < 128; x++) {
      const idx = (y * 128 + x) * 4;
      let val = 128;

      if (type === 'wood') {
        // Wood grain striations
        const grain = Math.sin(x * 0.4 + Math.sin(y * 0.1) * 2.5) * 40;
        const noise = (Math.random() - 0.5) * 15;
        val = Math.floor(Math.max(0, Math.min(255, 128 + grain + noise)));
      } else if (type === 'fabric') {
        // Fine cross-hatch textile weave
        const weave = (Math.sin(x * 0.8) * Math.cos(y * 0.8) + 1) * 45;
        const noise = (Math.random() - 0.5) * 12;
        val = Math.floor(Math.max(0, Math.min(255, 110 + weave + noise)));
      } else if (type === 'tile') {
        // Large format tile grid
        const isJoint = (x % 32 < 2) || (y % 32 < 2);
        val = isJoint ? 40 : 180 + Math.floor((Math.random() - 0.5) * 15);
      } else {
        // Wall limewash subtle noise
        val = Math.floor(128 + (Math.random() - 0.5) * 25);
      }

      data[idx] = val;
      data[idx + 1] = val;
      data[idx + 2] = val;
      data[idx + 3] = 255;
    }
  }

  ctx.putImageData(imgData, 0, 0);
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(type === 'fabric' ? 14 : 8, type === 'fabric' ? 14 : 8);
  return tex;
}

// ─────────────────────────────────────────────────────────────────────────────
// LIGHTING MOOD PRESETS
// ─────────────────────────────────────────────────────────────────────────────
const LIGHT_MOODS = {
  warm: {
    sunI: 3.4,
    sunC: '#FFF2DF',
    ambI: 0.55,
    envI: 0.70,
    pendantC: '#FFD59E',
    pendantI: 2.2,
    lampC: '#FFE0B2',
    lampI: 1.8,
  },
  cool: {
    sunI: 3.2,
    sunC: '#EEF6FF',
    ambI: 0.60,
    envI: 0.75,
    pendantC: '#DCEBFF',
    pendantI: 1.8,
    lampC: '#E5F0FF',
    lampI: 1.5,
  },
  bright: {
    sunI: 4.4,
    sunC: '#FFFFFF',
    ambI: 0.75,
    envI: 0.95,
    pendantC: '#FFFFFF',
    pendantI: 2.6,
    lampC: '#FFF8F0',
    lampI: 2.0,
  },
  dim: {
    sunI: 1.2,
    sunC: '#FF9E50',
    ambI: 0.28,
    envI: 0.40,
    pendantC: '#FFA550',
    pendantI: 1.2,
    lampC: '#FF9538',
    lampI: 1.1,
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// FLOOR MATERIAL PROFILES
// ─────────────────────────────────────────────────────────────────────────────
const FLOOR_CONFIGS = {
  lightoak:    { color: '#C8A882', roughness: 0.35, clearcoat: 0.35, bumpType: 'wood', bumpScale: 0.015 },
  darkwalnut:  { color: '#3E2A18', roughness: 0.28, clearcoat: 0.45, bumpType: 'wood', bumpScale: 0.018 },
  marble:      { color: '#EDEAE4', roughness: 0.12, clearcoat: 0.85, bumpType: 'noise', bumpScale: 0.005 },
  concrete:    { color: '#888580', roughness: 0.72, clearcoat: 0.05, bumpType: 'noise', bumpScale: 0.02 },
  herringbone: { color: '#B89668', roughness: 0.32, clearcoat: 0.40, bumpType: 'wood', bumpScale: 0.02 },
  darktile:    { color: '#242322', roughness: 0.22, clearcoat: 0.55, bumpType: 'tile', bumpScale: 0.025 },
};

// ─────────────────────────────────────────────────────────────────────────────
// 1. HERO ARCHITECTURAL WINDOW WITH OUTDOOR GARDEN VIEW
// ─────────────────────────────────────────────────────────────────────────────
const HeroWindow = ({ blindType, curtainColor, curtainOpen }) => {
  const gardenTex = useTexture('/assets/imgs/home/window-garden-bg.jpg');

  // Physical Float Glass Pane
  const glassMat = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: '#FFFFFF',
    transmission: 0.95,
    opacity: 0.25,
    transparent: true,
    roughness: 0.02,
    ior: 1.52,
    thickness: 0.08,
    clearcoat: 1.0,
    clearcoatRoughness: 0.03,
  }), []);

  // Architectural Charcoal Anodized Aluminum Frame
  const frameMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#1A1816',
    metalness: 0.85,
    roughness: 0.22,
  }), []);

  // Deep Natural Sill Material
  const sillMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#2E2B27',
    roughness: 0.45,
    metalness: 0.15,
  }), []);

  return (
    <group position={[0, 2.5, -3.95]}>
      {/* A. Daylight Garden View Backdrop outside the window */}
      <mesh position={[0, 0.1, -1.2]}>
        <planeGeometry args={[7.2, 4.4]} />
        <meshBasicMaterial map={gardenTex} toneMapped={false} />
      </mesh>

      {/* B. Deep Architectural Window Reveal Framing */}
      {/* Top lintel */}
      <mesh position={[0, 1.88, 0.12]} material={sillMat} receiveShadow>
        <boxGeometry args={[4.2, 0.16, 0.32]} />
      </mesh>
      {/* Left jamb */}
      <mesh position={[-2.02, 0, 0.12]} material={sillMat} receiveShadow>
        <boxGeometry args={[0.16, 3.6, 0.32]} />
      </mesh>
      {/* Right jamb */}
      <mesh position={[2.02, 0, 0.12]} material={sillMat} receiveShadow>
        <boxGeometry args={[0.16, 3.6, 0.32]} />
      </mesh>
      {/* Deep Sill Shelf */}
      <mesh position={[0, -1.82, 0.18]} material={sillMat} castShadow receiveShadow>
        <boxGeometry args={[4.32, 0.14, 0.44]} />
      </mesh>

      {/* C. Slim Black Anodized Outer Mullion Rails */}
      <mesh position={[-1.92, 0, 0]} material={frameMat} castShadow receiveShadow>
        <boxGeometry args={[0.08, 3.6, 0.1]} />
      </mesh>
      <mesh position={[1.92, 0, 0]} material={frameMat} castShadow receiveShadow>
        <boxGeometry args={[0.08, 3.6, 0.1]} />
      </mesh>
      <mesh position={[0, 1.76, 0]} material={frameMat} castShadow receiveShadow>
        <boxGeometry args={[3.92, 0.08, 0.1]} />
      </mesh>
      <mesh position={[0, -1.74, 0]} material={frameMat} castShadow receiveShadow>
        <boxGeometry args={[3.92, 0.08, 0.1]} />
      </mesh>

      {/* Center Mullions: Dual Casement Divide + Transom */}
      <mesh position={[0, 0, 0.01]} material={frameMat} castShadow>
        <boxGeometry args={[0.06, 3.48, 0.07]} />
      </mesh>
      <mesh position={[0, 0.72, 0.01]} material={frameMat} castShadow>
        <boxGeometry args={[3.84, 0.05, 0.07]} />
      </mesh>

      {/* Physical Glass Panes */}
      <mesh position={[-0.95, 1.22, 0]} material={glassMat}>
        <planeGeometry args={[1.86, 0.94]} />
      </mesh>
      <mesh position={[0.95, 1.22, 0]} material={glassMat}>
        <planeGeometry args={[1.86, 0.94]} />
      </mesh>
      <mesh position={[-0.95, -0.52, 0]} material={glassMat}>
        <planeGeometry args={[1.86, 2.36]} />
      </mesh>
      <mesh position={[0.95, -0.52, 0]} material={glassMat}>
        <planeGeometry args={[1.86, 2.36]} />
      </mesh>

      {/* D. HERO WINDOW BLINDS (Mounted inside window reveal) */}
      <WindowBlinds type={blindType} openProgress={curtainOpen} />

      {/* E. FLOOR-TO-CEILING CURTAINS / DRAPERY */}
      <CurtainsDrapery color={curtainColor} openProgress={curtainOpen} />
    </group>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// 2. WINDOW BLINDS SUITE (The Hero Customization)
// ─────────────────────────────────────────────────────────────────────────────
const WindowBlinds = ({ type, openProgress }) => {
  const fabricTex = useMemo(() => createProceduralBump('fabric'), []);
  const woodTex = useMemo(() => createProceduralBump('wood'), []);

  const MAX_HEIGHT = 3.35;
  const currentHeight = Math.max(0.1, MAX_HEIGHT * (1 - openProgress * 0.88));
  const topY = 1.72;
  const centerY = topY - currentHeight / 2;
  const bottomY = topY - currentHeight;

  // Headbox Cassette Hardware
  const cassetteMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#1C1A18',
    metalness: 0.85,
    roughness: 0.22,
  }), []);

  const bottomBarMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#1C1A18',
    metalness: 0.85,
    roughness: 0.22,
  }), []);

  const TopCassette = (
    <mesh position={[0, topY + 0.05, 0.08]} material={cassetteMat} castShadow>
      <boxGeometry args={[3.86, 0.11, 0.12]} />
    </mesh>
  );

  const BottomBar = (
    <mesh position={[0, bottomY, 0.08]} material={bottomBarMat} castShadow>
      <boxGeometry args={[3.82, 0.05, 0.06]} />
    </mesh>
  );

  switch (type) {
    case 'roller': {
      return (
        <group>
          {TopCassette}
          {/* Taut architectural solar screen with micro-weave texture */}
          <mesh position={[0, centerY, 0.07]} castShadow receiveShadow>
            <planeGeometry args={[3.80, currentHeight]} />
            <meshStandardMaterial
              color="#E0D9CE"
              roughness={0.62}
              metalness={0.03}
              bumpMap={fabricTex}
              bumpScale={0.012}
              transparent
              opacity={0.94}
              side={THREE.DoubleSide}
            />
          </mesh>
          {BottomBar}
        </group>
      );
    }

    case 'zebra': {
      const STRIPE_COUNT = 14;
      const stripeH = currentHeight / STRIPE_COUNT;
      const vaneShift = (openProgress * stripeH * 0.5) % stripeH;

      return (
        <group>
          {TopCassette}
          {/* Front Layer */}
          <group position={[0, 0, 0.075]}>
            {Array.from({ length: STRIPE_COUNT }).map((_, i) => (
              <mesh key={`f_${i}`} position={[0, topY - (i + 0.5) * stripeH, 0]} castShadow receiveShadow>
                <planeGeometry args={[3.80, stripeH * 0.96]} />
                {i % 2 === 0 ? (
                  <meshStandardMaterial
                    color="#38342F"
                    roughness={0.68}
                    metalness={0.04}
                    bumpMap={fabricTex}
                    bumpScale={0.01}
                    side={THREE.DoubleSide}
                  />
                ) : (
                  <meshPhysicalMaterial
                    color="#F6F3ED"
                    transmission={0.65}
                    opacity={0.65}
                    transparent
                    roughness={0.38}
                    side={THREE.DoubleSide}
                  />
                )}
              </mesh>
            ))}
          </group>

          {/* Rear Layer with Self-Shadow Offset */}
          <group position={[0, vaneShift, 0.055]}>
            {Array.from({ length: STRIPE_COUNT }).map((_, i) => (
              <mesh key={`b_${i}`} position={[0, topY - (i + 0.5) * stripeH, 0]} castShadow receiveShadow>
                <planeGeometry args={[3.80, stripeH * 0.96]} />
                {i % 2 === 0 ? (
                  <meshPhysicalMaterial
                    color="#F6F3ED"
                    transmission={0.65}
                    opacity={0.65}
                    transparent
                    roughness={0.38}
                    side={THREE.DoubleSide}
                  />
                ) : (
                  <meshStandardMaterial
                    color="#38342F"
                    roughness={0.68}
                    metalness={0.04}
                    bumpMap={fabricTex}
                    bumpScale={0.01}
                    side={THREE.DoubleSide}
                  />
                )}
              </mesh>
            ))}
          </group>
          {BottomBar}
        </group>
      );
    }

    case 'honeycomb': {
      const pleatCount = Math.max(6, Math.floor(currentHeight / 0.08));
      const pleatH = currentHeight / pleatCount;

      return (
        <group>
          {TopCassette}
          <group position={[0, 0, 0.07]}>
            {Array.from({ length: pleatCount }).map((_, i) => (
              <mesh key={i} position={[0, topY - (i + 0.5) * pleatH, 0]} castShadow receiveShadow>
                <boxGeometry args={[3.80, pleatH * 0.88, 0.045]} />
                <meshStandardMaterial
                  color="#D6CBBC"
                  roughness={0.75}
                  bumpMap={fabricTex}
                  bumpScale={0.008}
                  transparent
                  opacity={0.92}
                />
              </mesh>
            ))}
          </group>
          {BottomBar}
        </group>
      );
    }

    case 'vertical': {
      const numVanes = 16;
      const vaneWidth = 0.28;
      const vaneAngle = openProgress * Math.PI * 0.48;

      return (
        <group>
          {TopCassette}
          <group position={[0, 0, 0.07]}>
            {Array.from({ length: numVanes }).map((_, i) => {
              const xPos = -1.82 + (i + 0.5) * (3.64 / numVanes);
              return (
                <mesh
                  key={i}
                  position={[xPos, topY - MAX_HEIGHT / 2, 0]}
                  rotation-y={vaneAngle}
                  castShadow
                  receiveShadow
                >
                  <boxGeometry args={[vaneWidth, MAX_HEIGHT, 0.01]} />
                  <meshStandardMaterial
                    color="#D8D2C6"
                    roughness={0.58}
                    bumpMap={fabricTex}
                    bumpScale={0.01}
                    side={THREE.DoubleSide}
                  />
                </mesh>
              );
            })}
          </group>
        </group>
      );
    }

    case 'wooden': {
      const slatCount = Math.max(6, Math.floor(currentHeight / 0.11));
      const slatH = currentHeight / slatCount;
      const slatAngle = -0.28 + openProgress * 0.62;

      return (
        <group>
          {TopCassette}
          <group position={[0, 0, 0.075]}>
            {Array.from({ length: slatCount }).map((_, i) => (
              <mesh
                key={i}
                position={[0, topY - (i + 0.5) * slatH, 0]}
                rotation-x={slatAngle}
                castShadow
                receiveShadow
              >
                <boxGeometry args={[3.82, 0.085, 0.015]} />
                <meshStandardMaterial
                  color="#7C5228"
                  roughness={0.32}
                  metalness={0.06}
                  bumpMap={woodTex}
                  bumpScale={0.015}
                />
              </mesh>
            ))}
            {/* Braided fabric ladder tapes */}
            {[-1.2, 0, 1.2].map((tx, idx) => (
              <mesh key={idx} position={[tx, centerY, 0.085]} castShadow>
                <boxGeometry args={[0.038, currentHeight, 0.005]} />
                <meshStandardMaterial color="#3D2916" roughness={0.85} />
              </mesh>
            ))}
          </group>
          {BottomBar}
        </group>
      );
    }

    case 'pvc': {
      const slatCount = Math.max(6, Math.floor(currentHeight / 0.10));
      const slatH = currentHeight / slatCount;
      const slatAngle = -0.25 + openProgress * 0.58;

      return (
        <group>
          {TopCassette}
          <group position={[0, 0, 0.075]}>
            {Array.from({ length: slatCount }).map((_, i) => (
              <mesh
                key={i}
                position={[0, topY - (i + 0.5) * slatH, 0]}
                rotation-x={slatAngle}
                castShadow
                receiveShadow
              >
                <boxGeometry args={[3.82, 0.08, 0.014]} />
                <meshStandardMaterial
                  color="#F4F2EE"
                  roughness={0.22}
                  metalness={0.05}
                />
              </mesh>
            ))}
          </group>
          {BottomBar}
        </group>
      );
    }

    default:
      return null;
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// 3. CURTAINS / ARCHITECTURAL DRAPERY (Floor-to-Ceiling S-Folds)
// ─────────────────────────────────────────────────────────────────────────────
const CurtainsDrapery = ({ color, openProgress }) => {
  const fabricTex = useMemo(() => createProceduralBump('fabric'), []);

  // Continuous sinusoidal S-fold drapery geometry
  const drapeGeo = useMemo(() => {
    const geo = new THREE.PlaneGeometry(1.65, 3.65, 36, 16);
    geo.translate(0.825, -1.825, 0);
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const wave = Math.sin(x * 12.0) * 0.085 + Math.cos(x * 4.5) * 0.025;
      pos.setZ(i, wave);
    }
    geo.computeVertexNormals();
    return geo;
  }, []);

  const curtainMat = useMemo(() => new THREE.MeshStandardMaterial({
    color,
    roughness: 0.78,
    metalness: 0.03,
    bumpMap: fabricTex,
    bumpScale: 0.014,
    side: THREE.DoubleSide,
  }), [color, fabricTex]);

  // Open position stacks neatly outside; closed glides toward center
  const stackOffset = 1.95 - openProgress * 0.75;

  return (
    <group position={[0, 1.84, 0.22]}>
      {/* Architectural Ceiling Rod */}
      <mesh position={[0, 0, 0]} rotation-z={Math.PI / 2} castShadow>
        <cylinderGeometry args={[0.02, 0.02, 4.38, 16]} />
        <meshStandardMaterial color="#C4A052" metalness={0.92} roughness={0.2} />
      </mesh>

      {/* Left Drapery Panel */}
      <group position={[-stackOffset, 0, 0]}>
        <mesh geometry={drapeGeo} material={curtainMat} castShadow receiveShadow />
      </group>

      {/* Right Drapery Panel (mirrored) */}
      <group position={[stackOffset, 0, 0]} scale={[-1, 1, 1]}>
        <mesh geometry={drapeGeo} material={curtainMat} castShadow receiveShadow />
      </group>
    </group>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// 4. SOFA & LIVING ROOM SEATING
// ─────────────────────────────────────────────────────────────────────────────
const LivingSofa = ({ style, color }) => {
  const fabricTex = useMemo(() => createProceduralBump('fabric'), []);

  const upholsteryMat = useMemo(() => new THREE.MeshStandardMaterial({
    color,
    roughness: 0.80,
    metalness: 0.04,
    bumpMap: fabricTex,
    bumpScale: 0.012,
  }), [color, fabricTex]);

  const legMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#1E1B18',
    roughness: 0.35,
    metalness: 0.8,
  }), []);

  if (style === 'chesterfield') {
    return (
      <group position={[0, 0, -0.6]}>
        {/* Tufted Seat Base */}
        <mesh position={[0, 0.32, 0]} material={upholsteryMat} castShadow receiveShadow>
          <boxGeometry args={[3.2, 0.44, 1.05]} />
        </mesh>
        {/* Rolled Backrest */}
        <mesh position={[0, 0.85, -0.38]} material={upholsteryMat} castShadow receiveShadow>
          <boxGeometry args={[3.2, 0.65, 0.32]} />
        </mesh>
        {/* Rolled Arms */}
        <mesh position={[-1.68, 0.68, 0]} material={upholsteryMat} castShadow receiveShadow>
          <boxGeometry args={[0.34, 0.68, 1.05]} />
        </mesh>
        <mesh position={[1.68, 0.68, 0]} material={upholsteryMat} castShadow receiveShadow>
          <boxGeometry args={[0.34, 0.68, 1.05]} />
        </mesh>
        {/* Turned Walnut Legs */}
        {[-1.5, 1.5].map((x) =>
          [-0.38, 0.38].map((z) => (
            <mesh key={`${x}-${z}`} position={[x, 0.12, z]} material={legMat} castShadow>
              <cylinderGeometry args={[0.045, 0.03, 0.24, 12]} />
            </mesh>
          ))
        )}
      </group>
    );
  }

  if (style === 'curved') {
    return (
      <group position={[0, 0, -0.6]}>
        {/* Curved Organic Crescent Seat */}
        <mesh rotation={[Math.PI / 2, 0, Math.PI / 4.2]} position={[0, 0.28, -0.15]} material={upholsteryMat} castShadow receiveShadow>
          <torusGeometry args={[1.75, 0.32, 16, 48, Math.PI / 1.55]} />
        </mesh>
        {/* Curved Backrest */}
        <mesh rotation={[0, 0, Math.PI / 4.2]} position={[0, 0.76, -0.32]} material={upholsteryMat} castShadow receiveShadow>
          <torusGeometry args={[1.75, 0.38, 16, 48, Math.PI / 1.55]} />
        </mesh>
      </group>
    );
  }

  // Default: Tuxedo / Modern Architectural Sofa
  return (
    <group position={[0, 0, -0.6]}>
      {/* Plinth / Seat Cushions */}
      <mesh position={[0, 0.34, 0]} material={upholsteryMat} castShadow receiveShadow>
        <boxGeometry args={[3.15, 0.44, 0.95]} />
      </mesh>
      {/* Backrest Cushion */}
      <mesh position={[0, 0.82, -0.36]} material={upholsteryMat} castShadow receiveShadow>
        <boxGeometry args={[3.15, 0.58, 0.24]} />
      </mesh>
      {/* Slim Tailored Arms */}
      <mesh position={[-1.64, 0.56, 0]} material={upholsteryMat} castShadow receiveShadow>
        <boxGeometry args={[0.22, 0.54, 0.95]} />
      </mesh>
      <mesh position={[1.64, 0.56, 0]} material={upholsteryMat} castShadow receiveShadow>
        <boxGeometry args={[0.22, 0.54, 0.95]} />
      </mesh>
      {/* Brass Tapered Legs */}
      {[-1.45, 1.45].map((x) =>
        [-0.34, 0.34].map((z) => (
          <mesh key={`${x}-${z}`} position={[x, 0.12, z]} material={legMat} castShadow>
            <cylinderGeometry args={[0.035, 0.022, 0.24, 12]} />
          </mesh>
        ))
      )}
    </group>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// 5. COFFEE TABLE & RUG
// ─────────────────────────────────────────────────────────────────────────────
const CoffeeTableAndRug = ({ floorType, rugColor, rugPattern }) => {
  const floorConfig = FLOOR_CONFIGS[floorType] || FLOOR_CONFIGS.lightoak;
  const woodTex = useMemo(() => createProceduralBump('wood'), []);

  // Table Top Material matches refined luxury surface
  const tableTopMat = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: floorConfig.color,
    roughness: floorConfig.roughness,
    clearcoat: floorConfig.clearcoat,
    bumpMap: woodTex,
    bumpScale: 0.01,
  }), [floorConfig, woodTex]);

  const brassLegMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#C9A55A',
    metalness: 0.88,
    roughness: 0.20,
  }), []);

  const rugMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: rugColor === 'none' ? '#000000' : rugColor,
    roughness: 0.94,
    metalness: 0.01,
  }), [rugColor]);

  return (
    <group>
      {/* Wool Geometric Area Rug */}
      {rugColor !== 'none' && (
        <group position={[0, 0.005, 0.1]} rotation-x={-Math.PI / 2}>
          <mesh material={rugMat} receiveShadow>
            <planeGeometry args={[3.8, 2.6]} />
          </mesh>
          {/* Subtle woven pattern accents */}
          {rugPattern === 'striped' && (
            <group position={[0, 0, 0.001]}>
              {[-1.4, -0.7, 0, 0.7, 1.4].map((x) => (
                <mesh key={x} position={[x, 0, 0]}>
                  <planeGeometry args={[0.08, 2.6]} />
                  <meshStandardMaterial color="#C9A55A" opacity={0.35} transparent roughness={0.8} />
                </mesh>
              ))}
            </group>
          )}
          {rugPattern === 'geometric' && (
            <group position={[0, 0, 0.001]}>
              {[-1.0, 0, 1.0].map((x) => (
                <mesh key={x} position={[x, 0, 0]} rotation-z={Math.PI / 4}>
                  <planeGeometry args={[0.45, 0.45]} />
                  <meshStandardMaterial color="#C9A55A" opacity={0.28} transparent roughness={0.8} />
                </mesh>
              ))}
            </group>
          )}
        </group>
      )}

      {/* Architectural Coffee Table */}
      <group position={[0, 0.38, 0.85]}>
        {/* Table Top Surface */}
        <mesh position={[0, 0, 0]} material={tableTopMat} castShadow receiveShadow>
          <boxGeometry args={[1.65, 0.05, 0.85]} />
        </mesh>
        {/* Brass Legs */}
        {[[-0.72, -0.34], [0.72, -0.34], [-0.72, 0.34], [0.72, 0.34]].map(([x, z], i) => (
          <mesh key={i} position={[x, -0.19, z]} material={brassLegMat} castShadow>
            <cylinderGeometry args={[0.018, 0.018, 0.38, 12]} />
          </mesh>
        ))}
        {/* Ceramic Centerpiece Dish */}
        <mesh position={[0, 0.035, 0]} castShadow>
          <cylinderGeometry args={[0.12, 0.08, 0.04, 16]} />
          <meshStandardMaterial color="#EAE6DF" roughness={0.35} />
        </mesh>
      </group>
    </group>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// 6. LIGHTING FIXTURES & DECOR ACCESSORIES
// ─────────────────────────────────────────────────────────────────────────────
const CeilingPendant = ({ active, mood }) => {
  if (!active) return null;
  return (
    <group position={[0, 4.4, -0.6]}>
      {/* Downward point light illuminating the room */}
      <pointLight
        intensity={mood.pendantI}
        color={mood.pendantC}
        distance={10}
        decay={2}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0001}
      />
      {/* Suspension Wire */}
      <mesh position={[0, 0.22, 0]} castShadow>
        <cylinderGeometry args={[0.008, 0.008, 0.5, 8]} />
        <meshStandardMaterial color="#1A1816" metalness={0.85} />
      </mesh>
      {/* Architectural Brass Cone Shade */}
      <mesh rotation={[Math.PI, 0, 0]} position={[0, -0.06, 0]} castShadow>
        <coneGeometry args={[0.32, 0.35, 20]} />
        <meshStandardMaterial
          color="#C9A55A"
          metalness={0.88}
          roughness={0.22}
          emissive={mood.pendantC}
          emissiveIntensity={0.25}
        />
      </mesh>
    </group>
  );
};

const FloorLamp = ({ active, mood }) => {
  if (!active) return null;
  return (
    <group position={[-3.2, 0, -1.2]}>
      {/* Heavy Base */}
      <mesh position={[0, 0.04, 0]} castShadow>
        <cylinderGeometry args={[0.16, 0.18, 0.08, 16]} />
        <meshStandardMaterial color="#34281E" roughness={0.4} />
      </mesh>
      {/* Stem */}
      <mesh position={[0, 0.85, 0]} castShadow>
        <cylinderGeometry args={[0.02, 0.02, 1.65, 12]} />
        <meshStandardMaterial color="#C9A55A" metalness={0.85} roughness={0.25} />
      </mesh>
      {/* Lamp Point Light */}
      <pointLight position={[0.25, 1.65, 0]} intensity={mood.lampI} color={mood.lampC} distance={7} decay={2} castShadow />
      {/* Shade */}
      <mesh position={[0.25, 1.55, 0]} rotation={[Math.PI, 0, 0]} castShadow>
        <coneGeometry args={[0.25, 0.32, 18]} />
        <meshStandardMaterial color="#F5F0E8" roughness={0.65} emissive={mood.lampC} emissiveIntensity={0.45} />
      </mesh>
    </group>
  );
};

const RotatingCeilingFan = ({ active }) => {
  const bladesRef = useRef();

  useFrame((_, delta) => {
    if (active && bladesRef.current) {
      bladesRef.current.rotation.y += delta * 4.5;
    }
  });

  const housingMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#22201D', roughness: 0.3, metalness: 0.85 }), []);
  const bladeMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#4A3522', roughness: 0.45 }), []);

  if (!active) return null;

  return (
    <group position={[0, 4.65, -0.6]}>
      <mesh position={[0, -0.08, 0]} material={housingMat} castShadow>
        <cylinderGeometry args={[0.12, 0.12, 0.16, 16]} />
      </mesh>
      <group ref={bladesRef} position={[0, -0.18, 0]}>
        {[0, 1, 2, 3].map((i) => (
          <mesh key={i} rotation={[0, (i * Math.PI) / 2, 0]} position={[0.55, 0, 0]} material={bladeMat} castShadow>
            <boxGeometry args={[1.05, 0.015, 0.18]} />
          </mesh>
        ))}
      </group>
    </group>
  );
};

const PottedPlant = ({ active }) => {
  if (!active) return null;
  return (
    <group position={[-3.3, 0, -3.2]}>
      {/* Ceramic Fluted Pot */}
      <mesh position={[0, 0.25, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.22, 0.28, 0.5, 18]} />
        <meshStandardMaterial color="#D8D0C4" roughness={0.38} />
      </mesh>
      {/* Soil */}
      <mesh position={[0, 0.49, 0]} receiveShadow>
        <cylinderGeometry args={[0.21, 0.21, 0.03, 16]} />
        <meshStandardMaterial color="#2B1D12" roughness={0.92} />
      </mesh>
      {/* Broad Leaf Foliage */}
      <group position={[0, 0.52, 0]}>
        {[0.75, 0.95, 1.15].map((h, i) => (
          <group key={i} rotation={[0, (i * Math.PI * 2) / 3, 0]}>
            <mesh position={[0, h / 2, 0]} rotation={[0.08, 0, 0.08]} castShadow>
              <cylinderGeometry args={[0.016, 0.016, h, 6]} />
              <meshStandardMaterial color="#2A4E1B" roughness={0.6} />
            </mesh>
            <mesh position={[0.18, h, 0.18]} rotation={[0.4, 0, 0.4]} castShadow receiveShadow>
              <sphereGeometry args={[0.28, 12, 12]} />
              <meshStandardMaterial color={['#2E631C', '#245215', '#387522'][i]} roughness={0.42} />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  );
};

const BookshelfDecor = ({ active }) => {
  if (!active) return null;
  return (
    <group position={[3.85, 1.4, -2.8]} rotation-y={-Math.PI / 2}>
      {/* Floating Walnut Shelves */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1.2, 0.04, 0.28]} />
        <meshStandardMaterial color="#4A3420" roughness={0.4} />
      </mesh>
      <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.2, 0.04, 0.28]} />
        <meshStandardMaterial color="#4A3420" roughness={0.4} />
      </mesh>
      {/* Ceramic Vases & Books */}
      <mesh position={[-0.32, 0.14, 0]} castShadow>
        <cylinderGeometry args={[0.06, 0.08, 0.24, 14]} />
        <meshStandardMaterial color="#C9A55A" metalness={0.88} roughness={0.22} />
      </mesh>
      <mesh position={[0.3, 0.12, 0]} castShadow>
        <boxGeometry args={[0.22, 0.2, 0.16]} />
        <meshStandardMaterial color="#EAE4DA" roughness={0.6} />
      </mesh>
    </group>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// 7. MASTER ARCHITECTURAL ROOM ASSEMBLY
// ─────────────────────────────────────────────────────────────────────────────
const MasterRoom = ({ roomState }) => {
  const mood = LIGHT_MOODS[roomState.lightMode] || LIGHT_MOODS.warm;
  const floorConfig = FLOOR_CONFIGS[roomState.floorType] || FLOOR_CONFIGS.lightoak;
  const floorBump = useMemo(() => createProceduralBump(floorConfig.bumpType), [floorConfig.bumpType]);
  const wallBump = useMemo(() => createProceduralBump('noise'), []);

  // Floor PBR Material with realistic grain/reflection
  const floorMat = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: floorConfig.color,
    roughness: floorConfig.roughness,
    clearcoat: floorConfig.clearcoat,
    clearcoatRoughness: 0.18,
    metalness: 0.02,
    bumpMap: floorBump,
    bumpScale: floorConfig.bumpScale,
  }), [floorConfig, floorBump]);

  // Wall PBR Material with subtle matte limewash paint micro-relief
  const wallMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: roomState.wallColor,
    roughness: 0.88,
    metalness: 0.01,
    bumpMap: wallBump,
    bumpScale: 0.008,
  }), [roomState.wallColor, wallBump]);

  const ceilingMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#F8F6F2',
    roughness: 0.92,
  }), []);

  return (
    <group>
      {/* Floor */}
      <mesh rotation-x={-Math.PI / 2} position={[0, 0, 0]} material={floorMat} receiveShadow>
        <planeGeometry args={[10, 10]} />
      </mesh>

      {/* Ceiling */}
      <mesh rotation-x={Math.PI / 2} position={[0, 4.8, 0]} material={ceilingMat}>
        <planeGeometry args={[10, 10]} />
      </mesh>

      {/* Back Wall with Window Cutout */}
      <group position={[0, 0, -4.0]}>
        {/* Left Wall Slab */}
        <mesh position={[-3.1, 2.4, 0]} material={wallMat} receiveShadow>
          <boxGeometry args={[2.2, 4.8, 0.2]} />
        </mesh>
        {/* Right Wall Slab */}
        <mesh position={[3.1, 2.4, 0]} material={wallMat} receiveShadow>
          <boxGeometry args={[2.2, 4.8, 0.2]} />
        </mesh>
        {/* Top Header Wall Slab */}
        <mesh position={[0, 4.45, 0]} material={wallMat} receiveShadow>
          <boxGeometry args={[4.0, 0.7, 0.2]} />
        </mesh>
        {/* Bottom Sill Wall Slab */}
        <mesh position={[0, 0.35, 0]} material={wallMat} receiveShadow>
          <boxGeometry args={[4.0, 0.7, 0.2]} />
        </mesh>
      </group>

      {/* Left Wall */}
      <mesh position={[-4.2, 2.4, 0]} rotation-y={Math.PI / 2} material={wallMat} receiveShadow>
        <planeGeometry args={[10, 4.8]} />
      </mesh>

      {/* Right Wall */}
      <mesh position={[4.2, 2.4, 0]} rotation-y={-Math.PI / 2} material={wallMat} receiveShadow>
        <planeGeometry args={[10, 4.8]} />
      </mesh>

      {/* Hero Window with Blinds & Curtains */}
      <HeroWindow
        blindType={roomState.blindType}
        curtainColor={roomState.curtainColor}
        curtainOpen={roomState.curtainOpen}
      />

      {/* Living Room Furniture */}
      <LivingSofa style={roomState.sofaStyle} color={roomState.sofaColor} />
      <CoffeeTableAndRug floorType={roomState.floorType} rugColor={roomState.rugColor} rugPattern={roomState.rugPattern} />

      {/* Decor & Fixtures */}
      <CeilingPendant active={roomState.ceilingLightOn} mood={mood} />
      <FloorLamp active={roomState.floorLampOn} mood={mood} />
      <RotatingCeilingFan active={roomState.fanOn} />
      <PottedPlant active={roomState.plantOn} />
      <BookshelfDecor active={roomState.decorOn} />

      {/* Lighting: HDRI ambient + Key Directional Sunlight */}
      <ambientLight intensity={mood.ambI} color="#FFFBF5" />
      <Environment preset="apartment" environmentIntensity={mood.envI} />

      {/* Directional sunlight streaming into the room through the hero window */}
      <directionalLight
        position={[2.4, 4.5, -4.6]}
        target-position={[0, 1.2, 0]}
        intensity={mood.sunI}
        color={mood.sunC}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.00015}
        shadow-camera-near={0.5}
        shadow-camera-far={16}
        shadow-camera-left={-5}
        shadow-camera-right={5}
        shadow-camera-top={5}
        shadow-camera-bottom={-3}
      />
    </group>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// 8. TOP-LEVEL ROOM CANVAS
// Smooth damped orbit controls, clamped angles, 60fps performance budget
// ─────────────────────────────────────────────────────────────────────────────
const RoomCanvas = ({ roomState }) => {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      gl={{
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.15,
        outputColorSpace: THREE.SRGBColorSpace,
        antialias: true,
        powerPreference: 'high-performance',
      }}
    >
      <Suspense fallback={null}>
        <PerspectiveCamera makeDefault fov={50} position={[0, 2.2, 5.8]} />
        <OrbitControls
          enableDamping
          dampingFactor={0.05}
          maxPolarAngle={Math.PI / 2.05}
          minPolarAngle={0.4}
          minDistance={3.2}
          maxDistance={8.8}
          enablePan={false}
          target={[0, 1.8, -0.8]}
        />

        <MasterRoom roomState={roomState} />

        <ContactShadows
          position={[0, 0.002, 0]}
          opacity={0.45}
          scale={12}
          blur={2.4}
          far={6}
          resolution={512}
        />
      </Suspense>
    </Canvas>
  );
};

export default RoomCanvas;
