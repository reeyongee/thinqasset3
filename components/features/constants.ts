export type FeatureData = {
  id: string;
  title: string;
  description: string;
  icon: "portfolio" | "orion" | "exposure";
  visual: "portfolio" | "orion" | "exposure";
};

export const FEATURES: FeatureData[] = [
  {
    id: "portfolio",
    title: "Fund Management",
    description:
      "Expert management of diversified investment portfolios tailored to your strategic goals.",
    icon: "portfolio",
    visual: "portfolio",
  },
  {
    id: "orion",
    title: "Investment Structuring",
    description:
      "Custom solutions designed to optimize fund performance and ensure regulatory compliance.",
    icon: "orion",
    visual: "orion",
  },
  {
    id: "exposure",
    title: "Partnership Development",
    description:
      "Opportunities for third-party fund managers to access global markets via our innovative platform.",
    icon: "exposure",
    visual: "exposure",
  },
];

export const FLIP_EASE = "expo.out";
