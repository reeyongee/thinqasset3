"use client";

import Image from "next/image";
import { useId, useState } from "react";
import { TransitionLink } from "@/components/transition/TransitionLink";
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
            aria-labelledby={titleId}
          >
            <TransitionLink
              href={column.href}
              className="services-column__hit"
              aria-label={`Explore ${column.title}`}
              onMouseEnter={() => setActiveId(column.id)}
              onFocus={() => setActiveId(column.id)}
            />
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

            <span
              className="services-column__cta glow-button glow-button--gold glow-button--sm"
              data-visible={expanded}
              aria-hidden={!expanded}
            >
              <span className="glow-button__label">Explore pillar</span>
            </span>
          </article>
        );
      })}
    </div>
  );
}
