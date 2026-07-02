"use client";

import type { RefObject } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { scheduleScrollRefresh } from "@/lib/scroll/scrollOrchestrator";

gsap.registerPlugin(ScrollTrigger);

const APPEAR_EASE = "power2.out";
const COUNTER_EASE = "power1.inOut";

type UseNumbersAnimationsProps = {
  sectionRef: RefObject<HTMLElement | null>;
};

function formatStatValue(
  value: number,
  prefix: string,
  suffix: string,
): string {
  const rounded = Math.round(value);
  if (prefix === "$") {
    return `$${rounded}${suffix}`;
  }
  if (suffix === "%") {
    return `${rounded}%`;
  }
  return `${rounded}${suffix}`;
}

export function useNumbersAnimations({ sectionRef }: UseNumbersAnimationsProps) {
  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      const headline = section.querySelector(".numbers-headline");
      const trustItems = section.querySelectorAll<HTMLElement>(
        ".numbers-trust-item",
      );
      const statCards = section.querySelectorAll<HTMLElement>(
        ".numbers-stat-card",
      );

      if (reducedMotion) {
        gsap.set([headline, ...trustItems, ...statCards], {
          opacity: 1,
          y: 0,
        });
        statCards.forEach((card) => {
          const end = Number(card.dataset.statEnd ?? 0);
          const prefix = card.dataset.statPrefix ?? "";
          const suffix = card.dataset.statSuffix ?? "";
          const counter = card.querySelector<HTMLElement>(
            ".numbers-counter-value",
          );
          if (counter) {
            counter.textContent = formatStatValue(end, prefix, suffix);
          }
        });
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          once: true,
        },
      });

      if (headline) {
        tl.fromTo(
          headline,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 1, ease: APPEAR_EASE },
          0.2,
        );
      }

      trustItems.forEach((item, index) => {
        tl.fromTo(
          item,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 1.5, ease: APPEAR_EASE },
          0.2 + index * 0.2,
        );
      });

      statCards.forEach((card, index) => {
        tl.fromTo(
          card,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.8, ease: APPEAR_EASE },
          0.2 + index * 0.2,
        );

        const end = Number(card.dataset.statEnd ?? 0);
        const prefix = card.dataset.statPrefix ?? "";
        const suffix = card.dataset.statSuffix ?? "";
        const counter = card.querySelector<HTMLElement>(
          ".numbers-counter-value",
        );
        if (!counter) return;

        const state = { value: 0 };
        tl.to(
          state,
          {
            value: end,
            duration: 2,
            ease: COUNTER_EASE,
            onUpdate: () => {
              counter.textContent = formatStatValue(state.value, prefix, suffix);
            },
          },
          0.2 + index * 0.2,
        );
      });

      scheduleScrollRefresh();
    },
    { scope: sectionRef },
  );
}
