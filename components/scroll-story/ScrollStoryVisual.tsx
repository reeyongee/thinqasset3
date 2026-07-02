"use client";

import Image from "next/image";
import { HERO_BG_IMAGE } from "@/components/hero/constants";
import { InvestmentGraph } from "./InvestmentGraph";

const GRAPH_STAGE_MASK =
  "linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 16%)";

export function ScrollStoryVisual() {
  return (
    <>
      <div
        className="scroll-story-image pointer-events-none absolute inset-0 z-0 overflow-hidden"
        style={{
          WebkitMaskImage:
            "linear-gradient(90deg, rgba(0, 0, 0, 0) 33%, rgb(0, 0, 0) 100%)",
          maskImage:
            "linear-gradient(90deg, rgba(0, 0, 0, 0) 33%, rgb(0, 0, 0) 100%)",
        }}
      >
        <div className="hero-bg-scale absolute inset-0">
          <Image
            src={HERO_BG_IMAGE}
            alt=""
            fill
            priority
            className="hero-bg-image object-cover"
            sizes="100vw"
          />
          <div className="hero-bg-shade" aria-hidden />
        </div>
      </div>

      <div className="scroll-story-graph pointer-events-none absolute inset-0 z-[1] opacity-0">
        <div
          className="scroll-story-graph-stage absolute top-[44%] right-0 bottom-0 left-0 overflow-hidden min-[810px]:top-0 min-[810px]:left-[38%] min-[810px]:h-full"
          style={{
            WebkitMaskImage: GRAPH_STAGE_MASK,
            maskImage: GRAPH_STAGE_MASK,
          }}
        >
          <div className="scroll-story-graph-inner absolute inset-0 flex items-center justify-center">
            <InvestmentGraph className="scroll-story-graph-svg h-full w-full max-w-[min(100%,680px)] min-[810px]:max-w-none" />
          </div>
        </div>
      </div>
    </>
  );
}
