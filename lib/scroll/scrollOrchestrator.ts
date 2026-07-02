import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const SCROLL_BREAKPOINTS = {
  isDesktop: "(min-width: 810px)",
  isMobile: "(max-width: 809.98px)",
} as const;

export type ScrollBreakpointContext = {
  isDesktop: boolean;
  isMobile: boolean;
};

let refreshQueued = false;
let resizeTimer: ReturnType<typeof setTimeout> | null = null;
let orchestratorInitialized = false;

/** Coalesce multiple section setups into a single ScrollTrigger.refresh per frame. */
export function scheduleScrollRefresh() {
  if (refreshQueued) return;
  refreshQueued = true;
  requestAnimationFrame(() => {
    refreshQueued = false;
    ScrollTrigger.refresh();
  });
}

/** Single resize + load handler shared across all scroll sections. */
export function initScrollOrchestrator(): () => void {
  if (typeof window === "undefined") {
    return () => {};
  }

  if (orchestratorInitialized) {
    return () => {};
  }
  orchestratorInitialized = true;

  const onResize = () => {
    if (resizeTimer) clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);
  };

  const onLoad = () => scheduleScrollRefresh();

  window.addEventListener("resize", onResize, { passive: true });
  window.addEventListener("load", onLoad, { once: true });
  scheduleScrollRefresh();

  return () => {
    window.removeEventListener("resize", onResize);
    window.removeEventListener("load", onLoad);
    if (resizeTimer) clearTimeout(resizeTimer);
    orchestratorInitialized = false;
  };
}

/** Shared gsap.matchMedia for the 810px breakpoint used across scroll sections. */
export function runWithScrollBreakpoints(
  setup: (ctx: ScrollBreakpointContext) => void | (() => void),
): () => void {
  const mm = gsap.matchMedia();
  mm.add(SCROLL_BREAKPOINTS, (context) => {
    const { isDesktop, isMobile } = context.conditions ?? {};
    return setup({
      isDesktop: !!isDesktop,
      isMobile: !!isMobile,
    });
  });
  return () => mm.revert();
}

/** Refresh ScrollTrigger when content-visibility sections paint at true size. */
export function initDeferredPaintRefresh(): () => void {
  if (typeof window === "undefined") {
    return () => {};
  }

  const observed = new WeakSet<Element>();

  const observer = new IntersectionObserver(
    (entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        scheduleScrollRefresh();
      }
    },
    { rootMargin: "300px 0px" },
  );

  const observeSection = (section: Element) => {
    if (observed.has(section)) return;
    observed.add(section);
    observer.observe(section);
  };

  const observeAll = () => {
    document
      .querySelectorAll(".section-deferred-paint")
      .forEach(observeSection);
  };

  observeAll();

  const mutationObserver = new MutationObserver(() => observeAll());
  mutationObserver.observe(document.body, { childList: true, subtree: true });

  return () => {
    observer.disconnect();
    mutationObserver.disconnect();
  };
}
