// src/components/products/ProductCanvasHero.jsx
// Brighton Decor Canada — 3D Procedural Material Sample Studio (R3F WebGL Stage)
import React, { useRef, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, ContactShadows, Environment, Html } from '@react-three/drei';
import * as THREE from 'three';

// Procedural 3D Architectural Material Assembly (Floating Blinds & Timber Sample)
function FloatingMaterialAssembly({ activeSample = 'blinds' }) {
  const groupRef = useRef();
  const slatsRef = useRef();

  // Smooth mouse inertia rotation
  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const targetX = (state.pointer.y * Math.PI) / 12;
    const targetY = (state.pointer.x * Math.PI) / 8;

    groupRef.current.rotation.x = THREE.MathUtils.damp(groupRef.current.rotation.x, targetX, 4, delta);
    groupRef.current.rotation.y = THREE.MathUtils.damp(groupRef.current.rotation.y, targetY, 4, delta);
  });

  return (
    <group ref={groupRef}>
      <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.6}>
        {/* Main Floating Assembly */}
        <group position={[0, 0.1, 0]}>
          {/* Architectural Blind Slats Stack */}
          <group ref={slatsRef}>
            {[-0.6, -0.3, 0, 0.3, 0.6].map((yOffset, i) => (
              <mesh key={i} position={[0, yOffset, i * 0.05]} rotation={[0.15, 0, 0.02 * i]}>
                <boxGeometry args={[2.4, 0.22, 0.04]} />
                <meshPhysicalMaterial
                  color="#EAE3D2"
                  roughness={0.28}
                  metalness={0.05}
                  clearcoat={0.7}
                  clearcoatRoughness={0.15}
                  sheen={0.4}
                  sheenColor="#B89656"
                  envMapIntensity={1.2}
                />
              </mesh>
            ))}
          </group>

          {/* Timber Accent Base Sample */}
          <mesh position={[0, -1.05, -0.2]} rotation={[-0.2, 0.3, 0]}>
            <boxGeometry args={[2.8, 0.18, 0.6]} />
            <meshPhysicalMaterial
              color="#2B1F17"
              roughness={0.4}
              metalness={0.1}
              clearcoat={0.9}
              clearcoatRoughness={0.1}
              reflectivity={0.8}
            />
          </mesh>

          {/* Metallic Champagne Rail Bar */}
          <mesh position={[0, 0.95, 0]}>
            <boxGeometry args={[2.6, 0.08, 0.12]} />
            <meshStandardMaterial
              color="#B89656"
              metalness={0.85}
              roughness={0.2}
            />
          </mesh>
        </group>
      </Float>

      {/* Realistic Contact Shadow */}
      <ContactShadows
        position={[0, -1.6, 0]}
        opacity={0.45}
        scale={7}
        blur={2.2}
        far={4}
        color="#2B1F17"
      />
    </group>
  );
}

const ProductCanvasHero = () => {
  return (
    <div className="relative w-full h-[340px] md:h-[420px] rounded-3xl overflow-hidden bg-gradient-to-b from-[#EAE3D2]/40 via-[#FAF8F5]/60 to-transparent border border-[#2B1F17]/10 shadow-sm flex items-center justify-center">
      {/* 3D WebGL Canvas Stage */}
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      >
        <ambientLight intensity={0.65} />
        <directionalLight position={[5, 6, 5]} intensity={1.3} color="#FFF8EF" castShadow />
        <pointLight position={[-4, 3, -2]} intensity={0.8} color="#B89656" />

        <Suspense fallback={
          <Html center>
            <div className="flex items-center gap-3 text-[#2B1F17]/60 font-sans text-xs uppercase font-bold tracking-widest bg-white/80 backdrop-blur-md px-4 py-2 rounded-full border border-[#2B1F17]/10 shadow-sm">
              <div className="w-3.5 h-3.5 border-2 border-[#B89656] border-t-transparent rounded-full animate-spin" />
              <span>Loading 3D Studio...</span>
            </div>
          </Html>
        }>
          <FloatingMaterialAssembly />
        </Suspense>
      </Canvas>

      {/* Floating Interactive Micro Hint */}
      <div className="absolute bottom-4 right-6 pointer-events-none text-right">
        <span className="text-[9px] uppercase font-bold tracking-[0.25em] text-[#2B1F17]/50 font-sans block">
          Interactive Material 3D Stage
        </span>
        <span className="text-[10px] font-sans text-[#B89656] font-semibold">
          Drag / Move Cursor to Rotate ✦
        </span>
      </div>
    </div>
  );
};

export default ProductCanvasHero;
