/** Map an x-coordinate on the chart to normalized progress (0–1) along an SVG path. */
export function getPathProgressForX(
  path: SVGPathElement,
  targetX: number,
): number {
  const total = path.getTotalLength();
  if (total <= 0) return 0;

  let bestLength = 0;
  let bestDistance = Infinity;

  for (let step = 0; step <= 160; step += 1) {
    const length = (step / 160) * total;
    const point = path.getPointAtLength(length);
    const distance = Math.abs(point.x - targetX);

    if (distance < bestDistance) {
      bestDistance = distance;
      bestLength = length;
    }
  }

  return bestLength / total;
}
