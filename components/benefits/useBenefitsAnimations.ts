"use client";

import type { RefObject } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import {
  APPEAR_EASE,
  createAppearAnimation,
  createScrollReveal,
} from "@/lib/scroll/createAppearAnimation";
import { scheduleScrollRefresh } from "@/lib/scroll/scrollOrchestrator";
import { BENEFIT_ROWS } from "./constants";

const CARD_EASE = "cubic-bezier(0.93, 0, 0.11, 1)";

type UseBenefitsAnimationsProps = {
  sectionRef: RefObject<HTMLElement | null>;
};

export function useBenefitsAnimations({
  sectionRef,
}: UseBenefitsAnimationsProps) {
  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      const headline = section.querySelector<HTMLElement>(".benefits-headline");
      const cta = section.querySelector<HTMLElement>(".benefits-cta");
      const rows = section.querySelectorAll<HTMLElement>(".benefits-row");
      const cards = section.querySelectorAll<HTMLElement>(".benefit-card");

      if (reducedMotion) {
        gsap.set([headline, cta, ...cards], { opacity: 1, x: 0, y: 0 });
        return;
      }

      if (headline) {
        createAppearAnimation(headline, { trigger: section });
      }

      if (cta) {
        createAppearAnimation(cta, { trigger: section, delay: 0.25 });
      }

      rows.forEach((row, rowIndex) => {
        const rowCards = row.querySelectorAll<HTMLElement>(".benefit-card");
        const rowData = BENEFIT_ROWS[rowIndex] ?? [];

        rowCards.forEach((card, cardIndex) => {
          const enterX = rowData[cardIndex]?.enterX ?? 0;
          createScrollReveal(card, {
            trigger: row,
            from: { opacity: 0, x: enterX },
            to: { opacity: 1, x: 0 },
            ease: CARD_EASE,
          });
        });
      });

      scheduleScrollRefresh();
    },
    { scope: sectionRef },
  );
}
