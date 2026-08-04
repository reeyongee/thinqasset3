"use client";

import { RefObject, CSSProperties } from "react";
import {
  MotionValue,
  SpringOptions,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useIsPhoneViewport } from "@/hooks/useIsPhoneViewport";

export const SCENE_SPRING: SpringOptions = { stiffness: 120, damping: 26, mass: 0.5 };

type Target = RefObject<HTMLElement | null>;
type Offset = [string, string];

/** Raw section progress — the master timeline of any scene. */
export function useSectionProgress(target: Target, offset: Offset = ["start start", "end end"]) {
  const { scrollYProgress } = useScroll({
    target: target as RefObject<HTMLElement>,
    offset: offset as never,
  });
  return scrollYProgress;
}

/** Spring-wrapped section progress — scroll-linked, but eased like a physical camera. */
export function useSmoothProgress(
  target: Target,
  offset: Offset = ["start start", "end end"],
  spring: SpringOptions = SCENE_SPRING
) {
  return useSpring(useSectionProgress(target, offset), spring);
}

/** 0 when the user prefers reduced motion, 1 otherwise. Multiplied into amplitudes. */
export function useAmplitude() {
  return useReducedMotion() ? 0 : 1;
}

/** Symmetric parallax: [-distance, +distance] across a progress range. */
export function useParallax(progress: MotionValue<number>, distance: number) {
  const amp = useAmplitude();
  return useTransform(progress, [0, 1], [-distance * amp, distance * amp]);
}

/** Explicit parallax range. */
export function useParallaxRange(progress: MotionValue<number>, from: number, to: number) {
  const amp = useAmplitude();
  return useTransform(progress, [0, 1], [from * amp, to * amp]);
}

type PinnedSceneOptions = {
  lengthVh?: number;
  /** Shorter pin on phone — desktop uses lengthVh unchanged. */
  mobileLengthVh?: number;
  smooth?: boolean;
};

/** Pinned-scene helper: tall section height + (optionally smoothed) progress. */
export function usePinnedScene(
  target: Target,
  { lengthVh = 300, mobileLengthVh, smooth = false }: PinnedSceneOptions = {}
) {
  const isPhone = useIsPhoneViewport();
  const raw = useSectionProgress(target);
  const sprung = useSpring(raw, SCENE_SPRING);
  const heightVh = isPhone && mobileLengthVh ? mobileLengthVh : lengthVh;
  return {
    progress: smooth ? sprung : raw,
    style: { height: `${heightVh}vh` } as CSSProperties,
  };
}
