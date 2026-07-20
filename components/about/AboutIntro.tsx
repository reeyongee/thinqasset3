"use client";

import { motion, useReducedMotion } from "motion/react";
import { ABOUT_INTRO, type AboutIntroCard } from "./constants";
import { ACCENT_GRADIENT_TEXT_STYLE, QT_EASE } from "./motionConstants";

function AboutFeatureCard({ card }: { card: AboutIntroCard }) {
  const accentClassName =
    card.accentVariant === "year"
      ? "about-intro-card__accent about-intro-card__accent--year"
      : "about-intro-card__accent about-intro-card__accent--label";

  return (
    <>
      <div className="relative z-10">
        <h3 className="about-intro-card__title">{card.title}</h3>
      </div>
      <div className="relative z-10 flex items-center justify-center py-4">
        <span className={accentClassName} style={ACCENT_GRADIENT_TEXT_STYLE}>
          {card.accent}
        </span>
      </div>
      <div className="relative z-10">
        <p className="about-intro-card__body">{card.body}</p>
      </div>
    </>
  );
}

export function AboutIntro() {
  const reduceMotion = useReducedMotion();

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

  const cardMotion = (delay: number) =>
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
      className="about-intro-section"
      aria-labelledby="about-intro-heading"
    >
      <div className="about-intro-container">
        <div className="about-intro-header">
          <motion.h2
            id="about-intro-heading"
            className="about-intro-title about-display-title"
            data-transition-text="headline"
            {...headerMotion}
          >
            {ABOUT_INTRO.title}
          </motion.h2>
          <motion.p
            className="about-intro-lead about-body-lead"
            data-transition-text="body"
            {...introMotion}
          >
            {ABOUT_INTRO.intro}
          </motion.p>
        </div>

        <div className="about-intro-grid">
          {ABOUT_INTRO.cards.map((card, index) => (
            <motion.div
              key={card.title}
              className="about-intro-card"
              {...cardMotion(0.3 + index * 0.1)}
            >
              <AboutFeatureCard card={card} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
