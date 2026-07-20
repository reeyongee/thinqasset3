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

export function useServiceOfferingJourneyAnimation({ sectionRef }: Props) {
  const { isNavigating } = useTransitionAnimation();

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section || isNavigating) return;

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (reduceMotion) return;

      const label = section.querySelector<HTMLElement>(".od-journey__label");
      const headline = section.querySelector<HTMLElement>(
        ".od-journey__headline",
      );
      const progress = section.querySelector<HTMLElement>(
        ".od-journey__progress",
      );
      const steps = gsap.utils.toArray<HTMLElement>(".od-journey__step");

      if (label) {
        createAppearAnimation(label, { from: { opacity: 0, y: 14 } });
      }
      if (headline) {
        createAppearAnimation(headline, {
          from: { opacity: 0, y: 28 },
          delay: 0.06,
        });
      }

      if (progress) {
        gsap.set(progress, { scaleX: 0, transformOrigin: "left center" });
        ScrollTrigger.create({
          trigger: section,
          start: "top 70%",
          end: "bottom 55%",
          scrub: 0.6,
          onUpdate: (self) => {
            gsap.set(progress, { scaleX: self.progress });
          },
        });
      }

      steps.forEach((step) => {
        createScrollReveal(step, {
          trigger: step,
          from: { opacity: 0, y: 40 },
          to: { opacity: 1, y: 0 },
          duration: 0.75,
          start: "top 85%",
        });
      });
    },
    { scope: sectionRef, dependencies: [isNavigating] },
  );
}
