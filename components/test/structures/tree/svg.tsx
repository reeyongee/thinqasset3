"use client";

import { motion, type MotionValue } from "framer-motion";

const stroke = {
  fill: "none",
  stroke: "var(--tw-line, #DDD9CF)",
  strokeWidth: 1,
  vectorEffect: "non-scaling-stroke",
} as const;

/* Fixed-height vertical trunk. x = 50 (center) or 0 (left spine) */
export function TrunkPath({
  progress,
  x = 50,
  className,
}: {
  progress: MotionValue<number>;
  x?: number;
  className: string;
}) {
  return (
    <svg aria-hidden viewBox="0 0 100 100" preserveAspectRatio="none" className={className}>
      <motion.path d={`M ${x} 0 L ${x} 100`} {...stroke} stroke="#B9B4A8" style={{ pathLength: progress }} />
    </svg>
  );
}

/* Branch: rail drawn center-out + three drops, each on its own progress range */
export function BranchPaths({
  rail,
  dropA,
  dropB,
  dropC,
}: {
  rail: MotionValue<number>;
  dropA: MotionValue<number>;
  dropB: MotionValue<number>;
  dropC: MotionValue<number>;
}) {
  return (
    <svg aria-hidden viewBox="0 0 100 100" preserveAspectRatio="none" className="h-14 w-full md:h-24">
      <motion.path d="M 50 0 L 16.667 0" {...stroke} style={{ pathLength: rail }} />
      <motion.path d="M 50 0 L 83.333 0" {...stroke} style={{ pathLength: rail }} />
      <motion.path d="M 16.667 0 L 16.667 100" {...stroke} style={{ pathLength: dropA }} />
      <motion.path d="M 50 0 L 50 100" {...stroke} style={{ pathLength: dropB }} />
      <motion.path d="M 83.333 0 L 83.333 100" {...stroke} style={{ pathLength: dropC }} />
    </svg>
  );
}

/* Full-height left spine (x=0 needs no row alignment) */
export function SpinePath({
  progress,
  className,
}: {
  progress: MotionValue<number>;
  className: string;
}) {
  return (
    <svg aria-hidden viewBox="0 0 100 100" preserveAspectRatio="none" className={className}>
      <motion.path d="M 0 0 L 0 100" {...stroke} style={{ pathLength: progress }} />
    </svg>
  );
}

export function Dot({
  className = "",
  progress,
}: {
  className?: string;
  progress?: MotionValue<number>;
}) {
  return (
    <motion.span
      aria-hidden
      style={progress ? { scale: progress } : undefined}
      initial={progress ? undefined : { scale: 0 }}
      whileInView={progress ? undefined : { scale: 1 }}
      viewport={{ once: true }}
      className={`absolute h-1.5 w-1.5 bg-accent ${className}`}
    />
  );
}
