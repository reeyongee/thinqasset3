import gsap from "gsap";

/** Approximate Hark capture ease: cubic-bezier(0.85, 0, 0.15, 1). */
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
    d * 3 * t2
  );
}

function cubicBezierY(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  t: number,
) {
  if (t <= 0) return 0;
  if (t >= 1) return 1;
  let guess = t;
  for (let i = 0; i < 8; i++) {
    const x = cubic(0, x1, x2, 1, guess);
    const dx = cubicDerivative(0, x1, x2, 1, guess);
    if (Math.abs(dx) < 1e-6) break;
    guess = Math.min(1, Math.max(0, guess - (x - t) / dx));
  }
  return cubic(0, y1, y2, 1, guess);
}

let registered = false;

export function ensureHarkEase() {
  if (registered) return "harkMove";
  gsap.registerEase("harkMove", (progress) =>
    cubicBezierY(0.85, 0, 0.15, 1, progress),
  );
  registered = true;
  return "harkMove";
}
