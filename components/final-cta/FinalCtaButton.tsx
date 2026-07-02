import { FINAL_CTA_COPY, FINAL_CTA_HREF, FINAL_CTA_TOKENS } from "./constants";

export function FinalCtaButton() {
  return (
    <a
      href={FINAL_CTA_HREF}
      className="final-cta-button group relative z-[1] inline-flex h-10 items-center justify-center gap-2 overflow-hidden rounded-[62px] px-4 no-underline transition-colors duration-200 hover:bg-white/[0.1]"
      style={{ backgroundColor: FINAL_CTA_TOKENS.btnBg }}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] border border-solid"
        style={{ borderColor: FINAL_CTA_TOKENS.btnBorder, borderWidth: "1.5px" }}
      />
      <span className="relative whitespace-pre font-[family-name:var(--font-inter)] text-base font-medium leading-6 tracking-[-0.32px] text-white">
        {FINAL_CTA_COPY.button}
      </span>
    </a>
  );
}
