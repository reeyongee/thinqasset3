export const SCROLL_RUNWAY_DESKTOP = "+=300%";
export const SCROLL_RUNWAY_MOBILE = "+=200%";

/** Timeline positions (0–1) aligned to Codrops ScrollGraph scroll phases */
export const HERO_FADE_END = 0.08;
export const GRAPH_PHASE_START = 0.1;
export const GRAPH_PHASE_DURATION = 0.9;

/** Short grow snap as the traced line reaches each candle */
export const GRAPH_CANDLE_GROW_DURATION = 0.045;
export const GRAPH_FRAME_FADE_DURATION = 0.06;

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

/** Beat entrances as fractions of total pinned scroll (during graph phase) */
export const BEAT_STARTS = [0.12, 0.32, 0.52, 0.72] as const;

/** Desktop graph camera — balanced right of center, not flush to edge */
export const GRAPH_POV_START = { x: 61, y: 50, scale: 2 } as const;
export const GRAPH_POV_END_DESKTOP = { x: 90, y: 44.5, scale: 0.4 } as const;
export const GRAPH_POV_END_MOBILE = { x: 78, y: 47, scale: 0.55 } as const;
