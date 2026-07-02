"use client";

import type { RefObject } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { createAppearAnimation } from "@/lib/scroll/createAppearAnimation";
import { scheduleScrollRefresh } from "@/lib/scroll/scrollOrchestrator";

type UseTestimonialsAnimationsProps = {
  sectionRef: RefObject<HTMLElement | null>;
};

export function useTestimonialsAnimations({
  sectionRef,
}: UseTestimonialsAnimationsProps) {
  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      const headline = section.querySelector<HTMLElement>(
        ".testimonials-headline",
      );
      const cta = section.querySelector<HTMLElement>(".testimonials-cta");
      const panel = section.querySelector<HTMLElement>(".testimonials-panel");

      if (reducedMotion) {
        gsap.set([headline, cta, panel].filter(Boolean), {
          opacity: 1,
          y: 0,
        });
        return;
      }

      if (headline) {
        createAppearAnimation(headline, { trigger: section });
      }

      if (panel) {
        createAppearAnimation(panel, {
          trigger: section,
          from: { opacity: 0, y: 48 },
        });
      }

      if (cta) {
        createAppearAnimation(cta, { trigger: section, delay: 0.25 });
      }

      scheduleScrollRefresh();
    },
    { scope: sectionRef },
  );
}
