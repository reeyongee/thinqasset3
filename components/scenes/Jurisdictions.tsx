"use client";

import { RefObject } from "react";
import { motion, MotionValue, useTransform } from "framer-motion";
import CardGhostNumber from "@/components/primitives/CardGhostNumber";
import Kicker from "@/components/primitives/Kicker";
import { useAmplitude, usePinnedScene } from "@/hooks/useScrollScene";

const J = [
  {
    n: "01",
    name: "United Arab Emirates",
    role: "Headquarters",
    detail:
      "Established in the Dubai International Financial Centre — the strategic anchor of the group and home of its holding mandate.",
    tag: "DIFC · UAE",
    coords: "25.20° N — 55.27° E",
  },
  {
    n: "02",
    name: "Luxembourg",
    role: "European Domicile",
    detail:
      "Regulated fund management and investment vehicles at the heart of the European Union.",
    tag: "EU",
    coords: "49.61° N — 6.13° E",
  },
  {
    n: "03",
    name: "Mauritius",
    role: "Indian Ocean Gateway",
    detail:
      "Investment structures bridging Africa, the Indian Ocean rim and Asian growth corridors.",
    tag: "MUS",
    coords: "20.35° S — 57.55° E",
  },
];

function windowFor(i: number, n: number) {
  const a = i / n;
  const b = (i + 1) / n;
  return {
    inS: Math.max(a - 0.06, 0),
    inE: a + 0.02,
    outS: b - 0.04,
    outE: Math.min(b + 0.04, 1),
  };
}

function Plate({ p, i, j, amp }: { p: MotionValue<number>; i: number; j: (typeof J)[0]; amp: number }) {
  const n = J.length;
  const w = windowFor(i, n);
  const input = [w.inS, w.inE, w.outS, w.outE];
  const output = i === 0 ? [1, 1, 1, 0] : i === n - 1 ? [0, 1, 1, 1] : [0, 1, 1, 0];

  const opacity = useTransform(p, input, output, { clamp: true });
  const y = useTransform(p, input, [26 * amp, 0, 0, -20 * amp], { clamp: true });

  return (
    <motion.div style={{ opacity, y }} className="absolute inset-0 will-change-transform">
      <div className="relative flex h-full flex-col justify-between overflow-hidden border border-line bg-ink2/70 p-5 sm:p-7 md:p-12">
        <CardGhostNumber n={j.n} />
        <div className="flex items-baseline justify-between border-b border-line pb-4 font-tmono text-[10px] uppercase tracking-[0.28em]">
          <span className="text-paper/70">{j.role}</span>
          <span className="text-paper/40">
            {j.n} / 0{n}
          </span>
        </div>

        <div>
          <h3 className="font-display text-[clamp(1.85rem,8vw,4rem)] font-light leading-[1.04] md:leading-[1.02]">
            {j.name}
          </h3>
          <div className="mt-6 h-px w-16 bg-brass/60" />
          <p className="mt-6 max-w-[46ch] text-sm leading-relaxed text-paper/65 md:text-base">
            {j.detail}
          </p>
        </div>

        <p className="font-tmono text-[10px] tracking-[0.28em] text-paper/40">
          {j.tag} · {j.coords}
        </p>
      </div>
    </motion.div>
  );
}

function IndexRow({ p, i, j }: { p: MotionValue<number>; i: number; j: (typeof J)[0] }) {
  const a = i / J.length;
  const bar = useTransform(p, [a + 0.02, a + 0.14], [0, 1], { clamp: true });
  const active = useTransform(p, [a, a + 0.06], [0.45, 1], { clamp: true });

  return (
    <motion.div style={{ opacity: active }} className="space-y-2">
      <div className="flex items-baseline gap-4">
        <span className="font-tmono text-[10px] tracking-[0.28em] text-paper/40">{j.n} / 0{J.length}</span>
        <span className="font-display text-2xl font-light md:text-3xl">{j.name}</span>
      </div>
      <div className="h-px w-full bg-line">
        <motion.div style={{ scaleX: bar }} className="h-px origin-left bg-brass" />
      </div>
    </motion.div>
  );
}

export default function Jurisdictions({ sectionRef }: { sectionRef: RefObject<HTMLElement | null> }) {
  const amp = useAmplitude();
  const { progress, style } = usePinnedScene(sectionRef, {
    lengthVh: 340,
    mobileLengthVh: 240,
    smooth: true,
  });
  const lineScale = useTransform(progress, [0, 0.95], [0, 1], { clamp: true });

  return (
    <section ref={sectionRef} style={style} className="relative bg-ink">
      <div className="sticky top-0 h-[100dvh] overflow-hidden pb-[calc(3.5rem+env(safe-area-inset-bottom))] md:h-screen">
        <div aria-hidden className="bg-columns absolute inset-0 opacity-60" />

        <div className="mx-auto grid h-full max-w-[1600px] grid-rows-[auto_1fr] items-stretch gap-6 px-5 pt-[6rem] md:grid-cols-12 md:grid-rows-none md:items-center md:gap-12 md:px-14 md:pt-16">
          {/* LEFT — index (desktop only) */}
          <div className="hidden space-y-9 md:col-span-5 md:block">
            <Kicker>Established in DIFC — Dubai</Kicker>
            <p className="max-w-[38ch] text-sm leading-relaxed text-paper/55">
              A strategic holding company for a diversified portfolio of regulated financial
              services and investment businesses spanning three jurisdictions.
            </p>
            <div className="space-y-7">
              {J.map((j, i) => (
                <IndexRow key={j.n} p={progress} i={i} j={j} />
              ))}
            </div>
          </div>

          {/* mobile kicker */}
          <div className="md:hidden">
            <Kicker>Established in DIFC — Dubai</Kicker>
          </div>

          {/* plates */}
          <div className="relative min-h-0 md:col-span-7">
            <div className="absolute -top-8 left-0 right-0 hidden h-px bg-line md:block">
              <motion.div style={{ scaleX: lineScale }} className="h-px origin-left bg-brass/60" />
            </div>
            <div className="relative h-full min-h-[46dvh] md:h-[62vh]">
              {J.map((j, i) => (
                <Plate key={j.n} p={progress} i={i} j={j} amp={amp} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
