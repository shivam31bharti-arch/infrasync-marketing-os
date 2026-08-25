"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

const GRADIENT_VARS = {
  hero: "linear-gradient(135deg, #0A0E14 0%, #101828 100%)",
  accent: "linear-gradient(90deg, #4F7CFF 0%, #7C5CFF 100%)",
} as const;

interface Particle {
  position: [number, number, number];
  velocity: [number, number, number];
  size: number;
  color: string;
  opacity: number;
}

const PARTICLE_COUNT = 120;
const SPREAD = 40;

function Hero3DCanvas() {
  const [reduceMotion, setReduceMotion] = useState(false);
  const pointer = useMemo(() => ({ x: 0, y: 0 }), []);
  const targetPointer = useMemo(() => ({ x: 0, y: 0 }), []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const onPointerMove = (e: MouseEvent) => {
      if (reduceMotion) return;
      targetPointer.x = (e.clientX / window.innerWidth - 0.5) * 2;
      targetPointer.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", onPointerMove);
  }, [reduceMotion]);

  const particles = useMemo((): Particle[] => {
    const arr: Particle[] = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = SPREAD * (0.3 + Math.random() * 0.7);
      arr.push({
        position: [
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.sin(phi) * Math.sin(theta),
          r * Math.cos(phi),
        ],
        velocity: [
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02,
        ],
        size: 0.15 + Math.random() * 0.35,
        color: Math.random() > 0.6 ? "#4F7CFF" : Math.random() > 0.3 ? "#7C5CFF" : "#FFFFFF",
        opacity: 0.15 + Math.random() * 0.35,
      });
    }
    return arr;
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 0, 50], fov: 45 }}
      style={{ position: "absolute", inset: 0, zIndex: 0 }}
      gl={{ antialias: true, alpha: true, preserveDrawingBuffer: false }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x0a0e14, 1);
      }}
    >
      <color attach="background" args={["#0A0E14"]} />
      <fog attach="fog" args={["#0A0E14", 30, 100]} />
      
      {!reduceMotion && <OrbitControls enableRotate={false} enableZoom={false} enablePan={false} />}
      
      <ParticleSystem particles={particles} pointer={pointer} targetPointer={targetPointer} reduceMotion={reduceMotion} />
      
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 10]} intensity={0.4} color="#4F7CFF" />
      <directionalLight position={[-10, -10, 10]} intensity={0.3} color="#7C5CFF" />
    </Canvas>
  );
}

function ParticleSystem({
  particles,
  pointer,
  targetPointer,
  reduceMotion,
}: {
  particles: Particle[];
  pointer: { x: number; y: number };
  targetPointer: { x: number; y: number };
  reduceMotion: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_state, delta) => {
    if (!groupRef.current) return;
    if (reduceMotion) {
      pointer.x += (targetPointer.x - pointer.x) * 0.02;
      pointer.y += (targetPointer.y - pointer.y) * 0.02;
      groupRef.current.rotation.y = pointer.x * 0.05;
      groupRef.current.rotation.x = -pointer.y * 0.05;
      return;
    }

    pointer.x += (targetPointer.x - pointer.x) * 0.03;
    pointer.y += (targetPointer.y - pointer.y) * 0.03;

    groupRef.current.rotation.y = pointer.x * 0.08;
    groupRef.current.rotation.x = -pointer.y * 0.08;

    particles.forEach((p, i) => {
      const mesh = groupRef.current!.children[i] as THREE.Mesh;
      if (!mesh) return;

      p.position[0] += p.velocity[0];
      p.position[1] += p.velocity[1];
      p.position[2] += p.velocity[2];

      const dist = Math.sqrt(
        p.position[0] ** 2 + p.position[1] ** 2 + p.position[2] ** 2
      );
      if (dist > SPREAD * 1.2) {
        p.velocity[0] *= -1;
        p.velocity[1] *= -1;
        p.velocity[2] *= -1;
      }

      mesh.position.set(p.position[0], p.position[1], p.position[2]);
      mesh.rotation.x += 0.001;
      mesh.rotation.y += 0.001;
    });
  });

  return (
    <group ref={groupRef}>
      {particles.map((p, i) => (
        <ParticleMesh key={i} particle={p} />
      ))}
    </group>
  );
}

function ParticleMesh({ particle }: { particle: Particle }) {
  const { position, size, color, opacity } = particle;
  const ref = useRef<THREE.Mesh>(null);

  return (
    <mesh ref={ref} position={position} frustumCulled={false}>
      <sphereGeometry args={[size, 16, 16]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={opacity}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

export default function Hero3D() {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        overflow: "hidden",
        background: GRADIENT_VARS.hero,
      }}
      aria-hidden="true"
    >
      {!reduceMotion ? <Hero3DCanvas /> : null}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `
            radial-gradient(ellipse at 20% 20%, rgba(79, 124, 255, 0.08) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 80%, rgba(124, 92, 255, 0.06) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 50%, rgba(79, 124, 255, 0.03) 0%, transparent 70%)
          `,
          pointerEvents: "none",
        }}
      />
    </div>
  );
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      group: any;
      mesh: any;
      sphereGeometry: any;
      meshBasicMaterial: any;
      ambientLight: any;
      directionalLight: any;
      color: any;
      fog: any;
    }
  }
}