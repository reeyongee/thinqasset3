"use client";

import { ABOUT_HISTORY_IMAGE } from "@/components/about/constants";
import { QT_EASE } from "@/components/about/motionConstants";
import { GlowButton } from "@/components/ui/GlowButton";
import { TransitionLink } from "@/components/transition/TransitionLink";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import Image from "next/image";
import { useCallback } from "react";
import "./not-found.css";

const SPRING = { stiffness: 120, damping: 22, mass: 0.6 };

export function NotFoundExperience() {
  const reduceMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const springX = useSpring(pointerX, SPRING);
  const springY = useSpring(pointerY, SPRING);

  const blobGoldX = useTransform(springX, (v) => v * 28);
  const blobGoldY = useTransform(springY, (v) => v * 22);
  const astronautX = useTransform(springX, (v) => v * 14);
  const astronautY = useTransform(springY, (v) => v * 12);
  const sheenX = useTransform(springX, (v) => v * 36);
  const sheenY = useTransform(springY, (v) => v * 30);

  const onPointerMove = useCallback(
    (event: React.PointerEvent<HTMLElement>) => {
      if (reduceMotion) return;
      const rect = event.currentTarget.getBoundingClientRect();
      const nx = (event.clientX - rect.left) / rect.width - 0.5;
      const ny = (event.clientY - rect.top) / rect.height - 0.5;
      pointerX.set(nx);
      pointerY.set(ny);
    },
    [pointerX, pointerY, reduceMotion],
  );

  const onPointerLeave = useCallback(() => {
    pointerX.set(0);
    pointerY.set(0);
  }, [pointerX, pointerY]);

  const cardMotion = reduceMotion
    ? { initial: false as const, animate: { opacity: 1, y: 0 } }
    : {
        initial: { opacity: 0, y: 18 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.9, ease: QT_EASE },
      };

  const fadeUp = (delay: number) =>
    reduceMotion
      ? { initial: false as const, animate: { opacity: 1, y: 0 } }
      : {
          initial: { opacity: 0, y: 14 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.75, ease: QT_EASE, delay },
        };

  return (
    <section
      className="nf-section"
      data-transition-page
      aria-labelledby="nf-heading"
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      <motion.article className="nf-card" {...cardMotion}>
        <div className="nf-card__blobs" aria-hidden>
          <motion.div
            className="nf-blob nf-blob--gold nf-blob--drift-a"
            style={reduceMotion ? undefined : { x: blobGoldX, y: blobGoldY }}
          />
          <motion.div
            className="nf-blob nf-blob--sheen nf-blob--drift-c"
            style={
              reduceMotion
                ? { left: "38%", top: "42%" }
                : { x: sheenX, y: sheenY, left: "38%", top: "42%" }
            }
          />
        </div>

        <div className="nf-card__content">
          <motion.p className="nf-code" aria-hidden {...fadeUp(0.1)}>
            404
          </motion.p>
          <motion.h1
            id="nf-heading"
            className="nf-title"
            data-transition-text="headline"
            {...fadeUp(0.18)}
          >
            This page isn&apos;t on the register
          </motion.h1>
          <motion.p className="nf-copy" data-transition-text="body" {...fadeUp(0.26)}>
            The link may have been restructured, redeemed, or never cleared
            compliance. We&apos;ll route you back to audited ground.
          </motion.p>
          <motion.div className="nf-actions" data-transition-item {...fadeUp(0.34)}>
            <GlowButton href="/" variant="gold" transitionItem>
              Back to home
            </GlowButton>
            <TransitionLink href="/services" className="nf-link">
              Explore services
            </TransitionLink>
            <TransitionLink href="/contact" className="nf-link">
              Contact us
            </TransitionLink>
          </motion.div>
        </div>

        <div className="nf-visual-panel" aria-hidden>
          <div className="nf-visual-panel__glass" />
          <motion.div
            className="nf-astronaut-wrap"
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: QT_EASE, delay: 0.28 }}
            style={reduceMotion ? undefined : { x: astronautX, y: astronautY }}
          >
            <Image
              src={ABOUT_HISTORY_IMAGE.src}
              alt=""
              width={900}
              height={900}
              className="nf-astronaut"
              sizes="(min-width: 768px) 320px, 72vw"
              priority
            />
          </motion.div>
        </div>
      </motion.article>
    </section>
  );
}
