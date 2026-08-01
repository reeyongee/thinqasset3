import Image from "next/image";
import type {
  ServiceSpotlightCard,
} from "@/components/services/constants";
import type { ServiceDetailRelatedCard } from "@/components/services/ServiceDetailRelated";
import { MobileReveal } from "@/components/mobile-home/MobileReveal";
import { TransitionLink } from "@/components/transition/TransitionLink";

type SpotlightProps = {
  variant: "spotlight";
  headline: string;
  subtitle?: string;
  cards: readonly [ServiceSpotlightCard, ServiceSpotlightCard];
};

type RelatedProps = {
  variant: "related";
  headline: string;
  linkHref: string;
  linkLabel: string;
  cards: readonly [ServiceDetailRelatedCard, ServiceDetailRelatedCard];
};

type MobileSlugSpotlightProps = SpotlightProps | RelatedProps;

export function MobileSlugSpotlight(props: MobileSlugSpotlightProps) {
  if (props.variant === "spotlight") {
    return (
      <section
        className="mobile-slug-section"
        aria-labelledby="mobile-slug-spotlight-heading"
      >
        <MobileReveal>
          <h2
            id="mobile-slug-spotlight-heading"
            className="mobile-services-section__headline"
          >
            {props.headline}
          </h2>
        </MobileReveal>

        {props.subtitle ? (
          <MobileReveal delay={0.04}>
            <p className="mobile-slug-body mobile-slug-spotlight__subtitle">
              {props.subtitle}
            </p>
          </MobileReveal>
        ) : null}

        <div className="mobile-slug-spotlight__list">
          {props.cards.map((card, index) => (
            <MobileReveal key={card.title} delay={0.06 + index * 0.04}>
              <article className="mobile-slug-card mobile-slug-spotlight__card">
                <div className="mobile-slug-spotlight__media">
                  <Image
                    src={card.image.src}
                    alt={card.image.alt}
                    fill
                    sizes="100vw"
                    className="object-cover"
                  />
                </div>
                <div className="mobile-slug-spotlight__body">
                  <p className="mobile-slug-spotlight__meta">{card.meta}</p>
                  <h3 className="mobile-slug-spotlight__title">{card.title}</h3>
                  <p className="mobile-slug-spotlight__desc">{card.description}</p>
                </div>
              </article>
            </MobileReveal>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section
      className="mobile-slug-section"
      aria-labelledby="mobile-slug-related-heading"
    >
      <div className="mobile-slug-related__header">
        <MobileReveal>
          <h2
            id="mobile-slug-related-heading"
            className="mobile-services-section__headline"
          >
            {props.headline}
          </h2>
        </MobileReveal>

        <MobileReveal delay={0.04}>
          <TransitionLink
            href={props.linkHref}
            className="mobile-slug-related__link mobile-pressable"
          >
            {props.linkLabel} →
          </TransitionLink>
        </MobileReveal>
      </div>

      <div className="mobile-slug-spotlight__list">
        {props.cards.map((card, index) => {
          const [cardTitle, ...metaParts] = card.meta.split(" • ");
          const metaLabel = metaParts.join(" • ");

          return (
            <MobileReveal key={card.href} delay={0.06 + index * 0.04}>
              <TransitionLink
                href={card.href}
                className="mobile-slug-card mobile-slug-spotlight__card mobile-pressable"
              >
                <div className="mobile-slug-spotlight__media">
                  <Image
                    src={card.image.src}
                    alt={card.image.alt}
                    fill
                    sizes="100vw"
                    className="object-cover"
                  />
                </div>
                <div className="mobile-slug-spotlight__body">
                  {metaLabel ? (
                    <p className="mobile-slug-spotlight__meta">{metaLabel}</p>
                  ) : null}
                  <h3 className="mobile-slug-spotlight__title">{cardTitle}</h3>
                  <p className="mobile-slug-spotlight__desc">{card.description}</p>
                </div>
              </TransitionLink>
            </MobileReveal>
          );
        })}
      </div>
    </section>
  );
}
