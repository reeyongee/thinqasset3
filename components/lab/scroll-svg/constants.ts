/** Shared motion language for scroll-beat SVG studies. */

export const EASE_MOVE = "0.85,0,0.15,1" as const;
export const MOVE = 1.5;
export const HOLD = 0.5;

export const BEAT_CARDS = [
  {
    id: "fund-management",
    title: "Fund Management",
    duration: "7.0s",
    blurb:
      "Capital streams converge into a glass prism vault, then refract into diversified allocations.",
  },
  {
    id: "investment-structuring",
    title: "Investment Structuring",
    duration: "6.0s",
    blurb:
      "Translucent structure plates offset, lock, and trim into a compliant stack.",
  },
  {
    id: "partnership-development",
    title: "Partnership Development",
    duration: "8.0s",
    blurb:
      "Partner nodes orbit a platform core; light travels the bridges between markets.",
  },
  {
    id: "built-with-discipline",
    title: "Built with discipline",
    duration: "7.5s",
    blurb:
      "Six jurisdiction marks lock into one glass governance seal.",
  },
] as const;

export type BeatId = (typeof BEAT_CARDS)[number]["id"];
