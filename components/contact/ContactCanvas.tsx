"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const VERTEX_SHADER = /* glsl */ `
uniform float uTime;
uniform float uSpeed;
uniform float uPositionFrequency;
uniform float uPositionHeight;

varying vec3 vPosition;
varying float vUpDot;

vec3 permute(vec3 x) { return mod(((x*44.0)+1.0)*x, 299.0); }

float simplexNoise2d(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
          -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 299.0);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m; m = m*m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

float getElevation(vec2 position) {
  vec2 warpedPosition = position;
  warpedPosition.y -= uTime * uSpeed;
  return simplexNoise2d(warpedPosition * uPositionFrequency - 2.0) * uPositionHeight;
}

void main() {
  float shift = 0.1;
  vec3 pos = position;
  vec3 positionA = pos + vec3(shift, 0.0, 0.0);
  vec3 positionB = pos + vec3(0.0, 0.0, -shift);

  float elevation = getElevation(pos.xz);
  pos.y += elevation;
  positionA.y += getElevation(positionA.xz);
  positionB.y += getElevation(positionB.xz);

  vec3 toA = normalize(positionA - pos);
  vec3 toB = normalize(positionB - pos);
  vec3 customNormal = normalize(cross(toA, toB));

  vPosition = pos;
  vPosition.xz += uTime * 0.2;
  vUpDot = dot(customNormal, vec3(0.0, 1.0, 0.0));

  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * mvPosition;
}
`;

const FRAGMENT_SHADER = /* glsl */ `
uniform vec3 uColorSurface;
varying float vUpDot;

void main() {
  vec3 color = uColorSurface * (0.65 + vUpDot * 0.35);
  gl_FragColor = vec4(color, 1.0);
}
`;

const PARTICLE_VERTEX = /* glsl */ `
uniform float uTime;
uniform float uPixelRatio;
uniform float uSize;
attribute float aScale;
varying float vFogDepth;

void main() {
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  vec4 mvPosition = modelViewMatrix * modelPosition;
  gl_Position = projectionMatrix * mvPosition;
  gl_PointSize = uSize * aScale * uPixelRatio;
  gl_PointSize *= (1.0 / -mvPosition.z);
  vFogDepth = -mvPosition.z;
}
`;

const PARTICLE_FRAGMENT = /* glsl */ `
uniform float uOpacity;
uniform float uFogNear;
uniform float uFogFar;
varying float vFogDepth;

void main() {
  float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
  float strength = 0.05 / distanceToCenter - 0.1;
  float fogFactor = smoothstep(uFogNear, uFogFar, vFogDepth);
  gl_FragColor = vec4(1.0, 1.0, 1.0, strength * uOpacity * (1.0 - fogFactor));
}
`;

type ContactCanvasProps = {
  onReady?: () => void;
};

export function ContactCanvas({ onReady }: ContactCanvasProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const onReadyRef = useRef(onReady);

  useEffect(() => {
    onReadyRef.current = onReady;
  }, [onReady]);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const canvas = document.createElement("canvas");
    host.appendChild(canvas);

    const config = {
      fogNear: 9,
      fogFar: 14,
      positionY: -0.1,
      backgroundColor: "#979797",
      colorSurface: "#555555",
      segmentsSurface: 264,
      starsSpeedZ: 0.0175,
      starsSpeedX: 0.01,
      mouseLerpSpeed: 14,
      mouserotationXAmount: 0.135,
      mouserotationYAmount: 0.615,
    };

    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
      pixelRatio: 0.5,
    };

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(sizes.pixelRatio);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.7;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(config.backgroundColor);
    scene.fog = new THREE.Fog(config.backgroundColor, config.fogNear, config.fogFar);

    const camera = new THREE.PerspectiveCamera(
      35,
      sizes.width / sizes.height,
      0.1,
      100,
    );
    camera.position.set(0, 7.25, 0);
    camera.rotation.set((-90 * Math.PI) / 180, 0, 0);

    const meshGroup = new THREE.Group();
    scene.add(meshGroup);

    const uniforms = {
      uTime: { value: 0 },
      uSpeed: { value: 1.313 },
      uPositionFrequency: { value: 0.176 },
      uPositionHeight: { value: 1.3 },
      uColorSurface: { value: new THREE.Color(config.colorSurface) },
    };

    const geometry = new THREE.PlaneGeometry(20, 30, config.segmentsSurface, config.segmentsSurface);
    geometry.deleteAttribute("uv");
    geometry.rotateX(-Math.PI * 0.5);

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: VERTEX_SHADER,
      fragmentShader: FRAGMENT_SHADER,
      fog: false,
    });

    const terrain = new THREE.Mesh(geometry, material);
    const scale = window.innerWidth > 768 ? window.innerWidth / 1920 : 0.75;
    terrain.scale.set(scale, scale, scale);
    terrain.position.y = config.positionY;
    meshGroup.add(terrain);

    const ambient = new THREE.AmbientLight("#ffffff", 5);
    scene.add(ambient);
    const directional = new THREE.DirectionalLight("#ffffff", 2);
    directional.position.set(1, 3, -7);
    meshGroup.add(directional);

    const particleCount = window.innerWidth > 1280 ? 150 : 100;
    const positions = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 4 + 1;
      positions[i * 3 + 2] = Math.random() * -20 + 4;
      scales[i] = Math.random() * 0.75 + 0.75;
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute("aScale", new THREE.BufferAttribute(scales, 1));

    const particleUniforms = {
      uTime: { value: 0 },
      uPixelRatio: { value: Math.min(window.devicePixelRatio, 1.5) },
      uSize: { value: 200 },
      uOpacity: { value: 1 },
      uFogNear: { value: config.fogNear },
      uFogFar: { value: config.fogFar },
    };

    const particleMat = new THREE.ShaderMaterial({
      uniforms: particleUniforms,
      vertexShader: PARTICLE_VERTEX,
      fragmentShader: PARTICLE_FRAGMENT,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    meshGroup.add(particles);

    let targetRotX = 0;
    let targetRotY = 0;
    let currentRotX = 0;
    let currentRotY = 0;
    let pointerX = 0;
    let pointerY = 0;

    const onPointerMove = (event: PointerEvent) => {
      pointerX = event.clientX / window.innerWidth - 0.5;
      pointerY = event.clientY / window.innerHeight - 0.5;
      targetRotY = pointerX * 2;
      targetRotX = pointerY * 2;
    };

    window.addEventListener("pointermove", onPointerMove);

    const clock = new THREE.Clock();
    let raf = 0;
    let disposed = false;

    const animate = () => {
      if (disposed) return;
      const elapsed = clock.getElapsedTime();
      uniforms.uTime.value += config.starsSpeedZ;
      particleUniforms.uTime.value = elapsed;

      const posAttr = particleGeo.attributes.position as THREE.BufferAttribute;
      const posArray = posAttr.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        posArray[i * 3] -= config.starsSpeedX;
        posArray[i * 3 + 2] += scales[i] * config.starsSpeedZ;
        if (posArray[i * 3] < -10) posArray[i * 3] = 10;
        if (posArray[i * 3 + 2] >= 5) posArray[i * 3 + 2] = -24;
      }
      posAttr.needsUpdate = true;

      currentRotX += (targetRotX - currentRotX) / config.mouseLerpSpeed;
      currentRotY += (targetRotY - currentRotY) / config.mouseLerpSpeed;
      meshGroup.rotation.set(
        currentRotX * config.mouserotationXAmount,
        currentRotY * config.mouserotationYAmount,
        0,
      );

      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };

    renderer.domElement.style.opacity = "0";
    let readyFired = false;
    requestAnimationFrame(() => {
      renderer.domElement.style.transition = "opacity 1s ease";
      renderer.domElement.style.opacity = "1";
      if (!readyFired) {
        readyFired = true;
        onReadyRef.current?.();
      }
    });

    animate();

    const onResize = () => {
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight;
      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();
      renderer.setSize(sizes.width, sizes.height);
      const nextScale = window.innerWidth > 768 ? window.innerWidth / 1920 : 0.75;
      terrain.scale.set(nextScale, nextScale, nextScale);
    };

    window.addEventListener("resize", onResize);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("resize", onResize);
      geometry.dispose();
      material.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();
      canvas.remove();
    };
  }, []);

  return <div ref={hostRef} className="contact-page__canvas" aria-hidden />;
}
