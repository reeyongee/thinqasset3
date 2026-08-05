"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { usePathname } from "next/navigation";
import { ThinqAssetLogoMark } from "@/components/brand/ThinqAssetLogoMark";
import { usePrefersReducedMotion } from "@/components/progressive-blur/usePrefersReducedMotion";
import { THINQASSET_LOGO_MARK_ORIGIN } from "@/lib/brand-assets";
import { PRELOADER_EXIT_MS } from "@/lib/preloader/constants";
import {
  completePreloaderAndArmIntro,
  markPreloaderPending,
  shouldRunSitePreloader,
  skipPreloaderGate,
  syncPreloaderFromSession,
} from "@/lib/preloader/preloaderControl";
import { waitForPreloaderReady } from "@/lib/preloader/readiness";
import "./site-preloader.css";

/**
 * Home cold-load branded overlay. Runs once per session, then arms the
 * existing CSS hero intro via `data-intro-ready`.
 */
export function SitePreloader() {
  const pathname = usePathname();
  const prefersReducedMotion = usePrefersReducedMotion();
  const [visible, setVisible] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const clusterRef = useRef<HTMLDivElement>(null);
  const markRef = useRef<HTMLDivElement>(null);
  const pulseRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    syncPreloaderFromSession();

    if (!shouldRunSitePreloader(pathname)) {
      skipPreloaderGate();
      setVisible(false);
      return;
    }

    markPreloaderPending();
    setVisible(true);
  }, [pathname]);

  useEffect(() => {
    if (!visible) return;

    const overlay = overlayRef.current;
    const cluster = clusterRef.current;
    const mark = markRef.current;
    const pulse = pulseRef.current;
    const fill = fillRef.current;
    if (!overlay || !cluster || !mark || !pulse || !fill) {
      completePreloaderAndArmIntro();
      setVisible(false);
      return;
    }

    const progressProxy = { value: 0 };
    let spinTween: gsap.core.Tween | null = null;
    let pulseTween: gsap.core.Tween | null = null;
    let progressTween: gsap.core.Tween | null = null;
    let exitTl: gsap.core.Timeline | null = null;
    let cancelled = false;

    const setProgress = (progress: number) => {
      if (cancelled) return;
      progressTween?.kill();
      progressTween = gsap.to(progressProxy, {
        value: progress,
        duration: 0.35,
        ease: "power2.out",
        onUpdate: () => {
          if (cancelled) return;
          gsap.set(fill, { scaleX: progressProxy.value });
        },
      });
    };

    const finish = () => {
      if (cancelled) return;
      completePreloaderAndArmIntro();
      setVisible(false);
    };

    const spinOrigin = `${THINQASSET_LOGO_MARK_ORIGIN.xPercent}% ${THINQASSET_LOGO_MARK_ORIGIN.yPercent}%`;

    gsap.set(overlay, { clipPath: "inset(0% 0% 0% 0%)" });
    gsap.set(mark, { transformOrigin: spinOrigin });
    gsap.set(pulse, { transformOrigin: "50% 50%" });

    if (prefersReducedMotion) {
      gsap.set(fill, { scaleX: 1 });
      finish();
      return () => {
        cancelled = true;
      };
    }

    spinTween = gsap.to(mark, {
      rotation: 360,
      duration: 2.6,
      ease: "power1.inOut",
      repeat: -1,
      transformOrigin: spinOrigin,
    });

    pulseTween = gsap.to(pulse, {
      scale: 1.06,
      duration: 1.3,
      ease: "power1.inOut",
      yoyo: true,
      repeat: -1,
      transformOrigin: "50% 50%",
    });

    void waitForPreloaderReady({ onProgress: setProgress }).then(() => {
      if (cancelled) return;

      spinTween?.kill();
      pulseTween?.kill();
      progressTween?.kill();
      gsap.set(fill, { scaleX: 1 });

      exitTl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        onComplete: finish,
      });

      exitTl
        .to(
          cluster,
          {
            autoAlpha: 0,
            scale: 0.92,
            duration: (PRELOADER_EXIT_MS / 1000) * 0.55,
          },
          0,
        )
        .to(
          overlay,
          {
            clipPath: "inset(0% 0% 100% 0%)",
            duration: PRELOADER_EXIT_MS / 1000,
          },
          0.08,
        );
    });

    return () => {
      cancelled = true;
      spinTween?.kill();
      pulseTween?.kill();
      progressTween?.kill();
      exitTl?.kill();
    };
  }, [visible, prefersReducedMotion]);

  if (!visible) return null;

  return (
    <div
      ref={overlayRef}
      className="site-preloader"
      role="status"
      aria-busy="true"
      aria-live="polite"
      aria-label="Loading"
    >
      <div ref={clusterRef} className="site-preloader__cluster">
        <div className="site-preloader__mark">
          <div ref={pulseRef} className="site-preloader__mark-pulse">
            <div ref={markRef} className="site-preloader__mark-spin">
              <ThinqAssetLogoMark height={64} />
            </div>
          </div>
        </div>
        <div className="site-preloader__track" aria-hidden="true">
          <span ref={fillRef} className="site-preloader__fill" />
        </div>
      </div>
    </div>
  );
}
