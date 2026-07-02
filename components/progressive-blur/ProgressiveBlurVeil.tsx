"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
  PROGRESSIVE_BLUR_BOTTOM_DARKEN,
  PROGRESSIVE_BLUR_HEIGHT_PX,
  PROGRESSIVE_BLUR_LAYERS_BOTTOM,
  PROGRESSIVE_BLUR_LAYERS_BOTTOM_LITE,
  PROGRESSIVE_BLUR_LAYERS_TOP,
  PROGRESSIVE_BLUR_LAYERS_TOP_LITE,
  PROGRESSIVE_BLUR_TOP_DARKEN,
  type BlurLayer,
} from "./constants";
import { ProgressiveBlurEdge } from "./ProgressiveBlurEdge";
import { ProgressiveBlurStaticVeil } from "./ProgressiveBlurStaticVeil";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";
import { useProgressiveBlurActive } from "./useProgressiveBlurActive";
import { useProgressiveBlurMode } from "./useProgressiveBlurMode";

const VEIL_Z = 49;

type BlurBandProps = {
  position: "top" | "bottom";
  layers: BlurLayer[];
  darken: string;
  active: boolean;
};

function BlurBand({ position, layers, darken, active }: BlurBandProps) {
  const edgeClass = position === "top" ? "top-0" : "bottom-0";

  return (
    <div
      aria-hidden
      className={`pointer-events-none fixed inset-x-0 ${edgeClass} select-none transition-opacity duration-300 ease-out`}
      style={{
        height: PROGRESSIVE_BLUR_HEIGHT_PX,
        zIndex: VEIL_Z,
        opacity: active ? 1 : 0,
        visibility: active ? "visible" : "hidden",
        transform: "translateZ(0)",
      }}
    >
      <div className="relative h-full w-full">
        <ProgressiveBlurEdge layers={layers} />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            zIndex: 9,
            background: darken,
          }}
        />
      </div>
    </div>
  );
}

/**
 * Viewport-fixed progressive blur at top + bottom (Framer-style).
 * Portaled to document.body so backdrop-filter composites over page content.
 */
export function ProgressiveBlurVeil() {
  const [mounted, setMounted] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();
  const mode = useProgressiveBlurMode();
  const active = useProgressiveBlurActive();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || prefersReducedMotion) {
    return null;
  }

  const topLayers =
    mode === "full" ? PROGRESSIVE_BLUR_LAYERS_TOP : PROGRESSIVE_BLUR_LAYERS_TOP_LITE;
  const bottomLayers =
    mode === "full"
      ? PROGRESSIVE_BLUR_LAYERS_BOTTOM
      : PROGRESSIVE_BLUR_LAYERS_BOTTOM_LITE;

  return createPortal(
    mode === "static" ? (
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 select-none transition-opacity duration-300 ease-out"
        style={{
          zIndex: VEIL_Z,
          opacity: active ? 1 : 0,
          visibility: active ? "visible" : "hidden",
        }}
      >
        <ProgressiveBlurStaticVeil />
      </div>
    ) : (
      <>
        <BlurBand
          position="top"
          layers={topLayers}
          darken={PROGRESSIVE_BLUR_TOP_DARKEN}
          active={active}
        />
        <BlurBand
          position="bottom"
          layers={bottomLayers}
          darken={PROGRESSIVE_BLUR_BOTTOM_DARKEN}
          active={active}
        />
      </>
    ),
    document.body,
  );
}
