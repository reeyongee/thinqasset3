"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const BRAND = {
  navyDeep: new THREE.Color("#161c24"),
  navyMid: new THREE.Color("#343d4a"),
  gold: new THREE.Color("#b6a082"),
  goldHover: new THREE.Color("#c9b896"),
} as const;

type GLSLHillsProps = {
  width?: string;
  height?: string;
  cameraZ?: number;
  planeSize?: number;
  speed?: number;
};

const GLSLHills = ({
  width = "100vw",
  height = "100vh",
  cameraZ = 125,
  planeSize = 256,
  speed = 0.5,
}: GLSLHillsProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    class Plane {
      uniforms = {
        time: { value: 0 },
        uNavyDeep: { value: BRAND.navyDeep.clone() },
        uNavyMid: { value: BRAND.navyMid.clone() },
        uGold: { value: BRAND.gold.clone() },
        uGoldHover: { value: BRAND.goldHover.clone() },
      };

      time = speed;

      mesh = this.createMesh();

      createMesh() {
        return new THREE.Mesh(
          new THREE.PlaneGeometry(planeSize, planeSize, planeSize, planeSize),
          new THREE.RawShaderMaterial({
            uniforms: this.uniforms,
            vertexShader: `
              #define GLSLIFY 1
              attribute vec3 position;
              uniform mat4 projectionMatrix;
              uniform mat4 modelViewMatrix;
              uniform float time;
              varying vec3 vPosition;

              mat4 rotateMatrixX(float radian) {
                return mat4(
                  1.0, 0.0, 0.0, 0.0,
                  0.0, cos(radian), -sin(radian), 0.0,
                  0.0, sin(radian), cos(radian), 0.0,
                  0.0, 0.0, 0.0, 1.0
                );
              }

              vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
              vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
              vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
              vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
              vec3 fade(vec3 t) { return t*t*t*(t*(t*6.0-15.0)+10.0); }

              float cnoise(vec3 P) {
                vec3 Pi0 = floor(P);
                vec3 Pi1 = Pi0 + vec3(1.0);
                Pi0 = mod289(Pi0);
                Pi1 = mod289(Pi1);
                vec3 Pf0 = fract(P);
                vec3 Pf1 = Pf0 - vec3(1.0);
                vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
                vec4 iy = vec4(Pi0.yy, Pi1.yy);
                vec4 iz0 = Pi0.zzzz;
                vec4 iz1 = Pi1.zzzz;

                vec4 ixy = permute(permute(ix) + iy);
                vec4 ixy0 = permute(ixy + iz0);
                vec4 ixy1 = permute(ixy + iz1);

                vec4 gx0 = ixy0 * (1.0 / 7.0);
                vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;
                gx0 = fract(gx0);
                vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
                vec4 sz0 = step(gz0, vec4(0.0));
                gx0 -= sz0 * (step(0.0, gx0) - 0.5);
                gy0 -= sz0 * (step(0.0, gy0) - 0.5);

                vec4 gx1 = ixy1 * (1.0 / 7.0);
                vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;
                gx1 = fract(gx1);
                vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
                vec4 sz1 = step(gz1, vec4(0.0));
                gx1 -= sz1 * (step(0.0, gx1) - 0.5);
                gy1 -= sz1 * (step(0.0, gy1) - 0.5);

                vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
                vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
                vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
                vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
                vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
                vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
                vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
                vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);

                vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
                g000 *= norm0.x;
                g010 *= norm0.y;
                g100 *= norm0.z;
                g110 *= norm0.w;
                vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
                g001 *= norm1.x;
                g011 *= norm1.y;
                g101 *= norm1.z;
                g111 *= norm1.w;

                float n000 = dot(g000, Pf0);
                float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
                float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
                float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
                float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
                float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
                float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
                float n111 = dot(g111, Pf1);

                vec3 fade_xyz = fade(Pf0);
                vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
                vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
                float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x);
                return 2.2 * n_xyz;
              }

              void main(void) {
                vec3 updatePosition = (rotateMatrixX(radians(90.0)) * vec4(position, 1.0)).xyz;
                float sin1 = sin(radians(updatePosition.x / 128.0 * 90.0));
                vec3 noisePosition = updatePosition + vec3(0.0, 0.0, time * -30.0);
                float noise1 = cnoise(noisePosition * 0.08);
                float noise2 = cnoise(noisePosition * 0.06);
                float noise3 = cnoise(noisePosition * 0.4);
                vec3 lastPosition = updatePosition + vec3(0.0,
                  noise1 * sin1 * 8.0
                  + noise2 * sin1 * 8.0
                  + noise3 * (abs(sin1) * 2.0 + 0.5)
                  + pow(sin1, 2.0) * 40.0, 0.0);

                vPosition = lastPosition;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(lastPosition, 1.0);
              }
            `,
            fragmentShader: `
              precision highp float;
              #define GLSLIFY 1
              varying vec3 vPosition;

              uniform float time;
              uniform vec3 uNavyDeep;
              uniform vec3 uNavyMid;
              uniform vec3 uGold;
              uniform vec3 uGoldHover;

              float hash(vec2 p) {
                return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
              }

              float goldSpeckle(vec3 p) {
                vec3 q = p * vec3(0.18, 0.07, 0.18);
                float n1 = hash(q.xz + q.y);
                float n2 = hash(q.xz * 2.6 + q.y * 1.4 + 17.0);
                float n3 = hash(q.xz * 5.3 - q.y * 0.8 + 41.0);
                float grain = n1 * 0.5 + n2 * 0.32 + n3 * 0.18;
                return smoothstep(0.48, 0.78, grain);
              }

              float navyPatch(vec3 p) {
                vec3 q = p * vec3(0.11, 0.04, 0.1) + vec3(71.0, 19.0, 37.0);
                float n1 = hash(q.xz + q.y * 0.6);
                float n2 = hash(q.xz * 2.8 - q.y * 0.45 + 91.0);
                float grain = n1 * 0.58 + n2 * 0.42;
                return smoothstep(0.86, 0.97, grain);
              }

              void main(void) {
                float dist = length(vPosition);
                float opacity = (96.0 - dist) / 256.0 * 0.68;

                float heightT = clamp(vPosition.y / 48.0, 0.0, 1.0);
                float distFade = smoothstep(32.0, 120.0, dist);
                float valleyT = 1.0 - smoothstep(0.04, 0.72, heightT);

                vec3 shadowBase = mix(uNavyDeep, uGold, 0.34 + valleyT * 0.24);
                vec3 midBase = mix(uNavyMid, uGold, 0.22);
                vec3 baseColor = mix(shadowBase, midBase, smoothstep(0.0, 0.42, heightT));
                vec3 peakColor = mix(uGold, uGoldHover, smoothstep(0.45, 1.0, heightT));
                vec3 color = mix(baseColor, peakColor, smoothstep(0.18, 0.78, heightT));

                float ridge = sin(radians(vPosition.x / 128.0 * 90.0));
                float ridgeGlow = pow(max(ridge, 0.0), 1.5);
                color = mix(color, uGoldHover, ridgeGlow * (0.32 + heightT * 0.38));

                vec3 farColor = mix(uNavyDeep, uGold, 0.42);
                color = mix(color, farColor, distFade * 0.38);

                float shadowMask = max(valleyT, distFade * 0.95);
                vec3 specklePos = vPosition + vec3(0.0, time * -6.0, time * 4.0);
                float speckle = goldSpeckle(specklePos);
                float fineSpeckle = goldSpeckle(specklePos * 1.85 + vec3(13.0, 0.0, 7.0));
                float coarseVein = goldSpeckle(specklePos * 0.55 + vec3(0.0, time * 2.0, 0.0));
                float sparkle = max(max(speckle, fineSpeckle * 0.85), coarseVein * 0.7);
                sparkle *= 0.78 + 0.22 * sin(time * 1.6 + vPosition.x * 0.11 + vPosition.z * 0.07);
                vec3 goldDust = mix(uGold, uGoldHover, speckle);
                color = mix(color, goldDust, sparkle * shadowMask);
                color += goldDust * sparkle * shadowMask * 0.42;

                float ambientGold = shadowMask * 0.38;
                color = mix(color, uGoldHover, ambientGold);

                vec3 navyPos = vPosition + vec3(time * 1.4, time * -2.8, time * 2.2);
                float navyBlot = navyPatch(navyPos);
                float navyPool = navyPatch(navyPos * 0.58 + vec3(5.0, 0.0, 9.0));
                float navyHit = max(navyBlot, navyPool * 0.88);
                float goldZone = 1.0 - distFade * 0.2;
                vec3 navyTint = mix(uNavyDeep, uNavyMid, hash(floor(navyPos.xz * 0.18)));
                color = mix(color, navyTint, navyHit * goldZone * 0.78);

                gl_FragColor = vec4(color, opacity);
              }
            `,
            transparent: true,
          }),
        );
      }

      render(delta: number) {
        this.uniforms.time.value += delta * this.time;
      }
    }

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: false });
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      1,
      10000,
    );
    const clock = new THREE.Clock();
    const plane = new Plane();
    let frameId = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    const render = () => {
      plane.render(clock.getDelta());
      renderer.render(scene, camera);
    };

    const renderLoop = () => {
      render();
      frameId = requestAnimationFrame(renderLoop);
    };

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    camera.position.set(0, 16, cameraZ);
    camera.lookAt(new THREE.Vector3(0, 28, 0));
    scene.add(plane.mesh);
    window.addEventListener("resize", resize);
    resize();
    renderLoop();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
      plane.mesh.geometry.dispose();
      (plane.mesh.material as THREE.Material).dispose();
      renderer.dispose();
    };
  }, [cameraZ, planeSize, speed]);

  return (
    <div ref={containerRef} style={{ position: "relative", width, height }}>
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          zIndex: 1,
        }}
      />
    </div>
  );
};

export { GLSLHills };
