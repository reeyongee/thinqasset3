import { patchTransitionState, signalIntroComplete } from "./transitionStore";

export const HERO_INTRO_PLAYED_KEY = "heroIntroPlayed";

let coldEnterHandled = false;
let introCompletionSignaled = false;

export function shouldSkipColdEnter(): boolean {
  if (coldEnterHandled) return false;
  if (document.documentElement.hasAttribute("data-transitioning")) return false;
  coldEnterHandled = true;
  return true;
}

function settleIntroWithoutReplay(): void {
  const html = document.documentElement;
  html.setAttribute("data-intro-played", "");
  patchTransitionState({ skipIntro: true, introComplete: true });
  signalIntroCompleteOnce();
}

/**
 * Arm CSS hero intro once per session. Uses <html> attributes as the single
 * source of truth so duplicate module instances (dev chunks) and Strict Mode
 * remounts cannot re-arm after the first pass.
 */
export function guardHeroIntroReplay(): void {
  if (typeof window === "undefined") return;

  const html = document.documentElement;

  if (hasIntroPlayed() || html.hasAttribute("data-intro-played")) {
    html.setAttribute("data-intro-played", "");
    patchTransitionState({ skipIntro: true, introComplete: true });
    return;
  }

  if (html.hasAttribute("data-skip-intro") || html.hasAttribute("data-transitioning")) {
    return;
  }

  if (html.hasAttribute("data-intro-ready")) {
    settleIntroWithoutReplay();
    return;
  }

  html.setAttribute("data-intro-ready", "");
}

/** Lock DOM + session so remounted hero nodes cannot replay CSS intro. */
export function settleIntroDom(): void {
  if (typeof window === "undefined") return;
  document.documentElement.setAttribute("data-intro-played", "");
  sessionStorage.setItem(HERO_INTRO_PLAYED_KEY, "true");
}

export function signalIntroCompleteOnce(): void {
  if (introCompletionSignaled) return;
  introCompletionSignaled = true;
  settleIntroDom();
  signalIntroComplete();
}

/** Called from inline reload script only — resets intro for a true hard refresh. */
export function resetIntroSessionForReload(): void {
  if (typeof window === "undefined") return;
  introCompletionSignaled = false;
  sessionStorage.removeItem(HERO_INTRO_PLAYED_KEY);
  const html = document.documentElement;
  html.removeAttribute("data-intro-played");
  html.removeAttribute("data-intro-ready");
  patchTransitionState({ skipIntro: false, introComplete: false });
}

export function markIntroPlayed(): void {
  if (typeof window === "undefined") return;
  settleIntroDom();
  patchTransitionState({ skipIntro: true, introComplete: true });
  introCompletionSignaled = true;
}

export function hasIntroPlayed(): boolean {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem(HERO_INTRO_PLAYED_KEY) === "true";
}

/** Freeze CSS hero intro mid-flight — do not force settled opacity. */
export function setSkipIntro(active: boolean): void {
  if (typeof window === "undefined") return;
  document.documentElement.toggleAttribute("data-skip-intro", active);
  if (active) {
    patchTransitionState({ skipIntro: true });
  }
}

export function syncIntroPlayedFromSession(): void {
  if (!hasIntroPlayed()) return;
  document.documentElement.setAttribute("data-intro-played", "");
  patchTransitionState({ skipIntro: true, introComplete: true });
  introCompletionSignaled = true;
}
