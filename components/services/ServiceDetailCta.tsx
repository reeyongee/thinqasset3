"use client";

import { HeroButton } from "@/components/hero/HeroButton";

type ServiceDetailCtaProps = {
  href: string;
  label: string;
};

export function ServiceDetailCta({ href, label }: ServiceDetailCtaProps) {
  return <HeroButton href={href} label={label} />;
}
