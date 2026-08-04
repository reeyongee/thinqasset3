import { FinalCtaButton } from "./FinalCtaButton";
import { FinalCtaHeadline } from "./FinalCtaHeadline";

export function FinalCtaSection() {
  return (
    <section
      id="final-cta"
      aria-labelledby="final-cta-heading"
      className="final-cta-section section-intrinsic-sm mx-auto flex w-full max-w-[1200px] flex-col items-center gap-10 px-4 py-24 min-[810px]:px-6"
    >
      <FinalCtaHeadline />
      <FinalCtaButton />
    </section>
  );
}
