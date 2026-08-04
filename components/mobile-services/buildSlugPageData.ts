import {
  getOfferingDetail,
} from "@/components/services/offering-detail/ServiceOfferingDetail";
import {
  getOtherServicePillars,
  getPillarOfferingSlides,
  getServicePillarImage,
  JOURNEY_IMAGE_HOLD_ITEMS,
  resolveOfferingCarouselImage,
  resolveOfferingHeroImage,
  resolveOfferingScrollImage,
  resolveServiceRelatedCards,
  SERVICE_COLUMNS,
  type ServiceColumn,
  type ServicePageEntry,
} from "@/components/services/constants";
import type {
  OfferingNeighbor,
  OfferingRelatedCardData,
  SlugHubData,
  SlugOfferingData,
  SlugPageData,
} from "./types";

const PILLAR_COPY: Record<
  ServiceColumn["id"],
  {
    relatedLabel: string;
    pagerLabel: string;
    kicker: string;
    relatedHeadline: string;
  }
> = {
  "fund-platform": {
    relatedLabel: "All fund platform offerings",
    pagerLabel: "Core offerings",
    kicker: "Core offering",
    relatedHeadline: "Continue through the platform",
  },
  structures: {
    relatedLabel: "All structures",
    pagerLabel: "Jurisdictions",
    kicker: "Structure",
    relatedHeadline: "Other jurisdictions",
  },
  corporate: {
    relatedLabel: "All corporate services",
    pagerLabel: "Capabilities",
    kicker: "Capability",
    relatedHeadline: "Related capabilities",
  },
};

function resolveNeighbor(
  pillar: ServiceColumn,
  index: number,
): OfferingNeighbor {
  const offering = pillar.offerings[index]!;
  const detail = getOfferingDetail(offering.slug);

  return {
    href: `/services/${offering.slug}`,
    index: detail?.index ?? String(index + 1).padStart(2, "0"),
    title: detail?.title ?? offering.title,
  };
}

export function buildSlugPageData(
  page: ServicePageEntry,
  slug: string,
): SlugPageData | null {
  const pillar = SERVICE_COLUMNS.find((column) => column.id === page.pillarId);
  if (!pillar) return null;

  const pillarImage = getServicePillarImage(page.pillarId);
  const isPillarHub = !page.parentHref;
  const offeringDetail = !isPillarHub ? getOfferingDetail(slug) : undefined;

  if (offeringDetail) {
    const offeringIndex = Math.max(
      pillar.offerings.findIndex((offering) => offering.slug === slug),
      0,
    );
    const copy = PILLAR_COPY[pillar.id];
    const heroImage = resolveOfferingHeroImage(slug);
    const stackImage = resolveOfferingCarouselImage(
      pillar.id,
      offeringIndex + 2,
    );

    const total = pillar.offerings.length;
    const previousIndex = (offeringIndex - 1 + total) % total;
    const nextIndex = (offeringIndex + 1) % total;

    const relatedCards = offeringDetail.relatedSlugs
      .map((relatedSlug) => {
        const related = getOfferingDetail(relatedSlug);
        const offering = pillar.offerings.find(
          (entry) => entry.slug === relatedSlug,
        );
        if (!related || !offering) return null;

        const relatedIndex = pillar.offerings.findIndex(
          (entry) => entry.slug === relatedSlug,
        );

        return {
          href: `/services/${relatedSlug}`,
          index: related.index,
          title: related.title,
          summary: offering.summary,
          image: resolveOfferingCarouselImage(
            pillar.id,
            Math.max(relatedIndex, 0),
          ),
        } satisfies OfferingRelatedCardData;
      })
      .filter((card): card is OfferingRelatedCardData => card !== null);

    const offeringData: SlugOfferingData = {
      mode: "offering",
      content: offeringDetail,
      pillar,
      offeringIndex,
      heroImage,
      stackImage,
      kicker: copy.kicker,
      relatedHeadline: copy.relatedHeadline,
      relatedLabel: copy.relatedLabel,
      pagerLabel: copy.pagerLabel,
      previous: resolveNeighbor(pillar, previousIndex),
      next: resolveNeighbor(pillar, nextIndex),
      relatedCards,
    };

    return offeringData;
  }

  const relatedCards =
    pillar.related
      ? resolveServiceRelatedCards(pillar, isPillarHub ? undefined : slug)
      : null;

  const carouselSlides =
    isPillarHub && pillar.carouselHeadline
      ? getPillarOfferingSlides(pillar)
      : getOtherServicePillars(pillar.id);

  const carouselHeadline =
    isPillarHub && pillar.carouselHeadline
      ? pillar.carouselHeadline
      : "Our other services";

  const offeringsBand =
    isPillarHub || (page.highlights?.length ?? 0) > 0
      ? {
          headline:
            isPillarHub && pillar.journeyStages
              ? pillar.journeyStages.headline
              : isPillarHub
                ? pillar.offeringsHeadline
                : `${page.title} — at a glance`,
          imageHoldItems:
            isPillarHub && pillar.journeyStages
              ? JOURNEY_IMAGE_HOLD_ITEMS
              : undefined,
          items:
            isPillarHub && pillar.journeyStages
              ? pillar.journeyStages.stages.map((stage, index) => ({
                  name: stage.title,
                  description: stage.summary,
                  image: resolveOfferingScrollImage(
                    pillar.id,
                    index,
                    JOURNEY_IMAGE_HOLD_ITEMS,
                  ),
                }))
              : isPillarHub
                ? pillar.offerings.map((offering, index) => ({
                    name: offering.title,
                    description: offering.summary,
                    image: resolveOfferingScrollImage(pillar.id, index),
                    href: `/services/${offering.slug}`,
                  }))
                : (page.highlights ?? []).map((highlight, index) => ({
                    name: highlight,
                    description: "",
                    image: resolveOfferingScrollImage(pillar.id, index),
                  })),
        }
      : null;

  const hubData: SlugHubData = {
    mode: "hub",
    page,
    landing: {
      title: page.title,
      description: page.summary,
      image: {
        src:
          pillarImage?.src ??
          "/thinqasset-assets/services/fund-platform/hero.png",
        alt: pillarImage?.alt ?? page.title,
      },
      eyebrow: isPillarHub ? page.eyebrow : undefined,
      hubBreadcrumb: isPillarHub,
      breadcrumb:
        page.parentHref && pillar
          ? { pillarTitle: pillar.title, pillarHref: page.parentHref }
          : undefined,
    },
    offerings: offeringsBand,
    rationale: {
      headline: pillar.rationale.headline,
      paragraphs: pillar.rationale.paragraphs,
      image: pillar.rationale.image || {
        src: pillar.image.src,
        alt: pillar.rationale.headline,
      },
    },
    carousel: {
      headline: carouselHeadline,
      slides: carouselSlides,
    },
    outcomes: {
      headline: pillar.outcomes.headline,
      intro: pillar.outcomes.intro,
      benefits: pillar.outcomes.benefits,
      image: pillar.outcomes.image || {
        src: pillar.image.src,
        alt: pillar.outcomes.headline,
      },
    },
    faqs: {
      headline: pillar.faqs.headline,
      items: pillar.faqs.items,
    },
    spotlight: pillar.spotlight
      ? {
          headline: pillar.spotlight.headline,
          subtitle: pillar.spotlight.subtitle,
          cards: pillar.spotlight.cards,
        }
      : null,
    related: relatedCards
      ? {
          headline: pillar.related!.headline,
          linkHref: pillar.related!.linkHref,
          linkLabel: pillar.related!.linkLabel,
          cards: relatedCards,
        }
      : null,
  };

  return hubData;
}
