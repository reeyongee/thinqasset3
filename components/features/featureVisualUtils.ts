/** Semicircle gauge fill path (matches Framer Xi gauge component). */
export function gaugeArcPath(percent: number) {
  const start = "M 20 119.99999999999999";

  if (percent <= 0) {
    return `${start} A 100 100 0 0 1 20 119.99999999999999`;
  }

  const angleDeg = (percent / 100) * 180;
  const endRad = (angleDeg * Math.PI) / 180;
  const x = 120 + 100 * Math.cos(endRad);
  const y = 120 - 100 * Math.sin(endRad);
  const largeArc = angleDeg > 180 ? 1 : 0;

  return `${start} A 100 100 0 ${largeArc} 1 ${x} ${y}`;
}
