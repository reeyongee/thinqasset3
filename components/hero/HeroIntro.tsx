"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { useTransitionAnimation } from "@/components/transition/TransitionAnimationContext";
import {
  guardHeroIntroReplay,
  hasIntroPlayed,
  signalIntroCompleteOnce,
} from "@/lib/transition/introControl";

type HeroIntroProps = {
  children: React.ReactNode;
};

export function HeroIntro({ children }: HeroIntroProps) {
  const { skipIntro, introComplete } = useTransitionAnimation();
  const rootRef = useRef<HTMLDivElement>(null);
  const finishedRef = useRef(false);

  useLayoutEffect(() => {
    guardHeroIntroReplay();
  }, []);

  useEffect(() => {
    if (finishedRef.current || introComplete) return;

    if (
      skipIntro ||
      hasIntroPlayed() ||
      document.documentElement.hasAttribute("data-intro-played")
    ) {
      finishedRef.current = true;
      signalIntroCompleteOnce();
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      finishedRef.current = true;
      signalIntroCompleteOnce();
      return;
    }

    const root = rootRef.current;
    if (!root) return;

    const finish = () => {
      if (finishedRef.current) return;
      finishedRef.current = true;
      signalIntroCompleteOnce();
    };

    const onAnimationEnd = (event: AnimationEvent) => {
      if (event.animationName === "hero-bg-scale") {
        finish();
      }
    };

    root.addEventListener("animationend", onAnimationEnd);

    return () => {
      root.removeEventListener("animationend", onAnimationEnd);
    };
  }, [skipIntro, introComplete]);

  return (
    <div ref={rootRef} data-hero-intro className="contents">
      {children}
    </div>
  );
}
