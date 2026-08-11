import {
  APPROACH_HEADLINE_LINE1,
  APPROACH_HEADLINE_LINE2,
} from "./constants";

export function OurApproachHeadline() {
  return (
    <div className="approach-headline w-full max-w-[600px] will-change-transform">
      <h2
        id="services-heading"
        className="font-display m-0 text-left text-[40px] leading-[1.1] tracking-[-2px] text-white [text-wrap:balance] max-[809px]:text-[26px] max-[809px]:leading-[1.15] max-[809px]:tracking-[-1px]"
      >
        {APPROACH_HEADLINE_LINE1}{" "}
        <span className="text-ta-gold">{APPROACH_HEADLINE_LINE2}</span>
      </h2>
    </div>
  );
}
