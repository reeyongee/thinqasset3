import * as THREE from "three";
import { EASE_MOVE } from "../constants";
import { easeMove, loopTime } from "../easing";
import {
  disposeObject,
  glassCrystalMaterial,
} from "../materials";
import type { CreateViz } from "../types";

const DURATION = 1.5;

/** Grid of diamond blocks that expand from center then snap back. */
export const createInnovationViz: CreateViz = ({ scene, envMap }) => {
  const root = new THREE.Group();
  scene.add(root);

  const blocks: { mesh: THREE.Mesh; home: THREE.Vector3; dir: THREE.Vector3 }[] =
    [];

  const count = 3;
  const spacing = 0.95;
  for (let ix = 0; ix < count; ix++) {
    for (let iy = 0; iy < count; iy++) {
      for (let iz = 0; iz < 2; iz++) {
        const isAccent = (ix + iy + iz) % 2 === 0;
        const geo = new THREE.OctahedronGeometry(0.28, 0);
        const mat = isAccent
          ? glassCrystalMaterial(envMap, "gold")
          : glassCrystalMaterial(envMap, "glass");
        const mesh = new THREE.Mesh(geo, mat);
        const home = new THREE.Vector3(
          (ix - 1) * spacing,
          (iy - 1) * spacing * 1.05,
          (iz - 0.5) * 0.55,
        );
        mesh.position.copy(home);
        mesh.rotation.set(0.2, 0.4, 0.1);
        root.add(mesh);
        const dir = home.clone().normalize();
        if (dir.lengthSq() < 0.01) dir.set(0, 1, 0);
        blocks.push({ mesh, home, dir });
      }
    }
  }

  return {
    update(elapsed) {
      const t = loopTime(elapsed, DURATION);
      let expand = 0;
      if (t < 0.25) {
        expand = 0;
      } else if (t < 0.55) {
        expand = easeMove((t - 0.25) / 0.3, EASE_MOVE);
      } else if (t < 0.85) {
        expand = 1;
      } else {
        expand = 1 - easeMove((t - 0.85) / 0.65, EASE_MOVE);
      }

      const spread = 0.15 + expand * 1.35;
      blocks.forEach(({ mesh, home, dir }, i) => {
        const amp = spread * (0.7 + (i % 5) * 0.08);
        mesh.position.copy(home).addScaledVector(dir, amp * home.length());
        mesh.rotation.y = 0.4 + expand * 0.55 + i * 0.03;
        mesh.rotation.x = 0.2 + expand * 0.25;
        const s = 1 + expand * 0.12;
        mesh.scale.setScalar(s);
      });

      root.rotation.y = elapsed * 0.12;
    },
    dispose() {
      disposeObject(root);
      scene.remove(root);
    },
  };
};
