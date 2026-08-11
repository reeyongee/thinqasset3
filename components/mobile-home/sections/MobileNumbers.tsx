import { STATS, TRUST_ITEMS } from "@/components/numbers/constants";
import { TrustIcon } from "@/components/numbers/TrustIcons";
import Image from "next/image";
import { MobileReveal } from "../MobileReveal";

export function MobileNumbers() {
  return (
    <section
      id="why-thinqasset"
      className="mobile-section"
      aria-labelledby="mobile-numbers-heading"
    >
      <MobileReveal>
        <h2 id="mobile-numbers-heading" className="mobile-section__headline">
          Why ThinqAsset
          <span className="block text-ta-gold">
            built on expertise, deployed with discipline
          </span>
        </h2>
      </MobileReveal>

      <div className="mobile-snap-row mt-6">
        {STATS.map((stat, index) => (
          <MobileReveal key={stat.id} delay={index * 0.05} className="mobile-card overflow-hidden">
            <div className="relative h-28 w-full">
              <Image
                src={stat.image}
                alt=""
                fill
                sizes="82vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--ta-navy-deep)] to-transparent" />
            </div>
            <div className="p-4">
              <p className="m-0 font-display text-3xl leading-none text-white">
                {stat.display ?? `${stat.prefix}${stat.end}${stat.suffix}`}
              </p>
              <p className="mobile-section__body mt-2 text-sm">{stat.label}</p>
            </div>
          </MobileReveal>
        ))}
      </div>

      <div className="mt-8 flex flex-col gap-5">
        {TRUST_ITEMS.map((item, index) => (
          <MobileReveal key={item.id} delay={index * 0.04}>
            <div className="flex items-start gap-3">
              <span className="mt-0.5 shrink-0 text-white">
                <TrustIcon name={item.icon} />
              </span>
              <div>
                <p className="m-0 font-[family-name:var(--font-inter)] text-sm font-medium text-white">
                  {item.title}
                </p>
                <p className="mobile-section__body mt-1 text-sm">
                  {item.subtitle}
                </p>
              </div>
            </div>
          </MobileReveal>
        ))}
      </div>
    </section>
  );
}
