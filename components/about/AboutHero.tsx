"use client";

import { motion, useReducedMotion } from "motion/react";
import { ABOUT_HERO } from "./constants";
import { Orb } from "./orb/Orb";
import { QT_EASE } from "./motionConstants";

const HERO_EASE = QT_EASE;

export function AboutHero() {
  const reduceMotion = useReducedMotion();

  const cardMotion = reduceMotion
    ? { initial: false as const, animate: { opacity: 1, scale: 1 } }
    : {
        initial: { opacity: 0, scale: 0.98 },
        animate: { opacity: 1, scale: 1 },
        transition: { duration: 1.2, ease: HERO_EASE },
      };

  const headlineMotion = reduceMotion
    ? { initial: false as const, animate: { opacity: 1, y: 0 } }
    : {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: 0.4, duration: 1.2, ease: HERO_EASE },
      };

  const sublineMotion = reduceMotion
    ? { initial: false as const, animate: { opacity: 1, y: 0 } }
    : {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: 0.7, duration: 1.2, ease: HERO_EASE },
      };

  const orbMotion = reduceMotion
    ? { initial: false as const, animate: { opacity: 0.9, scale: 1 } }
    : {
        initial: { opacity: 0, scale: 0.9 },
        animate: { opacity: 0.9, scale: 1 },
        transition: { delay: 0.8, duration: 1.5, ease: HERO_EASE },
      };

  return (
    <section
      className="about-hero-section"
      aria-labelledby="about-hero-heading"
      data-transition-page
    >
      <motion.div
        className="about-hero-card"
        {...cardMotion}
      >
        <div
          className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]"
          aria-hidden
        >
          <div className="about-hero-blob" />
        </div>

        <div className="about-hero-text-layer">
          <div className="max-w-4xl pointer-events-auto">
            <motion.h1
              id="about-hero-heading"
              className="about-hero-headline about-display-hero"
              data-transition-text="headline"
              {...headlineMotion}
            >
              {ABOUT_HERO.headlineLines[0]}
              <br />
              {ABOUT_HERO.headlineLines[1]}
            </motion.h1>

            <motion.p
              className="about-hero-subline"
              data-transition-text="body"
              {...sublineMotion}
            >
              {ABOUT_HERO.subline}
            </motion.p>
          </div>
        </div>

        <div className="about-hero-orb-layer">
          <motion.div className="about-hero-orb-wrap" {...orbMotion}>
            <Orb hue={42} hoverIntensity={0.2} backgroundColor="#161c24" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
