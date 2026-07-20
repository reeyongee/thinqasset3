import "./footer.css";
import { FooterBottomRow } from "./FooterBottomRow";
import { FooterOfficesRow } from "./FooterOfficesRow";
import { FooterTopRow } from "./FooterTopRow";

export function Footer() {
  return (
    <footer className="footer-v2" aria-label="Site footer">
      <div className="footer-wrapper">
        <div className="footer-container">
          <FooterTopRow />
          <FooterOfficesRow />
          <FooterBottomRow />
        </div>
      </div>
    </footer>
  );
}
