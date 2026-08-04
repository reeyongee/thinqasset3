"use client";

import {
  COUNTRY_CODES,
  PHONE_MAX_DIGITS,
  PHONE_MIN_DIGITS,
  PHONE_PATTERN,
  sanitizePhoneDigits,
} from "@/lib/contact/phone";

type PhoneFieldProps = {
  id: string;
  countryCode: string;
  phone: string;
  onCountryCodeChange: (code: string) => void;
  onPhoneChange: (phone: string) => void;
  variant?: "desktop" | "mobile";
};

export function PhoneField({
  id,
  countryCode,
  phone,
  onCountryCodeChange,
  onPhoneChange,
  variant = "desktop",
}: PhoneFieldProps) {
  const selectId = `${id}-country`;
  const isMobile = variant === "mobile";

  return (
    <div
      className={
        isMobile
          ? "mobile-contact-field mobile-contact-field--phone"
          : "page__input__container page__input__container--phone"
      }
    >
      <div className="contact-phone-field">
        <label className="contact-phone-field__code-label" htmlFor={selectId}>
          <span className="sr-only">Country code</span>
          <select
            id={selectId}
            name="countryCode"
            className="contact-phone-field__code"
            value={countryCode}
            required
            aria-label="Country code"
            onChange={(event) => onCountryCodeChange(event.target.value)}
          >
            {COUNTRY_CODES.map((option) => (
              <option key={`${option.iso}-${option.code}`} value={option.code}>
                {option.iso} {option.code}
              </option>
            ))}
          </select>
        </label>

        <input
          id={id}
          name="phone"
          type="tel"
          inputMode="numeric"
          autoComplete="tel-national"
          placeholder="Phone"
          required
          minLength={PHONE_MIN_DIGITS}
          maxLength={PHONE_MAX_DIGITS}
          pattern={PHONE_PATTERN}
          title={`Enter ${PHONE_MIN_DIGITS}–${PHONE_MAX_DIGITS} digits`}
          value={phone}
          onChange={(event) =>
            onPhoneChange(sanitizePhoneDigits(event.target.value))
          }
          onInvalid={(event) => {
            const input = event.currentTarget;
            if (input.validity.valueMissing) {
              input.setCustomValidity("Please enter your phone number.");
            } else if (
              input.validity.patternMismatch ||
              input.validity.tooShort
            ) {
              input.setCustomValidity(
                `Enter a valid phone number (${PHONE_MIN_DIGITS}–${PHONE_MAX_DIGITS} digits).`,
              );
            } else {
              input.setCustomValidity("");
            }
          }}
          onInput={(event) => {
            event.currentTarget.setCustomValidity("");
          }}
        />
      </div>
      <label htmlFor={id}>Phone</label>
    </div>
  );
}
