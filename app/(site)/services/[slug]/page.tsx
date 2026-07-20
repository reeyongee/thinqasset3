import { notFound, redirect } from "next/navigation";
import { FinalCtaSection } from "@/components/final-cta/FinalCtaSection";
import { ServiceDetailFaqs } from "@/components/services/ServiceDetailFaqs";
import { ServiceDetailLanding } from "@/components/services/ServiceDetailLanding";
import { ServiceDetailOfferings } from "@/components/services/ServiceDetailOfferings";
import { ServiceDetailOutcomes } from "@/components/services/ServiceDetailOutcomes";
import { ServiceDetailRationale } from "@/components/services/ServiceDetailRationale";
import { ServiceDetailOtherServices } from "@/components/services/ServiceDetailOtherServices";
import { ServiceDetailRelated } from "@/components/services/ServiceDetailRelated";
import { ServiceDetailSpotlight } from "@/components/services/ServiceDetailSpotlight";
import {
  ServiceOfferingDetail,
  getOfferingDetail,
} from "@/components/services/offering-detail/ServiceOfferingDetail";
import {
  DEPRECATED_SERVICE_SLUGS,
  getAllServiceSlugs,
  getOtherServicePillars,
  getPillarOfferingSlides,
  getServicePage,
  getServicePillarImage,
  JOURNEY_IMAGE_HOLD_ITEMS,
  resolveOfferingScrollImage,
  resolveServiceRelatedCards,
  SERVICE_COLUMNS,
} from "@/components/services/constants";
import "@/components/services/services.css";

type ServiceDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  const live = getAllServiceSlugs().map((slug) => ({ slug }));
  const deprecated = Object.keys(DEPRECATED_SERVICE_SLUGS).map((slug) => ({
    slug,
  }));
  return [...live, ...deprecated];
}

export async function generateMetadata({ params }: ServiceDetailPageProps) {
  const { slug } = await params;
  const canonicalSlug = DEPRECATED_SERVICE_SLUGS[slug] ?? slug;
  const page = getServicePage(canonicalSlug);
  if (!page) return { title: "Services | THINQASSET" };

  const offeringDetail = getOfferingDetail(canonicalSlug);

  return {
    title: `${page.title} | THINQASSET`,
    description: offeringDetail?.lede ?? page.summary,
  };
}

export default async function ServiceDetailPage({
  params,
}: ServiceDetailPageProps) {
  const { slug } = await params;

  if (DEPRECATED_SERVICE_SLUGS[slug]) {
    redirect(`/services/${DEPRECATED_SERVICE_SLUGS[slug]}`);
  }

  const page = getServicePage(slug);
  if (!page) notFound();

  const pillar = SERVICE_COLUMNS.find((column) => column.id === page.pillarId);
  const pillarImage = getServicePillarImage(page.pillarId);
  const isPillarHub = !page.parentHref;
  const offeringDetail =
    !isPillarHub ? getOfferingDetail(slug) : undefined;

  if (offeringDetail && pillar) {
    const offeringIndex = pillar.offerings.findIndex(
      (offering) => offering.slug === slug,
    );

    return (
      <>
        <ServiceOfferingDetail
          content={offeringDetail}
          pillar={pillar}
          offeringIndex={Math.max(offeringIndex, 0)}
        />
        <FinalCtaSection />
      </>
    );
  }

  const relatedCards =
    pillar && pillar.related
      ? resolveServiceRelatedCards(pillar, isPillarHub ? undefined : slug)
      : null;

  const carouselSlides =
    pillar && isPillarHub && pillar.carouselHeadline
      ? getPillarOfferingSlides(pillar)
      : pillar
        ? getOtherServicePillars(pillar.id)
        : [];

  const carouselHeadline =
    pillar && isPillarHub && pillar.carouselHeadline
      ? pillar.carouselHeadline
      : "Our other services";

  const storyBands = pillar ? (
    <>
      <ServiceDetailRationale
        headline={pillar.rationale.headline}
        paragraphs={pillar.rationale.paragraphs}
        image={
          pillar.rationale.image || {
            src: pillar.image.src,
            alt: pillar.rationale.headline,
          }
        }
      />
      <ServiceDetailOtherServices
        headline={carouselHeadline}
        slides={carouselSlides}
      />
      <ServiceDetailOutcomes
        headline={pillar.outcomes.headline}
        intro={pillar.outcomes.intro}
        benefits={pillar.outcomes.benefits}
        image={
          pillar.outcomes.image || {
            src: pillar.image.src,
            alt: pillar.outcomes.headline,
          }
        }
      />
      <ServiceDetailFaqs
        headline={pillar.faqs.headline}
        items={pillar.faqs.items}
      />
      {pillar.spotlight ? (
        <ServiceDetailSpotlight
          headline={pillar.spotlight.headline}
          subtitle={pillar.spotlight.subtitle}
          cards={pillar.spotlight.cards}
        />
      ) : relatedCards ? (
        <ServiceDetailRelated
          headline={pillar.related!.headline}
          linkHref={pillar.related!.linkHref}
          linkLabel={pillar.related!.linkLabel}
          cards={relatedCards}
        />
      ) : null}
    </>
  ) : null;

  const offeringsBand =
    pillar && (isPillarHub || (page.highlights?.length ?? 0) > 0) ? (
      <ServiceDetailOfferings
        headline={
          isPillarHub && pillar.journeyStages
            ? pillar.journeyStages.headline
            : isPillarHub
              ? pillar.offeringsHeadline
              : `${page.title} — at a glance`
        }
        imageHoldItems={
          isPillarHub && pillar.journeyStages
            ? JOURNEY_IMAGE_HOLD_ITEMS
            : undefined
        }
        items={
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
                }))
              : (page.highlights ?? []).map((highlight, index) => ({
                  name: highlight,
                  description: "",
                  image: resolveOfferingScrollImage(pillar.id, index),
                }))
        }
      />
    ) : null;

  return (
    <>
      <div className="sd-landing-page">
        <article className="services-page">
          <ServiceDetailLanding
            title={page.title}
            description={page.summary}
            image={{
              src:
                pillarImage?.src ??
                "/thinqasset-assets/services/fund-platform/hero.png",
              alt: pillarImage?.alt ?? page.title,
            }}
            eyebrow={isPillarHub ? page.eyebrow : undefined}
            breadcrumb={
              page.parentHref && pillar
                ? { pillarTitle: pillar.title, pillarHref: page.parentHref }
                : undefined
            }
          />

          {offeringsBand}
          {storyBands}
        </article>
      </div>

      <FinalCtaSection />
    </>
  );
}
