export type TrustItemData = {
  id: string;
  title: string;
  subtitle: string;
  icon: "shield" | "scan" | "user" | "lightning";
};

export type StatData = {
  id: string;
  end: number;
  prefix: string;
  suffix: string;
  label: string;
  image: string;
};

export const TRUST_ITEMS: TrustItemData[] = [
  {
    id: "research",
    title: "Rigorous Research",
    subtitle: "Traditional analysis with innovative techniques",
    icon: "shield",
  },
  {
    id: "risk",
    title: "Risk Management",
    subtitle: "Meticulous assessment, balanced opportunity",
    icon: "scan",
  },
  {
    id: "transparency",
    title: "Transparency",
    subtitle: "Clear communication, highest ethical standards",
    icon: "user",
  },
  {
    id: "crossborder",
    title: "Cross-Border",
    subtitle: "Six jurisdictions, one operating standard",
    icon: "lightning",
  },
];

export const STATS: StatData[] = [
  {
    id: "subfunds",
    end: 15,
    prefix: "",
    suffix: "+",
    label: "Sub-Funds Launched",
    image: "/assets/stats/subfunds.jpg",
  },
  {
    id: "dtas",
    end: 40,
    prefix: "",
    suffix: "+",
    label: "Double tax agreements via Mauritius",
    image: "/assets/stats/dtas.jpg",
  },
  {
    id: "jurisdictions",
    end: 6,
    prefix: "",
    suffix: "",
    label: "Jurisdictions",
    image: "/assets/stats/jurisdictions.jpg",
  },
  {
    id: "continents",
    end: 4,
    prefix: "",
    suffix: "",
    label: "Continents",
    image: "/assets/stats/continents.jpg",
  },
];

export const APPEAR_EASE = "cubic-bezier(0.12, 0.23, 0.17, 0.99)";
export const COUNTER_EASE = "cubic-bezier(0.12, 0.23, 0.24, 1)";
