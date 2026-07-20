import { FOOTER_OFFICES } from "./constants";
import { FooterAddressCard } from "./FooterAddressCard";

export function FooterOfficesRow() {
  return (
    <div className="inner-footer middle">
      {FOOTER_OFFICES.map((office) => (
        <FooterAddressCard key={office.country} office={office} />
      ))}
    </div>
  );
}
