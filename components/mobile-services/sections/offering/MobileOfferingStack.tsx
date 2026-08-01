import Image from "next/image";
import type { OfferingCapability } from "@/components/services/offering-detail/types";
import { MobileReveal } from "@/components/mobile-home/MobileReveal";
import type { SlugImage } from "../../types";

type MobileOfferingStackProps = {
  capabilities: readonly OfferingCapability[];
  image: SlugImage;
};

export function MobileOfferingStack({
  capabilities,
  image,
}: MobileOfferingStackProps) {
  return (
    <section
      className="mobile-slug-section"
      aria-labelledby="mobile-offering-stack-heading"
    >
      <MobileReveal>
        <h2
          id="mobile-offering-stack-heading"
          className="mobile-services-section__headline"
        >
          What you get
        </h2>
      </MobileReveal>

      <MobileReveal delay={0.05}>
        <div className="mobile-slug-offering-stack__media">
          <Image
            src={image.src}
            alt={image.alt}
            width={720}
            height={540}
            sizes="100vw"
            className="mobile-slug-offering-stack__image"
          />
        </div>
      </MobileReveal>

      <ol className="mobile-slug-offering-stack__list">
        {capabilities.map((capability, index) => (
          <MobileReveal
            key={capability.title}
            as="li"
            className="mobile-slug-offering-stack__item mobile-slug-card"
            delay={0.08 + index * 0.03}
          >
            <span className="mobile-slug-offering-stack__index" aria-hidden>
              {String(index + 1).padStart(2, "0")}
            </span>
            <div>
              <h3 className="mobile-slug-offering-stack__title">
                {capability.title}
              </h3>
              <p className="mobile-slug-body">{capability.detail}</p>
            </div>
          </MobileReveal>
        ))}
      </ol>
    </section>
  );
}
