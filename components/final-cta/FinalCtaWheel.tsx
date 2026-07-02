"use client";

import { useEffect, useState } from "react";
import {
  CTA_ARMS,
  CTA_CARD_SIZE,
  CTA_PERSPECTIVE_PX,
  CTA_WHEEL_SIZE,
} from "./constants";
import { FinalCtaCard } from "./FinalCtaCard";

function useWheelMetrics() {
  const [metrics, setMetrics] = useState<{
    wheelSize: number;
    cardSize: number;
  }>({
    wheelSize: CTA_WHEEL_SIZE.desktop,
    cardSize: CTA_CARD_SIZE.desktop,
  });

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1200px)");
    const tablet = window.matchMedia("(min-width: 810px)");

    const update = () => {
      if (desktop.matches) {
        setMetrics({
          wheelSize: CTA_WHEEL_SIZE.desktop,
          cardSize: CTA_CARD_SIZE.desktop,
        });
        return;
      }

      if (tablet.matches) {
        setMetrics({
          wheelSize: CTA_WHEEL_SIZE.tablet,
          cardSize: CTA_CARD_SIZE.compact,
        });
        return;
      }

      setMetrics({
        wheelSize: CTA_WHEEL_SIZE.mobile,
        cardSize: CTA_CARD_SIZE.compact,
      });
    };

    update();
    desktop.addEventListener("change", update);
    tablet.addEventListener("change", update);
    return () => {
      desktop.removeEventListener("change", update);
      tablet.removeEventListener("change", update);
    };
  }, []);

  return metrics;
}

type FinalCtaWheelProps = {
  rotatorRef: React.RefObject<HTMLDivElement | null>;
};

export function FinalCtaWheel({ rotatorRef }: FinalCtaWheelProps) {
  const { wheelSize, cardSize } = useWheelMetrics();
  const hub = wheelSize / 2;
  const armOriginX = cardSize / 2;

  return (
    <div
      className="final-cta-circle-layer pointer-events-none absolute inset-0 z-0 flex justify-center overflow-visible"
      style={{
        paddingTop: 128,
        transform: `perspective(${CTA_PERSPECTIVE_PX}px)`,
        maskImage: "linear-gradient(to bottom, #000 76%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to bottom, #000 76%, transparent 100%)",
      }}
    >
      <div
        ref={rotatorRef}
        className="final-cta-rotator relative flex shrink-0 items-center justify-center will-change-transform"
        style={{
          width: wheelSize,
          height: wheelSize,
          transformOrigin: `${hub}px ${hub}px`,
        }}
      >
        {CTA_ARMS.map((arm, index) => {
          const isAnchor = index === 0;
          const transform = isAnchor
            ? undefined
            : arm.anchorY === "top"
              ? `translateX(-50%) rotate(${arm.angle}deg)`
              : `translate(-50%, -50%) rotate(${arm.angle}deg)`;

          const positionStyle = isAnchor
            ? undefined
            : {
                left: hub,
                top: arm.anchorY === "top" ? 0 : hub,
              };

          return (
            <div
              key={arm.id}
              className={`flex flex-col items-center justify-between overflow-hidden ${
                isAnchor ? "relative" : "absolute"
              }`}
              style={{
                width: cardSize,
                height: wheelSize,
                transform,
                transformOrigin: `${armOriginX}px ${hub}px`,
                ...positionStyle,
              }}
            >
              <FinalCtaCard image={arm.top} size={cardSize} />
              <div className="rotate-180">
                <FinalCtaCard image={arm.bottom} size={cardSize} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
