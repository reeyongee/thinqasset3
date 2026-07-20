"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTransitionAnimation } from "@/components/transition/TransitionAnimationContext";
import styles from "./StructureStackExperiment.module.css";

gsap.registerPlugin(ScrollTrigger);

const STACK_STEPS = [
  { block: "stack-retained-1", trim: "stack-trim-1" },
  { block: "stack-retained-2", trim: "stack-trim-2" },
  { block: "stack-retained-3", trim: "stack-trim-3" },
] as const;

export function StructureStackExperiment() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const { isNavigating } = useTransitionAnimation();

  useGSAP(
    () => {
      if (isNavigating || !sectionRef.current || !stageRef.current) return;

      const root = sectionRef.current;
      const phaseLabels = gsap.utils.toArray<HTMLElement>(
        ".structure-phase",
        root,
      );
      const incoming = gsap.utils.toArray<SVGGElement>(".stack-incoming", root);
      const retained = gsap.utils.toArray<SVGGElement>(".stack-retained", root);
      const trims = gsap.utils.toArray<SVGGElement>(".stack-trim", root);
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      gsap.set(incoming, {
        opacity: prefersReducedMotion ? 0 : 1,
        x: prefersReducedMotion ? 0 : 160,
      });
      gsap.set(retained, {
        opacity: prefersReducedMotion ? 1 : 0,
        scaleX: prefersReducedMotion ? 1 : 0.72,
        transformOrigin: "center",
      });
      gsap.set(trims, {
        opacity: 0,
        transformOrigin: "center",
      });
      gsap.set(".stack-measure", { opacity: prefersReducedMotion ? 1 : 0 });
      gsap.set(".stack-seal", {
        opacity: prefersReducedMotion ? 1 : 0,
        scale: prefersReducedMotion ? 1 : 0.65,
        transformOrigin: "360px 150px",
      });
      gsap.set(phaseLabels, { opacity: 0.34 });
      gsap.set(phaseLabels[0], { opacity: 1 });

      if (prefersReducedMotion) {
        gsap.set(phaseLabels, { opacity: 1 });
        return;
      }

      const timeline = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "+=280%",
          pin: stageRef.current,
          scrub: 0.8,
          anticipatePin: 1,
        },
      });

      STACK_STEPS.forEach((step, index) => {
        const start = 0.08 + index * 0.22;
        const incomingBlock = incoming[index];
        const retainedBlock = root.querySelector<SVGGElement>(`.${step.block}`);
        const trim = root.querySelector<SVGGElement>(`.${step.trim}`);

        timeline
          .to(incomingBlock, { x: 0, duration: 0.12 }, start)
          .to(incomingBlock, { opacity: 0, duration: 0.025 }, start + 0.13)
          .to(
            retainedBlock,
            { opacity: 1, scaleX: 1, duration: 0.055, ease: "power2.out" },
            start + 0.13,
          )
          .to(trim, { opacity: 1, duration: 0.01 }, start + 0.13)
          .to(
            trim,
            {
              opacity: 0,
              y: 150,
              rotation: index % 2 ? 8 : -8,
              duration: 0.16,
              ease: "power1.in",
            },
            start + 0.145,
          );
      });

      timeline
        .to(phaseLabels[0], { opacity: 0.34, duration: 0.05 }, 0.28)
        .to(phaseLabels[1], { opacity: 1, duration: 0.05 }, 0.28)
        .to(phaseLabels[1], { opacity: 0.34, duration: 0.05 }, 0.72)
        .to(phaseLabels[2], { opacity: 1, duration: 0.05 }, 0.72)
        .to(".stack-measure", { opacity: 1, duration: 0.1 }, 0.75)
        .to(".stack-seal", { opacity: 1, scale: 1, duration: 0.12 }, 0.8);
    },
    { scope: sectionRef, dependencies: [isNavigating], revertOnUpdate: true },
  );

  return (
    <section
      ref={sectionRef}
      className={styles.experiment}
      aria-labelledby="structure-stack-title"
    >
      <div ref={stageRef} className={styles.stage}>
        <div className={styles.grid} aria-hidden />
        <div className={styles.copy}>
          <p data-transition-text="body" className={styles.kicker}>
            Hero SVG study / 02
          </p>
          <h1
            data-transition-text="headline"
            id="structure-stack-title"
            className={styles.title}
          >
            Investment
            <br />
            Structuring
          </h1>
          <p data-transition-text="body" className={styles.body}>
            Custom solutions designed to optimize fund performance and ensure
            regulatory compliance.
          </p>

          <ol className={styles.phases} aria-label="Animation phases">
            <li className="structure-phase">Position</li>
            <li className="structure-phase">Trim to fit</li>
            <li className="structure-phase">Structured outcome</li>
          </ol>
        </div>

        <div className={styles.visual} aria-hidden>
          <svg viewBox="0 0 720 560">
            <defs>
              <filter id="stack-soft-glow" x="-80%" y="-80%" width="260%" height="260%">
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <path className="stack-measure" d="M188 432H532M188 430v4M532 430v4" />
            <path className="stack-measure stack-measure--top" d="M260 154H460M260 152v4M460 152v4" />

            <g className="stack-foundation">
              <rect x="260" y="410" width="200" height="32" rx="2" />
              <rect x="276" y="418" width="168" height="8" rx="1" />
            </g>

            <g className="stack-incoming">
              <rect x="225" y="360" width="225" height="32" rx="2" />
            </g>
            <g className="stack-retained stack-retained-1">
              <rect x="260" y="360" width="190" height="32" rx="2" />
              <rect x="276" y="368" width="158" height="8" rx="1" />
            </g>
            <g className="stack-trim stack-trim-1">
              <rect x="225" y="360" width="35" height="32" rx="2" />
            </g>

            <g className="stack-incoming">
              <rect x="305" y="310" width="215" height="32" rx="2" />
            </g>
            <g className="stack-retained stack-retained-2">
              <rect x="305" y="310" width="145" height="32" rx="2" />
              <rect x="320" y="318" width="115" height="8" rx="1" />
            </g>
            <g className="stack-trim stack-trim-2">
              <rect x="450" y="310" width="70" height="32" rx="2" />
            </g>

            <g className="stack-incoming">
              <rect x="250" y="260" width="230" height="32" rx="2" />
            </g>
            <g className="stack-retained stack-retained-3">
              <rect x="305" y="260" width="145" height="32" rx="2" />
              <rect x="320" y="268" width="115" height="8" rx="1" />
            </g>
            <g className="stack-trim stack-trim-3">
              <rect x="250" y="260" width="55" height="32" rx="2" />
              <rect x="450" y="260" width="30" height="32" rx="2" />
            </g>

            <g className="stack-seal" filter="url(#stack-soft-glow)">
              <circle cx="360" cy="150" r="30" />
              <path d="M345 150h30M360 135v30" />
            </g>
          </svg>
        </div>

        <p className={styles.prompt}>Scroll to structure</p>
      </div>
    </section>
  );
}
