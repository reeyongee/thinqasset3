"use client";

import type { RefObject } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useTransitionAnimation } from "@/components/transition/TransitionAnimationContext";

type UseServiceDetailLandingAnimationProps = {
  sectionRef: RefObject<HTMLElement | null>;
};

export function useServiceDetailLandingAnimation({
  sectionRef,
}: UseServiceDetailLandingAnimationProps) {
  const { isNavigating } = useTransitionAnimation();

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section || isNavigating) return;

      const headline = section.querySelector<HTMLElement>(".sd-headline");
      const description = section.querySelector<HTMLElement>(".sd-description");
      const breadcrumb = section.querySelector<HTMLElement>(".sd-breadcrumb");
      const hero = section.querySelector<HTMLElement>(".sd-hero-image");

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (reduceMotion) {
        gsap.set([breadcrumb, headline, description, hero].filter(Boolean), {
          clearProps: "all",
        });
        return;
      }

      if (breadcrumb) {
        gsap.from(breadcrumb, {
          y: 12,
          autoAlpha: 0,
          duration: 0.5,
          ease: "power2.out",
          delay: 0.05,
          clearProps: "transform",
        });
      }

      if (headline) {
        gsap.from(headline, {
          y: 40,
          autoAlpha: 0,
          duration: 0.9,
          ease: "power3.out",
          delay: 0.1,
          clearProps: "transform",
        });
      }

      if (description) {
        gsap.from(description, {
          y: 24,
          autoAlpha: 0,
          duration: 0.7,
          ease: "power2.out",
          delay: 0.25,
          clearProps: "transform",
        });
      }

      if (hero) {
        gsap.fromTo(
          hero,
          { clipPath: "inset(0 0 100% 0 round 24px)" },
          {
            clipPath: "inset(0 0 0% 0 round 24px)",
            duration: 1,
            ease: "power3.inOut",
            delay: 0.35,
            onComplete: () => {
              gsap.set(hero, { clearProps: "clipPath" });
            },
          },
        );
      }
    },
    { scope: sectionRef, dependencies: [isNavigating] },
  );
}
