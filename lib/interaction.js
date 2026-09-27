// Hover state shared between DOM events and the r3f frame loop
// without triggering React re-renders. tilt = cursor within the
// hovered card, normalized -1 -> 1.
export const interaction = { hoveredId: null, tilt: { x: 0, y: 0 } };
