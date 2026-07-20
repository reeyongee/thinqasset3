"use client";

import { useRef, type CSSProperties } from "react";
import type { OfferingJourneyStep } from "./types";
import { useServiceOfferingJourneyAnimation } from "./useServiceOfferingJourneyAnimation";

export type ServiceOfferingJourneyProps = {
  headline?: string;
  steps: readonly OfferingJourneyStep[];
};

export function ServiceOfferingJourney({
  headline = "How it typically unfolds",
  steps,
}: ServiceOfferingJourneyProps) {
  const sectionRef = useRef<HTMLElement>(null);
  useServiceOfferingJourneyAnimation({ sectionRef });

  return (
    <section ref={sectionRef} className="od-journey sd-section">
      <div className="sd-container">
        <div className="od-journey__header">
          <p className="od-journey__label">The path</p>
          <h2 className="od-journey__headline sd-h2">{headline}</h2>
        </div>

        <div className="od-journey__track" aria-hidden>
          <div className="od-journey__progress" />
        </div>

        <ol
          className="od-journey__steps"
          data-count={steps.length}
          style={{ "--od-journey-count": steps.length } as CSSProperties}
        >
          {steps.map((step, index) => (
            <li key={step.title} className="od-journey__step">
              <span className="od-journey__step-index">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="od-journey__step-title">{step.title}</h3>
              <p className="od-journey__step-detail">{step.detail}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
