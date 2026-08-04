"use client";

import { motion, useReducedMotion, useTransform } from "motion/react";
import type { MotionValue } from "motion/react";
import { useRef } from "react";
import { FOUNDER_LETTER } from "./content";
import { useSmoothScroll } from "./hooks";
import { SceneKicker } from "./SceneKicker";

/** One jurisdiction node — own transforms over its slice of shared progress. */
function TimelineNode({
  progress,
  index,
  count,
  reduce,
  place,
  tag,
  label,
  detail,
}: {
  progress: MotionValue<number>;
  index: number;
  count: number;
  reduce: boolean | null;
  place: string;
  tag: string;
  label: string;
  detail: string;
}) {
  const start = 0.05 + index * (0.9 / count);
  const end = start + 0.25 * (0.9 / count);

  const y = useTransform(progress, [start, end], [34, 0]);
  const opacity = useTransform(progress, [start, end], [0.25, 1]);
  const blur = useTransform(progress, [start, end], reduce ? [0, 0] : [6, 0]);
  const filter = useTransform(blur, (v) => `blur(${v}px)`);

  return (
    <motion.li className="fl-timeline__node" style={{ y, opacity, filter }}>
      <span className="fl-timeline__dot" aria-hidden />
      <div className="fl-timeline__body">
        <p className="fl-timeline__place">
          {place}
          <span className="fl-timeline__tag">{tag}</span>
        </p>
        <p className="fl-timeline__label">{label}</p>
        <p className="fl-timeline__detail">{detail}</p>
      </div>
    </motion.li>
  );
}

/**
 * Footprint — narrative timeline scene, narrow editorial column.
 * Four jurisdiction nodes rise in sequence, tracked by a gold progress
 * line that fills as the section is scrolled. Each node's motion derives
 * from its own slice of the single shared progress value.
 */
export function FootprintScene() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const progress = useSmoothScroll(ref, ["start 0.7", "end 0.6"]);

  const nodes = FOUNDER_LETTER.footprint.nodes;
  const lineScaleY = useTransform(progress, [0.05, 0.95], [0, 1]);

  return (
    <section
      ref={ref}
      className="fl-scene fl-scene--footprint"
      aria-labelledby="fl-footprint-title"
    >
      <span className="fl-ghost" aria-hidden>
        {FOUNDER_LETTER.footprint.index}
      </span>

      <div className="fl-scene__inner">
        <SceneKicker
          index={FOUNDER_LETTER.footprint.index}
          label={FOUNDER_LETTER.footprint.label}
        />

        <h2 id="fl-footprint-title" className="fl-scene__title fl-scene__title--medium">
          {FOUNDER_LETTER.footprint.lead}
        </h2>

        <div className="fl-timeline">
          <div className="fl-timeline__rail" aria-hidden>
            <div className="fl-timeline__track" />
            <motion.div
              className="fl-timeline__fill"
              style={{ scaleY: reduce ? 1 : lineScaleY }}
            />
          </div>

          <ol className="fl-timeline__list">
            {nodes.map((node, i) => (
              <TimelineNode
                key={node.place}
                progress={progress}
                index={i}
                count={nodes.length}
                reduce={reduce}
                place={node.place}
                tag={node.tag}
                label={node.label}
                detail={node.detail}
              />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
