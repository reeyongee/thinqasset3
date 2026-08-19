import * as THREE from "three";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { ShaderPass } from "three/addons/postprocessing/ShaderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import { PARAMS } from "./params";

const CinematicShader = {
  name: "CinematicGradeShader",
  uniforms: {
    tDiffuse: { value: null as THREE.Texture | null },
    uFlarePos: { value: new THREE.Vector2(0.58, 0.62) },
    uFlareStrength: { value: PARAMS.grade.flareStrength },
    uAnamorphic: { value: PARAMS.grade.anamorphic },
    uSpike: { value: PARAMS.grade.spike },
    uVignette: { value: PARAMS.grade.vignette },
    uContrast: { value: PARAMS.grade.contrast },
    uSaturation: { value: PARAMS.grade.saturation },
    uWarmth: { value: PARAMS.grade.warmth },
    uShadowLift: { value: PARAMS.grade.shadowLift },
    uAspect: { value: 16 / 9 },
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
    uniform vec2 uFlarePos;
    uniform float uFlareStrength;
    uniform float uAnamorphic;
    uniform float uSpike;
    uniform float uVignette;
    uniform float uContrast;
    uniform float uSaturation;
    uniform float uWarmth;
    uniform float uShadowLift;
    uniform float uAspect;
    varying vec2 vUv;

    void main() {
      vec4 texel = texture2D(tDiffuse, vUv);
      vec3 color = texel.rgb;

      vec2 toFlare = vUv - uFlarePos;
      toFlare.x *= uAspect;
      float dist = length(toFlare);
      float glow = exp(-dist * 28.0);
      float anam = exp(-abs(toFlare.y) * 90.0) * exp(-abs(toFlare.x) * 7.5);
      float angle = atan(toFlare.y, toFlare.x);
      float spikes = pow(max(0.0, cos(angle * 4.0)), 48.0) * exp(-dist * 18.0);
      float cross = exp(-abs(toFlare.x) * 70.0) * exp(-abs(toFlare.y) * 14.0);
      vec3 gold = vec3(1.0, 0.7, 0.34);
      color += gold * (
        glow * 0.42 * uFlareStrength +
        anam * uAnamorphic * 0.38 +
        (spikes * 0.55 + cross * 0.35) * uSpike
      );

      color = (color - 0.5) * uContrast + 0.5 + uShadowLift;
      float luma = dot(color, vec3(0.2126, 0.7152, 0.0722));
      color = mix(vec3(luma), color, uSaturation);
      color.r += uWarmth * 0.04;
      color.b -= uWarmth * 0.025;

      float vig = distance(vUv, vec2(0.5));
      color *= 1.0 - smoothstep(0.35, 1.05, vig) * uVignette;

      gl_FragColor = vec4(max(color, vec3(0.0)), texel.a);
    }
  `,
};

export type PostRig = {
  composer: EffectComposer;
  bloom: UnrealBloomPass;
  grade: ShaderPass;
  setSize: (width: number, height: number, pixelRatio: number) => void;
  setFlareNdc: (x: number, y: number) => void;
  dispose: () => void;
};

export function createPostProcessing(
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.Camera,
): PostRig {
  const size = renderer.getSize(new THREE.Vector2());
  const composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));

  const bloom = new UnrealBloomPass(
    new THREE.Vector2(size.x * 0.5, size.y * 0.5),
    PARAMS.bloom.strength,
    PARAMS.bloom.radius,
    PARAMS.bloom.threshold,
  );
  composer.addPass(bloom);

  const grade = new ShaderPass(CinematicShader);
  composer.addPass(grade);

  const output = new OutputPass();
  composer.addPass(output);

  return {
    composer,
    bloom,
    grade,
    setSize(width, height, pixelRatio) {
      composer.setPixelRatio(pixelRatio);
      composer.setSize(width, height);
      bloom.setSize(width * pixelRatio * 0.5, height * pixelRatio * 0.5);
      grade.uniforms.uAspect.value = width / Math.max(height, 1);
    },
    setFlareNdc(x, y) {
      grade.uniforms.uFlarePos.value.set(x, y);
    },
    dispose() {
      composer.dispose();
      bloom.dispose();
      output.dispose();
    },
  };
}
