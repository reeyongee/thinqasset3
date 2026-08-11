import {
  BENEFITS_HEADLINE_LINE1,
  BENEFITS_HEADLINE_LINE2,
} from "./constants";

export function BenefitsHeadline() {
  return (
    <div className="benefits-headline w-full max-w-[600px] will-change-transform">
      <h2
        id="benefits-heading"
        className="font-display m-0 text-left text-[40px] leading-[1.1] tracking-[-2px] text-white [text-wrap:balance]"
      >
        {BENEFITS_HEADLINE_LINE1}{" "}
        <span className="text-ta-gold">{BENEFITS_HEADLINE_LINE2}</span>
      </h2>
    </div>
  );
}
