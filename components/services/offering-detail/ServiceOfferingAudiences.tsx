"use client";

import { useRef } from "react";
import { useServiceOfferingAudiencesAnimation } from "./useServiceOfferingAudiencesAnimation";

export type ServiceOfferingAudiencesProps = {
  headline?: string;
  audiences: readonly string[];
};

export function ServiceOfferingAudiences({
  headline = "Built for",
  audiences,
}: ServiceOfferingAudiencesProps) {
  const sectionRef = useRef<HTMLElement>(null);
  useServiceOfferingAudiencesAnimation({ sectionRef });

  return (
    <section ref={sectionRef} className="od-audiences sd-section">
      <div className="sd-container">
        <p className="od-audiences__label">{headline}</p>
        <ul className="od-audiences__list">
          {audiences.map((audience) => (
            <li key={audience} className="od-audiences__item">
              <span className="od-audiences__mark" aria-hidden />
              <span className="od-audiences__text">{audience}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
