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

function waitForPreloaderGate(): Promise<void> {
  if (!document.documentElement.hasAttribute("data-preloader-pending")) {
    return Promise.resolve();
  }

  return new Promise((resolve) => {
    const html = document.documentElement;
    const observer = new MutationObserver(() => {
      if (!html.hasAttribute("data-preloader-pending")) {
        observer.disconnect();
        resolve();
      }
    });
    observer.observe(html, {
      attributes: true,
      attributeFilter: ["data-preloader-pending"],
    });
  });
}

export function HeroIntro({ children }: HeroIntroProps) {
  const { skipIntro, introComplete } = useTransitionAnimation();
  const rootRef = useRef<HTMLDivElement>(null);
  const finishedRef = useRef(false);

  useLayoutEffect(() => {
    guardHeroIntroReplay();
  }, []);

  useEffect(() => {
    if (finishedRef.current || introComplete) return;

    let cancelled = false;
    let root: HTMLDivElement | null = null;

    const finish = () => {
      if (finishedRef.current || cancelled) return;
      finishedRef.current = true;
      signalIntroCompleteOnce();
    };

    const onAnimationEnd = (event: AnimationEvent) => {
      if (event.animationName === "hero-bg-scale") {
        finish();
      }
    };

    const start = async () => {
      await waitForPreloaderGate();
      if (cancelled || finishedRef.current) return;

      // Arm only when nothing has set ready yet (e.g. preloader skipped).
      // Do not call guard when intro-ready is already set — that path settles
      // the intro and would kill the CSS sequence mid-flight.
      const html = document.documentElement;
      if (
        !html.hasAttribute("data-intro-ready") &&
        !html.hasAttribute("data-intro-played")
      ) {
        guardHeroIntroReplay();
      }

      if (
        skipIntro ||
        hasIntroPlayed() ||
        html.hasAttribute("data-intro-played")
      ) {
        finish();
        return;
      }

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (prefersReducedMotion) {
        finish();
        return;
      }

      root = rootRef.current;
      if (!root) return;

      root.addEventListener("animationend", onAnimationEnd);
    };

    void start();

    return () => {
      cancelled = true;
      root?.removeEventListener("animationend", onAnimationEnd);
    };
  }, [skipIntro, introComplete]);

  return (
    <div ref={rootRef} data-hero-intro className="contents">
      {children}
    </div>
  );
}
