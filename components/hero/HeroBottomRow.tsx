import { AlarmIcon } from "./AlarmIcon";

export function HeroBottomRow() {
  return (
    <div className="flex w-full flex-col items-start gap-10 min-[810px]:flex-row min-[810px]:items-end min-[810px]:justify-between min-[810px]:gap-0">
      <div
        className="hero-fade-up-desktop w-full max-w-[620px] flex-1 [text-wrap:balance]"
        style={{ animationDelay: "0.4s" }}
      >
        <p className="m-0 font-[family-name:var(--font-inter)] text-base font-normal leading-[1.4] tracking-[-0.32px] text-token-muted">
          <span className="text-ta-gold">
            Connecting the Middle East with global investment opportunities
          </span>{" "}
          through tailored strategies and unparalleled service.
        </p>
      </div>

      <div
        className="hero-fade-up-desktop flex w-full max-w-[240px] flex-1 items-start gap-1 min-[810px]:max-w-[240px]"
        style={{ animationDelay: "0.6s" }}
      >
        <div className="flex size-4 shrink-0 items-center justify-center overflow-clip">
          <AlarmIcon />
        </div>
        <p className="m-0 font-[family-name:var(--font-inter)] text-base font-normal leading-[1.4] tracking-[-0.32px] text-token-muted">
          <span className="text-ta-gold">Cross-Border.</span> Six jurisdictions,
          one operating standard.
        </p>
      </div>
    </div>
  );
}
