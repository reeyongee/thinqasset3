"use client";

import { motion, useMotionValueEvent, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { useScene } from "./hooks/useScene";
import { BranchPaths, Dot, TrunkPath } from "./tree/svg";

export default function MauritiusSection() {
  const pinRef = useRef(null);
  const p = useScene(pinRef);

  // Scrub ranges: root → trunk → core → trunk → rail → drops → cells
  const rootO = useTransform(p, [0, 0.08], [0, 1]);
  const rootY = useTransform(p, [0, 0.08], [24, 0]);
  const trunk1 = useTransform(p, [0.06, 0.16], [0, 1]);
  const coreO = useTransform(p, [0.14, 0.24], [0, 1]);
  const coreY = useTransform(p, [0.14, 0.24], [28, 0]);
  const trunk2 = useTransform(p, [0.22, 0.3], [0, 1]);
  const rail = useTransform(p, [0.3, 0.42], [0, 1]);
  const dropA = useTransform(p, [0.4, 0.5], [0, 1]);
  const dropB = useTransform(p, [0.44, 0.54], [0, 1]);
  const dropC = useTransform(p, [0.48, 0.58], [0, 1]);
  const junc = useTransform(p, [0.4, 0.46], [0, 1]);
  const cellAO = useTransform(p, [0.5, 0.6], [0, 1]);
  const cellAY = useTransform(p, [0.5, 0.6], [20, 0]);
  const cellBO = useTransform(p, [0.55, 0.65], [0, 1]);
  const cellBY = useTransform(p, [0.55, 0.65], [20, 0]);
  const cellCO = useTransform(p, [0.6, 0.7], [0, 1]);
  const cellCY = useTransform(p, [0.6, 0.7], [20, 0]);

  const [chapter, setChapter] = useState(0);
  useMotionValueEvent(p, "change", (v) =>
    setChapter(v < 0.22 ? 0 : v < 0.42 ? 1 : 2)
  );

  return (
    <section id="mauritius" className="scroll-mt-28">
      {/* Pinned scene */}
      <div ref={pinRef} className="h-auto md:h-[280vh]">
        <div className="md:sticky md:top-0 md:flex md:h-screen md:items-center md:overflow-hidden py-20 md:py-0">
          <div className="container-ed pin-tree">
            {/* Header */}
            <div className="grid grid-cols-12 gap-6 mb-10 md:mb-6">
              <div className="col-span-12 md:col-span-4">
                <p className="marker">Structure 01 — Mauritius</p>
              </div>
              <div className="col-span-12 md:col-span-8 md:text-right">
                <h2 className="font-display text-[clamp(2.5rem,5vw,5rem)] leading-[0.95] tracking-tight">
                  One entity, <em className="text-accent">three markets.</em>
                </h2>
              </div>
            </div>

            {/* Tree */}
            <motion.div
              style={{ opacity: rootO, y: rootY }}
              className="mx-auto max-w-md text-center"
            >
              <p className="marker mb-3">Top — Capital</p>
              <h3 className="font-display text-3xl md:text-4xl">Global Investors</h3>
              <p className="mt-2 text-sm text-muted">
                Institutional LPs · Family offices · HNWIs · DFIs
              </p>
            </motion.div>

            <TrunkPath progress={trunk1} className="mx-auto h-10 w-full md:h-14" />

            <motion.div
              style={{ opacity: coreO, y: coreY }}
              className="mx-auto w-full max-w-xl bg-ink px-8 py-8 text-paper md:px-12 md:py-10"
            >
              <p className="marker mb-3 text-accentBright">Mauritius — One Legal Entity</p>
              <h3 className="font-display text-2xl leading-tight md:text-3xl">
                Protected Cell Company
              </h3>
              <div className="mt-5 grid grid-cols-2 gap-x-6 gap-y-1.5 border-t border-paper/15 pt-4 text-xs text-paper/70">
                {["Shared board", "Administrator", "Auditor", "Compliance"].map((s) => (
                  <span key={s}>{s}</span>
                ))}
              </div>
            </motion.div>

            <TrunkPath progress={trunk2} className="mx-auto h-8 w-full md:h-12" />

            <div className="relative">
              <BranchPaths rail={rail} dropA={dropA} dropB={dropB} dropC={dropC} />
              <Dot progress={junc} className="left-[16.667%] top-0 -translate-x-1/2" />
              <Dot progress={junc} className="left-1/2 top-0 -translate-x-1/2" />
              <Dot progress={junc} className="left-[83.333%] top-0 -translate-x-1/2" />
            </div>

            <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-0">
              {[
                { o: cellAO, y: cellAY, i: "A", t: "India", items: ["Private equity", "Listed securities", "Venture capital", "Infrastructure"] },
                { o: cellBO, y: cellBY, i: "B", t: "Sri Lanka", items: ["Private companies", "Listed stocks", "Hotels & tourism", "Infrastructure"] },
                { o: cellCO, y: cellCY, i: "C", t: "Bangladesh", items: ["Growth equity", "Manufacturing", "Technology", "Healthcare"] },
              ].map((c) => (
                <motion.div
                  key={c.i}
                  style={{ opacity: c.o, y: c.y }}
                  className="group md:px-5 lg:px-8 md:first:pl-0 md:last:pr-0"
                >
                  <div className="border-t border-ink/25 pt-4 md:pt-5">
                    <div className="flex items-baseline justify-between">
                      <p className="marker">Cell {c.i}</p>
                      <span className="text-[10px] text-muted transition-colors group-hover:text-accent">
                        {c.i}
                      </span>
                    </div>
                    <h4 className="mt-2 font-display text-2xl leading-tight">{c.t}</h4>
                    <ul className="mt-3 space-y-1 text-sm text-muted">
                      {c.items.map((it) => (
                        <li key={it}>{it}</li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Chapter counter */}
            <div className="mt-10 hidden items-center gap-6 md:flex">
              {["Capital", "Core", "Cells"].map((c, i) => (
                <span
                  key={c}
                  className={`marker transition-colors duration-300 ${
                    chapter === i ? "text-accent" : "text-line"
                  }`}
                >
                  0{i + 1} {c}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Message after pin: void left, quote right */}
      <div className="container-ed py-24 md:py-32">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-8 md:col-start-5">
            <p className="marker mb-6 text-accent">Legal segregation</p>
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-[32ch] font-display text-2xl leading-snug md:text-3xl"
            >
              Each cell&rsquo;s assets and liabilities are segregated under Mauritius
              PCC law — one shared governance layer, cheaper and cleaner than three
              standalone funds.
            </motion.p>
            <p className="mt-8 text-xs text-muted">
              /services/mauritius-protected-cell-company
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
