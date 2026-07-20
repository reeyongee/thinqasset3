"use client";

import type { RefObject } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTransitionAnimation } from "@/components/transition/TransitionAnimationContext";
import { scheduleScrollRefresh } from "@/lib/scroll/scrollOrchestrator";

gsap.registerPlugin(ScrollTrigger);

const SCROLL_START = "top 88%";

type UseServiceDetailRelatedAnimationProps = {
  sectionRef: RefObject<HTMLElement | null>;
};

export function useServiceDetailRelatedAnimation({
  sectionRef,
}: UseServiceDetailRelatedAnimationProps) {
  const { isNavigating } = useTransitionAnimation();

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section || isNavigating) return;

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      const headline = section.querySelector<HTMLElement>(
        ".sd-related-headline",
      );
      const link = section.querySelector<HTMLElement>(".sd-related-link");
      const grid = section.querySelector<HTMLElement>(".sd-related-grid");

      if (reduceMotion) {
        gsap.set([headline, link, grid].filter(Boolean), {
          clearProps: "all",
          autoAlpha: 1,
        });
        return;
      }

      if (headline) {
        gsap.from(headline, {
          y: 30,
          autoAlpha: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: headline, start: SCROLL_START },
          clearProps: "transform",
        });
      }

      if (link) {
        gsap.from(link, {
          y: 20,
          autoAlpha: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: { trigger: link, start: SCROLL_START },
          clearProps: "transform",
        });
      }

      if (grid) {
        gsap.from(grid, {
          y: 30,
          autoAlpha: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: { trigger: grid, start: SCROLL_START },
          clearProps: "transform",
        });
      }

      scheduleScrollRefresh();
    },
    { scope: sectionRef, dependencies: [isNavigating] },
  );
}
