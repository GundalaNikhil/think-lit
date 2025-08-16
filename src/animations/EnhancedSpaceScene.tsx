"use client";
import { OrbitControls, Stars, Sphere } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import * as THREE from "three";

// Realistic Planet Component
const Planet = ({
  position,
  size,
  color,
  orbitRadius,
  orbitSpeed,
  rotationSpeed,
  hasRings = false,
}: {
  position: [number, number, number];
  size: number;
  color: string;
  orbitRadius: number;
  orbitSpeed: number;
  rotationSpeed: number;
  hasRings?: boolean;
}) => {
  const planetRef = useRef<THREE.Mesh>(null);
  const orbitRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (orbitRef.current) {
      orbitRef.current.rotation.y += orbitSpeed;
    }
    if (planetRef.current) {
      planetRef.current.rotation.y += rotationSpeed;
    }
  });

  return (
    <group ref={orbitRef}>
      <group position={[orbitRadius, 0, 0]}>
        <Sphere ref={planetRef} args={[size, 32, 32]} position={position}>
          <meshPhysicalMaterial
            color={color}
            roughness={0.7}
            metalness={0.1}
            emissive={color}
            emissiveIntensity={0.1}
          />
        </Sphere>
        {hasRings && (
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[size * 1.5, size * 2.2, 64]} />
            <meshBasicMaterial
              color="#888888"
              transparent
              opacity={0.3}
              side={THREE.DoubleSide}
            />
          </mesh>
        )}
      </group>
    </group>
  );
};

// Asteroid Belt Component
const AsteroidBelt = () => {
  const asteroids = useRef<THREE.Group>(null);

  useFrame(() => {
    if (asteroids.current) {
      asteroids.current.rotation.y += 0.001;
    }
  });

  return (
    <group ref={asteroids}>
      {Array.from({ length: 50 }).map((_, i) => {
        const angle = (i / 50) * Math.PI * 2;
        const radius = 15 + Math.random() * 5;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const y = (Math.random() - 0.5) * 2;

        return (
          <Sphere
            key={i}
            position={[x, y, z]}
            args={[0.1 + Math.random() * 0.2, 8, 8]}
          >
            <meshStandardMaterial
              color="#666666"
              roughness={0.9}
              metalness={0.1}
            />
          </Sphere>
        );
      })}
    </group>
  );
};

// Nebula Effect Component
const NebulaEffect = () => {
  const nebulaRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (nebulaRef.current && nebulaRef.current.material) {
      nebulaRef.current.rotation.z += 0.0005;
      const material = nebulaRef.current.material as THREE.MeshBasicMaterial;
      material.opacity = 0.1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
    }
  });

  return (
    <mesh ref={nebulaRef} position={[0, 0, -20]}>
      <planeGeometry args={[50, 50]} />
      <meshBasicMaterial
        color="#4a0e4e"
        transparent
        opacity={0.1}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

// Main Enhanced Space Scene
const EnhancedSpaceScene = () => {
  return (
    <div className="w-full h-full absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 5, 25], fov: 60 }}
        gl={{ alpha: true, antialias: true }}
      >
        <Suspense fallback={null}>
          {/* Enhanced Starfield */}
          <Stars
            radius={100}
            depth={50}
            count={5000}
            factor={4}
            saturation={0}
            fade
            speed={0.3}
          />

          {/* Nebula Background */}
          <NebulaEffect />

          {/* Realistic Lighting */}
          <ambientLight intensity={0.2} color="#1a1a2e" />
          <pointLight position={[0, 0, 0]} intensity={2} color="#ffd700" />
          <pointLight position={[30, 10, 10]} intensity={0.5} color="#ff6b6b" />
          <pointLight
            position={[-30, -10, -10]}
            intensity={0.3}
            color="#4ecdc4"
          />

          {/* Solar System Planets */}
          <Planet
            position={[0, 0, 0]}
            size={0.8}
            color="#ff6b35"
            orbitRadius={4}
            orbitSpeed={0.02}
            rotationSpeed={0.01}
          />

          <Planet
            position={[0, 0, 0]}
            size={1.2}
            color="#4ecdc4"
            orbitRadius={7}
            orbitSpeed={0.015}
            rotationSpeed={0.008}
          />

          <Planet
            position={[0, 0, 0]}
            size={1.5}
            color="#45b7d1"
            orbitRadius={11}
            orbitSpeed={0.01}
            rotationSpeed={0.006}
          />

          <Planet
            position={[0, 0, 0]}
            size={2.0}
            color="#f39c12"
            orbitRadius={16}
            orbitSpeed={0.008}
            rotationSpeed={0.004}
            hasRings={true}
          />

          {/* Asteroid Belt */}
          <AsteroidBelt />

          {/* Floating Code Symbols */}
          {Array.from({ length: 8 }).map((_, i) => (
            <mesh
              key={i}
              position={[
                (Math.random() - 0.5) * 40,
                (Math.random() - 0.5) * 20,
                (Math.random() - 0.5) * 30,
              ]}
            >
              <boxGeometry args={[0.5, 0.1, 0.8]} />
              <meshPhysicalMaterial
                color={`hsl(${180 + i * 30}, 70%, 60%)`}
                transmission={0.8}
                opacity={0.7}
                transparent
                roughness={0.1}
                thickness={0.5}
                ior={1.4}
                emissive={`hsl(${180 + i * 30}, 50%, 30%)`}
                emissiveIntensity={0.2}
              />
            </mesh>
          ))}

          {/* Interactive Controls */}
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            enableRotate={true}
            autoRotate
            autoRotateSpeed={0.2}
            maxPolarAngle={Math.PI / 1.8}
            minPolarAngle={Math.PI / 3}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default EnhancedSpaceScene;
