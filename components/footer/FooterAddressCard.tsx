import type { FooterOffice } from "./constants";
import { FooterArrowIcon } from "./icons/FooterArrowIcon";
import { TransitionLink } from "@/components/transition/TransitionLink";

type FooterAddressCardProps = {
  office: FooterOffice;
};

export function FooterAddressCard({ office }: FooterAddressCardProps) {
  const className = [
    "inner-footer-address",
    office.isFirst ? "first" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <TransitionLink href={office.href} className={className}>
      <div className="footer-country-visual" aria-hidden>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={office.imageSrc}
          alt=""
          loading="lazy"
          className="image-country-footer"
        />
        <div className="footer-country-gradient" />
      </div>

      <div className="top-address-footer">
        <div className="sub-heading-address">{office.country}</div>
        <div className="address-office-name footer">{office.company}</div>
      </div>

      <div className="text-desc foot-address">
        {office.addressLines.map((line, index) => (
          <span key={line}>
            {line}
            {index < office.addressLines.length - 1 ? <br /> : null}
          </span>
        ))}
      </div>

      <div className="arrow-footer" aria-hidden>
        <div className="arrow-footer-ico arr-1">
          <FooterArrowIcon />
        </div>
        <div className="arrow-footer-ico arr-2">
          <FooterArrowIcon />
        </div>
      </div>
    </TransitionLink>
  );
}
