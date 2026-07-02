export type UseCaseData = {
  id: string;
  tabLabel: string;
  title: string;
  description: string;
  image: string;
  mobileCtaLabel: string;
};

const image = (path: string) =>
  `https://framerusercontent.com/images/${path}?width=2400&height=1800`;

export const USE_CASES: UseCaseData[] = [
  {
    id: "retirement",
    tabLabel: "Planning for retirement",
    title: "Planning for retirement",
    description:
      "Model different scenarios, optimize withdrawal strategies, and ensure your portfolio aligns with your retirement timeline and risk tolerance.",
    image: image("m1V9SF18Du3fqzbeeaGekbzDw.jpg"),
    mobileCtaLabel: "Start building",
  },
  {
    id: "rebalancing",
    tabLabel: "Rebalancing your portfolio",
    title: "Rebalancing your portfolio",
    description:
      "Identify allocation drift, receive rebalancing recommendations, and maintain your target asset mix without emotional bias or guesswork.",
    image: image("2EkT9zJPBpn4rMC04oboMF0vc.jpg"),
    mobileCtaLabel: "Get started",
  },
  {
    id: "taxes",
    tabLabel: "Optimizing for taxes",
    title: "Optimizing for taxes",
    description:
      "Discover tax-loss harvesting opportunities, manage capital gains efficiently, and maximize after-tax returns with intelligent timing strategies.",
    image: image("wcTUIaBkvOoGZg7AhcdETLDB34E.jpg"),
    mobileCtaLabel: "Get started",
  },
  {
    id: "risk",
    tabLabel: "Managing portfolio risk",
    title: "Managing portfolio risk",
    description:
      "Quantify your exposure with advanced metrics, stress-test against market scenarios, and understand how volatility impacts your holdings.",
    image: image("ZjCOfALwUpZiMhoU5I4EYMvA.jpg"),
    mobileCtaLabel: "Get started",
  },
];
