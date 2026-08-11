/** Semicircle gauge geometry — left (0%) → top (50%) → right (100%). */
export const GAUGE_CX = 120;
export const GAUGE_CY = 120;
export const GAUGE_R = 100;

/**
 * Fill path from the left endpoint through the upper arc to `percent`.
 * percent 0 → left; 50 → top; 100 → right.
 */
export function gaugeArcPath(percent: number) {
  const start = `M ${GAUGE_CX - GAUGE_R} ${GAUGE_CY}`;
  const clamped = Math.max(0, Math.min(100, percent));

  if (clamped <= 0) {
    return `${start} A ${GAUGE_R} ${GAUGE_R} 0 0 1 ${GAUGE_CX - GAUGE_R} ${GAUGE_CY}`;
  }

  // Sweep from 180° (left) toward 0° (right) across the upper semicircle.
  const angleDeg = 180 - (clamped / 100) * 180;
  const endRad = (angleDeg * Math.PI) / 180;
  const x = GAUGE_CX + GAUGE_R * Math.cos(endRad);
  const y = GAUGE_CY - GAUGE_R * Math.sin(endRad);
  // Exact semicircle needs large-arc; anything short of that stays on the minor arc.
  const largeArc = clamped >= 100 ? 1 : 0;

  return `${start} A ${GAUGE_R} ${GAUGE_R} 0 ${largeArc} 1 ${x} ${y}`;
}

/** Needle rotation in degrees: -90 at 0%, 0 at 50%, +90 at 100%. */
export function gaugeNeedleRotation(percent: number) {
  const clamped = Math.max(0, Math.min(100, percent));
  return -90 + (clamped / 100) * 180;
}
