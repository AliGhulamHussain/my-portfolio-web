// Semi-implicit spring integrator — this is what makes the cards feel
// physical: they overshoot slightly and settle, instead of tweening.
export function createSpring(values, stiffness = 130, damping = 15) {
  return {
    x: [...values],
    v: values.map(() => 0),
    k: stiffness,
    c: damping,
  };
}

export function stepSpring(s, targets, dt) {
  const step = Math.min(dt, 1 / 30); // avoid explosions on tab-switch
  for (let i = 0; i < s.x.length; i++) {
    const a = s.k * (targets[i] - s.x[i]) - s.c * s.v[i];
    s.v[i] += a * step;
    s.x[i] += s.v[i] * step;
  }
}

export function snapSpring(s, targets) {
  for (let i = 0; i < s.x.length; i++) {
    s.x[i] = targets[i];
    s.v[i] = 0;
  }
}
