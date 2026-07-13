"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import SplitText from "@/components/ui/SplitText";
import CardFace from "@/components/ui/CardFace";
import { SECTIONS, ZONES, CARDS, ZONE_COUNTS, CONTACT_INFO, CLOSING_LINE } from "@/lib/deck";
import { scrollState } from "@/lib/scrollState";

/* ── Hero overlay (scrolls away as the dealing begins) ──────── */
export function Hero() {
  return (
    <section
      className="relative flex flex-col items-center text-center px-6 pt-[16vh]"
      style={{ height: `${SECTIONS[0].vh}vh` }}
    >
      <motion.p
        className="eyebrow mb-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        Portfolio · {CARDS.length} cards
      </motion.p>

      <h1 className="font-display font-semibold tracking-tight text-[clamp(2.5rem,7.5vw,5.6rem)] leading-[1.02]">
        <SplitText text="Ali Ghulam Hussain" delay={0.35} />
      </h1>

      <motion.p
        className="mt-5 text-lg md:text-xl text-ink/80"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.35, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        Full-Stack Developer —{" "}
        <span className="text-accent">I build real software for real businesses.</span>
      </motion.p>

      <motion.p
        className="mt-4 font-mono text-xs text-muted tracking-widest uppercase"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.9, duration: 0.8 }}
      >
        Scroll to deal · Click any card to open
      </motion.p>
    </section>
  );
}

/* ── Spacer sections with sticky headings ───────────────────── */
const HEADINGS = {
  about: { kicker: "Identity", line: "Three cards about me." },
  skills: { kicker: "Skills", line: "The hand I play with." },
  projects: { kicker: "Projects", line: "Dealt one by one — watch the table." },
  contact: { kicker: "Contact", line: "Your cards. Take one." },
};

export function ZoneSections() {
  return (
    <>
      {SECTIONS.slice(1).map((s) => (
        <section key={s.id} style={{ height: `${s.vh}vh` }} className="relative">
          <div className="sticky top-0 h-screen pointer-events-none px-6 md:px-12 py-24 flex flex-col justify-between">
            <div className="max-w-xs">
              <p className="eyebrow">{HEADINGS[s.id].kicker}</p>
              <p className="font-display text-xl md:text-2xl font-medium mt-2 text-ink/85">
                {HEADINGS[s.id].line}
              </p>
            </div>
            {s.id === "contact" && (
              <p className="font-display text-center text-[clamp(1.6rem,4vw,2.8rem)] font-medium text-ink/90 pb-6">
                Let&apos;s build something{" "}
                <span className="text-accent">real.</span>
              </p>
            )}
          </div>
        </section>
      ))}
    </>
  );
}

/* ── HUD: live "cards dealt" counter, bottom-left ───────────── */
export function HUD() {
  const ref = useRef(null);

  useEffect(() => {
    let raf;
    const zoneOf = (p) =>
      SECTIONS.find((s) => p >= ZONES[s.id].start && p <= ZONES[s.id].end) ||
      SECTIONS[SECTIONS.length - 1];

    const dealtBefore = (zoneId) => {
      let n = 0;
      for (const s of SECTIONS) {
        if (s.id === zoneId) break;
        n += ZONE_COUNTS[s.id] || 0;
      }
      return n;
    };

    const tick = () => {
      const p = scrollState.progress;
      const z = zoneOf(p);
      const zc = ZONE_COUNTS[z.id] || 0;
      const local = (p - ZONES[z.id].start) / (ZONES[z.id].end - ZONES[z.id].start);
      const inZone = Math.round(Math.min(1, Math.max(0, local * 1.15)) * zc);
      const dealt = Math.min(CARDS.length, dealtBefore(z.id) + inZone);
      if (ref.current) {
        ref.current.textContent = `ZONE · ${z.label.toUpperCase()}  —  DEALT ${String(
          dealt
        ).padStart(2, "0")}/${CARDS.length}`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="fixed bottom-5 left-5 z-30 pointer-events-none">
      <span
        ref={ref}
        className="font-mono text-[10px] tracking-[0.18em] text-muted bg-surface/70 backdrop-blur px-3 py-1.5 rounded-full border border-line"
      >
        ZONE · THE DECK — DEALT 00/{CARDS.length}
      </span>
    </div>
  );
}

/* ── Plain footer (also the accessible/crawlable contact) ───── */
export function Footer() {
  return (
    <footer className="relative z-20 px-6 py-10 text-center">
      <p className="font-display italic text-sm md:text-base text-ink/70 max-w-xl mx-auto mb-8">
        &ldquo;{CLOSING_LINE}&rdquo;
      </p>
      <p className="font-mono text-[11px] tracking-widest text-muted uppercase">
        <a className="hover:text-accent transition-colors" href={`mailto:${CONTACT_INFO.email}`}>
          {CONTACT_INFO.email}
        </a>
        {"  ·  "}
        <a className="hover:text-accent transition-colors" href={CONTACT_INFO.linkedin} target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a>
        {"  ·  "}
        <a className="hover:text-accent transition-colors" href={CONTACT_INFO.github} target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
        {"  ·  "}
        <a className="hover:text-accent transition-colors" href="tel:+923163765386">
          {CONTACT_INFO.phone}
        </a>
      </p>
      <p className="text-xs text-muted mt-4">
        © {new Date().getFullYear()} Ali Ghulam Hussain — dealt from Hyderabad, Sindh.
      </p>
    </footer>
  );
}

/* ── Reduced-motion fallback: the whole deck as a static grid ── */
export function StaticDeck() {
  return (
    <main className="relative z-10 px-6 py-24 max-w-6xl mx-auto">
      <p className="eyebrow text-center">Portfolio deck · {CARDS.length} cards</p>
      <h1 className="font-display font-semibold text-4xl md:text-6xl text-center mt-4">
        Ali Ghulam Hussain
      </h1>
      <p className="text-center text-muted mt-3">
        Full-Stack Developer — every card is real, shipped software.
      </p>

      {SECTIONS.slice(1).map((s) => (
        <section key={s.id} className="mt-20">
          <p className="eyebrow mb-8">{HEADINGS[s.id].kicker}</p>
          <div className="flex flex-wrap gap-8 justify-center">
            {CARDS.filter((c) => c.zone === s.id).map((card) => (
              <div key={card.id} className="card-shell static-card">
                <CardFace card={card} focused />
              </div>
            ))}
          </div>
        </section>
      ))}
      <Footer />
    </main>
  );
}
