"use client";

import { useSyncExternalStore } from "react";
import { scrollStoryProgressStore } from "@/components/scroll-story/scrollStoryProgressStore";

function subscribeToStoryProgress(listener: () => void) {
  return scrollStoryProgressStore.subscribe(listener);
}

function getHeroIntroSnapshot() {
  return scrollStoryProgressStore.isHeroIntro();
}

/**
 * Blur is off only during the hero intro (before the graph phase).
 * Progress comes from the scroll-story pin timeline.
 */
export function useProgressiveBlurActive() {
  const inHeroIntro = useSyncExternalStore(
    subscribeToStoryProgress,
    getHeroIntroSnapshot,
    () => false,
  );

  return !inHeroIntro;
}
