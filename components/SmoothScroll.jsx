"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { scrollState } from "@/lib/scrollState";
import { useReducedMotion } from "@/lib/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }) {
  const reduced = useReducedMotion();

  useEffect(() => {
    const onMove = (e) => {
      scrollState.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      scrollState.mouse.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    const progressTrigger = ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        scrollState.progress = self.progress;
      },
    });

    let lenis;
    let tick;
    if (!reduced) {
      lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
      scrollState.lenis = lenis;
      lenis.on("scroll", ScrollTrigger.update);
      tick = (time) => lenis.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
    }

    // Spacer heights can shift slightly after hydration/font load —
    // refresh once the first paint has settled so scroll distance is accurate.
    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      window.removeEventListener("mousemove", onMove);
      progressTrigger.kill();
      if (lenis) {
        gsap.ticker.remove(tick);
        lenis.destroy();
        scrollState.lenis = null;
      }
    };
  }, [reduced]);

  return children;
}
