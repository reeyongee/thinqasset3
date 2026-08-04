"use client";

import { RefObject } from "react";
import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import CardGhostNumber from "@/components/primitives/CardGhostNumber";
import Kicker from "@/components/primitives/Kicker";
import { useAmplitude } from "@/hooks/useScrollScene";
import { useIsPhoneViewport } from "@/hooks/useIsPhoneViewport";

const CARDS = [
  {
    idx: "01",
    tag: "Funds",
    title: "Regulated Fund Management",
    body: "Multi-strategy investment funds operated under disciplined regulatory oversight and governance.",
  },
  {
    idx: "02",
    tag: "Assets",
    title: "Asset Management",
    body: "Long-horizon portfolio stewardship and institutional mandates across global markets.",
  },
  {
    idx: "03",
    tag: "Institutional",
    title: "Institutional Investment Solutions",
    body: "Bespoke vehicles for sovereign, corporate, family-office and multinational capital.",
  },
  {
    idx: "04",
    tag: "Structuring",
    title: "Corporate Structuring & Establishment",
    body: "Cross-border entities, holding structures and market-entry architecture for entrepreneurs.",
  },
  {
    idx: "05",
    tag: "Governance",
    title: "Regulatory, Compliance & Governance Advisory",
    body: "Compliance architecture, governance and strategic outsourced services — without compromise.",
  },
];

function StackCard({
  p,
  i,
  n,
  c,
  amp,
  introEnd,
  cardsEnd,
  holdEnd,
}: {
  p: MotionValue<number>;
  i: number;
  n: number;
  c: (typeof CARDS)[0];
  amp: number;
  introEnd: number;
  cardsEnd: number;
  holdEnd: number;
}) {
  const slot = (cardsEnd - introEnd) / n;
  const enterStart = introEnd + i * slot;
  const enterEnd = introEnd + (i + 1) * slot;
  const ramp = slot * 0.55;

  const y = useTransform(p, (v) => {
    if (v < enterStart) return `${105 * amp}%`;
    if (v < enterEnd) {
      const t = (v - enterStart) / (enterEnd - enterStart);
      return `${(1 - t) * 105 * amp}%`;
    }
    if (v < holdEnd) return "0%";
    const t = (v - holdEnd) / (1 - holdEnd);
    return `${-t * 110 * amp}%`;
  });

  const shellOpacity = useTransform(
    p,
    [enterStart, enterStart + 0.02, holdEnd - 0.02, holdEnd],
    [0, 1, 1, 0],
    { clamp: true },
  );
  const contentOpacity = useTransform(p, [enterStart, enterStart + ramp], [0, 1], {
    clamp: true,
  });

  const flip = i % 2 === 1;

  return (
    <motion.div
      style={{ y, opacity: shellOpacity, zIndex: i + 1 }}
      className="absolute inset-x-3 bottom-[calc(5vh+3.5rem+env(safe-area-inset-bottom))] top-[10vh] will-change-transform sm:inset-x-4 md:inset-x-12 md:top-[11vh]"
    >
      <div className="relative flex h-full flex-col justify-between overflow-hidden border border-line bg-ink2 px-5 py-6 sm:px-6 sm:py-8 md:px-14 md:py-12">
        <CardGhostNumber n={c.idx} />

        <motion.div
          style={{ opacity: contentOpacity }}
          className="flex h-full flex-col justify-between"
        >
          <div className="flex items-baseline justify-between border-b border-line pb-4 font-tmono text-[10px] uppercase tracking-[0.28em]">
            <span className="text-paper/70">{c.tag}</span>
            <span className="text-paper/40">
              {c.idx} / 0{n}
            </span>
          </div>

          <div className="grid items-end gap-6 md:grid-cols-12 md:gap-8">
            <h3
              className={`font-display text-[clamp(1.55rem,7.5vw,3.9rem)] font-light leading-[1.06] md:col-span-7 md:leading-[1.04] ${
                flip ? "md:order-2 md:col-start-6" : ""
              }`}
            >
              {c.title}
            </h3>
            <div className={`md:col-span-4 ${flip ? "md:order-1 md:col-start-1" : "md:col-start-9"}`}>
              <div className="mb-4 h-px w-10 bg-brass/40" />
              <p className="text-sm leading-relaxed text-paper/65 md:text-[15px]">{c.body}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function Capabilities({ sectionRef }: { sectionRef: RefObject<HTMLElement | null> }) {
  const amp = useAmplitude();
  const isPhone = useIsPhoneViewport();
  const n = CARDS.length;
  const introEnd = 0.14;
  const cardsEnd = 0.68;
  const holdEnd = 0.86;
  const sectionUnits = n + 3;

  const { scrollYProgress: p } = useScroll({
    target: sectionRef as RefObject<HTMLElement>,
    offset: ["start start", "end end"] as never,
  });

  const introO = useTransform(p, [introEnd * 0.55, introEnd], [1, 0], { clamp: true });
  const introY = useTransform(p, [introEnd * 0.55, introEnd], [0, -60 * amp], { clamp: true });

  return (
    <section
      ref={sectionRef}
      style={{ height: `${sectionUnits * (isPhone ? 82 : 100)}vh` }}
      className="relative bg-ink text-paper"
    >
      <div className="sticky top-0 h-[100dvh] overflow-hidden pb-[calc(3.5rem+env(safe-area-inset-bottom))] md:h-screen">

        {/* Intro screen — burns away as the stack arrives */}
        <motion.div
          style={{ opacity: introO, y: introY }}
          className="absolute inset-0 z-0 flex flex-col justify-center px-5 sm:px-6 md:px-14"
        >
          <div className="mx-auto w-full max-w-[1600px]">
            <Kicker>An integrated ecosystem</Kicker>
            <h2 className="mt-6 max-w-[16ch] font-display text-[clamp(2rem,9vw,5.4rem)] font-light leading-[1.05] md:mt-8 md:max-w-[18ch] md:leading-[1.03]">
              Beyond traditional investment management.
            </h2>
            <p className="mt-8 max-w-[52ch] leading-relaxed text-paper/65">
              From regulated fund management to corporate structuring, compliance and governance —
              one platform for entrepreneurs, family offices, institutions and multinationals to
              navigate complexity and scale with confidence.
            </p>
          </div>
        </motion.div>

        <div className="absolute inset-0">
          {CARDS.map((c, i) => (
            <StackCard
              key={c.idx}
              p={p}
              i={i}
              n={n}
              c={c}
              amp={amp}
              introEnd={introEnd}
              cardsEnd={cardsEnd}
              holdEnd={holdEnd}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
