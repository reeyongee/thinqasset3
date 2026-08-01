import Image from "next/image";
import { MobileReveal } from "@/components/mobile-home/MobileReveal";
import type { SlugImage } from "../../types";

type MobileSlugOutcomesProps = {
  headline: string;
  intro: string;
  benefits: readonly [string, string, string, string];
  image: SlugImage;
};

export function MobileSlugOutcomes({
  headline,
  intro,
  benefits,
  image,
}: MobileSlugOutcomesProps) {
  return (
    <section
      className="mobile-slug-section"
      aria-labelledby="mobile-slug-outcomes-heading"
    >
      <MobileReveal>
        <h2
          id="mobile-slug-outcomes-heading"
          className="mobile-services-section__headline"
        >
          {headline}
        </h2>
      </MobileReveal>

      <MobileReveal delay={0.04}>
        <p className="mobile-slug-body mobile-slug-outcomes__intro">{intro}</p>
      </MobileReveal>

      <ul className="mobile-slug-outcomes__list">
        {benefits.map((benefit, index) => (
          <MobileReveal
            key={benefit}
            as="li"
            className="mobile-slug-outcomes__item mobile-slug-card"
            delay={0.06 + index * 0.03}
          >
            <span className="mobile-slug-outcomes__check" aria-hidden>
              ✓
            </span>
            <span>{benefit}</span>
          </MobileReveal>
        ))}
      </ul>

      <MobileReveal delay={0.18}>
        <div className="mobile-slug-outcomes__media">
          <Image
            src={image.src}
            alt={image.alt}
            width={720}
            height={540}
            sizes="100vw"
            className="mobile-slug-outcomes__image"
          />
        </div>
      </MobileReveal>
    </section>
  );
}
