"use client";

import { TransitionLink } from "@/components/transition/TransitionLink";
import { PageHero } from "@/components/page-hero/PageHero";

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
  breadcrumb,
  nav,
}: ServiceOfferingHeroProps) {
  return (
    <>
      <PageHero
        lines={[title]}
        subtitle={lede}
        meta={[kicker, `Services / ${breadcrumb.pillarTitle}`, index]}
        imageSrc={image.src}
      />
      <div className="border-b border-line/20 bg-ink">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4 px-5 py-3 font-tmono text-[9px] uppercase tracking-[0.22em] text-paper/55 sm:px-6 md:px-14">
          <nav className="flex flex-wrap items-center gap-2" aria-label="Breadcrumb">
            <TransitionLink href="/services">Services</TransitionLink>
            <span aria-hidden>/</span>
            <TransitionLink href={breadcrumb.pillarHref}>{breadcrumb.pillarTitle}</TransitionLink>
            <span aria-hidden>/</span>
            <span className="text-paper/75">{title}</span>
          </nav>
          <nav className="hidden items-center gap-4 sm:flex" aria-label="Offering navigation">
            <TransitionLink href={nav.previousHref} className="hover:text-brass">
              ← Previous
            </TransitionLink>
            <TransitionLink href={nav.nextHref} className="hover:text-brass">
              Next →
            </TransitionLink>
          </nav>
        </div>
      </div>
    </>
  );
}
