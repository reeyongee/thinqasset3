"use client";

import { useEffect, useRef } from "react";
import { HERO_BG_CRUISE_RATE } from "@/components/hero/constants";
import { GRAPH_PHASE_START } from "@/components/scroll-story/constants";
import { scrollStoryProgressStore } from "@/components/scroll-story/scrollStoryProgressStore";

const EASE_WINDOW = 1.5;
const FLIP_THRESHOLD = 0.05;
const MAX_RATE = 4;

type Direction = 1 | -1;

type PlaybackBounds = {
  min: number;
  reverse: boolean;
};

function easeInRate(progress: number) {
  return Math.sin((progress * Math.PI) / 2);
}

function getForwardRate(
  currentTime: number,
  duration: number,
  cruise = HERO_BG_CRUISE_RATE,
) {
  const ease = Math.min(EASE_WINDOW, duration / 4);

  if (currentTime < ease) {
    return easeInRate(currentTime / ease) * cruise;
  }

  if (currentTime > duration - ease) {
    return easeInRate((duration - currentTime) / ease) * cruise;
  }

  return cruise;
}

function getReverseRate(
  currentTime: number,
  duration: number,
  cruise = HERO_BG_CRUISE_RATE,
) {
  const ease = Math.min(EASE_WINDOW, duration / 4);

  if (currentTime > duration - ease) {
    return -easeInRate((duration - currentTime) / ease) * cruise;
  }

  if (currentTime < ease) {
    return -easeInRate(currentTime / ease) * cruise;
  }

  return -cruise;
}

function probePlaybackBounds(video: HTMLVideoElement): PlaybackBounds {
  const previous = video.playbackRate;
  let min = 0.5;

  for (const rate of [0.0625, 0.125, 0.25, 0.5, 1]) {
    try {
      video.playbackRate = rate;
      if (Math.abs(video.playbackRate - rate) < 0.001) {
        min = rate;
        break;
      }
    } catch {
      // Browser rejected this rate; try the next candidate.
    }
  }

  let reverse = false;
  try {
    video.playbackRate = -1;
    reverse = video.playbackRate < 0;
  } catch {
    reverse = false;
  }

  try {
    video.playbackRate = previous;
  } catch {
    try {
      video.playbackRate = min;
    } catch {
      video.playbackRate = 1;
    }
  }

  return { min, reverse };
}

function clampPlaybackRate(rate: number, min: number) {
  const sign = Math.sign(rate) || 1;
  const magnitude = Math.max(min, Math.min(MAX_RATE, Math.abs(rate)));
  return sign * magnitude;
}

function applyPlaybackRate(
  video: HTMLVideoElement,
  rate: number,
  min: number,
) {
  const clamped = clampPlaybackRate(rate, min);

  try {
    video.playbackRate = clamped;
    return clamped;
  } catch {
    const fallback = rate < 0 ? -min : min;
    try {
      video.playbackRate = fallback;
    } catch {
      video.playbackRate = 1;
    }
    return fallback;
  }
}

function shouldPlayHeroVideo() {
  const { progress, pinActive } = scrollStoryProgressStore.getSnapshot();
  if (progress >= GRAPH_PHASE_START) return false;
  if (pinActive) return true;
  return progress === 0;
}

export function useSineBoomerangVideo(enabled: boolean) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const directionRef = useRef<Direction>(1);
  const boundsRef = useRef<PlaybackBounds>({ min: 0.5, reverse: false });
  const pausedByScrollRef = useRef(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!enabled) return;

    const video = videoRef.current;
    if (!video) return;

    let disposed = false;

    const cancelTick = () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };

    const syncPlayback = async () => {
      if (disposed) return;

      if (pausedByScrollRef.current || !shouldPlayHeroVideo()) {
        if (!video.paused) video.pause();
        cancelTick();
        return;
      }

      if (video.paused) {
        try {
          await video.play();
        } catch {
          return;
        }
      }

      if (rafRef.current === null) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    const tick = () => {
      rafRef.current = null;

      if (disposed || pausedByScrollRef.current || !shouldPlayHeroVideo()) {
        return;
      }

      const duration = video.duration;
      if (!Number.isFinite(duration) || duration <= 0) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      const { min, reverse } = boundsRef.current;

      if (!reverse) {
        applyPlaybackRate(video, HERO_BG_CRUISE_RATE, min);
        if (video.currentTime >= duration - FLIP_THRESHOLD) {
          video.currentTime = 0;
        }
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      const direction = directionRef.current;
      const currentTime = video.currentTime;
      const rawRate =
        direction === 1
          ? getForwardRate(currentTime, duration)
          : getReverseRate(currentTime, duration);

      if (direction === 1 && currentTime >= duration - FLIP_THRESHOLD) {
        directionRef.current = -1;
        video.currentTime = Math.max(0, duration - FLIP_THRESHOLD);
        applyPlaybackRate(video, -min, min);
      } else if (direction === -1 && currentTime <= FLIP_THRESHOLD) {
        directionRef.current = 1;
        video.currentTime = Math.min(duration, FLIP_THRESHOLD);
        applyPlaybackRate(video, min, min);
      } else {
        applyPlaybackRate(video, rawRate, min);
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    const onLoadedMetadata = () => {
      boundsRef.current = probePlaybackBounds(video);
      directionRef.current = 1;
      applyPlaybackRate(video, boundsRef.current.min, boundsRef.current.min);
    };

    const onCanPlay = () => {
      void syncPlayback();
    };

    const onEnded = () => {
      if (boundsRef.current.reverse) return;
      video.currentTime = 0;
      void video.play();
    };

    const onVisibilityChange = () => {
      if (document.hidden) {
        video.pause();
        cancelTick();
        return;
      }
      void syncPlayback();
    };

    const onScrollStoryChange = () => {
      const shouldPlay = shouldPlayHeroVideo();
      pausedByScrollRef.current = !shouldPlay;

      if (shouldPlay) {
        void syncPlayback();
      } else {
        video.pause();
        cancelTick();
      }
    };

    video.addEventListener("loadedmetadata", onLoadedMetadata);
    video.addEventListener("canplay", onCanPlay);
    video.addEventListener("ended", onEnded);
    document.addEventListener("visibilitychange", onVisibilityChange);
    const unsubscribeScroll = scrollStoryProgressStore.subscribe(onScrollStoryChange);

    if (video.readyState >= 1) {
      onLoadedMetadata();
    }
    if (video.readyState >= 3) {
      void syncPlayback();
    }

    return () => {
      disposed = true;
      cancelTick();
      video.removeEventListener("loadedmetadata", onLoadedMetadata);
      video.removeEventListener("canplay", onCanPlay);
      video.removeEventListener("ended", onEnded);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      unsubscribeScroll();
    };
  }, [enabled]);

  return videoRef;
}
