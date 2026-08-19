import * as THREE from "three";
import { PARAMS } from "./params";

export type LightingRig = {
  local: THREE.Group;
  world: THREE.Group;
  key: THREE.PointLight;
  spark: THREE.Mesh;
  update: (time: number) => void;
  dispose: () => void;
};

export function createLighting(): LightingRig {
  const local = new THREE.Group();
  const world = new THREE.Group();
  const L = PARAMS.light;
  const A = PARAMS.ambient;
  const lightColor = new THREE.Color(L.color);

  const hemi = new THREE.HemisphereLight(A.hemiSky, A.hemiGround, A.hemiIntensity);
  world.add(hemi);

  const rim = new THREE.DirectionalLight(A.rimColor, A.rimIntensity);
  rim.position.set(...A.rimPosition);
  world.add(rim);

  const key = new THREE.PointLight(lightColor, L.intensity, L.distance, L.decay);
  key.position.set(...L.position);
  local.add(key);

  const sparkGeo = new THREE.SphereGeometry(L.sparkScale, 8, 8);
  const sparkMat = new THREE.MeshBasicMaterial({
    color: new THREE.Color(1.8, 1.25, 0.62),
    toneMapped: false,
    depthWrite: false,
    depthTest: true,
    transparent: true,
  });
  sparkMat.color.multiplyScalar(L.sparkBoost);
  const spark = new THREE.Mesh(sparkGeo, sparkMat);
  spark.position.copy(key.position);
  spark.renderOrder = 4;
  local.add(spark);

  const keyHome = key.position.clone();

  return {
    local,
    world,
    key,
    spark,
    update(time: number) {
      const drift =
        Math.sin(time * ((Math.PI * 2) / PARAMS.camera.period)) * 0.055;
      key.position.set(keyHome.x + drift, keyHome.y, keyHome.z + drift * 0.35);
      spark.position.copy(key.position);
    },
    dispose() {
      sparkGeo.dispose();
      sparkMat.dispose();
    },
  };
}
