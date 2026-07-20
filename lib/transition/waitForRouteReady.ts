import { TRANSITION_SELECTORS } from "./constants";

function waitForNextFrame(count = 1): Promise<void> {
  return new Promise((resolve) => {
    let remaining = count;
    const tick = () => {
      remaining -= 1;
      if (remaining <= 0) resolve();
      else requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });
}

function hasPageContent(main: Element): boolean {
  if (main.querySelector(TRANSITION_SELECTORS.page)) return true;
  if (main.querySelector(TRANSITION_SELECTORS.headline)) return true;
  if (main.querySelector("h1")) return true;
  return main.children.length > 0;
}

/**
 * Waits for route DOM, fonts, and layout — does NOT wait for all lazy below-fold images
 * (home has dozens; waiting on them hangs the transition indefinitely).
 */
export function waitForRouteReady(): Promise<void> {
  return new Promise((resolve) => {
    let settled = false;
    let observer: MutationObserver | null = null;

    const finish = async () => {
      if (settled) return;
      settled = true;
      observer?.disconnect();

      if (document.fonts?.ready) {
        await document.fonts.ready;
      }

      await waitForNextFrame(2);
      resolve();
    };

    const tryFinish = () => {
      const main = document.querySelector("main");
      if (!main || !hasPageContent(main)) return;
      void finish();
    };

    observer = new MutationObserver(() => {
      tryFinish();
    });

    observer.observe(document.body, { childList: true, subtree: true });
    tryFinish();
  });
}
