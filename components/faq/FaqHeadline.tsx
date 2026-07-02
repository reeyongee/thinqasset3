import { FAQ_TOKENS } from "./constants";

export function FaqHeadline() {
  return (
    <div className="faq-headline z-[1] flex w-full max-w-[480px] flex-col gap-3 will-change-transform min-[810px]:sticky min-[810px]:top-40 min-[1200px]:flex-[1_0_0] min-[1200px]:pb-40 max-[809px]:relative">
      <h2
        id="faq-heading"
        className="m-0 text-left font-[family-name:var(--font-geist)] text-[40px] font-light leading-[1.1] tracking-[-1.6px] text-white [text-wrap:balance]"
      >
        Your questions,{" "}
        <span style={{ color: FAQ_TOKENS.muted }}>clearly answered</span>
      </h2>
    </div>
  );
}
