"use client";

import type { RefObject } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  createAppearAnimation,
  createScrollReveal,
} from "@/lib/scroll/createAppearAnimation";
import { useTransitionAnimation } from "@/components/transition/TransitionAnimationContext";

gsap.registerPlugin(ScrollTrigger);

type Props = { sectionRef: RefObject<HTMLElement | null> };

export function useServiceOfferingStackAnimation({ sectionRef }: Props) {
  const { isNavigating } = useTransitionAnimation();

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section || isNavigating) return;

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (reduceMotion) return;

      const headline = section.querySelector<HTMLElement>(".od-stack__headline");
      const image = section.querySelector<HTMLElement>(".od-stack__image");
      const items = gsap.utils.toArray<HTMLElement>(".od-stack__item");

      if (headline) {
        createAppearAnimation(headline, {
          from: { opacity: 0, y: 28 },
          duration: 0.75,
        });
      }
      if (image) {
        createAppearAnimation(image, {
          from: { opacity: 0, y: 36 },
          to: { opacity: 1, y: 0 },
          duration: 0.9,
          delay: 0.1,
        });
      }

      items.forEach((item, i) => {
        createScrollReveal(item, {
          trigger: item,
          from: { opacity: 0, y: 32 },
          to: { opacity: 1, y: 0 },
          duration: 0.7,
          delay: Math.min(i * 0.04, 0.2),
          start: "top 82%",
        });
      });
    },
    { scope: sectionRef, dependencies: [isNavigating] },
  );
}
