# Ali Ghulam Hussain — Portfolio Deck

The entire portfolio is a deck of 20 tech playing cards levitating over a
grid "dealer's table". As you scroll, cards deal out of the deck with spring
physics — flipping face-up mid-flight — into formations per section, then
fold back in. Any card can be clicked to fly to the camera and open.

Light AI-tech theme: cool white canvas, circuit-blue accent (#2E5BFF), teal
and violet only in the holographic card backs.

## Setup

```bash
npm install
npm run dev
```

Before deploying, replace `YOUR_GITHUB_USERNAME` in `lib/deck.js`.

## How it works

- **`lib/deck.js`** — the single source of truth: card content, scroll zones
  (derived from section heights so DOM spacers and 3D choreography never
  drift), formations, and `cardTarget()` — the pure function that answers
  "where should card N be at scroll progress P".
- **`lib/springs.js`** — a semi-implicit spring integrator. Cards don't
  tween to their targets; they're *pulled* by springs, so they overshoot
  and settle like real cards. This is the physics feel.
- **`components/three/Card3D.jsx`** — each card is an r3f group carrying a
  drei `<Html transform>` DOM card (crisp text, real links, clickable).
  Card size: 280×400px at distanceFactor 3.2 ≈ 2.2×3.2 world units.
  drei sorts DOM z-index by camera distance every frame, so overlapping
  cards in the stack always layer correctly.
- **Choreography** — identity and skills deal into fans; projects deal one
  by one to centre stage then get tossed onto left/right discard piles
  (the table fills up as you scroll); contact cards fly out with a full
  360° toss-spin. Scrubbing backwards reverses everything.
- **Focus mode** — click a card: Lenis pauses, the card springs to the
  camera and expands its details; everything else dims. Esc / click-away /
  ✕ closes.
- **Reduced motion** — the canvas is skipped entirely and the deck renders
  as a static, fully readable card grid.

## Zones

| Section  | Cards | Formation                          |
|----------|-------|------------------------------------|
| Hero     | —     | full deck stacked, breathing       |
| Identity | 3     | centre fan                         |
| Skills   | 5     | wide arc                           |
| Projects | 8     | centre stage → discard piles       |
| Contact  | 4     | toss-spin out into a fan           |
