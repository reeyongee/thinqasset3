"use client";

import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";
import * as THREE from "three";
import { createEarth } from "./createEarth";
import { createGlobeScrollTimeline } from "./globeTimeline";
import {
  BOUNDS_EPSILON,
  GLOBE_IDLE_ROTATION_SPEED,
  GLOBE_RADIUS,
  MASK_OFFSET,
  MOBILE_MASK_MAX_OFFSET,
  MOBILE_MASK_VH_RATIO,
  MOBILE_JS_BREAKPOINT,
  NARRATIVE_MASK_INNER_OFFSET,
  NARRATIVE_MASK_OUTER_OFFSET,
} from "./constants";

export type GlobeScreenBounds = {
  x: number;
  y: number;
  radius: number;
};

export type GlobeScrollCanvasHandle = {
  getScreenBounds: () => GlobeScreenBounds | null;
  setNarrativeProgress: (progress: number) => void;
};

type GlobeScrollCanvasProps = {
  /** When true, stops the WebGL render loop (idle spin + draws). */
  paused?: boolean;
};

function projectScreenBounds(
  camera: THREE.PerspectiveCamera,
  globeY: number,
  scale: number,
  width: number,
  height: number,
): GlobeScreenBounds {
  const h = new THREE.Vector3(1, 0, 0);
  h.applyQuaternion(camera.quaternion).normalize();

  const center = new THREE.Vector3(0, globeY, 0);
  const rim = center.clone().addScaledVector(h, GLOBE_RADIUS * scale);

  center.project(camera);
  rim.project(camera);

  const cx = (center.x * 0.5 + 0.5) * width;
  const cy = (-center.y * 0.5 + 0.5) * height;
  const tx = (rim.x * 0.5 + 0.5) * width;

  return {
    x: cx,
    y: cy,
    radius: Math.abs(tx - cx),
  };
}

export const GlobeScrollCanvas = forwardRef<GlobeScrollCanvasHandle, GlobeScrollCanvasProps>(
  function GlobeScrollCanvas({ paused = false }, ref) {
    const hostRef = useRef<HTMLDivElement>(null);
    const narrativeProgressRef = useRef(0);
    const pausedRef = useRef(paused);
    const boundsRef = useRef<GlobeScreenBounds>({ x: 0, y: 0, radius: 0 });
    const ensureLoopRef = useRef<(() => void) | null>(null);
    const scrubBoostUntilRef = useRef(0);

    useEffect(() => {
      pausedRef.current = paused;
      if (!paused) ensureLoopRef.current?.();
    }, [paused]);

    useImperativeHandle(ref, () => ({
      getScreenBounds: () => boundsRef.current,
      setNarrativeProgress: (p: number) => {
        narrativeProgressRef.current = Math.max(0, Math.min(1, p));
        scrubBoostUntilRef.current = performance.now() + 160;
        ensureLoopRef.current?.();
      },
    }));

    useEffect(() => {
      const host = hostRef.current;
      if (!host) return;

      let disposed = false;
      let earth: Awaited<ReturnType<typeof createEarth>> | null = null;
      const lowQuality = window.innerWidth < 1024;
      const maxPixelRatio = lowQuality ? 1.25 : 2;
      const section = host.closest(".globe-scroll");
      let sectionVisible = true;
      let pageVisible = !document.hidden;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 2000);
      const renderer = new THREE.WebGLRenderer({
        antialias: !lowQuality,
        alpha: true,
        powerPreference: "high-performance",
      });
      renderer.setClearColor(0x000000, 0);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.0;
      renderer.domElement.style.display = "block";
      renderer.domElement.style.width = "100%";
      renderer.domElement.style.height = "100%";
      host.appendChild(renderer.domElement);

      let scrubTimeline = createGlobeScrollTimeline(window.innerWidth);
      let width = 1;
      let height = 1;
      let raf = 0;
      let last = performance.now();
      let idleYaw = 0;
      let idleFrameBudget = 0;
      const IDLE_FRAME_MS = 1000 / 30;

      const canDraw = () =>
        !disposed && Boolean(earth) && sectionVisible && pageVisible;

      const shouldLoop = () => canDraw() && !pausedRef.current;

      const resize = () => {
        const nextWidth = host.clientWidth || window.innerWidth;
        const nextHeight = host.clientHeight || window.innerHeight;
        const crossedMobile =
          (width < MOBILE_JS_BREAKPOINT && nextWidth >= MOBILE_JS_BREAKPOINT) ||
          (width >= MOBILE_JS_BREAKPOINT && nextWidth < MOBILE_JS_BREAKPOINT);
        width = nextWidth;
        height = nextHeight;
        if (crossedMobile) {
          const progress = narrativeProgressRef.current;
          scrubTimeline.dispose();
          scrubTimeline = createGlobeScrollTimeline(width);
          scrubTimeline.setProgress(progress);
        }
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, maxPixelRatio));
        renderer.setSize(width, height, false);
      };

      const updateBounds = () => {
        const { camera: cameraState } = scrubTimeline;
        const next = projectScreenBounds(
          camera,
          cameraState.globeY,
          cameraState.scale,
          width,
          height,
        );
        const prev = boundsRef.current;
        if (
          Math.abs(prev.x - next.x) < BOUNDS_EPSILON &&
          Math.abs(prev.y - next.y) < BOUNDS_EPSILON &&
          Math.abs(prev.radius - next.radius) < BOUNDS_EPSILON
        ) {
          return;
        }
        boundsRef.current = next;
      };

      const renderOnce = (dt: number, advanceIdle: boolean) => {
        if (!earth || !canDraw()) return;

        scrubTimeline.setProgress(narrativeProgressRef.current);
        const { camera: cameraState, rotation } = scrubTimeline;

        if (advanceIdle) {
          idleYaw += dt * GLOBE_IDLE_ROTATION_SPEED;
        }

        earth.group.rotation.set(rotation.x, rotation.y + idleYaw, rotation.z);
        earth.group.position.y = cameraState.globeY;
        earth.group.scale.setScalar(cameraState.scale);

        camera.position.set(0, cameraState.cameraY, cameraState.cameraZ);
        camera.lookAt(0, cameraState.cameraY, 0);
        camera.updateMatrixWorld();
        earth.updateLights(camera);

        renderer.render(scene, camera);
        updateBounds();
      };

      const tick = (now: number) => {
        if (!shouldLoop()) {
          raf = 0;
          return;
        }

        const dt = Math.min((now - last) / 1000, 0.05);
        last = now;
        const scrubbing = now < scrubBoostUntilRef.current;

        // Full framerate while scrubbing; ~30fps for idle spin only.
        if (!scrubbing) {
          idleFrameBudget += dt * 1000;
          if (idleFrameBudget < IDLE_FRAME_MS) {
            raf = requestAnimationFrame(tick);
            return;
          }
          idleFrameBudget = 0;
        } else {
          idleFrameBudget = 0;
        }

        renderOnce(dt, true);
        raf = requestAnimationFrame(tick);
      };

      const ensureLoop = () => {
        if (!canDraw()) return;
        // Reduced-motion / paused: still paint scrub changes, no continuous loop.
        if (pausedRef.current) {
          renderOnce(0, false);
          return;
        }
        if (raf) return;
        last = performance.now();
        raf = requestAnimationFrame(tick);
      };
      ensureLoopRef.current = ensureLoop;

      const onVisibility = () => {
        pageVisible = !document.hidden;
        if (pageVisible) ensureLoop();
      };

      resize();
      window.addEventListener("resize", resize);
      document.addEventListener("visibilitychange", onVisibility);

      const sectionObserver = section
        ? new IntersectionObserver(
            ([entry]) => {
              sectionVisible = entry?.isIntersecting ?? false;
              if (sectionVisible) ensureLoop();
            },
            { rootMargin: "80px 0px" },
          )
        : null;
      if (section && sectionObserver) sectionObserver.observe(section);

      createEarth(renderer, lowQuality).then((created) => {
        if (disposed) {
          created.dispose();
          return;
        }
        earth = created;
        scene.add(earth.group);
        renderOnce(0, false);
        ensureLoop();
      });

      return () => {
        disposed = true;
        ensureLoopRef.current = null;
        cancelAnimationFrame(raf);
        window.removeEventListener("resize", resize);
        document.removeEventListener("visibilitychange", onVisibility);
        sectionObserver?.disconnect();
        scrubTimeline.dispose();
        earth?.dispose();
        renderer.dispose();
        if (renderer.domElement.parentNode === host) {
          host.removeChild(renderer.domElement);
        }
      };
    }, []);

    return <div ref={hostRef} className="globe-scroll__canvas" />;
  },
);

/** Fin ze() — inverse narrative mask so copy emerges from behind the globe */
export function computeNarrativeMask(
  bounds: GlobeScreenBounds,
  narrativeViewportTop: number,
) {
  return {
    x: bounds.x,
    y: bounds.y - narrativeViewportTop,
    inner: Math.max(0, bounds.radius + NARRATIVE_MASK_INNER_OFFSET),
    outer: bounds.radius + NARRATIVE_MASK_OUTER_OFFSET,
  };
}

export function computeMaskFromBounds(
  bounds: GlobeScreenBounds,
  narrativeProgress: number,
  viewportHeight: number,
  isMobile: boolean,
) {
  const maskX = bounds.x;
  let maskY =
    bounds.y -
    bounds.radius * 0.32 * (1 - narrativeProgress) +
    MASK_OFFSET * (1 - narrativeProgress);
  if (isMobile) {
    maskY -= Math.min(MOBILE_MASK_MAX_OFFSET, viewportHeight * MOBILE_MASK_VH_RATIO);
  }
  return {
    x: maskX,
    y: maskY,
    radiusX: bounds.radius * 1.95,
    radiusY: bounds.radius * 0.95,
  };
}
