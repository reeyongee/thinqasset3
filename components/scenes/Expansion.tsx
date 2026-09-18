"use client";

import { RefObject } from "react";
import { motion, MotionValue, useTransform } from "framer-motion";
import { usePinnedScene } from "@/hooks/useScrollScene";
import { useIsPhoneViewport } from "@/hooks/useIsPhoneViewport";

const WINDOW = 4;
const SIDE_PAD = 220;
const WORLD_W = 2840;
const VIEW_Y = 70;
const VIEW_H = 340;

const D =
  "M160 292 C280 210 400 168 520 188 C640 208 760 332 880 308 C1000 284 1120 178 1240 200 C1360 222 1480 324 1600 300 C1720 276 1840 170 1960 192 C2080 214 2200 312 2320 288 C2440 264 2560 186 2680 208";

type RouteNode = {
  x: number;
  y: number;
  t: number;
  name: string;
  sub: string;
  below: boolean;
};

const NODES: RouteNode[] = [
  { x: 160, y: 292, t: 0.1, name: "LUXEMBOURG", sub: "European anchor — established", below: true },
  { x: 520, y: 188, t: 0.214, name: "MAURITIUS", sub: "Operational HQ — established", below: false },
  { x: 880, y: 308, t: 0.329, name: "CAYMAN", sub: "Network partnership", below: true },
  { x: 1240, y: 200, t: 0.443, name: "DIFC · DUBAI", sub: "Headquarters — established", below: false },
  { x: 1600, y: 300, t: 0.557, name: "INDIA", sub: "Regulatory presence — advancing", below: true },
  { x: 1960, y: 192, t: 0.671, name: "PRIVATE CREDIT FUND I", sub: "Inaugural fund — in formation", below: false },
  { x: 2320, y: 288, t: 0.786, name: "SINGAPORE", sub: "Planned expansion", below: true },
  { x: 2680, y: 208, t: 0.9, name: "LONDON", sub: "Planned expansion", below: false },
];

const MAX_WINDOW_START = NODES.length - WINDOW;
const VIEW_W = NODES[WINDOW - 1].x - NODES[0].x + SIDE_PAD * 2;
const ARIA_LABEL = `ThinqAsset expansion route: ${NODES.map((n) => n.name).join(", ")}`;

function windowStartFromDraw(t: number) {
  const idx = t * (NODES.length - 1);
  return Math.max(0, Math.min(MAX_WINDOW_START, idx - (WINDOW - 1)));
}

function cameraXFromDraw(t: number) {
  const ws = windowStartFromDraw(t);
  const i0 = Math.floor(ws);
  const i1 = Math.min(i0 + 1, MAX_WINDOW_START);
  const f = ws - i0;
  const leftX = NODES[i0].x + (NODES[i1].x - NODES[i0].x) * f;
  const maxX = WORLD_W - VIEW_W;
  return Math.max(0, Math.min(maxX, leftX - SIDE_PAD));
}

function Node({
  p,
  n,
  cameraX,
  compact,
}: {
  p: MotionValue<number>;
  n: RouteNode;
  cameraX: MotionValue<number>;
  compact: boolean;
}) {
  const on = useTransform(p, [n.t - 0.05, n.t], [0, 1], { clamp: true });
  const revealed = useTransform(p, [n.t - 0.04, n.t + 0.02], [0.42, 1], { clamp: true });
  const inWindow = useTransform(cameraX, (cx) => {
    const fade = 110;
    if (n.x <= cx || n.x >= cx + VIEW_W) return 0;
    if (n.x < cx + fade) return (n.x - cx) / fade;
    if (n.x > cx + VIEW_W - fade) return (cx + VIEW_W - n.x) / fade;
    return 1;
  });
  const labelO = useTransform([inWindow, revealed], ([w, r]) => Number(w) * Number(r));
  const halo = useTransform(p, [n.t, n.t + 0.04, n.t + 0.14], [0, 0.8, 0], { clamp: true });

  const nameY = n.below ? n.y + 36 : n.y - 44;
  const subY = nameY + 16;
  const nameSize = compact ? 15 : 12;
  const subSize = compact ? 11 : 9.5;
  const nameTracking = compact ? "0.14em" : "0.2em";

  return (
    <g>
      <motion.circle
        cx={n.x}
        cy={n.y}
        r={10}
        fill="none"
        stroke="var(--color-brass)"
        strokeWidth={1}
        style={{ opacity: halo }}
      />
      <circle
        cx={n.x}
        cy={n.y}
        r={4.5}
        fill="none"
        stroke="color-mix(in srgb, var(--color-paper) 35%, transparent)"
        strokeWidth={1}
      />
      <motion.circle cx={n.x} cy={n.y} r={4.5} fill="var(--color-brass)" style={{ opacity: on }} />
      <motion.g style={{ opacity: labelO }}>
        <text
          x={n.x}
          y={nameY}
          textAnchor="middle"
          fill="color-mix(in srgb, var(--color-paper) 85%, transparent)"
          fontSize={nameSize}
          style={{ letterSpacing: nameTracking }}
          className="font-tmono"
        >
          {n.name}
        </text>
        {!compact && (
          <text
            x={n.x}
            y={subY}
            textAnchor="middle"
            fill="color-mix(in srgb, var(--color-paper) 40%, transparent)"
            fontSize={subSize}
            style={{ letterSpacing: "0.14em" }}
            className="font-tmono"
          >
            {n.sub}
          </text>
        )}
      </motion.g>
    </g>
  );
}

function RoutePaths({ draw }: { draw: MotionValue<number> }) {
  return (
    <>
      <path
        d={D}
        fill="none"
        stroke="color-mix(in srgb, var(--color-paper) 16%, transparent)"
        strokeWidth={1.5}
        strokeDasharray="1 8"
        strokeLinecap="round"
      />
      <motion.path
        d={D}
        fill="none"
        stroke="var(--color-brass)"
        strokeWidth={1.5}
        strokeLinecap="round"
        style={{ pathLength: draw }}
      />
    </>
  );
}

function RouteMap({
  progress,
  draw,
  cameraX,
  compact,
}: {
  progress: MotionValue<number>;
  draw: MotionValue<number>;
  cameraX: MotionValue<number>;
  compact: boolean;
}) {
  const viewBox = useTransform(cameraX, (x) => `${x} ${VIEW_Y} ${VIEW_W} ${VIEW_H}`);

  return (
    <div className="relative mx-auto h-full min-h-0 w-full max-w-[1600px] overflow-hidden">
      <motion.svg
        viewBox={viewBox}
        preserveAspectRatio="xMidYMid meet"
        className="h-full w-full"
        role="img"
        aria-label={ARIA_LABEL}
      >
        <RoutePaths draw={draw} />
        {NODES.map((n) => (
          <Node key={n.name} p={progress} n={n} cameraX={cameraX} compact={compact} />
        ))}
      </motion.svg>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-ink to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-ink to-transparent"
      />
    </div>
  );
}

function RouteTicker({ windowStart }: { windowStart: MotionValue<number> }) {
  const x = useTransform(windowStart, (s) => `${(-s * 100) / NODES.length}%`);

  return (
    <div className="relative mx-auto w-full max-w-[1600px] shrink-0">
      <div className="w-full overflow-hidden">
        <motion.div
          style={{ x, width: `${(NODES.length / WINDOW) * 100}%` }}
          className="flex flex-nowrap items-center font-tmono text-[8px] uppercase tracking-[0.18em] text-paper/80 sm:text-[10px] sm:tracking-[0.24em]"
        >
          {NODES.map((n, i) => (
            <span
              key={n.name}
              className="flex min-w-0 items-center justify-center gap-2 px-1 sm:gap-3"
              style={{ flex: `0 0 ${100 / NODES.length}%` }}
            >
              <span className="truncate whitespace-nowrap text-center">{n.name}</span>
              {i < NODES.length - 1 && <span className="shrink-0 text-brass">→</span>}
            </span>
          ))}
        </motion.div>
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-ink to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-ink to-transparent"
      />
    </div>
  );
}

export default function Expansion({ sectionRef }: { sectionRef: RefObject<HTMLElement | null> }) {
  const compact = useIsPhoneViewport();
  const { progress, style } = usePinnedScene(sectionRef, {
    lengthVh: 520,
    mobileLengthVh: 380,
    smooth: true,
  });

  const draw = useTransform(progress, [0.06, 0.94], [0, 1], { clamp: true });
  const windowStart = useTransform(draw, (t) => windowStartFromDraw(t));
  const cameraX = useTransform(draw, (t) => cameraXFromDraw(t));

  return (
    <section ref={sectionRef} style={style} className="relative bg-ink">
      <div className="sticky top-0 flex h-[100dvh] flex-col overflow-hidden px-5 pt-[calc(var(--site-header-height-floating)+0.5rem)] pb-[calc(3.5rem+env(safe-area-inset-bottom))] sm:px-6 md:h-screen md:px-14">
        <div className="mx-auto grid w-full max-w-[1600px] shrink-0 gap-3 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-7">
            <h2 className="font-display text-[clamp(1.7rem,min(7.2vw,8dvh),4.4rem)] font-light leading-[1.04] md:leading-[1.02]">
              A platform bridging the world&rsquo;s financial centres.
            </h2>
          </div>
          <p className="max-w-[36rem] text-sm leading-relaxed text-paper/55 md:col-span-4 md:col-start-9 md:self-end">
            From Luxembourg through Mauritius, Cayman, and DIFC — advancing in India and preparing our
            inaugural Private Credit Fund, with Singapore and London next on the map.
          </p>
        </div>

        <div className="relative mt-4 min-h-0 flex-1 md:mt-6">
          <RouteMap progress={progress} draw={draw} cameraX={cameraX} compact={compact} />
        </div>

        <div className="mt-3 md:mt-4">
          <RouteTicker windowStart={windowStart} />
        </div>
      </div>
    </section>
  );
}
