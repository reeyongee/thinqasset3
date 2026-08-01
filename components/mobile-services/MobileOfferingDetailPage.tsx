"use client";

import "@/components/mobile-home/mobile-home.css";
import "./mobile-services.css";
import "./mobile-service-slug.css";
import { MobileFinalCta } from "@/components/mobile-home/sections/MobileFinalCta";
import { MobileOfferingAudiences } from "./sections/offering/MobileOfferingAudiences";
import { MobileOfferingHero } from "./sections/offering/MobileOfferingHero";
import { MobileOfferingJourney } from "./sections/offering/MobileOfferingJourney";
import { MobileOfferingManifest } from "./sections/offering/MobileOfferingManifest";
import { MobileOfferingPager } from "./sections/offering/MobileOfferingPager";
import { MobileOfferingProof } from "./sections/offering/MobileOfferingProof";
import { MobileOfferingRelated } from "./sections/offering/MobileOfferingRelated";
import { MobileOfferingStack } from "./sections/offering/MobileOfferingStack";
import type { SlugOfferingData } from "./types";

type MobileOfferingDetailPageProps = {
  data: SlugOfferingData;
};

export function MobileOfferingDetailPage({ data }: MobileOfferingDetailPageProps) {
  const {
    content,
    pillar,
    offeringIndex,
    heroImage,
    stackImage,
    kicker,
    relatedHeadline,
    pagerLabel,
    previous,
    next,
    relatedCards,
  } = data;

  return (
    <div className="mobile-services mobile-slug" data-transition-page>
      <MobileOfferingHero
        index={content.index}
        kicker={kicker}
        title={content.title}
        lede={content.lede}
        heroImage={heroImage}
        pillarTitle={pillar.title}
        pillarHref={pillar.href}
        previous={previous}
        next={next}
      />

      <MobileOfferingManifest
        statement={content.statement}
        narrative={content.narrative}
      />

      <MobileOfferingStack
        capabilities={content.capabilities}
        image={stackImage}
      />

      <MobileOfferingJourney steps={content.journey} />

      <MobileOfferingAudiences audiences={content.audiences} />

      <MobileOfferingProof outcomes={content.outcomes} />

      <MobileOfferingRelated headline={relatedHeadline} cards={relatedCards} />

      <MobileOfferingPager
        pagerLabel={pagerLabel}
        position={offeringIndex + 1}
        total={pillar.offerings.length}
        previous={previous}
        next={next}
      />

      <MobileFinalCta variant="slug" />
    </div>
  );
}
