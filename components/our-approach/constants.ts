export type ApproachStep = {
  id: string;
  number: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
};

export const APPROACH_STEPS: ApproachStep[] = [
  {
    id: "connect",
    number: "01",
    title: "15+ Sub-Funds Launched",
    description:
      "Within a single VCC structure—purpose-built for segregated capital and scale.",
    image: "/assets/stats/subfunds.jpg",
    imageAlt: "Professionals at a meeting table",
  },
  {
    id: "insights",
    number: "02",
    title: "40+ Double Tax Agreements",
    description:
      "Double tax agreements via Mauritius, connecting Asia, Europe, and Africa.",
    image: "/assets/stats/dtas.jpg",
    imageAlt: "Business handshake",
  },
  {
    id: "action",
    number: "03",
    title: "Built For Precision",
    description:
      "60% lower operational costs versus traditional domiciles. We engineer fund structures for efficiency, not overhead.",
    image: "/assets/benefits/bespoke.jpg",
    imageAlt: "Minimal executive office with natural light",
  },
];

export const APPROACH_BODY =
  "Informed, proactive, and adaptive investment strategies are essential to achieving sustainable, long-term growth. We build conviction through rigorous research, not market noise—one portfolio at a time.";
