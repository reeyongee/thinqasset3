import Image from "next/image";
import type { CtaArmImage } from "./constants";
import { FINAL_CTA_TOKENS } from "./constants";

type FinalCtaCardProps = {
  image: CtaArmImage;
  size: number;
};

export function FinalCtaCard({ image, size }: FinalCtaCardProps) {
  return (
    <div
      className="final-cta-card relative shrink-0 overflow-hidden rounded-2xl"
      style={{
        width: size,
        height: size,
        border: `1px solid ${FINAL_CTA_TOKENS.cardBorder}`,
      }}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes={`${size}px`}
        className="object-cover object-center"
        draggable={false}
      />
    </div>
  );
}
