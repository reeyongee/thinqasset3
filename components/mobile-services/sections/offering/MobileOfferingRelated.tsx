import Image from "next/image";
import { MobileReveal } from "@/components/mobile-home/MobileReveal";
import { TransitionLink } from "@/components/transition/TransitionLink";
import type { OfferingRelatedCardData } from "../../types";

type MobileOfferingRelatedProps = {
  headline: string;
  cards: readonly OfferingRelatedCardData[];
};

export function MobileOfferingRelated({
  headline,
  cards,
}: MobileOfferingRelatedProps) {
  if (cards.length === 0) return null;

  return (
    <section
      className="mobile-slug-section"
      aria-labelledby="mobile-offering-related-heading"
    >
      <MobileReveal>
        <h2
          id="mobile-offering-related-heading"
          className="mobile-services-section__headline"
        >
          {headline}
        </h2>
      </MobileReveal>

      <div className="mobile-slug-carousel">
        {cards.map((card, index) => (
          <MobileReveal key={card.href} delay={index * 0.04}>
            <TransitionLink
              href={card.href}
              className="mobile-slug-carousel__card mobile-slug-card mobile-pressable"
            >
              <div className="mobile-slug-carousel__media">
                <Image
                  src={card.image.src}
                  alt={card.image.alt}
                  fill
                  sizes="82vw"
                  className="object-cover"
                />
              </div>
              <div className="mobile-slug-carousel__body">
                <h3 className="mobile-slug-carousel__title">{card.title}</h3>
                <p className="mobile-slug-carousel__desc">{card.summary}</p>
              </div>
            </TransitionLink>
          </MobileReveal>
        ))}
      </div>
    </section>
  );
}
