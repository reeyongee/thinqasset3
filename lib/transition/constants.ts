/** Internal route used to demo page transitions from the landing Consultation CTA. */
export const CONSULTATION_TEST_HREF = "/contact";

export const TRANSITION_SELECTORS = {
  page: "[data-transition-page]",
  text: "[data-transition-text]",
  headline: '[data-transition-text="headline"]',
  body: '[data-transition-text="body"]',
  item: "[data-transition-item]",
  nav: "[data-transition-nav]",
  veil: ".transition-veil",
  root: "main.site-content",
} as const;

/** Calm, editorial pacing — unhurried but not sluggish. */
export const LEAVE_TEXT_DURATION = 0.55;
export const LEAVE_VEIL_DURATION = 0.5;
export const LEAVE_VEIL_OVERLAP = 0.12;

/** Nav moves on its own lane — no blur, slightly quicker. */
export const NAV_LEAVE_DURATION = 0.42;
export const NAV_ENTER_DURATION = 0.62;
export const NAV_OFFSET = 8;
export const NAV_LEAVE_DELAY = 0;
export const NAV_ENTER_VEIL_OVERLAP = 0.38;

/** Content follows nav on leave, leads slightly on enter. */
export const CONTENT_LEAVE_DELAY = 0.1;
export const CONTENT_OFFSET = 12;
export const CONTENT_BLUR = 8;

/** Pause on full veil after content is ready, before reveal begins. */
export const VEIL_HOLD_DURATION = 0.28;

export const ENTER_VEIL_DURATION = 0.7;
export const ENTER_TEXT_DELAY = 0.22;
export const ENTER_TEXT_DURATION = 0.75;
export const ENTER_TEXT_STAGGER = 0.07;

/** Below-fold home sections trail hero on return. */
export const SHELL_ENTER_DELAY = 0.18;
export const SHELL_ENTER_DURATION = 0.65;
export const SHELL_ENTER_STAGGER = 0.04;
export const SHELL_OFFSET = 12;

/** Matches site motion language (hero/nav). */
export const EXIT_EASE = "power2.inOut";
export const ENTER_EASE = "power2.out";
export const BRAND_EASE = "cubic-bezier(0.12, 0.23, 0.17, 0.99)";
