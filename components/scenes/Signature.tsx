"use client";

import { RefObject } from "react";
import { motion, useTransform } from "framer-motion";
import { FOUNDER } from "@/components/founder-letter/constants";
import { useAmplitude, usePinnedScene } from "@/hooks/useScrollScene";

function enter(progress: number, start: number, end: number) {
  if (progress <= start) return 0;
  if (progress >= end) return 1;
  return (progress - start) / (end - start);
}

export default function Signature({ sectionRef }: { sectionRef: RefObject<HTMLElement | null> }) {
  const amp = useAmplitude();
  const { progress, style } = usePinnedScene(sectionRef, {
    lengthVh: 260,
    mobileLengthVh: 210,
    smooth: false,
  });

  const textO = useTransform(progress, (v) => enter(v, 0.08, 0.34));
  const textY = useTransform(progress, (v) => (1 - enter(v, 0.08, 0.34)) * 36 * amp);
  const textBlur = useTransform(progress, (v) => {
    const t = 1 - enter(v, 0.08, 0.34);
    return `blur(${10 * t}px)`;
  });

  const sigO = useTransform(progress, (v) => enter(v, 0.22, 0.48));
  const sigY = useTransform(progress, (v) => (1 - enter(v, 0.22, 0.48)) * 40 * amp);
  const draw1 = useTransform(progress, (v) => enter(v, 0.34, 0.62));
  const draw2 = useTransform(progress, (v) => enter(v, 0.48, 0.72));
  const ruleScale = useTransform(progress, (v) => enter(v, 0.52, 0.68));

  return (
    <section ref={sectionRef} style={style} className="relative bg-ink">
      <div className="sticky top-0 flex h-[100dvh] flex-col pb-[calc(3.5rem+env(safe-area-inset-bottom))] md:h-screen">

        <div className="mx-auto flex w-full max-w-[1600px] flex-1 items-center px-5 pt-8 sm:px-6 md:px-14 md:pt-0">
          <div className="grid w-full items-end gap-10 md:grid-cols-12 md:gap-10">
            <motion.div
              style={{ opacity: textO, y: textY, filter: textBlur }}
              className="md:col-span-6 md:col-start-1 lg:col-span-5"
            >
              <h2 className="font-display text-[clamp(1.45rem,6.5vw,2.6rem)] font-light leading-[1.24] tracking-[-0.02em] text-paper md:leading-[1.22]">
                Together, we are building more than a financial institution — we are creating an{" "}
                <em className="italic text-brass">enduring legacy</em> founded on excellence,
                integrity, responsible stewardship, and lasting relationships.
              </h2>
            </motion.div>

            <motion.div
              style={{ opacity: sigO, y: sigY }}
              className="md:col-span-5 md:col-start-8 lg:col-start-8"
            >
              <div className="w-full max-w-[380px] md:ml-auto">
                <svg viewBox="0 0 340 160" className="w-full" aria-label="Signature flourish">
                  <motion.path
                    d="M18 118 C60 30 120 24 138 66 C150 96 128 116 112 104 C96 92 118 62 158 58 C204 53 224 84 268 74 C292 68 306 56 314 44"
                    fill="none"
                    stroke="var(--color-brass)"
                    strokeWidth={1.5}
                    strokeLinecap="round"
                    style={{ pathLength: draw1 }}
                  />
                  <motion.path
                    d="M28 134 C110 150 226 142 312 116"
                    fill="none"
                    stroke="var(--color-brass)"
                    strokeWidth={1}
                    strokeLinecap="round"
                    style={{ pathLength: draw2 }}
                  />
                </svg>

                <div className="mt-6 flex flex-col items-start text-left md:items-end md:text-right">
                  <motion.div
                    aria-hidden
                    style={{ scaleX: ruleScale }}
                    className="mb-5 h-px w-24 origin-left bg-gradient-to-r from-brass to-transparent md:origin-right md:bg-gradient-to-l"
                  />
                  <p className="font-display text-[clamp(1.4rem,2.4vw,1.9rem)] italic text-paper">
                    {FOUNDER.name}
                  </p>
                  <p className="mt-2 font-tmono text-[10px] uppercase tracking-[0.28em] text-paper/55">
                    {FOUNDER.title}
                  </p>
                  <p className="mt-1 font-tmono text-[10px] uppercase tracking-[0.22em] text-paper/40">
                    {FOUNDER.org}
                  </p>
                  <p className="mt-1 font-tmono text-[10px] uppercase tracking-[0.22em] text-paper/40">
                    {FOUNDER.fullPlace}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
