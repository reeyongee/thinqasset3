/** WebGL mesh corner colors — navy tonal range only */
export const MESH_PALETTE_LUXURY = {
  tl: 0x1e252d,
  tr: 0x2a252c,
  bl: 0x161c24,
  br: 0x343d4a,
} as const;

export const MESH_STATIC_FALLBACK = `
  radial-gradient(
    ellipse 90% 70% at 72% 18%,
    color-mix(in srgb, var(--ta-navy-mid) 55%, var(--ta-navy-card)) 0%,
    var(--ta-navy) 52%
  ),
  radial-gradient(
    ellipse 80% 60% at 18% 82%,
    color-mix(in srgb, var(--ta-navy-card) 80%, black) 0%,
    var(--ta-navy) 70%
  )
`;
