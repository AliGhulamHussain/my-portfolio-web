"use client";

import { useEffect, useRef } from "react";

/**
 * Dot + trailing ring. The ring swells into a "view" lens over cards
 * and tightens over links. Fine pointers only — touch keeps the OS default.
 */
export default function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    document.documentElement.classList.add("has-cursor");

    const p = { x: -100, y: -100 };
    const r = { x: -100, y: -100 };
    let raf;

    const onMove = (e) => {
      p.x = e.clientX;
      p.y = e.clientY;
      const t = e.target;
      const onCard = !!t.closest?.(".card-shell") && !t.closest("a, button");
      ring.current?.classList.toggle("is-card", onCard);
      ring.current?.classList.toggle("is-link", !!t.closest?.("a, button"));
      if (ring.current) {
        ring.current.textContent =
          onCard && !document.body.classList.contains("deck-focus") ? "VIEW" : "";
      }
    };

    const loop = () => {
      r.x += (p.x - r.x) * 0.18;
      r.y += (p.y - r.y) * 0.18;
      if (dot.current) dot.current.style.transform = `translate3d(${p.x}px, ${p.y}px, 0)`;
      if (ring.current) ring.current.style.transform = `translate3d(${r.x}px, ${r.y}px, 0)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("has-cursor");
    };
  }, []);

  return (
    <>
      <div ref={ring} className="cursor-ring" aria-hidden="true" />
      <div ref={dot} className="cursor-dot" aria-hidden="true" />
    </>
  );
}
