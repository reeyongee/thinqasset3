"use client";

import { useEffect, useRef, useState } from "react";
import {
  COBE_MARKER_STYLES,
  GLOBE_COBE_COLORS,
  GLOBE_LOCATIONS,
} from "./constants";

export function Globe({
  onLocationClick,
}: {
  onLocationClick?: (id: string | null) => void;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const globeRef = useRef<any>(null);
  const phiRef = useRef(4.2);
  const thetaRef = useRef(0.3);
  const velRef = useRef({ x: 0, y: 0 });
  const pointerDown = useRef(false);
  const pointerX = useRef(0);
  const pointerY = useRef(0);
  const autoRotate = useRef(true);
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const visibleRef = useRef(false);
  const frameIdRef = useRef(0);
  const startLoopRef = useRef<(() => void) | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);

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
      pointerDown.current = true;
      pointerX.current = e.clientX;
      pointerY.current = e.clientY;
      velRef.current = { x: 0, y: 0 };
      if (idleTimer.current) clearTimeout(idleTimer.current);
      autoRotate.current = false;
      canvas.style.cursor = "grabbing";
    };
    const onMove = (e: PointerEvent) => {
      if (!pointerDown.current) return;
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

    canvas.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
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
        markerElevation: 0,
        markers: GLOBE_LOCATIONS.map((loc) => ({
          location: [loc.lat, loc.lng] as [number, number],
          size: 0,
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

        if (autoRotate.current) {
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
      canvas.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const handleMarkerClick = (id: string) => {
    const next = activeId === id ? null : id;
    setActiveId(next);
    onLocationClick?.(next);
  };

  return (
    <div ref={rootRef} className="globe-canvas relative size-full">
      <canvas
        ref={canvasRef}
        className="block size-full touch-none"
        style={{ cursor: "grab" }}
      />
      {GLOBE_LOCATIONS.map((loc) => (
        <div
          key={loc.id}
          className={`globe-map-marker globe-map-marker--offices-1 cobe-marker${
            activeId === loc.id
              ? " globe-map-marker--active"
              : activeId
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
