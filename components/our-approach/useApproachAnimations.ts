"use client";

import type { RefObject } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { createAppearAnimation } from "@/lib/scroll/createAppearAnimation";
import { scheduleScrollRefresh } from "@/lib/scroll/scrollOrchestrator";

type UseApproachAnimationsProps = {
  sectionRef: RefObject<HTMLElement | null>;
};

export function useApproachAnimations({
  sectionRef,
}: UseApproachAnimationsProps) {
  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      const headline = section.querySelector<HTMLElement>(".approach-headline");
      const cta = section.querySelector<HTMLElement>(".approach-cta");
      const accordion = section.querySelector<HTMLElement>(".approach-accordion");

      if (reducedMotion) {
        gsap.set([headline, cta, accordion].filter(Boolean), {
          opacity: 1,
          y: 0,
        });
        return;
      }

      if (headline) {
        createAppearAnimation(headline, { trigger: section });
      }

      if (accordion) {
        createAppearAnimation(accordion, { trigger: section, delay: 0.1 });
      }

      if (cta) {
        createAppearAnimation(cta, { trigger: section, delay: 0.25 });
      }

      scheduleScrollRefresh();
    },
    { scope: sectionRef },
  );
}
