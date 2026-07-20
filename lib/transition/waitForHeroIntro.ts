import { getTransitionState, subscribe } from "./transitionStore";

function waitForIntroComplete(): Promise<void> {
  const current = getTransitionState();
  if (current.introComplete) {
    return Promise.resolve();
  }

  return new Promise((resolve) => {
    const unsubscribe = subscribe(() => {
      if (getTransitionState().introComplete) {
        unsubscribe();
        resolve();
      }
    });
  });
}

function waitForTransitionIdle(): Promise<void> {
  const current = getTransitionState();
  if (!current.isNavigating) {
    return Promise.resolve();
  }

  return new Promise((resolve) => {
    const unsubscribe = subscribe(() => {
      if (!getTransitionState().isNavigating) {
        unsubscribe();
        resolve();
      }
    });
  });
}

/**
 * Scroll-story may initialise only after:
 * 1) cold-load CSS intro completes, and
 * 2) any in-flight page transition has fully finished.
 */
export function waitForScrollStoryReady(): Promise<void> {
  return waitForIntroComplete()
    .then(() => waitForTransitionIdle());
}

/** @deprecated Use waitForScrollStoryReady */
export const waitForHeroIntro = waitForScrollStoryReady;
