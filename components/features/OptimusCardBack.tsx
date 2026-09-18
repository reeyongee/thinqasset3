import { ThinqAssetLogoMark, ThinqAssetWordmark } from "@/components/brand/ThinqAssetLogoMark";
import { THINQASSET_LOGO_ALT, THINQASSET_LOGO_MARK_ORIGIN } from "@/lib/brand-assets";

const LOCKUP_HEIGHT = 36;
const SPIN_ORIGIN = `${THINQASSET_LOGO_MARK_ORIGIN.xPercent}% ${THINQASSET_LOGO_MARK_ORIGIN.yPercent}%`;

export function OptimusCardBack() {
  return (
    <div
      className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-3"
      role="img"
      aria-label={THINQASSET_LOGO_ALT}
    >
      <div
        className="feature-card-logo-spin"
        style={{ transformOrigin: SPIN_ORIGIN }}
        aria-hidden="true"
      >
        <ThinqAssetLogoMark height={LOCKUP_HEIGHT} />
      </div>
      <ThinqAssetWordmark height={LOCKUP_HEIGHT} />
    </div>
  );
}
