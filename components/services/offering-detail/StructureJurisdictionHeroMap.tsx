"use client";

import { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import type { OfferingGlobeLocationId } from "./types";
import {
  STRUCTURE_CITY_CAMERAS,
  STRUCTURE_MAP_FLY_DURATION_MS,
  STRUCTURE_MAP_STYLE,
} from "./structureCityCameras";
import {
  addBrandBuildingsLayer,
  applyThinqMapTheme,
} from "./structureMapTheme";

export type StructureJurisdictionHeroMapProps = {
  locationId: OfferingGlobeLocationId;
};

function canCreateWebGLContext() {
  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl2", { failIfMajorPerformanceCaveat: false }) ??
      canvas.getContext("webgl", { failIfMajorPerformanceCaveat: false });
    if (!gl) return false;
    const lose = (gl as WebGLRenderingContext).getExtension(
      "WEBGL_lose_context",
    );
    lose?.loseContext();
    return true;
  } catch {
    return false;
  }
}

export function StructureJurisdictionHeroMap({
  locationId,
}: StructureJurisdictionHeroMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const [failed, setFailed] = useState(false);
  const camera = STRUCTURE_CITY_CAMERAS[locationId];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // MapLibre requires WebGL; sandboxed / GPU-disabled browsers throw
    // synchronously from the Map constructor if context creation fails.
    if (!canCreateWebGLContext()) {
      setFailed(true);
      return;
    }

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let map: maplibregl.Map;
    try {
      map = new maplibregl.Map({
        container,
        style: STRUCTURE_MAP_STYLE,
        center: reduceMotion ? camera.end.center : camera.start.center,
        zoom: reduceMotion ? camera.end.zoom : camera.start.zoom,
        pitch: reduceMotion ? camera.end.pitch : camera.start.pitch,
        bearing: reduceMotion ? camera.end.bearing : camera.start.bearing,
        interactive: false,
        attributionControl: { compact: true },
        maplibreLogo: false,
        fadeDuration: 0,
        canvasContextAttributes: { antialias: true },
        maxPitch: 70,
      });
    } catch {
      setFailed(true);
      return;
    }

    mapRef.current = map;
    setFailed(false);

    const runFlyIn = () => {
      applyThinqMapTheme(map);
      addBrandBuildingsLayer(map);
      if (reduceMotion) return;

      // Let tiles settle briefly, then fly into the district.
      window.setTimeout(() => {
        if (!mapRef.current) return;
        map.flyTo({
          center: camera.end.center,
          zoom: camera.end.zoom,
          pitch: camera.end.pitch,
          bearing: camera.end.bearing,
          duration: STRUCTURE_MAP_FLY_DURATION_MS,
          essential: true,
          curve: 1.15,
          speed: 0.7,
        });
      }, 280);
    };

    map.on("load", runFlyIn);
    map.on("error", () => setFailed(true));

    const onResize = () => map.resize();
    window.addEventListener("resize", onResize);

    // Hero media can mount before layout settles — resize once more.
    const resizeTimer = window.setTimeout(() => map.resize(), 120);

    return () => {
      window.clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
      map.remove();
      mapRef.current = null;
    };
  }, [camera, locationId]);

  return (
    <div className="od-hero__city-map" aria-hidden>
      <div ref={containerRef} className="od-hero__city-map-canvas" />
      {failed ? (
        <p className="od-hero__city-map-fallback">Map unavailable</p>
      ) : null}
    </div>
  );
}
