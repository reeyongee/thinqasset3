import { TransitionLink } from "@/components/transition/TransitionLink";
import type { SlugLandingData } from "../../types";
import Image from "next/image";

type MobileSlugLandingProps = {
  landing: SlugLandingData;
};

export function MobileSlugLanding({ landing }: MobileSlugLandingProps) {
  return (
    <section
      className="mobile-slug-landing"
      aria-labelledby="mobile-slug-landing-heading"
    >
      <div className="mobile-slug-landing__copy">
        {landing.hubBreadcrumb ? (
          <nav
            className="mobile-slug-breadcrumb"
            aria-label="Breadcrumb"
            data-transition-item
          >
            <TransitionLink href="/services">Services</TransitionLink>
            <span aria-hidden>/</span>
            <span aria-current="page">{landing.title}</span>
          </nav>
        ) : landing.breadcrumb ? (
          <nav
            className="mobile-slug-breadcrumb"
            aria-label="Breadcrumb"
            data-transition-item
          >
            <TransitionLink href="/services">Services</TransitionLink>
            <span aria-hidden>/</span>
            <TransitionLink href={landing.breadcrumb.pillarHref}>
              {landing.breadcrumb.pillarTitle}
            </TransitionLink>
            <span aria-hidden>/</span>
            <span aria-current="page">{landing.title}</span>
          </nav>
        ) : landing.eyebrow ? (
          <p className="mobile-services-eyebrow" data-transition-text="body">
            {landing.eyebrow}
          </p>
        ) : null}

        <h1
          id="mobile-slug-landing-heading"
          className="mobile-slug-landing__title"
          data-transition-text="headline"
        >
          {landing.title}
        </h1>

        <p
          className="mobile-slug-landing__description"
          data-transition-text="body"
        >
          {landing.description}
        </p>
      </div>

      <div className="mobile-slug-landing__media" data-transition-item>
        <Image
          src={landing.image.src}
          alt={landing.image.alt}
          width={1400}
          height={800}
          sizes="100vw"
          className="mobile-slug-landing__image"
          priority
        />
      </div>
    </section>
  );
}
