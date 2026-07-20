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
const NODE_R = 118;
const ANGLES = [0, 60, 120, 180, 240, 300] as const;

function polar(deg: number, r = NODE_R) {
  const rad = (deg * Math.PI) / 180;
  return { x: CX + r * Math.cos(rad), y: CY + r * Math.sin(rad) };
}

function radial(deg: number) {
  const p = polar(deg);
  return `M ${CX} ${CY} L ${p.x} ${p.y}`;
}

export function PartnershipSvg({ autoplay = true, className }: BeatSvgProps) {
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

      const bridges = gsap.utils.toArray<SVGPathElement>(".pn-bridge", root);
      const pulses = gsap.utils.toArray<SVGCircleElement>(".pn-pulse", root);
      const nodes = gsap.utils.toArray<SVGGElement>(".pn-node", root);
      const core = root.querySelector(".pn-core");
      const ring = root.querySelector(".pn-ring");

      bridges.forEach((p) => {
        const len = p.getTotalLength();
        gsap.set(p, {
          strokeDasharray: len,
          strokeDashoffset: reduced ? 0 : len,
        });
      });
      nodes.forEach((node, i) => {
        const p = polar(ANGLES[i]!);
        gsap.set(node, {
          scale: reduced ? 1 : 0,
          transformOrigin: "50% 50%",
          svgOrigin: `${p.x} ${p.y}`,
        });
      });
      gsap.set(core, {
        scale: reduced ? 1 : 0.65,
        opacity: reduced ? 1 : 0.4,
        transformOrigin: "50% 50%",
        svgOrigin: `${CX} ${CY}`,
      });
      const ringLen = 2 * Math.PI * NODE_R;
      gsap.set(ring, {
        opacity: reduced ? 0.7 : 0,
        strokeDasharray: `6 ${ringLen / 18}`,
        strokeDashoffset: 0,
      });
      gsap.set(pulses, { opacity: 0 });

      if (reduced) return;

      const tl = gsap.timeline({
        repeat: autoplay ? -1 : 0,
        paused: !autoplay,
        defaults: { ease },
      });

      tl.to(core, { scale: 1, opacity: 1, duration: 0.65 })
        .to(ring, { opacity: 0.75, duration: 0.55 }, "-=0.3")
        .to(nodes, { scale: 1, duration: 0.55, stagger: 0.06 }, "-=0.35")
        .to(
          bridges,
          { strokeDashoffset: 0, duration: 1.1, stagger: 0.07 },
          "-=0.3",
        );

      pulses.forEach((pulse, i) => {
        const bridge = bridges[i];
        if (!bridge) return;
        const len = bridge.getTotalLength();
        tl.to(
          pulse,
          {
            opacity: 1,
            duration: 0.12,
            onUpdate: function onUpdate() {
              const t = this.progress();
              const pt = bridge.getPointAtLength(t * len);
              pulse.setAttribute("cx", String(pt.x));
              pulse.setAttribute("cy", String(pt.y));
            },
          },
          i === 0 ? "-=0.15" : "<0.12",
        );
        tl.to(pulse, { opacity: 0, duration: 0.18 }, ">-0.04");
      });

      tl.to(
        ring,
        { strokeDashoffset: -ringLen * 0.45, duration: 1.6, ease: "none" },
        "-=1.2",
      );

      if (autoplay) {
        tl.to({}, { duration: 0.55 })
          .to(bridges, { opacity: 0.18, duration: 0.45 })
          .to(nodes, { scale: 0.88, duration: 0.4 }, "<")
          .to(core, { scale: 0.94, duration: 0.35 }, "<")
          .to(bridges, {
            strokeDashoffset: (_i, t) =>
              (t as SVGPathElement).getTotalLength(),
            opacity: 1,
            duration: 0.8,
          })
          .to(nodes, { scale: 0, duration: 0.4, stagger: 0.04 }, "-=0.35")
          .to(core, { scale: 0.65, opacity: 0.35, duration: 0.4 }, "<")
          .to(ring, { opacity: 0, duration: 0.35 }, "<")
          .set(ring, { strokeDashoffset: 0 });
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
        r="150"
        fill="#c9b896"
        opacity="0.06"
        filter={u("haze")}
      />

      <circle
        className="pn-ring"
        cx={CX}
        cy={CY}
        r={NODE_R}
        fill="none"
        stroke={u("gold-stroke")}
        strokeWidth="1.15"
        opacity="0.55"
      />

      <g fill="none" stroke={u("gold-stroke")} strokeWidth="1.55" strokeLinecap="round">
        {ANGLES.map((deg) => (
          <path key={deg} className="pn-bridge" d={radial(deg)} />
        ))}
      </g>

      {ANGLES.map((deg) => (
        <circle
          key={`pulse-${deg}`}
          className="pn-pulse"
          cx={CX}
          cy={CY}
          r="4"
          fill={u("node")}
          filter={u("soft-glow")}
        />
      ))}

      <g className="pn-core" filter={u("specular")}>
        <circle
          cx={CX}
          cy={CY}
          r="34"
          fill={u("glass-fill")}
          stroke={u("glass-edge")}
          strokeWidth="1.5"
        />
        <circle
          cx={CX}
          cy={CY}
          r="20"
          fill={u("gold-glass")}
          filter={u("gold-glow")}
          opacity="0.9"
        />
        <circle cx={CX} cy={CY} r="7" fill={u("node")} />
      </g>

      {ANGLES.map((deg, i) => {
        const p = polar(deg);
        return (
          <g key={deg} className="pn-node" filter={u("specular")}>
            <circle
              cx={p.x}
              cy={p.y}
              r="18"
              fill={u("glass-fill")}
              stroke={u("glass-edge")}
              strokeWidth="1.25"
            />
            <circle
              cx={p.x}
              cy={p.y}
              r="6.5"
              fill={i % 2 === 0 ? u("node-gold") : u("node")}
            />
          </g>
        );
      })}
    </svg>
  );
}
