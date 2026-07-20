"use client";

import { useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";
import {
  ABOUT_APPROACH,
  type AboutApproachPillar,
} from "./constants";
import {
  PILLAR_INDICATOR_SPRING,
  QT_EASE,
} from "./motionConstants";

function ApproachPillarTab({
  pillar,
  isActive,
  onSelect,
}: {
  pillar: AboutApproachPillar;
  isActive: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      className="about-approach-tab"
      aria-selected={isActive}
      onClick={onSelect}
    >
      {isActive ? (
        <motion.div
          layoutId="about-approach-indicator"
          className="about-approach-tab__indicator"
          transition={PILLAR_INDICATOR_SPRING}
          aria-hidden
        />
      ) : null}
      <h3
        className={`about-approach-tab__title${isActive ? " is-active" : ""}`}
      >
        {pillar.title}
      </h3>
      <p
        className={`about-approach-tab__subtitle${isActive ? " is-active" : ""}`}
      >
        {pillar.subtitle}
      </p>
    </button>
  );
}

function ApproachPanel({
  pillar,
  reduceMotion,
}: {
  pillar: AboutApproachPillar;
  reduceMotion: boolean | null;
}) {
  const panelMotion = reduceMotion
    ? { initial: false as const, animate: { opacity: 1, y: 0 } }
    : {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -10 },
        transition: { duration: 0.3, ease: QT_EASE },
      };

  const bulletMotion = (index: number) =>
    reduceMotion
      ? { initial: false as const, animate: { opacity: 1, x: 0 } }
      : {
          initial: { opacity: 0, x: -10 },
          animate: { opacity: 1, x: 0 },
          transition: { delay: 0.05 * index, duration: 0.3, ease: QT_EASE },
        };

  return (
    <motion.div
      className="about-approach-panel"
      {...panelMotion}
    >
      <div className="about-approach-panel__title-slot">
        <h3 className="about-approach-panel__title">{pillar.title}</h3>
      </div>
      <div className="about-approach-panel__body-slot">
        <p className="about-approach-panel__body">{pillar.description}</p>
      </div>
      <div className="about-approach-panel__components">
        <p className="about-approach-panel__components-label">Key components</p>
        <div className="about-approach-panel__components-list">
          {pillar.components.map((component, index) => (
            <motion.div
              key={component}
              className="about-approach-panel__component"
              {...bulletMotion(index)}
            >
              <span className="about-approach-panel__dot" aria-hidden />
              <span className="about-approach-panel__component-label">
                {component}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function AboutApproach() {
  const reduceMotion = useReducedMotion();
  const [activeId, setActiveId] = useState(ABOUT_APPROACH.pillars[0].id);
  const activePillar =
    ABOUT_APPROACH.pillars.find((pillar) => pillar.id === activeId) ??
    ABOUT_APPROACH.pillars[0];

  const headerMotion = reduceMotion
    ? { initial: false as const, animate: { opacity: 1, y: 0 } }
    : {
        initial: { opacity: 0, y: 15 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.8, ease: QT_EASE },
      };

  const introMotion = reduceMotion
    ? { initial: false as const, animate: { opacity: 1, y: 0 } }
    : {
        initial: { opacity: 0, y: 15 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { delay: 0.2, duration: 0.8, ease: QT_EASE },
      };

  const columnMotion = (delay: number) =>
    reduceMotion
      ? { initial: false as const, animate: { opacity: 1, y: 0 } }
      : {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { delay, duration: 0.8, ease: QT_EASE },
        };

  return (
    <section
      className="about-approach-section"
      aria-labelledby="about-approach-heading"
    >
      <div className="about-approach-container">
        <div className="about-approach-header">
          <motion.h2
            id="about-approach-heading"
            className="about-approach-title about-display-title"
            data-transition-text="headline"
            {...headerMotion}
          >
            {ABOUT_APPROACH.title}
          </motion.h2>
          <motion.p
            className="about-approach-lead about-body-lead"
            data-transition-text="body"
            {...introMotion}
          >
            {ABOUT_APPROACH.intro}
          </motion.p>
        </div>

        <div className="about-approach-grid">
          <motion.div
            className="about-approach-tabs"
            role="tablist"
            aria-label={ABOUT_APPROACH.title}
            {...columnMotion(0.3)}
          >
            {ABOUT_APPROACH.pillars.map((pillar) => (
              <ApproachPillarTab
                key={pillar.id}
                pillar={pillar}
                isActive={activeId === pillar.id}
                onSelect={() => setActiveId(pillar.id)}
              />
            ))}
          </motion.div>

          <motion.div
            className="about-approach-card-wrap"
            role="tabpanel"
            aria-live="polite"
            {...columnMotion(0.4)}
          >
            <div className="about-approach-card">
              <AnimatePresence mode="wait" initial={false}>
                <ApproachPanel
                  key={activePillar.id}
                  pillar={activePillar}
                  reduceMotion={reduceMotion}
                />
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
