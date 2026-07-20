import type { OfferingGlobeLocationId } from "./types";

export type StructureCityCamera = {
  /** Wide opening view before the fly-in */
  start: {
    center: [number, number];
    zoom: number;
    pitch: number;
    bearing: number;
  };
  /** Final Apple Maps–style city overview */
  end: {
    center: [number, number];
    zoom: number;
    pitch: number;
    bearing: number;
  };
  label: string;
};

/**
 * Per-jurisdiction camera framing for Structures offering heroes.
 * Centers chosen for recognisable financial / capital districts.
 */
export const STRUCTURE_CITY_CAMERAS: Record<
  OfferingGlobeLocationId,
  StructureCityCamera
> = {
  uae: {
    label: "DIFC, Dubai",
    start: {
      center: [55.27, 25.2],
      zoom: 12.2,
      pitch: 20,
      bearing: -10,
    },
    end: {
      // DIFC Gate / financial core
      center: [55.2825, 25.2118],
      zoom: 15.85,
      pitch: 62,
      bearing: -28,
    },
  },
  mauritius: {
    label: "Port Louis, Mauritius",
    start: {
      center: [57.5, -20.18],
      zoom: 11.6,
      pitch: 18,
      bearing: 20,
    },
    end: {
      // Port Louis harbour / Caudan / CBD
      center: [57.5014, -20.1617],
      zoom: 15.55,
      pitch: 58,
      bearing: 42,
    },
  },
  luxembourg: {
    label: "Luxembourg City",
    start: {
      center: [6.13, 49.61],
      zoom: 11.8,
      pitch: 18,
      bearing: -5,
    },
    end: {
      // Kirchberg European / finance plateau
      center: [6.1458, 49.6284],
      zoom: 15.7,
      pitch: 60,
      bearing: -35,
    },
  },
};

export const STRUCTURE_MAP_STYLE =
  "https://tiles.openfreemap.org/styles/dark";

export const STRUCTURE_MAP_FLY_DURATION_MS = 4200;
