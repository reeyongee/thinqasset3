"use client";

import { RefObject } from "react";
import { motion, MotionValue, useTransform } from "framer-motion";
import Kicker from "@/components/primitives/Kicker";
import { useAmplitude, usePinnedScene } from "@/hooks/useScrollScene";
import { useIsPhoneViewport } from "@/hooks/useIsPhoneViewport";

const D =
  "M70 310 C180 214 300 186 400 210 C520 240 560 288 650 282 C760 274 800 208 880 192 C980 172 1064 214 1130 252";

const NODES = [
  { x: 70, y: 310, t: 0.08, name: "DIFC · DUBAI", sub: "Headquarters — established", below: true },
  { x: 400, y: 210, t: 0.38, name: "INDIA", sub: "Regulatory presence — advancing", below: false },
  { x: 650, y: 282, t: 0.56, name: "PRIVATE CREDIT FUND I", sub: "Inaugural fund — in formation", below: true },
  { x: 880, y: 192, t: 0.76, name: "SINGAPORE", sub: "Planned expansion", below: false },
  { x: 1130, y: 252, t: 0.94, name: "LONDON", sub: "Planned expansion", below: true },
];

const ROUTE_X0 = 70;
const ROUTE_X1 = 1130;

function Node({ p, n }: { p: MotionValue<number>; n: (typeof NODES)[0] }) {
  const on = useTransform(p, [n.t - 0.05, n.t], [0, 1], { clamp: true });
  const labelO = useTransform(p, [n.t, n.t + 0.05], [0, 1], { clamp: true });
  const labelY = useTransform(p, [n.t, n.t + 0.05], [10, 0], { clamp: true });
  const halo = useTransform(p, [n.t, n.t + 0.04, n.t + 0.14], [0, 0.8, 0], { clamp: true });

  const ly = n.below ? n.y + 30 : n.y - 40;

  return (
    <g>
      <motion.circle cx={n.x} cy={n.y} r={10} fill="none" stroke="var(--color-brass)" strokeWidth={1} style={{ opacity: halo }} />
      <circle cx={n.x} cy={n.y} r={4.5} fill="none" stroke="color-mix(in srgb, var(--color-paper) 35%, transparent)" strokeWidth={1} />
      <motion.circle cx={n.x} cy={n.y} r={4.5} fill="var(--color-brass)" style={{ opacity: on }} />
      <motion.g style={{ opacity: labelO, y: labelY }}>
        <text x={n.x} y={ly} textAnchor="middle" fill="color-mix(in srgb, var(--color-paper) 85%, transparent)" fontSize={11} style={{ letterSpacing: "0.22em" }} className="font-tmono">
          {n.name}
        </text>
        <text x={n.x} y={ly + 16} textAnchor="middle" fill="color-mix(in srgb, var(--color-paper) 40%, transparent)" fontSize={9.5} style={{ letterSpacing: "0.16em" }} className="font-tmono">
          {n.sub}
        </text>
      </motion.g>
    </g>
  );
}

function RoutePaths({ draw }: { draw: MotionValue<number> }) {
  return (
    <>
      <path d={D} fill="none" stroke="color-mix(in srgb, var(--color-paper) 16%, transparent)" strokeWidth={1.5} strokeDasharray="1 8" strokeLinecap="round" />
      <motion.path d={D} fill="none" stroke="var(--color-brass)" strokeWidth={1.5} strokeLinecap="round" style={{ pathLength: draw }} />
    </>
  );
}

function RouteMapDesktop({
  progress,
  draw,
  scale,
  x,
}: {
  progress: MotionValue<number>;
  draw: MotionValue<number>;
  scale: MotionValue<number>;
  x: MotionValue<string>;
}) {
  return (
    <motion.div style={{ scale, x }} className="mx-auto w-full max-w-[1400px] -translate-y-10 will-change-transform">
      <svg viewBox="0 35 1200 395" className="h-auto w-full" role="img" aria-label="ThinqAsset expansion route: Dubai, India, Singapore, London">
        <RoutePaths draw={draw} />
        {NODES.map((n) => (
          <Node key={n.name} p={progress} n={n} />
        ))}
      </svg>
    </motion.div>
  );
}

function RouteMapMobile({ progress, draw }: { progress: MotionValue<number>; draw: MotionValue<number> }) {
  const VIEW_W = 460;
  const VIEW_H = 230;
  const VIEW_Y = 145;

  const viewBox = useTransform(draw, (t) => {
    const lead = ROUTE_X0 + t * (ROUTE_X1 - ROUTE_X0);
    const x = Math.max(0, Math.min(1200 - VIEW_W, lead - VIEW_W * 0.28));
    return `${x} ${VIEW_Y} ${VIEW_W} ${VIEW_H}`;
  });

  return (
    <div className="relative mx-auto w-full min-h-[44dvh] overflow-hidden">
      <motion.svg
        viewBox={viewBox}
        preserveAspectRatio="xMidYMid meet"
        className="h-full min-h-[44dvh] w-full"
        role="img"
        aria-label="ThinqAsset expansion route: Dubai, India, Singapore, London"
      >
        <RoutePaths draw={draw} />
        {NODES.map((n) => (
          <Node key={n.name} p={progress} n={n} />
        ))}
      </motion.svg>
    </div>
  );
}

export default function Expansion({ sectionRef }: { sectionRef: RefObject<HTMLElement | null> }) {
  const amp = useAmplitude();
  const isPhone = useIsPhoneViewport();
  const { progress, style } = usePinnedScene(sectionRef, {
    lengthVh: 360,
    mobileLengthVh: 250,
    smooth: true,
  });

  const draw = useTransform(progress, [0.08, 0.92], [0, 1], { clamp: true });
  const scale = useTransform(progress, [0, 1], [1 + 0.07 * amp, 1]);
  const x = useTransform(progress, [0, 1], [`${3 * amp}%`, `${-3 * amp}%`]);

  return (
    <section ref={sectionRef} style={style} className="relative bg-ink">
      <div className="sticky top-0 flex h-[100dvh] flex-col justify-between overflow-hidden px-5 py-8 pb-[calc(3.5rem+env(safe-area-inset-bottom))] sm:px-6 sm:py-10 md:h-screen md:px-14">

        <div className="mx-auto mt-[4.5rem] grid w-full max-w-[1600px] gap-5 md:mt-14 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-7">
            <Kicker>Growth, with purpose and conviction</Kicker>
            <h2 className="mt-4 font-display text-[clamp(1.85rem,8vw,4.8rem)] font-light leading-[1.04] md:mt-6 md:leading-[1.02]">
              A platform bridging the world&rsquo;s financial centres.
            </h2>
          </div>
          <p className="text-sm leading-relaxed text-paper/55 md:col-span-4 md:col-start-9 md:self-end">
            Advancing our regulatory presence in India and preparing our inaugural Private Credit
            Fund — with Singapore and London next on the map.
          </p>
        </div>

        {isPhone ? (
          <RouteMapMobile progress={progress} draw={draw} />
        ) : (
          <RouteMapDesktop progress={progress} draw={draw} scale={scale} x={x} />
        )}

        <div className="relative -mx-1 md:mx-0">
          <div className="overflow-x-auto px-1 pb-1 [-ms-overflow-style:none] [scrollbar-width:none] md:overflow-visible md:pb-0 [&::-webkit-scrollbar]:hidden">
            <div className="mx-auto flex w-max min-w-full max-w-[1600px] flex-nowrap items-center gap-x-3 gap-y-2 font-tmono text-[8px] uppercase tracking-[0.22em] sm:text-[10px] sm:tracking-[0.3em] md:flex-wrap md:gap-x-4">
              {NODES.map((n, i) => (
                <TickerItem key={n.name} p={progress} t={n.t} name={n.name} arrow={i < NODES.length - 1} />
              ))}
              <span className="ml-0 hidden text-paper/35 md:ml-auto md:block">— Active route ··· Planned</span>
            </div>
          </div>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-ink to-transparent md:hidden"
          />
        </div>
      </div>
    </section>
  );
}

function TickerItem({ p, t, name, arrow }: { p: MotionValue<number>; t: number; name: string; arrow: boolean }) {
  const o = useTransform(p, [t - 0.03, t + 0.02], [0.25, 1], { clamp: true });
  return (
    <motion.span style={{ opacity: o }} className="flex items-center gap-4">
      <span>{name}</span>
      {arrow && <span className="text-brass">→</span>}
    </motion.span>
  );
}
