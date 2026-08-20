"use client";

import { PRISM_VIDEO_MP4, PRISM_VIDEO_POSTER } from "./constants";
import { useReducedMotion } from "./useReducedMotion";
import "./prism-video-bg.css";

type PrismVideoBackgroundProps = {
  contained?: boolean;
};

export function PrismVideoBackground({
  contained = false,
}: PrismVideoBackgroundProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      className={
        contained ? "prism-video-bg prism-video-bg--contained" : "prism-video-bg"
      }
      aria-hidden
    >
      {prefersReducedMotion ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={PRISM_VIDEO_POSTER} alt="" className="prism-video-bg__media" />
      ) : (
        <video
          className="prism-video-bg__media"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={PRISM_VIDEO_POSTER}
        >
          <source src={PRISM_VIDEO_MP4} type="video/mp4" />
        </video>
      )}
    </div>
  );
}
