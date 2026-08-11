import Image from "next/image";
import type { StatData } from "./constants";

type StatCardProps = {
  stat: StatData;
};

function formatStatValue(value: number, stat: StatData): string {
  const rounded = Math.round(value);
  if (stat.prefix === "$") {
    return `$${rounded}${stat.suffix}`;
  }
  if (stat.suffix === "%") {
    return `${rounded}%`;
  }
  return `${rounded}${stat.suffix}`;
}

export function StatCard({ stat }: StatCardProps) {
  const display = stat.display ?? formatStatValue(stat.end, stat);

  return (
    <div
      className="numbers-stat-card relative flex h-[240px] flex-col items-start justify-end gap-2.5 overflow-hidden rounded-lg border border-[color:var(--token-btn-border)] bg-token-surface p-6 opacity-0"
      data-stat-end={stat.display ? undefined : stat.end}
      data-stat-display={stat.display}
      data-stat-prefix={stat.prefix}
      data-stat-suffix={stat.suffix}
    >
      <div className="numbers-stat-media" aria-hidden>
        <Image
          src={stat.image}
          alt=""
          fill
          sizes="(min-width: 810px) 50vw, 100vw"
          className="numbers-stat-image"
        />
        <div className="numbers-stat-media-overlay" />
      </div>

      <div className="numbers-stat-scrim" aria-hidden />

      <div className="numbers-stat-content relative z-[2] flex w-full flex-col gap-1.5">
        <div className="relative w-fit">
          <p
            className="numbers-counter-placeholder m-0 select-none text-left font-[family-name:var(--font-geist-mono)] text-[40px] font-light leading-[1.05] tracking-[-0.03em] text-transparent [font-feature-settings:'tnum','zero']"
            aria-hidden
          >
            {display}
          </p>
          <p className="numbers-counter-value absolute inset-0 m-0 text-left font-[family-name:var(--font-geist-mono)] text-[40px] font-light leading-[1.05] tracking-[-0.03em] text-white [font-feature-settings:'tnum','zero']">
            {stat.display ?? `${stat.prefix}0${stat.suffix}`}
          </p>
        </div>
        <p className="m-0 w-full max-w-[28ch] font-[family-name:var(--font-inter)] text-[0.9375rem] leading-[1.35] tracking-[-0.01em] text-token-muted">
          {stat.label}
        </p>
      </div>
    </div>
  );
}
