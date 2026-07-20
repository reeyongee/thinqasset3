"use client";

import type { RefObject } from "react";
import { useGSAP } from "@gsap/react";
import {
  createAppearAnimation,
  createScrollReveal,
} from "@/lib/scroll/createAppearAnimation";
import { useTransitionAnimation } from "@/components/transition/TransitionAnimationContext";

type Props = { sectionRef: RefObject<HTMLElement | null> };

export function useServiceOfferingPagerAnimation({ sectionRef }: Props) {
  const { isNavigating } = useTransitionAnimation();

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section || isNavigating) return;

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (reduceMotion) return;

      const progress = section.querySelector<HTMLElement>(".od-pager__progress");
      const links = Array.from(
        section.querySelectorAll<HTMLElement>(".od-pager__link"),
      );

      if (progress) {
        createAppearAnimation(progress, { from: { opacity: 0, y: 16 } });
      }

      links.forEach((link, i) => {
        createScrollReveal(link, {
          trigger: section,
          from: { opacity: 0, y: 28 },
          to: { opacity: 1, y: 0 },
          duration: 0.7,
          delay: 0.08 + i * 0.08,
          start: "top 85%",
        });
      });
    },
    { scope: sectionRef, dependencies: [isNavigating] },
  );
}
