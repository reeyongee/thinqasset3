export default function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 bg-paper/85 backdrop-blur-sm">
      <div className="container-ed flex h-16 items-center justify-between border-b border-line">
        <a href="#top" className="marker text-ink">
          Structures — PCC
        </a>
        <nav className="flex items-center gap-6 md:gap-10">
          {[
            ["#mauritius", "01 Mauritius"],
            ["#difc", "02 DIFC"],
            ["#luxembourg", "03 Luxembourg"],
          ].map(([href, label]) => (
            <a key={href} href={href} className="marker transition-colors hover:text-accent">
              {label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
