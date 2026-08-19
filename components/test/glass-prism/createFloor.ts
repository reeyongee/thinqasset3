import * as THREE from "three";
import { Reflector } from "three/addons/objects/Reflector.js";
import { PARAMS } from "./params";

const FloorShader = {
  name: "CinematicFloorShader",
  uniforms: {
    color: { value: null as THREE.Color | null },
    tDiffuse: { value: null as THREE.Texture | null },
    textureMatrix: { value: null as THREE.Matrix4 | null },
    uLightPos: { value: new THREE.Vector3() },
    uLightColor: { value: new THREE.Color(PARAMS.light.color) },
    uLightIntensity: { value: PARAMS.light.intensity },
    uCameraPos: { value: new THREE.Vector3() },
    uPrismPos: { value: new THREE.Vector3() },
    uRoughness: { value: PARAMS.floor.roughness },
    uAnisotropy: { value: PARAMS.floor.anisotropy },
    uStreakGain: { value: PARAMS.floor.streakGain },
    uFadeStart: { value: PARAMS.floor.fadeStart },
    uFadeEnd: { value: PARAMS.floor.fadeEnd },
    uReflectionOpacity: { value: PARAMS.floor.reflectionOpacity },
    uBg: { value: new THREE.Color(PARAMS.background) },
  },
  vertexShader: /* glsl */ `
    uniform mat4 textureMatrix;
    varying vec4 vUv;
    varying vec3 vWorldPos;

    #include <common>
    #include <logdepthbuf_pars_vertex>

    void main() {
      vUv = textureMatrix * vec4(position, 1.0);
      vec4 world = modelMatrix * vec4(position, 1.0);
      vWorldPos = world.xyz;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      #include <logdepthbuf_vertex>
    }
  `,
  fragmentShader: /* glsl */ `
    uniform vec3 color;
    uniform sampler2D tDiffuse;
    uniform vec3 uLightPos;
    uniform vec3 uLightColor;
    uniform float uLightIntensity;
    uniform vec3 uCameraPos;
    uniform vec3 uPrismPos;
    uniform float uRoughness;
    uniform float uAnisotropy;
    uniform float uStreakGain;
    uniform float uFadeStart;
    uniform float uFadeEnd;
    uniform float uReflectionOpacity;
    uniform vec3 uBg;
    varying vec4 vUv;
    varying vec3 vWorldPos;

    #include <logdepthbuf_pars_fragment>
    #include <common>

    void main() {
      #include <logdepthbuf_fragment>

      vec3 N = vec3(0.0, 1.0, 0.0);
      vec3 V = normalize(uCameraPos - vWorldPos);
      vec3 L = uLightPos - vWorldPos;
      float dist = length(L);
      L /= max(dist, 1e-4);
      vec3 H = normalize(V + L);

      vec3 T = normalize(vec3(V.x, 0.0, V.z) + vec3(1e-5, 0.0, 0.0));
      vec3 B = normalize(cross(N, T));
      float roughnessT = max(uRoughness * (1.0 - uAnisotropy * 0.75), 0.04);
      float roughnessB = max(uRoughness * (1.0 + uAnisotropy), 0.08);
      float HoT = dot(H, T);
      float HoB = dot(H, B);
      float HoN = max(dot(H, N), 0.0);
      float denom =
        (HoT * HoT) / (roughnessT * roughnessT) +
        (HoB * HoB) / (roughnessB * roughnessB) +
        HoN * HoN;
      float D = 1.0 / max(PI * roughnessT * roughnessB * denom * denom, 1e-4);
      float atten = uLightIntensity / max(dist * dist, 2.0);
      float NoL = max(dot(N, L), 0.0);
      float towardCam = smoothstep(0.08, 0.42, abs(V.y));
      vec3 spec = uLightColor * D * NoL * atten * 0.006 * uStreakGain * towardCam;

      vec3 sharp = texture2DProj(tDiffuse, vUv).rgb;
      vec3 refl = sharp * vec3(0.72, 0.8, 0.9);

      float contact = smoothstep(0.15, 2.2, length(vWorldPos.xz - uPrismPos.xz));
      vec3 base = vec3(0.018, 0.02, 0.03) * (0.4 + 0.6 * contact);
      base = mix(base, color, 0.28);
      vec3 col = mix(base, refl, uReflectionOpacity);
      col += spec;

      float fade = smoothstep(uFadeEnd, uFadeStart, length(vWorldPos.xz - uPrismPos.xz));
      col = mix(uBg, col, fade);

      gl_FragColor = vec4(col, 1.0);
    }
  `,
};

export type FloorRig = {
  mesh: Reflector;
  update: (args: {
    camera: THREE.Camera;
    lightPos: THREE.Vector3;
    prismPos: THREE.Vector3;
  }) => void;
  dispose: () => void;
};

export function createFloor(_renderer: THREE.WebGLRenderer): FloorRig {
  const size = PARAMS.floor.size;
  const geo = new THREE.PlaneGeometry(size, size);

  const mesh = new Reflector(geo, {
    clipBias: 0.003,
    textureWidth: 512,
    textureHeight: 256,
    color: PARAMS.floor.color,
    shader: FloorShader,
    multisample: 0,
  });
  mesh.rotation.x = -Math.PI / 2;
  mesh.position.y = -0.002;
  mesh.renderOrder = 0;

  const uniforms = (mesh.material as THREE.ShaderMaterial).uniforms;

  return {
    mesh,
    update({ camera, lightPos, prismPos }) {
      uniforms.uLightPos.value.copy(lightPos);
      uniforms.uCameraPos.value.copy(camera.position);
      uniforms.uPrismPos.value.copy(prismPos);
    },
    dispose() {
      geo.dispose();
      mesh.dispose();
    },
  };
}
