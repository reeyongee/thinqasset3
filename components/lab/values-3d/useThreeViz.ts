"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { COLORS } from "./constants";
import { createBrandEnvMap } from "./materials";
import type { CreateViz } from "./types";

type Options = {
  create: CreateViz;
  className?: string;
};

export function useThreeViz({ create, className }: Options) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(COLORS.bg, 0.026);

    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0, 0.55, 8.2);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
      powerPreference: "high-performance",
    });
    renderer.setClearColor(COLORS.bg, 1);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.domElement.style.display = "block";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    host.appendChild(renderer.domElement);

    const envMap = createBrandEnvMap(renderer);
    scene.environment = envMap;

    // Brand light rig: cool key, gold fill, soft rim — no shadows
    const hemi = new THREE.HemisphereLight(COLORS.greyLight, COLORS.navy, 0.62);
    const key = new THREE.DirectionalLight(0xfff8f0, 1.15);
    key.position.set(3.8, 5.5, 4.2);
    const goldFill = new THREE.DirectionalLight(COLORS.goldHover, 0.55);
    goldFill.position.set(-4.5, 1.5, 2.5);
    const rim = new THREE.DirectionalLight(COLORS.greyLight, 0.4);
    rim.position.set(-1, -2.5, -4);
    scene.add(hemi, key, goldFill, rim);

    const viz = create({ scene, camera, renderer, envMap });

    let raf = 0;
    let running = true;
    let start = performance.now();
    const clock = { elapsed: 0 };

    const resize = () => {
      const w = host.clientWidth || 1;
      const h = host.clientHeight || 1;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(host);

    const io = new IntersectionObserver(
      ([entry]) => {
        running = entry.isIntersecting;
        if (running) {
          start = performance.now() - clock.elapsed * 1000;
          raf = requestAnimationFrame(tick);
        }
      },
      { threshold: 0.05 },
    );
    io.observe(host);

    const onVisibility = () => {
      if (document.hidden) {
        running = false;
      } else if (host.getBoundingClientRect().height > 0) {
        running = true;
        start = performance.now() - clock.elapsed * 1000;
        raf = requestAnimationFrame(tick);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    const tick = (now: number) => {
      if (!running) return;
      clock.elapsed = (now - start) / 1000;
      viz.update(clock.elapsed);
      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      document.removeEventListener("visibilitychange", onVisibility);
      io.disconnect();
      ro.disconnect();
      viz.dispose();
      envMap.dispose();
      renderer.dispose();
      if (renderer.domElement.parentElement === host) {
        host.removeChild(renderer.domElement);
      }
      scene.clear();
    };
  }, [create]);

  return { hostRef, className };
}
