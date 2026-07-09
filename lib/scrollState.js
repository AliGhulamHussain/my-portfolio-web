// Shared mutable state bridging the DOM world (GSAP / Lenis / pointer)
// and the WebGL world (useFrame). Never triggers React re-renders.
export const scrollState = {
  progress: 0,           // 0 -> 1 across the whole page
  mouse: { x: 0, y: 0 }, // normalized -1 -> 1
  reduced: false,
  lenis: null,           // set by SmoothScroll; used to lock scroll on focus
};
