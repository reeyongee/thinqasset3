import { THINQASSET_LOGO_ALT } from "@/lib/brand-assets";

type ThinqAssetNavLogoProps = {
  className?: string;
};

export function ThinqAssetNavLogo({ className }: ThinqAssetNavLogoProps) {
  return (
    <span
      aria-hidden="true"
      className={["hero-nav-logo__mark", className].filter(Boolean).join(" ")}
    />
  );
}

export { THINQASSET_LOGO_ALT };
