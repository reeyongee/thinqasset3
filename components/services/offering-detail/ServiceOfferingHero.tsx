"use client";

import Image from "next/image";
import { useRef } from "react";
import { TransitionLink } from "@/components/transition/TransitionLink";
import { StructureJurisdictionHeroMap } from "./StructureJurisdictionHeroMap";
import { STRUCTURE_CITY_CAMERAS } from "./structureCityCameras";
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
  const isCityMap = Boolean(globeLocationId);

  return (
    <section
      ref={sectionRef}
      className={
        isCityMap ? "od-hero od-hero--city-map sd-section" : "od-hero sd-section"
      }
      data-transition-page
    >
      {isCityMap && globeLocationId ? (
        <div className="od-hero__map-bleed" aria-hidden>
          <StructureJurisdictionHeroMap locationId={globeLocationId} />
          <div className="od-hero__media-overlays">
            <div className="od-hero__media-atmosphere" />
            <div className="od-hero__media-veil" />
            <p className="od-hero__city-map-label">
              {STRUCTURE_CITY_CAMERAS[globeLocationId].label}
            </p>
          </div>
        </div>
      ) : null}

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

      {!isCityMap ? (
        <div className="od-hero__media-wrap">
          <div className="od-hero__media">
            <Image
              src={image.src}
              alt={image.alt}
              width={1600}
              height={900}
              sizes="100vw"
              className="od-hero__img"
              priority
            />
            <div className="od-hero__media-overlays" aria-hidden>
              <div className="od-hero__media-veil" />
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
