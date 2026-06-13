import React, { Suspense, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
    OrbitControls, 
    PerspectiveCamera, 
    Environment, 
    ContactShadows, 
    RoundedBox, 
    Cylinder, 
    Cone, 
    Torus,
    Float,
    Line
} from '@react-three/drei';
import * as THREE from 'three';

const floorColors = {
    lightoak: '#C8A882',
    darkwalnut: '#4A3520',
    marble: '#E8E4E0',
    concrete: '#8A8A8A',
    herringbone: '#B8986A',
    darktile: '#2A2A2A'
};

const lightMoods = {
    warm:   { ambI: 0.4, ptI: 1.4, ptC: '#FFD9A0' },
    cool:   { ambI: 0.4, ptI: 1.2, ptC: '#D0E8FF' },
    bright: { ambI: 0.6, ptI: 2.0, ptC: '#FFFFFF' },
    dim:    { ambI: 0.2, ptI: 0.5, ptC: '#FF9040' }
};

// --- Sub-components ---

const CeilingFan = ({ active }) => {
    const bladesRef = useRef();
    useFrame((state, delta) => {
        if (active && bladesRef.current) {
            bladesRef.current.rotation.y += delta * 5;
        }
    });

    return (
        <group position={[0, 6.9, -2.5]}>
            <mesh position={[0, -0.08, 0]}>
                <boxGeometry args={[0.2, 0.15, 0.2]} />
                <meshStandardMaterial color="#333" />
            </mesh>
            <mesh position={[0, -0.23, 0]}>
                <cylinderGeometry args={[0.025, 0.025, 0.3, 6]} />
                <meshStandardMaterial color="#333" />
            </mesh>
            <group ref={bladesRef} position={[0, -0.4, 0]}>
                {[0, 1, 2, 3].map(i => (
                    <mesh key={i} rotation={[0, (i * Math.PI) / 2, 0]} position={[0.55, 0, 0]}>
                        <boxGeometry args={[1.1, 0.02, 0.22]} />
                        <meshStandardMaterial color="#C8A882" />
                    </mesh>
                ))}
            </group>
        </group>
    );
};

const Sofa = ({ style, color }) => {
    const group = useRef();
    
    return useMemo(() => {
        const material = new THREE.MeshStandardMaterial({ color, roughness: 0.8 });
        
        if (style === 'chesterfield') {
            return (
                <group position={[0, 0, -1.5]}>
                    <RoundedBox args={[3.0, 0.55, 1.1]} radius={0.15} smoothness={8} position={[0, 0.35, 0]} material={material} />
                    <RoundedBox args={[3.0, 0.8, 0.25]} radius={0.12} smoothness={8} position={[0, 0.9, -0.4]} material={material} />
                    <RoundedBox args={[0.28, 0.75, 1.1]} radius={0.12} smoothness={8} position={[-1.64, 0.65, 0]} material={material} />
                    <RoundedBox args={[0.28, 0.75, 1.1]} radius={0.12} smoothness={8} position={[1.64, 0.65, 0]} material={material} />
                    {/* Fake Buttons */}
                    {[[-1, 0.8], [0, 0.8], [1, 0.8], [-1, 1.0], [0, 1.0], [1, 1.0]].map((p, i) => (
                        <mesh key={i} position={[p[0], p[1], -0.28]}>
                            <sphereGeometry args={[0.03]} />
                            <meshStandardMaterial color={color} roughness={0.4} />
                        </mesh>
                    ))}
                </group>
            );
        }

        if (style === 'curved') {
            return (
                <group position={[0, 0, -1.5]}>
                    <Torus args={[1.8, 0.3, 16, 100, Math.PI / 1.5]} rotation={[Math.PI / 2, 0, Math.PI / 4.3]} position={[0, 0.3, -0.2]} material={material} />
                    <Torus args={[1.8, 0.4, 16, 100, Math.PI / 1.5]} rotation={[0, 0, Math.PI / 4.3]} position={[0, 0.8, -0.4]} material={material} />
                </group>
            );
        }

        return (
            <group position={[0, 0, -1.5]}>
                <RoundedBox args={[3.2, 0.5, 1.0]} radius={0.08} smoothness={4} position={[0, 0.35, 0]} material={material} />
                <RoundedBox args={[3.2, 0.7, 0.2]} radius={0.05} smoothness={4} position={[0, 0.9, -0.4]} material={material} />
                <RoundedBox args={[0.2, 0.6, 1.0]} radius={0.05} smoothness={4} position={[-1.6, 0.55, 0]} material={material} />
                <RoundedBox args={[0.2, 0.6, 1.0]} radius={0.05} smoothness={4} position={[1.6, 0.55, 0]} material={material} />
                {/* Legs */}
                {[-1.4, 1.4].map(x => [-0.4, 0.4].map(z => (
                    <mesh key={`${x}-${z}`} position={[x, 0.15, z]}>
                        <cylinderGeometry args={[0.05, 0.05, 0.3, 8]} />
                        <meshStandardMaterial color="#333" />
                    </mesh>
                )))}
            </group>
        );
    }, [style, color]);
};

const Blinds = ({ type, open }) => {
    return useMemo(() => {
        const height = 1.8 * (1 - open);
        const yPos = 4.2 + (0.9 * open);
        const material = new THREE.MeshStandardMaterial({ color: '#E8E0D4', opacity: 0.92, transparent: true });

        switch (type) {
            case 'roller':
                return (
                    <mesh position={[0, yPos, -4.88]}>
                        <planeGeometry args={[2.2, height]} />
                        <primitive object={material} attach="material" />
                    </mesh>
                );
            case 'zebra':
                return (
                    <group position={[0, 4.2, -4.88]}>
                        {[...Array(9)].map((_, i) => (
                            Math.ceil(9 * (1 - open)) > i && (
                                <mesh key={i} position={[0, 0.8 - i * 0.2, 0]}>
                                    <planeGeometry args={[2.2, 0.18]} />
                                    <meshStandardMaterial color="#D4CFC8" opacity={i % 2 === 0 ? 0.9 : 0.3} transparent />
                                </mesh>
                            )
                        ))}
                    </group>
                );
            case 'honeycomb':
                return (
                    <mesh position={[0, yPos, -4.88]}>
                        <planeGeometry args={[2.2, height]} />
                        <meshStandardMaterial color="#D4C8B0" opacity={0.85} transparent />
                    </mesh>
                );
            case 'vertical':
                return (
                    <group position={[0, 4.2, -4.88]}>
                        {[...Array(11)].map((_, i) => (
                            <mesh key={i} position={[-1.1 + i * 0.22, 0, 0]} scale={[1, 1-open, 1]}>
                                <planeGeometry args={[0.2, 1.8]} />
                                <meshStandardMaterial color="#C8C0B4" />
                            </mesh>
                        ))}
                    </group>
                );
            case 'wooden':
                return (
                    <group position={[0, 4.2, -4.88]}>
                        {[...Array(7)].map((_, i) => (
                            <mesh key={i} position={[0, 0.75 - i * 0.25, 0]} rotation-x={-0.3 + open * 0.6}>
                                <planeGeometry args={[2.2, 0.22]} />
                                <meshStandardMaterial color="#8B6914" />
                            </mesh>
                        ))}
                    </group>
                );
            case 'pvc':
                return (
                    <mesh position={[0, yPos, -4.88]}>
                        <planeGeometry args={[2.2, height]} />
                        <meshStandardMaterial color="#FFFFFF" opacity={0.97} transparent />
                    </mesh>
                );
            default: return null;
        }
    }, [type, open]);
};

const Curtains = ({ color, open }) => {
    const xPos = 1.5 - open * 0.8;
    return (
        <group position={[0, 4.2, -4.87]}>
            {/* Left Panel */}
            <mesh position={[-xPos, 0, 0]}>
                <boxGeometry args={[0.6, 2.2, 0.05]} />
                <meshStandardMaterial color={color} />
            </mesh>
            {/* Right Panel */}
            <mesh position={[xPos, 0, 0]}>
                <boxGeometry args={[0.6, 2.2, 0.05]} />
                <meshStandardMaterial color={color} />
            </mesh>
        </group>
    );
};

const Rug = ({ color, pattern }) => {
    if (color === 'none') return null;
    return (
        <group position={[0, 0.005, -0.8]} rotation-x={-Math.PI / 2}>
            <mesh>
                <planeGeometry args={[3.8, 2.5]} />
                <meshStandardMaterial color={color} />
            </mesh>
            {/* Patterns */}
            {pattern === 'striped' && (
                <group position={[0, 0, 0.001]}>
                    {[-1.5, -0.75, 0, 0.75, 1.5].map(x => (
                        <mesh key={x} position={[x, 0, 0]}>
                            <planeGeometry args={[0.1, 2.5]} />
                            <meshStandardMaterial color="#C9A55A" opacity={0.3} transparent />
                        </mesh>
                    ))}
                </group>
            )}
            {pattern === 'geometric' && (
                <Line points={[[-1, -1, 0.01], [1, -1, 0.01], [0, 1, 0.01], [-1, -1, 0.01]]} color="#C9A55A" lineWidth={1} transparent opacity={0.2} />
            )}
            {pattern === 'ornate' && (
                <mesh position={[0, 0, 0.01]}>
                    <ringGeometry args={[0.8, 1.0, 32]} />
                    <meshStandardMaterial color="#C9A55A" opacity={0.2} transparent />
                </mesh>
            )}
        </group>
    );
};

const IndoorPlant = ({ enabled }) => {
    if (!enabled) return null;
    return (
        <group position={[-4.2, 0, -4.2]}>
            <mesh position={[0, 0.22, 0]}>
                <cylinderGeometry args={[0.22, 0.28, 0.45, 16]} />
                <meshStandardMaterial color="#8B6340" />
            </mesh>
            <mesh position={[0, 0.46, 0]}>
                <cylinderGeometry args={[0.21, 0.21, 0.03, 16]} />
                <meshStandardMaterial color="#3A2810" />
            </mesh>
            <group position={[0, 0.5, 0]}>
                {[0.8, 1.0, 1.2].map((h, i) => (
                    <group key={i} rotation={[0, (i * Math.PI * 2) / 3, 0]}>
                        <mesh position={[0, h/2, 0]} rotation={[0.1, 0, 0.1]}>
                            <cylinderGeometry args={[0.02, 0.02, h, 6]} />
                            <meshStandardMaterial color="#2D5A1B" />
                        </mesh>
                        <mesh position={[0.2, h, 0.2]} rotation={[0.5, 0, 0.5]}>
                            <sphereGeometry args={[0.3, 8, 8]} />
                            <meshStandardMaterial color={['#3A7A2A', '#2D6A1F', '#4A8A35'][i]} />
                        </mesh>
                    </group>
                ))}
            </group>
        </group>
    );
};

const Decor = ({ enabled, wallColor }) => {
    if (!enabled) return null;
    return (
        <group>
            {/* Wall Art */}
            <group position={[0, 5.2, -4.95]}>
                <mesh>
                    <boxGeometry args={[1.0, 0.7, 0.03]} />
                    <meshStandardMaterial color="#C4956A" />
                </mesh>
                <mesh position={[0, 0, 0.02]}>
                    <planeGeometry args={[0.88, 0.58]} />
                    <meshStandardMaterial color="#E8DCC8" />
                </mesh>
            </group>
            {/* Bookshelf */}
            <group position={[4.7, 0.7, -3.5]}>
                <mesh>
                    <boxGeometry args={[0.6, 1.4, 0.3]} />
                    <meshStandardMaterial color="#6B4A2A" />
                </mesh>
                {[0.4, 0, -0.4].map(y => (
                    <mesh key={y} position={[0, y, 0]}>
                        <boxGeometry args={[0.58, 0.03, 0.28]} />
                        <meshStandardMaterial color="#4A3520" />
                    </mesh>
                ))}
            </group>
            {/* Coffee Table Items */}
            <group position={[0, 0.51, 1.5]}>
                 <mesh>
                    <cylinderGeometry args={[0.06, 0.08, 0.28, 16]} />
                    <meshStandardMaterial color="#C9A55A" metalness={0.8} roughness={0.2} />
                 </mesh>
            </group>
        </group>
    );
};

// --- Main Scene ---

const Room = ({ roomState }) => {
    const mood = lightMoods[roomState.lightMode];

    return (
        <group>
            {/* Room Shell */}
            <mesh rotation-x={-Math.PI / 2} position-y={0}>
                <planeGeometry args={[10, 10]} />
                <meshStandardMaterial color={floorColors[roomState.floorType]} roughness={0.5} />
            </mesh>
            {/* Walls */}
            <mesh position={[0, 3.5, -5]}>
                <planeGeometry args={[10, 7]} />
                <meshStandardMaterial color={roomState.wallColor} />
            </mesh>
            <mesh position={[-5, 3.5, 0]} rotation-y={Math.PI / 2}>
                <planeGeometry args={[10, 7]} />
                <meshStandardMaterial color={roomState.wallColor} />
            </mesh>
            <mesh position={[5, 3.5, 0]} rotation-y={-Math.PI / 2}>
                <planeGeometry args={[10, 7]} />
                <meshStandardMaterial color={roomState.wallColor} />
            </mesh>
            <mesh position={[0, 7, 0]} rotation-x={Math.PI / 2}>
                <planeGeometry args={[10, 10]} />
                <meshStandardMaterial color="#F8F6F2" />
            </mesh>

            {/* Window Frame & Scene */}
            <group position={[0, 4.2, -4.9]}>
                <mesh position={[0, 0, -0.05]}>
                    <planeGeometry args={[2.4, 2]} />
                    <meshBasicMaterial color="#6B5340" />
                </mesh>
                <mesh position={[0, 0, 0.01]}>
                    <planeGeometry args={[2.2, 1.8]} />
                    <meshStandardMaterial color="#A8D4F0" opacity={0.25} transparent />
                </mesh>
                <Blinds type={roomState.blindType} open={roomState.curtainOpen} />
                <Curtains color={roomState.curtainColor} open={roomState.curtainOpen} />
            </group>

            {/* Furniture */}
            <Sofa style={roomState.sofaStyle} color={roomState.sofaColor} />
            
            {/* Coffee Table */}
            <group position={[0, 0.45, 1.5]}>
                <RoundedBox args={[1.6, 0.06, 0.9]} radius={0.03} smoothness={4} material={new THREE.MeshStandardMaterial({ color: floorColors[roomState.floorType] })} />
                {[[-0.7, -0.4], [0.7, -0.4], [-0.7, 0.4], [0.7, 0.4]].map((p, i) => (
                    <mesh key={i} position={[p[0], -0.22, p[1]]}>
                        <cylinderGeometry args={[0.02, 0.02, 0.44, 6]} />
                        <meshStandardMaterial color="#C9A55A" metalness={0.6} />
                    </mesh>
                ))}
            </group>

            <Rug color={roomState.rugColor} pattern={roomState.rugPattern} />
            <IndoorPlant enabled={roomState.plantOn} />
            <Decor enabled={roomState.decorOn} wallColor={roomState.wallColor} />
            <CeilingFan active={roomState.fanOn} />

            {/* Lighting Mood */}
            <ambientLight intensity={mood.ambI} />
            {roomState.ceilingLightOn && (
                <group position={[0, 6.3, -2]}>
                    <pointLight intensity={mood.ptI} color={mood.ptC} castShadow />
                    <mesh position={[0, 0.2, 0]}>
                        <cylinderGeometry args={[0.01, 0.01, 0.6, 6]} />
                        <meshStandardMaterial color="#333" />
                    </mesh>
                    <mesh rotation={[Math.PI, 0, 0]} position={[0, -0.1, 0]}>
                        <coneGeometry args={[0.35, 0.4, 12]} />
                        <meshStandardMaterial color="#C9A55A" metalness={0.8} />
                    </mesh>
                </group>
            )}

            {roomState.floorLampOn && (
                <group position={[-3.8, 0, -1.5]}>
                    <mesh position={[0, 0.05, 0]}><cylinderGeometry args={[0.12, 0.18, 0.1, 16]} /><meshStandardMaterial color="#4A3520" /></mesh>
                    <mesh position={[0, 0.9, 0]}><cylinderGeometry args={[0.03, 0.03, 1.7, 8]} /><meshStandardMaterial color="#8B7355" /></mesh>
                    <pointLight position={[0.3, 1.8, 0]} intensity={0.8} color="#FFF0D0" />
                    <mesh position={[0.3, 1.6, 0]} rotation={[Math.PI, 0, 0]}>
                        <coneGeometry args={[0.28, 0.35, 16]} />
                        <meshStandardMaterial color="#F5F0E8" />
                    </mesh>
                </group>
            )}
        </group>
    );
};

const RoomCanvas = ({ roomState }) => {
    return (
        <Canvas shadows gl={{ antialias: true }} dpr={[1, 2]}>
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
                
                <Environment preset="city" />
                
                <Room roomState={roomState} />
                
                <ContactShadows 
                    position={[0, 0, 0]} 
                    opacity={0.3} 
                    scale={15} 
                    blur={3} 
                    far={10} 
                    resolution={1024} 
                />
            </Suspense>
        </Canvas>
    );
};

export default RoomCanvas;
