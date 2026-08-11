import {
  GAUGE_CX,
  GAUGE_CY,
  gaugeArcPath,
  gaugeNeedleRotation,
} from "../featureVisualUtils";

const GAUGE_TRACK = `M ${GAUGE_CX - 100} ${GAUGE_CY} A 100 100 0 0 1 ${GAUGE_CX + 100} ${GAUGE_CY}`;
const NEEDLE_PATH =
  "M 7.455 0 C 8.646 0 9.635 0.92 9.721 2.107 L 14.819 72.079 C 15.131 76.357 11.744 80 7.455 80 C 3.165 80 -0.222 76.357 0.09 72.079 L 5.188 2.107 C 5.275 0.92 6.264 0 7.455 0 Z M 7.455 66.521 C 4.115 66.521 1.407 69.228 1.407 72.568 C 1.407 75.908 4.115 78.616 7.455 78.616 C 10.794 78.616 13.502 75.908 13.502 72.568 C 13.502 69.228 10.794 66.521 7.455 66.521 Z";

const INITIAL_PERCENT = 0;

export function ExposureGauge() {
  const needleRot = gaugeNeedleRotation(INITIAL_PERCENT);

  return (
    <div className="relative flex h-full w-full items-center justify-center p-6">
      <div className="relative aspect-[240/140] w-[85%] max-w-[304px]">
        <svg viewBox="0 0 240 140" className="h-full w-full" aria-hidden>
          <path
            d={GAUGE_TRACK}
            fill="none"
            stroke="var(--ta-grey-border)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            className="feature-gauge-fill"
            d={gaugeArcPath(INITIAL_PERCENT)}
            fill="none"
            strokeWidth="12"
            strokeLinecap="butt"
          />
          <g
            className="feature-gauge-needle"
            transform={`rotate(${needleRot}, ${GAUGE_CX}, ${GAUGE_CY})`}
          >
            <g transform={`translate(${GAUGE_CX - 7.455}, ${GAUGE_CY - 80})`}>
              <path d={NEEDLE_PATH} fill="var(--ta-gold)" />
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
}
