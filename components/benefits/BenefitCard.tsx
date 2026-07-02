"use client";

import Image from "next/image";
import type { BenefitData } from "./constants";
import { BenefitIcon } from "./BenefitIcons";

type BenefitCardProps = {
  benefit: BenefitData;
  isActive?: boolean;
  onActivate?: () => void;
};

export function BenefitCard({
  benefit,
  isActive = false,
  onActivate,
}: BenefitCardProps) {
  const label = `${benefit.title} ${benefit.description}`;

  return (
    <article
      className={[
        "benefit-card min-w-0 min-[810px]:flex-1",
        isActive ? "is-active" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      tabIndex={0}
      aria-label={label}
      onPointerUp={(event) => {
        if (event.pointerType !== "touch" || !onActivate) return;
        event.preventDefault();
        onActivate();
      }}
    >
      <div className="benefit-card-surface flex min-h-[213px] flex-col gap-8 rounded-lg border border-[color:var(--token-btn-border)] bg-token-surface p-6">
        <div className="benefit-card-media" aria-hidden>
          <Image
            src={benefit.image}
            alt=""
            fill
            sizes="(min-width: 810px) 33vw, 100vw"
            className="benefit-card-image"
          />
          <div className="benefit-card-media-overlay" />
        </div>

        <span className="benefit-card-accent" aria-hidden />

        <div className="benefit-card-icon-wrap">
          <BenefitIcon
            name={benefit.icon}
            className="benefit-card-icon shrink-0 text-white"
          />
        </div>

        <div className="benefit-card-copy flex flex-col gap-2">
          <p className="benefit-card-title m-0 font-[family-name:var(--font-inter)] text-base font-medium leading-6 text-white">
            {benefit.title}
          </p>
          <p className="benefit-card-desc m-0 font-[family-name:var(--font-inter)] text-base leading-6 text-token-muted">
            {benefit.description}
          </p>
        </div>
      </div>
    </article>
  );
}
