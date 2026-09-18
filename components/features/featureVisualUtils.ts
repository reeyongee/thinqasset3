/** Semicircle gauge geometry — left (0%) → top (50%) → right (100%). */
export const GAUGE_CX = 120;
export const GAUGE_CY = 120;
export const GAUGE_R = 100;
export const GAUGE_TRACK = `M ${GAUGE_CX - GAUGE_R} ${GAUGE_CY} A ${GAUGE_R} ${GAUGE_R} 0 0 1 ${GAUGE_CX + GAUGE_R} ${GAUGE_CY}`;
/** Upper-arc length of the r=100 semicircle track. */
export const GAUGE_ARC_LENGTH = Math.PI * GAUGE_R;

export function clampGaugePercent(percent: number) {
  return Math.max(0, Math.min(100, percent));
}

/** stroke-dashoffset: full length hides the fill, 0 reveals the whole arc. */
export function gaugeFillOffset(percent: number) {
  return GAUGE_ARC_LENGTH * (1 - clampGaugePercent(percent) / 100);
}

/** Needle rotation in degrees: -90 at 0%, 0 at 50%, +90 at 100%. */
export function gaugeNeedleRotation(percent: number) {
  return -90 + (clampGaugePercent(percent) / 100) * 180;
}
