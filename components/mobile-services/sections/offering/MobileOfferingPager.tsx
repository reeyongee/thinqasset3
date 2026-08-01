import { TransitionLink } from "@/components/transition/TransitionLink";
import { MobileReveal } from "@/components/mobile-home/MobileReveal";
import type { OfferingNeighbor } from "../../types";

type MobileOfferingPagerProps = {
  pagerLabel: string;
  position: number;
  total: number;
  previous: OfferingNeighbor;
  next: OfferingNeighbor;
};

export function MobileOfferingPager({
  pagerLabel,
  position,
  total,
  previous,
  next,
}: MobileOfferingPagerProps) {
  return (
    <MobileReveal>
      <nav
        className="mobile-slug-offering-pager"
        aria-label="Offering navigation"
      >
        <p className="mobile-slug-offering-pager__progress">
          <span className="mobile-slug-offering-pager__current">
            {String(position).padStart(2, "0")}
          </span>
          <span aria-hidden>/</span>
          <span>{String(total).padStart(2, "0")}</span>
          <span className="mobile-slug-offering-pager__label">{pagerLabel}</span>
        </p>

        <div className="mobile-slug-offering-pager__row">
          <TransitionLink
            href={previous.href}
            className="mobile-slug-offering-pager__link mobile-pressable"
            aria-label={`Previous offering: ${previous.title}`}
          >
            <span className="mobile-slug-offering-pager__dir">← Prev</span>
            <span className="mobile-slug-offering-pager__title">{previous.title}</span>
          </TransitionLink>

          <TransitionLink
            href={next.href}
            className="mobile-slug-offering-pager__link mobile-pressable"
            aria-label={`Next offering: ${next.title}`}
          >
            <span className="mobile-slug-offering-pager__dir">Next →</span>
            <span className="mobile-slug-offering-pager__title">{next.title}</span>
          </TransitionLink>
        </div>
      </nav>
    </MobileReveal>
  );
}
