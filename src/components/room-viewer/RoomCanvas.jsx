import React, { Suspense, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
    OrbitControls, 
    PerspectiveCamera, 
    Environment, 
    ContactShadows, 
    RoundedBox,
    Line
} from '@react-three/drei';
import { 
    EffectComposer, 
    SSAO, 
    Bloom, 
    Vignette
} from '@react-three/postprocessing';
import * as THREE from 'three';

// --- ArchViz Physical Floor Parameters ---
const floorProperties = {
    lightoak:    { color: '#C8A882', roughness: 0.35, metalness: 0.05, clearcoat: 0.2, clearcoatRoughness: 0.2 },
    darkwalnut:  { color: '#4A3520', roughness: 0.28, metalness: 0.05, clearcoat: 0.3, clearcoatRoughness: 0.15 },
    marble:      { color: '#E8E4E0', roughness: 0.12, metalness: 0.02, clearcoat: 0.8, clearcoatRoughness: 0.08 },
    concrete:    { color: '#8A8A8A', roughness: 0.65, metalness: 0.02, clearcoat: 0.0, clearcoatRoughness: 0.5 },
    herringbone: { color: '#B8986A', roughness: 0.32, metalness: 0.05, clearcoat: 0.25, clearcoatRoughness: 0.18 },
    darktile:    { color: '#2A2A2A', roughness: 0.2,  metalness: 0.08, clearcoat: 0.5, clearcoatRoughness: 0.1 }
};

// --- ArchViz Lighting Mood Configurations ---
const lightMoods = {
    warm:   { ambI: 0.4, ptI: 2.0, ptC: '#FFD9A0', sunI: 3.2, sunC: '#FFF3E0', envI: 0.8 },
    cool:   { ambI: 0.4, ptI: 1.6, ptC: '#D0E8FF', sunI: 2.8, sunC: '#E8F4FF', envI: 0.7 },
    bright: { ambI: 0.6, ptI: 2.5, ptC: '#FFFFFF', sunI: 4.2, sunC: '#FFFFFF', envI: 1.1 },
    dim:    { ambI: 0.2, ptI: 0.8, ptC: '#FF9040', sunI: 1.0, sunC: '#FF7020', envI: 0.3 }
};

// --- Sub-components ---

const CeilingFan = ({ active }) => {
    const bladesRef = useRef();
    useFrame((state, delta) => {
        if (active && bladesRef.current) {
            bladesRef.current.rotation.y += delta * 5;
        }
    });

    const bodyMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#222222', roughness: 0.3, metalness: 0.8 }), []);
    const bladeMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#C8A882', roughness: 0.4, metalness: 0.1 }), []);

    return (
        <group position={[0, 6.9, -2.5]}>
            <mesh position={[0, -0.08, 0]} material={bodyMat} castShadow>
                <boxGeometry args={[0.2, 0.15, 0.2]} />
            </mesh>
            <mesh position={[0, -0.23, 0]} material={bodyMat} castShadow>
                <cylinderGeometry args={[0.025, 0.025, 0.3, 12]} />
            </mesh>
            <group ref={bladesRef} position={[0, -0.4, 0]}>
                {[0, 1, 2, 3].map(i => (
                    <mesh key={i} rotation={[0, (i * Math.PI) / 2, 0]} position={[0.55, 0, 0]} material={bladeMat} castShadow receiveShadow>
                        <boxGeometry args={[1.1, 0.02, 0.22]} />
                    </mesh>
                ))}
            </group>
        </group>
    );
};

const Sofa = ({ style, color }) => {
    const material = useMemo(() => new THREE.MeshStandardMaterial({
        color,
        roughness: 0.75,
        metalness: 0.05
    }), [color]);

    const legMaterial = useMemo(() => new THREE.MeshStandardMaterial({
        color: '#1A1A1A',
        roughness: 0.3,
        metalness: 0.8
    }), []);

    const buttonMaterial = useMemo(() => new THREE.MeshStandardMaterial({
        color,
        roughness: 0.4
    }), [color]);

    if (style === 'chesterfield') {
        return (
            <group position={[0, 0, -1.5]}>
                <RoundedBox args={[3.0, 0.55, 1.1]} radius={0.15} smoothness={4} position={[0, 0.35, 0]} material={material} castShadow receiveShadow />
                <RoundedBox args={[3.0, 0.8, 0.25]} radius={0.12} smoothness={4} position={[0, 0.9, -0.4]} material={material} castShadow receiveShadow />
                <RoundedBox args={[0.28, 0.75, 1.1]} radius={0.12} smoothness={4} position={[-1.64, 0.65, 0]} material={material} castShadow receiveShadow />
                <RoundedBox args={[0.28, 0.75, 1.1]} radius={0.12} smoothness={4} position={[1.64, 0.65, 0]} material={material} castShadow receiveShadow />
                {/* Tufted Buttons */}
                {[[-1, 0.8], [0, 0.8], [1, 0.8], [-1, 1.0], [0, 1.0], [1, 1.0]].map((p, i) => (
                    <mesh key={i} position={[p[0], p[1], -0.28]} material={buttonMaterial} castShadow>
                        <sphereGeometry args={[0.03, 8, 8]} />
                    </mesh>
                ))}
            </group>
        );
    }

    if (style === 'curved') {
        return (
            <group position={[0, 0, -1.5]}>
                <mesh rotation={[Math.PI / 2, 0, Math.PI / 4.3]} position={[0, 0.3, -0.2]} material={material} castShadow receiveShadow>
                    <torusGeometry args={[1.8, 0.3, 16, 64, Math.PI / 1.5]} />
                </mesh>
                <mesh rotation={[0, 0, Math.PI / 4.3]} position={[0, 0.8, -0.4]} material={material} castShadow receiveShadow>
                    <torusGeometry args={[1.8, 0.4, 16, 64, Math.PI / 1.5]} />
                </mesh>
            </group>
        );
    }

    // Default: Modern Sofa
    return (
        <group position={[0, 0, -1.5]}>
            <RoundedBox args={[3.2, 0.5, 1.0]} radius={0.08} smoothness={4} position={[0, 0.35, 0]} material={material} castShadow receiveShadow />
            <RoundedBox args={[3.2, 0.7, 0.2]} radius={0.05} smoothness={4} position={[0, 0.9, -0.4]} material={material} castShadow receiveShadow />
            <RoundedBox args={[0.2, 0.6, 1.0]} radius={0.05} smoothness={4} position={[-1.6, 0.55, 0]} material={material} castShadow receiveShadow />
            <RoundedBox args={[0.2, 0.6, 1.0]} radius={0.05} smoothness={4} position={[1.6, 0.55, 0]} material={material} castShadow receiveShadow />
            {/* Wooden / Brass Legs */}
            {[-1.4, 1.4].map(x => [-0.4, 0.4].map(z => (
                <mesh key={`${x}-${z}`} position={[x, 0.15, z]} material={legMaterial} castShadow>
                    <cylinderGeometry args={[0.04, 0.03, 0.3, 12]} />
                </mesh>
            )))}
        </group>
    );
};

const Blinds = ({ type, open }) => {
    return useMemo(() => {
        const maxH = 1.95;
        const currentH = Math.max(0.12, maxH * (1 - open));
        const topY = 0.95; // relative to window center [0, 4.2, -4.9]
        const bottomY = topY - currentH;
        const centerY = topY - (currentH / 2);

        const cassetteMat = new THREE.MeshStandardMaterial({
            color: type === 'wooden' ? '#4A3520' : '#25221F',
            metalness: 0.6,
            roughness: 0.35
        });

        const bottomRailMat = new THREE.MeshStandardMaterial({
            color: type === 'wooden' ? '#4A3520' : '#1C1B19',
            metalness: 0.6,
            roughness: 0.35
        });

        const TopCassette = (
            <mesh position={[0, topY + 0.05, 0.02]} material={cassetteMat} castShadow receiveShadow>
                <boxGeometry args={[2.42, 0.1, 0.1]} />
            </mesh>
        );

        const BottomRail = (
            <mesh position={[0, bottomY - 0.02, 0.02]} material={bottomRailMat} castShadow receiveShadow>
                <boxGeometry args={[2.35, 0.04, 0.05]} />
            </mesh>
        );

        switch (type) {
            case 'roller': {
                const rollerMat = new THREE.MeshStandardMaterial({
                    color: '#E8E0D4',
                    roughness: 0.65,
                    metalness: 0.02,
                    transparent: true,
                    opacity: 0.94,
                    side: THREE.DoubleSide
                });

                return (
                    <group>
                        {TopCassette}
                        <mesh position={[0, centerY, 0.01]} material={rollerMat} castShadow receiveShadow>
                            <planeGeometry args={[2.3, currentH]} />
                        </mesh>
                        {BottomRail}
                    </group>
                );
            }
            case 'zebra': {
                const numStrips = 11;
                const stripH = currentH / numStrips;
                const opaqueMat = new THREE.MeshStandardMaterial({ color: '#D6CFC4', roughness: 0.5, opacity: 0.95, transparent: true, side: THREE.DoubleSide });
                const sheerMat = new THREE.MeshStandardMaterial({ color: '#F8F6F0', roughness: 0.2, opacity: 0.35, transparent: true, side: THREE.DoubleSide });

                return (
                    <group>
                        {TopCassette}
                        <group position={[0, 0, 0.02]}>
                            {[...Array(numStrips)].map((_, i) => (
                                <mesh key={`front-${i}`} position={[0, topY - (i + 0.5) * stripH, 0]} material={i % 2 === 0 ? opaqueMat : sheerMat} castShadow receiveShadow>
                                    <planeGeometry args={[2.3, stripH * 0.95]} />
                                </mesh>
                            ))}
                        </group>
                        <group position={[0, 0, -0.01]}>
                            {[...Array(numStrips)].map((_, i) => (
                                <mesh key={`back-${i}`} position={[0, topY - (i + 0.5) * stripH, 0]} material={i % 2 === 0 ? sheerMat : opaqueMat} castShadow receiveShadow>
                                    <planeGeometry args={[2.3, stripH * 0.95]} />
                                </mesh>
                            ))}
                        </group>
                        {BottomRail}
                    </group>
                );
            }
            case 'honeycomb': {
                const pleatCount = Math.max(4, Math.floor(currentH / 0.12));
                const pleatsMat = new THREE.MeshStandardMaterial({ color: '#D8CDBA', roughness: 0.75, opacity: 0.9, transparent: true });

                return (
                    <group>
                        {TopCassette}
                        <group position={[0, 0, 0.01]}>
                            {[...Array(pleatCount)].map((_, i) => (
                                <mesh key={i} position={[0, topY - (i + 0.5) * (currentH / pleatCount), 0]} material={pleatsMat} castShadow receiveShadow>
                                    <boxGeometry args={[2.3, (currentH / pleatCount) * 0.85, 0.05]} />
                                </mesh>
                            ))}
                        </group>
                        {BottomRail}
                    </group>
                );
            }
            case 'vertical': {
                const numVanes = 12;
                const vaneWidth = 0.22;
                const vaneMat = new THREE.MeshStandardMaterial({ color: '#D4CDC2', roughness: 0.55, side: THREE.DoubleSide });
                const vaneAngle = open * Math.PI * 0.45;

                return (
                    <group>
                        {TopCassette}
                        <group position={[0, 0, 0.02]}>
                            {[...Array(numVanes)].map((_, i) => {
                                const xPos = -1.15 + (i + 0.5) * (2.3 / numVanes);
                                return (
                                    <mesh key={i} position={[xPos, topY - (maxH / 2), 0]} rotation-y={vaneAngle} material={vaneMat} castShadow receiveShadow>
                                        <boxGeometry args={[vaneWidth, maxH, 0.01]} />
                                    </mesh>
                                );
                            })}
                        </group>
                    </group>
                );
            }
            case 'wooden': {
                const slatCount = Math.max(4, Math.floor(currentH / 0.15));
                const woodMat = new THREE.MeshStandardMaterial({ color: '#7C5228', roughness: 0.35, metalness: 0.08 });
                const tapeMat = new THREE.MeshStandardMaterial({ color: '#3A2718', roughness: 0.8 });
                const slatAngle = -0.3 + open * 0.65;

                return (
                    <group>
                        {TopCassette}
                        <group position={[0, 0, 0.02]}>
                            {[...Array(slatCount)].map((_, i) => (
                                <mesh key={i} position={[0, topY - (i + 0.5) * (currentH / slatCount), 0]} rotation-x={slatAngle} material={woodMat} castShadow receiveShadow>
                                    <boxGeometry args={[2.35, 0.1, 0.02]} />
                                </mesh>
                            ))}
                            {[-0.7, 0.7].map((tx, idx) => (
                                <mesh key={idx} position={[tx, centerY, 0.025]} material={tapeMat} castShadow>
                                    <boxGeometry args={[0.04, currentH, 0.005]} />
                                </mesh>
                            ))}
                        </group>
                        {BottomRail}
                    </group>
                );
            }
            case 'pvc': {
                const slatCount = Math.max(4, Math.floor(currentH / 0.14));
                const pvcMat = new THREE.MeshStandardMaterial({ color: '#F9F8F6', roughness: 0.2, metalness: 0.04 });
                const slatAngle = -0.25 + open * 0.55;

                return (
                    <group>
                        {TopCassette}
                        <group position={[0, 0, 0.02]}>
                            {[...Array(slatCount)].map((_, i) => (
                                <mesh key={i} position={[0, topY - (i + 0.5) * (currentH / slatCount), 0]} rotation-x={slatAngle} material={pvcMat} castShadow receiveShadow>
                                    <boxGeometry args={[2.35, 0.09, 0.015]} />
                                </mesh>
                            ))}
                        </group>
                        {BottomRail}
                    </group>
                );
            }
            default: return null;
        }
    }, [type, open]);
};

const Curtains = ({ color, open }) => {
    const xPos = 1.5 - open * 0.8;
    const curtainMat = useMemo(() => new THREE.MeshStandardMaterial({
        color,
        roughness: 0.8,
        metalness: 0.02
    }), [color]);

    return (
        <group position={[0, 4.2, -4.87]}>
            {/* Left Panel */}
            <mesh position={[-xPos, 0, 0]} material={curtainMat} castShadow receiveShadow>
                <boxGeometry args={[0.6, 2.2, 0.05]} />
            </mesh>
            {/* Right Panel */}
            <mesh position={[xPos, 0, 0]} material={curtainMat} castShadow receiveShadow>
                <boxGeometry args={[0.6, 2.2, 0.05]} />
            </mesh>
        </group>
    );
};

const Rug = ({ color, pattern }) => {
    const rugMat = useMemo(() => new THREE.MeshStandardMaterial({
        color: color === 'none' ? '#000000' : color,
        roughness: 0.95,
        metalness: 0.0
    }), [color]);

    if (color === 'none') return null;

    return (
        <group position={[0, 0.006, -0.8]} rotation-x={-Math.PI / 2}>
            <mesh material={rugMat} receiveShadow>
                <planeGeometry args={[3.8, 2.5]} />
            </mesh>
            {/* Patterns */}
            {pattern === 'striped' && (
                <group position={[0, 0, 0.001]}>
                    {[-1.5, -0.75, 0, 0.75, 1.5].map(x => (
                        <mesh key={x} position={[x, 0, 0]}>
                            <planeGeometry args={[0.1, 2.5]} />
                            <meshStandardMaterial color="#C9A55A" opacity={0.35} transparent roughness={0.8} />
                        </mesh>
                    ))}
                </group>
            )}
            {pattern === 'geometric' && (
                <Line points={[[-1, -1, 0.01], [1, -1, 0.01], [0, 1, 0.01], [-1, -1, 0.01]]} color="#C9A55A" lineWidth={1.5} transparent opacity={0.25} />
            )}
            {pattern === 'ornate' && (
                <mesh position={[0, 0, 0.01]}>
                    <ringGeometry args={[0.8, 1.0, 32]} />
                    <meshStandardMaterial color="#C9A55A" opacity={0.25} transparent roughness={0.8} />
                </mesh>
            )}
        </group>
    );
};

const IndoorPlant = ({ enabled }) => {
    const potMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#8B6340', roughness: 0.35 }), []);
    const soilMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#3A2810', roughness: 0.95 }), []);
    const stemMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#2D5A1B', roughness: 0.6 }), []);

    if (!enabled) return null;
    return (
        <group position={[-4.2, 0, -4.2]}>
            <mesh position={[0, 0.22, 0]} material={potMat} castShadow receiveShadow>
                <cylinderGeometry args={[0.22, 0.28, 0.45, 16]} />
            </mesh>
            <mesh position={[0, 0.46, 0]} material={soilMat} receiveShadow>
                <cylinderGeometry args={[0.21, 0.21, 0.03, 16]} />
            </mesh>
            <group position={[0, 0.5, 0]}>
                {[0.8, 1.0, 1.2].map((h, i) => (
                    <group key={i} rotation={[0, (i * Math.PI * 2) / 3, 0]}>
                        <mesh position={[0, h/2, 0]} rotation={[0.1, 0, 0.1]} material={stemMat} castShadow>
                            <cylinderGeometry args={[0.02, 0.02, h, 6]} />
                        </mesh>
                        <mesh position={[0.2, h, 0.2]} rotation={[0.5, 0, 0.5]} castShadow receiveShadow>
                            <sphereGeometry args={[0.3, 12, 12]} />
                            <meshStandardMaterial color={['#3A7A2A', '#2D6A1F', '#4A8A35'][i]} roughness={0.4} />
                        </mesh>
                    </group>
                ))}
            </group>
        </group>
    );
};

const Decor = ({ enabled, wallColor }) => {
    const shelfMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#6B4A2A', roughness: 0.4 }), []);
    const shelfInnerMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#4A3520', roughness: 0.5 }), []);
    const brassVaseMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#C9A55A', metalness: 0.85, roughness: 0.18 }), []);

    if (!enabled) return null;
    return (
        <group>
            {/* Wall Art */}
            <group position={[0, 5.2, -4.95]}>
                <mesh castShadow receiveShadow>
                    <boxGeometry args={[1.0, 0.7, 0.03]} />
                    <meshStandardMaterial color="#C4956A" roughness={0.4} />
                </mesh>
                <mesh position={[0, 0, 0.02]}>
                    <planeGeometry args={[0.88, 0.58]} />
                    <meshStandardMaterial color="#E8DCC8" roughness={0.7} />
                </mesh>
            </group>
            {/* Bookshelf */}
            <group position={[4.7, 0.7, -3.5]}>
                <mesh material={shelfMat} castShadow receiveShadow>
                    <boxGeometry args={[0.6, 1.4, 0.3]} />
                </mesh>
                {[0.4, 0, -0.4].map(y => (
                    <mesh key={y} position={[0, y, 0]} material={shelfInnerMat} castShadow receiveShadow>
                        <boxGeometry args={[0.58, 0.03, 0.28]} />
                    </mesh>
                ))}
            </group>
            {/* Coffee Table Items */}
            <group position={[0, 0.51, 1.5]}>
                 <mesh material={brassVaseMat} castShadow receiveShadow>
                    <cylinderGeometry args={[0.06, 0.08, 0.28, 16]} />
                 </mesh>
            </group>
        </group>
    );
};

// --- Main Architectural Scene Component ---

const Room = ({ roomState }) => {
    const mood = lightMoods[roomState.lightMode] || lightMoods.warm;
    const floorConfig = floorProperties[roomState.floorType] || floorProperties.lightoak;

    // Custom material for floor with realistic roughness & clearcoat
    const floorMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({
        color: floorConfig.color,
        roughness: floorConfig.roughness,
        metalness: floorConfig.metalness,
        clearcoat: floorConfig.clearcoat,
        clearcoatRoughness: floorConfig.clearcoatRoughness
    }), [floorConfig]);

    // Wall material with realistic matte paint finish
    const wallMaterial = useMemo(() => new THREE.MeshStandardMaterial({
        color: roomState.wallColor,
        roughness: 0.85,
        metalness: 0.0
    }), [roomState.wallColor]);

    // Ceiling material
    const ceilingMaterial = useMemo(() => new THREE.MeshStandardMaterial({
        color: '#F8F6F2',
        roughness: 0.9,
        metalness: 0.0
    }), []);

    // Window Glass Material
    const glassMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({
        color: '#A8D4F0',
        transmission: 0.9,
        opacity: 0.3,
        transparent: true,
        roughness: 0.05,
        ior: 1.5
    }), []);

    // Coffee Table Material
    const tableTopMat = useMemo(() => new THREE.MeshPhysicalMaterial({
        color: floorConfig.color,
        roughness: floorConfig.roughness,
        clearcoat: floorConfig.clearcoat,
        clearcoatRoughness: floorConfig.clearcoatRoughness
    }), [floorConfig]);

    const brassLegMat = useMemo(() => new THREE.MeshStandardMaterial({
        color: '#C9A55A',
        metalness: 0.85,
        roughness: 0.2
    }), []);

    return (
        <group>
            {/* Room Shell: Floor */}
            <mesh rotation-x={-Math.PI / 2} position-y={0} material={floorMaterial} receiveShadow>
                <planeGeometry args={[10, 10]} />
            </mesh>

            {/* Room Shell: Back Wall */}
            <mesh position={[0, 3.5, -5]} material={wallMaterial} receiveShadow>
                <planeGeometry args={[10, 7]} />
            </mesh>

            {/* Room Shell: Left Wall */}
            <mesh position={[-5, 3.5, 0]} rotation-y={Math.PI / 2} material={wallMaterial} receiveShadow>
                <planeGeometry args={[10, 7]} />
            </mesh>

            {/* Room Shell: Right Wall */}
            <mesh position={[5, 3.5, 0]} rotation-y={-Math.PI / 2} material={wallMaterial} receiveShadow>
                <planeGeometry args={[10, 7]} />
            </mesh>

            {/* Room Shell: Ceiling */}
            <mesh position={[0, 7, 0]} rotation-x={Math.PI / 2} material={ceilingMaterial} receiveShadow>
                <planeGeometry args={[10, 10]} />
            </mesh>

            {/* Window Frame & Outdoor Opening at position [0, 4.2, -4.9] */}
            <group position={[0, 4.2, -4.9]}>
                {/* Window Outer Casing */}
                <mesh position={[0, 0, -0.05]} castShadow receiveShadow>
                    <boxGeometry args={[2.45, 2.05, 0.08]} />
                    <meshStandardMaterial color="#3D2B1F" roughness={0.35} metalness={0.2} />
                </mesh>
                {/* Window Glass Pane */}
                <mesh position={[0, 0, 0.01]} material={glassMaterial}>
                    <planeGeometry args={[2.3, 1.9]} />
                </mesh>
                <Blinds type={roomState.blindType} open={roomState.curtainOpen} />
                <Curtains color={roomState.curtainColor} open={roomState.curtainOpen} />
            </group>

            {/* Furniture */}
            <Sofa style={roomState.sofaStyle} color={roomState.sofaColor} />
            
            {/* Coffee Table */}
            <group position={[0, 0.45, 1.5]}>
                <RoundedBox args={[1.6, 0.06, 0.9]} radius={0.03} smoothness={4} material={tableTopMat} castShadow receiveShadow />
                {[[-0.7, -0.4], [0.7, -0.4], [-0.7, 0.4], [0.7, 0.4]].map((p, i) => (
                    <mesh key={i} position={[p[0], -0.22, p[1]]} material={brassLegMat} castShadow receiveShadow>
                        <cylinderGeometry args={[0.02, 0.02, 0.44, 12]} />
                    </mesh>
                ))}
            </group>

            <Rug color={roomState.rugColor} pattern={roomState.rugPattern} />
            <IndoorPlant enabled={roomState.plantOn} />
            <Decor enabled={roomState.decorOn} wallColor={roomState.wallColor} />
            <CeilingFan active={roomState.fanOn} />

            {/* Ambient & Environment Fill Light */}
            <ambientLight intensity={mood.ambI} />
            <Environment preset="city" environmentIntensity={mood.envI} />

            {/* Main Directional Sunlight streaming through window frame at [0, 4.2, -4.9] */}
            <directionalLight
                position={[1.8, 5.8, -4.7]}
                target-position={[0, 1.0, 0]}
                intensity={mood.sunI}
                color={mood.sunC}
                castShadow
                shadow-mapSize={[2048, 2048]}
                shadow-bias={-0.0001}
                shadow-camera-near={0.5}
                shadow-camera-far={18}
                shadow-camera-left={-6}
                shadow-camera-right={6}
                shadow-camera-top={6}
                shadow-camera-bottom={-6}
            />

            {/* Dynamic Room Interior Lighting */}
            {roomState.ceilingLightOn && (
                <group position={[0, 6.3, -2]}>
                    <pointLight 
                        intensity={mood.ptI} 
                        color={mood.ptC} 
                        distance={12} 
                        decay={2}
                        castShadow 
                        shadow-mapSize={[1024, 1024]}
                        shadow-bias={-0.0001}
                    />
                    <mesh position={[0, 0.2, 0]} castShadow>
                        <cylinderGeometry args={[0.01, 0.01, 0.6, 8]} />
                        <meshStandardMaterial color="#1A1A1A" metalness={0.8} />
                    </mesh>
                    <mesh rotation={[Math.PI, 0, 0]} position={[0, -0.1, 0]} castShadow>
                        <coneGeometry args={[0.35, 0.4, 16]} />
                        <meshStandardMaterial 
                            color="#C9A55A" 
                            metalness={0.85} 
                            roughness={0.2} 
                            emissive={mood.ptC} 
                            emissiveIntensity={0.3} 
                        />
                    </mesh>
                </group>
            )}

            {roomState.floorLampOn && (
                <group position={[-3.8, 0, -1.5]}>
                    <mesh position={[0, 0.05, 0]} castShadow>
                        <cylinderGeometry args={[0.12, 0.18, 0.1, 16]} />
                        <meshStandardMaterial color="#4A3520" roughness={0.4} />
                    </mesh>
                    <mesh position={[0, 0.9, 0]} castShadow>
                        <cylinderGeometry args={[0.03, 0.03, 1.7, 12]} />
                        <meshStandardMaterial color="#8B7355" metalness={0.7} roughness={0.3} />
                    </mesh>
                    <pointLight 
                        position={[0.3, 1.8, 0]} 
                        intensity={1.5} 
                        color="#FFF0D0" 
                        distance={8} 
                        decay={2}
                        castShadow 
                    />
                    <mesh position={[0.3, 1.6, 0]} rotation={[Math.PI, 0, 0]} castShadow>
                        <coneGeometry args={[0.28, 0.35, 16]} />
                        <meshStandardMaterial 
                            color="#F5F0E8" 
                            roughness={0.6}
                            emissive="#FFF0D0" 
                            emissiveIntensity={0.6} 
                        />
                    </mesh>
                </group>
            )}
        </group>
    );
};

// --- RoomCanvas Top-Level Renderer ---

const RoomCanvas = ({ roomState }) => {
    return (
        <Canvas 
            shadows
            dpr={[1, 2]}
            gl={{ 
                toneMapping: THREE.ACESFilmicToneMapping, 
                toneMappingExposure: 1.15,
                outputColorSpace: THREE.SRGBColorSpace,
                shadowMap: { enabled: true, type: THREE.PCFSoftShadowMap },
                antialias: true
            }}
        >
            <Suspense fallback={null}>
                <PerspectiveCamera makeDefault fov={55} position={[0, 3.5, 8]} />
                <OrbitControls 
                    enableDamping
                    dampingFactor={0.05}
                    maxPolarAngle={Math.PI / 2.1} 
                    minPolarAngle={0.3}
                    minDistance={4} 
                    maxDistance={11} 
                    enablePan={false} 
                    target={[0, 2.5, 0]} 
                />
                
                <Room roomState={roomState} />
                
                <ContactShadows 
                    position={[0, 0.001, 0]} 
                    opacity={0.4} 
                    scale={15} 
                    blur={2.5} 
                    far={10} 
                    resolution={1024} 
                />

                {/* ArchViz Post-Processing Effects Pipeline */}
                <EffectComposer multisampling={0} disableNormalPass={false}>
                    <SSAO 
                        samples={21}
                        radius={0.04} 
                        intensity={15} 
                        luminanceInfluence={0.5} 
                        color="#000000" 
                    />
                    <Bloom 
                        luminanceThreshold={0.85} 
                        intensity={0.4} 
                        mipmapBlur 
                    />
                    <Vignette 
                        offset={0.2} 
                        darkness={0.5} 
                        eskil={false} 
                    />
                </EffectComposer>
            </Suspense>
        </Canvas>
    );
};

export default RoomCanvas;
