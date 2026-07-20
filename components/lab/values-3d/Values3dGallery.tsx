"use client";

import { useMemo } from "react";
import { VALUE_META, type ValueId } from "./constants";
import { useThreeViz } from "./useThreeViz";
import { createExperienceViz } from "./viz/experience";
import { createPartnershipsViz } from "./viz/partnerships";
import { createInnovationViz } from "./viz/innovation";
import { createTrustViz } from "./viz/trust";
import { createFlexibilityViz } from "./viz/flexibility";
import type { CreateViz } from "./types";
import "./values-3d.css";

const CREATORS: Record<ValueId, CreateViz> = {
  experience: createExperienceViz,
  partnerships: createPartnershipsViz,
  innovation: createInnovationViz,
  trust: createTrustViz,
  flexibility: createFlexibilityViz,
};

function ValueCard({
  id,
  label,
  blurb,
  duration,
}: {
  id: ValueId;
  label: string;
  blurb: string;
  duration: number;
}) {
  const create = useMemo(() => CREATORS[id], [id]);
  const { hostRef } = useThreeViz({ create });

  return (
    <article className="values-3d-card" data-value={id}>
      <div ref={hostRef} className="values-3d-canvas" aria-hidden />
      <header className="values-3d-card-meta">
        <div className="values-3d-card-title-row">
          <h2>{label}</h2>
          <span className="values-3d-duration">{duration.toFixed(1)}s</span>
        </div>
        <p>{blurb}</p>
      </header>
    </article>
  );
}

export function Values3dGallery() {
  return (
    <div className="values-3d" data-transition-page>
      <header className="values-3d-intro">
        <p className="values-3d-eyebrow">Motion lab</p>
        <h1>Values → Three.js</h1>
        <p className="values-3d-lede">
          Abstract rebuilds of the five Hark value loops — same timing language
          (<code> cubic-bezier(0.85, 0, 0.15, 1) </code>, move/hold cadence —
          expressed as ThinqAsset-toned WebGL studies. Not the original Lottie
          assets.
        </p>
      </header>

      <div className="values-3d-grid">
        {VALUE_META.map((item) => (
          <ValueCard key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
}
