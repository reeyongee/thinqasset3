/** Minimum brand beat before the overlay may dismiss. */
export const PRELOADER_MIN_MS = 2800;

/**
 * Hard cap so readiness never hangs — still allows slow loads to outlast
 * the min brand beat (hybrid = max(min, assets), capped here).
 */
export const PRELOADER_MAX_MS = 9000;

/** Exit wipe / fade duration (ms). */
export const PRELOADER_EXIT_MS = 700;
