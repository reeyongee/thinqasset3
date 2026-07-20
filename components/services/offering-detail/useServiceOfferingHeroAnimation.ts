"use client";

import type { RefObject } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useTransitionAnimation } from "@/components/transition/TransitionAnimationContext";

type Props = { sectionRef: RefObject<HTMLElement | null> };

export function useServiceOfferingHeroAnimation({ sectionRef }: Props) {
  const { isNavigating } = useTransitionAnimation();

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section || isNavigating) return;

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      const breadcrumb = section.querySelector(".od-hero__breadcrumb");
      const pager = section.querySelector(".od-hero__pager");
      const index = section.querySelector(".od-hero__index");
      const kicker = section.querySelector(".od-hero__kicker");
      const title = section.querySelector(".od-hero__title");
      const lede = section.querySelector(".od-hero__lede");
      const media = section.querySelector(".od-hero__media");

      if (reduceMotion) {
        gsap.set(
          [breadcrumb, pager, index, kicker, title, lede, media].filter(Boolean),
          { clearProps: "all" },
        );
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      if (breadcrumb) {
        tl.from(breadcrumb, { y: 10, autoAlpha: 0, duration: 0.45 }, 0.05);
      }
      if (pager) {
        tl.from(pager, { y: 10, autoAlpha: 0, duration: 0.45 }, 0.08);
      }
      if (index) {
        tl.from(
          index,
          { y: 60, autoAlpha: 0, duration: 1, ease: "power4.out" },
          0.08,
        );
      }
      if (kicker) {
        tl.from(kicker, { y: 14, autoAlpha: 0, duration: 0.5 }, 0.18);
      }
      if (title) {
        tl.from(title, { y: 44, autoAlpha: 0, duration: 0.95 }, 0.22);
      }
      if (lede) {
        tl.from(lede, { y: 24, autoAlpha: 0, duration: 0.7 }, 0.38);
      }
      if (media) {
        tl.fromTo(
          media,
          { clipPath: "inset(12% 8% 12% 8% round 28px)" },
          {
            clipPath: "inset(0% 0% 0% 0% round 0px)",
            duration: 1.15,
            ease: "power3.inOut",
            onComplete: () => {
              gsap.set(media, { clearProps: "clipPath" });
            },
          },
          0.32,
        );
      }
    },
    { scope: sectionRef, dependencies: [isNavigating] },
  );
}
