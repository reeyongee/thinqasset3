import {
  THINQASSET_LOGO_ALT,
  THINQASSET_LOGO_MASK_DIMENSIONS,
  THINQASSET_LOGO_SYMBOL_END_X,
  THINQASSET_LOGO_WORDMARK_START_X,
} from "@/lib/brand-assets";
import { ThinqAssetNavLogo } from "./ThinqAssetNavLogo";

type LogoCropProps = {
  height?: number;
  className?: string;
};

function logoFullWidth(height: number) {
  const { width: maskW, height: maskH } = THINQASSET_LOGO_MASK_DIMENSIONS;
  return height * (maskW / maskH);
}

/** Compact mark only — same crop as the scrolled desktop site header logo. */
export function ThinqAssetLogoMark({ height = 56, className }: LogoCropProps) {
  const { height: maskH } = THINQASSET_LOGO_MASK_DIMENSIONS;
  const markWidth = height * (THINQASSET_LOGO_SYMBOL_END_X / maskH);
  const fullWidth = logoFullWidth(height);

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

/** Wordmark only — crops the THINQASSET letters from the same logo mask. */
export function ThinqAssetWordmark({ height = 56, className }: LogoCropProps) {
  const { height: maskH } = THINQASSET_LOGO_MASK_DIMENSIONS;
  const fullWidth = logoFullWidth(height);
  const offset = height * (THINQASSET_LOGO_WORDMARK_START_X / maskH);

  return (
    <div
      className={className}
      style={{ height, width: fullWidth - offset, overflow: "hidden" }}
      aria-hidden="true"
    >
      <ThinqAssetNavLogo
        className="!max-w-none"
        style={{ height, width: fullWidth, marginLeft: -offset }}
      />
    </div>
  );
}
