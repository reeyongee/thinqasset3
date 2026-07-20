"use client";

import { useRef } from "react";
import { BenefitCheckIcon } from "@/components/services/BenefitCheckIcon";
import { useServiceOfferingProofAnimation } from "./useServiceOfferingProofAnimation";

export type ServiceOfferingProofProps = {
  headline?: string;
  outcomes: readonly string[];
};

export function ServiceOfferingProof({
  headline = "What changes for you",
  outcomes,
}: ServiceOfferingProofProps) {
  const sectionRef = useRef<HTMLElement>(null);
  useServiceOfferingProofAnimation({ sectionRef });

  return (
    <section ref={sectionRef} className="od-proof sd-section">
      <div className="sd-container">
        <div className="od-proof__panel">
          <h2 className="od-proof__headline sd-h2">{headline}</h2>
          <ul className="od-proof__list">
            {outcomes.map((outcome) => (
              <li key={outcome} className="od-proof__item">
                <span className="od-proof__icon" aria-hidden>
                  <BenefitCheckIcon />
                </span>
                <span className="od-proof__text">{outcome}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
