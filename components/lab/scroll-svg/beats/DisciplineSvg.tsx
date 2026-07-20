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
const CY = 210;
const OUTER_R = 132;
const LOCK_R = 56;
const ANGLES = [-90, -30, 30, 90, 150, 210] as const;

function polar(r: number, deg: number) {
  const rad = (deg * Math.PI) / 180;
  return { x: CX + r * Math.cos(rad), y: CY + r * Math.sin(rad) };
}

export function DisciplineSvg({ autoplay = true, className }: BeatSvgProps) {
  const uid = useId().replace(/:/g, "");
  const rootRef = useRef<SVGSVGElement>(null);
  const u = (n: string) => glossUrl(uid, n);

  const hex = ANGLES.map((deg) => {
    const p = polar(70, deg);
    return `${p.x},${p.y}`;
  }).join(" ");

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;
      const ease = ensureHarkEase();
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      const marks = gsap.utils.toArray<SVGGElement>(".dc-mark", root);
      const spokes = gsap.utils.toArray<SVGLineElement>(".dc-spoke", root);
      const hexEl = root.querySelector(".dc-hex");
      const seal = root.querySelector(".dc-seal");
      const sealInner = root.querySelector(".dc-seal-inner");
      const shine = root.querySelector(".dc-shine");
      const ring = root.querySelector(".dc-ring");

      marks.forEach((mark, i) => {
        const start = polar(OUTER_R, ANGLES[i]!);
        gsap.set(mark, {
          opacity: reduced ? 1 : 0,
          scale: reduced ? 1 : 0.65,
          x: reduced ? Number(mark.dataset.dx ?? 0) : 0,
          y: reduced ? Number(mark.dataset.dy ?? 0) : 0,
          svgOrigin: `${start.x} ${start.y}`,
        });
        const end = polar(LOCK_R + 6, ANGLES[i]!);
        mark.dataset.dx = String(end.x - start.x);
        mark.dataset.dy = String(end.y - start.y);
        if (reduced) {
          gsap.set(mark, {
            x: end.x - start.x,
            y: end.y - start.y,
            opacity: 1,
            scale: 1,
          });
        }
      });

      gsap.set(spokes, { opacity: reduced ? 0.65 : 0 });
      gsap.set([hexEl, seal, sealInner, ring], {
        opacity: reduced ? 1 : 0,
        scale: reduced ? 1 : 0.72,
        transformOrigin: "50% 50%",
        svgOrigin: `${CX} ${CY}`,
      });
      gsap.set(shine, {
        rotation: -25,
        transformOrigin: "50% 50%",
        svgOrigin: `${CX} ${CY}`,
        opacity: 0,
      });

      if (reduced) return;

      const tl = gsap.timeline({
        repeat: autoplay ? -1 : 0,
        paused: !autoplay,
        defaults: { ease },
      });

      tl.to(ring, { opacity: 0.65, scale: 1, duration: 0.65 })
        .to(
          marks,
          { opacity: 1, scale: 1, duration: 0.5, stagger: 0.06 },
          "-=0.3",
        )
        .to(
          marks,
          {
            x: (_i, t) => Number((t as SVGGElement).dataset.dx),
            y: (_i, t) => Number((t as SVGGElement).dataset.dy),
            duration: 1.25,
            stagger: 0.06,
          },
          "+=0.08",
        )
        .to(spokes, { opacity: 0.65, duration: 0.45, stagger: 0.04 }, "-=0.85")
        .to(hexEl, { opacity: 1, scale: 1, duration: 0.55 }, "-=0.4")
        .to(seal, { opacity: 1, scale: 1, duration: 0.5 }, "-=0.28")
        .to(sealInner, { opacity: 1, scale: 1, duration: 0.4 }, "-=0.22")
        .to(shine, { opacity: 0.75, duration: 0.18 })
        .to(shine, { rotation: 35, duration: 1.0, ease: "power2.inOut" })
        .to(shine, { opacity: 0, duration: 0.3 });

      if (autoplay) {
        tl.to({}, { duration: 0.7 })
          .to([seal, sealInner, hexEl], {
            opacity: 0,
            scale: 0.78,
            duration: 0.4,
          })
          .to(spokes, { opacity: 0, duration: 0.28 }, "<")
          .to(marks, { x: 0, y: 0, duration: 0.95, stagger: 0.04 }, "-=0.12")
          .to(
            marks,
            { opacity: 0, scale: 0.65, duration: 0.35, stagger: 0.03 },
            "-=0.3",
          )
          .to(ring, { opacity: 0, scale: 0.72, duration: 0.35 }, "<")
          .set(shine, { rotation: -25, opacity: 0 });
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

      <circle
        cx={CX}
        cy={CY}
        r="155"
        fill="#c9b896"
        opacity="0.07"
        filter={u("haze")}
      />

      <circle
        className="dc-ring"
        cx={CX}
        cy={CY}
        r={OUTER_R}
        fill="none"
        stroke={u("gold-stroke")}
        strokeWidth="1.2"
        strokeDasharray="3 8"
      />

      {ANGLES.map((deg) => {
        const outer = polar(OUTER_R, deg);
        const inner = polar(LOCK_R, deg);
        return (
          <line
            key={`spoke-${deg}`}
            className="dc-spoke"
            x1={outer.x}
            y1={outer.y}
            x2={inner.x}
            y2={inner.y}
            stroke={u("gold-stroke")}
            strokeWidth="1.15"
          />
        );
      })}

      <polygon
        className="dc-hex"
        points={hex}
        fill={u("glass-fill")}
        stroke={u("glass-edge")}
        strokeWidth="1.5"
        filter={u("specular")}
      />

      <circle
        className="dc-seal"
        cx={CX}
        cy={CY}
        r="32"
        fill={u("gold-glass")}
        stroke={u("glass-edge")}
        strokeWidth="1.5"
        filter={u("gold-glow")}
      />
      <circle
        className="dc-seal-inner"
        cx={CX}
        cy={CY}
        r="12"
        fill={u("node")}
        filter={u("soft-glow")}
      />

      <rect
        className="dc-shine"
        x={CX - 9}
        y={CY - 48}
        width="18"
        height="96"
        fill={u("shine")}
        style={{ mixBlendMode: "screen" }}
      />

      {ANGLES.map((deg, i) => {
        const start = polar(OUTER_R, deg);
        return (
          <g key={deg} className="dc-mark" filter={u("specular")}>
            <circle
              cx={start.x}
              cy={start.y}
              r="16"
              fill={u("glass-fill")}
              stroke={u("glass-edge")}
              strokeWidth="1.25"
            />
            <circle
              cx={start.x}
              cy={start.y}
              r="5.5"
              fill={i % 2 === 0 ? u("node-gold") : u("node")}
            />
          </g>
        );
      })}
    </svg>
  );
}
