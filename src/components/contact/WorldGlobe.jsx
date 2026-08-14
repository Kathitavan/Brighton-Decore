// src/components/contact/WorldGlobe.jsx
import React, { useRef, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html, Float, Stars, useTexture } from '@react-three/drei';
import * as THREE from 'three';

// 1. Math Helper: Convert Lat/Long coordinates to 3D Cartesian Vector3
export function latLongToVector3(lat, lon, radius = 2.0) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

// 2. Texture CDN URLs with high reliability
const TEXTURES = {
  day: 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_atmos_2048.jpg',
  normal: 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_normal_2048.jpg',
  clouds: 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_clouds_1024.png',
  specular: 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_specular_2048.jpg',
};

// 3. Photorealistic 3D Earth Globe Inner Component
function PhotorealisticEarth({ onPinClick }) {
  const globeGroupRef = useRef();
  const cloudsRef = useRef();
  const ringRef = useRef();
  const [hovered, setHovered] = useState(false);

  // Load high-resolution PBR textures
  const [dayMap, normalMap, cloudsMap, specularMap] = useTexture([
    TEXTURES.day,
    TEXTURES.normal,
    TEXTURES.clouds,
    TEXTURES.specular,
  ]);

  // Saskatoon, Saskatchewan Coordinates: 52.1332° N, -106.6346° W
  const saskatoonPos = React.useMemo(() => latLongToVector3(52.1332, -106.6346, 2.02), []);
  const pinRotation = React.useMemo(() => {
    const normal = saskatoonPos.clone().normalize();
    const up = new THREE.Vector3(0, 1, 0);
    const q = new THREE.Quaternion();
    q.setFromUnitVectors(up, normal);
    const euler = new THREE.Euler();
    euler.setFromQuaternion(q);
    return euler;
  }, [saskatoonPos]);

  // Frame Animations: Independent Cloud & Pulse Ring Rotation
  useFrame((state, delta) => {
    if (globeGroupRef.current && !hovered) {
      globeGroupRef.current.rotation.y += delta * 0.08;
    }
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y += delta * 0.12;
    }
    if (ringRef.current) {
      const time = state.clock.getElapsedTime();
      const scale = 1 + Math.sin(time * 3) * 0.25;
      ringRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group ref={globeGroupRef}>
      
      {/* 1. Base Earth Surface Layer (Radius 2.0) */}
      <mesh receiveShadow castShadow>
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial
          map={dayMap}
          normalMap={normalMap}
          normalScale={new THREE.Vector2(0.05, 0.05)}
          roughnessMap={specularMap}
          roughness={0.6}
          metalness={0.1}
        />
      </mesh>

      {/* 2. Dynamic Volumetric Cloud Layer (Radius 2.02) */}
      <mesh ref={cloudsRef} scale={1.01}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial
          map={cloudsMap}
          transparent={true}
          opacity={0.85}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* 3. Atmospheric Rayleigh Scattering Glow (Radius 2.15) */}
      <mesh scale={1.075}>
        <sphereGeometry args={[2, 32, 32]} />
        <meshBasicMaterial
          color="#52B788"
          transparent={true}
          opacity={0.12}
          side={THREE.BackSide}
        />
      </mesh>

      {/* 4. Saskatoon Location Marker Pin (3D Cone & Pulse Rings) */}
      <group
        position={saskatoonPos}
        rotation={pinRotation}
        onPointerOver={() => {
          setHovered(true);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = 'auto';
        }}
        onClick={(e) => {
          e.stopPropagation();
          onPinClick();
        }}
      >
        {/* Sleek 3D Brass/Gold Pin Cone */}
        <mesh position={[0, 0.12, 0]} scale={hovered ? 1.3 : 1.0}>
          <coneGeometry args={[0.04, 0.24, 16]} />
          <meshStandardMaterial
            color="#E0B354"
            roughness={0.2}
            metalness={0.9}
            emissive="#E0B354"
            emissiveIntensity={hovered ? 0.6 : 0.2}
          />
        </mesh>

        {/* Pin Head Sphere */}
        <mesh position={[0, 0.24, 0]} scale={hovered ? 1.3 : 1.0}>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshStandardMaterial
            color="#FFFFFF"
            emissive="#52B788"
            emissiveIntensity={0.8}
          />
        </mesh>

        {/* Animated Expanding Ripple Ring */}
        <mesh ref={ringRef} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.06, 0.12, 32]} />
          <meshBasicMaterial
            color="#52B788"
            transparent={true}
            opacity={0.7}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Floating Interactive 3D HTML Label Overlay */}
        <Html distanceFactor={8} position={[0.2, 0.35, 0]}>
          <div
            onClick={(e) => {
              e.stopPropagation();
              onPinClick();
            }}
            className={`backdrop-blur-xl bg-[#0A120E]/95 border border-[#52B788]/60 px-4 py-3 rounded-2xl text-white shadow-[0_0_30px_rgba(82,183,136,0.4)] whitespace-nowrap cursor-pointer transition-all duration-300 transform ${
              hovered ? 'scale-110 border-[#52B788]' : 'scale-100'
            }`}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-[#52B788] animate-ping" />
              <span className="font-serif font-bold text-[#52B788] text-xs">
                Brighton Decor — Saskatoon HQ
              </span>
            </div>
            <div className="flex items-center justify-between gap-3">
              <span className="text-[9px] uppercase tracking-wider text-white/70 font-mono">
                52.1332° N, 106.6346° W
              </span>
              <span className="text-[9px] font-bold uppercase tracking-wider bg-[#52B788]/20 text-[#52B788] px-2 py-0.5 rounded-full border border-[#52B788]/40">
                Showroom & Studio ➔
              </span>
            </div>
          </div>
        </Html>
      </group>

    </group>
  );
}

// 4. Skeleton Loader for Suspense Fallback
function GlobeSkeletonLoader() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-[#0A120E] text-white">
      <div className="w-16 h-16 rounded-full border-2 border-[#52B788]/20 border-t-[#52B788] animate-spin mb-4" />
      <span className="text-xs uppercase tracking-[0.25em] text-[#52B788] font-mono font-bold animate-pulse">
        Rendering Photorealistic 3D Earth...
      </span>
    </div>
  );
}

// 5. Main Export Component
const WorldGlobe = () => {
  const handleOpenGoogleMaps = () => {
    window.open("https://maps.google.com/?q=Saskatoon,+SK,+Canada", "_blank", "noopener,noreferrer");
  };

  return (
    <div className="relative w-full h-[440px] md:h-[540px] rounded-3xl overflow-hidden border border-[#52B788]/35 bg-gradient-to-b from-[#0A120E] via-[#0E1E17] to-[#0A120E] backdrop-blur-2xl shadow-[0_30px_90px_rgba(0,0,0,0.85)]">
      
      {/* Header Badge */}
      <div className="absolute top-6 left-6 z-10 pointer-events-none">
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-black/60 border border-[#52B788]/40 backdrop-blur-md">
          <div className="w-2.5 h-2.5 rounded-full bg-[#52B788] animate-pulse" />
          <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#52B788] font-sans">
            Photorealistic 3D Earth · Click Pin for Location
          </span>
        </div>
      </div>

      {/* R3F Canvas Container */}
      <Suspense fallback={<GlobeSkeletonLoader />}>
        <Canvas
          camera={{ position: [0, 0, 5.2], fov: 45 }}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        >
          {/* Deep Space Background Stars */}
          <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade />

          {/* Physically Based Lighting */}
          <ambientLight intensity={0.4} color="#0A0D14" />
          <directionalLight position={[5, 3, 5]} intensity={2.5} color="#FFF9E6" castShadow />
          <pointLight position={[-5, -3, -5]} intensity={0.6} color="#52B788" />

          {/* Floating Subtle Motion */}
          <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.25}>
            <PhotorealisticEarth onPinClick={handleOpenGoogleMaps} />
          </Float>

          {/* Interactive Orbit Controls */}
          <OrbitControls
            enablePan={false}
            minDistance={3.2}
            maxDistance={7.0}
            autoRotate={true}
            autoRotateSpeed={0.4}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI - Math.PI / 4}
          />
        </Canvas>
      </Suspense>

      {/* Bottom Info Strip */}
      <div className="absolute bottom-6 left-6 right-6 z-10 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-black/80 border border-[#52B788]/35 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#52B788]/20 border border-[#52B788]/50 flex items-center justify-center text-[#52B788] font-serif font-bold text-sm">
            SK
          </div>
          <div>
            <div className="text-white text-xs font-serif font-bold">Flagship Showroom & HQ</div>
            <div className="text-white/60 text-[10px] font-sans">Click 3D Pin to Open Google Maps Directions</div>
          </div>
        </div>

        <button
          onClick={handleOpenGoogleMaps}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#52B788] hover:bg-white text-[#0A120E] text-[11px] font-bold uppercase tracking-widest font-sans transition-all shadow-[0_0_20px_rgba(82,183,136,0.4)]"
        >
          <span>Open Google Maps</span>
          <span>➔</span>
        </button>
      </div>

    </div>
  );
};

export default WorldGlobe;
