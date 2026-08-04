export type SiteChromeConfig = {
  /** Master switch — false hides nav, footer, and blur for this route. */
  chrome: boolean;
  /** Progressive blur veil — on by default; set false per route when content needs a flat canvas. */
  progressiveBlur?: boolean;
  /**
   * Soften top/bottom progressive blur (shorter band + lighter vignette).
   * Only applies when progressiveBlur is enabled.
   */
  progressiveBlurSoft?: boolean;
};

const DEFAULT: SiteChromeConfig = { chrome: true, progressiveBlur: true };

/**
 * Per-route chrome overrides. Add a path here to drop nav, footer, and blur.
 *
 * @example
 * "/checkout": { chrome: false },
 */
const ROUTE_OVERRIDES: Record<string, SiteChromeConfig> = {
  "/": { chrome: true, progressiveBlurSoft: true },
  "/about": { chrome: true, progressiveBlur: false },
  "/contact": { chrome: true, progressiveBlur: false },
  "/services": { chrome: true, progressiveBlur: false },
  "/lab/fund-flow": { chrome: false },
  "/lab/investment-structuring": { chrome: false },
};

/** Pixels scrolled before inner-page progressive blur activates. */
export const INNER_PAGE_BLUR_SCROLL_THRESHOLD = 1;

export function getSiteChromeConfig(pathname: string): SiteChromeConfig {
  if (ROUTE_OVERRIDES[pathname]) {
    return ROUTE_OVERRIDES[pathname];
  }

  if (pathname.startsWith("/services")) {
    return { chrome: true, progressiveBlur: false };
  }

  return DEFAULT;
}
