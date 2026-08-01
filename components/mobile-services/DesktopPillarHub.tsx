import { FinalCtaSection } from "@/components/final-cta/FinalCtaSection";
import { ServiceDetailFaqs } from "@/components/services/ServiceDetailFaqs";
import { ServiceDetailLanding } from "@/components/services/ServiceDetailLanding";
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
    <>
      <div className="sd-landing-page">
        <article className="services-page">
          <ServiceDetailLanding
            title={landing.title}
            description={landing.description}
            image={landing.image}
            eyebrow={landing.eyebrow}
            breadcrumb={landing.breadcrumb}
          />

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
      </div>

      <FinalCtaSection />
    </>
  );
}
