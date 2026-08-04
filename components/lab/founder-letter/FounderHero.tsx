"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef } from "react";
import { FOUNDER_LETTER, PORTRAIT } from "./content";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Hero — establish scene, the loud anchor.
 * Oversized title left, restrained portrait bottom-right (diagonal eye
 * travel). Background wash → portrait (parallax + scale) → scrim →
 * headline → meta. Everything derives from one smooth page progress.
 */
export function FounderHero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const smooth = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 28,
    mass: 0.6,
    restDelta: 0.001,
  });

  const portraitY = useTransform(smooth, [0, 1], [0, 80]);
  const portraitScale = useTransform(smooth, [0, 1], reduce ? [1, 1] : [1, 1.05]);
  const contentOpacity = useTransform(smooth, [0, 0.65], [1, 0]);
  const contentY = useTransform(smooth, [0, 0.65], [0, -40]);
  const bgOpacity = useTransform(smooth, [0.1, 0.6], [0.7, 0.1]);

  const backdropBlur = useTransform(smooth, [0.2, 0.7], reduce ? [0, 0] : [0, 10]);
  const bgFilter = useTransform(backdropBlur, (v) => `blur(${v}px)`);

  const frameMotion = reduce
    ? { initial: false as const, animate: { opacity: 1, scale: 1 } }
    : {
        initial: { opacity: 0, scale: 0.96, y: 24 },
        animate: { opacity: 1, scale: 1, y: 0 },
        transition: { duration: 1.4, ease: EASE },
      };

  const lineMotion = (delay: number) =>
    reduce
      ? { initial: false as const, animate: { opacity: 1, y: 0 } }
      : {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: { delay, duration: 1.1, ease: EASE },
        };

  return (
    <section ref={ref} className="fl-hero" aria-labelledby="fl-hero-title">
      <motion.div className="fl-hero__wash" style={{ opacity: bgOpacity }} aria-hidden />

      <motion.div className="fl-hero__scrim" aria-hidden />

      <motion.div className="fl-hero__content" style={{ opacity: contentOpacity, y: contentY }}>
        <motion.p className="fl-hero__eyebrow" {...lineMotion(0.1)}>
          {FOUNDER_LETTER.eyebrow}
        </motion.p>

        <h1 id="fl-hero-title" className="fl-hero__title">
          <span className="fl-hero__title-line">
            <motion.span className="fl-hero__title-word" {...lineMotion(0.25)}>
              {FOUNDER_LETTER.title.split("&")[0]}
            </motion.span>
          </span>
          <span className="fl-hero__title-line">
            <motion.span
              className="fl-hero__title-word fl-hero__title-word--gold"
              {...lineMotion(0.4)}
            >
              & {FOUNDER_LETTER.title.split("&")[1]}
            </motion.span>
          </span>
        </h1>

        <motion.p className="fl-hero__sub" {...lineMotion(0.55)}>
          {FOUNDER_LETTER.heroSub}
        </motion.p>

        <motion.div className="fl-hero__meta" {...lineMotion(0.7)}>
          {FOUNDER_LETTER.heroMeta.map((item) => (
            <span key={item} className="fl-hero__meta-item">
              {item}
            </span>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        className="fl-hero__portrait-wrap"
        style={{ y: portraitY, scale: portraitScale, opacity: contentOpacity }}
      >
        <div className="fl-hero__portrait-frame">
          <Image
            src={PORTRAIT.src}
            alt={PORTRAIT.alt}
            fill
            priority
            sizes="(min-width: 1024px) 460px, 74vw"
            className="fl-hero__portrait-img"
          />
          <div className="fl-hero__portrait-shade" aria-hidden />
          <div className="fl-hero__portrait-caption">
            <span>{PORTRAIT.note}</span>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="fl-hero__brand"
        style={{ opacity: contentOpacity, y: contentY }}
        aria-hidden
      >
        <span className="fl-hero__brand-name">{FOUNDER_LETTER.brand}</span>
        <span className="fl-hero__brand-sub">{FOUNDER_LETTER.brandSub}</span>
      </motion.div>

      <motion.div className="fl-hero__veil" style={{ filter: bgFilter }} aria-hidden />
    </section>
  );
}
