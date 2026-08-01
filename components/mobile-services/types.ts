import type {
  ServiceCarouselSlide,
  ServiceColumn,
  ServiceFaqItem,
  ServicePageEntry,
  ServiceSpotlightCard,
} from "@/components/services/constants";
import type { OfferingDetailContent } from "@/components/services/offering-detail/types";
import type { ServiceDetailRelatedCard } from "@/components/services/ServiceDetailRelated";

export type SlugImage = {
  src: string;
  alt: string;
};

export type SlugLandingData = {
  title: string;
  description: string;
  image: SlugImage;
  eyebrow?: string;
  hubBreadcrumb?: boolean;
  breadcrumb?: {
    pillarTitle: string;
    pillarHref: string;
  };
};

export type SlugJourneyItem = {
  name: string;
  description: string;
  image?: SlugImage;
  href?: string;
};

export type SlugHubData = {
  mode: "hub";
  page: ServicePageEntry;
  landing: SlugLandingData;
  offerings: {
    headline: string;
    items: readonly SlugJourneyItem[];
    imageHoldItems?: number;
  } | null;
  rationale: {
    headline: string;
    paragraphs: readonly [string, string];
    image: SlugImage;
  };
  carousel: {
    headline: string;
    slides: readonly ServiceCarouselSlide[];
  };
  outcomes: {
    headline: string;
    intro: string;
    benefits: readonly [string, string, string, string];
    image: SlugImage;
  };
  faqs: {
    headline: string;
    items: readonly ServiceFaqItem[];
  };
  spotlight: {
    headline: string;
    subtitle?: string;
    cards: readonly [ServiceSpotlightCard, ServiceSpotlightCard];
  } | null;
  related: {
    headline: string;
    linkHref: string;
    linkLabel: string;
    cards: readonly [ServiceDetailRelatedCard, ServiceDetailRelatedCard];
  } | null;
};

export type OfferingNeighbor = {
  href: string;
  index: string;
  title: string;
};

export type OfferingRelatedCardData = {
  href: string;
  index: string;
  title: string;
  summary: string;
  image: SlugImage;
};

export type SlugOfferingData = {
  mode: "offering";
  content: OfferingDetailContent;
  pillar: ServiceColumn;
  offeringIndex: number;
  heroImage: SlugImage;
  stackImage: SlugImage;
  kicker: string;
  relatedHeadline: string;
  relatedLabel: string;
  pagerLabel: string;
  previous: OfferingNeighbor;
  next: OfferingNeighbor;
  relatedCards: readonly OfferingRelatedCardData[];
};

export type SlugPageData = SlugHubData | SlugOfferingData;
