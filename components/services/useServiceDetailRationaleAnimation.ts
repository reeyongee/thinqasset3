"use client";

import type { RefObject } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTransitionAnimation } from "@/components/transition/TransitionAnimationContext";
import { scheduleScrollRefresh } from "@/lib/scroll/scrollOrchestrator";

gsap.registerPlugin(ScrollTrigger);

const SCROLL_START = "top 88%";

type UseServiceDetailRationaleAnimationProps = {
  sectionRef: RefObject<HTMLElement | null>;
};

export function useServiceDetailRationaleAnimation({
  sectionRef,
}: UseServiceDetailRationaleAnimationProps) {
  const { isNavigating } = useTransitionAnimation();

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section || isNavigating) return;

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      const textCol = section.querySelector<HTMLElement>(".sd-rationale-text");
      const imageWrap = section.querySelector<HTMLElement>(".sd-rationale-image");
      const headline = section.querySelector<HTMLElement>(
        ".sd-rationale-headline",
      );
      const desc = section.querySelector<HTMLElement>(".sd-rationale-desc");
      const cta = section.querySelector<HTMLElement>(".sd-rationale-cta");

      if (reduceMotion) {
        gsap.set([headline, desc, cta, imageWrap].filter(Boolean), {
          clearProps: "all",
          autoAlpha: 1,
        });
        return;
      }

      if (textCol) {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: textCol, start: SCROLL_START },
        });

        if (headline) {
          tl.from(headline, {
            y: 30,
            autoAlpha: 0,
            duration: 0.8,
            ease: "power3.out",
            clearProps: "transform",
          });
        }

        if (desc) {
          tl.from(
            desc,
            {
              y: 20,
              autoAlpha: 0,
              duration: 0.6,
              ease: "power2.out",
              clearProps: "transform",
            },
            "-=0.4",
          );
        }

        if (cta) {
          tl.from(
            cta,
            {
              y: 16,
              autoAlpha: 0,
              duration: 0.5,
              ease: "power2.out",
              clearProps: "transform",
            },
            "-=0.3",
          );
        }
      }

      if (imageWrap) {
        gsap.fromTo(
          imageWrap,
          { clipPath: "inset(0 0 100% 0 round 24px)" },
          {
            clipPath: "inset(0 0 0% 0 round 24px)",
            duration: 0.9,
            ease: "power3.inOut",
            scrollTrigger: { trigger: imageWrap, start: SCROLL_START },
            onComplete: () => {
              gsap.set(imageWrap, { clearProps: "clipPath" });
            },
          },
        );
      }

      scheduleScrollRefresh();
    },
    { scope: sectionRef, dependencies: [isNavigating] },
  );
}
