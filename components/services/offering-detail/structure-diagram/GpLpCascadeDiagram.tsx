"use client";

import { motion, useMotionValueEvent, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import type { GpLpCascadeContent } from "./types";
import { useScene } from "./useScene";
import { Dot, TrunkPath } from "./tree";

export function GpLpCascadeDiagram({ content }: { content: GpLpCascadeContent }) {
  const pinRef = useRef<HTMLElement>(null);
  const p = useScene(pinRef);

  const level0O = useTransform(p, [0.08, 0.18], [0, 1]);
  const level0Y = useTransform(p, [0.08, 0.18], [24, 0]);
  const trunk0 = useTransform(p, [0.16, 0.24], [0, 1]);
  const level1O = useTransform(p, [0.22, 0.32], [0, 1]);
  const level1Y = useTransform(p, [0.22, 0.32], [24, 0]);
  const trunk1 = useTransform(p, [0.3, 0.38], [0, 1]);
  const level2O = useTransform(p, [0.36, 0.46], [0, 1]);
  const level2Y = useTransform(p, [0.36, 0.46], [24, 0]);
  const trunk2 = useTransform(p, [0.44, 0.52], [0, 1]);
  const level3O = useTransform(p, [0.5, 0.6], [0, 1]);
  const level3Y = useTransform(p, [0.5, 0.6], [24, 0]);

  const dot0 = useTransform(p, [0.1, 0.16], [0, 1]);
  const dot1 = useTransform(p, [0.24, 0.3], [0, 1]);
  const dot2 = useTransform(p, [0.38, 0.44], [0, 1]);
  const dot3 = useTransform(p, [0.52, 0.58], [0, 1]);

  const [chapter, setChapter] = useState(0);
  useMotionValueEvent(p, "change", (v) =>
    setChapter(v < 0.28 ? 0 : v < 0.42 ? 1 : v < 0.56 ? 2 : 3),
  );

  const levels = content.levels.map((level, index) => {
    const motionByIndex = [
      { opacity: level0O, y: level0Y, dot: dot0 },
      { opacity: level1O, y: level1Y, dot: dot1 },
      { opacity: level2O, y: level2Y, dot: dot2 },
      { opacity: level3O, y: level3Y, dot: dot3 },
    ] as const;
    return { level, motion: motionByIndex[index]! };
  });

  const trunks = [trunk0, trunk1, trunk2] as const;

  return (
    <section
      ref={pinRef}
      className="od-structure-diagram sd-section"
      aria-labelledby={content.headingId}
    >
      <div className="sd-container od-structure-diagram__intro">
        <p className="od-structure-diagram__marker">Structure diagram</p>
        <h2
          id={content.headingId}
          className="od-structure-diagram__title od-structure-diagram__title--wide"
        >
          {content.title}
        </h2>
      </div>

      <div className="od-structure-diagram__pin-scene od-structure-diagram__pin-scene--cascade">
        <div className="od-structure-diagram__pin-sticky">
          <div className="sd-container od-structure-diagram__pin-tree od-structure-diagram__cascade-tree">
            <p className="od-structure-diagram__marker od-structure-diagram__cascade-kicker">
              Capital &amp; control
            </p>

            {levels.map(({ level, motion: levelMotion }, index) => (
              <div key={level.num} className="od-structure-diagram__cascade-step">
                <motion.div
                  style={{ opacity: levelMotion.opacity, y: levelMotion.y }}
                  className="od-structure-diagram__tree-node od-structure-diagram__tree-node--center"
                >
                  <Dot progress={levelMotion.dot} className="od-structure-diagram__cascade-dot" />
                  <p className="od-structure-diagram__marker">{level.label}</p>
                  {level.focal ? (
                    <div className="od-structure-diagram__core od-structure-diagram__tree-core od-structure-diagram__cascade-core">
                      <h3 className="od-structure-diagram__subtitle">{level.title}</h3>
                      <p className="od-structure-diagram__level-note--on-dark od-structure-diagram__core-note">
                        {level.note}
                      </p>
                    </div>
                  ) : (
                    <>
                      <h3 className="od-structure-diagram__subtitle">{level.title}</h3>
                      <p className="od-structure-diagram__level-note od-structure-diagram__lede--compact">
                        {level.note}
                      </p>
                    </>
                  )}
                  <span className="od-structure-diagram__level-num od-structure-diagram__cascade-num">
                    {level.num}
                  </span>
                </motion.div>
                {index < trunks.length ? (
                  <TrunkPath
                    progress={trunks[index]!}
                    className="od-sd-tree__trunk od-sd-tree__trunk--center od-sd-tree__trunk--cascade"
                  />
                ) : null}
              </div>
            ))}

            <div className="od-structure-diagram__chapters od-structure-diagram__chapters--cascade">
              {content.levels.map((level, index) => (
                <span
                  key={level.num}
                  className={`od-structure-diagram__marker od-structure-diagram__chapter ${
                    chapter === index
                      ? "od-structure-diagram__chapter--active"
                      : "od-structure-diagram__chapter--idle"
                  }`}
                >
                  {level.num} {level.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="sd-container">
        <div className="od-structure-diagram__footer-quote">
          <div className="od-structure-diagram__footer-quote-inner">
            <p className="od-structure-diagram__marker od-structure-diagram__marker--accent">
              {content.footerKicker}
            </p>
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="od-structure-diagram__quote od-structure-diagram__quote--wide"
            >
              {content.footerQuote}
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}
