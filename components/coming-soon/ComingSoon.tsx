import { ThinqAssetNavLogo, THINQASSET_LOGO_ALT } from "@/components/brand/ThinqAssetNavLogo";
import "./coming-soon.css";

// Each path repeats every 1440 units, half the viewBox, so shifting by -50% loops seamlessly.
const WAVES = [
  "M0 420 Q360 250 720 420 T1440 420 T2160 420 T2880 420 V900 H0 Z",
  "M0 540 Q360 730 720 540 T1440 540 T2160 540 T2880 540 V900 H0 Z",
  "M0 670 Q360 540 720 670 T1440 670 T2160 670 T2880 670 V900 H0 Z",
];

export function ComingSoon() {
  return (
    <main data-transition-page className="coming-soon">
      <div className="coming-soon__waves" aria-hidden="true">
        {WAVES.map((d, i) => (
          <svg key={d} className="coming-soon__wave" viewBox="0 0 2880 900" preserveAspectRatio="none">
            <defs>
              <linearGradient id={`coming-soon-glass-${i}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0.25" stopColor="#fff" stopOpacity="0.14" />
                <stop offset="1" stopColor="#fff" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d={d}
              fill={`url(#coming-soon-glass-${i})`}
              stroke="#fff"
              strokeOpacity="0.28"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        ))}
      </div>
      <div className="coming-soon__content">
        <span role="img" aria-label={THINQASSET_LOGO_ALT}>
          <ThinqAssetNavLogo />
        </span>
        <h1 className="coming-soon__title">Coming soon</h1>
      </div>
    </main>
  );
}
