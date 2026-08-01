import Image from "next/image";
import { TransitionLink } from "@/components/transition/TransitionLink";
import type { OfferingNeighbor, SlugImage } from "../../types";

type MobileOfferingHeroProps = {
  index: string;
  kicker: string;
  title: string;
  lede: string;
  heroImage: SlugImage;
  pillarTitle: string;
  pillarHref: string;
  previous: OfferingNeighbor;
  next: OfferingNeighbor;
};

export function MobileOfferingHero({
  index,
  kicker,
  title,
  lede,
  heroImage,
  pillarTitle,
  pillarHref,
  previous,
  next,
}: MobileOfferingHeroProps) {
  return (
    <section
      className="mobile-slug-offering-hero"
      aria-labelledby="mobile-offering-hero-heading"
    >
      <nav
        className="mobile-slug-breadcrumb"
        aria-label="Breadcrumb"
        data-transition-item
      >
        <TransitionLink href="/services">Services</TransitionLink>
        <span aria-hidden>/</span>
        <TransitionLink href={pillarHref}>{pillarTitle}</TransitionLink>
        <span aria-hidden>/</span>
        <span aria-current="page">{title}</span>
      </nav>

      <p className="mobile-slug-offering-hero__meta" data-transition-text="body">
        <span className="mobile-slug-offering-hero__kicker">{kicker}</span>
        <span className="mobile-slug-offering-hero__meta-sep" aria-hidden>
          ·
        </span>
        <span className="mobile-slug-offering-hero__index">{index}</span>
      </p>

      <div className="mobile-slug-offering-hero__media" data-transition-item>
        <Image
          src={heroImage.src}
          alt={heroImage.alt}
          width={1400}
          height={800}
          sizes="100vw"
          className="mobile-slug-offering-hero__image"
          priority
        />
      </div>

      <div className="mobile-slug-offering-hero__copy">
        <h1
          id="mobile-offering-hero-heading"
          className="mobile-slug-offering-hero__title"
          data-transition-text="headline"
        >
          {title}
        </h1>

        <p
          className="mobile-slug-offering-hero__lede"
          data-transition-text="body"
        >
          {lede}
        </p>

        <div className="mobile-slug-offering-hero__nav" data-transition-item>
          <TransitionLink
            href={previous.href}
            className="mobile-slug-offering-hero__nav-link mobile-pressable"
          >
            <span className="mobile-slug-offering-hero__nav-arrow" aria-hidden>
              ←
            </span>
            <span className="mobile-slug-offering-hero__nav-text">
              {previous.title}
            </span>
          </TransitionLink>
          <TransitionLink
            href={next.href}
            className="mobile-slug-offering-hero__nav-link mobile-pressable"
          >
            <span className="mobile-slug-offering-hero__nav-text">
              {next.title}
            </span>
            <span className="mobile-slug-offering-hero__nav-arrow" aria-hidden>
              →
            </span>
          </TransitionLink>
        </div>
      </div>
    </section>
  );
}
