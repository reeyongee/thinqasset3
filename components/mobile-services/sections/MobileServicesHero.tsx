import { SERVICES_HERO } from "@/components/services/constants";

export function MobileServicesHero() {
  return (
    <section
      className="mobile-services-hero"
      aria-labelledby="mobile-services-hero-heading"
    >
      <div className="mobile-services-hero__inner">
        <p className="mobile-services-eyebrow" data-transition-text="body">
          {SERVICES_HERO.eyebrow}
        </p>

        <p
          className="mobile-services-hero__brand"
          data-transition-text="headline"
        >
          {SERVICES_HERO.brand}
        </p>

        <h1
          id="mobile-services-hero-heading"
          className="mobile-services-hero__headline"
          data-transition-text="headline"
        >
          {SERVICES_HERO.headlineLines.map((line) => (
            <span key={line} className="mobile-services-hero__line">
              {line}
            </span>
          ))}
        </h1>

        <p
          className="mobile-services-hero__subline"
          data-transition-text="body"
        >
          {SERVICES_HERO.subline}
        </p>

        <p className="mobile-services-hero__meta" data-transition-text="body">
          {SERVICES_HERO.meta}
        </p>
      </div>
    </section>
  );
}
