"use client";

import { useRef } from "react";
import { useServiceOfferingManifestAnimation } from "./useServiceOfferingManifestAnimation";

export type ServiceOfferingManifestProps = {
  statement: string;
  narrative: readonly [string, string];
};

export function ServiceOfferingManifest({
  statement,
  narrative,
}: ServiceOfferingManifestProps) {
  const sectionRef = useRef<HTMLElement>(null);
  useServiceOfferingManifestAnimation({ sectionRef });

  return (
    <section ref={sectionRef} className="od-manifest sd-section">
      <div className="sd-container">
        <p className="od-manifest__label">The idea</p>
        <blockquote className="od-manifest__statement">{statement}</blockquote>
        <div className="od-manifest__grid">
          {narrative.map((paragraph, i) => (
            <p key={i} className="od-manifest__para sd-body">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
