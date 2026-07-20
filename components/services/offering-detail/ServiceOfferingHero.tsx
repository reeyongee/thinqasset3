"use client";

import Image from "next/image";
import { useRef } from "react";
import { TransitionLink } from "@/components/transition/TransitionLink";
import { StructureJurisdictionHeroMap } from "./StructureJurisdictionHeroMap";
import type { OfferingGlobeLocationId } from "./types";
import { useServiceOfferingHeroAnimation } from "./useServiceOfferingHeroAnimation";

export type ServiceOfferingHeroNav = {
  previousHref: string;
  previousTitle: string;
  nextHref: string;
  nextTitle: string;
};

export type ServiceOfferingHeroProps = {
  index: string;
  title: string;
  lede: string;
  kicker?: string;
  image: { src: string; alt: string };
  globeLocationId?: OfferingGlobeLocationId;
  breadcrumb: {
    pillarTitle: string;
    pillarHref: string;
  };
  nav: ServiceOfferingHeroNav;
};

export function ServiceOfferingHero({
  index,
  title,
  lede,
  kicker = "Core offering",
  image,
  globeLocationId,
  breadcrumb,
  nav,
}: ServiceOfferingHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  useServiceOfferingHeroAnimation({ sectionRef });

  return (
    <section
      ref={sectionRef}
      className="od-hero sd-section"
      data-transition-page
    >
      <div className="od-hero__top sd-container">
        <div className="od-hero__chrome">
          <nav
            className="sd-breadcrumb od-hero__breadcrumb"
            aria-label="Breadcrumb"
          >
            <span className="od-crumb">
              <TransitionLink href="/services">Services</TransitionLink>
              <span className="sd-breadcrumb__sep" aria-hidden>
                /
              </span>
            </span>
            <span className="od-crumb od-crumb--pillar">
              <TransitionLink href={breadcrumb.pillarHref}>
                {breadcrumb.pillarTitle}
              </TransitionLink>
              <span className="sd-breadcrumb__sep" aria-hidden>
                /
              </span>
            </span>
            <span className="od-crumb od-crumb--current">
              <span className="sd-breadcrumb__current" aria-current="page">
                {title}
              </span>
            </span>
          </nav>

          <nav className="od-hero__pager" aria-label="Offering navigation">
            <TransitionLink
              href={nav.previousHref}
              className="od-hero__pager-btn"
              aria-label={`Previous offering: ${nav.previousTitle}`}
            >
              ← Previous
            </TransitionLink>
            <TransitionLink
              href={nav.nextHref}
              className="od-hero__pager-btn"
              aria-label={`Next offering: ${nav.nextTitle}`}
            >
              Next →
            </TransitionLink>
          </nav>
        </div>

        <div className="od-hero__intro">
          <p className="od-hero__index" aria-hidden>
            {index}
          </p>
          <div className="od-hero__copy">
            <p className="od-hero__kicker" data-transition-text="body">
              {kicker}
            </p>
            <h1
              className="od-hero__title sd-h1"
              data-transition-text="headline"
            >
              {title}
            </h1>
            <p
              className="od-hero__lede sd-body"
              data-transition-text="body"
            >
              {lede}
            </p>
          </div>
        </div>
      </div>

      <div className="od-hero__media-wrap">
        <div
          className={
            globeLocationId
              ? "od-hero__media od-hero__media--city-map"
              : "od-hero__media"
          }
        >
          {globeLocationId ? (
            <StructureJurisdictionHeroMap locationId={globeLocationId} />
          ) : (
            <Image
              src={image.src}
              alt={image.alt}
              width={1600}
              height={900}
              sizes="100vw"
              className="od-hero__img"
              priority
            />
          )}
          <div className="od-hero__media-veil" aria-hidden />
        </div>
      </div>
    </section>
  );
}
