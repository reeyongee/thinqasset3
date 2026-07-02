export type BenefitIconName =
  | "research"
  | "optimize"
  | "markets"
  | "decisions"
  | "mistakes"
  | "learn";

export type BenefitData = {
  id: string;
  title: string;
  description: string;
  icon: BenefitIconName;
  image: string;
  imageAlt: string;
  enterX: number;
};

export const BENEFIT_ROWS: BenefitData[][] = [
  [
    {
      id: "research",
      title: "Rigorous Research.",
      description:
        "Combining traditional analysis with innovative techniques.",
      icon: "research",
      image: "/assets/benefits/research.jpg",
      imageAlt: "Professionals in a focused boardroom discussion",
      enterX: 180,
    },
    {
      id: "optimize",
      title: "Risk Management.",
      description: "Meticulous assessment, balanced opportunity.",
      icon: "optimize",
      image: "/assets/benefits/risk.jpg",
      imageAlt: "Professional reviewing strategy in a calm office setting",
      enterX: -80,
    },
    {
      id: "markets",
      title: "Transparency.",
      description:
        "Clear communication and the highest ethical standards.",
      icon: "markets",
      image: "/assets/benefits/transparency.jpg",
      imageAlt: "Two professionals in an open business conversation",
      enterX: -300,
    },
  ],
  [
    {
      id: "decisions",
      title: "Cross-Border.",
      description: "Six jurisdictions, one operating standard.",
      icon: "decisions",
      image: "/assets/benefits/cross-border.jpg",
      imageAlt: "Quiet modern office corridor in a business building",
      enterX: 180,
    },
    {
      id: "mistakes",
      title: "Bespoke.",
      description: "Tailored investment strategies, not templates.",
      icon: "mistakes",
      image: "/assets/benefits/bespoke.jpg",
      imageAlt: "Minimal executive office with natural light",
      enterX: -80,
    },
    {
      id: "learn",
      title: "Global Footprint",
      description:
        "Direct fund management from Mauritius, DIFC, and Luxembourg with strategic partnerships spanning Bermuda to Singapore.",
      icon: "learn",
      image: "/assets/benefits/global-footprint.jpg",
      imageAlt: "Business professionals in a neutral corporate environment",
      enterX: -300,
    },
  ],
];
