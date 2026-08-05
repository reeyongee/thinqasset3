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
 *
 * When `data-preloader-pending` is set, the site preloader owns the gate and
 * will set `data-intro-ready` after its exit — do not arm here.
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

  // Site preloader still running — HeroIntro waits until it arms intro-ready.
  if (html.hasAttribute("data-preloader-pending")) {
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

/** Called on hard refresh — resets intro so the hero animation can replay. */
export function resetIntroSessionForReload(): void {
  if (typeof window === "undefined") return;
  introCompletionSignaled = false;
  sessionStorage.removeItem(HERO_INTRO_PLAYED_KEY);
  const html = document.documentElement;
  html.removeAttribute("data-intro-played");
  html.removeAttribute("data-intro-ready");
  // Allow preloader to run again on reload (inline script + SitePreloader).
  if (window.location.pathname === "/" || window.location.pathname === "") {
    html.setAttribute("data-preloader-pending", "");
  } else {
    html.removeAttribute("data-preloader-pending");
  }
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
