import { MobileReveal } from "@/components/mobile-home/MobileReveal";

type MobileOfferingProofProps = {
  outcomes: readonly string[];
};

export function MobileOfferingProof({ outcomes }: MobileOfferingProofProps) {
  return (
    <section
      className="mobile-slug-section"
      aria-labelledby="mobile-offering-proof-heading"
    >
      <MobileReveal>
        <h2
          id="mobile-offering-proof-heading"
          className="mobile-services-section__headline"
        >
          What changes for you
        </h2>
      </MobileReveal>

      <ul className="mobile-slug-offering-proof__list">
        {outcomes.map((outcome, index) => (
          <MobileReveal
            key={outcome}
            as="li"
            className="mobile-slug-offering-proof__item mobile-slug-card"
            delay={index * 0.03}
          >
            <span className="mobile-slug-offering-proof__check" aria-hidden>
              ✓
            </span>
            <span>{outcome}</span>
          </MobileReveal>
        ))}
      </ul>
    </section>
  );
}
