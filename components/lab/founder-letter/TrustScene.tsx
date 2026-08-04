"use client";

import { motion, useReducedMotion, useTransform } from "motion/react";
import { useRef } from "react";
import { FOUNDER_LETTER } from "./content";
import { useSmoothScroll } from "./hooks";
import { SceneKicker } from "./SceneKicker";
import { ScrubWord } from "./ScrubWord";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Trust — the quiet monumental screen.
 * One word, enormous, centered, with almost nothing else. The body copy
 * scrubs in word-by-word beneath, then a footnote. This is the section
 * where the scroll should slow down.
 */
export function TrustScene() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const progress = useSmoothScroll(ref, ["start 0.8", "end 0.35"]);

  const statement = FOUNDER_LETTER.trust.statement;
  // "At the heart of TBG lies something far more valuable than capital — trust."
  const bodyWords = FOUNDER_LETTER.trust.body.split(" ");
  const note = FOUNDER_LETTER.closing.statement;

  const monumentScale = useTransform(progress, [0.02, 0.3], reduce ? [1, 1] : [1.12, 1]);
  const monumentOpacity = useTransform(progress, [0.02, 0.28], [0.08, 1]);

  const footnoteMotion = reduce
    ? { initial: false as const, animate: { opacity: 1, y: 0 } }
    : {
        initial: { opacity: 0, y: 18 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { delay: 0.2, duration: 1, ease: EASE },
      };

  return (
    <section ref={ref} className="fl-scene fl-scene--trust" aria-labelledby="fl-trust-title">
      <div className="fl-scene__inner">
        <SceneKicker index={FOUNDER_LETTER.trust.index} label={FOUNDER_LETTER.trust.label} />

        <motion.h2
          id="fl-trust-title"
          className="fl-trust__monument"
          style={{ scale: monumentScale, opacity: monumentOpacity }}
        >
          Trust<span className="fl-trust__period">.</span>
        </motion.h2>

        <p className="fl-scene__body fl-trust__body">
          {bodyWords.map((word, i) => (
            <ScrubWord
              key={`${word}-${i}`}
              progress={progress}
              index={i}
              count={bodyWords.length}
              range={[0.3, 0.72]}
            >
              {word}
            </ScrubWord>
          ))}
        </p>

        <motion.p className="fl-trust__footnote" {...footnoteMotion}>
          {note}
        </motion.p>
      </div>
    </section>
  );
}
