"use client";

import { useEffect, useRef, useState } from "react";
import {
  COBE_MARKER_STYLES,
  GLOBE_COBE_COLORS,
  GLOBE_LOCATIONS,
} from "./constants";

type GlobeProps = {
  onLocationClick?: (id: string | null) => void;
  mode?: "explore" | "chapter";
  chapterPhi?: number;
  chapterTheta?: number;
  activeLocationId?: string | null;
  /**
   * When true in chapter mode, camera eases from a wide start into the
   * chapter angles instead of snapping immediately.
   */
  flyIn?: boolean;
  flyInStartPhi?: number;
  flyInStartTheta?: number;
};

export function Globe({
  onLocationClick,
  mode = "explore",
  chapterPhi,
  chapterTheta,
  activeLocationId = null,
  flyIn = false,
  flyInStartPhi = 4.2,
  flyInStartTheta = 0.15,
}: GlobeProps) {
  const isChapterMode = mode === "chapter";
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const globeRef = useRef<any>(null);
  const phiRef = useRef(flyIn ? flyInStartPhi : 4.2);
  const thetaRef = useRef(flyIn ? flyInStartTheta : 0.3);
  const velRef = useRef({ x: 0, y: 0 });
  const pointerDown = useRef(false);
  const pointerX = useRef(0);
  const pointerY = useRef(0);
  const autoRotate = useRef(true);
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const visibleRef = useRef(false);
  const frameIdRef = useRef(0);
  const startLoopRef = useRef<(() => void) | null>(null);
  const flyInRef = useRef(flyIn);
  const [activeId, setActiveId] = useState<string | null>(null);
  const targetPhiRef = useRef(phiRef.current);
  const targetThetaRef = useRef(thetaRef.current);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry?.isIntersecting ?? false;
        if (visibleRef.current) {
          startLoopRef.current?.();
        }
      },
      { rootMargin: "200px" },
    );

    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;

    let destroyed = false;
    const canvas = canvasRef.current;
    let width = canvas.offsetWidth;

    const resetIdleTimer = () => {
      if (idleTimer.current) clearTimeout(idleTimer.current);
      autoRotate.current = false;
      idleTimer.current = setTimeout(() => {
        autoRotate.current = true;
      }, 15_000);
    };

    const onDown = (e: PointerEvent) => {
      if (isChapterMode) return;
      pointerDown.current = true;
      pointerX.current = e.clientX;
      pointerY.current = e.clientY;
      velRef.current = { x: 0, y: 0 };
      if (idleTimer.current) clearTimeout(idleTimer.current);
      autoRotate.current = false;
      canvas.style.cursor = "grabbing";
    };
    const onMove = (e: PointerEvent) => {
      if (isChapterMode || !pointerDown.current) return;
      const dx = e.clientX - pointerX.current;
      const dy = e.clientY - pointerY.current;
      pointerX.current = e.clientX;
      pointerY.current = e.clientY;

      const dPhi = -dx / 200;
      const dTheta = dy / 200;
      phiRef.current += dPhi;
      thetaRef.current = Math.max(
        -Math.PI / 2,
        Math.min(Math.PI / 2, thetaRef.current + dTheta),
      );

      velRef.current.x = dPhi * 0.4 + velRef.current.x * 0.6;
      velRef.current.y = dTheta * 0.4 + velRef.current.y * 0.6;
    };
    const onUp = () => {
      pointerDown.current = false;
      canvas.style.cursor = "grab";
      resetIdleTimer();
    };
    const onResize = () => {
      if (canvas) width = canvas.offsetWidth;
    };

    if (!isChapterMode) {
      canvas.addEventListener("pointerdown", onDown);
      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerup", onUp);
    }
    window.addEventListener("resize", onResize);

    import("cobe").then(({ default: createGlobe }) => {
      if (destroyed || !canvas) return;

      const { baseColor, markerColor, glowColor } = GLOBE_COBE_COLORS;
      const mapSamples = window.matchMedia("(max-width: 810px)").matches
        ? 12000
        : 20000;

      const globe = createGlobe(canvas, {
        devicePixelRatio: 2,
        width: width * 2,
        height: width * 2,
        phi: phiRef.current,
        theta: thetaRef.current,
        dark: 1,
        diffuse: 1.2,
        mapSamples,
        mapBrightness: 6,
        baseColor,
        markerColor,
        glowColor,
        markerElevation: 0.1,
        markers: GLOBE_LOCATIONS.map((loc) => ({
          location: [loc.lat, loc.lng] as [number, number],
          size: 0.05,
          id: loc.id,
        })),
      });

      globeRef.current = globe;

      const FRICTION = 0.97;
      const VEL_FLOOR = 0.0001;

      const animate = () => {
        if (destroyed || !visibleRef.current) {
          frameIdRef.current = 0;
          return;
        }

        if (isChapterMode) {
          const lerp = flyInRef.current ? 0.045 : 0.12;
          phiRef.current += (targetPhiRef.current - phiRef.current) * lerp;
          thetaRef.current += (targetThetaRef.current - thetaRef.current) * lerp;
        } else if (autoRotate.current) {
          phiRef.current += 0.003;
        } else if (!pointerDown.current) {
          const v = velRef.current;
          if (Math.abs(v.x) > VEL_FLOOR || Math.abs(v.y) > VEL_FLOOR) {
            phiRef.current += v.x;
            thetaRef.current = Math.max(
              -Math.PI / 2,
              Math.min(Math.PI / 2, thetaRef.current + v.y),
            );
            v.x *= FRICTION;
            v.y *= FRICTION;
          }
        }

        globe.update({
          phi: phiRef.current,
          theta: thetaRef.current,
          width: width * 2,
          height: width * 2,
        });

        frameIdRef.current = requestAnimationFrame(animate);
      };

      startLoopRef.current = () => {
        if (!frameIdRef.current && !destroyed && visibleRef.current) {
          frameIdRef.current = requestAnimationFrame(animate);
        }
      };

      startLoopRef.current();
    });

    return () => {
      destroyed = true;
      startLoopRef.current = null;
      if (frameIdRef.current) {
        cancelAnimationFrame(frameIdRef.current);
      }
      if (idleTimer.current) clearTimeout(idleTimer.current);
      globeRef.current?.destroy();
      if (!isChapterMode) {
        canvas.removeEventListener("pointerdown", onDown);
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerup", onUp);
      }
      window.removeEventListener("resize", onResize);
    };
  }, [isChapterMode]);

  useEffect(() => {
    flyInRef.current = flyIn;
  }, [flyIn]);

  useEffect(() => {
    if (!isChapterMode) return;
    if (typeof chapterPhi === "number") {
      targetPhiRef.current = chapterPhi;
      if (!flyIn) {
        phiRef.current = chapterPhi;
      }
    }
    if (typeof chapterTheta === "number") {
      targetThetaRef.current = chapterTheta;
      if (!flyIn) {
        thetaRef.current = chapterTheta;
      }
    }
    if (flyIn) {
      phiRef.current = flyInStartPhi;
      thetaRef.current = flyInStartTheta;
    }
    autoRotate.current = false;
    velRef.current = { x: 0, y: 0 };
    startLoopRef.current?.();
  }, [
    chapterPhi,
    chapterTheta,
    isChapterMode,
    flyIn,
    flyInStartPhi,
    flyInStartTheta,
  ]);

  const handleMarkerClick = (id: string) => {
    if (isChapterMode) return;
    const next = activeId === id ? null : id;
    setActiveId(next);
    onLocationClick?.(next);
  };

  const highlightedId = isChapterMode ? activeLocationId : activeId;

  return (
    <div ref={rootRef} className="globe-canvas relative size-full">
      <canvas
        ref={canvasRef}
        className="block size-full touch-none"
        style={{ cursor: isChapterMode ? "default" : "grab" }}
      />
      {!isChapterMode &&
        GLOBE_LOCATIONS.map((loc) => (
        <div
          key={loc.id}
          className={`globe-map-marker globe-map-marker--offices-1 cobe-marker${
            highlightedId === loc.id
              ? " globe-map-marker--active"
              : highlightedId
                ? " globe-map-marker--inactive"
                : ""
          }`}
          data-cobe-id={loc.id}
          onClick={() => handleMarkerClick(loc.id)}
        >
          <span className="globe-map-marker__dot" />
          <div className="globe-map-marker__flag">
            <span className="globe-map-marker__link">{loc.name}</span>
          </div>
        </div>
      ))}
      <style>{COBE_MARKER_STYLES}</style>
    </div>
  );
}
