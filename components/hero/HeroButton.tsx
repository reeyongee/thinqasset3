import { CTA_HREF } from "./constants";

type HeroButtonProps = {
  className?: string;
  animate?: boolean;
  animationDelay?: string;
  label?: string;
};

export function HeroButton({
  className = "",
  animate = false,
  animationDelay = "0.2s",
  label = "Consultation",
}: HeroButtonProps) {
  return (
    <a
      href={CTA_HREF}
      className={[
        "hero-btn group relative inline-flex h-10 items-center justify-center gap-2 overflow-hidden rounded-[62px] px-4 no-underline",
        animate ? "hero-fade-up" : "",
        className,
      ].join(" ")}
      style={animate ? { animationDelay } : undefined}
    >
      <span className="hero-btn-border pointer-events-none absolute inset-0 rounded-[inherit] border-[1.5px] border-solid border-[color:var(--token-btn-border)]" />
      <span className="whitespace-pre font-[family-name:var(--font-inter)] text-base font-medium leading-6 tracking-[-0.32px] text-white">
        {label}
      </span>
    </a>
  );
}
