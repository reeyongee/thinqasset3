const MARKS = [
  { label: "MU", angle: -90 },
  { label: "SG", angle: -30 },
  { label: "AE", angle: 30 },
  { label: "LU", angle: 90 },
  { label: "HK", angle: 150 },
  { label: "UK", angle: 210 },
] as const;

function polar(cx: number, cy: number, r: number, deg: number) {
  const rad = (deg * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

export function DisciplineViz() {
  const cx = 150;
  const cy = 120;
  const outerR = 78;
  const lockR = 42;

  const hexPoints = Array.from({ length: 6 }, (_, i) => {
    const p = polar(cx, cy, 56, -90 + i * 60);
    return `${p.x},${p.y}`;
  }).join(" ");

  return (
    <svg
      className="scroll-beat-viz scroll-beat-viz-discipline"
      viewBox="0 0 300 240"
      aria-hidden
    >
      <polygon
        className="discipline-hex"
        points={hexPoints}
        fill="none"
        stroke="var(--ta-gold)"
        strokeWidth="1.25"
        strokeOpacity="0"
      />

      <circle
        className="discipline-seal"
        cx={cx}
        cy={cy}
        r="22"
        fill="color-mix(in srgb, var(--ta-gold) 14%, transparent)"
        stroke="var(--ta-gold)"
        strokeWidth="1.5"
        strokeOpacity="0"
      />

      <circle
        className="discipline-seal-inner"
        cx={cx}
        cy={cy}
        r="10"
        fill="none"
        stroke="var(--ta-gold)"
        strokeWidth="1"
        strokeOpacity="0"
      />

      <g className="discipline-marks">
        {MARKS.map((mark, i) => {
          const start = polar(cx, cy, outerR, mark.angle);
          const end = polar(cx, cy, lockR, mark.angle);
          return (
            <g
              key={mark.label}
              className={`discipline-mark discipline-mark-${i}`}
              data-end-x={end.x}
              data-end-y={end.y}
            >
              <circle
                className="discipline-mark-dot"
                cx={start.x}
                cy={start.y}
                r="5"
                fill="var(--ta-navy-card)"
                stroke="var(--ta-gold)"
                strokeWidth="1.25"
              />
              <text
                className="discipline-mark-label"
                x={start.x}
                y={start.y}
                textAnchor="middle"
                dominantBaseline="central"
                fill="var(--ta-gold)"
                fontSize="7"
                fontFamily="var(--font-inter), sans-serif"
                opacity="0.75"
              >
                {mark.label}
              </text>
            </g>
          );
        })}
      </g>
    </svg>
  );
}
