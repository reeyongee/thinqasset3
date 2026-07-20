export type TransitionPhase = "idle" | "leaving" | "entering";

export type TransitionState = {
  phase: TransitionPhase;
  isNavigating: boolean;
  /** When true, hero CSS/GSAP intro must not run. */
  skipIntro: boolean;
  /** When true, scroll-story ScrollTriggers may initialise. */
  introComplete: boolean;
};

const INITIAL_STATE: TransitionState = {
  phase: "idle",
  isNavigating: false,
  skipIntro: false,
  introComplete: false,
};

let state: TransitionState = INITIAL_STATE;
const listeners = new Set<() => void>();

export function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getTransitionState(): TransitionState {
  return state;
}

export function getServerTransitionState(): TransitionState {
  return INITIAL_STATE;
}

export function patchTransitionState(patch: Partial<TransitionState>): void {
  state = { ...state, ...patch };
  listeners.forEach((listener) => listener());
}

export function signalIntroComplete(): void {
  if (state.introComplete) return;
  patchTransitionState({ introComplete: true });
}
