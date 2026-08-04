"use client";

import { FinalCtaSection } from "@/components/final-cta/FinalCtaSection";
import { PageHero } from "@/components/page-hero/PageHero";
import { ScrollSection } from "@/components/scroll/ScrollSection";
import { ServiceDetailFaqs } from "@/components/services/ServiceDetailFaqs";
import { ServiceDetailOfferings } from "@/components/services/ServiceDetailOfferings";
import { ServiceDetailOutcomes } from "@/components/services/ServiceDetailOutcomes";
import { ServiceDetailOtherServices } from "@/components/services/ServiceDetailOtherServices";
import { ServiceDetailRationale } from "@/components/services/ServiceDetailRationale";
import { ServiceDetailRelated } from "@/components/services/ServiceDetailRelated";
import { ServiceDetailSpotlight } from "@/components/services/ServiceDetailSpotlight";
import "@/components/services/services.css";
import type { SlugHubData } from "./types";

type DesktopPillarHubProps = {
  data: SlugHubData;
};

export function DesktopPillarHub({ data }: DesktopPillarHubProps) {
  const { landing, offerings, rationale, carousel, outcomes, faqs, spotlight, related } =
    data;

  const heroMeta = [
    landing.eyebrow ?? "Services",
    landing.breadcrumb
      ? `Services / ${landing.breadcrumb.pillarTitle}`
      : "ThinqAsset",
    "Global fund infrastructure",
  ];

  const offeringsBand = offerings ? (
    <ServiceDetailOfferings
      headline={offerings.headline}
      imageHoldItems={offerings.imageHoldItems}
      items={offerings.items.map((item) => ({
        name: item.name,
        description: item.description,
        image: item.image,
      }))}
    />
  ) : null;

  return (
    <div className="sd-landing-page" data-transition-page>
      <PageHero
        lines={[landing.title]}
        subtitle={landing.description}
        meta={heroMeta}
        imageSrc={landing.image.src}
      />
      <ScrollSection chapter={{ num: "01", label: landing.eyebrow ?? "Overview" }}>
        <article className="services-page">
          {offeringsBand}
          <ServiceDetailRationale
            headline={rationale.headline}
            paragraphs={rationale.paragraphs}
            image={rationale.image}
          />
          <ServiceDetailOtherServices
            headline={carousel.headline}
            slides={carousel.slides}
          />
          <ServiceDetailOutcomes
            headline={outcomes.headline}
            intro={outcomes.intro}
            benefits={outcomes.benefits}
            image={outcomes.image}
          />
          <ServiceDetailFaqs headline={faqs.headline} items={faqs.items} />
          {spotlight ? (
            <ServiceDetailSpotlight
              headline={spotlight.headline}
              subtitle={spotlight.subtitle}
              cards={spotlight.cards}
            />
          ) : related ? (
            <ServiceDetailRelated
              headline={related.headline}
              linkHref={related.linkHref}
              linkLabel={related.linkLabel}
              cards={related.cards}
            />
          ) : null}
        </article>
      </ScrollSection>
      <ScrollSection chapter={{ num: "02", label: "Consultation" }}>
        <FinalCtaSection />
      </ScrollSection>
    </div>
  );
}
