/** Evaluate CSS cubic-bezier(x1,y1,x2,y2) for t in [0,1]. */

function cubic(a: number, b: number, c: number, d: number, t: number) {
  const t2 = t * t;
  const t3 = t2 * t;
  return (
    a * (1 - 3 * t + 3 * t2 - t3) +
    b * (3 * t - 6 * t2 + 3 * t3) +
    c * (3 * t2 - 3 * t3) +
    d * t3
  );
}

function cubicDerivative(a: number, b: number, c: number, d: number, t: number) {
  const t2 = t * t;
  return (
    a * (-3 + 6 * t - 3 * t2) +
    b * (3 - 12 * t + 9 * t2) +
    c * (6 * t - 9 * t2) +
    d * (3 * t2)
  );
}

/** Map linear progress → eased progress for cubic-bezier control points. */
export function cubicBezier(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  t: number,
): number {
  if (t <= 0) return 0;
  if (t >= 1) return 1;

  let guess = t;
  for (let i = 0; i < 8; i++) {
    const x = cubic(0, x1, x2, 1, guess);
    const dx = cubicDerivative(0, x1, x2, 1, guess);
    if (Math.abs(dx) < 1e-6) break;
    guess -= (x - t) / dx;
    guess = Math.min(1, Math.max(0, guess));
  }

  return cubic(0, y1, y2, 1, guess);
}

export function easeMove(t: number, ease: readonly [number, number, number, number]) {
  return cubicBezier(ease[0], ease[1], ease[2], ease[3], t);
}

/** Piecewise keyframes: [timeSec, value]. Linear within holds; eased on moves. */
export function sampleKeyed(
  time: number,
  keys: readonly (readonly [number, number])[],
  ease: readonly [number, number, number, number],
): number {
  if (keys.length === 0) return 0;
  if (time <= keys[0][0]) return keys[0][1];
  const last = keys[keys.length - 1];
  if (time >= last[0]) return last[1];

  for (let i = 0; i < keys.length - 1; i++) {
    const [t0, v0] = keys[i];
    const [t1, v1] = keys[i + 1];
    if (time > t1) continue;
    if (v0 === v1 || t1 === t0) return v0;
    const u = (time - t0) / (t1 - t0);
    const e = easeMove(u, ease);
    return v0 + (v1 - v0) * e;
  }
  return last[1];
}

/** Loop time into [0, duration). */
export function loopTime(elapsed: number, duration: number) {
  if (duration <= 0) return 0;
  const t = elapsed % duration;
  return t < 0 ? t + duration : t;
}
