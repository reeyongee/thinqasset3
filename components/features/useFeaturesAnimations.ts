"use client";

import type { RefObject } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { scheduleScrollRefresh } from "@/lib/scroll/scrollOrchestrator";
import { FLIP_EASE } from "./constants";
import {
  GAUGE_ARC_LENGTH,
  GAUGE_CX,
  GAUGE_CY,
  gaugeNeedleRotation,
} from "./featureVisualUtils";

gsap.registerPlugin(ScrollTrigger);

const CARD_EASE = "cubic-bezier(0.12, 0.23, 0.17, 0.99)";
const VISUAL_EASE = "cubic-bezier(0.12, 0.23, 0.21, 0.99)";
const CARD_ENTER_Y = 28;
const CARD_STAGGER = 0.1;
const FLIP_DURATION = 0.9;
const FLIP_AT = 0.55;

type UseFeaturesAnimationsProps = {
  sectionRef: RefObject<HTMLElement | null>;
  enabled?: boolean;
};

function activateVisuals(wrapper: HTMLElement) {
  wrapper
    .querySelector<HTMLElement>(".feature-card-visual")
    ?.classList.add("feature-visuals-active");
}

function applyGauge(
  fill: SVGPathElement,
  needle: SVGGElement,
  percent: number,
  arcLength: number,
) {
  const clamped = Math.max(0, Math.min(100, percent));
  fill.setAttribute("stroke-dasharray", String(arcLength));
  fill.setAttribute(
    "stroke-dashoffset",
    String(arcLength * (1 - clamped / 100)),
  );
  needle.setAttribute(
    "transform",
    `rotate(${gaugeNeedleRotation(clamped)}, ${GAUGE_CX}, ${GAUGE_CY})`,
  );
}

function startExposureGauge(wrapper: HTMLElement) {
  const fill = wrapper.querySelector<SVGPathElement>(".feature-gauge-fill");
  const needle = wrapper.querySelector<SVGGElement>(".feature-gauge-needle");
  if (!fill || !needle) return;

  activateVisuals(wrapper);

  const arcLength = fill.getTotalLength() || GAUGE_ARC_LENGTH;
  const gauge = { value: 0 };
  applyGauge(fill, needle, 0, arcLength);

  const gaugeTl = gsap.timeline();
  gaugeTl.to(gauge, {
    value: 25,
    duration: 0.8,
    ease: VISUAL_EASE,
    onUpdate: () => applyGauge(fill, needle, gauge.value, arcLength),
  });
  gaugeTl.to(gauge, {
    value: 75,
    duration: 1,
    ease: VISUAL_EASE,
    delay: 0.28,
    onUpdate: () => applyGauge(fill, needle, gauge.value, arcLength),
  });
}

function startVisuals(wrapper: HTMLElement, index: number) {
  if (index === 2) {
    startExposureGauge(wrapper);
    return;
  }
  activateVisuals(wrapper);
}

function setFinalVisualState(wrapper: HTMLElement, index: number) {
  activateVisuals(wrapper);

  if (index !== 2) return;

  const fill = wrapper.querySelector<SVGPathElement>(".feature-gauge-fill");
  const needle = wrapper.querySelector<SVGGElement>(".feature-gauge-needle");
  if (fill && needle) {
    applyGauge(fill, needle, 75, fill.getTotalLength() || GAUGE_ARC_LENGTH);
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
      const cardWrappers = gsap.utils.toArray<HTMLElement>(
        ".feature-card-wrapper",
        section,
      );

      if (!cardsEl) return;

      if (reducedMotion) {
        gsap.set(headline, { opacity: 1, y: 0 });
        cardWrappers.forEach((wrapper, index) => {
          const inner =
            wrapper.querySelector<HTMLElement>(".feature-flip-inner");
          gsap.set(wrapper, { opacity: 1, y: 0 });
          if (inner) gsap.set(inner, { rotateY: 180, force3D: false });
          setFinalVisualState(wrapper, index);
        });
        return;
      }

      gsap.set(headline, { opacity: 0, y: 32 });

      cardWrappers.forEach((wrapper) => {
        const inner = wrapper.querySelector<HTMLElement>(".feature-flip-inner");
        gsap.set(wrapper, { y: CARD_ENTER_Y, opacity: 1 });
        if (inner) {
          gsap.set(inner, {
            rotateY: 0,
            transformOrigin: "50% 50%",
            force3D: false,
          });
        }
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: cardsEl,
          start: "top 80%",
          once: true,
        },
      });

      scheduleScrollRefresh();

      if (headline) {
        tl.fromTo(
          headline,
          { opacity: 0, y: 32 },
          { opacity: 1, y: 0, duration: 0.85, ease: CARD_EASE },
          0,
        );
      }

      cardWrappers.forEach((wrapper, index) => {
        const inner = wrapper.querySelector<HTMLElement>(".feature-flip-inner");
        const enterAt = index * CARD_STAGGER;
        const flipAt = FLIP_AT + index * CARD_STAGGER;

        tl.to(wrapper, { y: 0, duration: 0.85, ease: CARD_EASE }, enterAt);

        if (inner) {
          tl.to(
            inner,
            {
              rotateY: 180,
              duration: FLIP_DURATION,
              ease: FLIP_EASE,
              force3D: false,
            },
            flipAt,
          );
        }

        tl.call(
          () => startVisuals(wrapper, index),
          undefined,
          flipAt + FLIP_DURATION,
        );
      });
    },
    { scope: sectionRef, dependencies: [enabled] },
  );
}
