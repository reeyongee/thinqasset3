import {
  resolveOfferingCarouselImage,
  type ServiceColumn,
} from "@/components/services/constants";
import { ServiceOfferingAudiences } from "./ServiceOfferingAudiences";
import { ServiceOfferingHero } from "./ServiceOfferingHero";
import { ServiceOfferingJourney } from "./ServiceOfferingJourney";
import { ServiceOfferingManifest } from "./ServiceOfferingManifest";
import { ServiceOfferingPager } from "./ServiceOfferingPager";
import { ServiceOfferingProof } from "./ServiceOfferingProof";
import { ServiceOfferingRelated } from "./ServiceOfferingRelated";
import { ServiceOfferingStack } from "./ServiceOfferingStack";
import { getOfferingDetail } from "./getOfferingDetail";
import type { OfferingDetailContent } from "./types";
import {
  FUND_PLATFORM_OFFERING_DETAILS,
  getFundPlatformOfferingDetail,
} from "./fundPlatformOfferingContent";
import {
  STRUCTURES_OFFERING_DETAILS,
  getStructuresOfferingDetail,
} from "./structuresOfferingContent";
import {
  CORPORATE_OFFERING_DETAILS,
  getCorporateOfferingDetail,
} from "./corporateOfferingContent";
import "./offering-detail.css";

export type ServiceOfferingDetailProps = {
  content: OfferingDetailContent;
  pillar: ServiceColumn;
  offeringIndex: number;
};

const PILLAR_COPY: Record<
  ServiceColumn["id"],
  { relatedLabel: string; pagerLabel: string; kicker: string; relatedHeadline: string }
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
): { href: string; index: string; title: string } {
  const offering = pillar.offerings[index]!;
  const detail = getOfferingDetail(offering.slug);

  return {
    href: `/services/${offering.slug}`,
    index: detail?.index ?? String(index + 1).padStart(2, "0"),
    title: detail?.title ?? offering.title,
  };
}

export function ServiceOfferingDetail({
  content,
  pillar,
  offeringIndex,
}: ServiceOfferingDetailProps) {
  const copy = PILLAR_COPY[pillar.id];
  const heroImage = resolveOfferingCarouselImage(pillar.id, offeringIndex);
  const stackImage = resolveOfferingCarouselImage(
    pillar.id,
    offeringIndex + 2,
  );

  const total = pillar.offerings.length;
  const previousIndex = (offeringIndex - 1 + total) % total;
  const nextIndex = (offeringIndex + 1) % total;
  const previous = resolveNeighbor(pillar, previousIndex);
  const next = resolveNeighbor(pillar, nextIndex);

  const relatedCards = content.relatedSlugs
    .map((slug) => {
      const related = getOfferingDetail(slug);
      const offering = pillar.offerings.find((entry) => entry.slug === slug);
      if (!related || !offering) return null;

      const relatedIndex = pillar.offerings.findIndex(
        (entry) => entry.slug === slug,
      );

      return {
        href: `/services/${slug}`,
        index: related.index,
        title: related.title,
        summary: offering.summary,
        image: resolveOfferingCarouselImage(
          pillar.id,
          Math.max(relatedIndex, 0),
        ),
      };
    })
    .filter((card): card is NonNullable<typeof card> => card !== null);

  return (
    <div className="od-page sd-landing-page">
      <article className="services-page od-article">
        <ServiceOfferingHero
          index={content.index}
          title={content.title}
          lede={content.lede}
          kicker={copy.kicker}
          image={heroImage}
          globeLocationId={content.heroGlobeLocationId}
          breadcrumb={{
            pillarTitle: pillar.title,
            pillarHref: pillar.href,
          }}
          nav={{
            previousHref: previous.href,
            previousTitle: previous.title,
            nextHref: next.href,
            nextTitle: next.title,
          }}
        />

        <ServiceOfferingManifest
          statement={content.statement}
          narrative={content.narrative}
        />

        <ServiceOfferingStack
          capabilities={content.capabilities}
          image={stackImage}
        />

        <ServiceOfferingJourney steps={content.journey} />

        <ServiceOfferingAudiences audiences={content.audiences} />

        <ServiceOfferingProof outcomes={content.outcomes} />

        {relatedCards.length > 0 ? (
          <ServiceOfferingRelated
            headline={copy.relatedHeadline}
            pillarHref={pillar.href}
            pillarLabel={copy.relatedLabel}
            cards={relatedCards}
          />
        ) : null}

        <ServiceOfferingPager
          currentLabel={copy.pagerLabel}
          position={offeringIndex + 1}
          total={total}
          previous={previous}
          next={next}
        />
      </article>
    </div>
  );
}

export {
  getOfferingDetail,
  getFundPlatformOfferingDetail,
  getStructuresOfferingDetail,
  getCorporateOfferingDetail,
  FUND_PLATFORM_OFFERING_DETAILS,
  STRUCTURES_OFFERING_DETAILS,
  CORPORATE_OFFERING_DETAILS,
};
export type { OfferingDetailContent };
