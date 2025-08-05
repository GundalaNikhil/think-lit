"use client";
import * as THREE from "three";
import { useEffect, useRef } from "react";

export const ThreeScene = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;

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
    renderer.setClearColor(0x00061a, 0.8); // subtle navy background
    mountRef.current.appendChild(renderer.domElement);

    // Starfield background
    const starGeometry = new THREE.BufferGeometry();
    const starCount = 180;
    const starVerts = [];
    for (let i = 0; i < starCount; i++) {
      starVerts.push(
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 18,
        (Math.random() - 0.5) * 30
      );
    }
    starGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(starVerts, 3)
    );
    const starMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.08,
      opacity: 0.4,
      transparent: true,
    });
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    // Book shapes with glowing outlines
    const shapes: THREE.Mesh[] = [];
    const outlineMeshes: THREE.Mesh[] = [];
    for (let i = 0; i < 5; i++) {
      const bookGeometry = new THREE.BoxGeometry(1.5, 0.2, 2);
      const bookMaterial = new THREE.MeshPhongMaterial({
        color: [0x3b82f6, 0x8b5cf6, 0x06b6d4, 0xf59e0b, 0x10b981][i % 5],
        transparent: true,
        opacity: 0.82,
        shininess: 75,
        specular: 0xffffff,
      });
      const book = new THREE.Mesh(bookGeometry, bookMaterial);

      // Glowing outline
      const outlineMaterial = new THREE.MeshBasicMaterial({
        color: 0x00f0ff,
        side: THREE.BackSide,
        transparent: true,
        opacity: 0.46,
      });
      const outline = new THREE.Mesh(bookGeometry, outlineMaterial);
      outline.scale.multiplyScalar(1.085);

      book.position.x = (Math.random() - 0.5) * 12;
      book.position.y = (Math.random() - 0.5) * 8.5;
      book.position.z = (Math.random() - 0.5) * 7.5;

      book.rotation.x = Math.random() * Math.PI;
      book.rotation.y = Math.random() * Math.PI;
      book.rotation.z = Math.random() * Math.PI;

      outline.position.copy(book.position);
      outline.rotation.copy(book.rotation);

      shapes.push(book);
      outlineMeshes.push(outline);
      scene.add(book);
      scene.add(outline);
    }

    // Question mark rings with glassy material
    for (let i = 0; i < 3; i++) {
      const ringGeometry = new THREE.RingGeometry(0.48, 0.8, 18);
      const ringMaterial = new THREE.MeshPhysicalMaterial({
        color: 0xffbe4f,
        roughness: 0.05,
        transmission: 0.79,
        thickness: 0.35,
        ior: 1.4,
        transparent: true,
        opacity: 0.74,
        reflectivity: 1,
        clearcoat: 1,
        clearcoatRoughness: 0.08,
      });
      const ring = new THREE.Mesh(ringGeometry, ringMaterial);
      ring.position.x = (Math.random() - 0.5) * 11;
      ring.position.y = (Math.random() - 0.5) * 7;
      ring.position.z = (Math.random() - 0.5) * 7;
      shapes.push(ring);
      scene.add(ring);
    }

    // Floating lightbulb particles ("ideas")
    const bulbs: THREE.Mesh[] = [];
    for (let i = 0; i < 4; i++) {
      const bulbGeometry = new THREE.SphereGeometry(0.22, 18, 18);
      const bulbMaterial = new THREE.MeshStandardMaterial({
        color: 0xfde68a, // gold-yellow
        emissive: 0xffe066,
        emissiveIntensity: 2.7,
        opacity: 0.96,
        transparent: true,
      });
      const bulb = new THREE.Mesh(bulbGeometry, bulbMaterial);
      bulb.position.set(
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 6.5 + 2,
        (Math.random() - 0.5) * 7
      );
      bulbs.push(bulb);
      scene.add(bulb);
    }

    // Lighting
    scene.add(new THREE.AmbientLight(0xffffff, 0.65));
    const dirLight = new THREE.DirectionalLight(0xb9e0ff, 1.1);
    dirLight.position.set(10, 12, 10);
    scene.add(dirLight);

    camera.position.z = 15;

    // Animation loop
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      // 🌀 Rotations & movements
      shapes.forEach((shape, index) => {
        shape.rotation.x += 0.005 * (index % 2 === 0 ? 1 : -1);
        shape.rotation.y += 0.009 * (index % 3 === 0 ? 1 : -1);
        shape.position.y += Math.sin(Date.now() * 0.001 + index) * 0.012;
        if (outlineMeshes[index]) {
          outlineMeshes[index].rotation.copy(shape.rotation);
          outlineMeshes[index].position.copy(shape.position);
        }
      });
      bulbs.forEach((bulb, i) => {
        bulb.position.y += Math.sin(Date.now() * 0.0015 + i * 1.1) * 0.009;
        bulb.rotation.y += 0.01;
      });

      renderer.render(scene, camera);
    };
    animate();

    // Resize handler
    const handleResize = () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    // ✅ Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationId) cancelAnimationFrame(animationId); // ✅ fixed
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="w-full h-full fixed top-0 left-0 right-0 bottom-0 z-0"
      aria-label="ThinkLit animated educational scene"
    />
  );
};
