"use client";

import Image from "next/image";
import { useMemo, useRef } from "react";
import { OfferingIcon } from "./OfferingIcon";
import { ServiceDetailCta } from "./ServiceDetailCta";
import { useServiceDetailOfferingsAnimation } from "./useServiceDetailOfferingsAnimation";

export type ServiceOfferingItem = {
  name: string;
  description: string;
  image?: {
    src: string;
    alt: string;
  };
};

export type ServiceDetailOfferingsProps = {
  headline: string;
  items: readonly ServiceOfferingItem[];
  ctaHref?: string;
  ctaLabel?: string;
  imageHoldItems?: number;
};

type OfferingImageLayer = {
  src: string;
  alt: string;
};

function buildOfferingImageLayers(items: readonly ServiceOfferingItem[]) {
  const layers: OfferingImageLayer[] = [];
  const layerIndexByItem: number[] = [];
  const layerIndexBySrc = new Map<string, number>();

  items.forEach((item) => {
    if (!item.image) {
      layerIndexByItem.push(0);
      return;
    }

    const existing = layerIndexBySrc.get(item.image.src);
    if (existing !== undefined) {
      layerIndexByItem.push(existing);
      return;
    }

    const nextIndex = layers.length;
    layers.push(item.image);
    layerIndexBySrc.set(item.image.src, nextIndex);
    layerIndexByItem.push(nextIndex);
  });

  return { layers, layerIndexByItem };
}

export function ServiceDetailOfferings({
  headline,
  items,
  ctaHref = "/contact",
  ctaLabel = "Consultation",
  imageHoldItems,
}: ServiceDetailOfferingsProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { layers, layerIndexByItem } = useMemo(
    () => buildOfferingImageLayers(items),
    [items],
  );

  useServiceDetailOfferingsAnimation({ sectionRef, imageHoldItems });

  const cta = (
    <div className="sd-offerings-cta">
      <ServiceDetailCta href={ctaHref} label={ctaLabel} />
    </div>
  );

  const imageStack =
    layers.length > 0 ? (
      <div className="sd-offerings-image" aria-hidden={layers.length === 1}>
        {layers.map((layer, index) => (
          <div
            key={layer.src}
            className="sd-offerings-image-layer"
            data-image-layer={index}
          >
            <Image
              src={layer.src}
              alt={layer.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 28rem"
              className="object-cover"
            />
          </div>
        ))}
      </div>
    ) : null;

  return (
    <section ref={sectionRef} className="sd-offerings sd-section">
      <div className="sd-container">
        <h2
          className="sd-offerings-headline sd-h2 sd-offerings-headline--split"
          data-transition-text="headline"
        >
          {headline}
        </h2>

        <div className="sd-offerings-body">
          <div className="sd-offerings-media-col">
            {imageStack ? (
              <div className="sd-offerings-sticky">
                {imageStack}
                <div className="hidden lg:block">{cta}</div>
              </div>
            ) : (
              <div className="hidden lg:block">{cta}</div>
            )}
          </div>

          <div className="sd-offerings-list sd-glass">
            {items.map((item, index) => (
              <div
                key={item.name}
                className="sd-offering-item relative py-5"
                data-image-layer={layerIndexByItem[index] ?? 0}
              >
                <div className="sd-offering-border absolute left-0 top-0 h-px w-full" />
                <div className="flex items-start gap-3">
                  <OfferingIcon className="sd-offering-icon mt-0.5 size-8 shrink-0 text-ta-gold" />
                  <div>
                    <p className="sd-offering-name">{item.name}</p>
                    {item.description ? (
                      <p className="sd-offering-desc">{item.description}</p>
                    ) : null}
                  </div>
                </div>
                {index === items.length - 1 ? (
                  <div className="sd-offering-border absolute bottom-0 left-0 h-px w-full" />
                ) : null}
              </div>
            ))}
            <div className="mt-6 lg:hidden">{cta}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
