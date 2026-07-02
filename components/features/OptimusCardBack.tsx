import { OptimusLogoIcon } from "./svgs/SourceIcons";

export function OptimusCardBack() {
  return (
    <div className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2">
      <OptimusLogoIcon />
      <span className="font-[family-name:var(--font-albert-sans)] text-xl font-medium tracking-[-0.03em] text-white">
        ThinqAsset
      </span>
    </div>
  );
}
