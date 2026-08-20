"use client";

import { usePathname } from "next/navigation";
import { useSyncExternalStore } from "react";
import { GRAPH_PHASE_START } from "@/components/scroll-story/constants";
import { scrollStoryProgressStore } from "@/components/scroll-story/scrollStoryProgressStore";
import { INNER_PAGE_BLUR_SCROLL_THRESHOLD } from "@/lib/site-chrome/config";
import {
  getTransitionState,
  subscribe as subscribeTransition,
} from "@/lib/transition/transitionStore";

function subscribeToScroll(listener: () => void) {
  window.addEventListener("scroll", listener, { passive: true });
  return () => window.removeEventListener("scroll", listener);
}

function subscribeToHomeBlur(listener: () => void) {
  const unsubStory = scrollStoryProgressStore.subscribe(listener);
  const unsubScroll = subscribeToScroll(listener);
  return () => {
    unsubStory();
    unsubScroll();
  };
}

function getHomeBlurSnapshot(): boolean {
  if (
    document.querySelector(".globe-scroll") ||
    document.querySelector("[data-prism-hero]")
  ) {
    return true;
  }

  if (!document.querySelector("[data-scroll-story]")) {
    return window.scrollY > INNER_PAGE_BLUR_SCROLL_THRESHOLD;
  }

  const { progress, pinActive } = scrollStoryProgressStore.getSnapshot();
  if (!pinActive) return false;

  const inHeroIntro = pinActive && progress < GRAPH_PHASE_START;
  return !inHeroIntro;
}

function getInnerPageBlurSnapshot(): boolean {
  return window.scrollY > INNER_PAGE_BLUR_SCROLL_THRESHOLD;
}

/**
 * Progressive blur activation:
 * - Home with globe scroll or prism hero: always on (matches inner sections)
 * - Home with scroll story: on during graph phase and below
 * - Inner pages: on after scrolling past the top
 * - Off during page transitions
 */
export function useProgressiveBlurActive() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const isNavigating = useSyncExternalStore(
    subscribeTransition,
    () => getTransitionState().isNavigating,
    () => false,
  );

  const homeBlurActive = useSyncExternalStore(
    subscribeToHomeBlur,
    getHomeBlurSnapshot,
    () => false,
  );

  const innerBlurActive = useSyncExternalStore(
    subscribeToScroll,
    getInnerPageBlurSnapshot,
    () => false,
  );

  if (isNavigating) return false;
  return isHome ? homeBlurActive : innerBlurActive;
}
