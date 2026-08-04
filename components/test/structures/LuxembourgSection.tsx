"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";
import { useScene } from "./hooks/useScene";
import { Dot, SpinePath } from "./tree/svg";
import WordReveal from "./motion/WordReveal";

const levels = [
  { n: "01", label: "Commit", title: "Limited Partners", note: "Capital commitment", focal: false },
  { n: "02", label: "Manage", title: "General Partner", note: "Fund management", focal: false },
  { n: "03", label: "Hold", title: "Investment Fund", note: "The vehicle", focal: true },
  { n: "04", label: "Own", title: "Portfolio Companies", note: "Underlying assets", focal: false },
];

/* One cascade level — own hooks at top level (rules-of-hooks compliant) */
function Level({
  p,
  level,
  index,
}: {
  p: MotionValue<number>;
  level: (typeof levels)[number];
  index: number;
}) {
  const o = useTransform(p, [0.12 + index * 0.17, 0.22 + index * 0.17], [0, 1]);
  const y = useTransform(p, [0.12 + index * 0.17, 0.22 + index * 0.17], [28, 0]);
  const tick = useTransform(p, [0.16 + index * 0.17, 0.24 + index * 0.17], [0, 1]);
  const dot = useTransform(p, [0.14 + index * 0.17, 0.2 + index * 0.17], [0, 1]);
  const numY = useTransform(p, [0, 1], [60 + index * 20, -60 - index * 20]); // numerals drift at different velocities

  return (
    <div className="relative grid grid-cols-12 gap-6 py-10 md:py-14">
      <Dot progress={dot} className="left-0 top-1/2 -translate-y-1/2" />
      <motion.span
        style={{ scaleX: tick }}
        aria-hidden
        className="absolute left-0 top-1/2 h-px w-8 origin-left bg-line md:w-12"
      />

      <motion.div style={{ opacity: o, y }} className="col-span-10 pl-8 md:col-span-7 md:pl-12">
        <p className="marker mb-3">{level.label}</p>
        {level.focal ? (
          <div className="inline-block bg-ink px-7 py-6 text-paper">
            <h3 className="font-display text-3xl md:text-4xl">{level.title}</h3>
            <p className="mt-2 text-xs text-paper/70">{level.note}</p>
          </div>
        ) : (
          <>
            <h3 className="font-display text-3xl md:text-4xl">{level.title}</h3>
            <p className="mt-2 text-sm text-muted">{level.note}</p>
          </>
        )}
      </motion.div>

      <motion.div
        style={{ y: numY }}
        className="pointer-events-none col-span-2 hidden select-none items-center justify-end md:flex"
      >
        <span className="font-display text-[7rem] leading-none text-ink/[0.06] lg:text-[9rem]">
          {level.n}
        </span>
      </motion.div>
    </div>
  );
}

export default function LuxembourgSection() {
  const ref = useRef(null);
  const p = useScene(ref);
  const rail = useTransform(p, [0.08, 0.85], [0, 1]);

  return (
    <section ref={ref} id="luxembourg" className="scroll-mt-28 border-t border-line py-28 md:py-40">
      <div className="container-ed">
        <div className="grid grid-cols-12 gap-6">
          <h2 className="col-span-12 font-display text-[clamp(2.75rem,6vw,6rem)] leading-[0.95] tracking-tight md:col-span-7">
            <WordReveal text="The cascade institutional" />
            <WordReveal accent={["LPs"]} text="LPs" />
            <WordReveal accent={["already"]} text="already know." />
          </h2>
        </div>

        <div className="relative mt-16 md:ml-[8.333%] md:mr-[16.666%] md:mt-24">
          <SpinePath progress={rail} className="absolute left-0 top-0 h-full w-px" />
          <motion.span
            style={{ opacity: useTransform(p, [0.1, 0.2], [0, 1]) }}
            aria-hidden
            className="absolute -left-8 top-0 hidden [writing-mode:vertical-rl] marker md:block"
          >
            Capital &amp; control ↓
          </motion.span>

          {levels.map((l, i) => (
            <Level key={l.n} p={p} level={l} index={i} />
          ))}
        </div>

        <div className="mt-24 grid grid-cols-12 gap-6 md:mt-32">
          <div className="col-span-12 md:col-span-6 md:col-start-6">
            <p className="marker mb-6 text-accent">Reference architecture</p>
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-[34ch] font-display text-2xl leading-snug md:text-3xl"
            >
              LPs commit via the GP; the fund holds the portfolio companies. Familiar to
              allocators and counterparties.
            </motion.p>
            <p className="mt-8 text-xs text-muted">/services/luxembourg-gp-lp</p>
          </div>
        </div>
      </div>
    </section>
  );
}
