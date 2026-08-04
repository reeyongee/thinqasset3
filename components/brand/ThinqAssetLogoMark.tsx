import {
  THINQASSET_LOGO_ALT,
  THINQASSET_LOGO_MASK_DIMENSIONS,
  THINQASSET_LOGO_SYMBOL_END_X,
} from "@/lib/brand-assets";
import { ThinqAssetNavLogo } from "./ThinqAssetNavLogo";

type ThinqAssetLogoMarkProps = {
  height?: number;
  className?: string;
};

/** Compact mark only — same crop as the scrolled desktop site header logo. */
export function ThinqAssetLogoMark({ height = 56, className }: ThinqAssetLogoMarkProps) {
  const { width: maskW, height: maskH } = THINQASSET_LOGO_MASK_DIMENSIONS;
  const markWidth = height * (THINQASSET_LOGO_SYMBOL_END_X / maskH);
  const fullWidth = height * (maskW / maskH);

  return (
    <div
      className={className}
      style={{ height, maxWidth: markWidth, overflow: "hidden" }}
      role="img"
      aria-label={THINQASSET_LOGO_ALT}
    >
      <ThinqAssetNavLogo
        className="!max-w-none"
        style={{ height, width: fullWidth }}
      />
    </div>
  );
}
