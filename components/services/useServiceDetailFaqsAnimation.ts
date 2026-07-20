"use client";

import type { RefObject } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTransitionAnimation } from "@/components/transition/TransitionAnimationContext";
import { createAppearAnimation } from "@/lib/scroll/createAppearAnimation";
import { scheduleScrollRefresh } from "@/lib/scroll/scrollOrchestrator";

gsap.registerPlugin(ScrollTrigger);

const SCROLL_START = "top 88%";

type UseServiceDetailFaqsAnimationProps = {
  sectionRef: RefObject<HTMLElement | null>;
};

export function useServiceDetailFaqsAnimation({
  sectionRef,
}: UseServiceDetailFaqsAnimationProps) {
  const { isNavigating } = useTransitionAnimation();

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section || isNavigating) return;

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      const headline = section.querySelector<HTMLElement>(
        ".sd-faqs-headline-sticky",
      );
      const items = section.querySelectorAll<HTMLElement>(
        ".sd-faqs-list .faq-item",
      );

      if (reduceMotion) {
        gsap.set([headline, ...items].filter(Boolean), {
          clearProps: "all",
          autoAlpha: 1,
        });
        return;
      }

      if (headline) {
        createAppearAnimation(headline, {
          trigger: section,
          start: "top 85%",
          delay: 0,
          from: { opacity: 0, y: 28 },
          to: { opacity: 1, y: 0 },
        });
      }

      items.forEach((item, index) => {
        createAppearAnimation(item, {
          trigger: section,
          start: "top 85%",
          delay: 0.08 * index,
          duration: 0.6,
          from: { opacity: 0, y: 24 },
          to: { opacity: 1, y: 0 },
        });
      });

      scheduleScrollRefresh();
    },
    { scope: sectionRef, dependencies: [isNavigating] },
  );
}
