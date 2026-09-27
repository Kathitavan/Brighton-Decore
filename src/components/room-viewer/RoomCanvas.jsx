// src/components/room-viewer/RoomCanvas.jsx
// Brighton Decor Ltd — 3D Room Studio Architectural Canvas
//
// The window is the hero. The room is the context.
// Features:
//   - Independent Blinds & Curtains layering (use both, either, or bare clean window)
//   - Photoreal ArchViz luxury furniture: Italian designer cushioned sofa with bouclé pillows,
//     fluted travertine coffee table with styled decor, plush hand-tufted wool rug,
//     sculptural arc floor lamp, high-set brass halo pendant (never blocks window!),
//     and living botanical olive tree with organic multi-stem foliage & natural breeze sway physics.
//   - Fast zero-latency local PBR textures, ACESFilmic tone mapping, 60fps performance budget.

import React, { Suspense, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  OrbitControls, 
  PerspectiveCamera, 
  ContactShadows 
} from '@react-three/drei';
import * as THREE from 'three';

// ─────────────────────────────────────────────────────────────────────────────
// PROCEDURAL PBR TEXTURES (0KB, instant generation, zero network latency)
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
        const grain = Math.sin(x * 0.4 + Math.sin(y * 0.1) * 2.5) * 40;
        const noise = (Math.random() - 0.5) * 15;
        val = Math.floor(Math.max(0, Math.min(255, 128 + grain + noise)));
      } else if (type === 'fabric') {
        const weave = (Math.sin(x * 0.8) * Math.cos(y * 0.8) + 1) * 45;
        const noise = (Math.random() - 0.5) * 12;
        val = Math.floor(Math.max(0, Math.min(255, 110 + weave + noise)));
      } else if (type === 'tile') {
        const isJoint = (x % 32 < 2) || (y % 32 < 2);
        val = isJoint ? 40 : 180 + Math.floor((Math.random() - 0.5) * 15);
      } else {
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
    sunI: 3.8,
    sunC: '#FFF3E2',
    ambI: 0.68,
    hemiSky: '#FFF5E6',
    hemiGround: '#3D3428',
    pendantC: '#FFD59E',
    pendantI: 2.2,
    lampC: '#FFE0B2',
    lampI: 1.8,
  },
  cool: {
    sunI: 3.5,
    sunC: '#EEF6FF',
    ambI: 0.72,
    hemiSky: '#EBF3FF',
    hemiGround: '#2E3540',
    pendantC: '#DCEBFF',
    pendantI: 1.8,
    lampC: '#E5F0FF',
    lampI: 1.5,
  },
  bright: {
    sunI: 4.8,
    sunC: '#FFFFFF',
    ambI: 0.88,
    hemiSky: '#FFFFFF',
    hemiGround: '#454038',
    pendantC: '#FFFFFF',
    pendantI: 2.6,
    lampC: '#FFF8F0',
    lampI: 2.0,
  },
  dim: {
    sunI: 1.6,
    sunC: '#FFA85C',
    ambI: 0.38,
    hemiSky: '#FFB87A',
    hemiGround: '#241D16',
    pendantC: '#FFA550',
    pendantI: 1.4,
    lampC: '#FF9538',
    lampI: 1.2,
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// FLOOR MATERIAL PROFILES
// ─────────────────────────────────────────────────────────────────────────────
const FLOOR_CONFIGS = {
  lightoak:    { color: '#C8A882', roughness: 0.35, clearcoat: 0.35, bumpType: 'wood', bumpScale: 0.015 },
  darkwalnut:  { color: '#3E2A18', roughness: 0.28, clearcoat: 0.45, bumpType: 'wood', bumpScale: 0.018 },
  bleachedash: { color: '#E4DDD4', roughness: 0.40, clearcoat: 0.30, bumpType: 'wood', bumpScale: 0.012 },
  terrazzo:    { color: '#D9D5CC', roughness: 0.22, clearcoat: 0.60, bumpType: 'tile', bumpScale: 0.008 },
  marble:      { color: '#EAE6E1', roughness: 0.18, clearcoat: 0.70, bumpType: 'tile', bumpScale: 0.006 },
  herringbone: { color: '#B59468', roughness: 0.32, clearcoat: 0.40, bumpType: 'wood', bumpScale: 0.016 },
  concrete:    { color: '#888580', roughness: 0.65, clearcoat: 0.15, bumpType: 'tile', bumpScale: 0.010 },
  darktile:    { color: '#252321', roughness: 0.30, clearcoat: 0.50, bumpType: 'tile', bumpScale: 0.012 },
};

// ─────────────────────────────────────────────────────────────────────────────
// AIRBORNE SUNBEAM DUST MOTES
// ─────────────────────────────────────────────────────────────────────────────
const RoomSunbeamMotes = () => {
  const pointsRef = useRef();
  const COUNT = 32;

  const [positions, offsets] = useMemo(() => {
    const pos = new Float32Array(COUNT * 3);
    const offs = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 4.2;
      pos[i * 3 + 1] = Math.random() * 3.6 + 0.3;
      pos[i * 3 + 2] = Math.random() * 3.8 - 2.8;

      offs[i * 3] = Math.random() * 100;
      offs[i * 3 + 1] = Math.random() * 100;
      offs[i * 3 + 2] = Math.random() * 100;
    }
    return [pos, offs];
  }, []);

  const moteMat = useMemo(() => new THREE.PointsMaterial({
    color: '#FFE8B8',
    size: 0.024,
    transparent: true,
    opacity: 0.45,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  }), []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const time = state.clock.getElapsedTime();
    const posAttr = pointsRef.current.geometry.attributes.position;
    const arr = posAttr.array;

    for (let i = 0; i < COUNT; i++) {
      const idx = i * 3;
      arr[idx] += Math.sin(time * 0.35 + offsets[idx]) * 0.001;
      arr[idx + 1] += Math.cos(time * 0.45 + offsets[idx + 1]) * 0.0012;
      arr[idx + 2] += Math.sin(time * 0.28 + offsets[idx + 2]) * 0.001;

      if (arr[idx + 1] > 4.2) arr[idx + 1] = 0.3;
      if (arr[idx + 1] < 0.3) arr[idx + 1] = 4.2;
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef} material={moteMat}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={COUNT}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
    </points>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// 1. HERO ARCHITECTURAL WINDOW WITH INDEPENDENT BLINDS & CURTAINS
// ─────────────────────────────────────────────────────────────────────────────
const HeroWindow = ({ blindType, curtainColor, curtainOpen = 0.6, blindOpen = 0.2 }) => {
  const gardenTex = useMemo(() => {
    const loader = new THREE.TextureLoader();
    const texture = loader.load('/assets/imgs/home/window-garden-bg.jpg');
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }, []);

  // Physical Float Glass Pane
  const glassMat = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: '#FFFFFF',
    transmission: 0.95,
    opacity: 0.2,
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

  const hasBlinds = blindType && blindType !== 'none';
  const hasCurtains = curtainColor && curtainColor !== 'none';

  return (
    <group position={[0, 2.5, -3.95]}>
      {/* A. Daylight Garden View Backdrop outside the window */}
      <mesh position={[0, 0.2, -1.8]}>
        <planeGeometry args={[11.5, 6.2]} />
        <meshBasicMaterial map={gardenTex} toneMapped={false} />
      </mesh>

      {/* Outdoor Ambient Sun Sky Glow */}
      <mesh position={[1.8, 1.8, -1.75]}>
        <planeGeometry args={[4.5, 4.5]} />
        <meshBasicMaterial
          color="#FFF5E0"
          transparent
          opacity={0.25}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* B. Deep Architectural Window Reveal Framing */}
      <mesh position={[0, 1.88, 0.12]} material={sillMat} receiveShadow>
        <boxGeometry args={[4.2, 0.16, 0.32]} />
      </mesh>
      <mesh position={[-2.02, 0, 0.12]} material={sillMat} receiveShadow>
        <boxGeometry args={[0.16, 3.6, 0.32]} />
      </mesh>
      <mesh position={[2.02, 0, 0.12]} material={sillMat} receiveShadow>
        <boxGeometry args={[0.16, 3.6, 0.32]} />
      </mesh>

      {/* Solid Window Sill contained flush in reveal */}
      <mesh position={[0, -1.82, 0.06]} material={sillMat} castShadow receiveShadow>
        <boxGeometry args={[4.24, 0.1, 0.22]} />
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

      {/* Center Mullions */}
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

      {/* D. HERO WINDOW BLINDS (Rendered only when active) */}
      {hasBlinds && <WindowBlinds type={blindType} openProgress={blindOpen} />}

      {/* E. FLOOR-TO-CEILING CURTAINS / DRAPERY (Rendered only when active) */}
      {hasCurtains && <CurtainsDrapery color={curtainColor} openProgress={curtainOpen} />}
    </group>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// 2. WINDOW BLINDS SUITE WITH MECHANICAL INERTIA PHYSICS
// ─────────────────────────────────────────────────────────────────────────────
const WindowBlinds = ({ type, openProgress = 0.2 }) => {
  const fabricTex = useMemo(() => createProceduralBump('fabric'), []);
  const woodTex = useMemo(() => createProceduralBump('wood'), []);

  const smoothProgress = useRef(openProgress);
  const barrelRef = useRef();

  useFrame((_, delta) => {
    smoothProgress.current = THREE.MathUtils.damp(smoothProgress.current, openProgress, 8, delta);
    if (barrelRef.current) {
      barrelRef.current.rotation.x = -smoothProgress.current * Math.PI * 4;
    }
  });

  const MAX_HEIGHT = 3.35;
  const currentHeight = Math.max(0.12, MAX_HEIGHT * (1 - openProgress * 0.88));
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
    <group position={[0, topY + 0.05, 0.08]}>
      <mesh material={cassetteMat} castShadow>
        <boxGeometry args={[3.86, 0.11, 0.12]} />
      </mesh>
      {/* Rotating Aluminum Roller Barrel */}
      <mesh ref={barrelRef} position={[0, -0.02, 0]} rotation-z={Math.PI / 2} material={cassetteMat}>
        <cylinderGeometry args={[0.028, 0.028, 3.82, 16]} />
      </mesh>
    </group>
  );

  const BottomBar = (
    <mesh position={[0, bottomY, 0.08]} material={bottomBarMat} castShadow>
      <boxGeometry args={[3.84, 0.038, 0.028]} />
    </mesh>
  );

  switch (type) {
    case 'roller': {
      return (
        <group>
          {TopCassette}
          <mesh position={[0, centerY, 0.075]} castShadow receiveShadow>
            <planeGeometry args={[3.82, currentHeight]} />
            <meshStandardMaterial
              color="#E8E2D8"
              roughness={0.78}
              metalness={0.02}
              bumpMap={fabricTex}
              bumpScale={0.008}
              side={THREE.DoubleSide}
            />
          </mesh>
          {BottomBar}
        </group>
      );
    }

    case 'zebra': {
      return (
        <group>
          {TopCassette}
          <mesh position={[0, centerY, 0.072]} castShadow receiveShadow>
            <planeGeometry args={[3.82, currentHeight]} />
            <meshStandardMaterial
              color="#DED8CE"
              roughness={0.72}
              bumpMap={fabricTex}
              bumpScale={0.012}
              side={THREE.DoubleSide}
            />
          </mesh>
          {/* Subtle dual-layer zebra vanes */}
          <group position={[0, centerY, 0.076]}>
            {Array.from({ length: 18 }).map((_, i) => (
              <mesh key={i} position={[0, (i - 9) * 0.18, 0]}>
                <planeGeometry args={[3.82, 0.09]} />
                <meshStandardMaterial color="#35302A" roughness={0.9} side={THREE.DoubleSide} />
              </mesh>
            ))}
          </group>
          {BottomBar}
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

    case 'roman': {
      const foldCount = Math.max(3, Math.floor(currentHeight / 0.45));
      const foldH = currentHeight / foldCount;
      return (
        <group>
          {TopCassette}
          <group position={[0, 0, 0.075]}>
            {Array.from({ length: foldCount }).map((_, i) => (
              <mesh
                key={i}
                position={[0, topY - (i + 0.5) * foldH, 0.01 * (i % 2)]}
                castShadow
                receiveShadow
              >
                <boxGeometry args={[3.82, foldH - 0.02, 0.02]} />
                <meshStandardMaterial
                  color="#D6CEBE"
                  roughness={0.85}
                  bumpMap={fabricTex}
                  bumpScale={0.01}
                />
              </mesh>
            ))}
          </group>
          {BottomBar}
        </group>
      );
    }

    case 'honeycomb':
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
                  color={type === 'honeycomb' ? '#EAE3D5' : '#F4F2EE'}
                  roughness={0.28}
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
// 3. CURTAINS / ARCHITECTURAL DRAPERY WITH DYNAMIC CLOTH PHYSICS
// ─────────────────────────────────────────────────────────────────────────────
const CurtainsDrapery = ({ color = '#E8E4E0', openProgress = 0.6 }) => {
  const fabricTex = useMemo(() => createProceduralBump('fabric'), []);
  const leftGroup = useRef();
  const rightGroup = useRef();

  const drapeGeo = useMemo(() => {
    const geo = new THREE.PlaneGeometry(1.65, 3.65, 36, 20);
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

  const drapeMat = useMemo(() => new THREE.MeshStandardMaterial({
    color,
    roughness: 0.82,
    metalness: 0.02,
    bumpMap: fabricTex,
    bumpScale: 0.01,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.96,
  }), [color, fabricTex]);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    // Gentle natural wind billow flutter on curtains
    const billow = Math.sin(time * 1.6) * 0.025;
    const waveHem = Math.cos(time * 1.2) * 0.018;

    // OpenProgress: 0 = closed over window, 1 = stacked open at sides
    const targetScale = THREE.MathUtils.lerp(1.0, 0.28, openProgress);
    const leftTargetX = THREE.MathUtils.lerp(-1.88, -1.88, openProgress);
    const rightTargetX = THREE.MathUtils.lerp(1.88, 1.88, openProgress);

    if (leftGroup.current) {
      leftGroup.current.scale.x = THREE.MathUtils.damp(leftGroup.current.scale.x, targetScale, 7, delta);
      leftGroup.current.position.x = leftTargetX;
      leftGroup.current.position.z = 0.24 + billow;
      leftGroup.current.rotation.y = waveHem * 0.5;
    }
    if (rightGroup.current) {
      rightGroup.current.scale.x = THREE.MathUtils.damp(rightGroup.current.scale.x, -targetScale, 7, delta);
      rightGroup.current.position.x = rightTargetX;
      rightGroup.current.position.z = 0.24 - billow;
      rightGroup.current.rotation.y = -waveHem * 0.5;
    }
  });

  return (
    <group position={[0, 1.82, 0]}>
      {/* Ceiling Track Rod */}
      <mesh position={[0, 0.02, 0.24]} castShadow>
        <boxGeometry args={[4.1, 0.035, 0.04]} />
        <meshStandardMaterial color="#2B2824" metalness={0.9} roughness={0.2} />
      </mesh>

      <group ref={leftGroup}>
        <mesh geometry={drapeGeo} material={drapeMat} castShadow />
      </group>
      <group ref={rightGroup}>
        <mesh geometry={drapeGeo} material={drapeMat} castShadow />
      </group>
    </group>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// 4. ARCHITECTURAL LUXURY DESIGNER SOFA
// Photoreal soft cushioning, tailored armrests, bouclé throw pillows & brass legs
// ─────────────────────────────────────────────────────────────────────────────
const LivingSofa = ({ style = 'modern', color = '#ECE7DE' }) => {
  const fabricTex = useMemo(() => createProceduralBump('fabric'), []);

  const upholsteryMat = useMemo(() => new THREE.MeshStandardMaterial({
    color,
    roughness: 0.76,
    metalness: 0.03,
    bumpMap: fabricTex,
    bumpScale: 0.014,
  }), [color, fabricTex]);

  const pillowMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#BDB3A4',
    roughness: 0.85,
    bumpMap: fabricTex,
    bumpScale: 0.018,
  }), [fabricTex]);

  const brassLegMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#D4AF37',
    metalness: 0.88,
    roughness: 0.22,
  }), []);

  if (style === 'curved') {
    return (
      <group position={[0, 0, -0.5]}>
        {/* Sculptural Organic Curved Sofa */}
        <mesh rotation={[Math.PI / 2, 0, Math.PI / 4.2]} position={[0, 0.32, -0.1]} material={upholsteryMat} castShadow receiveShadow>
          <torusGeometry args={[1.8, 0.36, 24, 64, Math.PI / 1.55]} />
        </mesh>
        <mesh rotation={[0, 0, Math.PI / 4.2]} position={[0, 0.78, -0.28]} material={upholsteryMat} castShadow receiveShadow>
          <torusGeometry args={[1.8, 0.40, 24, 64, Math.PI / 1.55]} />
        </mesh>
        {/* Grounding Contact Shadow */}
        <mesh position={[0, 0.005, -0.1]} rotation-x={-Math.PI / 2}>
          <planeGeometry args={[3.6, 1.4]} />
          <meshBasicMaterial color="#0A0908" transparent opacity={0.3} />
        </mesh>
      </group>
    );
  }

  // Modern Architectural Italian Low-Profile Sofa (Default)
  return (
    <group position={[0, 0, -0.5]}>
      {/* 1. Low-profile Upholstered Base Plinth */}
      <mesh position={[0, 0.18, 0]} material={upholsteryMat} castShadow receiveShadow>
        <boxGeometry args={[3.2, 0.16, 1.05]} />
      </mesh>

      {/* 2. Dual Deep Plush Seat Cushions with Soft Chamfer */}
      <mesh position={[-0.76, 0.36, 0.04]} material={upholsteryMat} castShadow receiveShadow>
        <boxGeometry args={[1.48, 0.24, 0.94]} />
      </mesh>
      <mesh position={[0.76, 0.36, 0.04]} material={upholsteryMat} castShadow receiveShadow>
        <boxGeometry args={[1.48, 0.24, 0.94]} />
      </mesh>

      {/* 3. Ergonomic Angled Backrest Pillows */}
      <mesh position={[-0.76, 0.74, -0.32]} rotation-x={-0.12} material={upholsteryMat} castShadow receiveShadow>
        <boxGeometry args={[1.46, 0.48, 0.22]} />
      </mesh>
      <mesh position={[0.76, 0.74, -0.32]} rotation-x={-0.12} material={upholsteryMat} castShadow receiveShadow>
        <boxGeometry args={[1.46, 0.48, 0.22]} />
      </mesh>

      {/* 4. Sleek Chamfered Armrests */}
      <mesh position={[-1.58, 0.54, 0.02]} material={upholsteryMat} castShadow receiveShadow>
        <boxGeometry args={[0.22, 0.48, 1.02]} />
      </mesh>
      <mesh position={[1.58, 0.54, 0.02]} material={upholsteryMat} castShadow receiveShadow>
        <boxGeometry args={[0.22, 0.48, 1.02]} />
      </mesh>

      {/* 5. Designer Bouclé Throw Pillows in Corners */}
      <mesh position={[-1.34, 0.52, -0.18]} rotation={[0.15, 0.35, 0.2]} material={pillowMat} castShadow>
        <boxGeometry args={[0.36, 0.36, 0.14]} />
      </mesh>
      <mesh position={[1.34, 0.52, -0.18]} rotation={[0.15, -0.35, -0.2]} material={pillowMat} castShadow>
        <boxGeometry args={[0.36, 0.36, 0.14]} />
      </mesh>

      {/* 6. Brushed Champagne Brass Stiletto Legs */}
      {[-1.48, 1.48].map((x) =>
        [-0.42, 0.42].map((z) => (
          <mesh key={`${x}-${z}`} position={[x, 0.06, z]} material={brassLegMat} castShadow>
            <cylinderGeometry args={[0.022, 0.014, 0.14, 16]} />
          </mesh>
        ))
      )}

      {/* Grounding Contact Shadow */}
      <mesh position={[0, 0.005, 0]} rotation-x={-Math.PI / 2}>
        <planeGeometry args={[3.4, 1.2]} />
        <meshBasicMaterial color="#0A0908" transparent opacity={0.35} />
      </mesh>
    </group>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// 5. STYLED COFFEE TABLE & HAND-TUFTED WOOL RUG
// ─────────────────────────────────────────────────────────────────────────────
const CoffeeTableAndRug = ({ floorType, rugColor = '#D8D4CC', rugPattern = 'solid' }) => {
  const floorConfig = FLOOR_CONFIGS[floorType] || FLOOR_CONFIGS.lightoak;
  const woodTex = useMemo(() => createProceduralBump('wood'), []);
  const fabricTex = useMemo(() => createProceduralBump('fabric'), []);

  // Honed Roman Travertine Stone Tabletop
  const travertineMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#DED6C8',
    roughness: 0.65,
    metalness: 0.05,
    bumpMap: woodTex,
    bumpScale: 0.006,
  }), [woodTex]);

  const brassLegMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#D4AF37',
    metalness: 0.90,
    roughness: 0.20,
  }), []);

  // Ceramic Decor Bowl & Hardcover Book Materials
  const ceramicMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#2A2724',
    roughness: 0.92,
  }), []);

  const bookMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#1C1A18',
    roughness: 0.4,
  }), []);

  const rugMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: rugColor === 'none' ? '#000000' : rugColor,
    roughness: 0.94,
    metalness: 0.02,
    bumpMap: fabricTex,
    bumpScale: 0.015,
  }), [rugColor, fabricTex]);

  const hasRug = rugColor && rugColor !== 'none';

  return (
    <group>
      {/* Hand-tufted Plush Wool Rug */}
      {hasRug && (
        <group position={[0, 0.006, 0.2]}>
          <mesh rotation-x={-Math.PI / 2} material={rugMat} receiveShadow>
            <planeGeometry args={[3.8, 2.6]} />
          </mesh>
          {/* Subtle Border Piping */}
          <mesh position={[0, 0.002, 0]} rotation-x={-Math.PI / 2}>
            <planeGeometry args={[3.84, 2.64]} />
            <meshBasicMaterial color="#0A0908" transparent opacity={0.2} />
          </mesh>
          {rugPattern === 'striped' && (
            <group position={[0, 0.001, 0]} rotation-x={-Math.PI / 2}>
              {[-1.2, -0.6, 0, 0.6, 1.2].map((x) => (
                <mesh key={x} position={[x, 0, 0]}>
                  <planeGeometry args={[0.08, 2.5]} />
                  <meshStandardMaterial color="#C9A55A" opacity={0.35} transparent roughness={0.8} />
                </mesh>
              ))}
            </group>
          )}
          {rugPattern === 'geometric' && (
            <group position={[0, 0.001, 0]} rotation-x={-Math.PI / 2}>
              {[-0.9, 0, 0.9].map((x) => (
                <mesh key={x} position={[x, 0, 0]} rotation-z={Math.PI / 4}>
                  <planeGeometry args={[0.5, 0.5]} />
                  <meshStandardMaterial color="#C9A55A" opacity={0.25} transparent roughness={0.8} />
                </mesh>
              ))}
            </group>
          )}
        </group>
      )}

      {/* Designer Fluted Travertine Circular Coffee Table */}
      <group position={[0, 0, 0.5]}>
        {/* Circular Honed Travertine Plinth Top */}
        <mesh position={[0, 0.34, 0]} material={travertineMat} castShadow receiveShadow>
          <cylinderGeometry args={[0.62, 0.62, 0.05, 36]} />
        </mesh>

        {/* Fluted Cylindrical Base */}
        <mesh position={[0, 0.16, 0]} material={travertineMat} castShadow receiveShadow>
          <cylinderGeometry args={[0.34, 0.38, 0.32, 28]} />
        </mesh>

        {/* Minimalist Ceramic Vessel on Table */}
        <mesh position={[0.18, 0.42, 0.08]} material={ceramicMat} castShadow>
          <cylinderGeometry args={[0.06, 0.09, 0.12, 20]} />
        </mesh>

        {/* Architectural Hardcover Book on Table */}
        <mesh position={[-0.14, 0.38, -0.06]} rotation-y={0.3} material={bookMat} castShadow>
          <boxGeometry args={[0.26, 0.025, 0.34]} />
        </mesh>

        {/* Grounding Contact Shadow */}
        <mesh position={[0, 0.008, 0]} rotation-x={-Math.PI / 2}>
          <circleGeometry args={[0.68, 28]} />
          <meshBasicMaterial color="#0A0908" transparent opacity={0.3} />
        </mesh>
      </group>
    </group>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// 6. LIVING BOTANICAL OLIVE TREE WITH NATURAL BREEZE SWAY PHYSICS
// ─────────────────────────────────────────────────────────────────────────────
const LivingPottedPlant = ({ active = true }) => {
  const foliageRef = useRef();

  useFrame((state) => {
    if (!foliageRef.current) return;
    const time = state.clock.getElapsedTime();
    // Natural organic harmonic sway from window airflow
    foliageRef.current.rotation.z = Math.sin(time * 1.5) * 0.035 + Math.sin(time * 0.8) * 0.015;
    foliageRef.current.rotation.x = Math.cos(time * 1.2) * 0.025;
  });

  const potMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#D4C8B8',
    roughness: 0.82,
  }), []);

  const soilMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#2A1F18',
    roughness: 0.95,
  }), []);

  const woodTrunkMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#4B3E2F',
    roughness: 0.88,
  }), []);

  const leafMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#556846',
    roughness: 0.65,
    side: THREE.DoubleSide,
  }), []);

  if (!active) return null;

  return (
    <group position={[-3.1, 0, -2.4]}>
      {/* Architectural Ribbed Planter Pot */}
      <mesh position={[0, 0.32, 0]} material={potMat} castShadow receiveShadow>
        <cylinderGeometry args={[0.28, 0.22, 0.64, 24]} />
      </mesh>
      {/* Dark Potting Soil */}
      <mesh position={[0, 0.63, 0]} material={soilMat} receiveShadow>
        <cylinderGeometry args={[0.27, 0.27, 0.02, 20]} />
      </mesh>

      {/* Living Olive Tree Trunk & Foliage with Wind Sway Physics */}
      <group ref={foliageRef} position={[0, 0.64, 0]}>
        {/* Main Gnarled Trunk */}
        <mesh position={[0, 0.55, 0]} material={woodTrunkMat} castShadow>
          <cylinderGeometry args={[0.022, 0.038, 1.1, 10]} />
        </mesh>

        {/* 5 Organic Botanical Branch Sprays with Leaf Fans */}
        {[
          { y: 0.9, rotY: 0.3, rotZ: 0.45, len: 0.72 },
          { y: 1.05, rotY: 1.8, rotZ: -0.5, len: 0.82 },
          { y: 1.2, rotY: 3.2, rotZ: 0.38, len: 0.78 },
          { y: 1.35, rotY: 4.6, rotZ: -0.42, len: 0.68 },
          { y: 1.5, rotY: 0.0, rotZ: 0.15, len: 0.65 },
        ].map((b, i) => (
          <group key={i} position={[0, b.y, 0]} rotation={[0, b.rotY, b.rotZ]}>
            {/* Branch Stem */}
            <mesh position={[0, b.len / 2, 0]} material={woodTrunkMat} castShadow>
              <cylinderGeometry args={[0.008, 0.016, b.len, 8]} />
            </mesh>
            {/* Leaf Cluster Fans */}
            {[-0.2, 0.0, 0.2, 0.35].map((yOff, j) => (
              <group key={j} position={[0, b.len / 2 + yOff, 0]}>
                <mesh position={[0.06, 0, 0]} rotation={[0.4, 0.3, 0.5]} material={leafMat} castShadow>
                  <circleGeometry args={[0.075, 8]} />
                </mesh>
                <mesh position={[-0.06, 0, 0]} rotation={[-0.4, -0.3, -0.5]} material={leafMat} castShadow>
                  <circleGeometry args={[0.075, 8]} />
                </mesh>
              </group>
            ))}
          </group>
        ))}
      </group>

      {/* Grounding Contact Shadow */}
      <mesh position={[0, 0.005, 0]} rotation-x={-Math.PI / 2}>
        <circleGeometry args={[0.38, 20]} />
        <meshBasicMaterial color="#0A0908" transparent opacity={0.3} />
      </mesh>
    </group>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// 7. ARCHITECTURAL LIGHTING FIXTURES (ELEGANT & UNOBSTRUCTIVE)
// ─────────────────────────────────────────────────────────────────────────────
const CeilingPendant = ({ active = false, mood }) => {
  if (!active) return null;
  // Positioned high at y=3.9 so it NEVER obstructs the window sightline
  return (
    <group position={[0, 4.4, 0.4]}>
      <mesh position={[0, -0.25, 0]}>
        <cylinderGeometry args={[0.004, 0.004, 0.5, 8]} />
        <meshStandardMaterial color="#C9A55A" metalness={0.9} roughness={0.15} />
      </mesh>
      {/* Minimalist Brushed Champagne Brass Halo Ring */}
      <mesh position={[0, -0.55, 0]} rotation-x={Math.PI / 2} castShadow>
        <torusGeometry args={[0.38, 0.02, 16, 48]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.92} roughness={0.18} />
      </mesh>
      {/* Frosted Warm Diffuser Globe */}
      <mesh position={[0, -0.55, 0]}>
        <sphereGeometry args={[0.09, 20, 20]} />
        <meshStandardMaterial color="#FFF5E6" emissive="#FFE8C0" emissiveIntensity={0.8} />
      </mesh>
      <pointLight position={[0, -0.6, 0]} intensity={mood.pendantI} color={mood.pendantC} distance={6} decay={2} castShadow />
    </group>
  );
};

const FloorLamp = ({ active = false, mood }) => {
  if (!active) return null;
  return (
    <group position={[3.2, 0, -2.2]}>
      {/* Carrara Marble Weighted Base */}
      <mesh position={[0, 0.025, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.22, 0.22, 0.05, 24]} />
        <meshStandardMaterial color="#EAE6DF" roughness={0.3} />
      </mesh>
      {/* Slender Architectural Brass Arc Stem */}
      <mesh position={[0, 1.25, 0]} castShadow>
        <cylinderGeometry args={[0.012, 0.012, 2.5, 12]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.2} />
      </mesh>
      {/* Overhanging Frosted Opal Glass Globe Shade */}
      <mesh position={[-0.32, 2.38, 0]} castShadow>
        <sphereGeometry args={[0.16, 24, 24]} />
        <meshStandardMaterial color="#FFF8F0" emissive="#FFECC8" emissiveIntensity={0.65} roughness={0.2} />
      </mesh>
      <pointLight position={[-0.32, 2.32, 0]} intensity={mood.lampI} color={mood.lampC} distance={5.5} decay={2} castShadow />
    </group>
  );
};

const RotatingCeilingFan = ({ active = false }) => {
  const bladesRef = useRef();
  useFrame((_, delta) => {
    if (active && bladesRef.current) {
      bladesRef.current.rotation.y += delta * 3.5;
    }
  });

  const housingMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#22201D', roughness: 0.3, metalness: 0.85 }), []);
  const bladeMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#5A422D', roughness: 0.45 }), []);

  if (!active) return null;

  return (
    <group position={[0, 4.65, -0.6]}>
      <mesh position={[0, -0.08, 0]} material={housingMat} castShadow>
        <cylinderGeometry args={[0.12, 0.12, 0.16, 16]} />
      </mesh>
      <group ref={bladesRef} position={[0, -0.18, 0]}>
        {[0, 1, 2].map((i) => (
          <mesh key={i} rotation={[0, (i * Math.PI * 2) / 3, 0]} position={[0.55, 0, 0]} material={bladeMat} castShadow>
            <boxGeometry args={[1.05, 0.015, 0.16]} />
          </mesh>
        ))}
      </group>
    </group>
  );
};

const BookshelfDecor = ({ active = true }) => {
  if (!active) return null;
  return (
    <group position={[3.85, 1.4, -2.8]} rotation-y={-Math.PI / 2}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1.2, 0.04, 0.28]} />
        <meshStandardMaterial color="#3A2C1C" roughness={0.4} />
      </mesh>
      <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.2, 0.04, 0.28]} />
        <meshStandardMaterial color="#3A2C1C" roughness={0.4} />
      </mesh>
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
// 8. MASTER ROOM STAGE ASSEMBLY
// ─────────────────────────────────────────────────────────────────────────────
const MasterRoom = ({ roomState }) => {
  const mood = LIGHT_MOODS[roomState.lightMode] || LIGHT_MOODS.bright;
  const floorConfig = FLOOR_CONFIGS[roomState.floorType] || FLOOR_CONFIGS.lightoak;
  const floorBump = useMemo(() => createProceduralBump(floorConfig.bumpType), [floorConfig.bumpType]);
  const wallBump = useMemo(() => createProceduralBump('noise'), []);

  const floorMat = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: floorConfig.color,
    roughness: floorConfig.roughness,
    clearcoat: floorConfig.clearcoat,
    clearcoatRoughness: 0.18,
    metalness: 0.02,
    bumpMap: floorBump,
    bumpScale: floorConfig.bumpScale,
  }), [floorConfig, floorBump]);

  const wallMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: roomState.wallColor,
    roughness: 0.90,
    metalness: 0.01,
    bumpMap: wallBump,
    bumpScale: 0.008,
  }), [roomState.wallColor, wallBump]);

  const ceilingMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#FAF8F5',
    roughness: 0.95,
  }), []);

  // Soft Radial Sunlight Pool on Floor streaming through the hero window
  const lightPoolMat = useMemo(() => new THREE.MeshBasicMaterial({
    color: '#FFF2DF',
    transparent: true,
    opacity: 0.26,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  }), []);

  return (
    <group>
      {/* Floor */}
      <mesh rotation-x={-Math.PI / 2} position={[0, 0, 0]} material={floorMat} receiveShadow>
        <planeGeometry args={[10, 10]} />
      </mesh>

      {/* Natural Sunbeam Light Pool on Floor */}
      <mesh position={[0.4, 0.008, -1.6]} rotation-x={-Math.PI / 2} rotation-z={0.14} material={lightPoolMat}>
        <planeGeometry args={[4.2, 4.6]} />
      </mesh>

      {/* Ceiling */}
      <mesh rotation-x={Math.PI / 2} position={[0, 4.8, 0]} material={ceilingMat}>
        <planeGeometry args={[10, 10]} />
      </mesh>

      {/* Back Wall with Window Opening */}
      <group position={[0, 0, -4.0]}>
        <mesh position={[-3.1, 2.4, 0]} material={wallMat} receiveShadow>
          <boxGeometry args={[2.2, 4.8, 0.2]} />
        </mesh>
        <mesh position={[3.1, 2.4, 0]} material={wallMat} receiveShadow>
          <boxGeometry args={[2.2, 4.8, 0.2]} />
        </mesh>
        <mesh position={[0, 4.45, 0]} material={wallMat} receiveShadow>
          <boxGeometry args={[4.0, 0.7, 0.2]} />
        </mesh>
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

      {/* Hero Window with Independent Blinds & Curtains */}
      <HeroWindow
        blindType={roomState.blindType}
        curtainColor={roomState.curtainColor}
        curtainOpen={roomState.curtainOpen ?? 0.6}
        blindOpen={roomState.blindOpen ?? 0.2}
      />

      {/* Architectural Living Room Furniture */}
      <LivingSofa style={roomState.sofaStyle} color={roomState.sofaColor} />
      <CoffeeTableAndRug floorType={roomState.floorType} rugColor={roomState.rugColor} rugPattern={roomState.rugPattern} />

      {/* Living Botanical Olive Tree with Breeze Physics */}
      <LivingPottedPlant active={roomState.plantOn} />
      <RoomSunbeamMotes />

      {/* High-Set Lighting & Fixtures (Never Blocks Window!) */}
      <CeilingPendant active={roomState.ceilingLightOn} mood={mood} />
      <FloorLamp active={roomState.floorLampOn} mood={mood} />
      <RotatingCeilingFan active={roomState.fanOn} />
      <BookshelfDecor active={roomState.decorOn} />

      {/* Fast, Zero-Latency Physical Lighting Rig */}
      <hemisphereLight
        color={mood.hemiSky}
        groundColor={mood.hemiGround}
        intensity={mood.ambI * 0.9}
      />
      <ambientLight intensity={mood.ambI * 0.55} color="#FFFBF5" />

      {/* Directional sunlight streaming into the room through the hero window */}
      <directionalLight
        position={[2.4, 4.6, -4.8]}
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
// 9. TOP-LEVEL ROOM CANVAS
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
          opacity={0.42}
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
