/** Texture paths — stored under /public/lab/fin-globe/textures */
export const GLOBE_SCROLL_TEXTURES = {
  earthDaymap: "/lab/fin-globe/textures/omma/earth-daymap-2k.jpg",
  stoneDiffuse: "/lab/fin-globe/textures/omma/stone-diffuse-1k.jpg",
  stoneNormal: "/lab/fin-globe/textures/omma/stone-normal-1k.jpg",
  stoneRoughness: "/lab/fin-globe/textures/omma/stone-roughness-1k.jpg",
  landMaskMobile: "/lab/fin-globe/textures/omma/earth-landmask-mobile.jpg",
} as const;

/** @deprecated Use GLOBE_SCROLL_TEXTURES */
export const FIN_GLOBE_TEXTURES = GLOBE_SCROLL_TEXTURES;

/** Fin.com globe sphere radius (scene units) */
export const GLOBE_RADIUS = 100;

/** Camera presets from fin.com useGlobeStage (desktop) */
export const CAMERA_STAGE_ONE = { cameraY: 125, cameraZ: 120, globeY: 7.5, scale: 1 };
export const CAMERA_STAGE_FOUR_DESKTOP = { cameraY: 0, cameraZ: 400, globeY: 0, scale: 1 };
export const CAMERA_STAGE_FOUR_MOBILE = { cameraY: 0, cameraZ: 400, globeY: 20, scale: 0.85 };

/** Globe rotation anchors (radians) — Ia ≈ -58°, Nh ≈ -51.5°, sp = Nh − 30° */
export const ROTATION_HERO = { x: -1.012290966, y: 0, z: 0 };
export const ROTATION_REGIONAL = { x: -1.012290966, y: -0.898842853, z: 0 };
export const ROTATION_GLOBAL = { x: 0, y: -1.422304238, z: 0 };

/** Fin dp() timeline keyframes (positions on a 0–100 span). */

/**
 * Desktop — long regional ease across the text phase (not fin’s 12-unit snap),
 * then soft camera/global ease into center.
 */
export const SCRUB_REGIONAL_START = 0;
export const SCRUB_REGIONAL_DURATION_DESKTOP = 55;
export const SCRUB_GLOBAL_START_DESKTOP = 65;
export const SCRUB_GLOBAL_DURATION_DESKTOP = 35;
export const SCRUB_CAMERA_DURATION_DESKTOP = 35;

/**
 * Mobile — same eased profile; camera waits until after solution text is readable,
 * then zooms to center on a second scroll phase.
 */
export const SCRUB_REGIONAL_DURATION_MOBILE = 55;
export const SCRUB_GLOBAL_START_MOBILE = 65;
export const SCRUB_GLOBAL_DURATION_MOBILE = 35;
export const SCRUB_CAMERA_DURATION_MOBILE = 35;

/** @deprecated Prefer desktop/mobile-specific scrub constants */
export const SCRUB_REGIONAL_DURATION = SCRUB_REGIONAL_DURATION_DESKTOP;
/** @deprecated Prefer desktop/mobile-specific scrub constants */
export const SCRUB_GLOBAL_START = SCRUB_GLOBAL_START_DESKTOP;
/** @deprecated Prefer desktop/mobile-specific scrub constants */
export const SCRUB_GLOBAL_DURATION = SCRUB_GLOBAL_DURATION_DESKTOP;
/** @deprecated Prefer desktop/mobile-specific scrub constants */
export const SCRUB_CAMERA_DURATION = SCRUB_CAMERA_DURATION_DESKTOP;

/** Idle Y-spin (rad/s) — kept slow vs narrative scrub */
export const GLOBE_IDLE_ROTATION_SPEED = 0.028;

/** Mobile-only: timeline progress when solution text is centered and camera begins */
export const NARRATIVE_TEXT_END_MOBILE = SCRUB_GLOBAL_START_MOBILE / 100;

/** Desktop: camera begins after solution text is centered */
export const NARRATIVE_TEXT_END_DESKTOP = SCRUB_GLOBAL_START_DESKTOP / 100;

/** Globe fade vs distance to exit sentinel (× viewport height) */
export const GLOBE_FADE_START_RATIO = 0.72;
export const GLOBE_FADE_END_RATIO = 0.22;

/** Fin Pt() — hero stage turns off below this raw globe opacity */
export const GLOBE_HERO_OPACITY_THRESHOLD = 0.35;

/** Fin ze() mask padding around projected globe radius */
export const NARRATIVE_MASK_INNER_OFFSET = 20;
export const NARRATIVE_MASK_OUTER_OFFSET = 50;

/** Fin Ls — bounds change epsilon (px) */
export const BOUNDS_EPSILON = 0.75;

/** Mask solid stop (% inside radial gradient) */
export const MASK_SOLID_STOP = "58%";

/** Fin Wo / $o — bg mask Y offset on mobile */
export const MASK_OFFSET = 100;
export const MOBILE_MASK_MAX_OFFSET = 96;
export const MOBILE_MASK_VH_RATIO = 0.11;

/** Fin be() / Uo — mobile JS breakpoint */
export const MOBILE_JS_BREAKPOINT = 768;

/** Desktop-only narrative stretch (hero → solution headline center). */
export const NARRATIVE_SCROLL_SCALE_DESKTOP = 1.5;

/** @deprecated Use NARRATIVE_SCROLL_SCALE_DESKTOP — mobile uses fin-base layout via CSS. */
export const NARRATIVE_SCROLL_SCALE = NARRATIVE_SCROLL_SCALE_DESKTOP;

/** Post-center unlock runway — enough scroll for camera zoom, then page continues */
export const EXIT_RUNWAY_MULTIPLIER_DESKTOP = 0.55;

/** @deprecated Use EXIT_RUNWAY_MULTIPLIER_DESKTOP */
export const EXIT_RUNWAY_MULTIPLIER = EXIT_RUNWAY_MULTIPLIER_DESKTOP;

/** Hero logos fade range (px scroll) — desktop scaled */
export const HERO_LOGOS_FADE_END = 125 * NARRATIVE_SCROLL_SCALE_DESKTOP;

/** Hero logos fade range (px scroll) — fin mobile base */
export const HERO_LOGOS_FADE_END_MOBILE = 125;

/** Problem beat min-height (vh) — desktop */
export const PROBLEM_MIN_HEIGHT_VH = 100 * NARRATIVE_SCROLL_SCALE_DESKTOP;

/** Spacer below problem copy before solution enters (vh) — desktop */
export const PROBLEM_SPACER_VH = 50 * NARRATIVE_SCROLL_SCALE_DESKTOP;

/** Lead-in above solution headline (vh) — desktop */
export const SOLUTION_LEAD_IN_VH = 25 * NARRATIVE_SCROLL_SCALE_DESKTOP;

/** Extra narrative scroll before the solution headline — desktop */
export const NARRATIVE_RUNWAY_MULTIPLIER = 2 * NARRATIVE_SCROLL_SCALE_DESKTOP;

/** Desktop solution exit padding (px) — runway for center zoom after solution text */
export const SOLUTION_DESKTOP_EXIT_PADDING_BOTTOM = Math.round(
  891 * EXIT_RUNWAY_MULTIPLIER_DESKTOP,
);

/** Mobile solution exit padding (dvh) — runway for center zoom, then unlock */
export const SOLUTION_MOBILE_EXIT_PADDING_BOTTOM_DVH = 50;

/** Center-unlock sentinel (vh) — ScrollTrigger end; no globe fade */
export const FADE_SENTINEL_VH = 55;

/** Fin mobile portrait layout query — matches globe-scroll.css breakpoints */
export const MOBILE_PORTRAIT_QUERY = "(max-width: 780px) and (orientation: portrait)";

/** Hero jurisdiction strip offset from viewport bottom */
export const LOGOS_VIEWPORT_BOTTOM_OFFSET = "14vh";

/** Fin revealFade range — bg mask offset only kicks in after 75% narrative progress */
export const REVEAL_FADE_START = 0.75;
export const REVEAL_FADE_END = 1;

/** Narrative progress where stats begin fading with the globe exit */
export const STATS_EXIT_PROGRESS = 0.88;
