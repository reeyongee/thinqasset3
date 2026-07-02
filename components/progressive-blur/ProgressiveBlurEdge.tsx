import type { BlurLayer } from "./constants";

type ProgressiveBlurEdgeProps = {
  layers: BlurLayer[];
};

export function ProgressiveBlurEdge({ layers }: ProgressiveBlurEdgeProps) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {layers.map(({ blur, mask }, index) => (
        <div
          key={`${blur}-${index}`}
          className="pointer-events-none absolute inset-0"
          style={{
            zIndex: index + 1,
            backdropFilter: `blur(${blur})`,
            WebkitBackdropFilter: `blur(${blur})`,
            maskImage: mask,
            WebkitMaskImage: mask,
            maskComposite: "add",
            WebkitMaskComposite: "source-over",
          }}
        />
      ))}
    </div>
  );
}
