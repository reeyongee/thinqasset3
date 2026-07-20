import * as THREE from "three";
import { COLORS } from "./constants";

/**
 * Tiny equirect → PMREM brand environment.
 * One-shot per WebGL context; avoids MeshPhysical transmission passes.
 */
export function createBrandEnvMap(renderer: THREE.WebGLRenderer): THREE.Texture {
  const w = 512;
  const h = 256;
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    return new THREE.Texture();
  }

  const sky = ctx.createLinearGradient(0, 0, 0, h);
  sky.addColorStop(0, "#4a5562");
  sky.addColorStop(0.4, "#2a323c");
  sky.addColorStop(0.72, "#1e252d");
  sky.addColorStop(1, "#12171d");
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, w, h);

  // Warm gold key reflection (brighter — thin geometry needs strong env catches)
  const gold = ctx.createRadialGradient(w * 0.72, h * 0.28, 6, w * 0.72, h * 0.28, h * 0.6);
  gold.addColorStop(0, "rgba(232,220,196,0.95)");
  gold.addColorStop(0.35, "rgba(201,184,150,0.55)");
  gold.addColorStop(1, "rgba(182,160,130,0)");
  ctx.fillStyle = gold;
  ctx.fillRect(0, 0, w, h);

  // Second gold bounce (lower hemisphere)
  const gold2 = ctx.createRadialGradient(w * 0.55, h * 0.78, 4, w * 0.55, h * 0.78, h * 0.35);
  gold2.addColorStop(0, "rgba(182,160,130,0.45)");
  gold2.addColorStop(1, "rgba(182,160,130,0)");
  ctx.fillStyle = gold2;
  ctx.fillRect(0, 0, w, h);

  // Cool grey-light rim
  const rim = ctx.createRadialGradient(w * 0.22, h * 0.42, 4, w * 0.22, h * 0.42, h * 0.5);
  rim.addColorStop(0, "rgba(245,246,248,0.65)");
  rim.addColorStop(0.4, "rgba(226,229,232,0.28)");
  rim.addColorStop(1, "rgba(226,229,232,0)");
  ctx.fillStyle = rim;
  ctx.fillRect(0, 0, w, h);

  // Soft horizon band (glass edge catch)
  const band = ctx.createLinearGradient(0, h * 0.48, 0, h * 0.62);
  band.addColorStop(0, "rgba(159,157,160,0)");
  band.addColorStop(0.5, "rgba(159,157,160,0.18)");
  band.addColorStop(1, "rgba(159,157,160,0)");
  ctx.fillStyle = band;
  ctx.fillRect(0, 0, w, h);

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

type GlassOpts = {
  color?: number;
  opacity?: number;
  roughness?: number;
  metalness?: number;
  clearcoat?: number;
  clearcoatRoughness?: number;
  envMap?: THREE.Texture | null;
  envMapIntensity?: number;
  emissive?: number;
  emissiveIntensity?: number;
  depthWrite?: boolean;
};

function physicalGlass({
  color = COLORS.glass,
  opacity = 0.55,
  roughness = 0.12,
  metalness = 0.08,
  clearcoat = 1,
  clearcoatRoughness = 0.1,
  envMap = null,
  envMapIntensity = 1.2,
  emissive = 0x000000,
  emissiveIntensity = 0,
  depthWrite = false,
}: GlassOpts = {}) {
  return new THREE.MeshPhysicalMaterial({
    color,
    metalness,
    roughness,
    transparent: true,
    opacity,
    // No transmission — keeps 5 concurrent canvases cheap
    transmission: 0,
    thickness: 0,
    clearcoat,
    clearcoatRoughness,
    ior: 1.5,
    reflectivity: 1,
    specularIntensity: 1,
    specularColor: new THREE.Color(COLORS.greyLight),
    envMap,
    envMapIntensity,
    emissive,
    emissiveIntensity,
    side: THREE.DoubleSide,
    depthWrite,
  });
}

/** Cool navy-atmosphere glass (rings, plates). */
export function glassRingMaterial(
  envMap: THREE.Texture | null = null,
  opacity = 0.72,
  depth: "soft" | "mid" | "deep" = "mid",
) {
  const color =
    depth === "soft" ? 0xd8dee6 : depth === "deep" ? 0x8b97a6 : 0xb4bec9;
  return physicalGlass({
    color,
    opacity,
    roughness: depth === "soft" ? 0.05 : 0.1,
    metalness: 0.18,
    clearcoat: 1,
    clearcoatRoughness: 0.04,
    envMap,
    envMapIntensity: 1.85,
    emissive: depth === "deep" ? COLORS.navyMid : COLORS.greyLight,
    emissiveIntensity: depth === "deep" ? 0.04 : 0.07,
    depthWrite: false,
  });
}

/** Brand gold glass / brushed gold accent. */
export function glassGoldMaterial(
  envMap: THREE.Texture | null = null,
  opacity = 0.82,
) {
  return physicalGlass({
    color: COLORS.goldHover,
    opacity,
    roughness: 0.1,
    metalness: 0.72,
    clearcoat: 1,
    clearcoatRoughness: 0.08,
    envMap,
    envMapIntensity: 1.65,
    emissive: COLORS.gold,
    emissiveIntensity: 0.14,
    depthWrite: false,
  });
}

/** Frosted navy glass plate (trust stack fills). */
export function glassFrostMaterial(
  envMap: THREE.Texture | null = null,
  tone: "navy" | "gold" = "navy",
) {
  if (tone === "gold") {
    return physicalGlass({
      color: COLORS.gold,
      opacity: 0.32,
      roughness: 0.22,
      metalness: 0.45,
      clearcoat: 0.85,
      clearcoatRoughness: 0.18,
      envMap,
      envMapIntensity: 1.15,
      emissive: COLORS.gold,
      emissiveIntensity: 0.08,
      depthWrite: false,
    });
  }
  return physicalGlass({
    color: 0x4a5562,
    opacity: 0.36,
    roughness: 0.24,
    metalness: 0.2,
    clearcoat: 0.9,
    clearcoatRoughness: 0.16,
    envMap,
    envMapIntensity: 1.2,
    emissive: COLORS.navyMid,
    emissiveIntensity: 0.05,
    depthWrite: false,
  });
}

/** Pearl / crystal node. */
export function glassNodeMaterial(envMap: THREE.Texture | null = null) {
  return new THREE.MeshPhysicalMaterial({
    color: COLORS.white,
    metalness: 0.05,
    roughness: 0.06,
    transparent: true,
    opacity: 1,
    transmission: 0.55,
    thickness: 0.45,
    clearcoat: 1,
    clearcoatRoughness: 0.03,
    ior: 1.5,
    reflectivity: 1,
    envMap,
    envMapIntensity: 1.6,
    emissive: COLORS.greyLight,
    emissiveIntensity: 0.08,
    side: THREE.FrontSide,
    depthWrite: true,
  });
}

/** Dense gold crystal (innovation accents / flexibility core). */
export function glassCrystalMaterial(
  envMap: THREE.Texture | null = null,
  tone: "gold" | "glass" = "gold",
) {
  if (tone === "glass") {
    // Clearcoat glass only — no transmission (many instances in Innovation)
    return physicalGlass({
      color: 0xd8dee6,
      opacity: 0.78,
      roughness: 0.07,
      metalness: 0.2,
      clearcoat: 1,
      clearcoatRoughness: 0.04,
      envMap,
      envMapIntensity: 1.75,
      emissive: COLORS.greyLight,
      emissiveIntensity: 0.05,
      depthWrite: true,
    });
  }
  return new THREE.MeshPhysicalMaterial({
    color: COLORS.goldHover,
    metalness: 0.35,
    roughness: 0.12,
    transparent: true,
    opacity: 1,
    transmission: 0.35,
    thickness: 0.5,
    clearcoat: 1,
    clearcoatRoughness: 0.06,
    ior: 1.5,
    envMap,
    envMapIntensity: 1.4,
    emissive: COLORS.gold,
    emissiveIntensity: 0.12,
    side: THREE.FrontSide,
    depthWrite: true,
  });
}

/** @deprecated Prefer glassRingMaterial — kept for call-site compatibility. */
export function ringMaterial(
  color: number = COLORS.ring,
  opacity = 0.95,
  envMap: THREE.Texture | null = null,
) {
  const depth = color === COLORS.accent || color === COLORS.gold ? "soft" : "mid";
  if (color === COLORS.accent || color === COLORS.gold || color === COLORS.glassGold) {
    return glassGoldMaterial(envMap, opacity);
  }
  return glassRingMaterial(envMap, opacity, depth === "soft" ? "soft" : color === COLORS.ringSoft ? "deep" : "mid");
}

/** @deprecated Prefer glassCrystalMaterial / glassGoldMaterial. */
export function accentMaterial(
  color: number = COLORS.accent,
  envMap: THREE.Texture | null = null,
) {
  void color;
  return glassCrystalMaterial(envMap, "gold");
}

/** @deprecated Prefer glassNodeMaterial. */
export function whiteNodeMaterial(envMap: THREE.Texture | null = null) {
  return glassNodeMaterial(envMap);
}

export function lineMaterial(color: number = COLORS.gold, opacity = 0.9) {
  return new THREE.LineBasicMaterial({
    color,
    transparent: opacity < 1,
    opacity,
    depthWrite: false,
  });
}

/** Thin torus used as a “ring” stroke. */
export function makeTorusRing(
  radius: number,
  tube = 0.035,
  material: THREE.Material,
) {
  const geo = new THREE.TorusGeometry(radius, tube, 10, 64);
  return new THREE.Mesh(geo, material);
}

export function makeNode(radius = 0.09, material?: THREE.Material) {
  const geo = new THREE.SphereGeometry(radius, 20, 20);
  return new THREE.Mesh(geo, material);
}

export function disposeObject(root: THREE.Object3D) {
  root.traverse((obj) => {
    const mesh = obj as THREE.Mesh;
    if (mesh.geometry) mesh.geometry.dispose();
    const mat = mesh.material;
    if (!mat) return;
    if (Array.isArray(mat)) mat.forEach((m) => m.dispose());
    else mat.dispose();
  });
}
