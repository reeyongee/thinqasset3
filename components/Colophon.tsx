import { TBG_TAGLINE } from "@/lib/brand-assets";

export default function Colophon() {
  return (
    <footer className="border-t border-line bg-ink">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-2 px-5 py-6 font-tmono text-[8px] uppercase tracking-[0.24em] text-paper/40 sm:gap-3 sm:px-6 sm:py-8 sm:text-[9px] sm:tracking-[0.28em] md:flex-row md:items-center md:justify-between md:px-14">
        <span>© {new Date().getFullYear()} TBG Group Holding Ltd.</span>
        <span>{TBG_TAGLINE}</span>
        <span>Dubai — Luxembourg — Mauritius</span>
        <span>India · Singapore · London — in progression</span>
      </div>
    </footer>
  );
}
