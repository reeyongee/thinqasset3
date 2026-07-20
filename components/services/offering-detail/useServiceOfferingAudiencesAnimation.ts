"use client";

import type { RefObject } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import {
  createAppearAnimation,
  createScrollReveal,
} from "@/lib/scroll/createAppearAnimation";
import { useTransitionAnimation } from "@/components/transition/TransitionAnimationContext";

type Props = { sectionRef: RefObject<HTMLElement | null> };

export function useServiceOfferingAudiencesAnimation({ sectionRef }: Props) {
  const { isNavigating } = useTransitionAnimation();

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section || isNavigating) return;

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (reduceMotion) return;

      const label = section.querySelector<HTMLElement>(".od-audiences__label");
      const items = gsap.utils.toArray<HTMLElement>(".od-audiences__item");

      if (label) {
        createAppearAnimation(label, { from: { opacity: 0, y: 16 } });
      }

      items.forEach((item, i) => {
        createScrollReveal(item, {
          trigger: section,
          from: { opacity: 0, y: 22 },
          to: { opacity: 1, y: 0 },
          duration: 0.6,
          delay: 0.06 + i * 0.05,
          start: "top 75%",
        });
      });
    },
    { scope: sectionRef, dependencies: [isNavigating] },
  );
}
