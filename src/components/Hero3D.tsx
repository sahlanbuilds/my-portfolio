import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function AbstractGeometry() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.x = state.clock.elapsedTime * 0.05;
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.08;
    }
  });

  return (
    <group ref={groupRef} position={[2, 0, -2]}>
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <mesh>
          <octahedronGeometry args={[2, 0]} />
          <meshPhysicalMaterial 
            color="#3b82f6" 
            wireframe={true}
            transparent
            opacity={0.15}
            roughness={0.1}
            metalness={0.8}
          />
        </mesh>
        <mesh>
          <icosahedronGeometry args={[1.5, 1]} />
          <meshPhysicalMaterial 
            color="#ffffff" 
            wireframe={true}
            transparent
            opacity={0.05}
          />
        </mesh>
        
        {/* Inner solid glowing core */}
        <mesh>
          <icosahedronGeometry args={[0.5, 0]} />
          <meshBasicMaterial color="#3b82f6" transparent opacity={0.2} wireframe={true} />
        </mesh>
      </Float>
    </group>
  );
}

function TechParticles() {
  const count = 400;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 25; // x
      pos[i * 3 + 1] = (Math.random() - 0.5) * 25; // y
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15 - 5; // z
    }
    return pos;
  }, [count]);

  const pointsRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.03;
      pointsRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.5;
    }
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial 
        transparent 
        color="#60a5fa" 
        size={0.04} 
        sizeAttenuation={true} 
        depthWrite={false} 
        opacity={0.4} 
      />
    </Points>
  );
}

function MouseRig() {
  useFrame((state) => {
    // Smoothly move camera based on mouse position
    state.camera.position.lerp(
      new THREE.Vector3(state.pointer.x * 2, state.pointer.y * 2, 7),
      0.05
    );
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function Hero3D() {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Return empty container for SSR or reduced motion
  if (!mounted || reducedMotion) return null;

  return (
    <div className="absolute inset-0 -z-10 opacity-70 mix-blend-screen overflow-hidden">
      <Canvas 
        camera={{ position: [0, 0, 7], fov: 50 }} 
        dpr={[1, 2]} 
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={0.2} />
        <spotLight position={[5, 5, 5]} angle={0.2} penumbra={1} intensity={1} color="#3b82f6" />
        <pointLight position={[-5, -5, -5]} intensity={0.5} color="#ffffff" />
        
        <AbstractGeometry />
        <TechParticles />
        <MouseRig />
      </Canvas>
    </div>
  );
}
