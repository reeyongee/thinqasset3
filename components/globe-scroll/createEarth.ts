import * as THREE from "three";
import { GLOBE_SCROLL_TEXTURES, GLOBE_RADIUS } from "./constants";
import {
  finGlobeFragmentShader,
  finGlobeVertexShader,
} from "./globeShaders";

const RELIEF_DIVISOR = 1.3;

const GLOBE_SETTINGS = {
  reliefHeight: 0.03,
  edgeSharpness: 0.3,
  cliffShading: 0.06,
  stoneRepeatX: 6,
  stoneRepeatY: 3,
  saturation: 0.8,
};

function smoothstep(edge0: number, edge1: number, x: number) {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

function edgeThresholds(sharpness: number): [number, number] {
  const band = 0.22 - 0.16 * Math.max(0, Math.min(1, sharpness));
  return [0.5 - band, 0.5 + band];
}

function gaussianKernel(sigma: number, blurRadius: number) {
  const kernel: number[] = [];
  let sum = 0;
  for (let i = -blurRadius; i <= blurRadius; i++) {
    const w = Math.exp(-(i * i) / (2 * sigma * sigma));
    kernel.push(w);
    sum += w;
  }
  return kernel.map((w) => w / sum);
}

function blurLandMask(
  imageData: ImageData,
  blurRadius: number,
): Float32Array {
  const { width, height, data } = imageData;
  const sigma = blurRadius / 2.5;
  const kernel = gaussianKernel(sigma, blurRadius);
  const src = new Float32Array(width * height);
  for (let i = 0; i < width * height; i++) src[i] = data[i * 4] / 255;

  const tmp = new Float32Array(width * height);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let acc = 0;
      for (let k = -blurRadius; k <= blurRadius; k++) {
        const sx = (x + k + width) % width;
        acc += src[y * width + sx] * kernel[k + blurRadius];
      }
      tmp[y * width + x] = acc;
    }
  }

  const out = new Float32Array(width * height);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let acc = 0;
      for (let k = -blurRadius; k <= blurRadius; k++) {
        const sy = Math.min(Math.max(y + k, 0), height - 1);
        acc += tmp[sy * width + x] * kernel[k + blurRadius];
      }
      out[y * width + x] = acc;
    }
  }
  return out;
}

function createLandMaskTexture(
  image: HTMLImageElement,
  renderer: THREE.WebGLRenderer,
  lowQuality: boolean,
): THREE.Texture {
  const maskW = lowQuality ? 512 : 1024;
  const maskH = lowQuality ? 256 : 512;
  const blurRadius = lowQuality ? 3 : 6;

  const blurred = blurLandMask(
    (() => {
      const canvas = document.createElement("canvas");
      canvas.width = maskW;
      canvas.height = maskH;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(image, 0, 0, maskW, maskH);
      return ctx.getImageData(0, 0, maskW, maskH);
    })(),
    blurRadius,
  );

  const [low, high] = edgeThresholds(GLOBE_SETTINGS.edgeSharpness);
  const canvas = document.createElement("canvas");
  canvas.width = maskW;
  canvas.height = maskH;
  const ctx = canvas.getContext("2d")!;
  const img = ctx.createImageData(maskW, maskH);
  for (let i = 0; i < blurred.length; i++) {
    const v = Math.round(smoothstep(low, high, blurred[i]) * 255);
    img.data[i * 4] = v;
    img.data[i * 4 + 1] = v;
    img.data[i * 4 + 2] = v;
    img.data[i * 4 + 3] = 255;
  }
  ctx.putImageData(img, 0, 0);

  const tex = new THREE.CanvasTexture(canvas);
  tex.minFilter = THREE.LinearFilter;
  tex.magFilter = THREE.LinearFilter;
  tex.anisotropy = lowQuality
    ? 1
    : renderer.capabilities.getMaxAnisotropy();
  return tex;
}

function createEnvMap(
  renderer: THREE.WebGLRenderer,
  lowQuality: boolean,
): THREE.CubeTexture {
  const scene = new THREE.Scene();
  const size = lowQuality ? 128 : 512;
  const cubeSize = lowQuality ? 64 : 256;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const half = size / 2;
  const grad = ctx.createRadialGradient(half, half, 0, half, half, half * 1.4);
  grad.addColorStop(0, "#4a3520");
  grad.addColorStop(0.4, "#2a1a0a");
  grad.addColorStop(1, "#000000");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);
  const blobCount = lowQuality ? 8 : 30;
  for (let i = 0; i < blobCount; i++) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    const r = Math.random() * (size * 0.12) + size * 0.04;
    const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(
      0,
      `rgba(255,210,${Math.floor(Math.random() * 80 + 100)},${Math.random() * 0.4 + 0.15})`,
    );
    g.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = g;
    ctx.fillRect(x - r, y - r, r * 2, r * 2);
  }
  const bg = new THREE.CanvasTexture(canvas);
  scene.background = bg;
  const cube = new THREE.WebGLCubeRenderTarget(cubeSize);
  const cam = new THREE.CubeCamera(0.1, 100, cube);
  cam.update(renderer, scene);
  bg.dispose();
  return cube.texture;
}

export type FinEarth = {
  group: THREE.Group;
  updateLights: (camera: THREE.Camera) => void;
  dispose: () => void;
};

export async function createEarth(
  renderer: THREE.WebGLRenderer,
  lowQuality = false,
): Promise<FinEarth> {
  const loader = new THREE.TextureLoader();
  const aniso = lowQuality ? 1 : renderer.capabilities.getMaxAnisotropy();
  const reliefScale = GLOBE_RADIUS / RELIEF_DIVISOR;

  const [stoneDiffuse, stoneNormal, stoneRoughness, goldDaymap, landMaskImg] =
    await Promise.all([
      loader.loadAsync(GLOBE_SCROLL_TEXTURES.stoneDiffuse),
      loader.loadAsync(GLOBE_SCROLL_TEXTURES.stoneNormal),
      loader.loadAsync(GLOBE_SCROLL_TEXTURES.stoneRoughness),
      loader.loadAsync(GLOBE_SCROLL_TEXTURES.earthDaymap),
      loader.loadAsync(GLOBE_SCROLL_TEXTURES.landMaskMobile),
    ]);

  for (const tex of [stoneDiffuse, goldDaymap]) {
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.anisotropy = aniso;
  }
  for (const tex of [stoneNormal, stoneRoughness]) {
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.anisotropy = aniso;
  }

  const landMaskTexture = createLandMaskTexture(
    landMaskImg.image as HTMLImageElement,
    renderer,
    lowQuality,
  );
  // Source mask texture is only needed for CPU preprocessing.
  landMaskImg.dispose();

  const envMap = createEnvMap(renderer, lowQuality);

  const keyLightColor = new THREE.Color("#ffecd2").multiplyScalar(2.8);
  const rimLightColor = new THREE.Color("#ffd080").multiplyScalar(2.1);
  const fillLightColor = new THREE.Color("#8899bb").multiplyScalar(0.4);
  const ambientColor = new THREE.Color("#2a2018").multiplyScalar(0);

  const uniforms = {
    stoneDiffuseTexture: { value: stoneDiffuse },
    stoneNormalTexture: { value: stoneNormal },
    stoneRoughnessTexture: { value: stoneRoughness },
    landMaskTexture: { value: landMaskTexture },
    goldDaymapTexture: { value: goldDaymap },
    envMap: { value: envMap },
    hasEnvMap: { value: true },
    stoneRepeat: {
      value: new THREE.Vector2(
        GLOBE_SETTINGS.stoneRepeatX,
        GLOBE_SETTINGS.stoneRepeatY,
      ),
    },
    displacementHeight: { value: GLOBE_SETTINGS.reliefHeight },
    reliefScale: { value: reliefScale },
    normalStrength: { value: GLOBE_SETTINGS.cliffShading },
    keyLightPosition: { value: new THREE.Vector3() },
    keyLightColor: { value: keyLightColor },
    rimLightPosition: { value: new THREE.Vector3() },
    fillLightPosition: { value: new THREE.Vector3() },
    fillLightColor: { value: fillLightColor },
    rimLightColor: { value: rimLightColor },
    ambientColor: { value: ambientColor },
    lightAttenuation: { value: 0.02 / (reliefScale * reliefScale) },
    saturation: { value: GLOBE_SETTINGS.saturation },
  };

  const segments = lowQuality ? 64 : 160;
  const geometry = new THREE.SphereGeometry(GLOBE_RADIUS, segments, segments);
  const material = new THREE.ShaderMaterial({
    uniforms,
    vertexShader: finGlobeVertexShader,
    fragmentShader: finGlobeFragmentShader,
  });

  const earthMesh = new THREE.Mesh(geometry, material);
  earthMesh.rotation.y = -Math.PI / 2 + 0.03;

  const group = new THREE.Group();
  group.add(earthMesh);

  const keyOffset = new THREE.Vector3(-6, 9, 1).multiplyScalar(reliefScale);
  const rimOffset = new THREE.Vector3(-2, 4, -4).multiplyScalar(reliefScale);
  const fillOffset = new THREE.Vector3(-2, -0.7, 3.5).multiplyScalar(reliefScale);

  return {
    group,
    updateLights(camera: THREE.Camera) {
      uniforms.keyLightPosition.value.copy(keyOffset).applyMatrix4(camera.matrixWorld);
      uniforms.rimLightPosition.value.copy(rimOffset).applyMatrix4(camera.matrixWorld);
      uniforms.fillLightPosition.value.copy(fillOffset).applyMatrix4(camera.matrixWorld);
    },
    dispose() {
      geometry.dispose();
      material.dispose();
      stoneDiffuse.dispose();
      stoneNormal.dispose();
      stoneRoughness.dispose();
      goldDaymap.dispose();
      landMaskTexture.dispose();
      envMap.dispose();
    },
  };
}
