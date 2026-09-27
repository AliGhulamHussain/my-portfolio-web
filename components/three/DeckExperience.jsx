"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Grid } from "@react-three/drei";
import * as THREE from "three";
import Card3D from "./Card3D";
import { CARDS, ZONES } from "@/lib/deck";
import { scrollState } from "@/lib/scrollState";

const ACCENT = "#6E8BFF";

/* ── Camera: subtle per-zone dolly + mouse parallax ─────────── */
const STOPS = [
  { at: 0, pos: [0, -0.4, 15.5], look: [0, -1.4, 0] }, // hero — looking at the deck
  { at: (ZONES.about.start + ZONES.about.end) / 2, pos: [0, 0.35, 13.8], look: [0, 0.25, 0] },
  { at: (ZONES.skills.start + ZONES.skills.end) / 2, pos: [0, 0.55, 15.8], look: [0, 0.45, 0] },
  { at: (ZONES.projects.start + ZONES.projects.end) / 2, pos: [0, 0.25, 13.2], look: [0, 0.2, 0] },
  { at: 1, pos: [0, 0.15, 14.6], look: [0, -0.2, 0] },
];

const smooth = (t) => t * t * (3 - 2 * t);
const vP = new THREE.Vector3();
const vL = new THREE.Vector3();
const a3 = new THREE.Vector3();
const b3 = new THREE.Vector3();

function sample(p, out, key) {
  let i = 0;
  while (i < STOPS.length - 2 && p > STOPS[i + 1].at) i++;
  const t = smooth(
    THREE.MathUtils.clamp(
      (p - STOPS[i].at) / (STOPS[i + 1].at - STOPS[i].at),
      0,
      1
    )
  );
  a3.fromArray(STOPS[i][key]);
  b3.fromArray(STOPS[i + 1][key]);
  out.copy(a3).lerp(b3, t);
}

function CameraRig() {
  const look = useRef(new THREE.Vector3(0, -1.4, 0));

  useFrame((state, delta) => {
    const { progress, mouse, reduced } = scrollState;
    sample(progress, vP, "pos");
    sample(progress, vL, "look");

    // Narrow screens: pull back so the tableau fits
    const aspect = state.viewport.aspect;
    if (aspect < 1.25) vP.z += (1.25 - aspect) * 7.5;

    if (!reduced) {
      vP.x += mouse.x * 0.55;
      vP.y += mouse.y * 0.35;
    }

    const d = Math.min(1, delta * 3);
    state.camera.position.lerp(vP, d);
    look.current.lerp(vL, d);
    state.camera.lookAt(look.current);
  });

  return null;
}

/* ── Ambient: floating accent motes above the "table" ───────── */
function Motes() {
  const ref = useRef();
  const positions = useMemo(() => {
    const N = 90;
    const arr = new Float32Array(N * 3);
    let s = 17;
    const rnd = () => ((s = (s * 16807) % 2147483647) / 2147483647);
    for (let i = 0; i < N; i++) {
      arr[i * 3] = (rnd() - 0.5) * 26;
      arr[i * 3 + 1] = -3 + rnd() * 9;
      arr[i * 3 + 2] = -6 + rnd() * 10;
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (!ref.current || scrollState.reduced) return;
    const t = state.clock.elapsedTime;
    ref.current.rotation.y = Math.sin(t * 0.05) * 0.15;
    ref.current.position.y = Math.sin(t * 0.3) * 0.25;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color={ACCENT}
        size={0.05}
        sizeAttenuation
        transparent
        opacity={0.28}
        depthWrite={false}
      />
    </points>
  );
}

/* ── Table felt: a soft green pool of light under the deck ──── */
function Felt() {
  const tex = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = c.height = 256;
    const g = c.getContext("2d");
    const r = g.createRadialGradient(128, 128, 0, 128, 128, 128);
    r.addColorStop(0, "rgba(22, 46, 32, 0.9)");
    r.addColorStop(0.55, "rgba(12, 26, 18, 0.45)");
    r.addColorStop(1, "rgba(10, 15, 12, 0)");
    g.fillStyle = r;
    g.fillRect(0, 0, 256, 256);
    return new THREE.CanvasTexture(c);
  }, []);

  return (
    <mesh position={[0, -4.62, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[34, 20]} />
      <meshBasicMaterial map={tex} transparent depthWrite={false} />
    </mesh>
  );
}

/* ── The experience ─────────────────────────────────────────── */
export default function DeckExperience() {
  const [focusedId, setFocusedId] = useState(null);

  const onFocus = (id) => {
    setFocusedId(id);
    scrollState.lenis?.stop();
    document.body.classList.add("deck-focus");
  };
  const onClose = () => {
    setFocusedId(null);
    scrollState.lenis?.start();
    document.body.classList.remove("deck-focus");
  };

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.classList.remove("deck-focus");
      scrollState.lenis?.start();
    };
  }, []);

  return (
    <div className="webgl-layer" aria-hidden={false}>
      <Canvas
        camera={{ position: [0, -0.4, 15.5], fov: 50, near: 0.1, far: 80 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <Suspense fallback={null}>
          <CameraRig />

          {/* The dealer's table — a faint tech grid below the deck */}
          <Grid
            position={[0, -4.6, 0]}
            args={[60, 60]}
            cellSize={1.1}
            cellThickness={0.5}
            cellColor="#161A22"
            sectionSize={5.5}
            sectionThickness={0.9}
            sectionColor="#232B3D"
            fadeDistance={34}
            fadeStrength={2.5}
            infiniteGrid
          />

          <Felt />
          <Motes />

          {CARDS.map((card, i) => (
            <Card3D
              key={card.id}
              card={card}
              index={i}
              focusedId={focusedId}
              onFocus={onFocus}
              onClose={onClose}
            />
          ))}
        </Suspense>
      </Canvas>

      {/* Click-away layer while a card is open */}
      {focusedId && (
        <button
          className="focus-catch"
          onClick={onClose}
          aria-label="Close card"
        />
      )}
    </div>
  );
}
