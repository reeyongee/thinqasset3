"use client";

import { useSyncExternalStore } from "react";

const PHONE_QUERY = "(max-width: 767px)";

function subscribe(onStoreChange: () => void) {
  const media = window.matchMedia(PHONE_QUERY);
  media.addEventListener("change", onStoreChange);
  return () => media.removeEventListener("change", onStoreChange);
}

function getSnapshot() {
  return window.matchMedia(PHONE_QUERY).matches;
}

function getServerSnapshot() {
  return false;
}

export function useIsPhoneViewport() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
