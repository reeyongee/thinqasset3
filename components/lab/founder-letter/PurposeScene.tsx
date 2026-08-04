"use client";

import { motion, useReducedMotion, useTransform } from "motion/react";
import { useRef } from "react";
import { FOUNDER_LETTER } from "./content";
import { useSmoothScroll } from "./hooks";
import { SceneKicker } from "./SceneKicker";
import { ScrubWord } from "./ScrubWord";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Purpose — sparse narrative scene, word-scrubbed manifesto.
 * Quiet by design: a narrow editorial column with a ghost numeral.
 * Each word of the statement resolves from 12% → 100% opacity as section
 * progress crosses its slice. The final line is tracked by a gold
 * underscore. The supporting line enters at the tail.
 */
export function PurposeScene() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const progress = useSmoothScroll(ref, ["start 0.72", "end 0.42"]);

  const purpose = FOUNDER_LETTER.purpose;
  const words = purpose.lines.join(" ").split(" ");

  const underscoreScaleX = useTransform(progress, [0.72, 0.88], [0, 1]);

  const supportingMotion = reduce
    ? { initial: false as const, animate: { opacity: 1, y: 0 } }
    : {
        initial: { opacity: 0, y: 16 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { delay: 0.25, duration: 0.9, ease: EASE },
      };

  return (
    <section ref={ref} className="fl-scene fl-scene--purpose" aria-labelledby="fl-purpose-title">
      <span className="fl-ghost" aria-hidden>
        {purpose.index}
      </span>

      <div className="fl-scene__inner">
        <SceneKicker index={purpose.index} label={purpose.label} />

        <h2 id="fl-purpose-title" className="fl-scene__title">
          {words.map((word, i) => (
            <ScrubWord
              key={`${word}-${i}`}
              progress={progress}
              index={i}
              count={words.length}
              range={[0.15, 0.85]}
            >
              {word}
            </ScrubWord>
          ))}
        </h2>

        <motion.div
          className="fl-scene__underscore"
          style={{ scaleX: reduce ? 1 : underscoreScaleX }}
          aria-hidden
        />

        <motion.p className="fl-scene__support" {...supportingMotion}>
          {purpose.supporting}
        </motion.p>
      </div>
    </section>
  );
}
