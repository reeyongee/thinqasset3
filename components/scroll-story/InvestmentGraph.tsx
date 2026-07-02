import { InvestmentGraphChart } from "./InvestmentGraphChart";

export function InvestmentGraph({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 122 98"
      preserveAspectRatio="xMidYMid meet"
      overflow="visible"
      aria-hidden
    >
      <defs>
        <filter
          id="scroll-story-focal-glow"
          x="-100%"
          y="-100%"
          width="300%"
          height="300%"
        >
          <feGaussianBlur stdDeviation="1.4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g className="scroll-story-pov-scale">
        <g className="scroll-story-pov-pan">
          <InvestmentGraphChart />
          <circle cx="16.5" cy="54" r="1.5" className="scroll-story-origin-point" />
          <g className="scroll-story-dots">
            <circle cx="26" cy="42" r="1.5" />
            <circle cx="35.3" cy="33" r="1.5" />
            <circle cx="44.9" cy="21" r="1.5" />
            <circle cx="54.2" cy="14" r="1.5" />
            <circle cx="63.6" cy="22" r="1.5" />
            <circle cx="73" cy="30" r="1.5" />
            <circle cx="82.5" cy="26" r="1.5" />
            <circle cx="92" cy="33" r="1.5" />
            <circle cx="101.4" cy="38.5" r="1.5" />
            <circle cx="110.5" cy="35" r="1.5" />
          </g>
          <circle className="scroll-story-focal-point" r="1.5" />
          <path
            className="scroll-story-path-ghost"
            fill="none"
            strokeWidth="2.5"
            d="M16.5 54c3.83-6 9.33-12 9.33-12L35.5 32.5S44 22.33 44.67 21s6.33-6.83 9.5-7 13.83 14 19 15.67 7.17-4 9.17-3.5 14.5 11.33 18.17 12 8.67-.67 10-3"
          />
          <path
            className="scroll-story-path"
            fill="none"
            strokeWidth="1.15"
            d="M16.5 54c3.83-6 9.33-12 9.33-12L35.5 32.5S44 22.33 44.67 21s6.33-6.83 9.5-7 13.83 14 19 15.67 7.17-4 9.17-3.5 14.5 11.33 18.17 12 8.67-.67 10-3"
          />
        </g>
      </g>
    </svg>
  );
}
