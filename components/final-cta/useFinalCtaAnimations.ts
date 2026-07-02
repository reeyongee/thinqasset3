"use client";

import type { RefObject } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { CTA_ROTATION_DURATION_S } from "./constants";

type UseFinalCtaAnimationsProps = {
  sectionRef: RefObject<HTMLElement | null>;
  rotatorRef: RefObject<HTMLDivElement | null>;
};

export function useFinalCtaAnimations({
  sectionRef,
  rotatorRef,
}: UseFinalCtaAnimationsProps) {
  useGSAP(
    () => {
      const rotator = rotatorRef.current;
      if (!rotator) return;

      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (reducedMotion) {
        gsap.set(rotator, { rotation: 0, transformOrigin: "50% 50%" });
        return;
      }

      gsap.set(rotator, {
        rotation: 0,
        transformOrigin: "50% 50%",
      });

      gsap.to(rotator, {
        rotation: "+=360",
        duration: CTA_ROTATION_DURATION_S,
        ease: "none",
        repeat: -1,
      });
    },
    { scope: sectionRef, dependencies: [] },
  );
}
