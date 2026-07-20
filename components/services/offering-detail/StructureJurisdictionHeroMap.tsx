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

export type StructureJurisdictionHeroMapProps = {
  locationId: OfferingGlobeLocationId;
};

function addGoldBuildingsLayer(map: maplibregl.Map) {
  if (map.getLayer("3d-buildings")) return;

  const layers = map.getStyle().layers ?? [];
  let labelLayerId: string | undefined;
  for (const layer of layers) {
    if (
      layer.type === "symbol" &&
      layer.layout &&
      "text-field" in layer.layout
    ) {
      labelLayerId = layer.id;
      break;
    }
  }

  if (!map.getSource("openfreemap-buildings")) {
    map.addSource("openfreemap-buildings", {
      type: "vector",
      url: "https://tiles.openfreemap.org/planet",
    });
  }

  map.addLayer(
    {
      id: "3d-buildings",
      source: "openfreemap-buildings",
      "source-layer": "building",
      type: "fill-extrusion",
      minzoom: 14,
      filter: ["!=", ["get", "hide_3d"], true],
      paint: {
        "fill-extrusion-color": [
          "interpolate",
          ["linear"],
          ["coalesce", ["get", "render_height"], ["get", "height"], 10],
          0,
          "#3a342c",
          40,
          "#5c4f3d",
          120,
          "#8a7355",
          220,
          "#b6a082",
        ],
        "fill-extrusion-height": [
          "interpolate",
          ["linear"],
          ["zoom"],
          14,
          0,
          14.8,
          ["coalesce", ["get", "render_height"], ["get", "height"], 12],
        ],
        "fill-extrusion-base": [
          "coalesce",
          ["get", "render_min_height"],
          ["get", "min_height"],
          0,
        ],
        "fill-extrusion-opacity": 0.92,
      },
    },
    labelLayerId,
  );
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

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const map = new maplibregl.Map({
      container,
      style: STRUCTURE_MAP_STYLE,
      center: reduceMotion ? camera.end.center : camera.start.center,
      zoom: reduceMotion ? camera.end.zoom : camera.start.zoom,
      pitch: reduceMotion ? camera.end.pitch : camera.start.pitch,
      bearing: reduceMotion ? camera.end.bearing : camera.start.bearing,
      interactive: false,
      attributionControl: { compact: true },
      fadeDuration: 0,
      canvasContextAttributes: { antialias: true },
      maxPitch: 70,
    });

    mapRef.current = map;

    const runFlyIn = () => {
      addGoldBuildingsLayer(map);
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
      <p className="od-hero__city-map-label">{camera.label}</p>
      {failed ? (
        <p className="od-hero__city-map-fallback">Map unavailable</p>
      ) : null}
    </div>
  );
}
