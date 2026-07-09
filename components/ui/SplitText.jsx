"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";

/**
 * Character-by-character reveal. Words stay intact (no mid-word wrapping)
 * while each character animates in individually.
 */
export default function SplitText({ text, className = "", delay = 0 }) {
  const reduced = useReducedMotion();
  const words = text.split(" ");
  let charIndex = 0;

  if (reduced) {
    return <span className={className}>{text}</span>;
  }

  return (
    <span className={className} aria-label={text} role="text">
      {words.map((word, wi) => (
        <span key={wi} className="inline-block whitespace-nowrap">
          {word.split("").map((char, ci) => {
            const i = charIndex++;
            return (
              <motion.span
                key={ci}
                className="inline-block"
                initial={{ opacity: 0, y: "0.5em", rotateX: 40 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{
                  duration: 0.7,
                  delay: delay + i * 0.035,
                  ease: [0.22, 1, 0.36, 1],
                }}
                aria-hidden="true"
              >
                {char}
              </motion.span>
            );
          })}
          {wi < words.length - 1 && <span>&nbsp;</span>}
        </span>
      ))}
    </span>
  );
}
