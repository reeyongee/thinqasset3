"use client";

import { HeroButton } from "@/components/hero/HeroButton";

type ServiceDetailPrimaryCtaProps = {
  href: string;
  label: string;
};

export function ServiceDetailPrimaryCta({
  href,
  label,
}: ServiceDetailPrimaryCtaProps) {
  return <HeroButton href={href} label={label} />;
}
