"use client";

import { useSyncExternalStore } from "react";
import {
  getServerTransitionState,
  getTransitionState,
  subscribe,
  type TransitionState,
} from "@/lib/transition/transitionStore";

export type TransitionAnimationContextValue = TransitionState;

export function useTransitionAnimation(): TransitionAnimationContextValue {
  return useSyncExternalStore(
    subscribe,
    getTransitionState,
    getServerTransitionState,
  );
}
