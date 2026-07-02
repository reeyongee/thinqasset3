"use client";

import { useEffect, useRef } from "react";
import { MESH_PALETTE_LUXURY } from "./constants";

const VERTEX_SHADER = `
attribute vec2 a_Position;
attribute vec2 a_TexCoord;
varying vec2 texco;
void main() {
  texco = a_TexCoord;
  gl_Position = vec4(a_Position, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER = `
#define MAX_POINTS 16
precision mediump float;

uniform vec2 u_resolution;
uniform vec2 points[MAX_POINTS];
uniform float s2[MAX_POINTS];
uniform vec2 w[MAX_POINTS];
uniform int npoints;
uniform int warp;

varying vec2 texco;

uniform int u_color1;
uniform int u_color2;
uniform int u_color3;
uniform int u_color4;

vec4 getColor(int c) {
  float rValue = float(c / 256 / 256);
  float gValue = float(c / 256 - int(rValue * 256.0));
  float bValue = float(c - int(rValue * 256.0 * 256.0) - int(gValue * 256.0));
  return vec4(rValue / 255.0, gValue / 255.0, bValue / 255.0, 1.0);
}

vec4 grad(vec2 uv) {
  vec4 color0 = getColor(u_color1);
  vec4 color1 = getColor(u_color2);
  vec4 color2 = getColor(u_color3);
  vec4 color3 = getColor(u_color4);

  vec2 P0 = vec2(0.31, 0.3);
  vec2 P1 = vec2(0.7, 0.32);
  vec2 P2 = vec2(0.28, 0.71);
  vec2 P3 = vec2(0.72, 0.75);

  vec2 Q = P0 - P2;
  vec2 R = P1 - P0;
  vec2 S = R + P2 - P3;
  vec2 T = P0 - uv;

  float u;
  float t;

  if (Q.x == 0.0 && S.x == 0.0) {
    u = -T.x / R.x;
    t = (T.y + u * R.y) / (Q.y + u * S.y);
  } else if (Q.y == 0.0 && S.y == 0.0) {
    u = -T.y / R.y;
    t = (T.x + u * R.x) / (Q.x + u * S.x);
  } else {
    float A = S.x * R.y - R.x * S.y;
    float B = S.x * T.y - T.x * S.y + Q.x * R.y - R.x * Q.y;
    float C = Q.x * T.y - T.x * Q.y;
    if (abs(A) < 0.0001) {
      u = -C / B;
    } else {
      u = (-B + sqrt(B * B - 4.0 * A * C)) / (2.0 * A);
    }
    t = (T.y + u * R.y) / (Q.y + u * S.y);
  }

  u = clamp(u, 0.0, 1.0);
  t = clamp(t, 0.0, 1.0);
  t = smoothstep(0.0, 1.0, t);
  u = smoothstep(0.0, 1.0, u);

  vec4 colorA = mix(color0, color1, u);
  vec4 colorB = mix(color2, color3, u);
  return mix(colorA, colorB, t);
}

void main() {
  if (warp > 0) {
    vec2 p = texco * 2.0 - 1.0;
    vec2 q = vec2(0.0, 0.0);
    for (int i = 0; i < MAX_POINTS; i++) {
      if (i >= npoints) continue;
      vec2 points_i = points[i];
      float s2_i = s2[i];
      vec2 w_i = w[i];
      vec2 delta = p - points_i;
      float distsq = dot(delta, delta);
      float H_i = sqrt(distsq + s2_i);
      q += H_i * w_i;
    }
    gl_FragColor = grad((q + 1.0) / 2.0);
  } else {
    gl_FragColor = grad(texco);
  }
}
`;

const INITIAL_DOTS: [number, number][] = [
  [-1, -1],
  [-1, 1],
  [0.3, -0.4],
  [1, 1],
];

const MOUSE_POINT_INDEX = 2;
const DEFAULT_MOUSE_POINT = INITIAL_DOTS[MOUSE_POINT_INDEX];

function isPointerOverBounds(
  clientX: number,
  clientY: number,
  bounds: { left: number; top: number; right: number; bottom: number },
) {
  return (
    clientX >= bounds.left &&
    clientX <= bounds.right &&
    clientY >= bounds.top &&
    clientY <= bounds.bottom
  );
}

function clientToNormalizedPoint(
  clientX: number,
  clientY: number,
  bounds: { left: number; top: number; right: number; bottom: number },
): [number, number] | null {
  const width = bounds.right - bounds.left;
  const height = bounds.bottom - bounds.top;
  if (!width || !height) return null;

  const x = ((clientX - bounds.left) / width) * 2 - 1;
  const y = ((bounds.bottom - clientY) / height) * 2 - 1;
  return [
    Math.max(-1, Math.min(1, x)),
    Math.max(-1, Math.min(1, y)),
  ];
}

function flattenMatrix(matrix: number[][]): number[] {
  const out: number[] = [];
  for (const row of matrix) {
    for (const value of row) {
      out.push(value);
    }
  }
  return out;
}

function distanceSquared(
  src: [number, number][],
  dst: [number, number][],
  symmetric: boolean,
): number[][] {
  if (symmetric) {
    const dot: number[][] = [];
    for (let i = 0; i < src.length; i++) {
      const row: number[] = [];
      for (let j = 0; j < src.length; j++) {
        row.push(src[i][0] * src[j][0] + src[i][1] * src[j][1]);
      }
      dot.push(row);
    }
    const out: number[][] = [];
    for (let i = 0; i < src.length; i++) {
      const row: number[] = [];
      for (let j = 0; j < src.length; j++) {
        row.push(dot[i][i] + dot[j][j] - 2 * dot[i][j]);
      }
      out.push(row);
    }
    return out;
  }

  const dot: number[][] = [];
  for (let i = 0; i < src.length; i++) {
    const row: number[] = [];
    for (let j = 0; j < dst.length; j++) {
      row.push(src[i][0] * dst[j][0] + src[i][1] * dst[j][1]);
    }
    dot.push(row);
  }

  const a: number[] = src.map(([x, y]) => x * x + y * y);
  const b: number[] = dst.map(([x, y]) => x * x + y * y);
  const out: number[][] = [];
  for (let i = 0; i < src.length; i++) {
    const row: number[] = [];
    for (let j = 0; j < dst.length; j++) {
      row.push(a[i] + b[j] - 2 * dot[i][j]);
    }
    out.push(row);
  }
  return out;
}

function solveLinear(A: number[][], b: number[][]): number[][] {
  const n = A.length;
  const m = A[0].length;
  const k = b[0].length;
  const matrix = A.map((row) => row.slice());
  const rhs = b.map((row) => row.slice());

  for (let col = 0; col < m - 1; col++) {
    let pivot = col;
    let max = Math.abs(matrix[col][col]);
    for (let row = col + 1; row < n; row++) {
      const value = Math.abs(matrix[row][col]);
      if (value > max) {
        max = value;
        pivot = row;
      }
    }

    if (pivot !== col) {
      [matrix[col], matrix[pivot]] = [matrix[pivot], matrix[col]];
      [rhs[col], rhs[pivot]] = [rhs[pivot], rhs[col]];
    }

    for (let row = col + 1; row < n; row++) {
      const factorA = matrix[col][col];
      const factorB = matrix[row][col];
      for (let j = col; j < m; j++) {
        matrix[row][j] = factorA * matrix[row][j] - factorB * matrix[col][j];
      }
      for (let j = 0; j < k; j++) {
        rhs[row][j] = factorA * rhs[row][j] - factorB * rhs[col][j];
      }
    }
  }

  for (let row = n - 1; row >= 0; row--) {
    for (let col = n - 1; col > row; col--) {
      const factor = matrix[row][col];
      matrix[row][col] = 0;
      for (let j = 0; j < k; j++) {
        rhs[row][j] -= factor * rhs[col][j];
      }
    }
    for (let j = 0; j < k; j++) {
      rhs[row][j] /= matrix[row][row];
    }
    matrix[row][row] = 1;
  }

  return rhs;
}

class MeshWarp {
  src: [number, number][] = [];
  dst: [number, number][] = [];
  s2: number[] = [];
  w: [number, number][] = [];

  constructor(dots: [number, number][]) {
    for (const [x, y] of dots) {
      this.src.push([x, y]);
      this.dst.push([x, y]);
    }
    this.update();
  }

  private rbf(
    points: [number, number][],
    anchors: [number, number][],
    symmetric: boolean,
  ): number[][] {
    const distances = distanceSquared(points, anchors, symmetric);
    if (symmetric) {
      let max = distances[0][0];
      for (const row of distances) {
        for (const value of row) {
          if (value > max) max = value;
        }
      }
      this.s2 = distances[0].map((_, index) => {
        let min = max;
        for (const row of distances) {
          min = Math.min(min, row[index]);
        }
        return min;
      });
    }

    return distances.map((row) =>
      row.map((value, index) => Math.sqrt(value + this.s2[index])),
    );
  }

  update() {
    if (this.src.length < 4) return;
    const weights = solveLinear(
      this.rbf(this.src, this.src, true),
      this.dst.map(([x, y]) => [x, y]),
    );
    this.w = weights.map(([x, y]) => [x, y]);
  }
}

function createShader(
  gl: WebGLRenderingContext,
  type: number,
  source: string,
): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function createProgram(
  gl: WebGLRenderingContext,
  vsSource: string,
  fsSource: string,
): WebGLProgram | null {
  const vs = createShader(gl, gl.VERTEX_SHADER, vsSource);
  const fs = createShader(gl, gl.FRAGMENT_SHADER, fsSource);
  if (!vs || !fs) return null;

  const program = gl.createProgram();
  if (!program) return null;

  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error(gl.getProgramInfoLog(program));
    return null;
  }

  gl.deleteShader(vs);
  gl.deleteShader(fs);
  return program;
}

type MeshCanvasProps = {
  className?: string;
  interactive?: boolean;
};

export function MeshCanvas({
  className,
  interactive = true,
}: MeshCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseTargetRef = useRef<[number, number]>([...DEFAULT_MOUSE_POINT]);
  const boundsRef = useRef({ left: 0, top: 0, right: 0, bottom: 0 });
  const isVisibleRef = useRef(true);
  const lastPointerRef = useRef({ x: -1, y: -1 });
  const needsDrawRef = useRef(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", {
      antialias: false,
      alpha: false,
      preserveDrawingBuffer: true,
    });
    if (!gl) return;

    const program = createProgram(gl, VERTEX_SHADER, FRAGMENT_SHADER);
    if (!program) return;

    const warp = new MeshWarp(INITIAL_DOTS);

    const positions = new Float32Array([-1, -1, 1, -1, 1, 1, -1, 1]);
    const texCoords = new Float32Array([0, 0, 1, 0, 1, 1, 0, 1]);
    const indices = new Uint16Array([0, 1, 2, 2, 3, 0]);

    const posBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    const posLoc = gl.getAttribLocation(program, "a_Position");
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    const texBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, texBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, texCoords, gl.STATIC_DRAW);

    const texLoc = gl.getAttribLocation(program, "a_TexCoord");
    gl.enableVertexAttribArray(texLoc);
    gl.vertexAttribPointer(texLoc, 2, gl.FLOAT, false, 0, 0);

    const indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

    const uniforms = {
      color1: gl.getUniformLocation(program, "u_color1"),
      color2: gl.getUniformLocation(program, "u_color2"),
      color3: gl.getUniformLocation(program, "u_color3"),
      color4: gl.getUniformLocation(program, "u_color4"),
      warp: gl.getUniformLocation(program, "warp"),
      npoints: gl.getUniformLocation(program, "npoints"),
      points: gl.getUniformLocation(program, "points"),
      s2: gl.getUniformLocation(program, "s2"),
      w: gl.getUniformLocation(program, "w"),
    };

    let animationId = 0;

    const updateBounds = () => {
      const rect = canvas.getBoundingClientRect();
      boundsRef.current = {
        left: rect.left,
        top: rect.top,
        right: rect.right,
        bottom: rect.bottom,
      };
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
      needsDrawRef.current = true;
    };

    const onMove = (event: PointerEvent) => {
      if (!interactive) return;

      lastPointerRef.current = { x: event.clientX, y: event.clientY };
      if (!isVisibleRef.current) return;

      const bounds = boundsRef.current;
      if (!isPointerOverBounds(event.clientX, event.clientY, bounds)) return;

      const point = clientToNormalizedPoint(
        event.clientX,
        event.clientY,
        bounds,
      );
      if (point) mouseTargetRef.current = point;
    };

    const resetMouseTarget = () => {
      mouseTargetRef.current = [...DEFAULT_MOUSE_POINT];
      needsDrawRef.current = true;
    };

    const syncPointerIfOverCanvas = (event: PointerEvent) => {
      if (!interactive) return;

      updateBounds();
      if (!isVisibleRef.current) return;

      const bounds = boundsRef.current;
      if (!isPointerOverBounds(event.clientX, event.clientY, bounds)) return;

      const point = clientToNormalizedPoint(
        event.clientX,
        event.clientY,
        bounds,
      );
      if (point) mouseTargetRef.current = point;
    };

    const updateMovingPoint = () => {
      if (!interactive) return;

      const [targetX, targetY] = mouseTargetRef.current;
      const [currentX, currentY] = warp.src[MOUSE_POINT_INDEX];
      const deltaX = (targetX - currentX) / 80;
      const deltaY = (targetY - currentY) / 80;
      const magnitude = Math.abs(deltaX) + Math.abs(deltaY);

      if (Number.isFinite(magnitude) && magnitude > 0.001) {
        warp.src[MOUSE_POINT_INDEX][0] += deltaX;
        warp.src[MOUSE_POINT_INDEX][1] += deltaY;
        warp.update();
        needsDrawRef.current = true;
      }
    };

    const draw = () => {
      if (!needsDrawRef.current) return;
      needsDrawRef.current = false;

      gl.useProgram(program);

      gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
      gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

      gl.bindBuffer(gl.ARRAY_BUFFER, texBuffer);
      gl.vertexAttribPointer(texLoc, 2, gl.FLOAT, false, 0, 0);

      const colors = MESH_PALETTE_LUXURY;
      gl.uniform1i(uniforms.color1, colors.bl);
      gl.uniform1i(uniforms.color2, colors.br);
      gl.uniform1i(uniforms.color3, colors.tl);
      gl.uniform1i(uniforms.color4, colors.tr);
      gl.uniform1i(uniforms.warp, interactive ? 1 : 0);
      gl.uniform1i(uniforms.npoints, warp.src.length);
      gl.uniform2fv(uniforms.points, flattenMatrix(warp.src));
      gl.uniform1fv(uniforms.s2, warp.s2);
      gl.uniform2fv(uniforms.w, flattenMatrix(warp.w));

      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
      gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);
    };

    const tick = () => {
      updateMovingPoint();
      draw();
      animationId = requestAnimationFrame(tick);
    };

    updateBounds();
    draw();

    if (interactive) {
      window.addEventListener("pointermove", onMove);
      canvas.addEventListener("pointerenter", syncPointerIfOverCanvas);
    }

    window.addEventListener("scroll", updateBounds, { passive: true });
    window.addEventListener("resize", updateBounds);

    const resizeObserver = new ResizeObserver(updateBounds);
    resizeObserver.observe(canvas);

    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
        updateBounds();

        if (!entry.isIntersecting) {
          resetMouseTarget();
          return;
        }

        const { x, y } = lastPointerRef.current;
        if (interactive && x >= 0 && y >= 0) {
          syncPointerIfOverCanvas(
            new PointerEvent("pointermove", { clientX: x, clientY: y }),
          );
        }
      },
      { threshold: 0 },
    );
    visibilityObserver.observe(canvas);

    animationId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", updateBounds);
      window.removeEventListener("resize", updateBounds);
      canvas.removeEventListener("pointerenter", syncPointerIfOverCanvas);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      gl.deleteProgram(program);
    };
  }, [interactive]);

  return (
    <canvas
      ref={canvasRef}
      className={["mesh-canvas", className].filter(Boolean).join(" ")}
      aria-hidden
      style={{ width: "100%", height: "100%" }}
    />
  );
}
