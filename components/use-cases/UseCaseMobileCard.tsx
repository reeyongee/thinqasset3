import Image from "next/image";
import { HeroButton } from "@/components/hero/HeroButton";
import type { UseCaseData } from "./constants";

type UseCaseMobileCardProps = {
  useCase: UseCaseData;
};

export function UseCaseMobileCard({ useCase }: UseCaseMobileCardProps) {
  return (
    <article className="use-case-mobile-card flex w-full shrink-0 snap-center flex-col gap-6">
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
        <Image
          src={useCase.image}
          alt=""
          fill
          className="object-cover object-center"
          sizes="358px"
        />
      </div>

      <div className="flex flex-col gap-4">
        <p className="m-0 font-[family-name:var(--font-inter)] text-sm font-normal leading-[16.8px] tracking-[-0.01em] text-token-muted">
          {useCase.title}
        </p>
        <p className="m-0 font-[family-name:var(--font-inter)] text-xl font-normal leading-[26px] tracking-[-0.02em] text-white [text-wrap:balance]">
          {useCase.description}
        </p>
      </div>

      <HeroButton
        label={useCase.mobileCtaLabel}
        className="w-full self-stretch"
      />
    </article>
  );
}
