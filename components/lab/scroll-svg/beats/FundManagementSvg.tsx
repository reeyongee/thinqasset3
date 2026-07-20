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

const ARMS = [
  { y: -96, bend: -28 },
  { y: -32, bend: -10 },
  { y: 32, bend: 10 },
  { y: 96, bend: 28 },
] as const;

function curve(
  x0: number,
  y0: number,
  x1: number,
  y1: number,
  bendY: number,
) {
  const mx = (x0 + x1) / 2;
  const my = (y0 + y1) / 2 + bendY;
  return `M ${x0} ${y0} Q ${mx} ${my} ${x1} ${y1}`;
}

export function FundManagementSvg({
  autoplay = true,
  className,
}: BeatSvgProps) {
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

      const streams = gsap.utils.toArray<SVGPathElement>(".fm-stream", root);
      const rays = gsap.utils.toArray<SVGPathElement>(".fm-ray", root);
      const prism = root.querySelector(".fm-prism");
      const shine = root.querySelector(".fm-shine");
      const core = root.querySelector(".fm-core");
      const nodes = gsap.utils.toArray<SVGCircleElement>(".fm-alloc", root);

      streams.forEach((p) => {
        const len = p.getTotalLength();
        gsap.set(p, {
          strokeDasharray: len,
          strokeDashoffset: reduced ? 0 : len,
        });
      });
      rays.forEach((p) => {
        const len = p.getTotalLength();
        gsap.set(p, {
          strokeDasharray: len,
          strokeDashoffset: reduced ? 0 : len,
          opacity: reduced ? 0.9 : 0,
        });
      });
      gsap.set(nodes, {
        scale: reduced ? 1 : 0,
        transformOrigin: "50% 50%",
        svgOrigin: `${CX} ${CY}`,
      });
      gsap.set([prism, core], {
        transformOrigin: "50% 50%",
        svgOrigin: `${CX} ${CY}`,
      });
      gsap.set(shine, { x: -160, opacity: 0 });
      if (reduced) gsap.set(core, { opacity: 0.85, scale: 1 });

      if (reduced) return;

      const tl = gsap.timeline({
        repeat: autoplay ? -1 : 0,
        paused: !autoplay,
        defaults: { ease },
      });

      // Assemble
      tl.to(streams, { strokeDashoffset: 0, duration: 1.45, stagger: 0.1 })
        .to(prism, { scale: 1.05, duration: 0.5 }, "-=0.3")
        .to(core, { opacity: 1, scale: 1.1, duration: 0.4 }, "<")
        .to(
          shine,
          { x: 180, opacity: 0.8, duration: 0.85, ease: "power2.inOut" },
          "-=0.15",
        )
        .to(shine, { opacity: 0, duration: 0.25 }, "-=0.12")
        .to(
          rays,
          { strokeDashoffset: 0, opacity: 0.95, duration: 1.15, stagger: 0.1 },
          "-=0.35",
        )
        .to(nodes, { scale: 1, duration: 0.5, stagger: 0.08 }, "-=0.7")
        .to(prism, { scale: 1, duration: 0.45 })
        .to(core, { scale: 1, opacity: 0.9, duration: 0.4 }, "<");

      if (autoplay) {
        tl.to({}, { duration: 0.7 })
          .to(rays, { opacity: 0.2, duration: 0.55 })
          .to(nodes, { scale: 0.65, opacity: 0.4, duration: 0.45 }, "<")
          .to(streams, {
            strokeDashoffset: (_i, t) =>
              (t as SVGPathElement).getTotalLength(),
            duration: 1,
            stagger: 0.05,
          })
          .to(core, { opacity: 0.85, duration: 0.35 }, "<")
          .set(rays, {
            strokeDashoffset: (_i, t) =>
              (t as SVGPathElement).getTotalLength(),
            opacity: 0,
          })
          .set(nodes, { scale: 0, opacity: 1 })
          .set(shine, { x: -160, opacity: 0 });
      }

      setBeatTimeline(root, tl);
      return () => {
        clearBeatTimeline(root);
        tl.kill();
      };
    },
    { scope: rootRef, dependencies: [autoplay] },
  );

  const leftX = 64;
  const rightX = 496;
  const prismInX = 228;
  const prismOutX = 332;

  return (
    <svg
      ref={rootRef}
      className={["scroll-svg-stage", className].filter(Boolean).join(" ")}
      viewBox="0 0 560 420"
      aria-hidden
    >
      <GlossDefs uid={uid} />
      <rect width="560" height="420" fill={u("bg")} rx="0" />

      <ellipse
        cx={CX}
        cy={CY}
        rx="170"
        ry="120"
        fill="#c9b896"
        opacity="0.07"
        filter={u("haze")}
      />

      <g fill="none" stroke={u("stream")} strokeWidth="2.2" strokeLinecap="round">
        {ARMS.map((arm, i) => (
          <path
            key={`in-${i}`}
            className="fm-stream"
            d={curve(leftX, CY + arm.y, prismInX, CY + arm.y * 0.22, arm.bend)}
          />
        ))}
      </g>

      <g className="fm-prism" filter={u("specular")}>
        <polygon
          points={`${CX},${CY - 80} ${CX + 60},${CY} ${CX},${CY + 80} ${CX - 60},${CY}`}
          fill={u("glass-fill")}
          stroke={u("glass-edge")}
          strokeWidth="1.4"
        />
        <polygon
          points={`${CX},${CY - 80} ${CX + 60},${CY} ${CX},${CY}`}
          fill={u("facet-a")}
          opacity="0.85"
        />
        <polygon
          points={`${CX},${CY} ${CX + 60},${CY} ${CX},${CY + 80}`}
          fill={u("facet-b")}
          opacity="0.7"
        />
        <polygon
          points={`${CX},${CY - 80} ${CX - 60},${CY} ${CX},${CY}`}
          fill={u("gold-glass")}
          opacity="0.28"
        />
        <rect
          className="fm-shine"
          x={CX - 50}
          y={CY - 70}
          width="32"
          height="140"
          fill={u("shine")}
          opacity="0"
          transform={`rotate(-18 ${CX} ${CY})`}
          style={{ mixBlendMode: "screen" }}
        />
        <circle
          className="fm-core"
          cx={CX}
          cy={CY}
          r="14"
          fill={u("node-gold")}
          filter={u("gold-glow")}
          opacity="0.85"
        />
      </g>

      <g fill="none" stroke={u("gold-stroke")} strokeWidth="1.8" strokeLinecap="round">
        {ARMS.map((arm, i) => (
          <path
            key={`out-${i}`}
            className="fm-ray"
            d={curve(prismOutX, CY + arm.y * 0.22, rightX, CY + arm.y, -arm.bend)}
          />
        ))}
      </g>

      {ARMS.map((arm, i) => (
        <circle
          key={`n-${i}`}
          className="fm-alloc"
          cx={rightX}
          cy={CY + arm.y}
          r="7"
          fill={i % 2 === 0 ? u("node") : u("node-gold")}
        />
      ))}
    </svg>
  );
}
