import gsap from "gsap";
import {
  CAMERA_STAGE_FOUR_DESKTOP,
  CAMERA_STAGE_FOUR_MOBILE,
  CAMERA_STAGE_ONE,
  ROTATION_GLOBAL,
  ROTATION_HERO,
  ROTATION_REGIONAL,
  MOBILE_JS_BREAKPOINT,
  SCRUB_CAMERA_DURATION_DESKTOP,
  SCRUB_CAMERA_DURATION_MOBILE,
  SCRUB_GLOBAL_DURATION_DESKTOP,
  SCRUB_GLOBAL_DURATION_MOBILE,
  SCRUB_GLOBAL_START_DESKTOP,
  SCRUB_GLOBAL_START_MOBILE,
  SCRUB_REGIONAL_DURATION_DESKTOP,
  SCRUB_REGIONAL_DURATION_MOBILE,
  SCRUB_REGIONAL_START,
} from "./constants";

export type GlobeScrollCameraState = {
  cameraY: number;
  cameraZ: number;
  globeY: number;
  scale: number;
};

export type GlobeScrollRotationState = {
  x: number;
  y: number;
  z: number;
};

export type GlobeScrollTimeline = {
  timeline: gsap.core.Timeline;
  camera: GlobeScrollCameraState;
  rotation: GlobeScrollRotationState;
  setProgress: (progress: number) => void;
  dispose: () => void;
};

function stageFour(width: number): GlobeScrollCameraState {
  return width < MOBILE_JS_BREAKPOINT
    ? { ...CAMERA_STAGE_FOUR_MOBILE }
    : { ...CAMERA_STAGE_FOUR_DESKTOP };
}

function scrubProfile(width: number) {
  if (width < MOBILE_JS_BREAKPOINT) {
    return {
      regionalDuration: SCRUB_REGIONAL_DURATION_MOBILE,
      globalStart: SCRUB_GLOBAL_START_MOBILE,
      globalDuration: SCRUB_GLOBAL_DURATION_MOBILE,
      cameraDuration: SCRUB_CAMERA_DURATION_MOBILE,
    };
  }
  return {
    regionalDuration: SCRUB_REGIONAL_DURATION_DESKTOP,
    globalStart: SCRUB_GLOBAL_START_DESKTOP,
    globalDuration: SCRUB_GLOBAL_DURATION_DESKTOP,
    cameraDuration: SCRUB_CAMERA_DURATION_DESKTOP,
  };
}

/** GSAP scrub timeline — rotation + camera use inOut eases for a calm scroll feel. */
export function createGlobeScrollTimeline(width: number): GlobeScrollTimeline {
  const camera: GlobeScrollCameraState = { ...CAMERA_STAGE_ONE };
  const rotation: GlobeScrollRotationState = { ...ROTATION_HERO };
  const scrub = scrubProfile(width);

  const timeline = gsap.timeline({ paused: true });

  timeline.to(
    camera,
    {
      ...stageFour(width),
      duration: scrub.cameraDuration,
      ease: "power1.inOut",
    },
    scrub.globalStart,
  );
  timeline.to(
    rotation,
    {
      ...ROTATION_REGIONAL,
      duration: scrub.regionalDuration,
      ease: "power2.inOut",
    },
    SCRUB_REGIONAL_START,
  );
  timeline.to(
    rotation,
    {
      x: ROTATION_GLOBAL.x,
      y: ROTATION_GLOBAL.y,
      z: ROTATION_GLOBAL.z,
      duration: scrub.globalDuration,
      ease: "power2.inOut",
    },
    scrub.globalStart,
  );

  return {
    timeline,
    camera,
    rotation,
    setProgress(progress: number) {
      timeline.progress(Math.max(0, Math.min(1, progress)));
    },
    dispose() {
      timeline.kill();
    },
  };
}
