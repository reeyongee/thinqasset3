"use client";

import "@/components/mobile-home/mobile-home.css";
import "./mobile-services.css";
import "./mobile-service-slug.css";
import { MobileFinalCta } from "@/components/mobile-home/sections/MobileFinalCta";
import { MobileSlugCarousel } from "./sections/hub/MobileSlugCarousel";
import { MobileSlugFaqs } from "./sections/hub/MobileSlugFaqs";
import { MobileSlugJourney } from "./sections/hub/MobileSlugJourney";
import { MobileSlugLanding } from "./sections/hub/MobileSlugLanding";
import { MobileSlugOutcomes } from "./sections/hub/MobileSlugOutcomes";
import { MobileSlugRationale } from "./sections/hub/MobileSlugRationale";
import { MobileSlugSpotlight } from "./sections/hub/MobileSlugSpotlight";
import type { SlugHubData } from "./types";

type MobilePillarHubPageProps = {
  data: SlugHubData;
};

export function MobilePillarHubPage({ data }: MobilePillarHubPageProps) {
  const { landing, offerings, rationale, carousel, outcomes, faqs, spotlight, related } =
    data;

  return (
    <div className="mobile-services mobile-slug" data-transition-page>
      <MobileSlugLanding landing={landing} />

      {offerings ? (
        <MobileSlugJourney
          headline={offerings.headline}
          items={offerings.items}
        />
      ) : null}

      <MobileSlugRationale
        headline={rationale.headline}
        paragraphs={rationale.paragraphs}
        image={rationale.image}
      />

      <MobileSlugCarousel
        headline={carousel.headline}
        slides={carousel.slides}
      />

      <MobileSlugOutcomes
        headline={outcomes.headline}
        intro={outcomes.intro}
        benefits={outcomes.benefits}
        image={outcomes.image}
      />

      <MobileSlugFaqs headline={faqs.headline} items={faqs.items} />

      {spotlight ? (
        <MobileSlugSpotlight
          variant="spotlight"
          headline={spotlight.headline}
          subtitle={spotlight.subtitle}
          cards={spotlight.cards}
        />
      ) : related ? (
        <MobileSlugSpotlight
          variant="related"
          headline={related.headline}
          linkHref={related.linkHref}
          linkLabel={related.linkLabel}
          cards={related.cards}
        />
      ) : null}

      <MobileFinalCta variant="slug" />
    </div>
  );
}
