export default function ChapterMark({
  n,
  label,
  dark = false,
}: {
  n: string;
  label: string;
  dark?: boolean;
}) {
  return (
    <div className="absolute left-4 top-[5.25rem] z-20 flex items-baseline gap-2.5 md:left-12 md:top-9 md:gap-3">
      <span className="font-tmono text-[9px] tracking-[0.26em] text-brass md:text-[10px] md:tracking-[0.3em]">{n}</span>
      <span
        className={`font-tmono text-[9px] uppercase tracking-[0.26em] md:text-[10px] md:tracking-[0.3em] ${
          dark ? "text-ink/50" : "text-paper/45"
        }`}
      >
        {label}
      </span>
    </div>
  );
}
