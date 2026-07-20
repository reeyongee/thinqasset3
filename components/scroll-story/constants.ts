export const SCROLL_RUNWAY_DESKTOP = "+=300%";
export const SCROLL_RUNWAY_MOBILE = "+=200%";

/** Timeline positions (0–1) for the pinned home scroll story */
export const HERO_FADE_END = 0.08;
/** When hero media yields to the beat visual stage */
export const GRAPH_PHASE_START = 0.1;
export const GRAPH_PHASE_DURATION = 0.9;

export const STORY_BEATS = [
  {
    title: "Fund Management",
    body: "Expert management of diversified investment portfolios tailored to your strategic goals.",
  },
  {
    title: "Investment Structuring",
    body: "Custom solutions designed to optimize fund performance and ensure regulatory compliance.",
  },
  {
    title: "Partnership Development",
    body: "Opportunities for third-party fund managers to access global markets via our innovative platform.",
  },
  {
    title: "Built with discipline",
    body: "Deployed across six jurisdictions with one operating standard and institutional-grade governance.",
  },
] as const;

/** Beat entrances as fractions of total pinned scroll */
export const BEAT_STARTS = [0.12, 0.32, 0.52, 0.72] as const;
