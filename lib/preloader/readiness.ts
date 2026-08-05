import { HERO_BG_POSTER } from "@/components/hero/constants";
import { PRELOADER_MAX_MS, PRELOADER_MIN_MS } from "./constants";

function waitForNextFrame(count = 1): Promise<void> {
  return new Promise((resolve) => {
    let remaining = count;
    const tick = () => {
      remaining -= 1;
      if (remaining <= 0) resolve();
      else requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });
}

function loadImage(src: string): Promise<void> {
  return new Promise((resolve) => {
    const img = new window.Image();
    const finish = () => resolve();
    img.onload = finish;
    img.onerror = finish;
    img.src = src;
    if (img.complete) finish();
  });
}

async function waitForCriticalAssets(): Promise<void> {
  const tasks: Promise<void>[] = [loadImage(HERO_BG_POSTER)];

  if (document.fonts?.ready) {
    tasks.push(document.fonts.ready.then(() => undefined));
  }

  await Promise.all(tasks);
  await waitForNextFrame(2);
}

function waitMs(ms: number): Promise<void> {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

export type PreloaderReadyOptions = {
  /** Called with smoothed 0–1 progress while waiting. */
  onProgress?: (progress: number) => void;
  minMs?: number;
  maxMs?: number;
};

/**
 * Hybrid readiness: fonts + hero poster (+ 2 rAF), held to a min brand beat,
 * hard-capped so the preloader never hangs. Progress eases toward 1.
 */
export function waitForPreloaderReady(
  options: PreloaderReadyOptions = {},
): Promise<void> {
  const minMs = options.minMs ?? PRELOADER_MIN_MS;
  const maxMs = options.maxMs ?? PRELOADER_MAX_MS;
  const onProgress = options.onProgress;
  const started = performance.now();

  return new Promise((resolve) => {
    let settled = false;
    let assetsDone = false;
    let rafId = 0;

    const finish = () => {
      if (settled) return;
      settled = true;
      if (rafId) cancelAnimationFrame(rafId);
      onProgress?.(1);
      resolve();
    };

    const tickProgress = () => {
      if (settled) return;
      const elapsed = performance.now() - started;
      const timePortion = Math.min(1, elapsed / minMs);
      // Hold visual progress under 1 until assets land, then ease to full.
      const assetPortion = assetsDone ? 1 : Math.min(0.86, timePortion * 0.9);
      const progress = Math.min(1, Math.max(timePortion * 0.55, assetPortion));
      onProgress?.(progress);
      rafId = requestAnimationFrame(tickProgress);
    };

    rafId = requestAnimationFrame(tickProgress);

    void Promise.race([
      Promise.all([waitForCriticalAssets(), waitMs(minMs)]),
      waitMs(maxMs),
    ]).then(() => {
      assetsDone = true;
      // One more frame so progress can hit 1 before exit.
      requestAnimationFrame(() => {
        finish();
      });
    });
  });
}
