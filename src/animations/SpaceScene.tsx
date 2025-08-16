"use client";
import { OrbitControls, Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import BackgroundParticles from "./BackgroundParticles";
import FloatingOrbs from "./FloatingOrbs";
import GlassShapes from "./GlassShapes";

const SpaceScene = () => {
  return (
    <div className="w-full h-full absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 75 }}
        gl={{ alpha: true, antialias: true }}
      >
        <Suspense fallback={null}>
          {/* Space background with stars */}
          <Stars
            radius={50}
            depth={50}
            count={2000}
            factor={4}
            saturation={0}
            fade
            speed={0.5}
          />

          {/* Ambient lighting */}
          <ambientLight intensity={0.3} color="#4a5568" />
          <pointLight position={[10, 10, 10]} intensity={1} color="#ffa500" />
          <pointLight
            position={[-10, -10, -10]}
            intensity={0.5}
            color="#ff6b6b"
          />

          {/* 3D Elements */}
          <FloatingOrbs />
          <GlassShapes />
          <BackgroundParticles />

          {/* Subtle orbit controls for interactivity */}
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            enableRotate={true}
            autoRotate
            autoRotateSpeed={0.5}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default SpaceScene;
