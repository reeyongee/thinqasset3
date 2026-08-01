"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ElementType, ReactNode } from "react";
import { MOBILE_REVEAL_MS } from "./motion";

type MobileRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: ElementType;
};

export function MobileReveal({
  children,
  className = "",
  delay = 0,
  as: Component = "div",
}: MobileRevealProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <Component className={className}>{children}</Component>;
  }

  const MotionComponent = motion.create(Component);

  return (
    <MotionComponent
      className={className}
      initial={{ opacity: 0, transform: "translateY(10px)" }}
      whileInView={{ opacity: 1, transform: "translateY(0px)" }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{
        duration: MOBILE_REVEAL_MS / 1000,
        delay,
        ease: [0.23, 1, 0.32, 1],
      }}
    >
      {children}
    </MotionComponent>
  );
}
