"use client";

import "@/components/mobile-home/mobile-home.css";
import "./mobile-services.css";
import "./mobile-service-slug.css";
import { MobileFinalCta } from "@/components/mobile-home/sections/MobileFinalCta";
import { PageHero } from "@/components/page-hero/PageHero";
import { ScrollSection } from "@/components/scroll/ScrollSection";
import { MobileOfferingAudiences } from "./sections/offering/MobileOfferingAudiences";
import { MobileOfferingJourney } from "./sections/offering/MobileOfferingJourney";
import { MobileOfferingManifest } from "./sections/offering/MobileOfferingManifest";
import { MobileOfferingPager } from "./sections/offering/MobileOfferingPager";
import { MobileOfferingProof } from "./sections/offering/MobileOfferingProof";
import { MobileOfferingRelated } from "./sections/offering/MobileOfferingRelated";
import { MobileOfferingStack } from "./sections/offering/MobileOfferingStack";
import { StructureDiagram } from "@/components/services/offering-detail/structure-diagram/StructureDiagram";
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
      <PageHero
        lines={[content.title]}
        subtitle={content.lede}
        meta={[kicker, `Services / ${pillar.title}`, content.index]}
        imageSrc={heroImage.src}
      />
      <ScrollSection chapter={{ num: "01", label: kicker }}>
        <MobileOfferingManifest
          statement={content.statement}
          narrative={content.narrative}
        />

        <StructureDiagram slug={content.slug} />

        <MobileOfferingStack capabilities={content.capabilities} image={stackImage} />

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
      </ScrollSection>
      <ScrollSection chapter={{ num: "02", label: "Contact" }}>
        <MobileFinalCta variant="slug" />
      </ScrollSection>
    </div>
  );
}
