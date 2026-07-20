"use client";

import { SERVICES_HERO } from "./constants";

export function ServicesHero() {
  return (
    <section
      className="services-hero"
      aria-labelledby="services-hero-heading"
    >
      <div className="services-hero__layout">
        <div className="services-hero__copy">
          <p className="services-eyebrow" data-transition-text="body">
            {SERVICES_HERO.eyebrow}
          </p>

          <p className="services-hero__brand" data-transition-text="headline">
            {SERVICES_HERO.brand}
          </p>

          <h1
            id="services-hero-heading"
            className="services-hero__headline"
            data-transition-text="headline"
          >
            {SERVICES_HERO.headlineLines.map((line) => (
              <span key={line} className="services-hero__line">
                {line}
              </span>
            ))}
          </h1>

          <p className="services-hero__subline" data-transition-text="body">
            {SERVICES_HERO.subline}
          </p>

          <p className="services-hero__meta" data-transition-text="body">
            {SERVICES_HERO.meta}
          </p>
        </div>

        {/* Reserved for a future visual / interactive — keep empty for now */}
        <div
          className="services-hero__aside"
          aria-hidden="true"
          data-slot="services-hero-visual"
        />
      </div>
    </section>
  );
}
