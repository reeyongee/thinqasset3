"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js";
import { Reflector } from "three/examples/jsm/objects/Reflector.js";

/* =============================================================================
 * TUNABLE PARAMETERS
 * ========================================================================== */

const PARAMS = {
  background: "#05070c",

  prism: {
    height: 4.5,
    width: 1.1, // bottom width (x)
    depth: 0.55, // bottom depth (z)
    taperX: 0.78, // top width as a fraction of bottom width
    taperZ: 0.85, // top depth as a fraction of bottom depth
    topSlantX: 0.9, // how far the top drops from the left edge to the right
    topSlantZ: 0.32, // how far the top drops from the front edge to the back
    shearX: 0.05, // slight sideways shear of the top face
  },

  glass: {
    transmission: 1.0,
    roughness: 0.055,
    metalness: 0,
    ior: 1.5,
    thickness: 0.42,
    attenuationColor: "#f4ead9",
    attenuationDistance: 7.5,
    clearcoat: 0.3,
    clearcoatRoughness: 0.08,
    specularIntensity: 1.15,
    envMapIntensity: 0.95,
  },

  light: {
    color: "#ffb35c",
    position: [-0.42, 4.5, 1.0] as [number, number, number],
    intensity: 30,
    distance: 16,
    decay: 2,
    // HDR emissive bead embedded at the peak corner of the slanted top
    bead: {
      position: [-0.33, 4.45, 0.25] as [number, number, number],
      radius: 0.028,
      color: [6.5, 3.5, 1.35] as [number, number, number],
    },
    // Procedural starburst sprite at the bead position (anamorphic: hugs the
    // slanted top edge like a lit blade)
    flare: {
      scaleX: 1.0,
      scaleY: 0.55,
      opacity: 0.42,
      color: "#ffc788",
    },
    // Additive glow laid along the slanted front-top edge
    edgeGlow: {
      coverage: 0.62, // fraction of the edge lit from the peak down
      thickness: 0.05,
      opacity: 0.55,
      color: [3.0, 1.8, 0.72] as [number, number, number],
    },
  },

  // Dim cool fill so unlit glass stays barely visible
  ambient: {
    skyColor: "#1a2436",
    groundColor: "#030507",
    hemisphereIntensity: 0.18,
    rimColor: "#93a7c9",
    rimIntensity: 0.35,
    rimPosition: [-7, 4, -6] as [number, number, number],
  },

  floor: {
    size: 70,
    color: "#05070c", // matches background so the plane edge disappears
    textureSize: 1024,
    reflectionStrength: 0.62,
    reflectionBlur: 2.4, // texel radius of the reflection blur
    reflectionFade: [3.0, 26.0] as [number, number], // radial fade range (world units)
    lightFade: [10.0, 46.0] as [number, number], // warm streak fade range
    streakShininess: 90, // Blinn-Phong exponent for the warm streak
    streakIntensity: 5.0,
    poolIntensity: 0.55, // warm diffuse pool around the base
    ambientLift: 0.5, // faint cool lift so the floor never hits pure black
  },

  camera: {
    fov: 40,
    radius: 12.4, // distance from the target (long-lens feel)
    azimuthDeg: 24, // base horizontal angle (front-right of the prism)
    height: 2.7,
    target: [0, 2.4, 0] as [number, number, number],
    frameOffsetX: -0.9, // negative pushes the prism right of center
    swayDeg: 5.5, // total horizontal sway over one period
    swayPeriodSec: 26,
    bobAmount: 0.11,
    bobPeriodSec: 31,
  },

  post: {
    exposure: 1.05,
    bloomStrength: 0.42,
    bloomRadius: 0.25,
    bloomThreshold: 1.0,
    vignette: 0.4,
    contrast: 1.08,
    saturation: 0.94,
  },
};

/* =============================================================================
 * Custom prism geometry — tapered, slanted-top shard with flat face normals
 * ========================================================================== */

type Vec3Tuple = [number, number, number];

function createPrismGeometry(p: typeof PARAMS.prism): THREE.BufferGeometry {
  const bw = p.width / 2;
  const bd = p.depth / 2;
  const tw = (p.width * p.taperX) / 2;
  const td = (p.depth * p.taperZ) / 2;
  const h = p.height;

  const bFL: Vec3Tuple = [-bw, 0, bd];
  const bFR: Vec3Tuple = [bw, 0, bd];
  const bBL: Vec3Tuple = [-bw, 0, -bd];
  const bBR: Vec3Tuple = [bw, 0, -bd];

  const tFL: Vec3Tuple = [-tw + p.shearX, h, td];
  const tFR: Vec3Tuple = [tw + p.shearX, h - p.topSlantX, td];
  const tBL: Vec3Tuple = [-tw + p.shearX, h - p.topSlantZ, -td];
  const tBR: Vec3Tuple = [tw + p.shearX, h - p.topSlantX - p.topSlantZ, -td];

  const quads: Vec3Tuple[][] = [
    [bFL, bFR, tFR, tFL], // front
    [bBR, bBL, tBL, tBR], // back
    [bBL, bFL, tFL, tBL], // left
    [bFR, bBR, tBR, tFR], // right
    [tFL, tFR, tBR, tBL], // slanted top
    [bBL, bBR, bFR, bFL], // bottom
  ];

  // Non-indexed triangles so computeVertexNormals yields crisp per-face normals.
  const positions: number[] = [];
  const center = new THREE.Vector3(0, h * 0.45, 0);
  const a = new THREE.Vector3();
  const b = new THREE.Vector3();
  const c = new THREE.Vector3();
  const ab = new THREE.Vector3();
  const ac = new THREE.Vector3();
  const n = new THREE.Vector3();
  const g = new THREE.Vector3();

  const pushTri = (p0: Vec3Tuple, p1: Vec3Tuple, p2: Vec3Tuple) => {
    a.fromArray(p0);
    b.fromArray(p1);
    c.fromArray(p2);
    ab.subVectors(b, a);
    ac.subVectors(c, a);
    n.crossVectors(ab, ac);
    g.copy(a).add(b).add(c).multiplyScalar(1 / 3).sub(center);
    // Flip winding whenever the geometric normal points into the solid
    if (n.dot(g) < 0) positions.push(...p0, ...p2, ...p1);
    else positions.push(...p0, ...p1, ...p2);
  };

  for (const [q0, q1, q2, q3] of quads) {
    pushTri(q0, q1, q2);
    pushTri(q0, q2, q3);
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(positions, 3),
  );
  geometry.computeVertexNormals();
  return geometry;
}

/* =============================================================================
 * Studio environment — near-black equirect with one warm blob and two cool
 * softbox strips, PMREM-filtered for glass reflections/refraction
 * ========================================================================== */

function createStudioEnvironment(renderer: THREE.WebGLRenderer): THREE.Texture {
  const w = 1024;
  const h = 512;
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) return new THREE.Texture();

  const sky = ctx.createLinearGradient(0, 0, 0, h);
  sky.addColorStop(0, "#070a12");
  sky.addColorStop(0.5, "#04060b");
  sky.addColorStop(0.62, "#030409");
  sky.addColorStop(1, "#010203");
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, w, h);

  // Warm key blob — front-right and high, mirrors the point-light placement
  const warm = ctx.createRadialGradient(
    w * 0.7,
    h * 0.3,
    2,
    w * 0.7,
    h * 0.3,
    h * 0.3,
  );
  warm.addColorStop(0, "rgba(255,190,110,0.95)");
  warm.addColorStop(0.22, "rgba(255,170,90,0.4)");
  warm.addColorStop(1, "rgba(255,160,80,0)");
  ctx.fillStyle = warm;
  ctx.fillRect(0, 0, w, h);

  // Cool softbox strips — they trace the vertical glass edges
  const strip = (cx: number, alpha: number, halfWidth: number) => {
    const grad = ctx.createLinearGradient(cx - halfWidth, 0, cx + halfWidth, 0);
    grad.addColorStop(0, "rgba(150,170,205,0)");
    grad.addColorStop(0.5, `rgba(150,170,205,${alpha})`);
    grad.addColorStop(1, "rgba(150,170,205,0)");
    ctx.fillStyle = grad;
    ctx.fillRect(cx - halfWidth, h * 0.14, halfWidth * 2, h * 0.6);
  };
  strip(w * 0.32, 0.15, 26);
  strip(w * 0.96, 0.13, 22);

  // Faint warm bounce in the lower hemisphere
  const bounce = ctx.createRadialGradient(
    w * 0.7,
    h * 0.8,
    4,
    w * 0.7,
    h * 0.8,
    h * 0.24,
  );
  bounce.addColorStop(0, "rgba(255,160,90,0.18)");
  bounce.addColorStop(1, "rgba(255,160,90,0)");
  ctx.fillStyle = bounce;
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

/* =============================================================================
 * Glass material
 * ========================================================================== */

function createGlassMaterial(): THREE.MeshPhysicalMaterial {
  const g = PARAMS.glass;
  return new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    metalness: g.metalness,
    roughness: g.roughness,
    transmission: g.transmission,
    transparent: true,
    thickness: g.thickness,
    ior: g.ior,
    attenuationColor: new THREE.Color(g.attenuationColor),
    attenuationDistance: g.attenuationDistance,
    clearcoat: g.clearcoat,
    clearcoatRoughness: g.clearcoatRoughness,
    specularIntensity: g.specularIntensity,
    envMapIntensity: g.envMapIntensity,
    side: THREE.FrontSide,
  });
}

/* =============================================================================
 * Floor — planar Reflector with a custom shader: slightly blurred, darkened,
 * distance-faded reflections plus an analytic warm key-light term (diffuse
 * pool + elongated Blinn-Phong streak)
 * ========================================================================== */

const FloorReflectorShader = {
  name: "PrismFloorReflector",
  uniforms: {
    color: { value: null },
    tDiffuse: { value: null },
    textureMatrix: { value: null },
    uTexel: { value: new THREE.Vector2(1 / 1024, 1 / 1024) },
    uBlur: { value: PARAMS.floor.reflectionBlur },
    uReflStrength: { value: PARAMS.floor.reflectionStrength },
    uReflFade: {
      value: new THREE.Vector2(
        PARAMS.floor.reflectionFade[0],
        PARAMS.floor.reflectionFade[1],
      ),
    },
    uLightPos: { value: new THREE.Vector3() },
    uLightColor: { value: new THREE.Color(PARAMS.light.color) },
    uLightIntensity: { value: PARAMS.light.intensity },
    uShininess: { value: PARAMS.floor.streakShininess },
    uSpecIntensity: { value: PARAMS.floor.streakIntensity },
    uDiffIntensity: { value: PARAMS.floor.poolIntensity },
    uLightFade: {
      value: new THREE.Vector2(
        PARAMS.floor.lightFade[0],
        PARAMS.floor.lightFade[1],
      ),
    },
    uAmbient: { value: PARAMS.floor.ambientLift },
  },
  vertexShader: /* glsl */ `
    uniform mat4 textureMatrix;
    varying vec4 vUv;
    varying vec3 vWorldPos;

    void main() {
      vUv = textureMatrix * vec4(position, 1.0);
      vWorldPos = (modelMatrix * vec4(position, 1.0)).xyz;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: /* glsl */ `
    uniform vec3 color;
    uniform sampler2D tDiffuse;
    uniform vec2 uTexel;
    uniform float uBlur;
    uniform float uReflStrength;
    uniform vec2 uReflFade;
    uniform vec3 uLightPos;
    uniform vec3 uLightColor;
    uniform float uLightIntensity;
    uniform float uShininess;
    uniform float uSpecIntensity;
    uniform float uDiffIntensity;
    uniform vec2 uLightFade;
    uniform float uAmbient;
    varying vec4 vUv;
    varying vec3 vWorldPos;

    vec3 projSample(vec2 offset) {
      return texture2DProj(tDiffuse, vUv + vec4(offset * vUv.w, 0.0, 0.0)).rgb;
    }

    void main() {
      // Slightly anisotropic 9-tap blur — vertical bias stretches reflections
      // into soft streaks instead of a perfect mirror copy.
      vec2 r = uTexel * uBlur;
      vec3 refl = projSample(vec2(0.0)) * 0.2;
      refl += projSample(vec2( 1.1,  0.5) * r) * 0.1;
      refl += projSample(vec2(-1.1, -0.5) * r) * 0.1;
      refl += projSample(vec2( 0.5,  1.4) * r) * 0.1;
      refl += projSample(vec2(-0.5, -1.4) * r) * 0.1;
      refl += projSample(vec2( 1.8, -1.0) * r) * 0.1;
      refl += projSample(vec2(-1.8,  1.0) * r) * 0.1;
      refl += projSample(vec2( 0.0,  2.2) * r) * 0.1;
      refl += projSample(vec2( 0.0, -2.2) * r) * 0.1;

      float dist = length(vWorldPos.xz);
      float reflFade = 1.0 - smoothstep(uReflFade.x, uReflFade.y, dist);
      float lightFade = 1.0 - smoothstep(uLightFade.x, uLightFade.y, dist);

      vec3 col = color + refl * (uReflStrength * reflFade);

      // Warm key light on the floor: tight glossy streak + soft pool.
      vec3 N = vec3(0.0, 1.0, 0.0);
      vec3 Lvec = uLightPos - vWorldPos;
      float ldist = length(Lvec);
      vec3 L = Lvec / ldist;
      vec3 V = normalize(cameraPosition - vWorldPos);
      vec3 H = normalize(L + V);
      float atten = uLightIntensity / max(ldist * ldist, 0.001);
      float diff = max(L.y, 0.0);
      float spec = pow(max(dot(N, H), 0.0), uShininess);
      col += uLightColor * atten * (diff * uDiffIntensity + spec * uSpecIntensity) * lightFade;

      // Faint cool lift so near-field floor never reads as a hole
      col += vec3(0.020, 0.027, 0.040) * uAmbient * reflFade;

      gl_FragColor = vec4(col, 1.0);

      #include <tonemapping_fragment>
      #include <colorspace_fragment>
    }
  `,
};

function createFloor(): Reflector {
  const f = PARAMS.floor;
  const geometry = new THREE.PlaneGeometry(f.size, f.size);
  const floor = new Reflector(geometry, {
    clipBias: 0.003,
    textureWidth: f.textureSize,
    textureHeight: f.textureSize,
    color: new THREE.Color(f.color),
    multisample: 4,
    shader: FloorReflectorShader,
  });
  floor.rotateX(-Math.PI / 2);

  const material = floor.material as THREE.ShaderMaterial;
  material.uniforms.uTexel.value.set(1 / f.textureSize, 1 / f.textureSize);
  material.uniforms.uLightPos.value.fromArray(PARAMS.light.position);
  return floor;
}

/* =============================================================================
 * Starburst flare texture — soft core plus thin horizontal/vertical streaks
 * ========================================================================== */

function createFlareTexture(): THREE.Texture {
  const size = 512;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) return new THREE.Texture();

  const c = size / 2;
  ctx.globalCompositeOperation = "lighter";

  // Horizontal streak (drawn as a squashed radial gradient)
  const streak = (
    scaleX: number,
    scaleY: number,
    radius: number,
    peak: string,
    alpha: number,
  ) => {
    ctx.save();
    ctx.translate(c, c);
    ctx.scale(scaleX, scaleY);
    const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, radius);
    grad.addColorStop(0, peak);
    grad.addColorStop(0.35, `rgba(255,205,150,${alpha * 0.45})`);
    grad.addColorStop(1, "rgba(255,190,120,0)");
    ctx.fillStyle = grad;
    ctx.fillRect(-radius, -radius, radius * 2, radius * 2);
    ctx.restore();
  };

  streak(1.0, 0.016, c * 0.98, "rgba(255,230,190,0.85)", 0.8);
  streak(0.03, 1.0, c * 0.62, "rgba(255,220,170,0.6)", 0.55);
  streak(0.707, 0.010, c * 0.4, "rgba(255,215,165,0.35)", 0.35);

  // Hot core
  const core = ctx.createRadialGradient(c, c, 0, c, c, c * 0.16);
  core.addColorStop(0, "rgba(255,244,225,0.95)");
  core.addColorStop(0.5, "rgba(255,214,155,0.4)");
  core.addColorStop(1, "rgba(255,200,140,0)");
  ctx.fillStyle = core;
  ctx.fillRect(0, 0, size, size);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}

/* =============================================================================
 * Edge-glow texture — bright at the peak (left), fading down the edge, soft
 * across its width
 * ========================================================================== */

function createEdgeGlowTexture(): THREE.Texture {
  const w = 256;
  const h = 64;
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) return new THREE.Texture();

  const along = ctx.createLinearGradient(0, 0, w, 0);
  along.addColorStop(0, "rgba(255,255,255,1)");
  along.addColorStop(0.35, "rgba(255,255,255,0.45)");
  along.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = along;
  ctx.fillRect(0, 0, w, h);

  ctx.globalCompositeOperation = "destination-in";
  const across = ctx.createLinearGradient(0, 0, 0, h);
  across.addColorStop(0, "rgba(255,255,255,0)");
  across.addColorStop(0.5, "rgba(255,255,255,1)");
  across.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = across;
  ctx.fillRect(0, 0, w, h);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}

/* =============================================================================
 * Final grade pass — display-referred vignette, contrast, saturation
 * ========================================================================== */

const GradeShader = {
  name: "PrismGrade",
  uniforms: {
    tDiffuse: { value: null },
    uVignette: { value: PARAMS.post.vignette },
    uContrast: { value: PARAMS.post.contrast },
    uSaturation: { value: PARAMS.post.saturation },
  },
  vertexShader: /* glsl */ `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: /* glsl */ `
    uniform sampler2D tDiffuse;
    uniform float uVignette;
    uniform float uContrast;
    uniform float uSaturation;
    varying vec2 vUv;

    void main() {
      vec4 tex = texture2D(tDiffuse, vUv);
      vec3 col = tex.rgb;
      float luma = dot(col, vec3(0.2126, 0.7152, 0.0722));
      col = mix(vec3(luma), col, uSaturation);
      col = (col - 0.5) * uContrast + 0.5;
      vec2 q = (vUv - 0.5) * vec2(1.18, 1.0);
      col *= 1.0 - uVignette * smoothstep(0.32, 0.92, length(q));
      gl_FragColor = vec4(col, tex.a);
    }
  `,
};

/* =============================================================================
 * Scene component
 * ========================================================================== */

export function GlassPrismScene() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    /* ---- Scene -------------------------------------------------------- */
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(PARAMS.background);

    /* ---- Renderer ------------------------------------------------------ */
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
      powerPreference: "high-performance",
    });
    renderer.setClearColor(PARAMS.background, 1);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = PARAMS.post.exposure;
    renderer.domElement.style.display = "block";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    host.appendChild(renderer.domElement);

    /* ---- Camera -------------------------------------------------------- */
    const camera = new THREE.PerspectiveCamera(PARAMS.camera.fov, 1, 0.1, 120);
    const target = new THREE.Vector3().fromArray(PARAMS.camera.target);

    /* ---- Environment ---------------------------------------------------- */
    const envMap = createStudioEnvironment(renderer);
    scene.environment = envMap;

    /* ---- Prism ---------------------------------------------------------- */
    const prismGeometry = createPrismGeometry(PARAMS.prism);
    const glassMaterial = createGlassMaterial();
    const prism = new THREE.Mesh(prismGeometry, glassMaterial);
    scene.add(prism);

    /* ---- Floor ----------------------------------------------------------- */
    const floor = createFloor();
    scene.add(floor);

    /* ---- Lights ----------------------------------------------------------- */
    const key = new THREE.PointLight(
      PARAMS.light.color,
      PARAMS.light.intensity,
      PARAMS.light.distance,
      PARAMS.light.decay,
    );
    key.position.fromArray(PARAMS.light.position);
    scene.add(key);

    const hemi = new THREE.HemisphereLight(
      PARAMS.ambient.skyColor,
      PARAMS.ambient.groundColor,
      PARAMS.ambient.hemisphereIntensity,
    );
    scene.add(hemi);

    const rim = new THREE.DirectionalLight(
      PARAMS.ambient.rimColor,
      PARAMS.ambient.rimIntensity,
    );
    rim.position.fromArray(PARAMS.ambient.rimPosition);
    scene.add(rim);

    /* ---- Emissive bead + starburst flare ----------------------------------- */
    const bead = new THREE.Mesh(
      new THREE.SphereGeometry(PARAMS.light.bead.radius, 16, 16),
      new THREE.MeshBasicMaterial({
        color: new THREE.Color(...PARAMS.light.bead.color),
      }),
    );
    bead.position.fromArray(PARAMS.light.bead.position);
    scene.add(bead);

    const flareTexture = createFlareTexture();
    const flare = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: flareTexture,
        blending: THREE.AdditiveBlending,
        color: new THREE.Color(PARAMS.light.flare.color),
        transparent: true,
        opacity: PARAMS.light.flare.opacity,
        depthWrite: false,
      }),
    );
    flare.position.fromArray(PARAMS.light.bead.position);
    flare.scale.set(PARAMS.light.flare.scaleX, PARAMS.light.flare.scaleY, 1);
    scene.add(flare);

    /* ---- Slanted-top edge glow -------------------------------------------- */
    const p = PARAMS.prism;
    const peak = new THREE.Vector3(
      -(p.width * p.taperX) / 2 + p.shearX,
      p.height,
      (p.depth * p.taperZ) / 2,
    );
    const corner = new THREE.Vector3(
      (p.width * p.taperX) / 2 + p.shearX,
      p.height - p.topSlantX,
      (p.depth * p.taperZ) / 2,
    );
    const edgeDir = new THREE.Vector3().subVectors(corner, peak);
    const edgeLength = edgeDir.length() * PARAMS.light.edgeGlow.coverage;
    const edgeAngle = Math.atan2(edgeDir.y, edgeDir.x);
    const edgeGlowTexture = createEdgeGlowTexture();
    const edgeGlowGeometry = new THREE.PlaneGeometry(
      edgeLength,
      PARAMS.light.edgeGlow.thickness,
    );
    edgeGlowGeometry.translate(edgeLength / 2, 0, 0);
    const edgeGlowMaterial = new THREE.MeshBasicMaterial({
      map: edgeGlowTexture,
      color: new THREE.Color(...PARAMS.light.edgeGlow.color),
      transparent: true,
      opacity: PARAMS.light.edgeGlow.opacity,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide,
    });
    const edgeGlow = new THREE.Mesh(edgeGlowGeometry, edgeGlowMaterial);
    edgeGlow.position.copy(peak);
    edgeGlow.position.z += 0.015;
    edgeGlow.rotation.z = edgeAngle;
    scene.add(edgeGlow);

    /* ---- Post-processing ----------------------------------------------------- */
    const pixelRatio = renderer.getPixelRatio();
    const composerTarget = new THREE.WebGLRenderTarget(1, 1, {
      type: THREE.HalfFloatType,
      samples: 4,
    });
    const composer = new EffectComposer(renderer, composerTarget);
    composer.setPixelRatio(pixelRatio);
    composer.addPass(new RenderPass(scene, camera));
    const bloom = new UnrealBloomPass(
      new THREE.Vector2(1, 1),
      PARAMS.post.bloomStrength,
      PARAMS.post.bloomRadius,
      PARAMS.post.bloomThreshold,
    );
    composer.addPass(bloom);
    composer.addPass(new OutputPass());
    const grade = new ShaderPass(GradeShader);
    composer.addPass(grade);

    /* ---- Resize --------------------------------------------------------------- */
    const resize = () => {
      const width = host.clientWidth || 1;
      const height = host.clientHeight || 1;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
      composer.setSize(width, height);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(host);

    /* ---- Animation loop -------------------------------------------------------- */
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const baseAzimuth = THREE.MathUtils.degToRad(PARAMS.camera.azimuthDeg);
    const swayAmplitude = THREE.MathUtils.degToRad(PARAMS.camera.swayDeg / 2);

    let raf = 0;
    let running = true;
    let start = performance.now();
    let elapsed = 0;

    const tick = (now: number) => {
      if (!running) return;
      elapsed = (now - start) / 1000;
      const t = reducedMotion ? 0 : elapsed;

      const azimuth =
        baseAzimuth +
        Math.sin((t * Math.PI * 2) / PARAMS.camera.swayPeriodSec) *
          swayAmplitude;
      const y =
        PARAMS.camera.height +
        Math.sin((t * Math.PI * 2) / PARAMS.camera.bobPeriodSec) *
          PARAMS.camera.bobAmount;
      camera.position.set(
        target.x + Math.sin(azimuth) * PARAMS.camera.radius,
        y,
        target.z + Math.cos(azimuth) * PARAMS.camera.radius,
      );
      camera.lookAt(
        target.x + PARAMS.camera.frameOffsetX,
        target.y,
        target.z,
      );

      composer.render();
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    /* ---- Pause when offscreen / hidden ------------------------------------------ */
    const io = new IntersectionObserver(
      ([entry]) => {
        running = entry.isIntersecting;
        if (running) {
          start = performance.now() - elapsed * 1000;
          raf = requestAnimationFrame(tick);
        }
      },
      { threshold: 0.02 },
    );
    io.observe(host);

    const onVisibility = () => {
      if (document.hidden) {
        running = false;
      } else {
        running = true;
        start = performance.now() - elapsed * 1000;
        raf = requestAnimationFrame(tick);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    /* ---- Cleanup ------------------------------------------------------------------ */
    return () => {
      running = false;
      cancelAnimationFrame(raf);
      document.removeEventListener("visibilitychange", onVisibility);
      io.disconnect();
      ro.disconnect();
      floor.dispose();
      prismGeometry.dispose();
      glassMaterial.dispose();
      bead.geometry.dispose();
      (bead.material as THREE.Material).dispose();
      (flare.material as THREE.SpriteMaterial).dispose();
      flareTexture.dispose();
      edgeGlowGeometry.dispose();
      edgeGlowMaterial.dispose();
      edgeGlowTexture.dispose();
      envMap.dispose();
      composer.dispose();
      renderer.dispose();
      if (renderer.domElement.parentElement === host) {
        host.removeChild(renderer.domElement);
      }
      scene.clear();
    };
  }, []);

  return (
    <div
      ref={hostRef}
      role="img"
      aria-label="Cinematic render of a tall glass prism on a reflective black floor"
      style={{
        position: "fixed",
        inset: 0,
        overflow: "hidden",
        background: PARAMS.background,
      }}
    />
  );
}
