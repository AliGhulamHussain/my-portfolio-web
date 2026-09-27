"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import SplitText from "@/components/ui/SplitText";
import CardFace from "@/components/ui/CardFace";
import { SECTIONS, SUITS, ZONES, CARDS, ZONE_COUNTS, CONTACT_INFO, CLOSING_LINE } from "@/lib/deck";
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
        transition={{ delay: 2.3, duration: 0.8 }}
      >
        Portfolio · {CARDS.length} cards · Badin, Sindh
      </motion.p>

      <h1 className="display font-light text-[clamp(3rem,8.5vw,7.25rem)] leading-[0.95]">
        <SplitText text="Ali Ghulam Hussain" delay={2.4} />
      </h1>

      <motion.p
        className="mt-7 text-base md:text-lg text-ink/75 max-w-xl"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3.2, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="display italic text-ink text-xl md:text-2xl">
          {CONTACT_INFO.role}
        </span>
        <br />
        Founder of eduKtion. I build real software for real businesses.
      </motion.p>

      <motion.p
        className="mt-6 font-mono text-[10px] text-muted tracking-[0.3em] uppercase"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.6, duration: 0.8 }}
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
  projects: { kicker: "Projects", line: "Shipped work, dealt one by one." },
  contact: { kicker: "Contact", line: "Your cards. Take one." },
};

export function ZoneSections() {
  return (
    <>
      {SECTIONS.slice(1).map((s) => (
        <section key={s.id} style={{ height: `${s.vh}vh` }} className="relative">
          <div className="sticky top-0 h-screen pointer-events-none px-6 md:px-12 py-24 flex flex-col justify-between">
            <div className="max-w-xs">
              <p className="eyebrow">
                <span className="text-accent mr-2">{SUITS[s.id].glyph}</span>
                {HEADINGS[s.id].kicker}
              </p>
              <p className="display font-light text-2xl md:text-[2rem] leading-tight mt-3 text-ink/90">
                {HEADINGS[s.id].line}
              </p>
            </div>
            {s.id === "contact" && (
              <p className="display font-light text-center text-[clamp(2rem,5vw,3.6rem)] text-ink pb-6">
                Let&apos;s build something{" "}
                <span className="italic text-accent">real.</span>
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
        className="font-mono text-[10px] tracking-[0.2em] text-muted bg-canvas/60 backdrop-blur-md px-3.5 py-2 rounded-full border border-white/[0.07] whitespace-pre"
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
      <p className="display italic font-light text-base md:text-lg text-ink/70 max-w-xl mx-auto mb-8">
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
        {"  ·  "}
        <a className="hover:text-accent transition-colors" href={CONTACT_INFO.portfolio}>
          alighulam.eduktion.org
        </a>
      </p>
      <p className="text-xs text-muted mt-4">
        © {new Date().getFullYear()} Ali Ghulam Hussain · {CONTACT_INFO.role} — dealt from Badin, Sindh.
      </p>
    </footer>
  );
}

/* ── Reduced-motion fallback: the whole deck as a static grid ── */
export function StaticDeck() {
  return (
    <main className="relative z-10 px-6 py-24 max-w-6xl mx-auto">
      <p className="eyebrow text-center">Portfolio deck · {CARDS.length} cards</p>
      <h1 className="display font-light text-5xl md:text-7xl text-center mt-4">
        Ali Ghulam Hussain
      </h1>
      <p className="text-center text-muted mt-3">
        {CONTACT_INFO.role} — every card is real, shipped software.
      </p>

      {SECTIONS.slice(1).map((s) => (
        <section key={s.id} className="mt-20">
          <p className="eyebrow mb-8">
            <span className="text-accent mr-2">{SUITS[s.id].glyph}</span>
            {HEADINGS[s.id].kicker}
          </p>
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
