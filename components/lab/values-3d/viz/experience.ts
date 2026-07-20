import * as THREE from "three";
import { COLORS, EASE_MOVE } from "../constants";
import { loopTime, sampleKeyed } from "../easing";
import {
  disposeObject,
  glassGoldMaterial,
  glassNodeMaterial,
  glassRingMaterial,
  lineMaterial,
  makeNode,
  makeTorusRing,
} from "../materials";
import type { CreateViz } from "../types";

const DURATION = 7;

/** Concentric rings shift on Y with staggered amplitudes; white node rides the inner ring. */
export const createExperienceViz: CreateViz = ({ scene, envMap }) => {
  const root = new THREE.Group();
  scene.add(root);

  const mats = [
    glassRingMaterial(envMap, 0.55, "deep"),
    glassRingMaterial(envMap, 0.65, "mid"),
    glassRingMaterial(envMap, 0.75, "soft"),
    glassGoldMaterial(envMap, 0.88),
  ];

  const radii = [2.35, 1.75, 1.2, 0.72];
  const amplitudes = [0, 0.65, 1.3, 1.95];
  const rings = radii.map((r, i) => {
    const mesh = makeTorusRing(r, i === 0 ? 0.038 : 0.042, mats[i]);
    mesh.rotation.x = Math.PI / 2;
    root.add(mesh);
    return mesh;
  });

  const staticDot = makeNode(0.07, glassNodeMaterial(envMap));
  staticDot.position.set(0, 0, 0);
  root.add(staticDot);

  const movingDot = makeNode(0.1, glassNodeMaterial(envMap));
  root.add(movingDot);

  const lineGeo = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(0, 2.2, 0),
    new THREE.Vector3(0, -2.2, 0),
  ]);
  const line = new THREE.Line(lineGeo, lineMaterial(COLORS.greyLight, 0.55));
  root.add(line);

  const yKeys = [
    [0.25, 1] as const,
    [1.75, 0] as const,
    [3.25, -1] as const,
    [3.75, -1] as const,
    [5.25, 0] as const,
    [6.75, 1] as const,
  ];

  const trimEndKeys = [
    [0.25, 1] as const,
    [1.75, 0.5] as const,
    [5.25, 0.5] as const,
    [6.75, 1] as const,
  ];
  const trimStartKeys = [
    [1.75, 0.5] as const,
    [3.25, 0] as const,
    [3.75, 0] as const,
    [5.25, 0.5] as const,
  ];

  const setLineTrim = (start: number, end: number) => {
    const mat = line.material as THREE.LineBasicMaterial;
    const span = Math.max(0.001, end - start);
    mat.opacity = 0.2 + span * 0.5;
    line.scale.y = span;
    line.position.y = ((start + end) / 2 - 0.5) * 4.4;
  };

  return {
    update(elapsed) {
      const t = loopTime(elapsed, DURATION);
      const unit = sampleKeyed(t, yKeys, EASE_MOVE);

      rings.forEach((ring, i) => {
        ring.position.y = unit * amplitudes[i];
      });
      movingDot.position.y = unit * amplitudes[3];

      const trimStart = sampleKeyed(t, trimStartKeys, EASE_MOVE);
      const trimEnd = sampleKeyed(t, trimEndKeys, EASE_MOVE);
      setLineTrim(trimStart, trimEnd);
    },
    dispose() {
      disposeObject(root);
      scene.remove(root);
    },
  };
};
