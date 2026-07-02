"use client";

import type { RefObject } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { createAppearAnimation } from "@/lib/scroll/createAppearAnimation";
import { scheduleScrollRefresh } from "@/lib/scroll/scrollOrchestrator";

type UseGlobeAnimationsProps = {
  sectionRef: RefObject<HTMLElement | null>;
};

export function useGlobeAnimations({ sectionRef }: UseGlobeAnimationsProps) {
  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      const headline = section.querySelector<HTMLElement>(".globe-headline");
      const panel = section.querySelector<HTMLElement>(".globe-panel");

      if (reducedMotion) {
        gsap.set([headline, panel].filter(Boolean), { opacity: 1, y: 0 });
        return;
      }

      if (headline) {
        createAppearAnimation(headline, { trigger: section });
      }

      if (panel) {
        createAppearAnimation(panel, {
          trigger: section,
          from: { opacity: 0, y: 48 },
          delay: 0.1,
        });
      }

      scheduleScrollRefresh();
    },
    { scope: sectionRef },
  );
}
