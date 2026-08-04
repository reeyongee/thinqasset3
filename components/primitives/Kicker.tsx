export default function Kicker({
  children,
  dark = false,
}: {
  children: React.ReactNode;
  dark?: boolean;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className={`h-px w-8 ${dark ? "bg-ink/40" : "bg-brass"}`} />
      <span
        className={`font-tmono text-[10px] uppercase tracking-[0.32em] ${
          dark ? "text-ink/55" : "text-paper/55"
        }`}
      >
        {children}
      </span>
    </div>
  );
}
