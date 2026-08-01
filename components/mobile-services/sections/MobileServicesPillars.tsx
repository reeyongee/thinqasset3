import Image from "next/image";
import { HeroButton } from "@/components/hero/HeroButton";
import { TransitionLink } from "@/components/transition/TransitionLink";
import { SERVICE_COLUMNS } from "@/components/services/constants";

export function MobileServicesPillars() {
  return (
    <section
      className="mobile-services-pillars"
      aria-labelledby="mobile-services-pillars-heading"
    >
      <h2
        id="mobile-services-pillars-heading"
        className="mobile-services-section__headline"
        data-transition-text="headline"
      >
        Three platforms.{" "}
        <span className="text-ta-gold">One operating model.</span>
      </h2>

      <div className="mobile-services-pillars__list">
        {SERVICE_COLUMNS.map((column, index) => (
          <article
            key={column.id}
            className="mobile-services-pillar"
            data-transition-item
            aria-labelledby={`mobile-pillar-${column.id}-title`}
          >
            <div className="mobile-services-pillar__media">
              <Image
                src={column.image.src}
                alt={column.image.alt}
                fill
                sizes="(max-width: 767px) 100vw, 50vw"
                className="mobile-services-pillar__image"
                priority={index === 0}
              />
              <div className="mobile-services-pillar__media-shade" aria-hidden />
            </div>

            <div className="mobile-services-pillar__body">
              <span className="mobile-services-pillar__index">
                {column.index}
              </span>

              <h3
                id={`mobile-pillar-${column.id}-title`}
                className="mobile-services-pillar__title"
              >
                {column.title}
              </h3>

              <p className="mobile-services-pillar__teaser">{column.teaser}</p>

              <p className="mobile-services-pillar__blurb">{column.blurb}</p>

              <ul className="mobile-services-pillar__offerings">
                {column.offerings.slice(0, 3).map((offering) => (
                  <li key={offering.slug}>
                    <TransitionLink
                      href={`/services/${offering.slug}`}
                      className="mobile-services-pillar__offering-link mobile-pressable"
                    >
                      {offering.title}
                    </TransitionLink>
                  </li>
                ))}
              </ul>

                <HeroButton
                  href={column.href}
                  label="Explore pillar"
                  className="mobile-services-pillar__cta w-full"
                />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
