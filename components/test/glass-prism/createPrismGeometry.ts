import * as THREE from "three";
import { PARAMS } from "./params";

function pushTriangle(
  positions: number[],
  normals: number[],
  uvs: number[],
  a: THREE.Vector3,
  b: THREE.Vector3,
  c: THREE.Vector3,
  uvA: [number, number],
  uvB: [number, number],
  uvC: [number, number],
) {
  const n = new THREE.Vector3()
    .subVectors(b, a)
    .cross(new THREE.Vector3().subVectors(c, a))
    .normalize();

  for (const [v, uv] of [
    [a, uvA],
    [b, uvB],
    [c, uvC],
  ] as const) {
    positions.push(v.x, v.y, v.z);
    normals.push(n.x, n.y, n.z);
    uvs.push(uv[0], uv[1]);
  }
}

function pushQuad(
  positions: number[],
  normals: number[],
  uvs: number[],
  a: THREE.Vector3,
  b: THREE.Vector3,
  c: THREE.Vector3,
  d: THREE.Vector3,
) {
  pushTriangle(positions, normals, uvs, a, b, c, [0, 0], [1, 0], [1, 1]);
  pushTriangle(positions, normals, uvs, a, c, d, [0, 0], [1, 1], [0, 1]);
}

/**
 * Tall architectural glass shard: tapered rectangular body, sharp planar
 * faces, and an asymmetrical pointed top (not a BoxGeometry).
 */
export function createPrismGeometry(): THREE.BufferGeometry {
  const { width, depth, taper, peak, shoulderY, leanZ } = PARAMS.prism;

  const hw = width * 0.5;
  const hd = depth * 0.5;
  const tw = hw * taper;
  const td = hd * taper * 0.92;

  const bFL = new THREE.Vector3(-hw, 0, hd);
  const bFR = new THREE.Vector3(hw, 0, hd);
  const bBR = new THREE.Vector3(hw, 0, -hd);
  const bBL = new THREE.Vector3(-hw, 0, -hd);

  const tFL = new THREE.Vector3(-tw, shoulderY.frontLeft, td + leanZ);
  const tFR = new THREE.Vector3(tw * 0.92, shoulderY.frontRight, td * 0.9 + leanZ);
  const tBR = new THREE.Vector3(tw * 0.96, shoulderY.backRight, -td + leanZ);
  const tBL = new THREE.Vector3(-tw * 0.9, shoulderY.backLeft, -td * 1.05 + leanZ);
  const apex = new THREE.Vector3(peak[0], peak[1], peak[2] + leanZ);

  const positions: number[] = [];
  const normals: number[] = [];
  const uvs: number[] = [];

  // No bottom cap — the shard sits on the floor; a cap reads as a bright
  // rectangle in the reflector and as a white sliver at contact.

  // Vertical body — each face is its own planar pair so Fresnel splits cleanly
  pushQuad(positions, normals, uvs, bFL, bFR, tFR, tFL); // front
  pushQuad(positions, normals, uvs, bFR, bBR, tBR, tFR); // right
  pushQuad(positions, normals, uvs, bBR, bBL, tBL, tBR); // back
  pushQuad(positions, normals, uvs, bBL, bFL, tFL, tBL); // left

  // Faceted peak — four triangles meeting at an offset apex
  pushTriangle(
    positions,
    normals,
    uvs,
    tFL,
    tFR,
    apex,
    [0, 0],
    [1, 0],
    [0.5, 1],
  );
  pushTriangle(
    positions,
    normals,
    uvs,
    tFR,
    tBR,
    apex,
    [0, 0],
    [1, 0],
    [0.5, 1],
  );
  pushTriangle(
    positions,
    normals,
    uvs,
    tBR,
    tBL,
    apex,
    [0, 0],
    [1, 0],
    [0.5, 1],
  );
  pushTriangle(
    positions,
    normals,
    uvs,
    tBL,
    tFL,
    apex,
    [0, 0],
    [1, 0],
    [0.5, 1],
  );

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(positions, 3),
  );
  geometry.setAttribute("normal", new THREE.Float32BufferAttribute(normals, 3));
  geometry.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
  geometry.computeBoundingBox();
  geometry.computeBoundingSphere();
  return geometry;
}
