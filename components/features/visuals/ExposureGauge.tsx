import { GaugeNeedleIcon } from "../svgs/SourceIcons";

export function ExposureGauge() {
  return (
    <div className="relative flex h-full w-full items-center justify-center p-6">
      <div className="relative aspect-[160/146] w-[85%] max-w-[304px]">
        <svg
          viewBox="0 0 240 140"
          className="absolute inset-0 h-full w-full"
          aria-hidden
        >
          <path
            d="M 20 119.99999999999999 A 100 100 0 0 1 220 120"
            fill="none"
            stroke="var(--ta-grey-border)"
            strokeWidth="14"
            strokeLinecap="butt"
          />
          <path
            d="M 20 119.99999999999999 A 100 100 0 0 1 220 120"
            fill="none"
            stroke="var(--ta-navy-card)"
            strokeWidth="12"
            strokeLinecap="butt"
          />
        <path
          className="feature-gauge-fill"
          d="M 20 119.99999999999999 A 100 100 0 0 1 20 119.99999999999999"
          fill="none"
          strokeWidth="12"
          strokeLinecap="butt"
        />
        </svg>
        <div
          className="feature-gauge-needle pointer-events-none absolute top-[67%] left-1/2 h-[146px] w-[160px] -translate-x-1/2 -translate-y-1/2 will-change-transform"
          aria-hidden
        >
          <div className="absolute bottom-[66px] left-[73px] h-20 w-[15px]">
            <GaugeNeedleIcon className="h-full w-full text-ta-gold" />
          </div>
        </div>
      </div>
    </div>
  );
}
