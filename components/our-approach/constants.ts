import {
  SERVICE_COLUMNS,
  type ServiceColumn,
} from "@/components/services/constants";

export type ApproachStep = {
  id: string;
  number: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  href: string;
  linkLabel: string;
};

export const APPROACH_HEADLINE_LINE1 = "Fund platform, structures, corporate.";
export const APPROACH_HEADLINE_LINE2 = "One operating desk.";

export const APPROACH_BODY =
  "Regulated fund infrastructure, jurisdictional vehicles, and corporate substance — three platforms coordinated from a single team.";

export const APPROACH_CTA = {
  label: "Our services",
  href: "/services",
} as const;

const PILLAR_LINK_LABEL: Record<ServiceColumn["id"], string> = {
  "fund-platform": "Explore platform",
  structures: "Explore structures",
  corporate: "Explore corporate",
};

export const APPROACH_STEPS: ApproachStep[] = SERVICE_COLUMNS.map((pillar) => ({
  id: pillar.id,
  number: pillar.index,
  title: pillar.teaser,
  description: pillar.blurb,
  image: pillar.image.src,
  imageAlt: pillar.image.alt,
  href: pillar.href,
  linkLabel: PILLAR_LINK_LABEL[pillar.id],
}));
