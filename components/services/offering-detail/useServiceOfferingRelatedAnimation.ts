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

export function useServiceOfferingRelatedAnimation({ sectionRef }: Props) {
  const { isNavigating } = useTransitionAnimation();

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section || isNavigating) return;

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (reduceMotion) return;

      const header = section.querySelector<HTMLElement>(".od-related__header");
      const cards = gsap.utils.toArray<HTMLElement>(".od-related__card");

      if (header) {
        createAppearAnimation(header, { from: { opacity: 0, y: 24 } });
      }

      cards.forEach((card, i) => {
        createScrollReveal(card, {
          trigger: card,
          from: { opacity: 0, y: 40 },
          to: { opacity: 1, y: 0 },
          duration: 0.75,
          delay: i * 0.08,
          start: "top 88%",
        });
      });
    },
    { scope: sectionRef, dependencies: [isNavigating] },
  );
}
