import { TransitionLink } from "@/components/transition/TransitionLink";
import { CONTACT_CTA_CARDS } from "@/components/contact/constants";

type MobileContactHeroProps = {
  onOpenForm: () => void;
};

export function MobileContactHero({ onOpenForm }: MobileContactHeroProps) {
  return (
    <section
      className="mobile-contact-hero"
      aria-labelledby="mobile-contact-hero-heading"
    >
      <p className="mobile-contact-eyebrow" data-transition-text="body">
        Contact
      </p>

      <h1
        id="mobile-contact-hero-heading"
        className="mobile-contact-hero__headline"
        data-transition-text="headline"
      >
        The right structure
        <br />
        starts with a <em>conversation.</em>
      </h1>

      <div className="mobile-contact-hero__cards">
        {CONTACT_CTA_CARDS.map((card) => {
          const inner = (
            <>
              <div className="mobile-contact-hero__card-copy">
                <p className="mobile-contact-hero__card-label">{card.label}</p>
                <h2 className="mobile-contact-hero__card-title">{card.title}</h2>
              </div>
              <span className="mobile-contact-hero__card-arrow" aria-hidden>
                →
              </span>
            </>
          );

          if (card.id === "form") {
            return (
              <button
                key={card.id}
                type="button"
                className="mobile-contact-hero__card mobile-pressable"
                data-transition-item
                onClick={onOpenForm}
              >
                {inner}
              </button>
            );
          }

          if (card.href?.startsWith("/")) {
            return (
              <TransitionLink
                key={card.id}
                href={card.href}
                className="mobile-contact-hero__card mobile-pressable"
                data-transition-item
              >
                {inner}
              </TransitionLink>
            );
          }

          return (
            <a
              key={card.id}
              href={card.href!}
              className="mobile-contact-hero__card mobile-pressable"
              data-transition-item
            >
              {inner}
            </a>
          );
        })}
      </div>
    </section>
  );
}
