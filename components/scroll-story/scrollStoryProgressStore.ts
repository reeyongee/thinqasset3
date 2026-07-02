import { GRAPH_PHASE_START } from "./constants";

type Listener = () => void;

type ScrollStoryProgressState = {
  progress: number;
  pinActive: boolean;
};

const state: ScrollStoryProgressState = {
  progress: 0,
  pinActive: false,
};

const listeners = new Set<Listener>();

function isHeroIntro({ progress, pinActive }: ScrollStoryProgressState) {
  return pinActive && progress < GRAPH_PHASE_START;
}

function emit() {
  for (const listener of listeners) {
    listener();
  }
}

export const scrollStoryProgressStore = {
  getSnapshot(): ScrollStoryProgressState {
    return state;
  },

  isHeroIntro() {
    return isHeroIntro(state);
  },

  subscribe(listener: Listener) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },

  setProgress(progress: number, pinActive: boolean) {
    const wasHeroIntro = isHeroIntro(state);
    state.progress = progress;
    state.pinActive = pinActive;
    if (wasHeroIntro !== isHeroIntro(state)) {
      emit();
    }
  },

  reset() {
    state.progress = 0;
    state.pinActive = false;
    emit();
  },
};
