/** Shared glossy filters + gradients. `uid` keeps IDs unique per SVG instance. */

type GlossDefsProps = {
  uid: string;
};

export function GlossDefs({ uid }: GlossDefsProps) {
  const g = (name: string) => `${uid}-${name}`;

  return (
    <defs>
      {/* Atmosphere */}
      <radialGradient id={g("bg")} cx="42%" cy="28%" r="72%">
        <stop offset="0%" stopColor="#2a3542" stopOpacity="0.95" />
        <stop offset="45%" stopColor="#1a222b" stopOpacity="1" />
        <stop offset="100%" stopColor="#12171d" stopOpacity="1" />
      </radialGradient>

      <linearGradient id={g("glass-fill")} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#e8eef4" stopOpacity="0.55" />
        <stop offset="38%" stopColor="#9aa8b6" stopOpacity="0.28" />
        <stop offset="72%" stopColor="#3d4a58" stopOpacity="0.45" />
        <stop offset="100%" stopColor="#1e252d" stopOpacity="0.7" />
      </linearGradient>

      <linearGradient id={g("glass-edge")} x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#f5f7fa" stopOpacity="0.85" />
        <stop offset="40%" stopColor="#c9b896" stopOpacity="0.55" />
        <stop offset="100%" stopColor="#6b7a8a" stopOpacity="0.2" />
      </linearGradient>

      <linearGradient id={g("gold-glass")} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f0e6d4" stopOpacity="0.95" />
        <stop offset="35%" stopColor="#c9b896" stopOpacity="0.85" />
        <stop offset="70%" stopColor="#b6a082" stopOpacity="0.75" />
        <stop offset="100%" stopColor="#7a6a52" stopOpacity="0.9" />
      </linearGradient>

      <linearGradient id={g("gold-stroke")} x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#c9b896" stopOpacity="0.25" />
        <stop offset="50%" stopColor="#e8dcc8" stopOpacity="0.95" />
        <stop offset="100%" stopColor="#b6a082" stopOpacity="0.35" />
      </linearGradient>

      <linearGradient id={g("stream")} x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#c9b896" stopOpacity="0" />
        <stop offset="35%" stopColor="#e2e5e8" stopOpacity="0.9" />
        <stop offset="70%" stopColor="#c9b896" stopOpacity="0.85" />
        <stop offset="100%" stopColor="#c9b896" stopOpacity="0" />
      </linearGradient>

      <radialGradient id={g("node")} cx="35%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
        <stop offset="45%" stopColor="#e2e5e8" stopOpacity="0.95" />
        <stop offset="100%" stopColor="#9f9da0" stopOpacity="0.55" />
      </radialGradient>

      <radialGradient id={g("node-gold")} cx="32%" cy="28%" r="70%">
        <stop offset="0%" stopColor="#fff8ee" stopOpacity="1" />
        <stop offset="40%" stopColor="#c9b896" stopOpacity="0.95" />
        <stop offset="100%" stopColor="#8a7355" stopOpacity="0.8" />
      </radialGradient>

      <linearGradient id={g("facet-a")} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.55" />
        <stop offset="50%" stopColor="#c9b896" stopOpacity="0.22" />
        <stop offset="100%" stopColor="#1e252d" stopOpacity="0.35" />
      </linearGradient>

      <linearGradient id={g("facet-b")} x1="100%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#e2e5e8" stopOpacity="0.4" />
        <stop offset="100%" stopColor="#343d4a" stopOpacity="0.55" />
      </linearGradient>

      <linearGradient id={g("plate")} x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#dfe6ee" stopOpacity="0.5" />
        <stop offset="55%" stopColor="#6d7c8c" stopOpacity="0.28" />
        <stop offset="100%" stopColor="#1e252d" stopOpacity="0.55" />
      </linearGradient>

      <linearGradient id={g("plate-gold")} x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#f2e8d8" stopOpacity="0.55" />
        <stop offset="55%" stopColor="#b6a082" stopOpacity="0.35" />
        <stop offset="100%" stopColor="#5c4e3a" stopOpacity="0.5" />
      </linearGradient>

      {/* Specular gloss filter */}
      <filter
        id={g("specular")}
        x="-40%"
        y="-40%"
        width="180%"
        height="180%"
        colorInterpolationFilters="sRGB"
      >
        <feGaussianBlur in="SourceAlpha" stdDeviation="1.2" result="blur" />
        <feSpecularLighting
          in="blur"
          surfaceScale="3"
          specularConstant="1.15"
          specularExponent="28"
          lightingColor="#f5f2ec"
          result="spec"
        >
          <fePointLight x="-40" y="-80" z="120" />
        </feSpecularLighting>
        <feComposite in="spec" in2="SourceAlpha" operator="in" result="specOut" />
        <feComposite
          in="SourceGraphic"
          in2="specOut"
          operator="arithmetic"
          k1="0"
          k2="1"
          k3="0.85"
          k4="0"
        />
      </filter>

      <filter
        id={g("soft-glow")}
        x="-50%"
        y="-50%"
        width="200%"
        height="200%"
        colorInterpolationFilters="sRGB"
      >
        <feGaussianBlur stdDeviation="4.5" result="b" />
        <feMerge>
          <feMergeNode in="b" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>

      <filter
        id={g("gold-glow")}
        x="-60%"
        y="-60%"
        width="220%"
        height="220%"
        colorInterpolationFilters="sRGB"
      >
        <feGaussianBlur stdDeviation="6" result="b" />
        <feColorMatrix
          in="b"
          type="matrix"
          values="1 0 0 0 0
                  0.85 0.7 0.4 0 0
                  0.55 0.45 0.25 0 0
                  0 0 0 0.65 0"
          result="gold"
        />
        <feMerge>
          <feMergeNode in="gold" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>

      <filter id={g("haze")} x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="12" />
      </filter>

      {/* Shine sweep mask helper */}
      <linearGradient id={g("shine")} x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="white" stopOpacity="0" />
        <stop offset="45%" stopColor="white" stopOpacity="0" />
        <stop offset="50%" stopColor="white" stopOpacity="0.9" />
        <stop offset="55%" stopColor="white" stopOpacity="0" />
        <stop offset="100%" stopColor="white" stopOpacity="0" />
      </linearGradient>
    </defs>
  );
}

export function glossUrl(uid: string, name: string) {
  return `url(#${uid}-${name})`;
}
