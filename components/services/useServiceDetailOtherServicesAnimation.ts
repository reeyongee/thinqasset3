"use client";

import type { RefObject } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTransitionAnimation } from "@/components/transition/TransitionAnimationContext";
import { scheduleScrollRefresh } from "@/lib/scroll/scrollOrchestrator";

gsap.registerPlugin(ScrollTrigger);

const SCROLL_START = "top 88%";

type UseServiceDetailOtherServicesAnimationProps = {
  sectionRef: RefObject<HTMLElement | null>;
};

export function useServiceDetailOtherServicesAnimation({
  sectionRef,
}: UseServiceDetailOtherServicesAnimationProps) {
  const { isNavigating } = useTransitionAnimation();

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section || isNavigating) return;

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      const headline = section.querySelector<HTMLElement>(".sc-heading");
      const slides = section.querySelectorAll<HTMLElement>(".sc-slide");
      const nav = section.querySelector<HTMLElement>(".sc-nav");

      if (reduceMotion) {
        gsap.set([headline, ...slides, nav].filter(Boolean), {
          clearProps: "all",
          autoAlpha: 1,
        });
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: { trigger: section, start: SCROLL_START },
      });

      if (headline) {
        tl.from(
          headline,
          {
            y: 40,
            autoAlpha: 0,
            duration: 1,
            ease: "power3.out",
            clearProps: "transform",
          },
          0,
        );
      }

      if (slides.length > 0) {
        tl.from(
          slides,
          {
            x: 60,
            autoAlpha: 0,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.1,
            clearProps: "transform",
          },
          0.2,
        );
      }

      if (nav) {
        tl.from(
          nav,
          {
            y: 20,
            autoAlpha: 0,
            duration: 0.6,
            ease: "power2.out",
            clearProps: "transform",
          },
          0.5,
        );
      }

      scheduleScrollRefresh();
    },
    { scope: sectionRef, dependencies: [isNavigating] },
  );
}
