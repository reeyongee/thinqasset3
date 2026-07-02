import {
  PROGRESSIVE_BLUR_HEIGHT_PX,
  PROGRESSIVE_BLUR_STATIC_BOTTOM,
  PROGRESSIVE_BLUR_STATIC_TOP,
} from "./constants";

/** Gradient-only edge fade for low-end devices (no backdrop-filter). */
export function ProgressiveBlurStaticVeil() {
  return (
    <>
      <div
        className="pointer-events-none fixed inset-x-0 top-0"
        style={{
          height: PROGRESSIVE_BLUR_HEIGHT_PX,
          zIndex: 49,
          background: PROGRESSIVE_BLUR_STATIC_TOP,
        }}
      />
      <div
        className="pointer-events-none fixed inset-x-0 bottom-0"
        style={{
          height: PROGRESSIVE_BLUR_HEIGHT_PX,
          zIndex: 49,
          background: PROGRESSIVE_BLUR_STATIC_BOTTOM,
        }}
      />
    </>
  );
}
