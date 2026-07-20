# Page transitions — agent guide

This document describes how to add new routes to thinqasset2 so they work with the **soft-dissolve** page transition system. Read this before building any new page.

## Architecture (three separate layers)

Do not merge these concerns on new pages.

| Layer | Scope | Owner |
|-------|--------|--------|
| **Page transitions** | All internal navigation | `TransitionProvider`, `softDissolve`, `data-transition-*` |
| **Hero intro** | Home (`/`) cold load only | `HeroIntro`, `introControl`, CSS in `globals.css` |
| **Scroll deferral** | Home scroll story only | `waitForScrollStoryReady` in `useScrollStoryTimeline` |

Inner/marketing pages only need the **page transition** layer. They must **not** wrap content in `HeroIntro` or add intro CSS classes (`hero-word`, `hero-fade-up`, etc.) unless you are deliberately animating the home hero.

---

## Already wired globally (do not duplicate)

**Root layout** (`app/layout.tsx`) + **`(site)` route group** (`app/(site)/layout.tsx`):

- `TransitionProvider` wraps all `{children}` (root)
- `.transition-veil` overlay for dissolve
- Inline `<head>` script for intro session on hard refresh
- `data-transitioning` / `aria-busy` toggled during nav
- Cold-load enter is skipped (no veil on first paint)
- ScrollTrigger pause/resume during transitions
- **`SiteShell`** — nav (`SiteNav`), `<main className="site-content">`, footer, progressive blur (top + bottom)

Pages under `app/(site)/` inherit site chrome automatically. Opt out per route via `lib/site-chrome/config.ts` (`chrome: false`). For fully chromeless route trees, use `app/(bare)/` with a minimal layout.

**New pages inherit transitions and chrome automatically.** You only opt page content into the transition via markup and links.

---

## Site chrome

| Piece | Location | Notes |
|-------|----------|--------|
| Nav | `components/site-chrome/SiteNav.tsx` | `data-transition-nav` on `.hero-nav-bar`; internal links use `TransitionLink` |
| Main wrapper | `app/(site)/layout.tsx` → `SiteShell` | `main.site-content` is the transition root |
| Footer | `components/footer/Footer.tsx` | Rendered by `SiteShell` after page content |
| Progressive blur | `components/progressive-blur/ProgressiveBlurVeil.tsx` | Home: scroll-story gated; inner pages: after scroll past top |

**Disable chrome for one route** — add to `ROUTE_OVERRIDES` in `lib/site-chrome/config.ts`:

```ts
"/my-page": { chrome: false },
```

---

## Building a new inner page (step by step)

### 1. Page file

Create `app/(site)/<route>/page.tsx` as a Server Component unless you need client hooks.

### 2. Required DOM structure

Every transition-aware inner page must wrap primary content in `data-transition-page`. Nav, `<main>`, footer, and blur come from `SiteShell` — do not add them on the page.

```tsx
import { TransitionLink } from "@/components/transition/TransitionLink";

export default function MyPage() {
  return (
    <section data-transition-page className="...">
      {/* content with data-transition-text / data-transition-item */}
    </section>
  );
}
```

| Requirement | Why |
|-------------|-----|
| Page under `app/(site)/` | Inherits `SiteShell` (nav, main, footer, blur) |
| `data-transition-page` on primary content wrapper | Tells `softDissolve` to stagger text/items instead of treating the page as “home hero” |

Reference implementations: `app/(site)/consultation/page.tsx`, `app/(site)/about/page.tsx`.

### 3. Mark animatable content

GSAP discovers targets by **data attributes**, not React component names.

```tsx
<h1 data-transition-text="headline" className="...">
  Page title
</h1>

<p data-transition-text="body" className="...">
  Supporting copy
</p>

<TransitionLink href="/somewhere" data-transition-item className="...">
  CTA label
</TransitionLink>
```

| Attribute | Value | Role in timeline |
|-----------|--------|------------------|
| `data-transition-text` | `headline` | Primary heading; enters with headline timing |
| `data-transition-text` | `body` | Body copy; staggered with other text |
| `data-transition-item` | (boolean) | Buttons, cards, CTAs; staggered after text |

**Rules:**

- Put attributes on the **element that should move** (the visible text node or button), not a distant parent.
- Include at least one `data-transition-text` or `data-transition-item` inside `data-transition-page`. A page with zero targets still transitions (veil + nav) but content won’t stagger in.
- Do not put `data-transition-text` on the nav — nav is handled via `data-transition-nav` on `.hero-nav-bar`.

Selectors live in `lib/transition/constants.ts` (`TRANSITION_SELECTORS`).

### 4. Internal links

Use `TransitionLink` for all in-app routes:

```tsx
import { TransitionLink } from "@/components/transition/TransitionLink";

<TransitionLink href="/consultation">Consultation</TransitionLink>
```

`TransitionLink` delegates to `next-transition-router` and prefetches on hover/focus.

**Use a plain `<a>` for:**

- `mailto:`, `tel:`
- External `http(s):` URLs
- Hash-only links on the same page (`/#section`)

Nav consultation button may still be `mailto:` — only hero CTAs that should animate routes need `TransitionLink`.

### 5. Metadata

Add `export const metadata` (or `generateMetadata`) as usual. Transitions do not require special metadata.

---

## Home page (`/`) — special case

Home does **not** use `data-transition-page`. Instead:

- `Hero` wraps nav + scroll story in `HeroIntro` (cold-load CSS intro only)
- Leave/enter targets `.scroll-story-hero-content` for the hero block
- Below-fold sections (`NumbersSection`, `FeaturesSection`, etc.) trail in on **return to home** via `getHomeShellSections()` in `softDissolve.ts`

When editing home:

- Keep `HeroIntro` only in `components/hero/Hero.tsx`
- Do not add `data-transition-page` to home
- GSAP scroll story must keep calling `waitForScrollStoryReady()` before creating ScrollTriggers

---

## Hero intro (home only)

**Do not add intro machinery to inner pages.**

Cold-load intro is gated by `<html>` attributes:

| Attribute | Meaning |
|-----------|---------|
| `data-intro-ready` | CSS intro may run |
| `data-intro-played` | Intro finished; CSS animations disabled |
| `data-skip-intro` | Intro frozen mid-flight (during page transition) |
| `data-transitioning` | Page transition active; intro CSS disabled |

Session: `sessionStorage.heroIntroPlayed` + inline reload script in `app/layout.tsx`.

Key APIs (`lib/transition/introControl.ts`):

- `guardHeroIntroReplay()` — called from `HeroIntro` layout effect; arms intro once via DOM attrs
- `settleIntroDom()` — sets `data-intro-played` + session when intro completes
- `markIntroPlayed()` — called after transition enter completes

**If you add a new home-only animation:** extend CSS under `html[data-intro-ready]:not([data-intro-played])` in `globals.css` and ensure completion still flows through `HeroIntro` → `signalIntroCompleteOnce()`.

---

## Deferring GSAP / ScrollTrigger on a page

If a page mounts GSAP or ScrollTrigger in `useEffect` / `useGSAP`, gate initialization on transition state:

```tsx
import { useTransitionAnimation } from "@/components/transition/TransitionAnimationContext";

const { isNavigating, introComplete } = useTransitionAnimation();

// Home scroll story: use waitForScrollStoryReady() (intro + idle)
// Other pages: usually enough to wait until !isNavigating
```

Home pattern (required):

```tsx
import { waitForScrollStoryReady } from "@/lib/transition/waitForHeroIntro";

void waitForScrollStoryReady().then(() => {
  // create ScrollTriggers here
});
```

Inner pages rarely need this unless they pin scroll or run scroll-linked GSAP on mount.

---

## Transition flow (what happens on click)

1. **Leave** — `phase: leaving`, `data-transitioning`, `data-skip-intro`, scroll paused  
   Nav fades → content fades + blurs → veil covers  
2. **Route change** — Next.js renders new page; `waitForRouteReady()` waits for DOM + fonts (not all images)  
3. **Enter** — incoming content hidden, veil holds, then veil lifts → nav settles → content staggers in  
4. **Complete** — styles reset, scroll resumed, `data-intro-played` set, `phase: idle`

Subscribe in client components via:

```tsx
import { useTransitionAnimation } from "@/components/transition/TransitionAnimationContext";

const { phase, isNavigating, skipIntro, introComplete } = useTransitionAnimation();
```

Store implementation: `lib/transition/transitionStore.ts` (`useSyncExternalStore`).

---

## Reduced motion

`TransitionProvider` reads `usePrefersReducedMotion()` and runs shortened timelines (`softDissolveLeaveReducedMotion` / `softDissolveEnterReducedMotion`). No per-page setup required.

---

## Known limitations

| Limitation | Notes |
|------------|--------|
| Browser back/forward | `next-transition-router` does not animate history navigation |
| Hash-only same-page jumps | Skipped in `leave` (`isHashOnlyNavigation`) |
| Lazy images | `waitForRouteReady` intentionally does **not** wait for all images (home has many; caused hangs) |
| React Strict Mode (dev) | Intro uses DOM attrs as source of truth to avoid double-play; do not reintroduce module-only guards |

---

## New page checklist

Before considering a page done, verify:

- [ ] Page lives under `app/(site)/` (or chrome disabled intentionally in `lib/site-chrome/config.ts`)
- [ ] Primary content is inside `data-transition-page` (inner pages)
- [ ] Headline, body, and CTAs have `data-transition-text` / `data-transition-item`
- [ ] Internal navigation uses `TransitionLink`
- [ ] No `HeroNav` / `SiteNav` / `<main>` / `<Footer>` on the page itself
- [ ] No `HeroIntro` on non-home routes
- [ ] No hero intro CSS classes (`hero-word`, `hero-fade-up`, `hero-bg-scale`) on inner pages unless intentional
- [ ] Any on-mount ScrollTrigger/GSAP waits for `!isNavigating` (or `waitForScrollStoryReady` on home)
- [ ] Click through from home → new page → back; no flash, no stuck veil, no intro replay

---

## Anti-patterns (will cause regressions)

| Don't | Why |
|-------|-----|
| Call `setState` inside `TransitionProvider` enter/leave | Caused infinite re-render loops; provider uses stable `useCallback` + external store |
| Set `data-intro-ready` from `useEffect` on inner pages | Intro is home-only; arming on other routes replays or fights transitions |
| Use raw `next/link` for internal animated routes | Bypasses `next-transition-router` |
| Force `opacity: 0` on `data-transitioning` for intro elements | Use `animation: none` only (see `globals.css`) |
| Wait for all `img.decode()` in `waitForRouteReady` | Hangs home return transition |
| Wrap inner pages in `HeroIntro` | Double motion + intro/transition ownership conflict |

---

## File reference

| Path | Purpose |
|------|---------|
| `components/transition/TransitionProvider.tsx` | Router leave/enter, veil, state patches |
| `components/transition/TransitionLink.tsx` | Prefetching internal transition links |
| `components/transition/TransitionAnimationContext.tsx` | `useTransitionAnimation()` hook |
| `lib/transition/softDissolve.ts` | GSAP leave/enter timelines |
| `lib/transition/constants.ts` | Selectors + timing constants |
| `lib/transition/waitForRouteReady.ts` | DOM/fonts ready before enter |
| `lib/transition/waitForHeroIntro.ts` | `waitForScrollStoryReady()` for home |
| `lib/transition/introControl.ts` | Intro session + DOM settle |
| `lib/transition/transitionStore.ts` | External transition state |
| `lib/transition/scrollTransitionControls.ts` | Pause/resume ScrollTrigger |
| `components/hero/HeroIntro.tsx` | Home intro completion listener |
| `components/site-chrome/SiteShell.tsx` | Nav, main, footer, blur for `(site)` routes |
| `components/site-chrome/SiteNav.tsx` | Global nav (`data-transition-nav`) |
| `lib/site-chrome/config.ts` | Per-route chrome opt-out |
| `app/globals.css` | Intro CSS gates + `data-transitioning` overrides |
| `app/(site)/consultation/page.tsx` | Canonical inner-page example |
| `app/(site)/about/page.tsx` | About page with `AboutPageContent` (`components/about/`) |

---

## Timing tweaks

Edit constants in `lib/transition/constants.ts` (durations, stagger, blur, easing). Do not hardcode timing in page components.

---

## Future improvements (optional)

Not implemented yet; safe to add when the site grows:

- **`TransitionPage` / `TransitionReveal` components** — wrappers that apply `data-transition-*` attrs so new pages cannot forget the contract
- **Route profiles** — `home` | `inner` | `minimal` instead of implicit branches in `softDissolve.ts`
- **Dev-only validation** — warn when `site-content` lacks transition targets or internal links skip `TransitionLink`

When adding those, update this document.
