"use client";

import type { RefObject } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { createAppearAnimation } from "@/lib/scroll/createAppearAnimation";
import { scheduleScrollRefresh } from "@/lib/scroll/scrollOrchestrator";

type UseUseCasesAnimationsProps = {
  sectionRef: RefObject<HTMLElement | null>;
};

export function useUseCasesAnimations({
  sectionRef,
}: UseUseCasesAnimationsProps) {
  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      const headline = section.querySelector<HTMLElement>(".use-cases-headline");
      const panel = section.querySelector<HTMLElement>(".use-cases-panel");
      const mobile = section.querySelector<HTMLElement>(".use-cases-mobile");

      if (reducedMotion) {
        gsap.set([headline, panel, mobile].filter(Boolean), {
          opacity: 1,
          y: 0,
        });
        return;
      }

      if (headline) {
        createAppearAnimation(headline, { trigger: section });
      }

      if (panel) {
        createAppearAnimation(panel, { trigger: section, delay: 0.1 });
      }

      if (mobile) {
        createAppearAnimation(mobile, { trigger: section, delay: 0.1 });
      }

      scheduleScrollRefresh();
    },
    { scope: sectionRef },
  );
}
