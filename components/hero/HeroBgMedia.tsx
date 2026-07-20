"use client";

import { useState, useSyncExternalStore } from "react";
import {
  HERO_BG_POSTER,
  HERO_BG_VIDEO_MP4,
  HERO_BG_VIDEO_WEBM,
} from "@/components/hero/constants";
import { useSineBoomerangVideo } from "@/components/hero/useSineBoomerangVideo";

function subscribeReducedMotion(onStoreChange: () => void) {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener("change", onStoreChange);
  return () => media.removeEventListener("change", onStoreChange);
}

function getReducedMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

export function HeroBgMedia() {
  const prefersReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  );
  const videoRef = useSineBoomerangVideo(!prefersReducedMotion);
  const [videoPlaying, setVideoPlaying] = useState(false);

  return (
    <div
      className="hero-bg-media absolute inset-0"
      data-video-playing={videoPlaying ? "" : undefined}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={HERO_BG_POSTER}
        alt=""
        className="hero-bg-poster"
        fetchPriority="high"
        decoding="async"
      />
      {!prefersReducedMotion ? (
        <video
          ref={videoRef}
          className="hero-bg-video"
          autoPlay
          muted
          playsInline
          preload="auto"
          aria-hidden
          onPlaying={() => setVideoPlaying(true)}
        >
          <source src={HERO_BG_VIDEO_WEBM} type="video/webm" />
          <source src={HERO_BG_VIDEO_MP4} type="video/mp4" />
        </video>
      ) : null}
      <div className="hero-bg-shade" aria-hidden />
    </div>
  );
}
