export default function Footer() {
  return (
    <footer className="border-t border-line py-20">
      <div className="container-ed grid grid-cols-12 gap-6">
        <p className="col-span-12 font-display text-3xl leading-tight md:col-span-8 md:text-4xl">
          One shared layer of governance.
          <br />
          <em className="text-accent">Every market, ring-fenced.</em>
        </p>
        <div className="col-span-12 md:col-span-4 md:text-right">
          <p className="marker">Mauritius · DIFC · Luxembourg</p>
          <p className="mt-4 text-xs text-muted">
            Composed as editorial spreads — not stacked sections.
          </p>
        </div>
      </div>
    </footer>
  );
}
