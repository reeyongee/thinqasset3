"use client";

import { useScroll, useSpring } from "motion/react";
import type { RefObject } from "react";

type ScrollOptions = NonNullable<Parameters<typeof useScroll>[0]>;
type ScrollOffset = NonNullable<ScrollOptions["offset"]>;

/** Site-wide scroll spring — raw scroll feels mechanical; everything derives from this. */
export const FL_SPRING = {
  stiffness: 110,
  damping: 28,
  mass: 0.6,
  restDelta: 0.001,
} as const;

/**
 * Section-scoped, springed scroll progress.
 * Usage: const progress = useSmoothScroll(ref, ["start end", "end start"]);
 * Then map progress → transforms per scene.
 */
export function useSmoothScroll(
  target: RefObject<HTMLElement | null>,
  offset: ScrollOffset = ["start end", "end start"],
) {
  const { scrollYProgress } = useScroll({ target, offset });
  return useSpring(scrollYProgress, FL_SPRING);
}
