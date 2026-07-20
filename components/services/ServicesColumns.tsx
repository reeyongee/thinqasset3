"use client";

import Image from "next/image";
import { useId, useState } from "react";
import { TransitionLink } from "@/components/transition/TransitionLink";
import { GlowButton } from "@/components/ui/GlowButton";
import { SERVICE_COLUMNS, type ServiceColumn } from "./constants";

type ServicesColumnsProps = {
  columns?: readonly ServiceColumn[];
};

export function ServicesColumns({
  columns = SERVICE_COLUMNS,
}: ServicesColumnsProps) {
  const baseId = useId();
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <div
      className="services-columns"
      data-active={activeId ?? undefined}
      onMouseLeave={() => setActiveId(null)}
    >
      {columns.map((column) => {
        const expanded = activeId === column.id;
        const panelId = `${baseId}-${column.id}-panel`;
        const titleId = `${baseId}-${column.id}-title`;

        return (
          <article
            key={column.id}
            className="services-column"
            data-expanded={expanded}
            data-transition-item
            tabIndex={0}
            aria-expanded={expanded}
            aria-controls={panelId}
            onMouseEnter={() => setActiveId(column.id)}
            onFocus={() => setActiveId(column.id)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                setActiveId((current) =>
                  current === column.id ? null : column.id,
                );
              }
            }}
            onClick={(event) => {
              if (
                event.target instanceof Element &&
                event.target.closest("a")
              ) {
                return;
              }
              setActiveId((current) =>
                current === column.id ? null : column.id,
              );
            }}
          >
            <div className="services-column__media" aria-hidden="true">
              <div className="services-column__media-shift">
                <Image
                  className="services-column__image"
                  src={column.image.src}
                  alt=""
                  fill
                  sizes="(max-width: 809px) 100vw, 50vw"
                  priority={column.index === "01"}
                />
                <div className="services-column__media-wash" />
              </div>
              <div className="services-column__media-fade" />
            </div>

            <div className="services-column__content">
              <span className="services-column__index">{column.index}</span>
              <h2 id={titleId} className="services-column__title">
                {column.title}
              </h2>
              <p className="services-column__teaser">{column.teaser}</p>

              <div
                id={panelId}
                className="services-column__detail"
                role="region"
                aria-labelledby={titleId}
                aria-hidden={!expanded}
              >
                <div className="services-column__detail-inner">
                  <p className="services-column__blurb">{column.blurb}</p>
                  <ul className="services-column__points">
                    {column.offerings.slice(0, 3).map((offering) => (
                      <li key={offering.slug} className="services-column__point">
                        <TransitionLink
                          href={`/services/${offering.slug}`}
                          className="services-column__link"
                        >
                          {offering.title}
                        </TransitionLink>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <GlowButton
              href={column.href}
              className="services-column__cta"
              variant="gold"
              size="sm"
              data-visible={expanded}
              tabIndex={expanded ? 0 : -1}
              aria-hidden={!expanded}
            >
              Explore pillar
            </GlowButton>
          </article>
        );
      })}
    </div>
  );
}
