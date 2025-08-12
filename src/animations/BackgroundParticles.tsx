"use client";
import React, { useRef } from "react";
import * as THREE from "three";
import { Sphere } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

const BackgroundParticles: React.FC = () => {
  const particlesRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  const particlePositions = Array.from(
    { length: 50 },
    () =>
      [
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
      ] as [number, number, number]
  );

  return (
    <group ref={particlesRef}>
      {particlePositions.map((pos, i) => (
        <Sphere key={i} position={pos} args={[0.05, 8, 8]}>
          <meshBasicMaterial
            color="orange"
            transparent
            opacity={Math.random() * 0.5 + 0.3}
          />
        </Sphere>
      ))}
    </group>
  );
};

export default BackgroundParticles;
