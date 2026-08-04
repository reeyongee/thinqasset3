"use client";

import { RefObject } from "react";
import { motion, MotionValue, useTransform } from "framer-motion";
import { useAmplitude, usePinnedScene } from "@/hooks/useScrollScene";

const SEGMENTS: React.ReactNode[] = [
  <>At TBG Group Holding Ltd.,</>,
  <>we are driven by</>,
  <em key="1" className="italic text-brass">
    a singular purpose —
  </em>,
  <>to build an institution</>,
  <>that transcends generations,</>,
  <>creates enduring value,</>,
  <>and serves as a trusted steward of capital across global markets.</>,
];

function Phrase({
  p,
  i,
  n,
  children,
  amp,
}: {
  p: MotionValue<number>;
  i: number;
  n: number;
  amp: number;
  children: React.ReactNode;
}) {
  const start = 0.08 + (i / n) * 0.6;
  const end = start + 0.17;
  const opacity = useTransform(p, [start, end], [0.13, 1], { clamp: true });
  const y = useTransform(p, [start, end], [12 * amp, 0], { clamp: true });

  return (
    <motion.span style={{ opacity, y }} className="inline-block will-change-transform">
      {children}
    </motion.span>
  );
}

export default function Purpose({ sectionRef }: { sectionRef: RefObject<HTMLElement | null> }) {
  const amp = useAmplitude();
  const { progress, style } = usePinnedScene(sectionRef, {
    lengthVh: 260,
    mobileLengthVh: 190,
    smooth: true,
  });
  const glow = useTransform(progress, [0.15, 0.8], [0, 0.85], { clamp: true });

  return (
    <section ref={sectionRef} style={style} className="relative bg-ink">
      <div className="sticky top-0 flex h-[100dvh] items-center overflow-hidden pb-[calc(3.5rem+env(safe-area-inset-bottom))] md:h-screen">

        {/* LIGHTING — brass glow builds with conviction */}
        <motion.div
          aria-hidden
          style={{ opacity: glow }}
          className="absolute inset-0 bg-[radial-gradient(55%_45%_at_72%_38%,color-mix(in_srgb,var(--color-brass)_14%,transparent),transparent_70%)]"
        />
        {/* a single vertical measure of progress */}
        <motion.span
          aria-hidden
          style={{ scaleY: progress }}
          className="absolute right-10 top-[20vh] hidden h-[60vh] w-px origin-top bg-brass/50 md:block"
        />

        <div className="mx-auto flex w-full max-w-[1600px] justify-center px-5 md:px-14">
          <p className="mx-auto max-w-[38ch] text-balance text-center font-display text-[clamp(1.45rem,5vw,2.35rem)] font-light leading-[1.32] text-paper/90 sm:max-w-[42ch] md:max-w-[48ch] md:leading-[1.3]">
            {SEGMENTS.map((s, i) => (
              <span key={i}>
                <Phrase p={progress} i={i} n={SEGMENTS.length} amp={amp}>
                  {s}
                </Phrase>{" "}
              </span>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}
