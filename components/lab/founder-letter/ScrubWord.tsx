"use client";

import { motion, useMotionTemplate, useReducedMotion, useTransform } from "motion/react";
import type { MotionValue } from "motion/react";

/**
 * A single word scrubbed in/out by section scroll progress.
 * Each word owns its own opacity / y / blur transforms over a slice of the
 * shared progress — the timeline is scroll, not time.
 */
export function ScrubWord({
  progress,
  index,
  count,
  range = [0, 1],
  children,
  className,
}: {
  progress: MotionValue<number>;
  index: number;
  count: number;
  range?: [number, number];
  children: React.ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const [a, b] = range;
  const start = a + ((b - a) * index) / count;
  const end = a + ((b - a) * (index + 1)) / count;

  const opacity = useTransform(progress, [start, end], [0.12, 1]);
  const y = useTransform(progress, [start, end], [16, 0]);
  const blur = useTransform(progress, [start, end], [5, 0]);
  const filter = useMotionTemplate`blur(${blur}px)`;

  const cls = `fl-word${className ? ` ${className}` : ""}`;

  if (reduce) {
    return <span className={cls}>{children}</span>;
  }

  return (
    <motion.span className={cls} style={{ opacity, y, filter }}>
      {children}
    </motion.span>
  );
}
