"use client";

import { type FormEvent, useState } from "react";
import {
  ThinqAssetNavLogo,
  THINQASSET_LOGO_ALT,
} from "@/components/brand/ThinqAssetNavLogo";
import { LinkedInIcon } from "./icons/SocialIcons";
import {
  FOOTER_EMAIL,
  FOOTER_MENU_COLUMNS,
  FOOTER_NEWSLETTER_FAIL,
  FOOTER_NEWSLETTER_HEADING,
  FOOTER_NEWSLETTER_SUCCESS,
  FOOTER_SOCIAL_HEADING,
  FOOTER_SOCIAL_LINKS,
  FOOTER_TAGLINE,
} from "./constants";
import { TransitionLink } from "@/components/transition/TransitionLink";

const SOCIAL_ICONS = {
  linkedin: LinkedInIcon,
} as const;

function FooterSocialLinks() {
  return (
    <div className="social-media-wrapper">
      {FOOTER_SOCIAL_LINKS.map((social) => {
        const Icon = SOCIAL_ICONS[social.icon];
        return (
          <a
            key={social.label}
            href={social.href}
            className="social-media-v2"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.label}
          >
            <div className="social-media-icon">
              <Icon />
            </div>
          </a>
        );
      })}
    </div>
  );
}

function FooterSocialBlock({ className }: { className: string }) {
  return (
    <div className={className}>
      <div className="sub-heading orange footer">{FOOTER_SOCIAL_HEADING}</div>
      <FooterSocialLinks />
    </div>
  );
}

function FooterNewsletterForm() {
  const [status, setStatus] = useState<"idle" | "done" | "fail">("idle");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const email = new FormData(form).get("email");

    if (!email || typeof email !== "string" || !email.includes("@")) {
      setStatus("fail");
      return;
    }

    setStatus("done");
    form.reset();
  }

  return (
    <div className="form-subscribe-container">
      <form
        className="form-subscribe"
        onSubmit={handleSubmit}
        aria-label="ThinqAsset newsletter subscription"
      >
        <input
          className="form-field"
          type="email"
          name="email"
          placeholder="Email"
          required
          maxLength={256}
          autoComplete="email"
        />
        <input
          type="submit"
          className="button orange"
          value="Subscribe"
        />
      </form>
      <div
        className={`w-form-done${status === "done" ? " is-visible" : ""}`}
        role="region"
        aria-live="polite"
      >
        <div>{FOOTER_NEWSLETTER_SUCCESS}</div>
      </div>
      <div
        className={`w-form-fail${status === "fail" ? " is-visible" : ""}`}
        role="region"
        aria-live="polite"
      >
        <div>{FOOTER_NEWSLETTER_FAIL}</div>
      </div>
    </div>
  );
}

export function FooterTopRow() {
  return (
    <div className="inner-footer">
      <div className="inner-footer-left">
        <div className="div-block-28">
          <a
            href="/"
            className="footer-logo-link"
            aria-label={`${THINQASSET_LOGO_ALT} home`}
          >
            <ThinqAssetNavLogo className="footer-logo-mark" />
          </a>
          <div className="text-title-footer">{FOOTER_TAGLINE}</div>
        </div>

        <FooterSocialBlock className="footer-section-container-inner-v2 only-tablet" />
      </div>

      <div className="inner-footer-right">
        <div className="div-block-4 add-gap">
          <div className="div-block-3">
            {FOOTER_MENU_COLUMNS.map((column) => (
              <div
                key={column.map((item) => item.href).join("-")}
                className="footer-menu-container"
              >
                {column.map((item) => (
                  <TransitionLink
                    key={item.href}
                    href={item.href}
                    className="footer-menu-link"
                  >
                    {item.label}
                  </TransitionLink>
                ))}
              </div>
            ))}
          </div>

          <div className="footer-section-container-inner-v2">
            <div className="sub-heading orange footer auto-w">Email Us</div>
            <a className="text-desc footer-email-link" href={`mailto:${FOOTER_EMAIL}`}>
              {FOOTER_EMAIL}
            </a>
          </div>
        </div>

        <div className="footer-section-containerr-v2 last">
          <div className="footer-section-container-inner">
            <div className="sub-heading orange footer">
              {FOOTER_NEWSLETTER_HEADING}
            </div>
            <FooterNewsletterForm />
          </div>

          <FooterSocialBlock className="footer-section-container-inner-v2 hide-tablet" />
        </div>
      </div>
    </div>
  );
}
