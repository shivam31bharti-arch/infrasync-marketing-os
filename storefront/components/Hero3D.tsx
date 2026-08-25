"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment } from "@react-three/drei";
import * as THREE from "three";

function Particles({ count = 40, reducedMotion = false }: { count?: number, reducedMotion?: boolean }) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100;
      const factor = 20 + Math.random() * 100;
      const speed = 0.01 + Math.random() / 200;
      const xFactor = -50 + Math.random() * 100;
      const yFactor = -50 + Math.random() * 100;
      const zFactor = -50 + Math.random() * 100;
      temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 });
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    if (reducedMotion) return;
    particles.forEach((particle, i) => {
      let { t, factor, speed, xFactor, yFactor, zFactor } = particle;
      t = particle.t += speed / 2;
      const a = Math.cos(t) + Math.sin(t * 1) / 10;
      const b = Math.sin(t) + Math.cos(t * 2) / 10;
      const s = Math.cos(t);

      dummy.position.set(
        (particle.mx / 10) * a + xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
        (particle.my / 10) * b + yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
        (particle.my / 10) * b + zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
      );
      dummy.scale.set(s, s, s);
      dummy.rotation.set(s * 5, s * 5, s * 5);
      dummy.updateMatrix();
      if (mesh.current) {
        mesh.current.setMatrixAt(i, dummy.matrix);
      }
    });
    if (mesh.current) {
      mesh.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <>
      <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
        <dodecahedronGeometry args={[0.2, 0]} />
        <meshPhysicalMaterial color="#4F7CFF" roughness={0.2} metalness={0.8} />
      </instancedMesh>
    </>
  );
}

function Scene({ reducedMotion }: { reducedMotion: boolean }) {
  const group = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (reducedMotion || !group.current) return;
    const targetX = (state.pointer.x * 0.1);
    const targetY = (state.pointer.y * 0.1);
    group.current.position.x += (targetX - group.current.position.x) * 0.1;
    group.current.position.y += (targetY - group.current.position.y) * 0.1;
  });

  return (
    <group ref={group}>
      <Float speed={reducedMotion ? 0 : 2} rotationIntensity={reducedMotion ? 0 : 1.5} floatIntensity={reducedMotion ? 0 : 2}>
        <mesh position={[-2, 1, -5]} rotation={[0.5, 0.5, 0]}>
          <boxGeometry args={[1.5, 1.5, 1.5]} />
          <meshStandardMaterial color="#0A0E14" wireframe opacity={0.3} transparent />
        </mesh>
      </Float>
      
      <Float speed={reducedMotion ? 0 : 3} rotationIntensity={reducedMotion ? 0 : 1} floatIntensity={reducedMotion ? 0 : 2}>
        <mesh position={[3, -1, -3]} rotation={[-0.2, 0.8, 0]}>
          <torusGeometry args={[1, 0.3, 16, 32]} />
          <meshStandardMaterial color="#4F7CFF" opacity={0.8} transparent roughness={0.1} metalness={0.8} />
        </mesh>
      </Float>

      <Float speed={reducedMotion ? 0 : 1.5} rotationIntensity={reducedMotion ? 0 : 2} floatIntensity={reducedMotion ? 0 : 1}>
        <mesh position={[-3, -2, -6]} rotation={[1, 1, 1]}>
          <octahedronGeometry args={[1]} />
          <meshStandardMaterial color="#8A8F98" wireframe opacity={0.2} transparent />
        </mesh>
      </Float>
      
      <Particles count={60} reducedMotion={reducedMotion} />
    </group>
  );
}

export default function Hero3D({ className = "" }: { className?: string }) {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  if (!mounted) return null;

  return (
    <div
      className={`hero-3d-bg ${className}`}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        zIndex: 0,
        pointerEvents: "none",
        background: "var(--grad-hero)",
      }}
    >
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
        <Environment preset="city" />
        <Scene reducedMotion={reducedMotion} />
      </Canvas>
    </div>
  );
}
