"use client";
import React, { useRef } from "react";
import * as THREE from "three";
import { Float, Sphere } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

// Floating Glass Orbs Component
const FloatingOrbs: React.FC = () => {
  const orbsRef = useRef<(THREE.Mesh | null)[]>([]);

  useFrame((state) => {
    orbsRef.current.forEach((orb, i) => {
      if (orb) {
        orb.rotation.x = state.clock.elapsedTime * 0.2 + i;
        orb.rotation.y = state.clock.elapsedTime * 0.1 + i;
        orb.position.y = Math.sin(state.clock.elapsedTime + i) * 0.5;
      }
    });
  });

  return (
    <>
      {Array.from({ length: 6 }).map((_, i) => (
        <Float key={i} speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
          <Sphere
            ref={(el) => {
              orbsRef.current[i] = el;
            }}
            position={[
              Math.cos((i / 6) * Math.PI * 2) * 8,
              Math.sin((i / 6) * Math.PI * 2) * 2,
              Math.sin((i / 6) * Math.PI * 2) * 4,
            ]}
            args={[0.5, 32, 32]}
          >
            <meshPhysicalMaterial
              color={`hsl(${20 + i * 30}, 80%, 60%)`}
              transmission={0.9}
              opacity={0.7}
              transparent
              roughness={0.1}
              thickness={0.5}
              ior={1.4}
              clearcoat={1}
              clearcoatRoughness={0.1}
            />
          </Sphere>
        </Float>
      ))}
    </>
  );
};

export default FloatingOrbs;
