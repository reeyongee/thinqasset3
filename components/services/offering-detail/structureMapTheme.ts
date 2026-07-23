import type { Map as MapLibreMap } from "maplibre-gl";

/**
 * ThinqAsset map palette — mirrors CSS tokens in app/globals.css.
 * MapLibre needs concrete colors (no CSS variables).
 */
export const STRUCTURE_MAP_THEME = {
  navyDeep: "#161c24",
  navy: "#1e252d",
  navyMid: "#343d4a",
  navySoft: "#262e38",
  water: "#12181f",
  gold: "#b6a082",
  goldHover: "#c9b896",
  /** Minor streets — restrained gold */
  roadMinor: "rgba(182, 160, 130, 0.28)",
  /** Arterials */
  roadMajor: "rgba(182, 160, 130, 0.48)",
  /** Motorways / primary */
  roadMotorway: "rgba(182, 160, 130, 0.62)",
  /** Casings sit under gold strokes */
  roadCasing: "rgba(30, 37, 45, 0.85)",
  rail: "rgba(52, 61, 74, 0.55)",
} as const;

function setPaint(
  map: MapLibreMap,
  layerId: string,
  property: string,
  value: unknown,
) {
  if (!map.getLayer(layerId)) return;
  try {
    map.setPaintProperty(layerId, property, value);
  } catch {
    // Layer may not support the paint prop (e.g. pattern fills).
  }
}

function setLayout(
  map: MapLibreMap,
  layerId: string,
  property: string,
  value: unknown,
) {
  if (!map.getLayer(layerId)) return;
  try {
    map.setLayoutProperty(layerId, property, value);
  } catch {
    // Ignore unsupported layout props.
  }
}

/** Strip basemap labels / icons and recolor geometry to navy + restrained gold. */
export function applyThinqMapTheme(map: MapLibreMap) {
  const t = STRUCTURE_MAP_THEME;
  const layers = map.getStyle().layers ?? [];

  for (const layer of layers) {
    if (layer.type === "symbol" || layer.id.startsWith("boundary_")) {
      setLayout(map, layer.id, "visibility", "none");
    }
  }

  setPaint(map, "background", "background-color", t.navyDeep);

  setPaint(map, "water", "fill-color", t.water);
  setPaint(map, "waterway", "line-color", t.water);

  setPaint(map, "landcover_ice_shelf", "fill-color", t.navyDeep);
  setPaint(map, "landcover_glacier", "fill-color", t.navy);
  setPaint(map, "landuse_residential", "fill-color", t.navy);
  setPaint(map, "landcover_wood", "fill-color", t.navySoft);
  setPaint(map, "landcover_wood", "fill-pattern", null);
  setPaint(map, "landuse_park", "fill-color", t.navySoft);

  setPaint(map, "building", "fill-color", t.navy);
  setPaint(map, "building", "fill-outline-color", t.navyMid);

  setPaint(map, "aeroway-area", "fill-color", t.navyDeep);
  setPaint(map, "aeroway-taxiway", "line-color", t.roadMinor);
  setPaint(map, "aeroway-runway", "line-color", t.navySoft);
  setPaint(map, "aeroway-runway-casing", "line-color", t.roadCasing);

  setPaint(map, "road_area_pier", "fill-color", t.navySoft);
  setPaint(map, "road_pier", "line-color", t.roadMinor);

  setPaint(map, "highway_path", "line-color", t.roadMinor);
  setPaint(map, "highway_minor", "line-color", t.roadMinor);

  setPaint(map, "highway_major_casing", "line-color", t.roadCasing);
  setPaint(map, "highway_major_inner", "line-color", t.roadMajor);
  setPaint(map, "highway_major_subtle", "line-color", t.roadMajor);

  setPaint(map, "highway_motorway_casing", "line-color", t.roadCasing);
  setPaint(map, "highway_motorway_inner", "line-color", t.roadMotorway);
  setPaint(map, "highway_motorway_subtle", "line-color", t.roadMajor);

  setPaint(map, "railway_transit", "line-color", t.rail);
  setPaint(map, "railway_transit_dashline", "line-color", t.navyDeep);
  setPaint(map, "railway_minor", "line-color", t.rail);
  setPaint(map, "railway_minor_dashline", "line-color", t.navyDeep);
  setPaint(map, "railway", "line-color", t.rail);
  setPaint(map, "railway_dashline", "line-color", t.navyDeep);
}

/** 3D extrusions: navy massing, gold only on taller buildings. */
export function addBrandBuildingsLayer(map: MapLibreMap) {
  if (map.getLayer("3d-buildings")) return;

  const t = STRUCTURE_MAP_THEME;

  if (!map.getSource("openfreemap-buildings")) {
    map.addSource("openfreemap-buildings", {
      type: "vector",
      url: "https://tiles.openfreemap.org/planet",
    });
  }

  map.addLayer({
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
        t.navy,
        45,
        t.navySoft,
        90,
        t.navyMid,
        140,
        "#6e6558",
        200,
        t.gold,
        280,
        t.goldHover,
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
      "fill-extrusion-opacity": 0.94,
    },
  });
}
