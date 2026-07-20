"use client";

import type { RefObject } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { createAppearAnimation } from "@/lib/scroll/createAppearAnimation";
import { useTransitionAnimation } from "@/components/transition/TransitionAnimationContext";

gsap.registerPlugin(ScrollTrigger);

type Props = { sectionRef: RefObject<HTMLElement | null> };

export function useServiceOfferingManifestAnimation({ sectionRef }: Props) {
  const { isNavigating } = useTransitionAnimation();

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section || isNavigating) return;

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (reduceMotion) return;

      const label = section.querySelector<HTMLElement>(".od-manifest__label");
      const statement = section.querySelector<HTMLElement>(
        ".od-manifest__statement",
      );
      const paras = gsap.utils.toArray<HTMLElement>(".od-manifest__para");

      if (label) {
        createAppearAnimation(label, {
          from: { opacity: 0, y: 16 },
          duration: 0.55,
        });
      }
      if (statement) {
        createAppearAnimation(statement, {
          from: { opacity: 0, y: 48 },
          duration: 1,
          delay: 0.08,
        });
      }
      paras.forEach((para, i) => {
        createAppearAnimation(para, {
          from: { opacity: 0, y: 28 },
          duration: 0.7,
          delay: 0.12 + i * 0.1,
        });
      });
    },
    { scope: sectionRef, dependencies: [isNavigating] },
  );
}
