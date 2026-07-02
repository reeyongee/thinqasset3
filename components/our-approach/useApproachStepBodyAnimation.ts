"use client";

import type { RefObject } from "react";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const APPEAR_EASE = "cubic-bezier(0.12, 0.23, 0.17, 0.99)";

type UseApproachStepBodyAnimationProps = {
  bodyRef: RefObject<HTMLDivElement | null>;
  imageRef: RefObject<HTMLDivElement | null>;
  isOpen: boolean;
  isDefaultOpen: boolean;
};

export function useApproachStepBodyAnimation({
  bodyRef,
  imageRef,
  isOpen,
  isDefaultOpen,
}: UseApproachStepBodyAnimationProps) {
  const wasOpen = useRef(isDefaultOpen);
  const skipInitialReveal = useRef(isDefaultOpen);

  useGSAP(
    () => {
      const body = bodyRef.current;
      const image = imageRef.current;

      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (!isOpen) {
        wasOpen.current = false;
        if (image) {
          gsap.set(image, { opacity: 0 });
        }
        return;
      }

      if (!body || !image) return;

      if (reducedMotion) {
        gsap.set([body, image], { opacity: 1, y: 0 });
        wasOpen.current = true;
        return;
      }

      if (skipInitialReveal.current) {
        skipInitialReveal.current = false;
        gsap.set(body, { opacity: 1, y: 0 });
        gsap.set(image, { opacity: 1 });
        wasOpen.current = true;
        return;
      }

      if (!wasOpen.current) {
        gsap.fromTo(
          body,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: 0.2,
            ease: APPEAR_EASE,
          },
        );

        gsap.fromTo(
          image,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.65,
            ease: "power2.out",
          },
        );
      }

      wasOpen.current = true;
    },
    { scope: bodyRef, dependencies: [isOpen, isDefaultOpen] },
  );
}
