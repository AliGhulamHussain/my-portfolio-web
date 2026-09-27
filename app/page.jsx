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
import Loader from "@/components/ui/Loader";
import Cursor from "@/components/ui/Cursor";

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
        <a href="#" className="display italic text-lg pointer-events-auto">
          AGH
        </a>
        <a
          href="mailto:alighulamhussain007@gmail.com"
          className="eyebrow pointer-events-auto hover:text-ink transition-colors flex items-center gap-2"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-accent2" />
          Available for work
        </a>
      </header>

      {reduced ? (
        <StaticDeck />
      ) : (
        <>
          <Loader />
          <Cursor />
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
