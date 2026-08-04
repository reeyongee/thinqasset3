"use client";

import { motion, useScroll, useSpring, useTransform } from "motion/react";

/** Fixed right-edge page progress rail — page scrollYProgress as the master timeline. */
export function ScrollRail() {
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 28,
    mass: 0.6,
    restDelta: 0.001,
  });
  const fillHeight = useTransform(smooth, [0, 1], ["0%", "100%"]);

  return (
    <div className="fl-rail" aria-hidden>
      <span className="fl-rail__label">Scroll</span>
      <div className="fl-rail__track">
        <motion.div className="fl-rail__fill" style={{ height: fillHeight }} />
      </div>
    </div>
  );
}
