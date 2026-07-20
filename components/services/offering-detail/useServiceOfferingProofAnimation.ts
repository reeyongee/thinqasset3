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

export function useServiceOfferingProofAnimation({ sectionRef }: Props) {
  const { isNavigating } = useTransitionAnimation();

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section || isNavigating) return;

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (reduceMotion) return;

      const panel = section.querySelector<HTMLElement>(".od-proof__panel");
      const headline = section.querySelector<HTMLElement>(".od-proof__headline");
      const items = gsap.utils.toArray<HTMLElement>(".od-proof__item");

      if (panel) {
        createAppearAnimation(panel, {
          from: { opacity: 0, y: 36 },
          duration: 0.85,
        });
      }
      if (headline) {
        createAppearAnimation(headline, {
          from: { opacity: 0, y: 20 },
          delay: 0.1,
        });
      }

      items.forEach((item, i) => {
        createScrollReveal(item, {
          trigger: item,
          from: { opacity: 0, x: -16 },
          to: { opacity: 1, x: 0 },
          duration: 0.55,
          delay: i * 0.06,
          start: "top 88%",
        });
      });
    },
    { scope: sectionRef, dependencies: [isNavigating] },
  );
}
