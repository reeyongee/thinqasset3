"use client";

import type { RefObject } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { scheduleScrollRefresh } from "@/lib/scroll/scrollOrchestrator";
import { gaugeArcPath } from "./featureVisualUtils";

gsap.registerPlugin(ScrollTrigger);

const CARD_EASE = "cubic-bezier(0.12, 0.23, 0.17, 0.99)";
const FLIP_EASE = "cubic-bezier(0.55, 0, 0.21, 1)";
const VISUAL_EASE = "cubic-bezier(0.12, 0.23, 0.21, 0.99)";
const STAGGER_OFFSETS = [32, 64, 96];
const FLIP_AT = 0.8;
const VISUAL_START = FLIP_AT;

type UseFeaturesAnimationsProps = {
  sectionRef: RefObject<HTMLElement | null>;
  enabled?: boolean;
};

function activateVisuals(wrapper: HTMLElement) {
  const visual = wrapper.querySelector<HTMLElement>(".feature-card-visual");
  visual?.classList.add("feature-visuals-active");
}

function setupPortfolioVisual(tl: gsap.core.Timeline, wrapper: HTMLElement) {
  const pie = wrapper.querySelector<HTMLElement>(".feature-pie-spin");
  if (!pie) return;

  gsap.set(pie, { rotation: 0, transformOrigin: "50% 50%" });
  tl.to(
    pie,
    { rotation: 360, duration: 20, ease: "none", repeat: -1 },
    VISUAL_START,
  );
}

function setupOrionVisual(tl: gsap.core.Timeline, wrapper: HTMLElement) {
  tl.add(() => activateVisuals(wrapper), VISUAL_START);
}

function setupExposureVisual(tl: gsap.core.Timeline, wrapper: HTMLElement) {
  const fill = wrapper.querySelector<SVGPathElement>(".feature-gauge-fill");
  const needle = wrapper.querySelector<HTMLElement>(".feature-gauge-needle");
  if (!fill || !needle) return;

  const gauge = { value: 0 };

  gsap.set(needle, {
    rotation: -45,
    transformOrigin: "50% 50%",
  });
  fill.setAttribute("d", gaugeArcPath(0));

  tl.to(
    gauge,
    {
      value: 25,
      duration: 1,
      ease: VISUAL_EASE,
      onUpdate: () => {
        fill.setAttribute("d", gaugeArcPath(gauge.value));
      },
    },
    VISUAL_START,
  );

  tl.to(
    gauge,
    {
      value: 75,
      duration: 1,
      ease: VISUAL_EASE,
      onUpdate: () => {
        fill.setAttribute("d", gaugeArcPath(gauge.value));
      },
    },
    VISUAL_START + 2,
  );

  tl.to(
    needle,
    { rotation: 45, duration: 1, ease: VISUAL_EASE },
    VISUAL_START + 2,
  );
}

function setupVisualAnimation(
  tl: gsap.core.Timeline,
  wrapper: HTMLElement,
  index: number,
) {
  switch (index) {
    case 0:
      setupPortfolioVisual(tl, wrapper);
      tl.add(() => activateVisuals(wrapper), VISUAL_START);
      break;
    case 1:
      setupOrionVisual(tl, wrapper);
      break;
    case 2:
      setupExposureVisual(tl, wrapper);
      tl.add(() => activateVisuals(wrapper), VISUAL_START);
      break;
  }
}

function setFinalVisualState(wrapper: HTMLElement, index: number) {
  activateVisuals(wrapper);

  if (index === 0) {
    const pie = wrapper.querySelector<HTMLElement>(".feature-pie-spin");
    if (pie) gsap.set(pie, { rotation: 0 });
    return;
  }

  if (index === 2) {
    const fill = wrapper.querySelector<SVGPathElement>(".feature-gauge-fill");
    const needle = wrapper.querySelector<HTMLElement>(".feature-gauge-needle");
    fill?.setAttribute("d", gaugeArcPath(75));
    if (needle) gsap.set(needle, { rotation: 45 });
  }
}

export function useFeaturesAnimations({
  sectionRef,
  enabled = true,
}: UseFeaturesAnimationsProps) {
  useGSAP(
    () => {
      if (!enabled) return;

      const section = sectionRef.current;
      if (!section) return;

      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      const cardsEl = section.querySelector("#cards");
      const headline = section.querySelector(".features-headline");
      const cardWrappers = section.querySelectorAll<HTMLElement>(
        ".feature-card-wrapper",
      );

      if (!cardsEl) return;

      if (reducedMotion) {
        gsap.set(headline, { opacity: 1, y: 0 });
        cardWrappers.forEach((wrapper, index) => {
          gsap.set(wrapper, { opacity: 1, y: 0 });
          const back = wrapper.querySelector<HTMLElement>(".feature-flip-back");
          const front =
            wrapper.querySelector<HTMLElement>(".feature-flip-front");
          if (back) gsap.set(back, { rotateY: 180 });
          if (front) gsap.set(front, { rotateY: 0 });
          setFinalVisualState(wrapper, index);
        });
        return;
      }

      gsap.set(headline, { opacity: 0, y: 40 });

      cardWrappers.forEach((wrapper, index) => {
        const offset = STAGGER_OFFSETS[index] ?? 32;
        const back = wrapper.querySelector<HTMLElement>(".feature-flip-back");
        const front = wrapper.querySelector<HTMLElement>(".feature-flip-front");

        gsap.set(wrapper, { y: offset, opacity: 1 });
        if (back) gsap.set(back, { rotateY: 0, transformPerspective: 1000 });
        if (front) gsap.set(front, { rotateY: 180, transformPerspective: 1000 });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: cardsEl,
          start: "top 50%",
          once: true,
          invalidateOnRefresh: true,
        },
      });

      scheduleScrollRefresh();

      if (headline) {
        tl.fromTo(
          headline,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 1, ease: CARD_EASE },
          0.2,
        );
      }

      cardWrappers.forEach((wrapper, index) => {
        const back = wrapper.querySelector<HTMLElement>(".feature-flip-back");
        const front = wrapper.querySelector<HTMLElement>(".feature-flip-front");

        tl.to(wrapper, { y: 0, duration: 1, ease: CARD_EASE }, 0);

        if (back) {
          tl.to(back, { rotateY: 180, duration: 1, ease: FLIP_EASE }, FLIP_AT);
        }

        if (front) {
          tl.to(front, { rotateY: 0, duration: 1, ease: FLIP_EASE }, FLIP_AT);
        }

        setupVisualAnimation(tl, wrapper, index);
      });
    },
    { scope: sectionRef, dependencies: [enabled] },
  );
}
