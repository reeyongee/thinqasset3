"use client";

import { motion, useReducedMotion } from "motion/react";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Chapter kicker — "01 — Purpose". Entrance-only motion (allowed: entrances). */
export function SceneKicker({ index, label }: { index: string; label: string }) {
  const reduce = useReducedMotion();

  const anim = reduce
    ? { initial: false as const, animate: { opacity: 1, y: 0 } }
    : {
        initial: { opacity: 0, y: 12 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.7, ease: EASE },
      };

  return (
    <motion.p className="fl-kicker" {...anim}>
      <span className="fl-kicker__num">{index}</span>
      <span className="fl-kicker__rule" aria-hidden />
      <span className="fl-kicker__label">{label}</span>
    </motion.p>
  );
}
