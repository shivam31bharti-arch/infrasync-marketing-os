"use client";

import { useMemo, useRef, useEffect } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";

/**
 * HeroScene — the S1 cinematic R3F moment.
 * A slow-orbiting cluster of glassy/chromatic shards (high-metalness,
 * low-roughness physical materials) lit electric blue against near-black,
 * wrapped in subtle pointer parallax and floating dust.
 *
 * No drei's Environment/HDR (no network dependency at runtime) — the look is
 * built from hand-placed lights. Mounted only on desktop without
 * prefers-reduced-motion (the parent decides).
 */

type ShardSpec = {
  geometry: "tetra" | "octa" | "icosa" | "box";
  radius: number;      // orbit radius
  speed: number;       // orbit speed
  phase: number;       // initial angle
  yOffset: number;     // vertical float offset
  size: number;
  color: string;
  roughness: number;
  spin: [number, number, number];
};

const SHARD_COLORS = ["#0B4FFF", "#1B2130", "#AEB6C4", "#FFFFFF"];

function Shard({ spec }: { spec: ShardSpec }) {
  const ref = useRef<THREE.Mesh>(null);

  const geometry = useMemo(() => {
    switch (spec.geometry) {
      case "tetra": return new THREE.TetrahedronGeometry(spec.size, 0);
      case "octa": return new THREE.OctahedronGeometry(spec.size, 0);
      case "icosa": return new THREE.IcosahedronGeometry(spec.size, 0);
      case "box": return new THREE.BoxGeometry(spec.size, spec.size * 0.6, spec.size * 0.8);
    }
  }, [spec.geometry, spec.size]);

  useEffect(() => () => geometry.dispose(), [geometry]);

  return (
    <mesh ref={ref} geometry={geometry}>
      <meshStandardMaterial
        color={spec.color}
        metalness={1}
        roughness={spec.roughness}
      />
      <ShardMotion spec={spec} meshRef={ref} />
    </mesh>
  );
}

/** Per-shard orbit/float animation, kept inside the mesh tree. */
function ShardMotion({
  spec,
  meshRef,
}: {
  spec: ShardSpec;
  meshRef: React.RefObject<THREE.Mesh | null>;
}) {
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const mesh = meshRef.current;
    if (!mesh) return;
    const angle = spec.phase + t * spec.speed;
    mesh.position.set(
      Math.cos(angle) * spec.radius,
      spec.yOffset + Math.sin(t * 0.4 + spec.phase) * 0.8,
      Math.sin(angle) * spec.radius * 0.6
    );
    mesh.rotation.x = t * spec.spin[0];
    mesh.rotation.y = t * spec.spin[1];
    mesh.rotation.z = t * spec.spin[2];
  });
  return null;
}

function Dust({ count = 350 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 30;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 18;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 16;
    }
    return arr;
  }, [count]);

  useFrame(({ clock }) => {
    const points = ref.current;
    if (!points) return;
    const t = clock.getElapsedTime();
    points.rotation.y = t * 0.008;
    points.position.y = Math.sin(t * 0.15) * 0.4;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#9DB6FF"
        transparent
        opacity={0.55}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function Lights() {
  const moving = useRef<THREE.PointLight>(null);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (moving.current) {
      moving.current.position.set(Math.cos(t * 0.25) * 8, 3 + Math.sin(t * 0.2), Math.sin(t * 0.25) * 6);
    }
  });
  return (
    <>
      <ambientLight intensity={0.25} />
      {/* electric key */}
      <directionalLight position={[6, 4, 6]} intensity={2.2} color="#4F7CFF" />
      {/* violet rim */}
      <directionalLight position={[-6, 2, -4]} intensity={1.4} color="#7C5CFF" />
      {/* cool top fill */}
      <directionalLight position={[0, 8, -2]} intensity={0.5} color="#E8ECF5" />
      {/* roaming accent — gives the shards their chromatic glints */}
      <pointLight ref={moving} intensity={30} distance={22} color="#4F7CFF" decay={2} />
    </>
  );
}

export default function HeroScene() {
  const group = useRef<THREE.Group>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const smooth = useRef({ x: 0, y: 0 });

  const shards = useMemo<ShardSpec[]>(() => {
    const geos: ShardSpec["geometry"][] = ["tetra", "octa", "icosa", "box"];
    return Array.from({ length: 9 }, (_, i) => ({
      geometry: geos[i % geos.length],
      radius: 4.2 + (i % 4) * 1.6,
      speed: 0.045 + (i % 3) * 0.02,
      phase: (i / 9) * Math.PI * 2,
      yOffset: (Math.random() - 0.5) * 4.5,
      size: 0.55 + (i % 3) * 0.45,
      color: SHARD_COLORS[i % SHARD_COLORS.length],
      roughness: 0.08 + (i % 3) * 0.05,
      spin: [0.12 + Math.random() * 0.2, 0.1 + Math.random() * 0.22, 0.08 + Math.random() * 0.15],
    }));
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 0.6, 12], fov: 40 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ position: "absolute", inset: 0 }}
      onPointerMove={(e) => {
        pointer.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
        pointer.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
      }}
    >
      <fog attach="fog" args={["#F0EFE3", 14, 26]} />
      <Lights />
      <Rig group={group} pointer={pointer} smooth={smooth} />
      <group ref={group}>
        {shards.map((spec, i) => (
          <Shard key={i} spec={spec} />
        ))}
        <Dust />
      </group>
    </Canvas>
  );
}

/** Pointer-parallax rig — eased group rotation equivalent to ≤8px drift. */
function Rig({
  group,
  pointer,
  smooth,
}: {
  group: React.RefObject<THREE.Group | null>;
  pointer: React.MutableRefObject<{ x: number; y: number }>;
  smooth: React.MutableRefObject<{ x: number; y: number }>;
}) {
  useFrame(() => {
    if (!group.current) return;
    smooth.current.x += (pointer.current.x - smooth.current.x) * 0.035;
    smooth.current.y += (pointer.current.y - smooth.current.y) * 0.035;
    group.current.rotation.y = smooth.current.x * 0.06;
    group.current.rotation.x = smooth.current.y * 0.04;
    group.current.position.x = 2.6 + smooth.current.x * 0.35; // ≈ ≤8px at hero scale
    group.current.position.y = -smooth.current.y * 0.25;
  });
  return null;
}
