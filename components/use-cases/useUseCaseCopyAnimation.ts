"use client";

import type { RefObject } from "react";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const APPEAR_EASE = "cubic-bezier(0.12, 0.23, 0.17, 0.99)";

type UseUseCaseCopyAnimationProps = {
  copyRef: RefObject<HTMLDivElement | null>;
  useCaseId: string;
};

export function useUseCaseCopyAnimation({
  copyRef,
  useCaseId,
}: UseUseCaseCopyAnimationProps) {
  const isInitialMount = useRef(true);

  useGSAP(
    () => {
      const el = copyRef.current;
      if (!el) return;

      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (reducedMotion) {
        gsap.set(el, { opacity: 1, y: 0 });
        return;
      }

      if (isInitialMount.current) {
        isInitialMount.current = false;
        gsap.set(el, { opacity: 1, y: 0 });
        return;
      }

      gsap.fromTo(
        el,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.2,
          ease: APPEAR_EASE,
        },
      );
    },
    { scope: copyRef, dependencies: [useCaseId] },
  );
}
