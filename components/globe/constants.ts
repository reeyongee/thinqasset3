export type GlobeLocation = {
  id: string;
  lat: number;
  lng: number;
  name: string;
  desc: string;
};

export const GLOBE_LOCATIONS: GlobeLocation[] = [
  {
    id: "mauritius",
    lat: -20.24,
    lng: 57.5,
    name: "Mauritius",
    desc: "Our operational headquarters. From here we manage 15+ sub-funds through a single VCC structure, leveraging 40+ double tax treaties and Asia-Europe-Africa connectivity to deliver institutional-grade fund management.",
  },
  {
    id: "uae",
    lat: 25.21,
    lng: 55.28,
    name: "UAE (DIFC & ADGM)",
    desc: "Our gateway to the Gulf. Capital formation, institutional relationships, and fund management across Dubai\u2019s DIFC and Abu Dhabi\u2019s ADGM\u2014where regulatory clarity meets ambition in one of the world\u2019s most dynamic financial corridors.",
  },
  {
    id: "luxembourg",
    lat: 49.58,
    lng: 6.12,
    name: "Luxembourg",
    desc: "Our European anchor. Direct fund management, regulatory alignment, and investor access across the continent\u2014built on institutional trust and one of the world\u2019s most respected fund domiciles.",
  },
  {
    id: "singapore",
    lat: 1.28,
    lng: 103.85,
    name: "Singapore",
    desc: "Asia-Pacific access through strategic partnerships. Fund administration, compliance, and portfolio support across the fastest-growing investment ecosystems on the planet.",
  },
  {
    id: "cayman",
    lat: 19.32,
    lng: -81.38,
    name: "Cayman Islands",
    desc: "Strategic offshore structuring through our collaborative network. Fund vehicles and SPVs in Cayman, ensuring our clients benefit from diversified and high-caliber investment opportunities.",
  },
  {
    id: "bermuda",
    lat: 32.3,
    lng: -64.78,
    name: "Bermuda",
    desc: "Partnership-driven access to one of the world\u2019s legacy financial centres. Structuring and fund access from the mid-Atlantic, purpose-built for institutional capital flows.",
  },
];

export const COBE_MARKER_STYLES = GLOBE_LOCATIONS.map(
  (loc) =>
    `.cobe-marker[data-cobe-id="${loc.id}"]{position:absolute;position-anchor:--cobe-${loc.id};top:anchor(center);left:anchor(center);translate:-50% -50%;opacity:var(--cobe-visible-${loc.id},0);filter:blur(calc((1 - var(--cobe-visible-${loc.id},0))*4px));transition:filter .3s;pointer-events:auto;cursor:pointer}
.cobe-marker.globe-map-marker--inactive[data-cobe-id="${loc.id}"]{opacity:calc(var(--cobe-visible-${loc.id},0)*0.35)}`,
).join("\n");

export const GLOBE_INSTRUCTION =
  "Drag to explore, click a pin to learn how we operate across jurisdictions.";

export const GLOBE_DEFAULT_BODY =
  "Direct fund management from Mauritius, DIFC, and Luxembourg with strategic partnerships spanning Bermuda to Singapore.";

export const GLOBE_COBE_COLORS = {
  baseColor: [0.714, 0.627, 0.51] as [number, number, number],
  markerColor: [0.118, 0.145, 0.176] as [number, number, number],
  glowColor: [0.788, 0.722, 0.588] as [number, number, number],
};
