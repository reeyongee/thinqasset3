import { Fragment } from "react";
import { HEADLINE_WORDS } from "./constants";

const HEADLINE_TEXT = "Innovative Global Fund Management.";

export function HeroHeadline() {
  return (
    <div className="w-full max-w-[640px] [text-wrap:balance]">
      <h1 className="font-display m-0 text-left text-[48px] leading-[1.1] tracking-[-2px] text-white min-[810px]:text-[56px] min-[810px]:tracking-[-2.5px] min-[1200px]:text-[64px] min-[1200px]:tracking-[-3px] min-[1200px]:leading-[1.1]">
        <span className="min-[810px]:hidden">{HEADLINE_TEXT}</span>
        <span className="hidden min-[810px]:contents">
          {HEADLINE_WORDS.map((word, index) => (
            <Fragment key={word}>
              <span
                className="hero-word inline-block will-change-transform"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {word}
              </span>
              {index < HEADLINE_WORDS.length - 1 ? " " : null}
            </Fragment>
          ))}
        </span>
      </h1>
    </div>
  );
}
