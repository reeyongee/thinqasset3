import Image from "next/image";
import { MobileReveal } from "@/components/mobile-home/MobileReveal";
import { TransitionLink } from "@/components/transition/TransitionLink";
import type { SlugJourneyItem } from "../../types";

type MobileSlugJourneyProps = {
  headline: string;
  items: readonly SlugJourneyItem[];
};

export function MobileSlugJourney({ headline, items }: MobileSlugJourneyProps) {
  return (
    <section
      className="mobile-slug-section"
      aria-labelledby="mobile-slug-journey-heading"
    >
      <MobileReveal>
        <h2
          id="mobile-slug-journey-heading"
          className="mobile-services-section__headline"
        >
          {headline}
        </h2>
      </MobileReveal>

      <ul className="mobile-slug-journey__list">
        {items.map((item, index) => {
          const content = (
            <>
              {item.image ? (
                <div className="mobile-slug-journey__thumb">
                  <Image
                    src={item.image.src}
                    alt={item.image.alt}
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="mobile-slug-journey__thumb-spacer" aria-hidden />
              )}
              <div className="mobile-slug-journey__body">
                <h3 className="mobile-slug-journey__name">{item.name}</h3>
                {item.description ? (
                  <p className="mobile-slug-journey__desc">{item.description}</p>
                ) : null}
              </div>
            </>
          );

          return (
            <MobileReveal
              key={`${item.name}-${index}`}
              as="li"
              className="mobile-slug-journey__item mobile-slug-card"
              delay={index * 0.04}
            >
              {item.href ? (
                <TransitionLink
                  href={item.href}
                  className="mobile-slug-journey__link mobile-pressable"
                >
                  {content}
                </TransitionLink>
              ) : (
                content
              )}
            </MobileReveal>
          );
        })}
      </ul>
    </section>
  );
}
