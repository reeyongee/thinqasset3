# About Page — Research Archive

**Purpose:** Exploratory catalog, references, and rejected options.  
**Canonical spec:** [about-page-spec.md](./about-page-spec.md)

This file preserves research that informed decisions but is **not** the build contract.

---

## Constraints (context)

| Constraint | Implication |
|------------|-------------|
| Home has **cobe globe** (explore + pins) | About uses **Globe #2** chapter scrub — different mode, not duplicate UX |
| Home has **pinned scroll-story** | About: 2 major pins + 1 short formation pin max |
| Stack | GSAP + ScrollTrigger; gate `!isNavigating`; `prefers-reduced-motion` |
| Brand | Navy/gold mesh — not beige Halston skin |

**Rule of thumb:** One wow mechanic per section; vary so the page isn’t six identical pins.

---

## Primitive library (ranked catalog)

| Primitive | Source | Wow | Risk |
|-----------|--------|-----|------|
| Line-mask text reveal | [Codrops stagger text](https://tympanus.net/codrops/2020/06/17/making-stagger-reveal-animations-for-text/) | High | DIY masks chosen over SplitText plugin |
| Scroll-scrubbed clip-path | [Codrops clip-path hub](https://tympanus.net/codrops/hub/tag/clip-path/) | High | GPU; Safari test |
| Pinned split-screen mask | [Freefrontend split mask](https://freefrontend.com/code/pinned-split-screen-mask-reveal-2026-02-22/) | Very high | **Locked for story** |
| Layout formation | [Layout Formations](https://tympanus.net/codrops/2024/09/18/exploration-of-on-scroll-layout-formations/) | High | **Locked for values** |
| GSAP Flip layout | [Flip scroll layouts](https://tympanus.net/codrops/2023/07/20/scroll-based-layout-animations/) | High | Optional for values only |
| Stacked team cards | [team-reveal](https://github.com/jmarellanes/gsap__section--team-reveal) | High | Adapted → dual portrait focus |
| Horizontal scroll chapter | [Codrops horizontal](https://tympanus.net/codrops/2023/07/20/scroll-based-layout-animations/) | Medium-high | Rejected (one per page; not in stack) |
| Scroll-scrubbed globe | [Codrops Three.js scroll](https://tympanus.net/codrops/2022/01/05/crafting-scroll-based-animations-in-three-js/) | Very high | **Locked via cobe chapter mode** |
| Elastic Grid / ScrollSmoother | [Elastic Grid](https://tympanus.net/codrops/2025/06/03/elastic-grid-scroll-creating-lag-based-layout-animations-with-gsap-scrollsmoother/) | Medium | **Rejected** — not in repo |
| Sticky Grid 400vh+ | [Sticky Grid](https://tympanus.net/codrops/2026/03/02/sticky-grid-scroll-building-a-scroll-driven-animated-grid/) | Very high | **Rejected** — pin fatigue |
| 3D carousel | [3D Carousel](https://tympanus.net/codrops/2025/05/07/on-scroll-3d-carousel/) | High | **Rejected** — 2 founders only |
| SVG clip-path typography | [SVG clip text](https://tympanus.net/codrops/2024/01/10/experimental-on-scroll-text-animations-with-svg-clip-path/) | High | Rejected for hero |
| Scroll color reveal | `ScrollColorRevealText` (repo) | Medium | **Used** for subline / pull quote |

### Already in repo (extend)

`Globe` + `useGlobeAnimations` · `ScrollOrchestratorProvider` · `softDissolve` · `ProgressiveBlurVeil` · `SiteAtmosphere` · `createAppearAnimation` · feature card CSS flip (≠ GSAP Flip)

---

## Section explorations (options considered)

### Hero

| Option | Mechanism | Outcome |
|--------|-----------|---------|
| **A** | Line-mask + color-reveal subline | **Locked** |
| B | WAC blur letter stagger | Rejected — extra pin |
| C | SVG clip-path on single word | Rejected — maintenance |

Avoid `hero-word` classes (home intro ownership).

### Story

| Option | Mechanism | Outcome |
|--------|-----------|---------|
| **A** | Pinned split-screen mask, 2–3 photos | **Locked** |
| B | Halston split + color-reveal quote | Fallback / reduced motion |
| C | Flip layout morph | Rejected |

Assets: moody office/people photography (`/assets/benefits/*`, `/assets/stats/*` candidates). Mobile: interleave image → text.

### How we work

| Option | Mechanism | Outcome |
|--------|-----------|---------|
| **A** | Layout formation + `01–03` in motion | **Locked** |
| B | Horizontal scrub panels | Rejected — scroll budget |
| C | Stagger fade-up | Reduced-motion fallback |

Twist considered: strike-through template phrases → real values (typography only). Not locked.

### People

| Option | Mechanism | Outcome |
|--------|-----------|---------|
| **A** | Dual portrait scrub focus + CSS expand | **Locked** |
| B | Flip portrait swap | Rejected |
| C | Clip-path wipe handoff | Rejected |

Micro polish considered: headshot hover scale 1.02 + gold border draw; chips stagger on expand. Bio expand stays **CSS**, not line-mask body.

### Jurisdictions

| Option | Mechanism | Outcome |
|--------|-----------|---------|
| **A** | Scroll-synced cobe chapter + copy crossfade | **Locked** |
| B | Split: globe 40% + sticky chapter text | Variant layout inside A |
| C | Elastic office image grid + small globe | **Rejected** — repeats footer/grid pattern |
| D | Full Three.js earth | Rejected unless cobe insufficient |

Optional: arc lines Mauritius ↔ Dubai ↔ Luxembourg on scrub. Mobile: stack chapters; static globe band or snap.

**Not chosen:** Static editorial card row duplicating footer office presentation (user: no repeating elements).

### CTA

| Option | Mechanism | Outcome |
|--------|-----------|---------|
| **A** | Line-mask + `hero-btn` + transition attrs | **Locked** |
| B | Gold marquee strip | **Rejected** (decoration strip ban) |

---

## Award stack (locked path)

```
Hero          → Line-mask + subline color-reveal
Our story     → Pinned split-screen mask
How we work   → Layout formation
The people    → Dual portrait focus
Jurisdictions → Scroll-chapter globe
CTA           → Mask + TransitionLink
```

Pin budget: story + jurisdictions (major); values (short); people (optional short).

---

## Halston × thinqasset2 mapping

| Halston (v1) | About usage |
|--------------|-------------|
| `ScrollColorRevealText` | Hero subline, story pull quote, chapter titles |
| Split content grid | Story structure (mask variant) |
| Image parallax | Story + chapter imagery |
| `FadeInView` | CTA, chips, reduced-motion fallback |
| ~~Section eyebrows~~ | **Rejected** — one hero eyebrow only per spec |

| thinqasset2 | About usage |
|---------------|-------------|
| `--ta-gold` active words | Typography moments |
| `font-display` | Hero, section headers |
| Glass / `--token-btn-border` | People surfaces, chapter panels (one treatment/section) |
| Mesh atmosphere | Ambient; ≤8px hero parallax |
| Transition attrs | Hero + CTA lanes |

---

## Codrops & reference links

- [On-Scroll Layout Formations](https://tympanus.net/codrops/2024/09/18/exploration-of-on-scroll-layout-formations/)
- [Sticky Grid Scroll](https://tympanus.net/codrops/2026/03/02/sticky-grid-scroll-building-a-scroll-driven-animated-grid/)
- [Scroll-Based Layout Animations (Flip)](https://tympanus.net/codrops/2023/07/20/scroll-based-layout-animations/)
- [Staggered 3D Grid](https://tympanus.net/codrops/2024/10/16/staggered-3d-grid-animations-with-scroll-triggered-effects/)
- [Elastic Grid Scroll](https://tympanus.net/codrops/2025/06/03/elastic-grid-scroll-creating-lag-based-layout-animations-with-gsap-scrollsmoother/)
- [Three.js scroll sections](https://tympanus.net/codrops/2022/01/05/crafting-scroll-based-animations-in-three-js/)
- [Clip-path hub](https://tympanus.net/codrops/hub/tag/clip-path/)
- [WAC blur reveal](https://www.builder.io/blog/gsap-reveal)
- [Pinned split-screen mask](https://freefrontend.com/code/pinned-split-screen-mask-reveal-2026-02-22/)
- [Horizontal clip stack (Tuts+)](https://webdesign.tutsplus.com/create-horizontal-scroll-animations-with-gsap-scrolltrigger--cms-108881t)

**Inspiration sites:** Stewart & Partners (formation) · Max & Tiber (sticky grid) · VRTL WORLD (Flip)

---

## Emil review table (demo → ship)

| Demo habit | Ship on About |
|------------|---------------|
| `scale(0)` entrances | `yPercent` mask or `translateY` + opacity |
| WAC pinned letter blur hero | Single-play line-mask; no extra hero pin |
| `transition: all` | Specific properties, 160–200ms |
| `ease-in` on expands | `ease-out`; exit faster |
| Crossfade without blur | Brief `blur(4px)` mid-crossfade |
| Hover scale on touch | `@media (hover: hover) and (pointer: fine)` |
| Bouncy globe | Scrub / damped only |
| 6+ pins | 2 major + 1 short |
| Keyframes on bio expand | CSS grid `0fr` → `1fr` |

---

## GSAP review table

| Before | After |
|--------|--------|
| `opacity: 0` hide | `autoAlpha: 0` |
| `delay` chains | Timeline positions |
| Stacked `from()` same prop | `immediateRender: false` on later tweens |
| Scrub with easing | `ease: "none"` |
| `height` image reveal | `clipPath` / `yPercent` |
| Pin + tween same `x` | Pin parent, tween child |
| Global `gsap.defaults` | Scoped `aboutGsapDefaults.ts` |

---

## Lens stack (reference)

Emil → should it move? · GSAP → how wired? · HyperFrames → beat verb? · Impeccable → human / slop? · design-taste → layout families / hero / pre-flight?

All merged into [about-page-spec.md](./about-page-spec.md) §9 and §12.
