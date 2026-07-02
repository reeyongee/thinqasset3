export function PortfolioDonut() {
  return (
    <div className="flex h-full w-full items-center justify-center p-6">
      <div className="relative aspect-square w-full max-w-[400px] min-[810px]:max-h-[400px] min-[810px]:max-w-[400px] max-[809px]:max-h-[278px] max-[809px]:max-w-[326px]">
        <div className="feature-pie-spin absolute inset-0 will-change-transform">
          <svg viewBox="0 0 400 400" className="h-full w-full" aria-hidden>
            <path
              d="M 209.94383168615934 10.260388396630958 A 190 190 0 0 1 268.0899104136071 377.38028103446834 L 260.9225514227011 358.7086725045243 A 170 170 0 0 0 208.89711256130047 30.232979091722456 Z"
              fill="var(--ta-navy-card)"
              stroke="var(--ta-grey-border)"
              strokeWidth="1"
            />
            <path
              d="M 249.17561856947896 383.525906994923 A 190 190 0 0 1 22.61971896553166 268.0899104136071 L 41.29132749547571 260.922551422701 A 170 170 0 0 0 243.99923766742853 364.2073904691416 Z"
              fill="var(--ta-navy-card)"
              stroke="var(--ta-grey-border)"
              strokeWidth="1"
            />
            <path
              d="M 16.474093005077037 249.17561856947898 A 190 190 0 0 1 80.42912570053093 52.34226732317549 L 93.01553352152769 67.8851865523149 A 170 170 0 0 0 35.792609530858414 243.9992376674286 Z"
              fill="var(--ta-navy-card)"
              stroke="var(--ta-grey-border)"
              strokeWidth="1"
            />
            <path
              d="M 96.51858334714487 40.65259209036944 A 190 190 0 0 1 190.05616831384057 10.260388396630958 L 191.10288743869947 30.232979091722456 A 170 170 0 0 0 107.41136404744542 57.426003449277914 Z"
              fill="var(--ta-gold)"
              stroke="var(--ta-grey-border)"
              strokeWidth="1"
            />
          </svg>
        </div>
        <div className="pointer-events-none absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1 text-center">
          <p className="m-0 font-[family-name:var(--font-geist-mono)] text-xl font-normal tracking-[-0.03em] text-white">
            $125,000
          </p>
          <p className="m-0 font-[family-name:var(--font-inter)] text-xs font-medium leading-[1em] tracking-[-0.01em] text-token-muted">
            Total Value
          </p>
        </div>
      </div>
    </div>
  );
}
