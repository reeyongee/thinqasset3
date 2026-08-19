/**
 * Tunable visual parameters for the /test10 glass-prism study.
 * Adjust these first — the rest of the scene reads from this object.
 */
export const PARAMS = {
  background: 0x05070c,
  exposure: 1.05,
  pixelRatioCap: 1.25,

  prism: {
    height: 4.5,
    width: 1.08,
    depth: 0.42,
    taper: 0.74,
    /** Peak sits on the back-left so the top reads as a diagonal shard. */
    peak: [0.16, 4.5, -0.1] as const,
    shoulderY: {
      frontLeft: 3.88,
      frontRight: 3.12,
      backRight: 3.42,
      backLeft: 4.22,
    },
    position: [0.55, 0.01, 0] as const,
    rotationY: -0.38,
    leanZ: -0.07,
  },

  glass: {
    color: 0xffffff,
    roughness: 0,
    metalness: 0,
    transmission: 1,
    thickness: 0.9,
    ior: 1.5,
    attenuationColor: 0xf7f2ea,
    attenuationDistance: 16,
    envMapIntensity: 1.35,
    clearcoat: 0,
    clearcoatRoughness: 0,
    specularIntensity: 1,
    fresnel: 0.72,
  },

  floor: {
    size: 80,
    color: 0x0b0e14,
    roughness: 0.18,
    metalness: 0.85,
    anisotropy: 0.88,
    reflectionOpacity: 0.42,
    streakGain: 1.15,
    fadeStart: 6,
    fadeEnd: 22,
  },

  light: {
    color: 0xffc56e,
    intensity: 48,
    distance: 18,
    decay: 2,
    /** Local to the prism — upper third, slightly in front of the glass. */
    position: [0.28, 3.22, 0.38] as const,
    sparkScale: 0.018,
    sparkBoost: 2.8,
  },

  ambient: {
    hemiSky: 0x3a4658,
    hemiGround: 0x0a0c12,
    hemiIntensity: 0.22,
    rimColor: 0xb8c4d4,
    rimIntensity: 1.65,
    rimPosition: [-6.5, 3.2, 4.5] as const,
  },

  camera: {
    fov: 28,
    near: 0.1,
    far: 120,
    position: [6.8, 1.65, 14.8] as const,
    lookAt: [0.2, 1.95, 0] as const,
    orbitYawDeg: 4.4,
    orbitPitchDeg: 0.605,
    period: 10,
  },

  bloom: {
    strength: 0.09,
    radius: 0.32,
    threshold: 0.93,
  },

  grade: {
    vignette: 0.32,
    contrast: 1.04,
    saturation: 0.78,
    warmth: 0.05,
    flareStrength: 0.12,
    anamorphic: 0.1,
    spike: 0.1,
    shadowLift: 0.035,
  },
} as const;

export type SceneParams = typeof PARAMS;
