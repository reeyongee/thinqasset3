"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import Grain from "@/components/primitives/Grain";
import type { TeamMember } from "@/components/test-playground/InteractiveCardGallery";
import { useIsPhoneViewport } from "@/hooks/useIsPhoneViewport";

/** Desktop stage (1024×640) — spacing is in stage pixels, then the whole stage scales. */
const STAGE_W = 1024;
const STAGE_H = 640;
const COL_W = 381;
/** Space between the two profile columns (flex `gap`). */
const COL_GAP_PX = 120;
/** Space between page title and member name row. */
const TITLE_TO_COLUMNS_PX = 56;
const STAGE_PAD_X = 71;
const STAGE_PAD_TOP = 20;
/**
 * Desktop bio viewport — sized to fit board bios without dead space (~281px content
 * at 11.5px / 1.62). Longer copy (independent directors) scrolls inside the same box.
 */
const DESKTOP_BIO_BOX_HEIGHT_PX = 284;
const MOBILE_BIO_BOX_MAX_HEIGHT_PX = 300;

const PAGE_BG_OVERRIDE = `
  .site-bg { display: block !important; }
  html { background-color: var(--ta-navy-deep) !important; }
  body {
    background: transparent !important;
    margin: 0 !important;
    padding: 0 !important;
  }
`;

const BIO_SCROLL_CLASS =
  "overflow-y-auto overscroll-auto pr-2 select-text [scrollbar-width:thin] [scrollbar-color:rgba(182,160,130,0.4)_transparent] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[color:var(--ta-gold)]/40 hover:[&::-webkit-scrollbar-thumb]:bg-[color:var(--ta-gold)]/70 [&::-webkit-scrollbar-track]:bg-transparent";

/** Soft dissolve zone at bottom of scroll (stage px). */
const BIO_FADE_HEIGHT_PX = 72;

function BioScrollPanel({
  children,
  heightPx,
}: {
  children: ReactNode;
  heightPx: number;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [remaining, setRemaining] = useState(0);

  const syncFade = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const maxScroll = el.scrollHeight - el.clientHeight;
    if (maxScroll <= 2) {
      setRemaining(0);
      return;
    }
    const progress = 1 - el.scrollTop / maxScroll;
    setRemaining(Math.max(0, Math.min(1, progress)));
  }, []);

  useEffect(() => {
    syncFade();
    const el = scrollRef.current;
    if (!el) return;
    const observer = new ResizeObserver(syncFade);
    observer.observe(el);
    return () => observer.disconnect();
  }, [syncFade, children]);

  const stillOverflowing = remaining > 0.02;
  const scrollMask = stillOverflowing
    ? `linear-gradient(to bottom, #000 0%, #000 calc(100% - ${BIO_FADE_HEIGHT_PX + 20}px), rgba(0,0,0,0.55) calc(100% - ${BIO_FADE_HEIGHT_PX * 0.45}px), transparent 100%)`
    : undefined;

  return (
    <div
      className="relative shrink-0 overflow-hidden"
      style={{ height: heightPx }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        ref={scrollRef}
        onScroll={syncFade}
        className={`h-full ${BIO_SCROLL_CLASS}`}
        style={{
          WebkitOverflowScrolling: "touch",
          touchAction: "pan-y",
          WebkitMaskImage: scrollMask,
          maskImage: scrollMask,
        }}
      >
        {children}
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-1/2 z-[2] -translate-x-1/2 transition-opacity duration-300 ease-out"
        style={{
          height: BIO_FADE_HEIGHT_PX,
          width: "38%",
          opacity: hovered ? 1 : 0,
        }}
      >
        <div
          className="h-full w-full"
          style={{
            opacity: remaining,
            background: `radial-gradient(
              ellipse 70% 85% at 50% 100%,
              color-mix(in srgb, var(--ta-gold) 22%, transparent) 0%,
              color-mix(in srgb, var(--ta-gold) 8%, transparent) 40%,
              transparent 72%
            )`,
          }}
        />
      </div>
    </div>
  );
}

export type ProfileTextPairProps = {
  title: string;
  members: TeamMember[];
};

export function ProfileTextPair({ title, members }: ProfileTextPairProps) {
  const isPhone = useIsPhoneViewport();

  if (isPhone) {
    return <ProfileTextPairMobile title={title} members={members} />;
  }

  return <ProfileTextPairDesktop title={title} members={members} />;
}

function ProfileColumnDesktop({ member }: { member: TeamMember }) {
  return (
    <div className="z-10 flex h-full min-h-0 flex-col">
      <header className="shrink-0">
        <h2 className="font-[family-name:var(--font-lp-saturnia)] text-[24px] font-normal tracking-[0.015em] leading-tight text-white">
          {member.name}
        </h2>
        <p className="mt-1 font-[family-name:var(--font-geist-mono)] text-[10px] font-bold uppercase leading-none tracking-[0.2em] text-[color:var(--ta-gold)]">
          {member.role}
        </p>
      </header>
      <div className="mt-9">
        <BioScrollPanel heightPx={DESKTOP_BIO_BOX_HEIGHT_PX}>
          <div className="space-y-2.5 font-[family-name:var(--font-inter)] text-[11.5px] font-normal leading-[1.62] tracking-[-0.01em] text-[color:var(--ta-grey-light)]">
            {member.bio.map((paragraph, pIdx) => (
              <p key={pIdx}>{paragraph}</p>
            ))}
          </div>
        </BioScrollPanel>
      </div>
    </div>
  );
}

function ProfileTextPairDesktop({
  title,
  members,
}: ProfileTextPairProps) {
  const [scale, setScale] = useState(1);
  const [left, right] = members;

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const scaleX = (w - 32) / 1024;
      const scaleY = (h - 32) / 640;
      const s = Math.min(1, scaleX, scaleY);
      setScale(Math.max(0.35, s));
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      data-transition-page
      className="relative flex min-h-[calc(100vh-4rem)] w-full items-center justify-center overflow-hidden bg-transparent selection:bg-[color:var(--ta-gold)]/20 selection:text-white pt-24 pb-16"
    >
      <style dangerouslySetInnerHTML={{ __html: PAGE_BG_OVERRIDE }} />
      <Grain />

      <div
        className="relative flex shrink-0 flex-col overflow-hidden z-10"
        style={{
          transform: `scale(${scale})`,
          transformOrigin: "center center",
          width: STAGE_W,
          height: STAGE_H,
          paddingLeft: STAGE_PAD_X,
          paddingRight: STAGE_PAD_X,
          paddingTop: STAGE_PAD_TOP,
        }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute top-0 left-1/2 h-full w-px -translate-x-1/2 z-10"
          style={{
            background:
              "linear-gradient(180deg, transparent 0%, var(--ta-grey-border) 15%, var(--ta-grey-border) 85%, transparent 100%)",
          }}
        />

        <h1
          className="relative z-20 shrink-0 font-[family-name:var(--font-lp-saturnia)] text-[34px] font-normal tracking-[0.015em] text-white leading-none"
        >
          {title}
        </h1>

        <div
          className="relative z-10 flex min-h-0 flex-1 justify-center"
          style={{
            marginTop: TITLE_TO_COLUMNS_PX,
            gap: COL_GAP_PX,
          }}
        >
          {left ? (
            <div className="flex h-full min-h-0 flex-col" style={{ width: COL_W }}>
              <ProfileColumnDesktop member={left} />
            </div>
          ) : null}
          {right ? (
            <div className="flex h-full min-h-0 flex-col" style={{ width: COL_W }}>
              <ProfileColumnDesktop member={right} />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function ProfileBlockMobile({ member }: { member: TeamMember }) {
  return (
    <article>
      <header>
        <h2 className="font-[family-name:var(--font-lp-saturnia)] text-[26px] font-normal leading-tight tracking-[0.015em] text-white">
          {member.name}
        </h2>
        <p className="mt-2 font-[family-name:var(--font-geist-mono)] text-[11px] font-bold uppercase leading-none tracking-[0.2em] text-[color:var(--ta-gold)]">
          {member.role}
        </p>
      </header>
      <div className="mt-7">
        <BioScrollPanel heightPx={MOBILE_BIO_BOX_MAX_HEIGHT_PX}>
          <div className="space-y-4 font-[family-name:var(--font-inter)] text-base font-normal leading-[1.65] tracking-[-0.01em] text-[color:var(--ta-grey-light)]">
            {member.bio.map((paragraph, pIdx) => (
              <p key={pIdx}>{paragraph}</p>
            ))}
          </div>
        </BioScrollPanel>
      </div>
    </article>
  );
}

function ProfileTextPairMobile({ title, members }: ProfileTextPairProps) {
  return (
    <div
      data-transition-page
      className="relative w-full bg-transparent px-4 pb-20 pt-[calc(var(--site-header-height-floating)+1.25rem)] selection:bg-[color:var(--ta-gold)]/20 selection:text-white"
    >
      <style dangerouslySetInnerHTML={{ __html: PAGE_BG_OVERRIDE }} />
      <Grain />

      <div className="relative z-10">
        <h1 className="font-[family-name:var(--font-lp-saturnia)] text-[28px] font-normal leading-none tracking-[0.015em] text-white">
          {title}
        </h1>

        <div className="mt-14 flex flex-col gap-10">
          {members.map((member, idx) => (
            <div key={member.id}>
              {idx > 0 ? (
                <hr
                  aria-hidden
                  className="mb-10 border-0 border-t border-[color:var(--ta-grey-border)]"
                />
              ) : null}
              <ProfileBlockMobile member={member} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
