"use client";

import { motion, useReducedMotion, useTransform } from "motion/react";
import { useRef } from "react";
import { FOUNDER_LETTER } from "./content";
import { useSmoothScroll } from "./hooks";
import { SceneKicker } from "./SceneKicker";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Closing — understated resolve.
 * The statement sits narrow-left; the signature block is right-set with a
 * rule that draws in from the right. The letter ends quietly with the
 * office letterhead.
 */
export function ClosingScene() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const progress = useSmoothScroll(ref, ["start 0.75", "end 0.55"]);

  const fade = useTransform(progress, [0.05, 0.3], [0, 1]);
  const y = useTransform(progress, [0.05, 0.3], [28, 0]);
  const ruleScaleX = useTransform(progress, [0.2, 0.45], [0, 1]);

  const thanksMotion = reduce
    ? { initial: false as const, animate: { opacity: 1, y: 0 } }
    : {
        initial: { opacity: 0, y: 18 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { delay: 0.3, duration: 1, ease: EASE },
      };

  const closing = FOUNDER_LETTER.closing;

  return (
    <section ref={ref} className="fl-scene fl-scene--closing" aria-labelledby="fl-closing-title">
      <span className="fl-ghost" aria-hidden>
        {closing.index}
      </span>

      <div className="fl-scene__inner">
        <SceneKicker index={closing.index} label={closing.label} />

        <motion.div style={{ opacity: fade, y }}>
          <h2 id="fl-closing-title" className="fl-closing__statement">
            {closing.statement}
          </h2>

          <p className="fl-closing__thanks">{closing.thanks}</p>

          <div className="fl-closing__signrow">
            <div className="fl-closing__sign">
              <motion.div
                className="fl-closing__rule"
                style={{ scaleX: reduce ? 1 : ruleScaleX }}
                aria-hidden
              />
              <p className="fl-closing__sign-name">{closing.sign}</p>
              <p className="fl-closing__sign-org">{closing.org}</p>
              <p className="fl-closing__sign-place">{closing.place}</p>
            </div>
          </div>
        </motion.div>

        <motion.div className="fl-closing__foot" {...thanksMotion}>
          <span className="fl-closing__brand">{FOUNDER_LETTER.brand}</span>
          <span className="fl-closing__brand-sub">{FOUNDER_LETTER.brandSub}</span>
          <span className="fl-closing__est">{FOUNDER_LETTER.heroMeta[1]}</span>
        </motion.div>
      </div>
    </section>
  );
}
