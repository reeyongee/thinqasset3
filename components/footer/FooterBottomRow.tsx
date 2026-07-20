import {
  FOOTER_COPYRIGHT,
  FOOTER_LEGAL_LINKS,
} from "./constants";
import { TransitionLink } from "@/components/transition/TransitionLink";

export function FooterBottomRow() {
  return (
    <div className="inner-footer bottom">
      <div className="inner-footer-bottom-v2">
        <div className="div-block-29">
          {FOOTER_LEGAL_LINKS.map((link, index) => (
            <span key={link.href} className="contents">
              {index > 0 ? <div className="divider-copy" aria-hidden /> : null}
              <TransitionLink href={link.href} className="footer-link _2">
                {link.label}
              </TransitionLink>
            </span>
          ))}
        </div>
        <div className="text-desc right center-mobile">{FOOTER_COPYRIGHT}</div>
      </div>
    </div>
  );
}
