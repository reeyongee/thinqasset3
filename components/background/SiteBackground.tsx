"use client";

import { MESH_STATIC_FALLBACK } from "./constants";
import { GlassVeil } from "./GlassVeil";
import { MeshCanvas } from "./MeshCanvas";

type SiteBackgroundProps = {
  interactive?: boolean;
  useWebGL?: boolean;
};

export function SiteBackground({
  interactive = true,
  useWebGL = true,
}: SiteBackgroundProps) {
  return (
    <div className="site-bg" aria-hidden>
      <div className="site-bg__mesh">
        {useWebGL ? (
          <MeshCanvas interactive={interactive} />
        ) : (
          <div
            className="site-bg__fallback"
            style={{ background: MESH_STATIC_FALLBACK }}
          />
        )}
      </div>
      <div className="site-bg__ambient-glow" />
      <GlassVeil />
    </div>
  );
}
