import { FINAL_CTA_COPY, FINAL_CTA_TOKENS } from "./constants";

export function FinalCtaHeadline() {
  return (
    <div className="final-cta-copy relative z-[1] flex w-full max-w-[480px] flex-col items-center gap-4 overflow-hidden text-center">
      <h3
        id="final-cta-heading"
        className="m-0 w-full font-[family-name:var(--font-geist)] text-2xl font-light leading-[1.3] tracking-[-0.72px] text-white"
      >
        {FINAL_CTA_COPY.title}
      </h3>
      <p
        className="m-0 w-full font-[family-name:var(--font-inter)] text-base font-normal leading-[1.4] tracking-[-0.32px]"
        style={{ color: FINAL_CTA_TOKENS.muted }}
      >
        {FINAL_CTA_COPY.subtitle}
      </p>
    </div>
  );
}
