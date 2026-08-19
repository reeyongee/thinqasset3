import * as THREE from "three";
import { PARAMS } from "./params";

export type CameraRig = {
  camera: THREE.PerspectiveCamera;
  update: (time: number, reducedMotion: boolean) => void;
};

export function createCamera(aspect: number): CameraRig {
  const C = PARAMS.camera;
  const camera = new THREE.PerspectiveCamera(C.fov, aspect, C.near, C.far);

  const lookAt = new THREE.Vector3(...C.lookAt);
  const basePos = new THREE.Vector3(...C.position);
  const offset = basePos.clone().sub(lookAt);
  const spherical = new THREE.Spherical().setFromVector3(offset);
  const basePhi = spherical.phi;
  const baseTheta = spherical.theta;
  const yawAmp = THREE.MathUtils.degToRad(C.orbitYawDeg);
  const pitchAmp = THREE.MathUtils.degToRad(C.orbitPitchDeg);

  const apply = (yaw: number, pitch: number) => {
    spherical.theta = baseTheta + yaw;
    spherical.phi = THREE.MathUtils.clamp(basePhi + pitch, 0.08, Math.PI - 0.08);
    camera.position.copy(lookAt).add(new THREE.Vector3().setFromSpherical(spherical));
    camera.lookAt(lookAt);
  };

  apply(0, 0);

  return {
    camera,
    update(time, reducedMotion) {
      if (reducedMotion) {
        apply(0, 0);
        return;
      }
      const t = (time / C.period) * Math.PI * 2;
      apply(Math.sin(t) * yawAmp, Math.sin(t + 0.6) * pitchAmp);
    },
  };
}
