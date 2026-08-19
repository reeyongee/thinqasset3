import * as THREE from "three";
import { createCamera } from "./createCamera";
import { createStudioEnvMap } from "./createEnvironment";
import { createFloor } from "./createFloor";
import { createGlassMaterial } from "./createGlassMaterial";
import { createLighting } from "./createLighting";
import { createPostProcessing } from "./createPostProcessing";
import { createPrismGeometry } from "./createPrismGeometry";
import { PARAMS } from "./params";

export { PARAMS };

export type GlassPrismScene = {
  dispose: () => void;
};

export function createGlassPrismScene(host: HTMLElement): GlassPrismScene {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(PARAMS.background);
  scene.fog = new THREE.FogExp2(PARAMS.background, 0.004);
  scene.environmentIntensity = 0.9;

  const renderer = new THREE.WebGLRenderer({
    antialias: false,
    alpha: false,
    powerPreference: "high-performance",
  });
  renderer.setClearColor(PARAMS.background, 1);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, PARAMS.pixelRatioCap));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.AgXToneMapping;
  renderer.toneMappingExposure = PARAMS.exposure;
  renderer.domElement.style.display = "block";
  renderer.domElement.style.width = "100%";
  renderer.domElement.style.height = "100%";
  host.appendChild(renderer.domElement);

  const envMap = createStudioEnvMap(renderer);
  scene.environment = envMap;

  const cameraRig = createCamera(1);
  const lighting = createLighting();
  scene.add(lighting.world);

  const geometry = createPrismGeometry();
  const glass = createGlassMaterial(envMap);
  const outer = new THREE.Mesh(geometry, glass.outer);
  const prism = new THREE.Group();
  prism.add(outer, lighting.local);
  prism.position.set(...PARAMS.prism.position);
  prism.rotation.y = PARAMS.prism.rotationY;
  scene.add(prism);

  const floor = createFloor(renderer);
  const reflectPass = floor.mesh.onBeforeRender.bind(floor.mesh);
  floor.mesh.onBeforeRender = (
    renderer,
    scene,
    camera,
    geometry,
    material,
    group,
  ) => {
    lighting.spark.visible = false;
    reflectPass(renderer, scene, camera, geometry, material, group);
    lighting.spark.visible = true;
  };
  scene.add(floor.mesh);

  const post = createPostProcessing(renderer, scene, cameraRig.camera);
  const sparkNdc = new THREE.Vector3();
  const lightWorld = new THREE.Vector3();
  const prismWorld = new THREE.Vector3();
  const timer = new THREE.Timer();
  timer.connect(document);

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  let running = true;
  let raf = 0;

  const resize = () => {
    const w = host.clientWidth || 1;
    const h = host.clientHeight || 1;
    const pr = Math.min(window.devicePixelRatio, PARAMS.pixelRatioCap);
    cameraRig.camera.aspect = w / h;
    cameraRig.camera.updateProjectionMatrix();
    renderer.setPixelRatio(pr);
    renderer.setSize(w, h, false);
    post.setSize(w, h, pr);
  };
  resize();

  const ro = new ResizeObserver(resize);
  ro.observe(host);

  const io = new IntersectionObserver(
    ([entry]) => {
      running = entry.isIntersecting;
      if (running) raf = requestAnimationFrame(tick);
    },
    { threshold: 0.05 },
  );
  io.observe(host);

  const onVisibility = () => {
    running = !document.hidden;
    if (running) raf = requestAnimationFrame(tick);
  };
  document.addEventListener("visibilitychange", onVisibility);

  const tick = () => {
    if (!running) return;
    timer.update();
    const time = timer.getElapsed();
    cameraRig.update(time, reducedMotion);
    lighting.update(time);

    lighting.spark.getWorldPosition(lightWorld);
    prism.getWorldPosition(prismWorld);
    prismWorld.y = 0;
    floor.update({
      camera: cameraRig.camera,
      lightPos: lightWorld,
      prismPos: prismWorld,
    });

    sparkNdc.copy(lightWorld).project(cameraRig.camera);
    post.setFlareNdc(sparkNdc.x * 0.5 + 0.5, sparkNdc.y * 0.5 + 0.5);

    post.composer.render();
    raf = requestAnimationFrame(tick);
  };
  raf = requestAnimationFrame(tick);

  return {
    dispose() {
      running = false;
      cancelAnimationFrame(raf);
      document.removeEventListener("visibilitychange", onVisibility);
      io.disconnect();
      ro.disconnect();
      lighting.dispose();
      timer.disconnect();
      floor.dispose();
      post.dispose();
      geometry.dispose();
      glass.outer.dispose();
      envMap.dispose();
      renderer.dispose();
      if (renderer.domElement.parentElement === host) {
        host.removeChild(renderer.domElement);
      }
      scene.clear();
    },
  };
}
