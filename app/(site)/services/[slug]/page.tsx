import { notFound, redirect } from "next/navigation";
import { getOfferingDetail } from "@/components/services/offering-detail/ServiceOfferingDetail";
import {
  DEPRECATED_SERVICE_SLUGS,
  getAllServiceSlugs,
  getServicePage,
} from "@/components/services/constants";
import { buildSlugPageData } from "@/components/mobile-services/buildSlugPageData";
import { ServiceSlugViewportGate } from "@/components/mobile-services/ServiceSlugViewportGate";
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

  const data = buildSlugPageData(page, slug);
  if (!data) notFound();

  return <ServiceSlugViewportGate data={data} />;
}
