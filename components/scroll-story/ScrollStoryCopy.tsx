import { HeroBottomRow } from "@/components/hero/HeroBottomRow";
import { HeroButton } from "@/components/hero/HeroButton";
import { HeroHeadline } from "@/components/hero/HeroHeadline";
import { STORY_BEATS } from "./constants";

export function ScrollStoryCopy() {
  return (
    <div className="scroll-story-copy relative flex h-full min-h-0 w-full flex-col">
      <div className="scroll-story-hero-content flex min-h-0 flex-1 flex-col justify-between">
        <div className="scroll-story-hero flex flex-1 flex-col items-start justify-center gap-6 overflow-clip min-[810px]:gap-6 min-[1200px]:gap-10">
          <HeroHeadline />
          <HeroButton
            animate
            animationDelay="0.2s"
            className="w-full min-[810px]:w-auto"
          />
        </div>

        <HeroBottomRow />
      </div>

      <div className="scroll-story-beats pointer-events-none absolute inset-0 flex flex-col justify-center">
        {STORY_BEATS.map((beat, index) => (
          <article
            key={beat.title}
            className={`scroll-story-beat scroll-story-beat-${index} absolute inset-0 flex flex-col justify-center opacity-0`}
          >
            <h2 className="font-display m-0 mb-4 max-w-[640px] text-[32px] leading-[1.1] tracking-[-1.5px] text-white min-[810px]:text-[40px] min-[810px]:tracking-[-2px] min-[1200px]:text-[48px] min-[1200px]:tracking-[-2.5px]">
              {beat.title}
            </h2>
            <p className="m-0 max-w-[480px] font-[family-name:var(--font-inter)] text-base font-normal leading-[1.4] tracking-[-0.32px] text-token-muted">
              {beat.body}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
