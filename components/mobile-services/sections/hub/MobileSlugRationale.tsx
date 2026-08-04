import Image from "next/image";
import { HeroButton } from "@/components/hero/HeroButton";
import { MobileReveal } from "@/components/mobile-home/MobileReveal";
import { CONSULTATION_HREF } from "@/lib/transition/constants";
import type { SlugImage } from "../../types";

type MobileSlugRationaleProps = {
  headline: string;
  paragraphs: readonly [string, string];
  image: SlugImage;
};

export function MobileSlugRationale({
  headline,
  paragraphs,
  image,
}: MobileSlugRationaleProps) {
  return (
    <section
      className="mobile-slug-section"
      aria-labelledby="mobile-slug-rationale-heading"
    >
      <MobileReveal>
        <h2
          id="mobile-slug-rationale-heading"
          className="mobile-services-section__headline"
        >
          {headline}
        </h2>
      </MobileReveal>

      <MobileReveal delay={0.05}>
        <div className="mobile-slug-rationale__media">
          <Image
            src={image.src}
            alt={image.alt}
            width={720}
            height={540}
            sizes="100vw"
            className="mobile-slug-rationale__image"
          />
        </div>
      </MobileReveal>

      <div className="mobile-slug-rationale__copy">
        {paragraphs.map((paragraph, index) => (
          <MobileReveal key={paragraph.slice(0, 24)} delay={0.08 + index * 0.04}>
            <p className="mobile-slug-body">{paragraph}</p>
          </MobileReveal>
        ))}
      </div>

      <MobileReveal delay={0.16}>
        <div className="mobile-slug-rationale__cta">
          <HeroButton className="w-full" label="Consultation" href={CONSULTATION_HREF} />
        </div>
      </MobileReveal>
    </section>
  );
}
