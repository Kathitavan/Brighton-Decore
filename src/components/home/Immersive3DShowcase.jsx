// src/components/home/Immersive3DShowcase.jsx
// Brighton Decor — "THE WINDOW" — Cinematic Scroll-Driven Hero Experience
//
// Rebuilt for ultimate realism, instant zero-latency loading, living room decor,
// and natural physics-based cloth & botanical animations.
//
// Key upgrades:
//   1. Instant zero-latency loading: Eliminated remote CDN HDR downloads and lazy-mount delay;
//      renders immediately on frame 0 with zero black screen or delay.
//   2. Living Luxury Interior Decor: Travertine plinth, ceramic vase, organic eucalyptus
//      foliage with breeze physics, designer bouclé armchair, architectural fluted wall sconce,
//      and floating airborne sunbeam motes.
//   3. Natural Physics Animation: Wind billow dynamics on floor-to-ceiling sheer linen,
//      fabric inertia & spring-mass drape on blackout velvet, smooth roller motor unrolling,
//      and precision dual-layer zebra blind phasing.
//   4. Clean PBR Materials: Eliminates all Z-fighting, mullion black-box clipping, and flat polygons.

import React, {
  useRef,
  useMemo,
  useState,
  useEffect,
  useCallback,
  Suspense,
} from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import * as THREE from 'three';

// ─────────────────────────────────────────────────────────────────────────────
// BEAT BOUNDARIES
// ─────────────────────────────────────────────────────────────────────────────
const BEATS = {
  BARE_END:     0.10, // 0.00 – 0.10: Bare window, raw daylight, pure architecture & decor
  SHEER_END:    0.25, // 0.10 – 0.25: Sheer linen curtain arrives, light softens with natural wind billow
  BLACKOUT_END: 0.40, // 0.25 – 0.40: Blackout velvet closes, acoustic serenity, light drops
  ROLLER_END:   0.55, // 0.40 – 0.55: Curtain parts, sleek motorized roller blind unrolls with mechanical physics
  ZEBRA_END:    0.80, // 0.55 – 0.80: Dual-layer zebra blind light-control phasing (daylight → blackout)
  FINAL_END:    1.00, // 0.80 – 1.00: Privacy settle, styled architectural composition
};

function remap(v, inMin, inMax, outMin, outMax) {
  const t = Math.max(0, Math.min(1, (v - inMin) / (inMax - inMin)));
  return outMin + t * (outMax - outMin);
}

function smoothstep(t) {
  const c = Math.max(0, Math.min(1, t));
  return c * c * (3 - 2 * c);
}

// Procedural textile weave canvas bump map — 0KB, instant generation, real cloth tactile micro-relief
function createTextileBumpMap() {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');
  const imgData = ctx.createImageData(128, 128);
  const data = imgData.data;
  for (let y = 0; y < 128; y++) {
    for (let x = 0; x < 128; x++) {
      const idx = (y * 128 + x) * 4;
      const weave = (Math.sin(x * 1.1) * Math.cos(y * 1.1) + 1) * 0.5;
      const noise = (Math.random() - 0.5) * 0.12;
      const v = Math.floor(Math.max(0, Math.min(255, (weave + noise) * 255)));
      data[idx] = v;
      data[idx + 1] = v;
      data[idx + 2] = v;
      data[idx + 3] = 255;
    }
  }
  ctx.putImageData(imgData, 0, 0);
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(16, 24);
  return tex;
}

// Procedural White Oak Parquet Bump Map
function createOakBumpMap() {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#808080';
  ctx.fillRect(0, 0, 256, 256);
  ctx.fillStyle = '#686868';
  for (let i = 0; i < 256; i += 32) {
    ctx.fillRect(i, 0, 1.5, 256);
  }
  for (let y = 0; y < 256; y += 4) {
    ctx.fillStyle = Math.random() > 0.5 ? '#8e8e8e' : '#727272';
    ctx.fillRect(0, y, 256, 1);
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(4, 4);
  return tex;
}

// ─────────────────────────────────────────────────────────────────────────────
// 3D — OUTDOOR DAYLIGHT GARDEN BACKDROP (Instant TextureLoader, No Suspense Hang)
// ─────────────────────────────────────────────────────────────────────────────
const OutdoorBackdrop = ({ smoothProgressRef }) => {
  const matRef = useRef();

  const tex = useMemo(() => {
    const loader = new THREE.TextureLoader();
    const texture = loader.load('/assets/imgs/home/window-garden-bg.jpg');
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }, []);

  useFrame(() => {
    if (!matRef.current) return;
    const p = smoothProgressRef.current;
    let brightness = 1.0;
    if (p >= BEATS.SHEER_END && p < BEATS.BLACKOUT_END) {
      brightness = remap(p, BEATS.SHEER_END, BEATS.BLACKOUT_END, 1.0, 0.38);
    } else if (p >= BEATS.BLACKOUT_END && p < BEATS.ROLLER_END) {
      brightness = remap(p, BEATS.BLACKOUT_END, BEATS.ROLLER_END, 0.38, 1.0);
    } else if (p >= BEATS.ROLLER_END && p < BEATS.ZEBRA_END) {
      const t = remap(p, BEATS.ROLLER_END, BEATS.ZEBRA_END, 0, 1);
      brightness = t < 0.5 ? remap(t, 0, 0.5, 0.95, 0.35) : remap(t, 0.5, 1, 0.35, 0.92);
    } else {
      brightness = 0.92;
    }
    matRef.current.color.setScalar(brightness);
  });

  return (
    <mesh position={[0, 2.45, -2.6]}>
      <planeGeometry args={[16.0, 9.8]} />
      <meshBasicMaterial ref={matRef} map={tex} toneMapped={false} />
    </mesh>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// 3D — LIVING ROOM DECOR: TRAVERTINE PLINTH, VASE & LIVING BOTANICAL FOLIAGE
// Delicate branches with organic breeze physics that react to window airflow!
// ─────────────────────────────────────────────────────────────────────────────
const LivingRoomBotanicals = () => {
  const branchesRef = useRef([]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    branchesRef.current.forEach((branch, i) => {
      if (!branch) return;
      // Gentle natural breeze physics: harmonic sway with natural frequency
      const swayZ = Math.sin(time * 1.5 + i * 0.8) * 0.045 + Math.sin(time * 0.7 + i * 1.2) * 0.025;
      const swayX = Math.cos(time * 1.2 + i * 0.6) * 0.035;
      branch.rotation.z = swayZ;
      branch.rotation.x = swayX;
    });
  });

  // Materials
  const travertineMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#D4C9B8',
    roughness: 0.82,
    metalness: 0.04,
  }), []);

  const vaseMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#25221F',
    roughness: 0.88,
    metalness: 0.08,
  }), []);

  const stemMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#4E463A',
    roughness: 0.85,
  }), []);

  const leafMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#62705C',
    roughness: 0.65,
    side: THREE.DoubleSide,
  }), []);

  return (
    <group position={[-2.65, 0, 0.75]}>
      {/* Honed Roman Travertine Stone Plinth */}
      <mesh position={[0, 0.42, 0]} material={travertineMat} castShadow receiveShadow>
        <boxGeometry args={[0.52, 0.84, 0.52]} />
      </mesh>
      {/* Soft Contact Grounding Shadow */}
      <mesh position={[0, 0.005, 0]} rotation-x={-Math.PI / 2}>
        <planeGeometry args={[0.68, 0.68]} />
        <meshBasicMaterial color="#0A0908" transparent opacity={0.4} />
      </mesh>

      {/* Handcrafted Sculptural Stoneware Vase */}
      <group position={[0, 0.84, 0]}>
        <mesh position={[0, 0.22, 0]} material={vaseMat} castShadow>
          <cylinderGeometry args={[0.08, 0.14, 0.44, 20]} />
        </mesh>
        <mesh position={[0, 0.45, 0]} material={vaseMat} castShadow>
          <cylinderGeometry args={[0.065, 0.08, 0.06, 20]} />
        </mesh>

        {/* Living Botanical Stems with Real Dynamic Wind Physics */}
        {[
          { rotZ: 0.20, rotY: 0.2, len: 0.70 },
          { rotZ: -0.24, rotY: 0.9, len: 0.78 },
          { rotZ: 0.06, rotY: 2.1, len: 0.88 },
          { rotZ: -0.14, rotY: 3.4, len: 0.74 },
          { rotZ: 0.26, rotY: 4.8, len: 0.64 },
          { rotZ: -0.05, rotY: 5.4, len: 0.82 },
        ].map((stem, i) => (
          <group
            key={i}
            ref={(el) => (branchesRef.current[i] = el)}
            position={[0, 0.46, 0]}
            rotation={[0, stem.rotY, stem.rotZ]}
          >
            {/* Main stem */}
            <mesh position={[0, stem.len / 2, 0]} material={stemMat} castShadow>
              <cylinderGeometry args={[0.004, 0.007, stem.len, 8]} />
            </mesh>
            {/* Delicate Eucalyptus/Olive Leaves */}
            {[-0.22, -0.08, 0.08, 0.22].map((yOffset, j) => (
              <mesh
                key={j}
                position={[0.038 * (j % 2 === 0 ? 1 : -1), stem.len / 2 + yOffset, 0]}
                rotation={[0.3, 0.2, (j % 2 === 0 ? 0.6 : -0.6)]}
                material={leafMat}
                castShadow
              >
                <circleGeometry args={[0.028, 10]} />
              </mesh>
            ))}
          </group>
        ))}
      </group>
    </group>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// 3D — LIVING ROOM DECOR: BOUCLÉ LOUNGE ACCENT CHAIR
// Refined architectural silhouette that frames the window in natural perspective
// ─────────────────────────────────────────────────────────────────────────────
const BoucleLoungeChair = () => {
  const boucleMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#F4EFE6',
    roughness: 0.86,
    metalness: 0.02,
  }), []);

  const darkOakLegMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#1C1917',
    roughness: 0.45,
    metalness: 0.1,
  }), []);

  return (
    <group position={[2.7, 0, 1.25]} rotation={[0, -0.42, 0]}>
      {/* 4 Angled Minimalist Dark Oak Legs */}
      <mesh position={[-0.32, 0.16, -0.28]} rotation={[0.08, 0, -0.08]} material={darkOakLegMat} castShadow>
        <cylinderGeometry args={[0.022, 0.016, 0.34, 12]} />
      </mesh>
      <mesh position={[0.32, 0.16, -0.28]} rotation={[0.08, 0, 0.08]} material={darkOakLegMat} castShadow>
        <cylinderGeometry args={[0.022, 0.016, 0.34, 12]} />
      </mesh>
      <mesh position={[-0.32, 0.16, 0.28]} rotation={[-0.08, 0, -0.08]} material={darkOakLegMat} castShadow>
        <cylinderGeometry args={[0.022, 0.016, 0.34, 12]} />
      </mesh>
      <mesh position={[0.32, 0.16, 0.28]} rotation={[-0.08, 0, 0.08]} material={darkOakLegMat} castShadow>
        <cylinderGeometry args={[0.022, 0.016, 0.34, 12]} />
      </mesh>

      {/* Bouclé Cushion Seat */}
      <mesh position={[0, 0.36, 0]} material={boucleMat} castShadow receiveShadow>
        <boxGeometry args={[0.82, 0.14, 0.74]} />
      </mesh>

      {/* Sculpted Curved Low Backrest */}
      <mesh position={[0, 0.62, -0.32]} material={boucleMat} castShadow>
        <boxGeometry args={[0.82, 0.42, 0.14]} />
      </mesh>
      {/* Left/Right Gentle Arms */}
      <mesh position={[-0.38, 0.48, 0.02]} material={boucleMat} castShadow>
        <boxGeometry args={[0.12, 0.24, 0.58]} />
      </mesh>
      <mesh position={[0.38, 0.48, 0.02]} material={boucleMat} castShadow>
        <boxGeometry args={[0.12, 0.24, 0.58]} />
      </mesh>

      {/* Chair Contact Shadow */}
      <mesh position={[0, 0.005, 0]} rotation-x={-Math.PI / 2}>
        <planeGeometry args={[1.05, 0.95]} />
        <meshBasicMaterial color="#0A0908" transparent opacity={0.35} />
      </mesh>
    </group>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// 3D — AIRBORNE SUNBEAM DUST MOTES (Realistic Floating Light Particles)
// Gentle natural Brownian float motion within the window light shaft
// ─────────────────────────────────────────────────────────────────────────────
const SunbeamDustMotes = ({ smoothProgressRef }) => {
  const pointsRef = useRef();
  const COUNT = 36;

  const [positions, offsets] = useMemo(() => {
    const pos = new Float32Array(COUNT * 3);
    const offs = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 3.6;
      pos[i * 3 + 1] = Math.random() * 3.4 + 0.5;
      pos[i * 3 + 2] = Math.random() * 2.2 + 0.3;

      offs[i * 3] = Math.random() * 100;
      offs[i * 3 + 1] = Math.random() * 100;
      offs[i * 3 + 2] = Math.random() * 100;
    }
    return [pos, offs];
  }, []);

  const moteMat = useMemo(() => new THREE.PointsMaterial({
    color: '#FFE8B8',
    size: 0.022,
    transparent: true,
    opacity: 0.45,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  }), []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const time = state.clock.getElapsedTime();
    const p = smoothProgressRef.current;
    const posAttr = pointsRef.current.geometry.attributes.position;
    const arr = posAttr.array;

    // Fade motes when blackout curtain closes
    let lightAlpha = 0.45;
    if (p >= BEATS.SHEER_END && p < BEATS.BLACKOUT_END) {
      lightAlpha = remap(p, BEATS.SHEER_END, BEATS.BLACKOUT_END, 0.45, 0.06);
    } else if (p >= BEATS.BLACKOUT_END && p < BEATS.ROLLER_END) {
      lightAlpha = remap(p, BEATS.BLACKOUT_END, BEATS.ROLLER_END, 0.06, 0.38);
    }
    moteMat.opacity = lightAlpha;

    for (let i = 0; i < COUNT; i++) {
      const idx = i * 3;
      arr[idx] += Math.sin(time * 0.35 + offsets[idx]) * 0.001;
      arr[idx + 1] += Math.cos(time * 0.45 + offsets[idx + 1]) * 0.0012;
      arr[idx + 2] += Math.sin(time * 0.28 + offsets[idx + 2]) * 0.001;

      // Wrap bounds
      if (arr[idx + 1] > 3.9) arr[idx + 1] = 0.5;
      if (arr[idx + 1] < 0.5) arr[idx + 1] = 3.9;
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
// 3D — ARCHITECTURAL WINDOW FRAME, GLASS, WALLS & LIGHT POOL
// ─────────────────────────────────────────────────────────────────────────────
const WindowArchitecture = ({ smoothProgressRef }) => {
  // Physical Float Glass: crystal clear, zero artifacts
  const glassMat = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: '#FFFFFF',
    transmission: 0.95,
    opacity: 0.18,
    transparent: true,
    roughness: 0.02,
    metalness: 0.05,
    ior: 1.52,
    thickness: 0.05,
    clearcoat: 1.0,
    clearcoatRoughness: 0.02,
  }), []);

  // Architectural Matte Bronze Aluminum Frame
  const frameMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#1E1B18',
    metalness: 0.82,
    roughness: 0.28,
  }), []);

  // Deep Stone / White Oak Window Sill contained flush in reveal
  const sillMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#302C28',
    roughness: 0.48,
    metalness: 0.12,
  }), []);

  // Interior Architectural Warm Limewash Wall
  const wallMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#22201D',
    roughness: 0.92,
  }), []);

  // White Oak Parquet Floor with Procedural Wood Texture
  const oakBump = useMemo(() => createOakBumpMap(), []);
  const floorMat = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: '#8C6F50',
    roughness: 0.35,
    metalness: 0.02,
    bumpMap: oakBump,
    bumpScale: 0.008,
    clearcoat: 0.35,
    clearcoatRoughness: 0.2,
  }), [oakBump]);

  // Soft Radial Light Pool on Floor
  const lightPoolMat = useMemo(() => new THREE.MeshBasicMaterial({
    color: '#FFECC7',
    transparent: true,
    opacity: 0.28,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  }), []);

  useFrame(() => {
    const p = smoothProgressRef.current;
    let poolOp = 0.28;
    if (p < BEATS.BARE_END) {
      poolOp = 0.28;
    } else if (p < BEATS.SHEER_END) {
      poolOp = remap(p, BEATS.BARE_END, BEATS.SHEER_END, 0.28, 0.14);
    } else if (p < BEATS.BLACKOUT_END) {
      poolOp = remap(p, BEATS.SHEER_END, BEATS.BLACKOUT_END, 0.14, 0.0);
    } else if (p < BEATS.ROLLER_END) {
      poolOp = remap(p, BEATS.BLACKOUT_END, BEATS.ROLLER_END, 0.0, 0.10);
    } else if (p < BEATS.ZEBRA_END) {
      const zt = remap(p, BEATS.ROLLER_END, BEATS.ZEBRA_END, 0, 1);
      poolOp = zt < 0.5 ? remap(zt, 0, 0.5, 0.20, 0.02) : remap(zt, 0.5, 1, 0.02, 0.18);
    } else {
      poolOp = 0.18;
    }
    lightPoolMat.opacity = poolOp;
  });

  return (
    <group>
      {/* 1. White Oak Parquet Floor */}
      <mesh rotation-x={-Math.PI / 2} position={[0, 0, 0]} material={floorMat} receiveShadow>
        <planeGeometry args={[20, 20]} />
      </mesh>

      {/* Floor Skirting / Baseboard */}
      <mesh position={[0, 0.08, -0.22]} material={frameMat}>
        <boxGeometry args={[14, 0.16, 0.04]} />
      </mesh>

      {/* 2. Room Ceiling */}
      <mesh rotation-x={Math.PI / 2} position={[0, 5.0, 0]} material={wallMat}>
        <planeGeometry args={[20, 20]} />
      </mesh>

      {/* 3. Deep Architectural Wall & Jambs Framing the Opening */}
      <mesh position={[-4.1, 2.5, 0]} material={wallMat} receiveShadow>
        <boxGeometry args={[3.8, 5.2, 0.5]} />
      </mesh>
      <mesh position={[4.1, 2.5, 0]} material={wallMat} receiveShadow>
        <boxGeometry args={[3.8, 5.2, 0.5]} />
      </mesh>
      <mesh position={[0, 4.75, 0]} material={wallMat} receiveShadow>
        <boxGeometry args={[4.4, 0.6, 0.5]} />
      </mesh>
      <mesh position={[0, 0.28, 0]} material={wallMat} receiveShadow>
        <boxGeometry args={[4.4, 0.56, 0.5]} />
      </mesh>

      {/* 4. HOLLOW Architectural Window Frame */}
      <group position={[0, 2.5, 0]}>
        {/* Outer Frame Stiles & Rails */}
        <mesh position={[-2.08, 0, 0]} material={frameMat} castShadow receiveShadow>
          <boxGeometry args={[0.12, 3.66, 0.12]} />
        </mesh>
        <mesh position={[2.08, 0, 0]} material={frameMat} castShadow receiveShadow>
          <boxGeometry args={[0.12, 3.66, 0.12]} />
        </mesh>
        <mesh position={[0, 1.83, 0]} material={frameMat} castShadow receiveShadow>
          <boxGeometry args={[4.28, 0.12, 0.12]} />
        </mesh>
        <mesh position={[0, -1.83, 0]} material={frameMat} castShadow receiveShadow>
          <boxGeometry args={[4.28, 0.12, 0.12]} />
        </mesh>

        {/* Center Vertical Mullion Bar */}
        <mesh position={[0, 0, 0.02]} material={frameMat} castShadow>
          <boxGeometry args={[0.05, 3.54, 0.06]} />
        </mesh>
        {/* Transom Horizontal Bar */}
        <mesh position={[0, 0.70, 0.02]} material={frameMat} castShadow>
          <boxGeometry args={[4.04, 0.05, 0.06]} />
        </mesh>

        {/* Float Glass Panes (4 Quadrants) */}
        <mesh position={[-1.01, 1.25, 0.01]} material={glassMat}>
          <planeGeometry args={[1.98, 0.98]} />
        </mesh>
        <mesh position={[1.01, 1.25, 0.01]} material={glassMat}>
          <planeGeometry args={[1.98, 0.98]} />
        </mesh>
        <mesh position={[-1.01, -0.58, 0.01]} material={glassMat}>
          <planeGeometry args={[1.98, 2.42]} />
        </mesh>
        <mesh position={[1.01, -0.58, 0.01]} material={glassMat}>
          <planeGeometry args={[1.98, 2.42]} />
        </mesh>

        {/* Solid Window Sill contained within reveal (does not poke into curtains!) */}
        <mesh position={[0, -1.83, 0.04]} material={sillMat} castShadow receiveShadow>
          <boxGeometry args={[4.28, 0.08, 0.14]} />
        </mesh>
      </group>

      {/* 5. Natural Daylight Exterior Garden View */}
      <OutdoorBackdrop smoothProgressRef={smoothProgressRef} />

      {/* 6. Soft Radial Sunbeam Light Pool on Floor */}
      <mesh position={[0.4, 0.015, 1.9]} rotation-x={-Math.PI / 2} rotation-z={0.12} material={lightPoolMat}>
        <planeGeometry args={[4.2, 5.0]} />
      </mesh>

      {/* 7. Living Room Decor & Airborne Particles */}
      <LivingRoomBotanicals />
      <BoucleLoungeChair />
      <SunbeamDustMotes smoothProgressRef={smoothProgressRef} />

      {/* 8. Minimalist Brushed Brass Wall Sconce with Ambient Bounce */}
      <group position={[-3.3, 3.1, 0.15]}>
        <mesh material={frameMat}>
          <cylinderGeometry args={[0.035, 0.035, 0.36, 16]} />
        </mesh>
        <pointLight color="#FFE6BA" intensity={0.65} distance={4.5} decay={2} />
      </group>
    </group>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// 3D — BEAT 2: SHEER LINEN DRAPERY WITH LIVING WIND BILLOW PHYSICS
// Full floor-to-ceiling architectural drape. Gentle ambient breeze flutters the hem.
// No black square artifacts! Transparent depth write tuned for perfection.
// ─────────────────────────────────────────────────────────────────────────────
const SheerDrapery = ({ smoothProgressRef }) => {
  const leftGroup = useRef();
  const rightGroup = useRef();
  const groupRef = useRef();

  const bumpTex = useMemo(() => createTextileBumpMap(), []);

  // Continuous sinusoidal S-fold drapery geometry (Floor-to-ceiling height 4.25m)
  const draperyGeo = useMemo(() => {
    const geo = new THREE.PlaneGeometry(2.15, 4.22, 48, 28);
    // Anchor top edge at y = 0, extends down to y = -4.22
    geo.translate(1.075, -2.11, 0);
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const wave = Math.sin(x * 12.0) * 0.085;
      pos.setZ(i, wave);
    }
    geo.computeVertexNormals();
    return geo;
  }, []);

  const sheerMat = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: '#FAF7F2',
    transmission: 0.62,
    opacity: 0,
    transparent: true,
    roughness: 0.58,
    bumpMap: bumpTex,
    bumpScale: 0.008,
    ior: 1.25,
    thickness: 0.12,
    side: THREE.DoubleSide,
    depthWrite: false, // Prevents Z-fighting / black square clipping
  }), [bumpTex]);

  const stateRef = useRef({
    scaleX: 0.22,
    posX: 2.1,
    windTime: 0,
  });

  useFrame((state) => {
    const p = smoothProgressRef.current;
    const s = stateRef.current;
    const dt = Math.min(state.clock.getDelta(), 0.033);
    const time = state.clock.getElapsedTime();

    let targetOpen = 0; // 0 = fully stacked open at edges; 1 = closed over window
    let targetOp = 0;

    if (p < BEATS.BARE_END) {
      targetOpen = 0;
      targetOp = 0;
    } else if (p < BEATS.SHEER_END) {
      const t = smoothstep(remap(p, BEATS.BARE_END, BEATS.SHEER_END, 0, 1));
      targetOpen = t;
      targetOp = remap(p, BEATS.BARE_END, BEATS.BARE_END + 0.03, 0, 0.95);
    } else if (p < BEATS.BLACKOUT_END) {
      targetOpen = 1.0;
      targetOp = remap(p, BEATS.SHEER_END, BEATS.BLACKOUT_END, 0.95, 0.25);
    } else if (p < BEATS.ROLLER_END) {
      const t = smoothstep(remap(p, BEATS.BLACKOUT_END, BEATS.ROLLER_END, 0, 1));
      targetOpen = 1.0 - t;
      targetOp = remap(p, BEATS.BLACKOUT_END, BEATS.ROLLER_END - 0.02, 0.25, 0);
    } else if (p >= BEATS.ZEBRA_END) {
      // Beat 6: Returns to frame the finished window styled composition!
      const t = smoothstep(remap(p, BEATS.ZEBRA_END, BEATS.FINAL_END, 0, 1));
      targetOpen = t * 0.35; // Neatly stacked framing the side reveals
      targetOp = remap(p, BEATS.ZEBRA_END, BEATS.ZEBRA_END + 0.06, 0, 0.90);
    }

    // Natural spring physics for open/close motion
    s.scaleX = THREE.MathUtils.lerp(s.scaleX, THREE.MathUtils.lerp(0.24, 1.0, targetOpen), 0.08);
    sheerMat.opacity = THREE.MathUtils.lerp(sheerMat.opacity, targetOp, 0.09);

    // Living Wind Billow Physics: Gentle breeze ripples through the fabric
    const windFlutter = Math.sin(time * 1.8) * 0.025 * targetOpen;
    const windTilt = Math.cos(time * 1.2) * 0.012 * targetOpen;

    if (leftGroup.current) {
      // Left curtain hangs from left reveal (-2.15m), unfolds toward center
      leftGroup.current.position.x = -2.12;
      leftGroup.current.position.z = 0.28 + windFlutter;
      leftGroup.current.scale.x = s.scaleX;
      leftGroup.current.rotation.y = windTilt;
    }
    if (rightGroup.current) {
      // Right curtain hangs from right reveal (+2.12m), unfolds toward center
      rightGroup.current.position.x = 2.12;
      rightGroup.current.position.z = 0.28 - windFlutter;
      rightGroup.current.scale.x = -s.scaleX; // Mirrored inward
      rightGroup.current.rotation.y = -windTilt;
    }

    if (groupRef.current) {
      groupRef.current.visible = sheerMat.opacity > 0.01;
    }
  });

  return (
    <group ref={groupRef} position={[0, 4.34, 0]}>
      {/* Ceiling-recessed Slim Matte Bronze Track */}
      <mesh position={[0, 0, 0.28]} castShadow>
        <boxGeometry args={[4.38, 0.035, 0.05]} />
        <meshStandardMaterial color="#2B2824" metalness={0.88} roughness={0.25} />
      </mesh>
      {/* Left drapery panel */}
      <group ref={leftGroup}>
        <mesh geometry={draperyGeo} material={sheerMat} />
      </group>
      {/* Right drapery panel */}
      <group ref={rightGroup}>
        <mesh geometry={draperyGeo} material={sheerMat} />
      </group>
    </group>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// 3D — BEAT 3: BLACKOUT ARCHITECTURAL VELVET DRAPERY WITH INERTIA PHYSICS
// Floor-to-ceiling tailored acoustic drape with deep undulating folds & mass-spring lag
// ─────────────────────────────────────────────────────────────────────────────
const BlackoutDrapery = ({ smoothProgressRef }) => {
  const leftGroup = useRef();
  const rightGroup = useRef();
  const groupRef = useRef();

  const bumpTex = useMemo(() => createTextileBumpMap(), []);

  const blackoutGeo = useMemo(() => {
    const geo = new THREE.PlaneGeometry(2.15, 4.24, 48, 28);
    geo.translate(1.075, -2.12, 0);
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const wave = Math.sin(x * 9.5) * 0.11;
      pos.setZ(i, wave);
    }
    geo.computeVertexNormals();
    return geo;
  }, []);

  const blackoutMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#36312B',
    roughness: 0.78,
    metalness: 0.08,
    bumpMap: bumpTex,
    bumpScale: 0.012,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0,
  }), [bumpTex]);

  const stateRef = useRef({
    scaleX: 0.22,
    lagTilt: 0,
    prevOpen: 0,
  });

  useFrame(() => {
    const p = smoothProgressRef.current;
    const s = stateRef.current;

    let targetOpen = 0;
    let targetOp = 0;

    if (p < BEATS.SHEER_END) {
      targetOpen = 0;
      targetOp = 0;
    } else if (p < BEATS.BLACKOUT_END) {
      const t = smoothstep(remap(p, BEATS.SHEER_END, BEATS.BLACKOUT_END, 0, 1));
      targetOpen = t;
      targetOp = remap(p, BEATS.SHEER_END, BEATS.SHEER_END + 0.04, 0, 1);
    } else if (p < BEATS.ROLLER_END) {
      const t = smoothstep(remap(p, BEATS.BLACKOUT_END, BEATS.ROLLER_END, 0, 1));
      targetOpen = 1.0 - t;
      targetOp = remap(p, BEATS.BLACKOUT_END, BEATS.ROLLER_END - 0.02, 1.0, 0);
    } else if (p >= BEATS.ZEBRA_END) {
      const t = smoothstep(remap(p, BEATS.ZEBRA_END, BEATS.FINAL_END, 0, 1));
      targetOpen = t * 0.28;
      targetOp = remap(p, BEATS.ZEBRA_END, BEATS.ZEBRA_END + 0.06, 0, 0.95);
    }

    // Heavy fabric inertia: body lags behind track motion
    const deltaOpen = targetOpen - s.prevOpen;
    s.prevOpen = targetOpen;
    s.lagTilt = THREE.MathUtils.lerp(s.lagTilt, deltaOpen * 0.35, 0.1);

    s.scaleX = THREE.MathUtils.lerp(s.scaleX, THREE.MathUtils.lerp(0.22, 1.0, targetOpen), 0.075);
    blackoutMat.opacity = THREE.MathUtils.lerp(blackoutMat.opacity, targetOp, 0.09);

    if (leftGroup.current) {
      leftGroup.current.position.x = -2.12;
      leftGroup.current.position.z = 0.36;
      leftGroup.current.scale.x = s.scaleX;
      leftGroup.current.rotation.z = -s.lagTilt;
    }
    if (rightGroup.current) {
      rightGroup.current.position.x = 2.12;
      rightGroup.current.position.z = 0.36;
      rightGroup.current.scale.x = -s.scaleX;
      rightGroup.current.rotation.z = s.lagTilt;
    }

    if (groupRef.current) {
      groupRef.current.visible = blackoutMat.opacity > 0.01;
    }
  });

  return (
    <group ref={groupRef} position={[0, 4.36, 0.36]}>
      {/* Architectural Brushed Warm Brass Rod */}
      <mesh position={[0, 0, 0]} rotation-z={Math.PI / 2} castShadow>
        <cylinderGeometry args={[0.02, 0.02, 4.42, 20]} />
        <meshStandardMaterial color="#C4A052" metalness={0.92} roughness={0.22} />
      </mesh>
      <group ref={leftGroup}>
        <mesh geometry={blackoutGeo} material={blackoutMat} castShadow />
      </group>
      <group ref={rightGroup}>
        <mesh geometry={blackoutGeo} material={blackoutMat} castShadow />
      </group>
    </group>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// 3D — BEAT 4: MOTORIZED ROLLER BLIND WITH ROTATING BARREL & WEIGHT BAR
// ─────────────────────────────────────────────────────────────────────────────
const MotorizedRollerBlind = ({ smoothProgressRef }) => {
  const shadeRef = useRef();
  const bottomBarRef = useRef();
  const barrelRef = useRef();
  const groupRef = useRef();

  const bumpTex = useMemo(() => createTextileBumpMap(), []);

  const cassetteMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#1C1A18',
    metalness: 0.85,
    roughness: 0.20,
    transparent: true,
    opacity: 0,
  }), []);

  const shadeMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#DDD7CE',
    roughness: 0.65,
    metalness: 0.03,
    bumpMap: bumpTex,
    bumpScale: 0.008,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0,
  }), [bumpTex]);

  const stateRef = useRef({ height: 0.05, vel: 0 });

  useFrame(() => {
    const p = smoothProgressRef.current;
    const s = stateRef.current;
    const dt = 1 / 60;

    let targetOp = 0;
    let targetH = 0.05;

    if (p >= BEATS.BLACKOUT_END && p < BEATS.ROLLER_END) {
      const t = smoothstep(remap(p, BEATS.BLACKOUT_END + 0.03, BEATS.ROLLER_END - 0.02, 0, 1));
      targetH = THREE.MathUtils.lerp(0.05, 3.48, t);
      targetOp = remap(p, BEATS.BLACKOUT_END, BEATS.BLACKOUT_END + 0.04, 0, 1);
    } else if (p >= BEATS.ROLLER_END && p < BEATS.ROLLER_END + 0.05) {
      const t = smoothstep(remap(p, BEATS.ROLLER_END, BEATS.ROLLER_END + 0.04, 0, 1));
      targetH = THREE.MathUtils.lerp(3.48, 0.05, t);
      targetOp = remap(p, BEATS.ROLLER_END, BEATS.ROLLER_END + 0.04, 1.0, 0);
    }

    // Spring damping for weighted bottom bar
    const springAcc = (targetH - s.height) * 85 - s.vel * 13;
    s.vel += springAcc * dt;
    s.height += s.vel * dt;
    const h = Math.max(0.05, s.height);

    if (shadeRef.current) {
      shadeRef.current.position.y = 4.22 - h / 2;
      shadeRef.current.scale.y = h;
    }
    if (bottomBarRef.current) {
      bottomBarRef.current.position.y = 4.22 - h;
    }
    if (barrelRef.current) {
      barrelRef.current.rotation.x = -h * 4.5;
    }

    const op = THREE.MathUtils.lerp(cassetteMat.opacity, targetOp, 0.1);
    cassetteMat.opacity = op;
    shadeMat.opacity = op * 0.96;

    if (groupRef.current) {
      groupRef.current.visible = op > 0.01;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0.11]}>
      {/* Matte Charcoal Aluminum Headbox Cassette */}
      <mesh position={[0, 4.24, 0]} material={cassetteMat} castShadow receiveShadow>
        <boxGeometry args={[4.12, 0.13, 0.12]} />
      </mesh>
      {/* Rotating Aluminum Roller Barrel */}
      <mesh ref={barrelRef} position={[0, 4.22, 0]} rotation-z={Math.PI / 2} material={cassetteMat}>
        <cylinderGeometry args={[0.035, 0.035, 4.08, 16]} />
      </mesh>
      {/* Roller Shade Fabric */}
      <mesh ref={shadeRef} material={shadeMat} castShadow receiveShadow position={[0, 4.16, 0]}>
        <planeGeometry args={[4.04, 1]} />
      </mesh>
      {/* Bottom Aluminum Weight Hem Bar */}
      <mesh ref={bottomBarRef} material={cassetteMat} castShadow receiveShadow position={[0, 4.16, 0]}>
        <boxGeometry args={[4.06, 0.05, 0.065]} />
      </mesh>
    </group>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// 3D — BEAT 5 & 6: DUAL-LAYER ZEBRA BLIND & SYNCHRONIZED LIGHT PHASING
// Front and back fabric layers with physical offset producing authentic shadows
// ─────────────────────────────────────────────────────────────────────────────
const ZebraDualLayerBlind = ({ smoothProgressRef }) => {
  const groupRef = useRef();
  const frontGroup = useRef();
  const backGroup = useRef();
  const bottomBar = useRef();

  const bumpTex = useMemo(() => createTextileBumpMap(), []);

  const hardwareMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#1E1C1A',
    metalness: 0.86,
    roughness: 0.22,
    transparent: true,
    opacity: 0,
  }), []);

  // Translucent Voile Sheer Stripe (light passes through)
  const sheerStripeMat = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: '#FAF8F4',
    transmission: 0.68,
    opacity: 0.65,
    transparent: true,
    roughness: 0.38,
    side: THREE.DoubleSide,
    depthWrite: false,
  }), []);

  // Opaque Fabric Vane (blocks light completely)
  const opaqueVaneMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#36322E',
    roughness: 0.72,
    metalness: 0.04,
    bumpMap: bumpTex,
    bumpScale: 0.01,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0,
  }), [bumpTex]);

  const STRIPE_COUNT = 14;
  const FULL_HEIGHT = 3.48;

  useFrame(() => {
    const p = smoothProgressRef.current;
    let targetOp = 0;
    let targetH = 0.08;
    let alignment = 0; // 0 = open/sheer aligned; 1 = closed/opaque overlap

    if (p >= BEATS.ROLLER_END && p < BEATS.ZEBRA_END) {
      const t = smoothstep(remap(p, BEATS.ROLLER_END, BEATS.ROLLER_END + 0.07, 0, 1));
      targetH = THREE.MathUtils.lerp(0.08, FULL_HEIGHT, t);
      targetOp = remap(p, BEATS.ROLLER_END, BEATS.ROLLER_END + 0.04, 0, 1);

      if (p >= BEATS.ROLLER_END + 0.07) {
        alignment = smoothstep(remap(p, BEATS.ROLLER_END + 0.08, BEATS.ZEBRA_END - 0.04, 0, 1));
      }
    } else if (p >= BEATS.ZEBRA_END) {
      targetH = FULL_HEIGHT;
      targetOp = 1.0;
      alignment = THREE.MathUtils.lerp(1.0, 0.45, smoothstep(remap(p, BEATS.ZEBRA_END, BEATS.FINAL_END, 0, 1)));
    }

    const op = THREE.MathUtils.lerp(hardwareMat.opacity, targetOp, 0.1);
    hardwareMat.opacity = op;
    opaqueVaneMat.opacity = op;

    const stripeH = FULL_HEIGHT / STRIPE_COUNT;

    if (backGroup.current) {
      const shiftY = alignment * (stripeH * 0.5);
      backGroup.current.position.y = THREE.MathUtils.lerp(
        backGroup.current.position.y,
        4.24 - targetH / 2 + shiftY,
        0.12
      );
      backGroup.current.scale.y = targetH / FULL_HEIGHT;
    }

    if (frontGroup.current) {
      frontGroup.current.position.y = 4.24 - targetH / 2;
      frontGroup.current.scale.y = targetH / FULL_HEIGHT;
    }

    if (bottomBar.current) {
      bottomBar.current.position.y = THREE.MathUtils.lerp(
        bottomBar.current.position.y,
        4.24 - targetH,
        0.12
      );
    }

    if (groupRef.current) {
      groupRef.current.visible = op > 0.01;
    }
  });

  const stripeH = FULL_HEIGHT / STRIPE_COUNT;

  return (
    <group ref={groupRef} position={[0, 0, 0.13]}>
      {/* Aluminum Top Enclosed Cassette */}
      <mesh position={[0, 4.24, 0]} material={hardwareMat} castShadow>
        <boxGeometry args={[4.12, 0.13, 0.12]} />
      </mesh>

      {/* Front Layer Stripes */}
      <group ref={frontGroup} position={[0, 4.24 - FULL_HEIGHT / 2, 0.015]}>
        {Array.from({ length: STRIPE_COUNT }).map((_, i) => {
          const y = (STRIPE_COUNT / 2 - i - 0.5) * stripeH;
          return (
            <mesh
              key={`front_${i}`}
              position={[0, y, 0]}
              material={i % 2 === 0 ? opaqueVaneMat : sheerStripeMat}
              castShadow
            >
              <planeGeometry args={[4.04, stripeH * 0.96]} />
            </mesh>
          );
        })}
      </group>

      {/* Back Layer Stripes (offset in z to produce physical self-shadows between bands) */}
      <group ref={backGroup} position={[0, 4.24 - FULL_HEIGHT / 2, -0.02]}>
        {Array.from({ length: STRIPE_COUNT }).map((_, i) => {
          const y = (STRIPE_COUNT / 2 - i - 0.5) * stripeH;
          return (
            <mesh
              key={`back_${i}`}
              position={[0, y, 0]}
              material={i % 2 === 0 ? sheerStripeMat : opaqueVaneMat}
              castShadow
            >
              <planeGeometry args={[4.04, stripeH * 0.96]} />
            </mesh>
          );
        })}
      </group>

      {/* Bottom Architectural Tear-Drop Weight Bar */}
      <mesh ref={bottomBar} material={hardwareMat} castShadow position={[0, 4.24 - FULL_HEIGHT, 0]}>
        <boxGeometry args={[4.06, 0.05, 0.065]} />
      </mesh>
    </group>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// 3D — KEY DIRECTIONAL SUNLIGHT & NATURAL LOCAL AMBIENT LIGHTING RIG
// Zero remote network requests! Renders instantly with soft realistic shadows.
// ─────────────────────────────────────────────────────────────────────────────
const LightingSystem = ({ smoothProgressRef }) => {
  const sunLightRef = useRef();
  const ambientRef = useRef();
  const hemiRef = useRef();

  useFrame(() => {
    const p = smoothProgressRef.current;
    let daylightIntensity = 1.0;

    if (p < BEATS.BARE_END) {
      daylightIntensity = 1.0;
    } else if (p < BEATS.SHEER_END) {
      daylightIntensity = remap(p, BEATS.BARE_END, BEATS.SHEER_END, 1.0, 0.70);
    } else if (p < BEATS.BLACKOUT_END) {
      daylightIntensity = remap(p, BEATS.SHEER_END, BEATS.BLACKOUT_END, 0.70, 0.15);
    } else if (p < BEATS.ROLLER_END) {
      daylightIntensity = remap(p, BEATS.BLACKOUT_END, BEATS.ROLLER_END, 0.15, 0.38);
    } else if (p < BEATS.ZEBRA_END) {
      const zt = remap(p, BEATS.ROLLER_END, BEATS.ZEBRA_END, 0, 1);
      daylightIntensity = zt < 0.5 ? remap(zt, 0, 0.5, 0.70, 0.12) : remap(zt, 0.5, 1, 0.12, 0.60);
    } else {
      daylightIntensity = remap(p, BEATS.ZEBRA_END, BEATS.FINAL_END, 0.60, 0.75);
    }

    if (sunLightRef.current) {
      const sunI = THREE.MathUtils.lerp(0.2, 3.6, daylightIntensity);
      sunLightRef.current.intensity = THREE.MathUtils.lerp(sunLightRef.current.intensity, sunI, 0.08);
      sunLightRef.current.position.x = 3.2 + Math.sin(p * Math.PI) * 0.7;
    }

    if (ambientRef.current) {
      const ambI = THREE.MathUtils.lerp(0.2, 0.65, daylightIntensity);
      ambientRef.current.intensity = THREE.MathUtils.lerp(ambientRef.current.intensity, ambI, 0.08);
    }

    if (hemiRef.current) {
      const hemiI = THREE.MathUtils.lerp(0.25, 0.75, daylightIntensity);
      hemiRef.current.intensity = THREE.MathUtils.lerp(hemiRef.current.intensity, hemiI, 0.08);
    }
  });

  return (
    <group>
      {/* Warm Sky & Oak Ground Hemispherical Ambient Bounce */}
      <hemisphereLight
        ref={hemiRef}
        color="#FFF5E6"
        groundColor="#3A3226"
        intensity={0.65}
      />
      {/* Soft Fill Ambient */}
      <ambientLight ref={ambientRef} intensity={0.5} color="#F2EBE0" />
      {/* Main Directional Sun */}
      <directionalLight
        ref={sunLightRef}
        position={[3.2, 5.8, -3.5]}
        intensity={3.6}
        color="#FFF8EC"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0002}
        shadow-camera-near={0.5}
        shadow-camera-far={18}
        shadow-camera-left={-5.5}
        shadow-camera-right={5.5}
        shadow-camera-top={7.5}
        shadow-camera-bottom={-2.0}
      />
    </group>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// 3D — MASTER SCENE & CONTINUOUS DAMPED CAMERA MOVE
// Smoothly damps scroll progress to 60fps locked cinematic timeline
// ─────────────────────────────────────────────────────────────────────────────
const MasterWindowScene = ({ progressRef, isMobile }) => {
  const smoothProgressRef = useRef(0);
  const camState = useRef({
    x: 0,
    y: 2.42,
    z: isMobile ? 9.8 : 7.5,
    vx: 0,
    vy: 0,
    vz: 0,
  });

  useFrame((state) => {
    // Exponential damping on scroll progress: silky smooth transitions!
    const targetP = progressRef.current;
    smoothProgressRef.current = THREE.MathUtils.damp(smoothProgressRef.current, targetP, 8, 1 / 60);
    const p = smoothProgressRef.current;

    const time = state.clock.getElapsedTime();
    const c = camState.current;
    const dt = Math.min(1 / 60, 0.033);

    const baseZ = isMobile ? 9.8 : 7.5;
    const pushZ = isMobile ? 8.2 : 5.8;

    const targetZ = THREE.MathUtils.lerp(baseZ, pushZ, smoothstep(p));
    const targetX = Math.sin(p * Math.PI) * 0.22;
    const targetY = THREE.MathUtils.lerp(2.44, 2.38, smoothstep(p));

    const breathX = Math.sin(time * 0.35) * 0.01;
    const breathY = Math.cos(time * 0.48) * 0.006;

    const springK = 55;
    const damp = 11;
    c.vx += ((targetX + breathX - c.x) * springK - c.vx * damp) * dt;
    c.x += c.vx * dt;

    c.vy += ((targetY + breathY - c.y) * springK - c.vy * damp) * dt;
    c.y += c.vy * dt;

    c.vz += ((targetZ - c.z) * springK - c.vz * damp) * dt;
    c.z += c.vz * dt;

    state.camera.position.set(c.x, c.y, c.z);
    state.camera.lookAt(0, 2.42, 0);
  });

  return (
    <group>
      <WindowArchitecture smoothProgressRef={smoothProgressRef} />
      <SheerDrapery smoothProgressRef={smoothProgressRef} />
      <BlackoutDrapery smoothProgressRef={smoothProgressRef} />
      <MotorizedRollerBlind smoothProgressRef={smoothProgressRef} />
      <ZebraDualLayerBlind smoothProgressRef={smoothProgressRef} />
      <LightingSystem smoothProgressRef={smoothProgressRef} />
    </group>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// REDUCED MOTION STATIC FALLBACK
// ─────────────────────────────────────────────────────────────────────────────
const STATIC_STORY_BEATS = [
  { label: 'Bare Window',      heading: 'Transform your window.',              sub: 'Designed for the way you live.', isFinal: false },
  { label: 'Sheer Curtains',   heading: 'Soft daylight, gently filtered.',      sub: 'Luminous translucent drape.',    isFinal: false },
  { label: 'Blackout Drapery', heading: 'Complete privacy. Quiet serenity.',   sub: 'Deep tailored acoustic folds.',   isFinal: false },
  { label: 'Roller Shade',     heading: 'Architectural precision on demand.',   sub: 'Taut motorized solar screen.',   isFinal: false },
  { label: 'Zebra Blinds',     heading: 'Light when you want it.',              sub: 'Privacy when you need it.',      isFinal: false },
  { label: 'Finished Window',  heading: 'Transform your window. Control your world.', sub: null,                       isFinal: true },
];

const ReducedMotionView = ({ onCTAClick }) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const current = STATIC_STORY_BEATS[activeIdx];

  return (
    <section className="bg-[#0A0908] text-white py-20 px-6 md:px-12" aria-label="Window Treatment Story">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-[11px] uppercase tracking-[0.3em] text-[#C9A55A] font-sans font-semibold mb-3">
          The Window
        </p>
        <h2 className="font-serif text-[#F5F2EA] text-3xl md:text-5xl font-light mb-8">
          One window. Every treatment.
        </h2>

        {/* Accessible tab list */}
        <div className="flex flex-wrap justify-center gap-2 mb-10" role="tablist">
          {STATIC_STORY_BEATS.map((beat, i) => (
            <button
              key={beat.label}
              role="tab"
              aria-selected={activeIdx === i}
              onClick={() => setActiveIdx(i)}
              className={`px-4 py-2.5 rounded-full text-[11px] font-sans font-semibold tracking-wider uppercase transition-all duration-300 min-h-[44px] ${
                activeIdx === i
                  ? 'bg-[#C9A55A] text-[#0A0908]'
                  : 'border border-white/15 text-white/60 hover:text-white hover:border-white/30'
              }`}
            >
              {beat.label}
            </button>
          ))}
        </div>

        {/* Selected beat card */}
        <div
          className="rounded-2xl border border-[#C9A55A]/25 bg-[#141311] p-10 md:p-16 text-center"
          role="tabpanel"
          aria-label={current.label}
        >
          <h3 className="font-serif text-[#F5F2EA] text-2xl md:text-4xl font-light mb-3">
            {current.heading}
          </h3>
          {current.sub && (
            <p className="text-[#C9A55A] font-sans text-sm md:text-base mb-6">
              {current.sub}
            </p>
          )}

          {current.isFinal && (
            <div className="mt-8">
              <a
                href="#products-section"
                onClick={(e) => {
                  e.preventDefault();
                  onCTAClick();
                }}
                className="inline-flex items-center gap-2.5 bg-[#C9A55A] text-[#0A0908] px-8 py-4 rounded-full font-sans font-bold text-xs uppercase tracking-widest hover:bg-white transition-all duration-300"
              >
                Explore Window Treatments
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// TEXT OVERLAY — EXACT TWO HEADLINE BEATS PER SPEC
// ─────────────────────────────────────────────────────────────────────────────
const CinematicTextOverlay = ({ progress, onCTAClick }) => {
  const p = progress;

  // Beat 1: Fully visible at 0 to 0.10, fades cleanly as fabric arrives
  const beat1Op = p <= BEATS.BARE_END
    ? 1
    : p < BEATS.SHEER_END
    ? remap(p, BEATS.BARE_END, BEATS.BARE_END + 0.06, 1, 0)
    : 0;

  // Beat 5: Secondary crossfade during zebra blind sweep (never both on screen)
  const isBeat5 = p >= BEATS.ROLLER_END + 0.05 && p < BEATS.ZEBRA_END;
  const beat5T = remap(p, BEATS.ROLLER_END + 0.07, BEATS.ZEBRA_END - 0.04, 0, 1);
  const lightCopyOp = isBeat5 ? Math.max(0, Math.min(1, 1 - beat5T * 2.4)) : 0;
  const privacyCopyOp = isBeat5 ? Math.max(0, Math.min(1, beat5T * 2.4 - 1.0)) : 0;

  // Beat 6: Final composition & CTA
  const beat6Op = p >= BEATS.ZEBRA_END ? remap(p, BEATS.ZEBRA_END, BEATS.ZEBRA_END + 0.08, 0, 1) : 0;

  return (
    <div className="absolute inset-0 z-20 pointer-events-none" aria-hidden="true">
      {/* Beat 1 copy — positioned at bottom left, framed cleanly below the window */}
      <div
        className="absolute bottom-10 md:bottom-16 left-6 md:left-16 max-w-sm transition-opacity duration-300"
        style={{ opacity: beat1Op }}
      >
        <p className="text-[10px] md:text-xs uppercase tracking-[0.35em] text-[#C9A55A] font-sans font-semibold mb-2">
          The Window
        </p>
        <h2
          className="font-serif text-white font-light leading-[1.12] mb-2 drop-shadow-2xl"
          style={{ fontSize: 'clamp(1.6rem, 3.2vw, 2.85rem)' }}
        >
          Transform your window.
        </h2>
        <p
          className="text-white/70 font-sans font-light"
          style={{ fontSize: 'clamp(0.85rem, 1.4vw, 1.05rem)' }}
        >
          Designed for the way you live.
        </p>
      </div>

      {/* Beat 5 copy — brief, secondary, crossfade between Light and Privacy */}
      {(lightCopyOp > 0.005 || privacyCopyOp > 0.005) && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="relative text-center px-6">
            <p
              className="font-serif text-white/90 drop-shadow-2xl tracking-wide absolute inset-0 flex items-center justify-center"
              style={{
                opacity: lightCopyOp,
                fontSize: 'clamp(1.1rem, 2.2vw, 1.85rem)',
                letterSpacing: '0.04em',
              }}
            >
              Light when you want it.
            </p>
            <p
              className="font-serif text-white/90 drop-shadow-2xl tracking-wide"
              style={{
                opacity: privacyCopyOp,
                fontSize: 'clamp(1.1rem, 2.2vw, 1.85rem)',
                letterSpacing: '0.04em',
                minWidth: '16rem',
              }}
            >
              Privacy when you need it.
            </p>
          </div>
        </div>
      )}

      {/* Beat 6 copy — Final composition + CTA button */}
      <div
        className="absolute bottom-10 md:bottom-16 left-0 right-0 flex flex-col items-center text-center px-6 transition-opacity duration-400"
        style={{ opacity: beat6Op }}
      >
        <p className="text-[10px] md:text-xs uppercase tracking-[0.35em] text-[#C9A55A] font-sans font-semibold mb-2">
          Brighton Decor
        </p>
        <h2
          className="font-serif text-white font-light leading-tight mb-6 drop-shadow-2xl"
          style={{ fontSize: 'clamp(1.4rem, 2.8vw, 2.6rem)' }}
        >
          Transform your window.{' '}
          <span className="italic text-[#C9A55A]">Control your world.</span>
        </h2>

        {/* Real keyboard-accessible CTA link to Products section */}
        <div
          className="pointer-events-auto"
          style={{
            opacity: beat6Op >= 0.7 ? 1 : 0,
            transform: `translateY(${beat6Op >= 0.7 ? 0 : 8}px)`,
            transition: 'opacity 0.4s ease, transform 0.4s ease',
          }}
        >
          <a
            id="window-hero-cta"
            href="#products-section"
            onClick={(e) => {
              e.preventDefault();
              onCTAClick();
            }}
            className="inline-flex items-center gap-3 bg-[#C9A55A] hover:bg-white text-[#0A0908] px-8 md:px-10 py-4 rounded-full font-sans font-bold text-xs uppercase tracking-[0.22em] shadow-[0_10px_35px_rgba(201,165,90,0.35)] hover:shadow-[0_10px_35px_rgba(255,255,255,0.2)] transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A55A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0908]"
          >
            <span>Explore Window Treatments</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// MASTER COMPONENT
// Pinned for 460vh scroll distance, releases cleanly with zero pop.
// ─────────────────────────────────────────────────────────────────────────────
const Immersive3DShowcase = () => {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const progressRef = useRef(0);
  const [displayProgress, setDisplayProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReduced, setPrefersReduced] = useState(false);
  const rafId = useRef(null);
  const lastStateP = useRef(-1);

  // Check prefers-reduced-motion media query
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReduced(mq.matches);
    const handler = (e) => setPrefersReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Responsive mobile breakpoint check
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Native scroll progress calculation (no jacking, no preventDefault)
  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const totalScroll = rect.height - window.innerHeight;
    if (totalScroll <= 0) return;
    const rawProgress = Math.max(0, Math.min(1, -rect.top / totalScroll));
    progressRef.current = rawProgress;

    // Throttle React state updates to avoid unnecessary component re-renders
    if (Math.abs(rawProgress - lastStateP.current) > 0.004) {
      lastStateP.current = rawProgress;
      setDisplayProgress(rawProgress);
    }
  }, []);

  useEffect(() => {
    if (prefersReduced) return;
    const onScroll = () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(handleScroll);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [prefersReduced, handleScroll]);

  // Smooth CTA scroll to Products section, or navigation if outside page
  const handleCTA = useCallback(() => {
    const productsEl = document.getElementById('products-section');
    if (productsEl) {
      productsEl.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/products');
    }
  }, [navigate]);

  if (prefersReduced) {
    return <ReducedMotionView onCTAClick={handleCTA} />;
  }

  return (
    <section
      ref={containerRef}
      id="the-window"
      className="relative bg-[#0A0908] select-none"
      style={{ height: '460vh', position: 'relative' }}
      aria-label="Cinematic Window Experience — scroll to transform"
    >
      {/* Accessible screen-reader narrative */}
      <div className="sr-only">
        <h2>The Window — Cinematic Light and Privacy Transformation</h2>
        <ol>
          <li>Beat 1: Bare architectural window with raw daylight streaming through clean glass. Transform your window. Designed for the way you live.</li>
          <li>Beat 2: Translucent sheer linen drapery glides in to soften and gently scatter the daylight.</li>
          <li>Beat 3: Heavy architectural blackout velvet drapery closes with deep folds for complete privacy and quiet.</li>
          <li>Beat 4: Drapery gives way as a taut motorized roller blind unrolls from a ceiling cassette with architectural precision.</li>
          <li>Beat 5: Dual-layer zebra blind sweeps between alternating bands, cycling sunlight from bright daylight to complete blackout in sync. Light when you want it. Privacy when you need it.</li>
          <li>Beat 6: Settle into tailored architectural privacy with sheer and drapery framing the finished window. Transform your window. Control your world.</li>
        </ol>
      </div>

      {/* Sticky viewport container (pins smoothly for 460vh, releases cleanly into Products) */}
      <div className="sticky top-0 h-screen w-full overflow-hidden" style={{ willChange: 'transform' }}>
        {/* 3D WebGL Canvas Layer — Mounted immediately with 0 blank delay */}
        <div className="absolute inset-0 z-0">
          <Canvas
            shadows
            dpr={[1, 2]}
            gl={{
              antialias: true,
              alpha: false,
              powerPreference: 'high-performance',
              toneMapping: THREE.ACESFilmicToneMapping,
              toneMappingExposure: 1.12,
            }}
          >
            <PerspectiveCamera
              makeDefault
              position={[0, 2.42, isMobile ? 9.8 : 7.5]}
              fov={isMobile ? 52 : 44}
            />
            <Suspense fallback={null}>
              <MasterWindowScene progressRef={progressRef} isMobile={isMobile} />
            </Suspense>
          </Canvas>
        </div>

        {/* Film-like soft vignette overlay (ensures contrast & cinematic aesthetic) */}
        <div
          className="absolute inset-0 pointer-events-none z-10"
          aria-hidden="true"
          style={{
            background: 'radial-gradient(ellipse at 50% 50%, transparent 32%, rgba(10,9,8,0.78) 100%)',
          }}
        />

        {/* Two specified headline text beats */}
        <CinematicTextOverlay progress={displayProgress} onCTAClick={handleCTA} />

        {/* Minimal luxury scroll indicator bar at bottom */}
        <div className="absolute bottom-0 left-0 right-0 z-30 h-[2px] bg-white/5 pointer-events-none" aria-hidden="true">
          <div
            className="h-full bg-[#C9A55A] origin-left"
            style={{ transform: `scaleX(${displayProgress})`, transition: 'none' }}
          />
        </div>

        {/* Discreet scroll prompt — visible only at beat 1, fades on scroll */}
        <div
          className="absolute bottom-8 right-8 z-30 pointer-events-none flex items-center gap-2.5 transition-opacity duration-300"
          aria-hidden="true"
          style={{ opacity: Math.max(0, 1 - displayProgress / 0.06) }}
        >
          <div className="w-[1px] h-7 bg-gradient-to-b from-[#C9A55A] to-transparent" />
          <span className="text-[9px] uppercase tracking-[0.3em] text-white/50 font-mono">
            Scroll
          </span>
        </div>
      </div>
    </section>
  );
};

export default Immersive3DShowcase;
