"use client";

import Image from "next/image";
import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import {
  ABOUT_HISTORY,
  ABOUT_HISTORY_IMAGE,
  type AboutHistoryMilestone,
} from "./constants";
import {
  ACCENT_GRADIENT_TEXT_STYLE,
  ACCENT_PROGRESS_FILL_STYLE,
  QT_EASE,
  SCROLL_SPRING,
} from "./motionConstants";

function TimelineEntry({
  milestone,
  index,
  reduceMotion,
}: {
  milestone: AboutHistoryMilestone;
  index: number;
  reduceMotion: boolean | null;
}) {
  const entryMotion = reduceMotion
    ? { initial: false as const, animate: { opacity: 1, y: 0 } }
    : {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { delay: 0.1 * index, duration: 0.8, ease: QT_EASE },
      };

  return (
    <motion.div className="about-history-entry" {...entryMotion}>
      <span className="about-history-entry__year" style={ACCENT_GRADIENT_TEXT_STYLE}>
        {milestone.year}
      </span>
      <div className="about-history-entry__content">
        <h3 className="about-history-entry__title">{milestone.title}</h3>
        <p className="about-history-entry__body">{milestone.description}</p>
      </div>
    </motion.div>
  );
}

export function AboutHistory() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end center"],
  });

  const smoothProgress = useSpring(scrollYProgress, SCROLL_SPRING);
  const fillHeight = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

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

  return (
    <section
      className="about-history-section"
      aria-labelledby="about-history-heading"
    >
      <div className="about-history-container">
        <div className="about-history-header">
          <motion.h2
            id="about-history-heading"
            className="about-history-title about-display-title"
            data-transition-text="headline"
            {...headerMotion}
          >
            {ABOUT_HISTORY.title}
          </motion.h2>
          <motion.p
            className="about-history-lead about-body-lead"
            data-transition-text="body"
            {...introMotion}
          >
            {ABOUT_HISTORY.intro}
          </motion.p>
        </div>

        <div className="about-history-grid">
          <div ref={timelineRef} className="about-history-timeline">
            <div className="about-history-progress-rail" aria-hidden>
              <div className="about-history-progress-track" />
              <motion.div
                className="about-history-progress-fill"
                style={{
                  ...ACCENT_PROGRESS_FILL_STYLE,
                  height: reduceMotion ? "100%" : fillHeight,
                }}
              />
            </div>

            <div className="about-history-entries">
              {ABOUT_HISTORY.milestones.map((milestone, index) => (
                <TimelineEntry
                  key={milestone.year}
                  milestone={milestone}
                  index={index}
                  reduceMotion={reduceMotion}
                />
              ))}
            </div>
          </div>

          <div className="about-history-visual about-history-visual--desktop">
            <div className="about-history-visual__sticky">
              <Image
                src={ABOUT_HISTORY_IMAGE.src}
                alt={ABOUT_HISTORY_IMAGE.alt}
                width={900}
                height={900}
                className="about-history-visual__image"
                sizes="(min-width: 1536px) 900px, (min-width: 1280px) 700px, 500px"
              />
            </div>
          </div>
        </div>

        <div className="about-history-visual about-history-visual--mobile">
          <Image
            src={ABOUT_HISTORY_IMAGE.src}
            alt={ABOUT_HISTORY_IMAGE.alt}
            width={400}
            height={400}
            className="about-history-visual__image about-history-visual__image--mobile"
            sizes="(min-width: 640px) 400px, 320px"
          />
        </div>
      </div>
    </section>
  );
}
