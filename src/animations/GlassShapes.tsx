"use client";
import React, { useRef } from "react";
import * as THREE from "three";
import { Box, Float, Sphere } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

interface ShapeConfig {
  Component: typeof Box | typeof Sphere;
  args: [number, number, number] | [number, number, number, number, number];
  position: [number, number, number];
}

const GlassShapes: React.FC = () => {
  const shapesRef = useRef<(THREE.Mesh | null)[]>([]);

  useFrame((state) => {
    shapesRef.current.forEach((shape, i) => {
      if (shape) {
        shape.rotation.x = state.clock.elapsedTime * 0.3 + i;
        shape.rotation.z = state.clock.elapsedTime * 0.2 + i;
      }
    });
  });

  const shapes: ShapeConfig[] = [
    { Component: Box, args: [1, 1, 1], position: [-5, 3, -2] },
    { Component: Sphere, args: [0.8, 16, 16], position: [5, -2, -3] },
    { Component: Box, args: [1.2, 0.2, 1.8], position: [3, 4, -1] }, // Book-like
  ];

  return (
    <>
      {shapes.map((shape, i) => (
        <Float key={i} speed={2} rotationIntensity={1} floatIntensity={1}>
          <shape.Component
            ref={(el) => {
              shapesRef.current[i] = el;
            }}
            position={shape.position}
            args={shape.args}
          >
            <meshPhysicalMaterial
              color={`hsl(${30 + i * 40}, 70%, 50%)`}
              transmission={0.8}
              opacity={0.6}
              transparent
              roughness={0.05}
              thickness={0.8}
              ior={1.5}
              clearcoat={1}
              clearcoatRoughness={0.05}
              emissive={`hsl(${30 + i * 40}, 50%, 20%)`}
              emissiveIntensity={0.2}
            />
          </shape.Component>
        </Float>
      ))}
    </>
  );
};

export default GlassShapes;
