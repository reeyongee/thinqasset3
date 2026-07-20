"use client";

import Image from "next/image";
import { useRef } from "react";
import { TransitionLink } from "@/components/transition/TransitionLink";
import { useServiceDetailLandingAnimation } from "./useServiceDetailLandingAnimation";

export type ServiceDetailLandingProps = {
  title: string;
  description: string;
  image: {
    src: string;
    alt: string;
  };
  eyebrow?: string;
  breadcrumb?: {
    pillarTitle: string;
    pillarHref: string;
  };
};

export function ServiceDetailLanding({
  title,
  description,
  image,
  eyebrow,
  breadcrumb,
}: ServiceDetailLandingProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useServiceDetailLandingAnimation({ sectionRef });

  return (
    <section
      ref={sectionRef}
      className="sd-landing sd-section"
      data-transition-page
    >
      <div className="sd-container">
        {breadcrumb ? (
          <nav className="sd-breadcrumb" aria-label="Breadcrumb">
            <TransitionLink href="/services">Services</TransitionLink>
            <span className="sd-breadcrumb__sep" aria-hidden>
              /
            </span>
            <TransitionLink href={breadcrumb.pillarHref}>
              {breadcrumb.pillarTitle}
            </TransitionLink>
            <span className="sd-breadcrumb__sep" aria-hidden>
              /
            </span>
            <span className="sd-breadcrumb__current" aria-current="page">
              {title}
            </span>
          </nav>
        ) : eyebrow ? (
          <p className="services-eyebrow" data-transition-text="body">
            {eyebrow}
          </p>
        ) : null}

        <h1
          className="sd-headline sd-h1"
          data-transition-text="headline"
        >
          {title}
        </h1>
        <p
          className="sd-description sd-body"
          data-transition-text="body"
        >
          {description}
        </p>
      </div>

      <div className="sd-landing__media sd-container">
        <div className="sd-hero-image">
          <Image
            src={image.src}
            alt={image.alt}
            width={1400}
            height={800}
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1200px"
            className="h-auto w-full object-cover"
            priority
          />
        </div>
      </div>
    </section>
  );
}
