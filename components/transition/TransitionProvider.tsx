"use client";

import { useCallback, useEffect, useRef } from "react";
import gsap from "gsap";
import { TransitionRouter } from "next-transition-router";
import { usePrefersReducedMotion } from "@/components/progressive-blur/usePrefersReducedMotion";
import {
  hideIncomingContent,
  resetTransitionStyles,
  softDissolveEnter,
  softDissolveEnterReducedMotion,
  softDissolveLeave,
  softDissolveLeaveReducedMotion,
} from "@/lib/transition/softDissolve";
import {
  pauseScrollAnimations,
  resumeScrollAnimations,
} from "@/lib/transition/scrollTransitionControls";
import {
  markIntroPlayed,
  setSkipIntro,
  shouldSkipColdEnter,
  syncIntroPlayedFromSession,
} from "@/lib/transition/introControl";
import { patchTransitionState } from "@/lib/transition/transitionStore";
import { waitForRouteReady } from "@/lib/transition/waitForRouteReady";

function isHashOnlyNavigation(from: string | undefined, to: string | undefined): boolean {
  if (!from || !to) return false;
  const fromPath = from.split("#")[0] || "/";
  const toPath = to.split("#")[0] || "/";
  return fromPath === toPath && to.includes("#");
}

function setTransitionActive(active: boolean): void {
  document.documentElement.toggleAttribute("data-transitioning", active);
  document.documentElement.setAttribute("aria-busy", active ? "true" : "false");
}

let enterSequence = 0;

export function TransitionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const prefersReducedMotionRef = useRef(prefersReducedMotion);
  prefersReducedMotionRef.current = prefersReducedMotion;

  useEffect(() => {
    gsap.set(".transition-veil", { autoAlpha: 0 });
    syncIntroPlayedFromSession();
  }, []);

  const leave = useCallback((next: () => void, from?: string, to?: string) => {
    if (isHashOnlyNavigation(from, to)) {
      next();
      return;
    }

    patchTransitionState({
      phase: "leaving",
      isNavigating: true,
      skipIntro: true,
    });
    setTransitionActive(true);
    setSkipIntro(true);
    pauseScrollAnimations();

    if (prefersReducedMotionRef.current) {
      const tl = softDissolveLeaveReducedMotion();
      tl.eventCallback("onComplete", next);
      return () => tl.kill();
    }

    const tl = softDissolveLeave();
    tl.eventCallback("onComplete", next);
    return () => tl.kill();
  }, []);

  const enter = useCallback((next: () => void) => {
    const isActiveTransition =
      document.documentElement.hasAttribute("data-transitioning");

    if (shouldSkipColdEnter()) {
      next();
      return;
    }

    if (!isActiveTransition) {
      next();
      return;
    }

    const sequence = ++enterSequence;
    let tl: gsap.core.Timeline | null = null;
    let cancelled = false;

    patchTransitionState({
      phase: "entering",
      isNavigating: true,
      skipIntro: true,
    });
    setSkipIntro(true);
    hideIncomingContent();

    void waitForRouteReady().then(() => {
      if (cancelled || sequence !== enterSequence) return;

      tl = prefersReducedMotionRef.current
        ? softDissolveEnterReducedMotion()
        : softDissolveEnter();

      tl.eventCallback("onComplete", () => {
        if (cancelled || sequence !== enterSequence) return;

        resetTransitionStyles();
        resumeScrollAnimations();
        markIntroPlayed();
        setSkipIntro(false);
        setTransitionActive(false);
        patchTransitionState({
          phase: "idle",
          isNavigating: false,
          skipIntro: true,
          introComplete: true,
        });

        next();
      });
    });

    return () => {
      cancelled = true;
      tl?.kill();
    };
  }, []);

  return (
    <TransitionRouter leave={leave} enter={enter}>
      {children}

      <div className="transition-veil" aria-hidden />
    </TransitionRouter>
  );
}
