import * as THREE from "three";

/**
 * Dark studio IBL: black scene background, but enough studio catchlights
 * that transmissive glass can actually reflect/refract something.
 */
export function createStudioEnvMap(renderer: THREE.WebGLRenderer): THREE.Texture {
  const w = 1024;
  const h = 512;
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    return new THREE.Texture();
  }

  const sky = ctx.createLinearGradient(0, 0, 0, h);
  sky.addColorStop(0, "#12161d");
  sky.addColorStop(0.42, "#090c11");
  sky.addColorStop(0.72, "#06080c");
  sky.addColorStop(1, "#05070b");
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, w, h);

  const paintBlob = (
    x: number,
    y: number,
    radius: number,
    inner: string,
    outer: string,
  ) => {
    const g = ctx.createRadialGradient(x, y, 1, x, y, radius);
    g.addColorStop(0, inner);
    g.addColorStop(1, outer);
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
  };

  // Small warm key card — sharp catchlight, not a milky fill
  paintBlob(
    w * 0.66,
    h * 0.26,
    h * 0.09,
    "rgba(255, 214, 150, 1)",
    "rgba(255, 150, 50, 0)",
  );
  // Cool rim card
  paintBlob(
    w * 0.18,
    h * 0.4,
    h * 0.11,
    "rgba(190, 210, 235, 0.85)",
    "rgba(40, 50, 70, 0)",
  );
  // Tight overhead
  paintBlob(
    w * 0.5,
    h * 0.1,
    h * 0.12,
    "rgba(220, 228, 240, 0.55)",
    "rgba(20, 24, 32, 0)",
  );
  // Floor bounce
  paintBlob(
    w * 0.5,
    h * 0.9,
    h * 0.1,
    "rgba(70, 60, 50, 0.28)",
    "rgba(10, 12, 16, 0)",
  );

  const equirect = new THREE.CanvasTexture(canvas);
  equirect.mapping = THREE.EquirectangularReflectionMapping;
  equirect.colorSpace = THREE.SRGBColorSpace;
  equirect.needsUpdate = true;

  const pmrem = new THREE.PMREMGenerator(renderer);
  pmrem.compileEquirectangularShader();
  const envMap = pmrem.fromEquirectangular(equirect).texture;
  equirect.dispose();
  pmrem.dispose();
  return envMap;
}
