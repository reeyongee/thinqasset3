"use client";

import { useScroll, useSpring } from "framer-motion";
import type { RefObject } from "react";

export function useScene(ref: RefObject<HTMLElement | null>) {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });
  return useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 });
}
