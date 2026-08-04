"use client";

import { motion, useReducedMotion, useTransform } from "motion/react";
import type { MotionValue } from "motion/react";
import { useRef } from "react";
import { FOUNDER_LETTER } from "./content";
import { useSmoothScroll } from "./hooks";
import { SceneKicker } from "./SceneKicker";

/** Card rotation pattern — a fanned hand, not identical rectangles. */
const FAN_ROTATION = [-3, 1.5, -1.5, 3, -2, 2, -3.5, 1, 2.5];

/** One capability card in the pinned deck — peels off over its slice of progress. */
function EcosystemCard({
  progress,
  index,
  count,
  reduce,
  label,
}: {
  progress: MotionValue<number>;
  index: number;
  count: number;
  reduce: boolean | null;
  label: string;
}) {
  const span = 0.72 / count;
  const start = 0.26 + index * span;

  const y = useTransform(progress, [start, start + span], [0, -110]);
  const x = useTransform(progress, [start, start + span], [0, index % 2 === 0 ? -36 : 36]);
  const scale = useTransform(progress, [start, start + span], [1, 0.84]);
  const opacity = useTransform(progress, [start, start + span], [1, 0.22]);
  const blur = useTransform(progress, [start, start + span], reduce ? [0, 0] : [0, 5]);
  const filter = useTransform(blur, (v) => `blur(${v}px)`);
  const rotate = useTransform(
    progress,
    [start, start + span],
    reduce ? [0, 0] : [FAN_ROTATION[index % FAN_ROTATION.length], FAN_ROTATION[index % FAN_ROTATION.length] * 2.2],
  );

  return (
    <motion.div
      className="fl-ecosystem__card"
      style={{ y, x, scale, opacity, filter, rotate, zIndex: count - index }}
    >
      <span className="fl-ecosystem__card-num">{String(index + 1).padStart(2, "0")}</span>
      <span className="fl-ecosystem__card-label">{label}</span>
    </motion.div>
  );
}

/**
 * Ecosystem — the one dense middle: a pinned, fanned card deck.
 * As the section pins, each capability card peels off the fan
 * (translate + scale + blur + rotation) while the statement resolves
 * above-left. The deck sits right-of-center — asymmetric composition.
 */
export function EcosystemScene() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const progress = useSmoothScroll(ref, ["start start", "end end"]);

  const statementOpacity = useTransform(progress, [0.04, 0.16], [0, 1]);
  const statementY = useTransform(progress, [0.04, 0.16], [24, 0]);
  const statementBlur = useTransform(progress, [0.04, 0.16], reduce ? [0, 0] : [6, 0]);
  const statementFilter = useTransform(statementBlur, (v) => `blur(${v}px)`);

  const caps = FOUNDER_LETTER.ecosystem.capabilities;

  return (
    <section ref={ref} className="fl-ecosystem" aria-labelledby="fl-ecosystem-title">
      <div className="fl-ecosystem__pinned">
        <span className="fl-ghost" aria-hidden>
          {FOUNDER_LETTER.ecosystem.index}
        </span>

        <div className="fl-ecosystem__statement-wrap">
          <SceneKicker
            index={FOUNDER_LETTER.ecosystem.index}
            label={FOUNDER_LETTER.ecosystem.label}
          />
          <motion.p
            id="fl-ecosystem-title"
            className="fl-ecosystem__statement"
            style={{ opacity: statementOpacity, y: statementY, filter: statementFilter }}
          >
            {FOUNDER_LETTER.ecosystem.statement}
          </motion.p>
        </div>

        <div className="fl-ecosystem__deck" aria-label="Integrated platform capabilities">
          {caps.map((cap, i) => (
            <EcosystemCard
              key={cap}
              progress={progress}
              index={i}
              count={caps.length}
              reduce={reduce}
              label={cap}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
