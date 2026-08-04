import { THINQASSET_LOGO_ALT } from "@/lib/brand-assets";

type ThinqAssetNavLogoProps = {
  className?: string;
  style?: React.CSSProperties;
};

export function ThinqAssetNavLogo({ className, style }: ThinqAssetNavLogoProps) {
  return (
    <span
      aria-hidden="true"
      className={["hero-nav-logo__mark", className].filter(Boolean).join(" ")}
      style={style}
    />
  );
}

export { THINQASSET_LOGO_ALT };
