import Image from "next/image";
import { USE_CASES } from "./constants";

type UseCaseImageStackProps = {
  activeIndex: number;
};

export function UseCaseImageStack({ activeIndex }: UseCaseImageStackProps) {
  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
      {USE_CASES.map((useCase, index) => {
        const isActive = index === activeIndex;
        const isCentered = index === 1 || index === 2;

        return (
          <div
            key={useCase.id}
            className={[
              "use-case-image-layer absolute transition-opacity duration-[400ms] ease-[cubic-bezier(0.12,0.23,0.5,1)]",
              isCentered
                ? "top-1/2 left-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2"
                : "inset-0",
              isActive ? "opacity-100" : "pointer-events-none opacity-0",
            ].join(" ")}
            aria-hidden={!isActive}
          >
            <Image
              src={useCase.image}
              alt=""
              fill
              className="object-cover object-center"
              sizes="(min-width: 1200px) 677px, (min-width: 810px) 60vw, 100vw"
              priority={index === 0}
            />
          </div>
        );
      })}
    </div>
  );
}
