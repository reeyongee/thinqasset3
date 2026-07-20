export type BlurLayer = {
  blur: string;
  mask: string;
};

/** Framer Progressive Blur (node FY1H6YXmD) — 8 stacked backdrop-filter bands, bottom edge. */
export const PROGRESSIVE_BLUR_LAYERS_BOTTOM: BlurLayer[] = [
  {
    blur: "0.125px",
    mask: "linear-gradient(rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 12.5%, rgb(0, 0, 0) 25%, rgba(0, 0, 0, 0) 37.5%)",
  },
  {
    blur: "0.25px",
    mask: "linear-gradient(rgba(0, 0, 0, 0) 12.5%, rgb(0, 0, 0) 25%, rgb(0, 0, 0) 37.5%, rgba(0, 0, 0, 0) 50%)",
  },
  {
    blur: "0.5px",
    mask: "linear-gradient(rgba(0, 0, 0, 0) 25%, rgb(0, 0, 0) 37.5%, rgb(0, 0, 0) 50%, rgba(0, 0, 0, 0) 62.5%)",
  },
  {
    blur: "1px",
    mask: "linear-gradient(rgba(0, 0, 0, 0) 37.5%, rgb(0, 0, 0) 50%, rgb(0, 0, 0) 62.5%, rgba(0, 0, 0, 0) 75%)",
  },
  {
    blur: "2px",
    mask: "linear-gradient(rgba(0, 0, 0, 0) 50%, rgb(0, 0, 0) 62.5%, rgb(0, 0, 0) 75%, rgba(0, 0, 0, 0) 87.5%)",
  },
  {
    blur: "4px",
    mask: "linear-gradient(rgba(0, 0, 0, 0) 62.5%, rgb(0, 0, 0) 75%, rgb(0, 0, 0) 87.5%, rgba(0, 0, 0, 0) 100%)",
  },
  {
    blur: "8px",
    mask: "linear-gradient(rgba(0, 0, 0, 0) 75%, rgb(0, 0, 0) 87.5%, rgb(0, 0, 0) 100%)",
  },
  {
    blur: "16px",
    mask: "linear-gradient(rgba(0, 0, 0, 0) 87.5%, rgb(0, 0, 0) 100%)",
  },
];

/** Mirrored masks — strongest blur at the viewport top edge. */
export const PROGRESSIVE_BLUR_LAYERS_TOP: BlurLayer[] = [
  {
    blur: "0.125px",
    mask: "linear-gradient(rgba(0, 0, 0, 0) 62.5%, rgb(0, 0, 0) 75%, rgb(0, 0, 0) 87.5%, rgba(0, 0, 0, 0) 100%)",
  },
  {
    blur: "0.25px",
    mask: "linear-gradient(rgba(0, 0, 0, 0) 50%, rgb(0, 0, 0) 62.5%, rgb(0, 0, 0) 75%, rgba(0, 0, 0, 0) 87.5%)",
  },
  {
    blur: "0.5px",
    mask: "linear-gradient(rgba(0, 0, 0, 0) 37.5%, rgb(0, 0, 0) 50%, rgb(0, 0, 0) 62.5%, rgba(0, 0, 0, 0) 75%)",
  },
  {
    blur: "1px",
    mask: "linear-gradient(rgba(0, 0, 0, 0) 25%, rgb(0, 0, 0) 37.5%, rgb(0, 0, 0) 50%, rgba(0, 0, 0, 0) 62.5%)",
  },
  {
    blur: "2px",
    mask: "linear-gradient(rgba(0, 0, 0, 0) 12.5%, rgb(0, 0, 0) 25%, rgb(0, 0, 0) 37.5%, rgba(0, 0, 0, 0) 50%)",
  },
  {
    blur: "4px",
    mask: "linear-gradient(rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 12.5%, rgb(0, 0, 0) 25%, rgba(0, 0, 0, 0) 37.5%)",
  },
  {
    blur: "8px",
    mask: "linear-gradient(rgb(0, 0, 0) 0%, rgb(0, 0, 0) 12.5%, rgba(0, 0, 0, 0) 25%)",
  },
  {
    blur: "16px",
    mask: "linear-gradient(rgb(0, 0, 0) 0%, rgba(0, 0, 0, 0) 12.5%)",
  },
];

/**
 * 4-layer approximation — wider bands, same blur spread as 8-layer stack.
 * Used on all capable devices (Phase 3).
 */
export const PROGRESSIVE_BLUR_LAYERS_BOTTOM_LITE: BlurLayer[] = [
  {
    blur: "0.25px",
    mask: "linear-gradient(rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 18%, rgb(0, 0, 0) 32%, rgba(0, 0, 0, 0) 48%)",
  },
  {
    blur: "1px",
    mask: "linear-gradient(rgba(0, 0, 0, 0) 22%, rgb(0, 0, 0) 38%, rgb(0, 0, 0) 54%, rgba(0, 0, 0, 0) 70%)",
  },
  {
    blur: "4px",
    mask: "linear-gradient(rgba(0, 0, 0, 0) 48%, rgb(0, 0, 0) 64%, rgb(0, 0, 0) 80%, rgba(0, 0, 0, 0) 96%)",
  },
  {
    blur: "16px",
    mask: "linear-gradient(rgba(0, 0, 0, 0) 72%, rgb(0, 0, 0) 100%)",
  },
];

export const PROGRESSIVE_BLUR_LAYERS_TOP_LITE: BlurLayer[] = [
  {
    blur: "0.25px",
    mask: "linear-gradient(rgba(0, 0, 0, 0) 52%, rgb(0, 0, 0) 68%, rgb(0, 0, 0) 82%, rgba(0, 0, 0, 0) 100%)",
  },
  {
    blur: "1px",
    mask: "linear-gradient(rgba(0, 0, 0, 0) 30%, rgb(0, 0, 0) 46%, rgb(0, 0, 0) 62%, rgba(0, 0, 0, 0) 78%)",
  },
  {
    blur: "4px",
    mask: "linear-gradient(rgba(0, 0, 0, 0) 4%, rgb(0, 0, 0) 20%, rgb(0, 0, 0) 36%, rgba(0, 0, 0, 0) 52%)",
  },
  {
    blur: "16px",
    mask: "linear-gradient(rgb(0, 0, 0) 0%, rgba(0, 0, 0, 0) 28%)",
  },
];

/** Fixed veil height (px). Ratio ≈ 32.73% of viewport at 660px. */
export const PROGRESSIVE_BLUR_HEIGHT_PX = 216;

/** Shorter band for text-heavy pages (e.g. contact form). */
export const PROGRESSIVE_BLUR_HEIGHT_SOFT_PX = 72;

/** Visible edge vignettes — black on navy (navy-on-navy was imperceptible). */
export const PROGRESSIVE_BLUR_TOP_DARKEN = `linear-gradient(to bottom, rgba(0, 0, 0, 0.62) 0%, rgba(0, 0, 0, 0.28) 38%, transparent 100%)`;

export const PROGRESSIVE_BLUR_BOTTOM_DARKEN = `linear-gradient(to top, rgba(0, 0, 0, 0.55) 0%, rgba(0, 0, 0, 0.22) 44%, transparent 100%)`;

/** Soft vignettes — keep atmosphere without eating form copy. */
export const PROGRESSIVE_BLUR_TOP_DARKEN_SOFT = `linear-gradient(to bottom, rgba(0, 0, 0, 0.28) 0%, rgba(0, 0, 0, 0.1) 45%, transparent 100%)`;

export const PROGRESSIVE_BLUR_BOTTOM_DARKEN_SOFT = `linear-gradient(to top, rgba(0, 0, 0, 0.24) 0%, rgba(0, 0, 0, 0.08) 45%, transparent 100%)`;

/** Aliases for lite mode (same visible treatment). */
export const PROGRESSIVE_BLUR_TOP_DARKEN_LITE = PROGRESSIVE_BLUR_TOP_DARKEN;
export const PROGRESSIVE_BLUR_BOTTOM_DARKEN_LITE = PROGRESSIVE_BLUR_BOTTOM_DARKEN;

/** Low-end static fallback — no backdrop-filter compositing. */
export const PROGRESSIVE_BLUR_STATIC_TOP = `linear-gradient(to bottom, rgba(0, 0, 0, 0.72) 0%, rgba(0, 0, 0, 0.32) 42%, transparent 100%)`;

export const PROGRESSIVE_BLUR_STATIC_BOTTOM = `linear-gradient(to top, rgba(0, 0, 0, 0.65) 0%, rgba(0, 0, 0, 0.26) 46%, transparent 100%)`;

export const SCROLL_STORY_SELECTOR = "[data-scroll-story]";
export const NUMBERS_SECTION_SELECTOR = "[data-numbers-section]";
