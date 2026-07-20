import * as THREE from "three";
import { COLORS, EASE_MOVE } from "../constants";
import { easeMove, loopTime, sampleKeyed } from "../easing";
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

const DURATION = 10.5;

const BR = new THREE.Vector3(1.85, -1.15, 0);
const BL = new THREE.Vector3(-1.85, -1.15, 0);
const TOP = new THREE.Vector3(0, 1.55, 0);
const VERTS = [BR, BL, TOP] as const;

function lerpVec(a: THREE.Vector3, b: THREE.Vector3, u: number, out: THREE.Vector3) {
  out.copy(a).lerp(b, u);
}

/** Triangle of rings; two nodes chase vertices; edges draw; ellipse wipe bands. */
export const createPartnershipsViz: CreateViz = ({ scene, envMap }) => {
  const root = new THREE.Group();
  scene.add(root);

  VERTS.forEach((v) => {
    const ring = makeTorusRing(0.85, 0.04, glassRingMaterial(envMap, 0.72, "soft"));
    ring.position.copy(v);
    ring.rotation.x = Math.PI / 2;
    root.add(ring);
  });

  const edges: THREE.Line[] = [];
  const edgePairs: [THREE.Vector3, THREE.Vector3][] = [
    [BR, BL],
    [BL, TOP],
    [TOP, BR],
  ];
  edgePairs.forEach(([a, b]) => {
    const geo = new THREE.BufferGeometry().setFromPoints([a, b]);
    const line = new THREE.Line(geo, lineMaterial(COLORS.gold, 0.15));
    root.add(line);
    edges.push(line);
  });

  const dotA = makeNode(0.1, glassNodeMaterial(envMap));
  const dotB = makeNode(0.085, glassNodeMaterial(envMap));
  root.add(dotA, dotB);

  const wipeMat = glassGoldMaterial(envMap, 0);
  wipeMat.depthWrite = false;
  wipeMat.side = THREE.DoubleSide;
  // Thin annular band — avoids a big filled gold disc washing the scene
  const wipe = new THREE.Mesh(
    new THREE.RingGeometry(0.75, 1.15, 48),
    wipeMat,
  );
  wipe.position.z = 0.15;
  wipe.renderOrder = 2;
  root.add(wipe);

  const tmp = new THREE.Vector3();

  const pathA: { t0: number; t1: number; from: THREE.Vector3; to: THREE.Vector3 }[] = [
    { t0: 0.25, t1: 1.75, from: BR, to: BL },
    { t0: 3.75, t1: 5.25, from: BL, to: TOP },
    { t0: 7.25, t1: 8.75, from: TOP, to: BR },
  ];
  const pathB: { t0: number; t1: number; from: THREE.Vector3; to: THREE.Vector3 }[] = [
    { t0: 1.75, t1: 3.25, from: BR, to: BL },
    { t0: 5.25, t1: 6.75, from: BL, to: TOP },
    { t0: 8.75, t1: 10.25, from: TOP, to: BR },
  ];

  function samplePath(
    t: number,
    segments: typeof pathA,
    fallback: THREE.Vector3,
    out: THREE.Vector3,
  ) {
    let last = fallback;
    for (const seg of segments) {
      if (t < seg.t0) {
        out.copy(last);
        return;
      }
      if (t <= seg.t1) {
        const u = easeMove((t - seg.t0) / (seg.t1 - seg.t0), EASE_MOVE);
        lerpVec(seg.from, seg.to, u, out);
        return;
      }
      last = seg.to;
    }
    out.copy(last);
  }

  const edgeWindows = [
    { draw: [0.25, 1.75] as const, wipe: [1.75, 3.25] as const },
    { draw: [3.75, 5.25] as const, wipe: [5.25, 6.75] as const },
    { draw: [7.25, 8.75] as const, wipe: [8.75, 10.25] as const },
  ];

  const wipeWindows = [
    [0.25, 3.25] as const,
    [3.75, 6.75] as const,
    [7.25, 10.25] as const,
  ];

  return {
    update(elapsed) {
      const t = loopTime(elapsed, DURATION);

      samplePath(t, pathA, BR, tmp);
      dotA.position.copy(tmp);
      samplePath(t, pathB, BR, tmp);
      dotB.position.copy(tmp);

      edges.forEach((edge, i) => {
        const win = edgeWindows[i];
        const mat = edge.material as THREE.LineBasicMaterial;
        let opacity = 0.1;
        if (t >= win.draw[0] && t <= win.draw[1]) {
          const u = easeMove((t - win.draw[0]) / 1.5, EASE_MOVE);
          opacity = 0.12 + u * 0.7;
        } else if (t > win.draw[1] && t < win.wipe[0]) {
          opacity = 0.82;
        } else if (t >= win.wipe[0] && t <= win.wipe[1]) {
          const u = easeMove((t - win.wipe[0]) / 1.5, EASE_MOVE);
          opacity = 0.82 * (1 - u);
        }
        mat.opacity = opacity;
      });

      let wipeOpacity = 0;
      let wipeScaleX = 1;
      let wipeX = 0;
      for (const [a, b] of wipeWindows) {
        if (t < a || t > b) continue;
        const local = t - a;
        const fadeIn = Math.min(1, local / 0.33);
        const fadeOut = Math.min(1, (b - t) / 0.33);
        wipeOpacity = Math.min(fadeIn, fadeOut) * 0.22;
        const mid = (a + b) / 2;
        const squash = sampleKeyed(
          t,
          [
            [a, 1],
            [mid, 0.05],
            [b, 1],
          ],
          EASE_MOVE,
        );
        wipeScaleX = squash;
        wipeX = ((t - a) / (b - a) - 0.5) * 3.2;
      }
      wipeMat.opacity = wipeOpacity;
      wipe.scale.set(wipeScaleX, 1, 1);
      wipe.position.x = wipeX;
    },
    dispose() {
      disposeObject(root);
      scene.remove(root);
    },
  };
};
