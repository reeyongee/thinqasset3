const LOGO_BASE = "/thinqasset-assets";

export const THINQASSET_LOGO_MASK_SRC =
  `${LOGO_BASE}/thinqasset-logo-reversed.png`;

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

/** Mauritius double tax agreement network — sitewide copy. */
export const MAURITIUS_DTA_LINE = "150 Double tax agreements throughout the world";

/** Favicon + PWA tile set — regenerated from header-mark with ~80% fill. */
export const THINQASSET_FAVICON = {
  icon32: `${LOGO_BASE}/favicon-32.png`,
  icon192: `${LOGO_BASE}/favicon-192.png`,
  apple180: `${LOGO_BASE}/apple-touch-icon-180.png`,
  msTile270: `${LOGO_BASE}/ms-tile-270.png`,
} as const;

/** Default Open Graph / Twitter share image (1200×630). */
export const THINQASSET_OG_IMAGE = `${LOGO_BASE}/og-image.png`;

/** Full-bleed PageHero backgrounds for major inner pages. */
export const PAGE_HERO_IMAGES = {
  about: `${LOGO_BASE}/footer/uae.webp`,
  services: `${LOGO_BASE}/services/fund-platform/hero.png`,
  contact: `${LOGO_BASE}/footer/luxembourg.webp`,
} as const;
