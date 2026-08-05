export const THINQASSET_LOGO_MASK_SRC =
  "/thinqasset-assets/thinqasset-logo-reversed.png";

export const THINQASSET_LOGO_MASK_DIMENSIONS = {
  width: 1360,
  height: 335,
} as const;

/** Last source pixel column of the mark before the wordmark gap (mask analysis). */
export const THINQASSET_LOGO_SYMBOL_END_X = 316;

export const THINQASSET_LOGO_SYMBOL_WIDTH_RATIO =
  THINQASSET_LOGO_SYMBOL_END_X / THINQASSET_LOGO_MASK_DIMENSIONS.width;

/**
 * Visual spin pivot of the cropped mark (percent of crop box).
 * Derived from the opaque symbol bbox as an upward triangle centroid —
 * not the CSS box center (50% 50%), which sits above the optical middle.
 */
export const THINQASSET_LOGO_MARK_ORIGIN = {
  xPercent: 52.06,
  yPercent: 64.28,
} as const;

export const THINQASSET_LOGO_ALT = "THINQASSET";

/** Sitewide tagline — also expands the TBG acronym. */
export const TBG_TAGLINE = "Think. Build. Grow.";
