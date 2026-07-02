export type FaqItemData = {
  id: string;
  question: string;
  answer: string;
};

export const FAQ_ITEMS: FaqItemData[] = [
  {
    id: "fund-management-services",
    question: "Which Fund Management services does ThinqAsset support?",
    answer:
      "We support private equity, real estate, private credit, venture capital, fund of funds, listed funds, alternative investments, and open-ended retail funds.",
  },
  {
    id: "jurisdictions",
    question: "Which jurisdictions are available for our funds?",
    answer:
      "Mauritius VCC, DIFC, ADGM, and Luxembourg directly, with partner access in Cayman, Singapore, and Bermuda for cross-border strategies.",
  },
  {
    id: "structure-selection",
    question: "How do I choose the right structure for my asset class?",
    answer:
      "Our team advises on domicile, vehicle type, and operational setup based on your asset class, investor base, and distribution strategy — contact us for a tailored recommendation.",
  },
  {
    id: "administration-services",
    question: "What do ThinqAsset's fund administration and services include?",
    answer:
      "NAV production, financial reporting, investor servicing, regulatory coordination, establishment support, registrar/transfer agency, company secretarial, and corporate services across the full fund lifecycle.",
  },
  {
    id: "outsourcing",
    question: "Why should GPs outsource fund administration and corporate services?",
    answer:
      "Institutional investors expect third-party administration and governance. Outsourcing signals governance commitment, provides specialised secretarial expertise, and frees GPs to focus on investment performance.",
  },
  {
    id: "administration-setup",
    question: "How quickly can administration and secretarial support be set up?",
    answer:
      "For new launches, operational infrastructure can be ready within weeks. For transitions from another administrator, we work with dedicated onboarding teams to migrate data efficiently.",
  },
];

export const FAQ_TOKENS = {
  muted: "rgba(184, 184, 184, 0.9)",
  white: "#ffffff",
} as const;
