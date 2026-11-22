"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

const orbits = [
  { r: 3.2, s: 0.22, c: "#F3D18A", v: 0.5 },
  { r: 4.4, s: 0.32, c: "#5A8BDB", v: 0.34 },
  { r: 5.8, s: 0.28, c: "#7954C7", v: 0.24 },
  { r: 7.2, s: 0.42, c: "#D8B46A", v: 0.16 },
];

function Rig() {
  useFrame(({ camera, pointer }) => {
    camera.position.x += (pointer.x * 1.4 - camera.position.x) * 0.03;
    camera.position.y += (pointer.y * 0.9 + 1.5 - camera.position.y) * 0.03;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

function Orbit({ r, s, c, v }: (typeof orbits)[number]) {
  const g = useRef<THREE.Group>(null);
  useFrame((_, d) => { if (g.current) g.current.rotation.y += d * v; });
  return (
    <group ref={g}>
      <mesh position={[r, 0, 0]}>
        <sphereGeometry args={[s, 32, 32]} />
        <meshStandardMaterial color={c} roughness={0.6} metalness={0.2} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[r - 0.005, r + 0.005, 128]} />
        <meshBasicMaterial color="#D8B46A" opacity={0.25} transparent side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

function Core() {
  const w = useRef<THREE.Mesh>(null);
  const p = useRef<THREE.Mesh>(null);
  useFrame((_, d) => {
    if (w.current) w.current.rotation.z += d * 0.1;
    if (p.current) p.current.rotation.y += d * 0.08;
  });
  return (
    <>
      <mesh ref={p}>
        <sphereGeometry args={[1.6, 64, 64]} />
        <meshStandardMaterial color="#35215F" emissive="#7954C7" emissiveIntensity={0.35} roughness={0.7} />
      </mesh>
      <mesh ref={w} rotation={[Math.PI / 2.4, 0, 0]}>
        <torusGeometry args={[2.3, 0.025, 16, 160]} />
        <meshStandardMaterial color="#D8B46A" emissive="#D8B46A" emissiveIntensity={0.6} metalness={1} roughness={0.25} />
      </mesh>
    </>
  );
}

export default function CosmicScene() {
  const mobile = typeof window !== "undefined" && window.innerWidth < 768;
  return (
    <Canvas dpr={[1, mobile ? 1.25 : 1.75]} camera={{ position: [0, 1.5, 11], fov: 50 }} aria-hidden>
      <color attach="background" args={["#070817"]} />
      <ambientLight intensity={0.35} />
      <pointLight position={[8, 6, 8]} intensity={90} color="#F3D18A" />
      <Stars radius={90} depth={50} count={mobile ? 1200 : 3500} factor={4} fade speed={0.6} />
      <Core />
      {orbits.map((o) => <Orbit key={o.r} {...o} />)}
      <Rig />
    </Canvas>
  );
}
