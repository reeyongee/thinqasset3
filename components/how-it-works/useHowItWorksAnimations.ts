"use client";

import type { RefObject } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { createAppearAnimation } from "@/lib/scroll/createAppearAnimation";
import { scheduleScrollRefresh } from "@/lib/scroll/scrollOrchestrator";

gsap.registerPlugin(ScrollTrigger);

type UseHowItWorksAnimationsProps = {
  sectionRef: RefObject<HTMLElement | null>;
};

export function useHowItWorksAnimations({
  sectionRef,
}: UseHowItWorksAnimationsProps) {
  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      const headline = section.querySelector<HTMLElement>(".hiw-headline");
      const card1 = section.querySelector<HTMLElement>(".hiw-step-card--scroll-1");
      const card2 = section.querySelector<HTMLElement>(".hiw-step-card--scroll-2");
      const card3 = section.querySelector<HTMLElement>('[data-step-index="2"]');

      if (reducedMotion) {
        if (headline) gsap.set(headline, { opacity: 1, y: 0 });
        if (card1) gsap.set(card1, { opacity: 1, scale: 1, y: 0 });
        if (card2) gsap.set(card2, { opacity: 1, scale: 1, y: 0 });
        return;
      }

      if (headline) {
        createAppearAnimation(headline, { start: "top 50%", delay: 0.15 });
      }

      if (card1 && card2) {
        gsap.fromTo(
          card1,
          { opacity: 1, scale: 1, y: 0 },
          {
            opacity: 0.5,
            scale: 0.96,
            y: -32,
            ease: "none",
            immediateRender: false,
            scrollTrigger: {
              trigger: card2,
              start: "top 50%",
              end: "top 25%",
              scrub: true,
            },
          },
        );
      }

      if (card2 && card3) {
        gsap.fromTo(
          card2,
          { opacity: 1, scale: 1, y: 0 },
          {
            opacity: 1,
            scale: 0.98,
            y: -16,
            ease: "none",
            immediateRender: false,
            scrollTrigger: {
              trigger: card3,
              start: "top 50%",
              end: "top 25%",
              scrub: true,
            },
          },
        );
      }

      scheduleScrollRefresh();
    },
    { scope: sectionRef },
  );
}
