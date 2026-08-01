import { MobileReveal } from "@/components/mobile-home/MobileReveal";

type MobileOfferingAudiencesProps = {
  audiences: readonly string[];
};

export function MobileOfferingAudiences({
  audiences,
}: MobileOfferingAudiencesProps) {
  return (
    <section
      className="mobile-slug-section"
      aria-labelledby="mobile-offering-audiences-heading"
    >
      <MobileReveal>
        <h2
          id="mobile-offering-audiences-heading"
          className="mobile-services-section__headline"
        >
          Built for
        </h2>
      </MobileReveal>

      <ul className="mobile-slug-offering-audiences__list">
        {audiences.map((audience, index) => (
          <MobileReveal
            key={audience}
            as="li"
            className="mobile-slug-offering-audiences__item"
            delay={index * 0.03}
          >
            {audience}
          </MobileReveal>
        ))}
      </ul>
    </section>
  );
}
