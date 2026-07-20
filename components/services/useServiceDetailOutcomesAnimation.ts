"use client";

import type { RefObject } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTransitionAnimation } from "@/components/transition/TransitionAnimationContext";
import { scheduleScrollRefresh } from "@/lib/scroll/scrollOrchestrator";

gsap.registerPlugin(ScrollTrigger);

const SCROLL_START = "top 88%";

type UseServiceDetailOutcomesAnimationProps = {
  sectionRef: RefObject<HTMLElement | null>;
};

export function useServiceDetailOutcomesAnimation({
  sectionRef,
}: UseServiceDetailOutcomesAnimationProps) {
  const { isNavigating } = useTransitionAnimation();

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section || isNavigating) return;

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      const textCol = section.querySelector<HTMLElement>(".sd-outcomes-text");
      const imageWrap = section.querySelector<HTMLElement>(".sd-outcomes-image");
      const headline = section.querySelector<HTMLElement>(
        ".sd-outcomes-headline",
      );
      const desc = section.querySelector<HTMLElement>(".sd-outcomes-desc");
      const benefits = section.querySelectorAll<HTMLElement>(".sd-benefit");

      if (reduceMotion) {
        gsap.set([headline, desc, imageWrap, ...benefits].filter(Boolean), {
          clearProps: "all",
          autoAlpha: 1,
        });
        benefits.forEach((item) => {
          const border = item.querySelector<HTMLElement>(".sd-benefit-border");
          const icon = item.querySelector<HTMLElement>(".sd-benefit-icon");
          const text = item.querySelector<HTMLElement>(".sd-benefit-text");
          gsap.set([border, icon, text].filter(Boolean), {
            clearProps: "all",
            autoAlpha: 1,
            scale: 1,
            scaleX: 1,
            x: 0,
          });
        });
        return;
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
      }

      benefits.forEach((item) => {
        const border = item.querySelector<HTMLElement>(
          ".sd-benefit-border.absolute.top-0",
        );
        const icon = item.querySelector<HTMLElement>(".sd-benefit-icon");
        const text = item.querySelector<HTMLElement>(".sd-benefit-text");

        const tl = gsap.timeline({
          scrollTrigger: { trigger: item, start: SCROLL_START },
        });

        if (border) {
          tl.fromTo(
            border,
            { scaleX: 0, transformOrigin: "left center" },
            { scaleX: 1, duration: 0.4, ease: "power2.inOut" },
          );
        }

        if (icon) {
          tl.from(
            icon,
            {
              scale: 0,
              autoAlpha: 0,
              duration: 0.4,
              ease: "back.out(1.7)",
              clearProps: "transform",
            },
            "-=0.15",
          );
        }

        if (text) {
          tl.from(
            text,
            {
              x: -12,
              autoAlpha: 0,
              duration: 0.5,
              ease: "power2.out",
              clearProps: "transform",
            },
            "-=0.25",
          );
        }
      });

      scheduleScrollRefresh();
    },
    { scope: sectionRef, dependencies: [isNavigating] },
  );
}
