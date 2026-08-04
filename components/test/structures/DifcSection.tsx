"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";
import { useScene } from "./hooks/useScene";
import { Dot, SpinePath } from "./tree/svg";
import WordReveal from "./motion/WordReveal";

const sleeves = [
  { label: "Cell A", title: "Gulf Investment Sleeve", items: "Regional PE · Real estate · Infrastructure" },
  { label: "Cell B", title: "Middle East Strategy", items: "Private markets · Listed securities · VC" },
  { label: "Cell C", title: "GCC Focus Cell", items: "Growth equity · Technology · Healthcare" },
];

/* One sleeve row — own hooks at top level (rules-of-hooks compliant) */
function SleeveRow({
  p,
  sleeve,
  index,
}: {
  p: MotionValue<number>;
  sleeve: (typeof sleeves)[number];
  index: number;
}) {
  const o = useTransform(p, [0.3 + index * 0.16, 0.4 + index * 0.16], [0, 1]);
  const x = useTransform(p, [0.3 + index * 0.16, 0.4 + index * 0.16], [20, 0]);
  const tick = useTransform(p, [0.34 + index * 0.16, 0.42 + index * 0.16], [0, 1]);
  const dot = useTransform(p, [0.32 + index * 0.16, 0.38 + index * 0.16], [0, 1]);

  return (
    <motion.div
      style={{ opacity: o, x }}
      className="relative border-t border-line py-7 first:border-t-0"
    >
      <Dot progress={dot} className="-left-8 top-1/2 -translate-y-1/2 md:-left-12" />
      <motion.span
        style={{ scaleX: tick }}
        aria-hidden
        className="absolute left-0 top-1/2 h-px w-8 origin-left bg-line md:-left-0 md:w-12"
      />
      <div className="flex items-baseline justify-between">
        <p className="marker">{sleeve.label}</p>
        <span className="text-[10px] text-muted">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <h4 className="mt-2 font-display text-2xl">{sleeve.title}</h4>
      <p className="mt-2 text-sm text-muted">{sleeve.items}</p>
    </motion.div>
  );
}

export default function DifcSection() {
  const ref = useRef(null);
  const p = useScene(ref);

  const spine = useTransform(p, [0.12, 0.8], [0, 1]);
  const rootO = useTransform(p, [0.04, 0.12], [0, 1]);
  const rootX = useTransform(p, [0.04, 0.12], [16, 0]);
  const coreO = useTransform(p, [0.1, 0.2], [0, 1]);
  const coreX = useTransform(p, [0.1, 0.2], [16, 0]);

  return (
    <section ref={ref} id="difc" className="scroll-mt-28 border-t border-line py-28 md:py-40">
      <div className="container-ed grid grid-cols-12 gap-6">
        {/* Sticky sparse left */}
        <div className="col-span-12 lg:col-span-4">
          <div className="space-y-10 lg:sticky lg:top-28">
            <p className="marker">Structure 02 — DIFC</p>
            <h2 className="font-display text-[clamp(2.75rem,5vw,5rem)] leading-[0.95] tracking-tight">
              <WordReveal text="The Dubai" /> <WordReveal accent={["variant."]} text="variant." />
            </h2>
            <p className="max-w-[36ch] text-sm leading-relaxed text-muted">
              Structurally identical to Mauritius, relabelled for the DIFC — Gulf and
              Middle East sleeves under a DFSA-aligned core.
            </p>
            <div className="border-t border-line pt-6">
              <p className="marker mb-4 text-accent">On the same page — QIF</p>
              <ul className="space-y-2 text-sm text-muted">
                <li>Professional investors</li>
                <li>Rapid launch via regulated hosting</li>
                <li>Institutional governance</li>
              </ul>
            </div>
            <p className="text-xs text-muted">/services/difc-structures</p>
          </div>
        </div>

        {/* Dense right: left-spine tree */}
        <div className="col-span-12 lg:col-span-7 lg:col-start-6">
          <div className="relative pl-8 md:pl-12">
            <SpinePath progress={spine} className="absolute left-0 top-0 h-full w-px" />

            <motion.div style={{ opacity: rootO, x: rootX }} className="relative py-2">
              <Dot
                progress={useTransform(p, [0.06, 0.1], [0, 1])}
                className="-left-8 top-8 md:-left-12"
              />
              <p className="marker mb-3">Top — Capital</p>
              <h3 className="font-display text-3xl md:text-4xl">Global &amp; Professional Investors</h3>
            </motion.div>

            <motion.div style={{ opacity: coreO, x: coreX }} className="relative py-8">
              <Dot
                progress={useTransform(p, [0.14, 0.18], [0, 1])}
                className="-left-8 top-14 md:-left-12"
              />
              <div className="bg-ink px-8 py-8 text-paper md:px-10">
                <p className="marker mb-3 text-accentBright">DIFC — DFSA-aligned</p>
                <h3 className="font-display text-2xl leading-tight md:text-3xl">
                  Protected Cell Company
                </h3>
                <p className="mt-3 text-xs text-paper/70">
                  Shared governance · Regulated hosting · Institutional compliance
                </p>
              </div>
            </motion.div>

            {sleeves.map((s, i) => (
              <SleeveRow key={s.label} p={p} sleeve={s} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
