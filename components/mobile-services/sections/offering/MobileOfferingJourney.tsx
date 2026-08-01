import type { OfferingJourneyStep } from "@/components/services/offering-detail/types";
import { MobileReveal } from "@/components/mobile-home/MobileReveal";

type MobileOfferingJourneyProps = {
  steps: readonly OfferingJourneyStep[];
};

export function MobileOfferingJourney({ steps }: MobileOfferingJourneyProps) {
  return (
    <section
      className="mobile-slug-section mobile-slug-section--divider"
      aria-labelledby="mobile-offering-journey-heading"
    >
      <MobileReveal>
        <h2
          id="mobile-offering-journey-heading"
          className="mobile-services-section__headline"
        >
          How it typically unfolds
        </h2>
      </MobileReveal>

      <ol className="mobile-slug-offering-journey__list">
        {steps.map((step, index) => (
          <MobileReveal
            key={step.title}
            as="li"
            className="mobile-slug-offering-journey__item mobile-slug-card"
            delay={index * 0.04}
          >
            <span className="mobile-slug-offering-journey__index" aria-hidden>
              {String(index + 1).padStart(2, "0")}
            </span>
            <div>
              <h3 className="mobile-slug-offering-journey__title">{step.title}</h3>
              <p className="mobile-slug-body">{step.detail}</p>
            </div>
          </MobileReveal>
        ))}
      </ol>
    </section>
  );
}
