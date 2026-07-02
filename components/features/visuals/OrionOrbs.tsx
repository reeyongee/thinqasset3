import { SparklesIcon } from "../svgs/SourceIcons";

export function OrionOrbs() {
  return (
    <div className="feature-orion-visual relative flex h-full w-full items-center justify-center overflow-visible">
      <span
        className="feature-pulsing-orb absolute top-1/2 left-1/2"
        style={{ animationDelay: "0s" }}
        aria-hidden
      />
      <span
        className="feature-pulsing-orb absolute top-1/2 left-1/2"
        style={{ animationDelay: "-0.5s" }}
        aria-hidden
      />
      <span
        className="feature-pulsing-orb absolute top-1/2 left-1/2"
        style={{ animationDelay: "-1s" }}
        aria-hidden
      />
      <div className="absolute top-1/2 left-1/2 flex aspect-square min-h-[88px] min-w-[88px] -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-2 rounded-full border border-token-border bg-token-surface px-4 min-[810px]:min-h-[100px] min-[810px]:min-w-[100px]">
        <SparklesIcon className="h-6 w-6 shrink-0 text-ta-gold" />
        <p className="m-0 font-[family-name:var(--font-geist-mono)] text-base font-medium leading-6 tracking-[-0.02em] text-ta-gold">
          Structuring
        </p>
      </div>
    </div>
  );
}
