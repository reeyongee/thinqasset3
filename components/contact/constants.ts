export const CONTACT_EMAIL = "info@thinqasset.com";

export const CONTACT_HEADLINE = {
  line1: ["The", "right", "structure"],
  line2: ["starts", "with", "a"],
  accent: "conversation.",
} as const;

export const CONTACT_CTA_CARDS = [
  {
    id: "form",
    label: "Consultation form",
    title: "Start a dialogue.",
    href: null as string | null,
  },
  {
    id: "email",
    label: CONTACT_EMAIL,
    title: "Email us.",
    href: `mailto:${CONTACT_EMAIL}`,
  },
  {
    id: "services",
    label: "Explore services",
    title: "Our platforms.",
    href: "/services",
  },
] as const;

export type ExpertiseOption = "Fund platform" | "Structures" | "Corporate";

export const EXPERTISE_OPTIONS: ExpertiseOption[] = [
  "Fund platform",
  "Structures",
  "Corporate",
];

export const FORM_STEPS = [
  {
    id: "01",
    verticalLabel: "Profile",
    title: "Add your personal information.",
    titleMobileHiddenSuffix: undefined,
    substep: 1,
  },
  {
    id: "02",
    verticalLabel: "Expertise",
    title: "Select the area of your interest.",
    titleMobileHiddenSuffix: " of your interest",
    substep: 2,
  },
  {
    id: "03",
    verticalLabel: "Message",
    title: "Anything else we should know?",
    titleMobileHiddenSuffix: undefined,
    substep: 3,
  },
] as const;
