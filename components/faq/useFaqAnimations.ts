"use client";

import type { RefObject } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { createAppearAnimation } from "@/lib/scroll/createAppearAnimation";
import { scheduleScrollRefresh } from "@/lib/scroll/scrollOrchestrator";

type UseFaqAnimationsProps = {
  sectionRef: RefObject<HTMLElement | null>;
};

export function useFaqAnimations({ sectionRef }: UseFaqAnimationsProps) {
  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      const headline = section.querySelector<HTMLElement>(".faq-headline");
      const items = section.querySelectorAll<HTMLElement>(".faq-item-reveal");

      if (reducedMotion) {
        gsap.set([headline, ...items], { opacity: 1, y: 0 });
        return;
      }

      if (headline) {
        createAppearAnimation(headline, {
          trigger: section,
          start: "top 85%",
          delay: 0,
        });
      }

      items.forEach((item, index) => {
        createAppearAnimation(item, {
          trigger: section,
          start: "top 85%",
          delay: 0.08 * index,
          duration: 0.6,
        });
      });

      scheduleScrollRefresh();
    },
    { scope: sectionRef },
  );
}
