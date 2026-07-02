export const CTA_HREF = "mailto:info@thinqasset.com";

export type StepData = {
  id: string;
  number: string;
  title: string;
  description: string;
};

export const STEPS: StepData[] = [
  {
    id: "feature-1",
    number: "01",
    title: "Understand mandate and jurisdiction",
    description:
      "Every mandate begins with understanding the strategy, jurisdiction, and investor profile honestly.",
  },
  {
    id: "feature-2",
    number: "02",
    title: "Structure the fund",
    description:
      "Custom solutions designed to optimize fund performance and ensure regulatory compliance across domiciles.",
  },
  {
    id: "feature-3",
    number: "03",
    title: "Deploy operations and reporting",
    description:
      "Build the operational infrastructure, reporting rhythm, and governance that LPs expect before capital is called.",
  },
  {
    id: "feature-3-1",
    number: "04",
    title: "Scale across jurisdictions",
    description:
      "Direct fund management from Mauritius, DIFC, and Luxembourg with strategic partnerships spanning Bermuda to Singapore.",
  },
];
