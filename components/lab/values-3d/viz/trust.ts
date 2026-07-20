import * as THREE from "three";
import { COLORS, EASE_MOVE } from "../constants";
import { loopTime, sampleKeyed } from "../easing";
import {
  disposeObject,
  glassFrostMaterial,
  lineMaterial,
} from "../materials";
import type { CreateViz } from "../types";

const DURATION = 4.5;

/** Vertical stack of frames assemble / shift / re-settle. */
export const createTrustViz: CreateViz = ({ scene, envMap }) => {
  const root = new THREE.Group();
  scene.add(root);

  const frames: THREE.Group[] = [];
  const n = 6;
  const h = 0.42;
  const gap = 0.12;

  for (let i = 0; i < n; i++) {
    const geo = new THREE.BoxGeometry(2.4 - i * 0.08, h, 0.55, 1, 1, 1);
    const edges = new THREE.EdgesGeometry(geo);
    const line = new THREE.LineSegments(
      edges,
      lineMaterial(i % 2 === 0 ? COLORS.glass : COLORS.gold, i % 2 === 0 ? 0.55 : 0.75),
    );
    const plate = new THREE.Mesh(
      geo,
      glassFrostMaterial(envMap, i % 2 === 0 ? "navy" : "gold"),
    );

    const group = new THREE.Group();
    group.add(plate, line);
    const y = (i - (n - 1) / 2) * (h + gap);
    group.position.y = y;
    group.userData.homeY = y;
    group.userData.index = i;
    root.add(group);
    frames.push(group);
  }

  return {
    update(elapsed) {
      const t = loopTime(elapsed, DURATION);

      frames.forEach((frame) => {
        const i = frame.userData.index as number;
        const homeY = frame.userData.homeY as number;
        const stagger = i * 0.08;

        const assemble = sampleKeyed(
          t,
          [
            [0.1 + stagger, 1.8],
            [0.25 + stagger + 1.5, 0],
            [2.4, 0],
            [3.2, 0.55 + i * 0.12],
            [4.0, 0],
            [4.4, 0],
          ],
          EASE_MOVE,
        );

        const xShift = sampleKeyed(
          t,
          [
            [2.5, 0],
            [3.1, (i % 2 === 0 ? 1 : -1) * 0.35],
            [3.9, 0],
          ],
          EASE_MOVE,
        );

        frame.position.y = homeY + assemble;
        frame.position.x = xShift;
        frame.rotation.z = xShift * 0.08;
        frame.scale.y = 1 - Math.min(0.35, Math.abs(assemble) * 0.12);
      });

      root.rotation.y = Math.sin(elapsed * 0.25) * 0.08;
    },
    dispose() {
      disposeObject(root);
      scene.remove(root);
    },
  };
};
