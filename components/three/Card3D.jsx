"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import CardFace from "@/components/ui/CardFace";
import { cardTarget } from "@/lib/deck";
import { scrollState } from "@/lib/scrollState";
import { interaction } from "@/lib/interaction";
import { createSpring, stepSpring } from "@/lib/springs";

const fwd = new THREE.Vector3();

/**
 * One physical card. Every frame we compute where the choreography wants
 * it (lib/deck.js cardTarget) and let a spring chase that target — the
 * overshoot & settle is what makes the deal feel like real cards.
 */
export default function Card3D({ card, index, focusedId, onFocus, onClose }) {
  const group = useRef();
  const shellRef = useRef(null);
  const actRef = useRef(0);
  const { camera } = useThree();

  const focused = focusedId === card.id;

  // px py pz rx ry rz scale
  const spring = useMemo(
    () => createSpring([0, -2.55, index * 0.016, 0, Math.PI, 0, 1]),
    [index]
  );

  useFrame((state, delta) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    const { progress, mouse } = scrollState;
    const spreadK = THREE.MathUtils.clamp(state.viewport.aspect / 1.55, 0.52, 1);

    let target;

    if (focused) {
      // Fly to just in front of the camera and face it.
      camera.getWorldDirection(fwd);
      const p = camera.position.clone().add(fwd.multiplyScalar(6.4));
      target = [
        p.x,
        p.y,
        p.z,
        camera.rotation.x,
        camera.rotation.y,
        camera.rotation.z,
        1.16,
      ];
      actRef.current = 1;
    } else {
      const [x, y, z, rx, ry, rz, s, act] = cardTarget(
        card,
        index,
        progress,
        t,
        spreadK
      );
      actRef.current = act;
      target = [x, y, z, rx, ry, rz, s];

      // Hover lift — only when the card is properly dealt out
      if (interaction.hoveredId === card.id && act > 0.75 && !focusedId) {
        target[1] += 0.28;
        target[2] += 0.45;
        target[5] *= 0.4; // straighten
        target[6] = 1.05;
      }

      // Whole tableau leans gently toward the cursor
      target[0] += mouse.x * 0.14 * act;
      target[4] += mouse.x * 0.05 * act;
      target[3] += -mouse.y * 0.04 * act;
    }

    stepSpring(spring, target, delta);
    const s = spring.x;
    group.current.position.set(s[0], s[1], s[2]);
    group.current.rotation.set(s[3], s[4], s[5]);
    group.current.scale.setScalar(s[6]);

    // Front face normal is +z; after rotating by ry its z-component is cos(ry).
    // Negative = card faces away from the camera → show the back.
    if (shellRef.current) {
      shellRef.current.classList.toggle("is-back", Math.cos(s[4]) < 0);
    }
  });

  return (
    <group ref={group}>
      <Html
        transform
        distanceFactor={3.2}
        style={{ pointerEvents: "none" }}
        zIndexRange={focused ? [16777271, 16777000] : [16776000, 0]}
        wrapperClass="card-html"
      >
        <div
          ref={shellRef}
          className={`card-shell is-back ${focused ? "is-focused" : ""}`}
          style={{ pointerEvents: "auto" }}
          onPointerEnter={() => (interaction.hoveredId = card.id)}
          onPointerLeave={() => {
            if (interaction.hoveredId === card.id) interaction.hoveredId = null;
          }}
          onClick={() => (focused ? onClose() : onFocus(card.id))}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              focused ? onClose() : onFocus(card.id);
            }
          }}
          aria-label={`${card.title} card`}
        >
          <CardFace card={card} focused={focused} onClose={onClose} />
        </div>
      </Html>
    </group>
  );
}
