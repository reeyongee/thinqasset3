import {
  ExposureFeatureIcon,
  OrionFeatureIcon,
  PortfolioFeatureIcon,
} from "./svgs/SourceIcons";

type FeatureIconProps = {
  name: "portfolio" | "orion" | "exposure";
};

export function FeatureIcon({ name }: FeatureIconProps) {
  switch (name) {
    case "portfolio":
      return <PortfolioFeatureIcon />;
    case "orion":
      return <OrionFeatureIcon />;
    case "exposure":
      return <ExposureFeatureIcon />;
  }
}
