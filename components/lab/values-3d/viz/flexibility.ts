import * as THREE from "three";
import { COLORS, EASE_MOVE } from "../constants";
import { loopTime, sampleKeyed } from "../easing";
import {
  disposeObject,
  glassCrystalMaterial,
  glassGoldMaterial,
  glassRingMaterial,
  makeTorusRing,
  ringMaterial,
} from "../materials";
import type { CreateViz } from "../types";

const DURATION = 6.333;

/** Parent null rotates/orbits; children flip scale ±1 while tracing arcs. */
export const createFlexibilityViz: CreateViz = ({ scene, envMap }) => {
  const root = new THREE.Group();
  scene.add(root);

  const nullCtrl = new THREE.Group();
  root.add(nullCtrl);

  const arms: THREE.Group[] = [];
  const radii = [1.1, 1.7, 2.35];
  const mats = [
    glassRingMaterial(envMap, 0.5, "deep"),
    glassRingMaterial(envMap, 0.58, "mid"),
    glassGoldMaterial(envMap, 0.7),
  ];

  radii.forEach((r, i) => {
    const arm = new THREE.Group();
    arm.rotation.z = (i / radii.length) * Math.PI * 2;
    const ring = makeTorusRing(0.45 + i * 0.08, 0.03, mats[i]);
    ring.position.x = r;
    ring.rotation.y = Math.PI / 2;
    arm.add(ring);

    const bar = new THREE.Mesh(
      new THREE.BoxGeometry(r * 0.85, 0.035, 0.035),
      ringMaterial(COLORS.muted, 0.4, envMap),
    );
    bar.position.x = r * 0.42;
    arm.add(bar);

    nullCtrl.add(arm);
    arms.push(arm);
  });

  const core = new THREE.Mesh(
    new THREE.IcosahedronGeometry(0.28, 0),
    glassCrystalMaterial(envMap, "gold"),
  );
  nullCtrl.add(core);

  return {
    update(elapsed) {
      const t = loopTime(elapsed, DURATION);

      const px = sampleKeyed(
        t,
        [
          [0.25, 0],
          [2.0, 0.35],
          [4.0, -0.25],
          [6.08, 0],
        ],
        EASE_MOVE,
      );
      const py = sampleKeyed(
        t,
        [
          [0.25, 0],
          [1.92, 0.2],
          [4.42, -0.15],
          [6.08, 0],
        ],
        EASE_MOVE,
      );
      nullCtrl.position.set(px, py, 0);

      const rot = sampleKeyed(
        t,
        [
          [1.92, 0],
          [4.42, Math.PI],
          [6.0, Math.PI * 1.15],
        ],
        EASE_MOVE,
      );
      nullCtrl.rotation.z = rot;
      nullCtrl.rotation.y = Math.sin(t * 0.4) * 0.25;

      const flip = sampleKeyed(
        t,
        [
          [0.5, 1],
          [2.2, 1],
          [3.2, -1],
          [4.8, -1],
          [5.8, 1],
        ],
        EASE_MOVE,
      );

      arms.forEach((arm, i) => {
        const child = arm.children[0];
        if (child) {
          child.scale.x = flip;
          child.scale.y = i % 2 === 0 ? flip : 1;
        }
        arm.rotation.x = Math.sin(t * 0.7 + i) * 0.2;
      });

      core.rotation.x = elapsed * 0.4;
      core.rotation.y = elapsed * 0.55;
    },
    dispose() {
      disposeObject(root);
      scene.remove(root);
    },
  };
};
