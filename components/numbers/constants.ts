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
  /** When set, shown instead of an animated numeric counter. */
  display?: string;
};

/** Sitewide assets-under-management figure (stats cards, feature donut, etc.). */
export const ASSETS_MANAGED_DISPLAY = "$1B+";
export const ASSETS_MANAGED_LABEL = "Assets under management";

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
    id: "aum",
    end: 0,
    prefix: "",
    suffix: "",
    label: ASSETS_MANAGED_LABEL,
    display: ASSETS_MANAGED_DISPLAY,
    image: "/assets/stats/subfunds-approach.jpg",
  },
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
    end: 150,
    prefix: "",
    suffix: "",
    label: "Double tax agreements throughout the world",
    image: "/assets/stats/dtas.jpg",
  },
  {
    id: "jurisdictions",
    end: 3,
    prefix: "",
    suffix: "+",
    label: "Core jurisdictions",
    image: "/assets/stats/jurisdictions.jpg",
  },
];

export const APPEAR_EASE = "cubic-bezier(0.12, 0.23, 0.17, 0.99)";
export const COUNTER_EASE = "cubic-bezier(0.12, 0.23, 0.24, 1)";
