"use client";

import { FundManagementSvg } from "@/components/lab/scroll-svg/beats/FundManagementSvg";
import { StructuringSvg } from "@/components/lab/scroll-svg/beats/StructuringSvg";
import { PartnershipSvg } from "@/components/lab/scroll-svg/beats/PartnershipSvg";
import { DisciplineSvg } from "@/components/lab/scroll-svg/beats/DisciplineSvg";

const BEAT_VIZ = [
  FundManagementSvg,
  StructuringSvg,
  PartnershipSvg,
  DisciplineSvg,
] as const;

/**
 * Right-side visual stage for the pinned scroll story.
 * Each beat SVG is scrubbed by `useScrollStoryTimeline`.
 */
export function ScrollStoryBeatVisuals() {
  return (
    <div className="scroll-story-beats-visual pointer-events-none absolute inset-0 z-[1] opacity-0">
      <div
        className="scroll-story-beats-stage absolute top-[40%] right-0 bottom-0 left-0 overflow-hidden min-[810px]:top-0 min-[810px]:left-[36%] min-[810px]:h-full"
        style={{
          WebkitMaskImage:
            "linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 14%)",
          maskImage:
            "linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 14%)",
        }}
      >
        <div className="scroll-story-beats-inner absolute inset-0 flex items-center justify-center p-[4%] min-[810px]:p-[6%]">
          {BEAT_VIZ.map((Viz, index) => (
            <div
              key={index}
              className={`scroll-story-beat-viz scroll-story-beat-viz-${index} absolute inset-0 flex items-center justify-center opacity-0`}
            >
              <Viz
                autoplay={false}
                className="scroll-story-beat-svg h-full w-full max-w-[min(100%,560px)]"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
