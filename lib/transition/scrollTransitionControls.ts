import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function pauseScrollAnimations(): void {
  ScrollTrigger.getAll().forEach((st) => st.disable(false, false));
}

export function resumeScrollAnimations(): void {
  ScrollTrigger.getAll().forEach((st) => st.enable(false, false));
  ScrollTrigger.refresh();
}
