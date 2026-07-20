import type * as THREE from "three";

export type VizContext = {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  envMap: THREE.Texture;
};

export type VizHandle = {
  update: (elapsedSec: number) => void;
  dispose: () => void;
};

export type CreateViz = (ctx: VizContext) => VizHandle;
