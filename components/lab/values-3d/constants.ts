/** ThinqAsset brand palette for the values WebGL lab. */

export const EASE_MOVE = [0.85, 0, 0.15, 1] as const;
export const MOVE = 1.5;
export const HOLD = 0.5;

/** Exact site tokens (+ glass tints derived from navy/gold). */
export const COLORS = {
  bg: 0x161c24, // --ta-navy-deep
  navy: 0x1e252d, // --ta-navy
  navyMid: 0x343d4a, // --ta-navy-mid
  navyCard: 0x2a252c, // --ta-navy-card
  gold: 0xb6a082, // --ta-gold
  goldHover: 0xc9b896, // --ta-gold-hover
  greyMuted: 0x9f9da0, // --ta-grey-muted
  greyBorder: 0x3d4450, // --ta-grey-border
  greyLight: 0xe2e5e8, // --ta-grey-light
  white: 0xffffff,
  /** Cool refractive glass tint (navy atmosphere, not blue chrome). */
  glass: 0xc5ced8,
  glassDeep: 0x7a8796,
  /** Soft gold glass. */
  glassGold: 0xd4c4a8,
  // Aliases used by existing viz call sites
  ring: 0x7a8796,
  ringSoft: 0x5c6b7a,
  accent: 0xb6a082,
  muted: 0x9f9da0,
} as const;

export const VALUE_META = [
  {
    id: "experience",
    label: "Experience",
    duration: 7,
    blurb: "Concentric rings + traveling node on the vertical axis.",
  },
  {
    id: "partnerships",
    label: "Partnerships",
    duration: 10.5,
    blurb: "Triangle network — nodes chase vertices, edges draw on.",
  },
  {
    id: "innovation",
    label: "Innovation",
    duration: 1.5,
    blurb: "Block field expands from center and snaps back.",
  },
  {
    id: "trust",
    label: "Trust",
    duration: 4.5,
    blurb: "Stacked frames assemble, shift, and re-settle.",
  },
  {
    id: "flexibility",
    label: "Flexibility",
    duration: 6.333,
    blurb: "Orbital null rotation with mirrored scale flips.",
  },
] as const;

export type ValueId = (typeof VALUE_META)[number]["id"];
