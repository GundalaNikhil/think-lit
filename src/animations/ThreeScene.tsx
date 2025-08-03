"use client";
import * as THREE from "three";
import { useEffect, useRef } from "react";

export const ThreeScene = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(
      mountRef.current.clientWidth,
      mountRef.current.clientHeight
    );
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    // Create floating book-like shapes and educational elements
    const shapes: THREE.Mesh[] = [];

    // Book shapes
    for (let i = 0; i < 5; i++) {
      const bookGeometry = new THREE.BoxGeometry(1.5, 0.2, 2);
      const bookMaterial = new THREE.MeshPhongMaterial({
        color: [0x3b82f6, 0x8b5cf6, 0x06b6d4, 0xf59e0b, 0x10b981][i % 5],
        transparent: true,
        opacity: 0.7,
      });
      const book = new THREE.Mesh(bookGeometry, bookMaterial);

      book.position.x = (Math.random() - 0.5) * 12;
      book.position.y = (Math.random() - 0.5) * 8;
      book.position.z = (Math.random() - 0.5) * 8;

      book.rotation.x = Math.random() * Math.PI;
      book.rotation.y = Math.random() * Math.PI;
      book.rotation.z = Math.random() * Math.PI;

      shapes.push(book);
      scene.add(book);
    }

    // Question mark shapes
    for (let i = 0; i < 3; i++) {
      const ringGeometry = new THREE.RingGeometry(0.5, 0.8, 8);
      const ringMaterial = new THREE.MeshPhongMaterial({
        color: 0xff6b6b,
        transparent: true,
        opacity: 0.6,
        side: THREE.DoubleSide,
      });
      const ring = new THREE.Mesh(ringGeometry, ringMaterial);

      ring.position.x = (Math.random() - 0.5) * 10;
      ring.position.y = (Math.random() - 0.5) * 6;
      ring.position.z = (Math.random() - 0.5) * 6;

      shapes.push(ring);
      scene.add(ring);
    }

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 10, 5);
    scene.add(directionalLight);

    camera.position.z = 15;

    // Animation loop
    let animationId: number | null = null;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      shapes.forEach((shape, index) => {
        shape.rotation.x += 0.005 * (index % 2 === 0 ? 1 : -1);
        shape.rotation.y += 0.008 * (index % 3 === 0 ? 1 : -1);
        shape.position.y += Math.sin(Date.now() * 0.001 + index) * 0.008;
      });

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!mountRef.current) return;
      camera.aspect =
        mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(
        mountRef.current.clientWidth,
        mountRef.current.clientHeight
      );
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="w-full h-full absolute inset-0" />;
};
