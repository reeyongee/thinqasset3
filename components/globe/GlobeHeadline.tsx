import { GLOBE_LEAD, GLOBE_SUBHEADING } from "./constants";

export function GlobeHeadline() {
  return (
    <div className="globe-headline flex w-full max-w-[600px] flex-col gap-3 will-change-transform">
      <h2
        id="global-footprint-heading"
        className="font-display m-0 text-left text-[40px] leading-[1.1] tracking-[-2px] text-white [text-wrap:balance]"
      >
        Our Global{" "}
        <span className="text-ta-gold">Footprint</span>
      </h2>
      <p className="m-0 font-[family-name:var(--font-inter)] text-base font-normal leading-[1.4] tracking-[-0.02em] text-white">
        {GLOBE_LEAD}
      </p>
      <p className="m-0 font-[family-name:var(--font-inter)] text-base font-normal leading-[1.5] tracking-[-0.02em] text-token-muted">
        {GLOBE_SUBHEADING}
      </p>
    </div>
  );
}
