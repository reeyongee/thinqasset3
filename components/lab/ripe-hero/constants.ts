import {
  CTA_HREF,
  HERO_BG_POSTER,
  HERO_BG_VIDEO_MP4,
  HERO_BG_VIDEO_WEBM,
} from "@/components/hero/constants";

/** ThinqAsset hero media — same assets as production hero. */
export const LAB_HERO_POSTER = HERO_BG_POSTER;
export const LAB_HERO_VIDEO_WEBM = HERO_BG_VIDEO_WEBM;
export const LAB_HERO_VIDEO_MP4 = HERO_BG_VIDEO_MP4;

/** Lab copy — line breaks tuned for RIPE motion geometry (2-line headline, ~2-line body). */
export const LAB_COPY = {
  headlineLines: ["Innovative Global", "Fund Management."],
  body: "Connecting the world.",
  marqueeTag: "Institutional fund solutions",
  followEyebrow: "Global reach",
  followHeading: "Mauritius and Dubai teams serving fund managers worldwide.",
  followBody:
    "Regulated fund platforms, hosting, and administration across Mauritius, DIFC, and global markets.",
} as const;

export const LAB_CTA = {
  primary: { href: CTA_HREF, label: "Contact Us" },
  secondary: { href: "/services", label: "Our Services" },
} as const;

/** Motion geometry — preserved from get-ripe.com reference. */
export const RIPE_PARALLAX_SPEED = 32;
export const RIPE_PARALLAX_RATIO = 1 - RIPE_PARALLAX_SPEED / 100;
export const RIPE_SCROLL_TARGET_GAP = 286;
export const RIPE_SCROLL_TARGET_HEIGHT = 1148;
export const RIPE_VISUAL_SCALE_END = 1.2;
