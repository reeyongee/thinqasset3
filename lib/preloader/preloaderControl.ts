import {
  hasIntroPlayed,
  settleIntroDom,
} from "@/lib/transition/introControl";
import { patchTransitionState } from "@/lib/transition/transitionStore";

export const PRELOADER_PENDING_ATTR = "data-preloader-pending";

let preloaderCompleted = false;

export function isPreloaderPending(): boolean {
  if (typeof window === "undefined") return false;
  if (preloaderCompleted) return false;
  return document.documentElement.hasAttribute(PRELOADER_PENDING_ATTR);
}

export function shouldRunSitePreloader(pathname: string): boolean {
  if (typeof window === "undefined") return false;
  if (pathname !== "/") return false;
  if (preloaderCompleted) return false;
  if (hasIntroPlayed()) return false;
  if (document.documentElement.hasAttribute("data-intro-played")) return false;
  return true;
}

/** Mark the preloader gate active (also set by the inline head script). */
export function markPreloaderPending(): void {
  if (typeof window === "undefined") return;
  preloaderCompleted = false;
  document.documentElement.setAttribute(PRELOADER_PENDING_ATTR, "");
}

/**
 * Release the preloader gate and arm the CSS hero intro.
 * Safe to call multiple times (Strict Mode / remounts).
 */
export function completePreloaderAndArmIntro(): void {
  if (typeof window === "undefined") return;

  const html = document.documentElement;
  html.removeAttribute(PRELOADER_PENDING_ATTR);
  preloaderCompleted = true;

  if (html.hasAttribute("data-intro-played") || hasIntroPlayed()) {
    html.setAttribute("data-intro-played", "");
    patchTransitionState({ skipIntro: true, introComplete: true });
    return;
  }

  if (!html.hasAttribute("data-intro-ready")) {
    html.setAttribute("data-intro-ready", "");
  }
}

/** Skip overlay entirely (non-home, session already played, reduced motion settle). */
export function skipPreloaderGate(): void {
  if (typeof window === "undefined") return;
  document.documentElement.removeAttribute(PRELOADER_PENDING_ATTR);
  preloaderCompleted = true;
}

/** Hard refresh — allow preloader + intro to replay. */
export function resetPreloaderSessionForReload(): void {
  if (typeof window === "undefined") return;
  preloaderCompleted = false;
}

/**
 * If session already saw the intro, clear any pending preloader attribute
 * left from a stale paint.
 */
export function syncPreloaderFromSession(): void {
  if (typeof window === "undefined") return;
  if (!hasIntroPlayed()) return;
  document.documentElement.removeAttribute(PRELOADER_PENDING_ATTR);
  preloaderCompleted = true;
  settleIntroDom();
}
