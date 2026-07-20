"use client";

import { motion, useReducedMotion } from "motion/react";
import { HeroButton } from "@/components/hero/HeroButton";
import { ABOUT_CTA } from "./constants";
import { QT_EASE } from "./motionConstants";

export function AboutCta() {
  const reduceMotion = useReducedMotion();

  const cardMotion = reduceMotion
    ? { initial: false as const, animate: { opacity: 1, y: 0 } }
    : {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.8, ease: QT_EASE },
      };

  const headlineMotion = reduceMotion
    ? { initial: false as const, animate: { opacity: 1, y: 0 } }
    : {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.8, ease: QT_EASE },
      };

  const introMotion = reduceMotion
    ? { initial: false as const, animate: { opacity: 1, y: 0 } }
    : {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { delay: 0.2, duration: 0.8, ease: QT_EASE },
      };

  const buttonMotion = reduceMotion
    ? { initial: false as const, animate: { opacity: 1, y: 0 } }
    : {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { delay: 0.4, duration: 0.8, ease: QT_EASE },
      };

  return (
    <section
      className="about-cta-section"
      aria-labelledby="about-cta-heading"
    >
      <div className="about-cta-container">
        <motion.div className="about-cta-card" {...cardMotion}>
          <div className="about-cta-card__glows" aria-hidden>
            <div className="about-cta-card__glow about-cta-card__glow--left" />
            <div className="about-cta-card__glow about-cta-card__glow--right" />
            <div className="about-cta-card__glow about-cta-card__glow--bottom" />
          </div>

          <div className="about-cta-card__content">
            <motion.h2
              id="about-cta-heading"
              className="about-cta-card__title about-display-title about-display-title--lg"
              data-transition-text="headline"
              {...headlineMotion}
            >
              {ABOUT_CTA.title}
            </motion.h2>
            <motion.p
              className="about-cta-card__lead about-body-lead"
              data-transition-text="body"
              {...introMotion}
            >
              {ABOUT_CTA.intro}
            </motion.p>
            <motion.div {...buttonMotion}>
              <HeroButton
                href={ABOUT_CTA.href}
                label={ABOUT_CTA.buttonLabel}
                transitionItem
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
