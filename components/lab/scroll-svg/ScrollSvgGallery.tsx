"use client";

import { BEAT_CARDS } from "./constants";
import { FundManagementSvg } from "./beats/FundManagementSvg";
import { StructuringSvg } from "./beats/StructuringSvg";
import { PartnershipSvg } from "./beats/PartnershipSvg";
import { DisciplineSvg } from "./beats/DisciplineSvg";
import "./scroll-svg.css";

const BEAT_VIZ = {
  "fund-management": FundManagementSvg,
  "investment-structuring": StructuringSvg,
  "partnership-development": PartnershipSvg,
  "built-with-discipline": DisciplineSvg,
} as const;

export function ScrollSvgGallery() {
  return (
    <div className="scroll-svg" data-transition-page>
      <div className="scroll-svg-grid scroll-svg-grid--bare">
        {BEAT_CARDS.map((beat) => {
          const Viz = BEAT_VIZ[beat.id];
          return (
            <article
              key={beat.id}
              className="scroll-svg-card"
              data-beat={beat.id}
              aria-label={beat.title}
            >
              <div className="scroll-svg-frame">
                <Viz />
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
