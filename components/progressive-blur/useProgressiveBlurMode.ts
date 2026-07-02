"use client";

import { useSyncExternalStore } from "react";

export type ProgressiveBlurMode = "full" | "lite" | "static";

const LOW_END_CORE_THRESHOLD = 4;

function detectMode(): ProgressiveBlurMode {
  if (typeof navigator === "undefined") {
    return "full";
  }

  const cores = navigator.hardwareConcurrency ?? 8;
  if (cores <= LOW_END_CORE_THRESHOLD) {
    return "static";
  }

  return "full";
}

let mode = detectMode();

const listeners = new Set<() => void>();

function subscribe(callback: () => void) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

function getSnapshot() {
  return mode;
}

function getServerSnapshot(): ProgressiveBlurMode {
  return "full";
}

if (typeof window !== "undefined") {
  window.addEventListener("load", () => {
    const next = detectMode();
    if (next !== mode) {
      mode = next;
      for (const listener of listeners) {
        listener();
      }
    }
  });
}

export function useProgressiveBlurMode() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
