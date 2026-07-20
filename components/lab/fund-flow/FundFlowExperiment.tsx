"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTransitionAnimation } from "@/components/transition/TransitionAnimationContext";
import styles from "./FundFlowExperiment.module.css";

gsap.registerPlugin(ScrollTrigger);

const INPUTS = [
  { id: "private", label: "Private", source: [624, 90], target: [390, 244] },
  { id: "credit", label: "Credit", source: [654, 186], target: [404, 267] },
  { id: "liquid", label: "Liquid", source: [650, 374], target: [405, 300] },
  { id: "real", label: "Real", source: [616, 470], target: [390, 318] },
] as const;

const ALLOCATIONS = [
  { id: "growth", label: "Growth", point: [242, 132], weight: "32%" },
  { id: "income", label: "Income", point: [178, 246], weight: "26%" },
  { id: "defensive", label: "Defensive", point: [192, 358], weight: "24%" },
  { id: "reserve", label: "Reserve", point: [254, 438], weight: "18%" },
] as const;

function curve(
  [fromX, fromY]: readonly [number, number],
  [toX, toY]: readonly [number, number],
  bend: number,
) {
  const midX = (fromX + toX) / 2 + bend;
  return `M ${fromX} ${fromY} C ${midX} ${fromY}, ${midX} ${toY}, ${toX} ${toY}`;
}

export function FundFlowExperiment() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const { isNavigating } = useTransitionAnimation();

  useGSAP(
    () => {
      if (isNavigating || !sectionRef.current || !stageRef.current) return;

      const root = sectionRef.current;
      const inputPaths = gsap.utils.toArray<SVGPathElement>(
        ".fund-flow-input-path",
        root,
      );
      const allocationPaths = gsap.utils.toArray<SVGPathElement>(
        ".fund-flow-allocation-path",
        root,
      );
      const inputNodes = gsap.utils.toArray<SVGGElement>(
        ".fund-flow-input-node",
        root,
      );
      const allocationNodes = gsap.utils.toArray<SVGGElement>(
        ".fund-flow-allocation-node",
        root,
      );
      const phaseLabels = gsap.utils.toArray<HTMLElement>(
        ".fund-flow-phase",
        root,
      );
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      const preparePath = (path: SVGPathElement) => {
        const length = path.getTotalLength();
        gsap.set(path, {
          strokeDasharray: length,
          strokeDashoffset: prefersReducedMotion ? 0 : length,
        });
      };

      inputPaths.forEach(preparePath);
      allocationPaths.forEach(preparePath);

      gsap.set(inputNodes, {
        opacity: prefersReducedMotion ? 1 : 0,
        scale: prefersReducedMotion ? 1 : 0.7,
        transformOrigin: "center",
      });
      gsap.set(allocationNodes, {
        opacity: prefersReducedMotion ? 1 : 0,
        scale: prefersReducedMotion ? 1 : 0.72,
        transformOrigin: "center",
      });
      gsap.set(".fund-flow-hub", {
        opacity: prefersReducedMotion ? 1 : 0,
        scale: prefersReducedMotion ? 1 : 0.5,
        transformOrigin: "400px 280px",
      });
      gsap.set(".fund-flow-balance-ring", {
        opacity: prefersReducedMotion ? 0.95 : 0,
        scale: prefersReducedMotion ? 1 : 0.55,
        transformOrigin: "400px 280px",
      });
      gsap.set(".fund-flow-pulse", { opacity: 0 });
      gsap.set(phaseLabels, { opacity: 0.34 });
      gsap.set(phaseLabels[0], { opacity: 1 });

      if (prefersReducedMotion) {
        gsap.set(".fund-flow-pulse", { opacity: 0.8 });
        gsap.set(phaseLabels, { opacity: 1 });
        return;
      }

      const timeline = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "+=260%",
          pin: stageRef.current,
          scrub: 0.8,
          anticipatePin: 1,
        },
      });

      timeline
        .to(inputNodes, { opacity: 1, scale: 1, duration: 0.08, stagger: 0.025 }, 0)
        .to(inputPaths, { strokeDashoffset: 0, duration: 0.22, stagger: 0.03 }, 0.04)
        .to(".fund-flow-hub", { opacity: 1, scale: 1, duration: 0.12 }, 0.19)
        .to(phaseLabels[0], { opacity: 0.34, duration: 0.05 }, 0.28)
        .to(phaseLabels[1], { opacity: 1, duration: 0.05 }, 0.28)
        .to(".fund-flow-pulse", { opacity: 1, duration: 0.06 }, 0.31)
        .to(allocationPaths, { strokeDashoffset: 0, duration: 0.2, stagger: 0.035 }, 0.34)
        .to(
          allocationNodes,
          { opacity: 1, scale: 1, duration: 0.1, stagger: 0.035 },
          0.46,
        )
        .to(".fund-flow-pulse", { x: -124, duration: 0.22, stagger: 0.02 }, 0.45)
        .to(phaseLabels[1], { opacity: 0.34, duration: 0.05 }, 0.67)
        .to(phaseLabels[2], { opacity: 1, duration: 0.05 }, 0.67)
        .to(".fund-flow-balance-ring", { opacity: 0.95, scale: 1, duration: 0.15 }, 0.68)
        .to(
          ".fund-flow-weight",
          { opacity: 1, y: 0, duration: 0.12, stagger: 0.025 },
          0.75,
        );
    },
    { scope: sectionRef, dependencies: [isNavigating], revertOnUpdate: true },
  );

  return (
    <section ref={sectionRef} className={styles.experiment} aria-labelledby="fund-flow-title">
      <div ref={stageRef} className={styles.stage}>
        <div className={styles.grid} aria-hidden />
        <div className={styles.copy}>
          <p data-transition-text="body" className={styles.kicker}>
            Hero SVG study / 01
          </p>
          <h1 data-transition-text="headline" id="fund-flow-title" className={styles.title}>
            Fund
            <br />
            Management
          </h1>
          <p data-transition-text="body" className={styles.body}>
            Expert management of diversified investment portfolios tailored to your
            strategic goals.
          </p>

          <ol className={styles.phases} aria-label="Animation phases">
            <li className="fund-flow-phase">Capital inputs</li>
            <li className="fund-flow-phase">Active rebalancing</li>
            <li className="fund-flow-phase">Diversified outcome</li>
          </ol>
        </div>

        <div className={styles.visual} aria-hidden>
          <svg viewBox="0 0 720 560" role="img">
            <defs>
              <filter id="fund-flow-glow" x="-80%" y="-80%" width="260%" height="260%">
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <radialGradient id="fund-flow-hub-fill">
                <stop stopColor="var(--ta-gold-hover)" stopOpacity="0.48" />
                <stop offset="1" stopColor="var(--ta-gold)" stopOpacity="0.05" />
              </radialGradient>
            </defs>

            <circle className="fund-flow-balance-ring" cx="400" cy="280" r="116" />
            <circle className="fund-flow-balance-ring fund-flow-balance-ring--inner" cx="400" cy="280" r="76" />

            {INPUTS.map((input, index) => (
              <g key={input.id}>
                <path
                  className="fund-flow-input-path"
                  d={curve(input.source, input.target, -28 - index * 4)}
                />
                <g className="fund-flow-input-node">
                  <circle cx={input.source[0]} cy={input.source[1]} r="7" />
                  <text x={input.source[0] - 16} y={input.source[1] - 14}>
                    {input.label}
                  </text>
                </g>
              </g>
            ))}

            <g className="fund-flow-hub" filter="url(#fund-flow-glow)">
              <circle className="fund-flow-hub-halo" cx="400" cy="280" r="52" />
              <circle className="fund-flow-hub-core" cx="400" cy="280" r="27" />
              <path className="fund-flow-hub-mark" d="M384 280h32M400 264v32" />
              <text x="400" y="330" textAnchor="middle">
                Portfolio
              </text>
            </g>

            {ALLOCATIONS.map((allocation, index) => (
              <g key={allocation.id}>
                <path
                  className="fund-flow-allocation-path"
                  d={curve([375, 280], allocation.point, -24 - index * 8)}
                />
                <circle
                  className="fund-flow-pulse"
                  cx="375"
                  cy="280"
                  r="4"
                  data-allocation={allocation.id}
                />
                <g className="fund-flow-allocation-node">
                  <circle cx={allocation.point[0]} cy={allocation.point[1]} r="9" />
                  <text x={allocation.point[0] + 18} y={allocation.point[1] - 5}>
                    {allocation.label}
                  </text>
                  <text
                    className="fund-flow-weight"
                    x={allocation.point[0] + 18}
                    y={allocation.point[1] + 15}
                  >
                    {allocation.weight}
                  </text>
                </g>
              </g>
            ))}
          </svg>
        </div>

        <p className={styles.prompt}>Scroll to rebalance</p>
      </div>
    </section>
  );
}
