"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CARDS } from "@/lib/deck";

const N = 9; // cards drawn in the loader — enough to read as a deck
const DURATION = 2100;

// Deterministic scatter so the loader never looks random-janky
const from = Array.from({ length: N }, (_, i) => {
  const a = i * 2.39996; // golden angle
  return { x: Math.cos(a) * (140 + i * 14), y: Math.sin(a) * (90 + i * 10), r: (i % 2 ? 1 : -1) * (18 + i * 6) };
});

/** Cards assemble into the deck one by one, then the table is revealed. */
export default function Loader() {
  const [done, setDone] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const start = performance.now();
    let raf;
    const tick = (t) => {
      const k = Math.min(1, (t - start) / (DURATION - 400));
      setCount(Math.round(k * CARDS.length));
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    const id = setTimeout(() => setDone(true), DURATION);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(id);
    };
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="loader"
          exit={{ opacity: 0, filter: "blur(6px)" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex flex-col items-center gap-10">
            <div className="loader-stack">
              {from.map((f, i) => (
                <motion.div
                  key={i}
                  className="loader-card"
                  initial={{ x: f.x, y: f.y, rotate: f.r, opacity: 0 }}
                  animate={{ x: 0, y: -i * 1.5, rotate: (i % 3) - 1, opacity: 1 }}
                  transition={{
                    delay: 0.1 + i * 0.13,
                    type: "spring",
                    stiffness: 170,
                    damping: 17,
                  }}
                />
              ))}
            </div>
            <p className="font-mono text-[10px] tracking-[0.3em] text-muted">
              SHUFFLING · {String(count).padStart(2, "0")}/{CARDS.length}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
