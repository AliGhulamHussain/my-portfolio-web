"use client";

import dynamic from "next/dynamic";
import SmoothScroll from "@/components/SmoothScroll";
import {
  Hero,
  ZoneSections,
  HUD,
  Footer,
  StaticDeck,
} from "@/components/sections/DeckSections";
import { useReducedMotion } from "@/lib/useReducedMotion";

// The 3D deck is client-only and lazy-loaded.
const DeckExperience = dynamic(
  () => import("@/components/three/DeckExperience"),
  { ssr: false, loading: () => <div className="webgl-layer" /> }
);

export default function Home() {
  const reduced = useReducedMotion();

  return (
    <SmoothScroll>
      <header className="fixed top-0 inset-x-0 z-30 flex items-center justify-between px-6 md:px-10 py-5 pointer-events-none">
        <a href="#" className="font-display font-bold tracking-wide text-sm pointer-events-auto">
          AGH<span className="text-accent"></span>
        </a>
        <a
          href="mailto:alighulamhussain007@gmail.com"
          className="eyebrow pointer-events-auto hover:text-ink transition-colors"
        >
          Available for work
        </a>
      </header>

      {reduced ? (
        <StaticDeck />
      ) : (
        <>
          <DeckExperience />
          <div className="hud-dim">
            <HUD />
          </div>
          <main className="content-layer">
            <Hero />
            <ZoneSections />
            <Footer />
          </main>
        </>
      )}
    </SmoothScroll>
  );
}
