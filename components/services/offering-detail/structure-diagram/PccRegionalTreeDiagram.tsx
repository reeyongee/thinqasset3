"use client";

import { motion, useMotionValueEvent, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import type { PccTreeContent } from "./types";
import { useScene } from "./useScene";
import { BranchPaths, Dot, TrunkPath } from "./tree";

const CHAPTERS = ["Capital", "Core", "Cells"] as const;

export function PccRegionalTreeDiagram({ content }: { content: PccTreeContent }) {
  const pinRef = useRef<HTMLElement>(null);
  const p = useScene(pinRef);

  const rootO = useTransform(p, [0, 0.08], [0, 1]);
  const rootY = useTransform(p, [0, 0.08], [24, 0]);
  const trunk1 = useTransform(p, [0.06, 0.16], [0, 1]);
  const coreO = useTransform(p, [0.14, 0.24], [0, 1]);
  const coreY = useTransform(p, [0.14, 0.24], [28, 0]);
  const trunk2 = useTransform(p, [0.22, 0.3], [0, 1]);
  const rail = useTransform(p, [0.3, 0.42], [0, 1]);
  const dropA = useTransform(p, [0.4, 0.5], [0, 1]);
  const dropB = useTransform(p, [0.44, 0.54], [0, 1]);
  const dropC = useTransform(p, [0.48, 0.58], [0, 1]);
  const junc = useTransform(p, [0.4, 0.46], [0, 1]);
  const cellAO = useTransform(p, [0.5, 0.6], [0, 1]);
  const cellAY = useTransform(p, [0.5, 0.6], [20, 0]);
  const cellBO = useTransform(p, [0.55, 0.65], [0, 1]);
  const cellBY = useTransform(p, [0.55, 0.65], [20, 0]);
  const cellCO = useTransform(p, [0.6, 0.7], [0, 1]);
  const cellCY = useTransform(p, [0.6, 0.7], [20, 0]);

  const cellMotion = [cellAO, cellAY, cellBO, cellBY, cellCO, cellCY] as const;

  const [chapter, setChapter] = useState(0);
  useMotionValueEvent(p, "change", (v) =>
    setChapter(v < 0.22 ? 0 : v < 0.42 ? 1 : 2),
  );

  return (
    <section
      ref={pinRef}
      className="od-structure-diagram sd-section"
      aria-labelledby={content.headingId}
    >
      <div className="sd-container od-structure-diagram__intro">
        <p className="od-structure-diagram__marker">Structure diagram</p>
        <h2 id={content.headingId} className="od-structure-diagram__title">
          {content.title}
        </h2>
        {content.introExtra}
      </div>

      <div className="od-structure-diagram__pin-scene">
        <div className="od-structure-diagram__pin-sticky">
          <div className="sd-container od-structure-diagram__pin-tree">
            <motion.div
              style={{ opacity: rootO, y: rootY }}
              className="od-structure-diagram__tree-node od-structure-diagram__tree-node--center"
            >
              <p className="od-structure-diagram__marker">{content.investorsKicker}</p>
              <h3 className="od-structure-diagram__subtitle">{content.investorsTitle}</h3>
              <p className="od-structure-diagram__lede od-structure-diagram__lede--compact">
                {content.investorsSub}
              </p>
            </motion.div>

            <TrunkPath progress={trunk1} className="od-sd-tree__trunk od-sd-tree__trunk--center" />

            <motion.div
              style={{ opacity: coreO, y: coreY }}
              className="od-structure-diagram__core od-structure-diagram__tree-core"
            >
              <p className="od-structure-diagram__marker od-structure-diagram__core-meta">
                {content.coreMeta}
              </p>
              <h3 className="od-structure-diagram__subtitle">{content.coreTitle}</h3>
              {content.coreGrid ? (
                <div className="od-structure-diagram__core-divider od-structure-diagram__core-list od-structure-diagram__core-grid">
                  {content.coreGrid.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              ) : null}
              {content.coreNote ? (
                <p className="od-structure-diagram__level-note--on-dark od-structure-diagram__core-note">
                  {content.coreNote}
                </p>
              ) : null}
            </motion.div>

            <TrunkPath progress={trunk2} className="od-sd-tree__trunk od-sd-tree__trunk--center" />

            <div className="od-structure-diagram__branch-wrap">
              <BranchPaths rail={rail} dropA={dropA} dropB={dropB} dropC={dropC} />
              <Dot progress={junc} className="od-structure-diagram__branch-dot od-structure-diagram__branch-dot--a" />
              <Dot progress={junc} className="od-structure-diagram__branch-dot od-structure-diagram__branch-dot--b" />
              <Dot progress={junc} className="od-structure-diagram__branch-dot od-structure-diagram__branch-dot--c" />
            </div>

            <div className="od-structure-diagram__cells">
              {content.cells.map((cell, index) => (
                <motion.div
                  key={cell.id}
                  style={{
                    opacity: cellMotion[index * 2],
                    y: cellMotion[index * 2 + 1],
                  }}
                  className="od-structure-diagram__cell-group"
                >
                  <div className="od-structure-diagram__cell od-structure-diagram__cell-inner">
                    <div className="od-structure-diagram__cell-head">
                      <p className="od-structure-diagram__marker">Cell {cell.id}</p>
                      <span className="od-structure-diagram__sleeve-index">{cell.id}</span>
                    </div>
                    <h4 className="od-structure-diagram__subtitle od-structure-diagram__subtitle--cell">
                      {cell.title}
                    </h4>
                    <ul className="od-structure-diagram__cell-list">
                      {cell.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="od-structure-diagram__chapters">
              {CHAPTERS.map((label, index) => (
                <span
                  key={label}
                  className={`od-structure-diagram__marker od-structure-diagram__chapter ${
                    chapter === index
                      ? "od-structure-diagram__chapter--active"
                      : "od-structure-diagram__chapter--idle"
                  }`}
                >
                  0{index + 1} {label}
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
              className="od-structure-diagram__quote"
            >
              {content.footerQuote}
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}
