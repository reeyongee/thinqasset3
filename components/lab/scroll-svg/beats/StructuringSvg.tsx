"use client";

import { useId, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { GlossDefs, glossUrl } from "../GlossDefs";
import { ensureHarkEase } from "../ease";
import {
  clearBeatTimeline,
  setBeatTimeline,
  type BeatSvgProps,
} from "../beatTimelineRegistry";

const CX = 280;
const PLATES = [
  { y: 92, w: 300, gold: false },
  { y: 154, w: 300, gold: true },
  { y: 216, w: 300, gold: false },
  { y: 278, w: 300, gold: true },
] as const;

export function StructuringSvg({ autoplay = true, className }: BeatSvgProps) {
  const uid = useId().replace(/:/g, "");
  const rootRef = useRef<SVGSVGElement>(null);
  const u = (n: string) => glossUrl(uid, n);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;
      const ease = ensureHarkEase();
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      const plates = gsap.utils.toArray<SVGGElement>(".st-plate", root);
      const trims = gsap.utils.toArray<SVGRectElement>(".st-trim", root);
      const spine = root.querySelector(".st-spine");
      const lock = root.querySelector(".st-lock");
      const shines = gsap.utils.toArray<SVGRectElement>(".st-shine", root);

      gsap.set(plates, {
        y: reduced ? 0 : 48,
        opacity: reduced ? 1 : 0,
      });
      gsap.set(trims, {
        scaleX: reduced ? 1 : 0,
        transformOrigin: "50% 50%",
        svgOrigin: `${CX} 0`,
      });
      gsap.set(spine, { scaleY: reduced ? 1 : 0, transformOrigin: "50% 0%" });
      gsap.set(lock, {
        scale: reduced ? 1 : 0,
        transformOrigin: "50% 50%",
        opacity: reduced ? 1 : 0,
      });
      gsap.set(shines, { x: -100, opacity: 0 });

      if (reduced) return;

      const tl = gsap.timeline({
        repeat: autoplay ? -1 : 0,
        paused: !autoplay,
        defaults: { ease },
      });

      tl.to(spine, { scaleY: 1, duration: 0.65 })
        .to(plates, { y: 0, opacity: 1, duration: 1.05, stagger: 0.14 }, "-=0.2")
        .to(trims, { scaleX: 1, duration: 0.65, stagger: 0.1 }, "-=0.5")
        .to(
          shines,
          {
            x: 260,
            opacity: 0.65,
            duration: 0.8,
            stagger: 0.08,
            ease: "power2.inOut",
          },
          "-=0.35",
        )
        .to(shines, { opacity: 0, duration: 0.28 }, "-=0.18")
        .to(lock, { scale: 1, opacity: 1, duration: 0.5 }, "-=0.3")
        .to(plates, {
          y: (i) => (i - 1.5) * 3,
          duration: 0.55,
          stagger: 0.03,
        })
        .to(plates, { y: 0, duration: 0.6, stagger: 0.03 });

      if (autoplay) {
        tl.to({}, { duration: 0.7 })
          .to([lock, trims], { opacity: 0, duration: 0.35 })
          .to(plates, { y: -40, opacity: 0, duration: 0.7, stagger: 0.06 })
          .to(spine, { scaleY: 0, duration: 0.4 }, "-=0.25")
          .set(trims, { scaleX: 0, opacity: 1 })
          .set(lock, { scale: 0, opacity: 0 })
          .set(shines, { x: -100, opacity: 0 })
          .set(plates, { y: 48 });
      }

      setBeatTimeline(root, tl);
      return () => {
        clearBeatTimeline(root);
        tl.kill();
      };
    },
    { scope: rootRef, dependencies: [autoplay] },
  );

  return (
    <svg
      ref={rootRef}
      className={["scroll-svg-stage", className].filter(Boolean).join(" ")}
      viewBox="0 0 560 420"
      aria-hidden
    >
      <GlossDefs uid={uid} />
      <rect width="560" height="420" fill={u("bg")} />

      <ellipse
        cx={CX}
        cy="220"
        rx="150"
        ry="130"
        fill="#c9b896"
        opacity="0.06"
        filter={u("haze")}
      />

      <rect
        className="st-spine"
        x={CX - 4}
        y="78"
        width="8"
        height="260"
        rx="4"
        fill={u("gold-glass")}
        filter={u("gold-glow")}
        opacity="0.85"
      />

      {PLATES.map((plate, i) => {
        const x = (560 - plate.w) / 2;
        return (
          <g key={i} className="st-plate" filter={u("specular")}>
            <rect
              x={x}
              y={plate.y}
              width={plate.w}
              height="46"
              rx="6"
              fill={plate.gold ? u("plate-gold") : u("plate")}
              stroke={u("glass-edge")}
              strokeWidth="1.25"
            />
            <rect
              className="st-shine"
              x={x}
              y={plate.y + 4}
              width="44"
              height="38"
              fill={u("shine")}
              opacity="0"
              style={{ mixBlendMode: "screen" }}
            />
            <rect
              className="st-trim"
              x={x + 24}
              y={plate.y + 38}
              width={plate.w - 48}
              height="3"
              rx="1.5"
              fill={u("gold-stroke")}
            />
            <circle
              cx={CX}
              cy={plate.y + 23}
              r="4.5"
              fill={i % 2 === 0 ? u("node") : u("node-gold")}
            />
          </g>
        );
      })}

      <g className="st-lock" filter={u("gold-glow")}>
        <circle
          cx={CX}
          cy="358"
          r="16"
          fill={u("gold-glass")}
          stroke={u("glass-edge")}
          strokeWidth="1.5"
        />
        <circle cx={CX} cy="358" r="6" fill={u("node")} />
      </g>
    </svg>
  );
}
