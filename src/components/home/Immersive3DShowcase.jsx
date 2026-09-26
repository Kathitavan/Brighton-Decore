// src/components/home/Immersive3DShowcase.jsx
// Brighton Decor — "THE WINDOW" — Cinematic Scroll-Driven Hero Experience
//
// Six beats. One architectural window. One continuous camera move.
// Native scroll is the timeline scrubber (0 → 1 progress).
//
// Governing words: restrained, tactile, precise, unhurried, expensive.
//
// Architecture:
//   – 0→1 progress mapped from bounding box via native passive scroll (no scroll-jacking).
//   – All scene animations driven inside useFrame from mutable refs (0 setState during scroll).
//   – PBR materials: physical transmission glass, s-fold cloth geometry, self-shadowed zebra blind.
//   – Single directional sun with soft shadows + HDRI interior image-based lighting.
//   – Single slow continuous push-in camera move with subtle parallax.
//   – Lazy-mounted Canvas (IntersectionObserver) + DPR clamped [1, 2].
//   – Full accessible static fallback for prefers-reduced-motion.

import React, {
  useRef,
  useMemo,
  useState,
  useEffect,
  useCallback,
  Suspense,
} from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, Environment, useTexture } from '@react-three/drei';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import * as THREE from 'three';

// ─────────────────────────────────────────────────────────────────────────────
// BEAT BOUNDARIES (spec table)
// ─────────────────────────────────────────────────────────────────────────────
const BEATS = {
  BARE_END:     0.10, // 0.00 – 0.10: Bare window, raw daylight, architecture alone
  SHEER_END:    0.25, // 0.10 – 0.25: Sheer curtain arrives, light softens
  BLACKOUT_END: 0.40, // 0.25 – 0.40: Blackout curtain closes, light drops
  ROLLER_END:   0.55, // 0.40 – 0.55: Curtain parts, roller blind descends
  ZEBRA_END:    0.80, // 0.55 – 0.80: Zebra blind + light control cycling
  FINAL_END:    1.00, // 0.80 – 1.00: Privacy settle, styled architectural composition
};

const LERP_EASE = 0.065;

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
      const weave = (Math.sin(x * 0.9) * Math.cos(y * 0.9) + 1) * 0.5;
      const noise = (Math.random() - 0.5) * 0.15;
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

// ─────────────────────────────────────────────────────────────────────────────
// 3D — OUTDOOR DAYLIGHT GARDEN BACKDROP
// ─────────────────────────────────────────────────────────────────────────────
const OutdoorBackdrop = ({ progressRef }) => {
  const tex = useTexture('/assets/imgs/home/window-garden-bg.jpg');
  const matRef = useRef();

  useFrame(() => {
    if (!matRef.current) return;
    const p = progressRef.current;
    let brightness = 1.0;
    if (p >= BEATS.SHEER_END && p < BEATS.BLACKOUT_END) {
      brightness = remap(p, BEATS.SHEER_END, BEATS.BLACKOUT_END, 1.0, 0.45);
    } else if (p >= BEATS.BLACKOUT_END && p < BEATS.ROLLER_END) {
      brightness = remap(p, BEATS.BLACKOUT_END, BEATS.ROLLER_END, 0.45, 1.0);
    } else if (p >= BEATS.ROLLER_END && p < BEATS.ZEBRA_END) {
      const t = remap(p, BEATS.ROLLER_END, BEATS.ZEBRA_END, 0, 1);
      brightness = t < 0.5 ? remap(t, 0, 0.5, 0.95, 0.35) : remap(t, 0.5, 1, 0.35, 0.90);
    } else {
      brightness = 0.92;
    }
    matRef.current.color.setScalar(brightness);
  });

  return (
    <mesh position={[0, 2.45, -2.6]}>
      <planeGeometry args={[15.5, 9.6]} />
      <meshBasicMaterial ref={matRef} map={tex} toneMapped={false} />
    </mesh>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// 3D — ARCHITECTURAL WINDOW FRAME, GLASS, WALL, SILL & LIGHT SHAFT
// Hollow frame with clear glass panes revealing the garden backdrop!
// ─────────────────────────────────────────────────────────────────────────────
const WindowArchitecture = ({ progressRef }) => {
  // Physical Float Glass: IOR 1.52, near-zero roughness, high transmission
  const glassMat = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: '#FFFFFF',
    transmission: 0.96,
    opacity: 0.25,
    transparent: true,
    roughness: 0.02,
    metalness: 0.04,
    ior: 1.52,
    thickness: 0.06,
    clearcoat: 1.0,
    clearcoatRoughness: 0.03,
    reflectivity: 0.5,
  }), []);

  // Architectural Anodized Charcoal Aluminum Mullions
  const frameMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#1A1816',
    metalness: 0.85,
    roughness: 0.24,
  }), []);

  // Deep Stone / White Oak Window Sill
  const sillMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#34302C',
    roughness: 0.45,
    metalness: 0.15,
  }), []);

  // Interior Architectural Limewash Plaster Wall
  const wallMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#161513',
    roughness: 0.92,
  }), []);

  // Lacquered Natural White Oak Floor
  const floorMat = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: '#9C7E5C',
    roughness: 0.36,
    metalness: 0.03,
    clearcoat: 0.45,
    clearcoatRoughness: 0.16,
  }), []);

  // Volumetric Sunbeam / Light Shaft on Floor
  const lightShaftMat = useMemo(() => new THREE.MeshBasicMaterial({
    color: '#FFF8E6',
    transparent: true,
    opacity: 0.24,
    depthWrite: false,
    side: THREE.DoubleSide,
    blending: THREE.AdditiveBlending,
  }), []);

  useFrame(() => {
    const p = progressRef.current;
    let shaftOp = 0.24;
    if (p < BEATS.BARE_END) {
      shaftOp = 0.25;
    } else if (p < BEATS.SHEER_END) {
      shaftOp = remap(p, BEATS.BARE_END, BEATS.SHEER_END, 0.25, 0.12);
    } else if (p < BEATS.BLACKOUT_END) {
      shaftOp = remap(p, BEATS.SHEER_END, BEATS.BLACKOUT_END, 0.12, 0.0);
    } else if (p < BEATS.ROLLER_END) {
      shaftOp = remap(p, BEATS.BLACKOUT_END, BEATS.ROLLER_END, 0.0, 0.08);
    } else if (p < BEATS.ZEBRA_END) {
      const zt = remap(p, BEATS.ROLLER_END, BEATS.ZEBRA_END, 0, 1);
      shaftOp = zt < 0.5 ? remap(zt, 0, 0.5, 0.18, 0.01) : remap(zt, 0.5, 1, 0.01, 0.16);
    } else {
      shaftOp = remap(p, BEATS.ZEBRA_END, BEATS.FINAL_END, 0.16, 0.14);
    }
    lightShaftMat.opacity = shaftOp;
  });

  return (
    <group>
      {/* 1. White Oak Lacquered Floor */}
      <mesh rotation-x={-Math.PI / 2} position={[0, 0, 0]} material={floorMat} receiveShadow>
        <planeGeometry args={[20, 20]} />
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

      {/* 4. HOLLOW Architectural Window Frame (No solid black box blocking the glass!) */}
      <group position={[0, 2.5, 0]}>
        {/* Left outer stile */}
        <mesh position={[-2.08, 0, 0]} material={frameMat} castShadow receiveShadow>
          <boxGeometry args={[0.14, 3.66, 0.14]} />
        </mesh>
        {/* Right outer stile */}
        <mesh position={[2.08, 0, 0]} material={frameMat} castShadow receiveShadow>
          <boxGeometry args={[0.14, 3.66, 0.14]} />
        </mesh>
        {/* Top outer header rail */}
        <mesh position={[0, 1.83, 0]} material={frameMat} castShadow receiveShadow>
          <boxGeometry args={[4.30, 0.14, 0.14]} />
        </mesh>
        {/* Bottom outer sill rail */}
        <mesh position={[0, -1.83, 0]} material={frameMat} castShadow receiveShadow>
          <boxGeometry args={[4.30, 0.14, 0.14]} />
        </mesh>

        {/* Center Vertical Mullion Bar */}
        <mesh position={[0, 0, 0.02]} material={frameMat} castShadow>
          <boxGeometry args={[0.06, 3.52, 0.08]} />
        </mesh>
        {/* Transom Horizontal Bar */}
        <mesh position={[0, 0.70, 0.02]} material={frameMat} castShadow>
          <boxGeometry args={[4.02, 0.06, 0.08]} />
        </mesh>

        {/* Physical Float Glass Panes (4 Quadrants) */}
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

        {/* Deep Solid Sill Shelf */}
        <mesh position={[0, -1.94, 0.16]} material={sillMat} castShadow receiveShadow>
          <boxGeometry args={[4.46, 0.14, 0.44]} />
        </mesh>
      </group>

      {/* 5. Natural Daylight Exterior Garden View */}
      <OutdoorBackdrop progressRef={progressRef} />

      {/* 6. Soft Sunbeam Pool on Oak Floor */}
      <mesh position={[0.45, 0.02, 1.8]} rotation-x={-Math.PI / 2} rotation-z={0.16} material={lightShaftMat}>
        <planeGeometry args={[3.8, 5.2]} />
      </mesh>
    </group>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// 3D — BEAT 2: SHEER LINEN DRAPERY
// Fabric weave PBR: transmission 0.40, roughness 0.65, soft light scatter
// Continuous S-fold geometry + top rail leads, body lags with subtle inertia
// Micro-life: subtle idle room sway
// ─────────────────────────────────────────────────────────────────────────────
const SheerDrapery = ({ progressRef }) => {
  const leftPivot = useRef();
  const rightPivot = useRef();
  const groupRef = useRef();

  const bumpTex = useMemo(() => createTextileBumpMap(), []);

  // Continuous sinusoidal S-fold drapery geometry (shadows sit in real folds)
  const draperyGeo = useMemo(() => {
    const geo = new THREE.PlaneGeometry(2.10, 3.65, 48, 24);
    // Center geometry so top edge is at y = 0
    geo.translate(1.05, -1.825, 0);
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const wave = Math.sin(x * 12.5) * 0.09 + Math.cos(x * 5.0) * 0.03;
      pos.setZ(i, wave);
    }
    geo.computeVertexNormals();
    return geo;
  }, []);

  const sheerMat = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: '#FAF7F2',
    transmission: 0.40,
    opacity: 0,
    transparent: true,
    roughness: 0.65,
    bumpMap: bumpTex,
    bumpScale: 0.012,
    ior: 1.25,
    thickness: 0.16,
    side: THREE.DoubleSide,
  }), [bumpTex]);

  const stateRef = useRef({
    leftX: -2.3,
    rightX: 2.3,
    leftV: 0,
    rightV: 0,
    sway: 0,
    swayV: 0,
    tilt: 0,
  });

  useFrame((state) => {
    const p = progressRef.current;
    const s = stateRef.current;
    const dt = Math.min(state.clock.getDelta(), 0.033);
    const time = state.clock.getElapsedTime();

    let targetLeftX = -2.3;
    let targetRightX = 2.3;
    let targetOp = 0;

    if (p < BEATS.BARE_END) {
      // Hidden outside the reveal
      targetLeftX = -2.3;
      targetRightX = 2.3;
      targetOp = 0;
    } else if (p < BEATS.SHEER_END) {
      // Beat 2: Glides gracefully in to close over window
      const t = smoothstep(remap(p, BEATS.BARE_END, BEATS.SHEER_END, 0, 1));
      targetLeftX = THREE.MathUtils.lerp(-2.3, -2.05, t);
      targetRightX = THREE.MathUtils.lerp(2.3, 2.05, t);
      targetOp = remap(p, BEATS.BARE_END, BEATS.BARE_END + 0.04, 0, 1);
    } else if (p < BEATS.BLACKOUT_END) {
      targetLeftX = -2.05;
      targetRightX = 2.05;
      targetOp = remap(p, BEATS.SHEER_END, BEATS.BLACKOUT_END, 1.0, 0.25);
    } else if (p < BEATS.ROLLER_END) {
      // Curtain gracefully parts and glides out to reveals
      const t = smoothstep(remap(p, BEATS.BLACKOUT_END, BEATS.ROLLER_END, 0, 1));
      targetLeftX = THREE.MathUtils.lerp(-2.05, -2.4, t);
      targetRightX = THREE.MathUtils.lerp(2.05, 2.4, t);
      targetOp = remap(p, BEATS.BLACKOUT_END, BEATS.BLACKOUT_END + 0.05, 0.25, 0);
    } else if (p >= BEATS.ZEBRA_END) {
      // Beat 6: Returns to frame the finished window styled composition!
      const t = smoothstep(remap(p, BEATS.ZEBRA_END, BEATS.FINAL_END, 0, 1));
      targetLeftX = THREE.MathUtils.lerp(-2.4, -2.15, t);
      targetRightX = THREE.MathUtils.lerp(2.4, 2.15, t);
      targetOp = remap(p, BEATS.ZEBRA_END, BEATS.ZEBRA_END + 0.08, 0, 0.85);
    }

    const springK = 140;
    const damp = 18;
    s.leftV += ((targetLeftX - s.leftX) * springK - s.leftV * damp) * dt;
    s.leftX += s.leftV * dt;

    s.rightV += ((targetRightX - s.rightX) * springK - s.rightV * damp) * dt;
    s.rightX += s.rightV * dt;

    // Natural pendulum drag angle from top rail
    s.tilt = THREE.MathUtils.lerp(s.tilt, -s.leftV * 0.022, LERP_EASE * 2);

    // Micro-life: subtle idle room air sway
    const swayTarget = Math.sin(time * 0.32) * 0.006;
    s.swayV += ((swayTarget - s.sway) * 8 - s.swayV * 4) * dt;
    s.sway += s.swayV * dt;

    sheerMat.opacity = THREE.MathUtils.lerp(sheerMat.opacity, targetOp * 0.95, LERP_EASE * 2);

    if (leftPivot.current) {
      leftPivot.current.position.x = s.leftX + s.sway;
      leftPivot.current.rotation.z = s.tilt;
    }
    if (rightPivot.current) {
      rightPivot.current.position.x = s.rightX - s.sway;
      rightPivot.current.rotation.z = -s.tilt;
    }
    if (groupRef.current) {
      groupRef.current.visible = sheerMat.opacity > 0.01;
    }
  });

  return (
    <group ref={groupRef} position={[0, 4.32, 0.16]}>
      {/* Slim Matte Bronze Recessed Track */}
      <mesh position={[0, 0, 0]} castShadow>
        <boxGeometry args={[4.28, 0.04, 0.06]} />
        <meshStandardMaterial color="#2B2824" metalness={0.88} roughness={0.25} />
      </mesh>
      {/* Left drapery panel pivoting from top track */}
      <group ref={leftPivot} position={[-2.3, 0, 0]}>
        <mesh geometry={draperyGeo} material={sheerMat} castShadow />
      </group>
      {/* Right drapery panel (mirrored horizontally) */}
      <group ref={rightPivot} position={[2.3, 0, 0]} scale={[-1, 1, 1]}>
        <mesh geometry={draperyGeo} material={sheerMat} castShadow />
      </group>
    </group>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// 3D — BEAT 3: BLACKOUT ARCHITECTURAL DRAPERY
// Heavy velvet weave: near-zero transmission, roughness 0.90, deep luxurious folds
// Glides inward, top leads with visible fabric weight and settles
// ─────────────────────────────────────────────────────────────────────────────
const BlackoutDrapery = ({ progressRef }) => {
  const leftPivot = useRef();
  const rightPivot = useRef();
  const groupRef = useRef();

  const bumpTex = useMemo(() => createTextileBumpMap(), []);

  const blackoutGeo = useMemo(() => {
    const geo = new THREE.PlaneGeometry(2.15, 3.68, 48, 24);
    geo.translate(1.075, -1.84, 0);
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const wave = Math.sin(x * 9.5) * 0.13 + Math.cos(x * 3.8) * 0.04;
      pos.setZ(i, wave);
    }
    geo.computeVertexNormals();
    return geo;
  }, []);

  const blackoutMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#24211E',
    roughness: 0.90,
    metalness: 0.06,
    bumpMap: bumpTex,
    bumpScale: 0.016,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0,
  }), [bumpTex]);

  const stateRef = useRef({
    leftX: -2.3,
    rightX: 2.3,
    leftV: 0,
    rightV: 0,
    tilt: 0,
  });

  useFrame((state) => {
    const p = progressRef.current;
    const s = stateRef.current;
    const dt = Math.min(state.clock.getDelta(), 0.033);

    let targetLeftX = -2.3;
    let targetRightX = 2.3;
    let targetOp = 0;

    if (p < BEATS.SHEER_END) {
      targetLeftX = -2.3;
      targetRightX = 2.3;
      targetOp = 0;
    } else if (p < BEATS.BLACKOUT_END) {
      const t = smoothstep(remap(p, BEATS.SHEER_END, BEATS.BLACKOUT_END, 0, 1));
      targetLeftX = THREE.MathUtils.lerp(-2.3, -2.05, t);
      targetRightX = THREE.MathUtils.lerp(2.3, 2.05, t);
      targetOp = remap(p, BEATS.SHEER_END, BEATS.SHEER_END + 0.05, 0, 1);
    } else if (p < BEATS.ROLLER_END) {
      const t = smoothstep(remap(p, BEATS.BLACKOUT_END, BEATS.ROLLER_END, 0, 1));
      targetLeftX = THREE.MathUtils.lerp(-2.05, -2.4, t);
      targetRightX = THREE.MathUtils.lerp(2.05, 2.4, t);
      targetOp = remap(p, BEATS.BLACKOUT_END, BEATS.ROLLER_END - 0.03, 1.0, 0);
    } else if (p >= BEATS.ZEBRA_END) {
      const t = smoothstep(remap(p, BEATS.ZEBRA_END, BEATS.FINAL_END, 0, 1));
      targetLeftX = THREE.MathUtils.lerp(-2.4, -2.18, t);
      targetRightX = THREE.MathUtils.lerp(2.4, 2.18, t);
      targetOp = remap(p, BEATS.ZEBRA_END, BEATS.ZEBRA_END + 0.08, 0, 0.92);
    }

    const springK = 120;
    const damp = 17;
    s.leftV += ((targetLeftX - s.leftX) * springK - s.leftV * damp) * dt;
    s.leftX += s.leftV * dt;

    s.rightV += ((targetRightX - s.rightX) * springK - s.rightV * damp) * dt;
    s.rightX += s.rightV * dt;

    s.tilt = THREE.MathUtils.lerp(s.tilt, -s.leftV * 0.018, LERP_EASE * 2);

    blackoutMat.opacity = THREE.MathUtils.lerp(blackoutMat.opacity, targetOp, LERP_EASE * 2);

    if (leftPivot.current) {
      leftPivot.current.position.x = s.leftX;
      leftPivot.current.rotation.z = s.tilt;
    }
    if (rightPivot.current) {
      rightPivot.current.position.x = s.rightX;
      rightPivot.current.rotation.z = -s.tilt;
    }
    if (groupRef.current) {
      groupRef.current.visible = blackoutMat.opacity > 0.01;
    }
  });

  return (
    <group ref={groupRef} position={[0, 4.34, 0.24]}>
      {/* Architectural Gold Brass Rod */}
      <mesh position={[0, 0, 0]} rotation-z={Math.PI / 2} castShadow>
        <cylinderGeometry args={[0.022, 0.022, 4.36, 20]} />
        <meshStandardMaterial color="#C4A052" metalness={0.92} roughness={0.18} />
      </mesh>
      <group ref={leftPivot} position={[-2.3, 0, 0]}>
        <mesh geometry={blackoutGeo} material={blackoutMat} castShadow />
      </group>
      <group ref={rightPivot} position={[2.3, 0, 0]} scale={[-1, 1, 1]}>
        <mesh geometry={blackoutGeo} material={blackoutMat} castShadow />
      </group>
    </group>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// 3D — BEAT 4: SLEEK MOTORIZED ROLLER BLIND
// Constant unroll speed, delicate bounce-settle at bottom
// Shadow line moves down the glass in sync
// ─────────────────────────────────────────────────────────────────────────────
const MotorizedRollerBlind = ({ progressRef }) => {
  const shadeRef = useRef();
  const bottomBarRef = useRef();
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
    roughness: 0.62,
    metalness: 0.03,
    bumpMap: bumpTex,
    bumpScale: 0.01,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0,
  }), [bumpTex]);

  const stateRef = useRef({ height: 0.05, vel: 0 });

  useFrame(() => {
    const p = progressRef.current;
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

    const op = THREE.MathUtils.lerp(cassetteMat.opacity, targetOp, LERP_EASE * 2);
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
// 3D — BEAT 5 & 6: DUAL-LAYER ZEBRA BLIND & LIGHT CONTROL CYCLING
// Two offset planes; back layer slides vertically past front layer
// Realistic self-shadow between sheer mesh and solid vane reads as physical blind
// Sunlight cycles bright → filtered → blackout in exact sync
// Settle on styled privacy in Beat 6
// ─────────────────────────────────────────────────────────────────────────────
const ZebraDualLayerBlind = ({ progressRef }) => {
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
    transmission: 0.65,
    opacity: 0.65,
    transparent: true,
    roughness: 0.38,
    side: THREE.DoubleSide,
  }), []);

  // Opaque Fabric Vane (blocks light completely)
  const opaqueVaneMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#3A3632',
    roughness: 0.72,
    metalness: 0.04,
    bumpMap: bumpTex,
    bumpScale: 0.012,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0,
  }), [bumpTex]);

  const STRIPE_COUNT = 14;
  const FULL_HEIGHT = 3.48;

  useFrame(() => {
    const p = progressRef.current;
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

    const op = THREE.MathUtils.lerp(hardwareMat.opacity, targetOp, LERP_EASE * 2);
    hardwareMat.opacity = op;
    opaqueVaneMat.opacity = op;

    const stripeH = FULL_HEIGHT / STRIPE_COUNT;

    if (backGroup.current) {
      const shiftY = alignment * (stripeH * 0.5);
      backGroup.current.position.y = THREE.MathUtils.lerp(
        backGroup.current.position.y,
        4.24 - targetH / 2 + shiftY,
        LERP_EASE * 2
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
        LERP_EASE * 2
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
// 3D — KEY DIRECTIONAL SUNLIGHT & HDRI IMAGE-BASED LIGHTING
// Single key sun with soft PCSS-style shadow map.
// Bounce/fill handled by HDRI environment. No second hard light.
// Intensity & warmth animate smoothly across the sequence.
// ─────────────────────────────────────────────────────────────────────────────
const LightingSystem = ({ progressRef }) => {
  const sunLightRef = useRef();
  const ambientRef = useRef();

  useFrame(() => {
    const p = progressRef.current;
    let daylightIntensity = 1.0;

    if (p < BEATS.BARE_END) {
      daylightIntensity = 1.0; // Raw sunlight
    } else if (p < BEATS.SHEER_END) {
      daylightIntensity = remap(p, BEATS.BARE_END, BEATS.SHEER_END, 1.0, 0.68); // Softened
    } else if (p < BEATS.BLACKOUT_END) {
      daylightIntensity = remap(p, BEATS.SHEER_END, BEATS.BLACKOUT_END, 0.68, 0.12); // Drops to blackout
    } else if (p < BEATS.ROLLER_END) {
      daylightIntensity = remap(p, BEATS.BLACKOUT_END, BEATS.ROLLER_END, 0.12, 0.32); // Filtered screen
    } else if (p < BEATS.ZEBRA_END) {
      const zt = remap(p, BEATS.ROLLER_END, BEATS.ZEBRA_END, 0, 1);
      daylightIntensity = zt < 0.5 ? remap(zt, 0, 0.5, 0.65, 0.08) : remap(zt, 0.5, 1, 0.08, 0.55);
    } else {
      daylightIntensity = remap(p, BEATS.ZEBRA_END, BEATS.FINAL_END, 0.55, 0.72);
    }

    if (sunLightRef.current) {
      const sunI = THREE.MathUtils.lerp(0.1, 3.8, daylightIntensity);
      sunLightRef.current.intensity = THREE.MathUtils.lerp(sunLightRef.current.intensity, sunI, LERP_EASE);
      sunLightRef.current.position.x = 3.2 + Math.sin(p * Math.PI) * 0.75;
    }

    if (ambientRef.current) {
      const ambI = THREE.MathUtils.lerp(0.15, 0.65, daylightIntensity);
      ambientRef.current.intensity = THREE.MathUtils.lerp(ambientRef.current.intensity, ambI, LERP_EASE);
    }
  });

  return (
    <group>
      <ambientLight ref={ambientRef} intensity={0.55} color="#F5EFE6" />
      <directionalLight
        ref={sunLightRef}
        position={[3.2, 5.8, -3.5]}
        intensity={3.8}
        color="#FFF6E8"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.00015}
        shadow-camera-near={0.5}
        shadow-camera-far={18}
        shadow-camera-left={-5.5}
        shadow-camera-right={5.5}
        shadow-camera-top={7.5}
        shadow-camera-bottom={-2.0}
      />
      <Environment preset="apartment" environmentIntensity={0.65} />
    </group>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// 3D — MASTER SCENE & SINGLE CONTINUOUS CAMERA MOVE
// One slow, continuous camera push — no per-beat cuts.
// Modest push distance (wide view → intimate fabric texture).
// Subtle parallax drift tied to scroll. One consistent easing curve.
// ─────────────────────────────────────────────────────────────────────────────
const MasterWindowScene = ({ progressRef, isMobile }) => {
  const camState = useRef({
    x: 0,
    y: 2.42,
    z: isMobile ? 9.8 : 7.5,
    vx: 0,
    vy: 0,
    vz: 0,
  });

  useFrame((state) => {
    const p = progressRef.current;
    const time = state.clock.getElapsedTime();
    const c = camState.current;
    const dt = Math.min(1 / 60, 0.033);

    const baseZ = isMobile ? 9.8 : 7.5;
    const pushZ = isMobile ? 8.2 : 5.6;

    const targetZ = THREE.MathUtils.lerp(baseZ, pushZ, smoothstep(p));
    const targetX = Math.sin(p * Math.PI) * 0.24;
    const targetY = THREE.MathUtils.lerp(2.44, 2.36, smoothstep(p));

    const breathX = Math.sin(time * 0.35) * 0.012;
    const breathY = Math.cos(time * 0.48) * 0.008;

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
      <WindowArchitecture progressRef={progressRef} />
      <SheerDrapery progressRef={progressRef} />
      <BlackoutDrapery progressRef={progressRef} />
      <MotorizedRollerBlind progressRef={progressRef} />
      <ZebraDualLayerBlind progressRef={progressRef} />
      <LightingSystem progressRef={progressRef} />
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
// Beat 1 (0 – 0.10):
//   "Transform your window." / "Designed for the way you live."
// Beat 5 (0.55 – 0.80):
//   "Light when you want it." → "Privacy when you need it." (crossfade, never both)
// Beat 6 (0.80 – 1.00):
//   "Transform your window. Control your world." + CTA "Explore Window Treatments"
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
  const [canvasReady, setCanvasReady] = useState(false);
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

  // Lazy-mount 3D canvas when section is within 250px of viewport
  useEffect(() => {
    if (prefersReduced) return;
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCanvasReady(true);
        }
      },
      { rootMargin: '250px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [prefersReduced]);

  // Native scroll progress calculation (no jacking, no preventDefault)
  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const totalScroll = rect.height - window.innerHeight;
    if (totalScroll <= 0) return;
    const rawProgress = Math.max(0, Math.min(1, -rect.top / totalScroll));
    progressRef.current = rawProgress;

    // Throttle React state updates to avoid unnecessary component re-renders
    if (Math.abs(rawProgress - lastStateP.current) > 0.003) {
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
      className="relative bg-[#0A0908] select-none"
      style={{ height: '460vh' }}
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
        {/* 3D WebGL Canvas Layer */}
        <div className="absolute inset-0 z-0">
          {canvasReady ? (
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
          ) : (
            <div
              className="w-full h-full"
              style={{ background: 'radial-gradient(ellipse at 50% 45%, #23201B 0%, #0A0908 100%)' }}
              aria-hidden="true"
            />
          )}
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
