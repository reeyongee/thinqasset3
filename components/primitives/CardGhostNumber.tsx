export const CARD_GHOST_NUMBER_CLASS =
  "pointer-events-none absolute -right-3 top-4 select-none font-display text-[24vh] leading-none text-paper/5";

export default function CardGhostNumber({ n }: { n: string }) {
  return (
    <span aria-hidden className={CARD_GHOST_NUMBER_CLASS}>
      {n}
    </span>
  );
}
