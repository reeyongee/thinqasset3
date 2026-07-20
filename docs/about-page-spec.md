# About Us Page — Spec

**Status:** v1 shipped  
**Route:** `/about` · **Repo:** `thinqasset2`  
**Archive:** [about-page-research-archive.md](./about-page-research-archive.md) (Codrops catalog, rejected options, reference links)

---

## 1. Goal

Answer: *Who are you? Why did you start this? Who’s running it?*

Home sells capabilities, jurisdictions, philosophy, and stats. **About is the human layer** — story, founders, how you work — not a second pitch deck.

**Visual:** Halston editorial × `thinqasset2` tokens (navy/gold, LP Saturnia, glass, mesh).  
**People:** Alvin + Akash only; teaser + expand; headshots from live site.

**Design read:** B2B fund-management About for GPs/LPs/partners; premium editorial + scroll choreography on **existing** identity (no new fonts/palette).

**Dials** (`ABOUT_DIALS` in `constants.ts`): `DESIGN_VARIANCE 7` · `MOTION_INTENSITY 6` · `VISUAL_DENSITY 4`  
(Spectacle on scroll; instant on click.)

---

## 2. Decisions locked

| Topic | Decision |
|-------|----------|
| Leadership | Alvin + Akash only; TBG / Yash excluded |
| Bios | Teaser + **“Read [name]’s full bio”** expand (CSS, not GSAP body) |
| Headshots | `thinqasset.com/team/*` → `public/thinqasset-assets/team/` |
| Copy voice | About-us-y; no institutional landing-page repeat |
| Jurisdictions | **Globe #2** — scroll-chapter cobe (not home explore globe; not footer card grid) |
| Story | Pinned split-screen image mask + scrolling copy |
| How we work | Layout formation (3 values assemble); new copy, not home Benefits |
| People | Dual portrait scroll-focus + expand |
| Hero | DIY line-mask headline + subline color-reveal; ≤20-word subline |
| SplitText | DIY line-mask markup only |
| Pin budget | 2 major pins (story + jurisdictions) + 1 short values formation pin |
| Eyebrows | **One** on page (`About us` in hero only) |
| CTA | “Talk to us” → `/consultation` (only contact intent on page) |

---

## 3. Home vs About — don’t duplicate

| On **home** | **Not on About** |
|-------------|------------------|
| Service scroll-story, Benefits pillars, stats wall | Same copy or pillar cards |
| Interactive explore globe + click pins | Same globe **mode** (About uses chapter scrub) |
| FAQ, features, testimonials | Capability marketing |
| “Innovative global fund management” hero | Same value-prop headline |

| **About owns** | |
|----------------|--|
| Origin story, POV | Why the firm exists |
| Alvin + Akash as people | Not CV slabs above fold |
| How you work (3 values) | Plain language, not product pillars |
| Where you’re based & **why** | Jurisdiction **narrative** via globe chapters |
| Human CTA | Not “institutional fund solutions” |

**Jurisdictions uniqueness:** Home = user-driven explore toy. About = **documentary scroll-chapter** (scrub rotation + copy crossfade). Office imagery may appear **inside chapter panels** as scrub reveals — not a second footer-style card row.

Link out: [See our global footprint on the home page](/#global-footprint).

---

## 4. Copy voice

**Sound like:** A firm introducing themselves; specific (London 2005, Mauritius, Dubai, CFA); first-person plural where natural; finance-appropriate but conversational.

**Avoid:** Premier / unparalleled / institutional-grade / empower / leverage; home hero and Benefits verbatim; LinkedIn SEO above fold; **em dashes** (`—`) or en-dash separators (`–`) in visible copy; more than one aphoristic “not X, but Y” punch per page; generic “Read more” / “Click here”.

**Landing = what we do. About = who we are and why.**

---

## 5. Page architecture

```
1. HERO          — type-led manifesto (one breath)
2. OUR STORY     — pinned split + mask
3. HOW WE WORK   — formation → stack
4. THE PEOPLE    — dual portrait focus
5. JURISDICTIONS — globe chapter + zone copy
6. CTA           — single-column rest
```

**Dropped:** Philosophy pillar band, stats band (home duplicates).

**Anchors:** `#our-story` · `#how-we-work` · `#the-people` · `#our-jurisdictions`

**Layout rules:** ≥4 distinct layout families (table below). Max **2** consecutive image+text zigzags (story = #1). No split-header pattern (H2 left + explainer floating right). Dark navy theme throughout. One accent (`--ta-gold`).

---

## 6. Master section matrix

Single source for layout, motion, content, and implementation.

| Section | Layout family | Mechanic | Verb | Motivation (one line) | Primary hook / notes |
|---------|---------------|----------|------|----------------------|----------------------|
| **Hero** | Editorial manifesto | Line-mask headline + subline color-reveal; `once: true` | **REVEALS** | Headline arrives before scroll spectacle | `useAboutHeroAnimation` · max 4 text elements · no hero CTA · no scroll cue |
| **Our story** | Pinned split-screen | `clipPath` mask scrub + Ken Burns on image **child** | **WIPES** + **DRIFTS** | Narrative progress tied to image reveal | `useAboutStoryMask` · major pin · mobile = stack + fade-up |
| **How we work** | Formation → stack | Short pin + scrub assemble; `01–03` **in motion only** | **ASSEMBLES** | Values form a system, not a bullet list | `useAboutValuesFormation` · Flip optional |
| **The people** | Dual portrait focus | Scrub `autoAlpha` + `blur(4px)` focus; CSS bio expand | **FOCUS PULL** | Guide attention Alvin ↔ Akash | `useAboutPeopleFocus` · optional short pin |
| **Jurisdictions** | Globe chapter + zone | Pinned scrub globe rotation + chapter `autoAlpha` crossfade | **ORBITS** + **CROSSFADES** | Geography as documentary chapters | `useAboutGlobeChapter` · `Globe` `mode: "chapter"` · major pin · not interactive during pin |
| **CTA** | Single-column rest | Light `createAppearAnimation` + `TransitionLink` | **SETTLES** | Calm handoff before exit | `useAboutCtaAnimation` · `data-transition-item` |

**Beat phases (pinned sections):** Build 0–30% → Breathe 30–70% (one ambient: Ken Burns **or** globe rotation) → Resolve 70–100% (faster exit).

**Handoffs:** Hero→Story soft · Story→Values sharper (rule or snap) · Values→People soft · People→Jurisdictions blur-through · Jurisdictions→CTA dissolve.

Store in `constants.ts`: `ABOUT_DIALS`, `ABOUT_LAYOUT_FAMILIES`, `ABOUT_SECTION_BEATS`.

---

## 7. Copy draft (for sign-off)

### 7.1 Hero

- **Eyebrow:** About us *(only eyebrow on page)*
- **Headline:** The people behind ThinqAsset
- **Subline (≤20 words):** Fund management built by actuaries, CFAs, and operators who stay in the room.

### 7.2 Our story

**Opener:**  
We’re a fund management firm built by practitioners who’ve spent their careers in global banks, consultancies, and fund platforms. We started ThinqAsset because we wanted the people making decisions involved from jurisdiction choice through reporting.

**Paragraph 1:**  
ThinqAsset began with a frustration we’d both felt for years: fund structures get sold as templates, then handed to teams who’ve never met the GP. Alvin and Akash founded the firm around the opposite: stay close to the mandate, tell the truth about trade-offs, and build something that still makes sense after the launch deck is forgotten.

**Paragraph 2:**  
We work from **Mauritius** and **Dubai**, with partnerships across the jurisdictions our clients actually use. When the structure matters, we want to be the call you make.

*Optional pull (scroll reveal):*  
> Fund operations should feel rigorous, transparent, and aligned with the GP’s strategy, not like a black box you inherit.

### 7.3 How we work

| # | Title | Line |
|---|--------|------|
| 1 | We say what we think | Even when the answer is “not that jurisdiction” or “not yet.” |
| 2 | We build to last | We’d rather take an extra week on structure than fix an expensive mistake later. |
| 3 | We stay in the conversation | The same people you meet at the start are the ones on your reporting calls. |

### 7.4 The people

> Two founders. One firm. Decades between them across London, Mauritius, and the Gulf.

**Alvin Joyekurun — teaser:**  
Alvin’s career started in London in 2005, at Deloitte and AON Hewitt, before he brought that actuarial discipline home to Mauritius. He co-founded ThinqAsset to structure funds with the same rigour he once applied to pensions and insurance mandates. Today he’s Senior Executive Officer and Fund Manager across Mauritius and Dubai.  
**Expand:** Read Alvin’s full bio · **Chips:** BSc Actuarial Science (Cass) · CFA · Fellow, Institute of Actuaries, UK

**Akash Baboolall — teaser:**  
Akash has spent his career turning messy cross-border problems into something you can actually run: dealing, asset management, and fund structuring at SBM, IBL, UIL, and Amicorp before ThinqAsset. As CFO and Fund Manager, he still sits across the numbers and the structure, because to them they’re the same conversation.  
**Expand:** Read Akash’s full bio · **Chips:** BSc Finance (Delhi) · MBA (Mauritius) · CFA

### 7.5 Jurisdictions (chapter copy for globe scrub)

**Intro:**  
We didn’t pick domiciles from a brochure. Mauritius and Dubai are where we live and work; Luxembourg and our partnership network are where our clients’ mandates take us.

| Location | Role | Copy |
|----------|------|------|
| **Mauritius** | Direct · operational HQ | This is where ThinqAsset runs day to day. VCC work, fund management, and the treaty network that connects Asia, Europe, and Africa all sit here. Alvin’s been building structures in Mauritius since 2009; it’s the jurisdiction we know from the inside. |
| **UAE (DIFC & ADGM)** | Direct · Gulf-facing | Dubai is our window to the Gulf: capital formation, institutional relationships, and mandates that need DIFC or ADGM clarity. When a client asks “does this work for GCC investors?”, this is usually where the conversation starts. |
| **Luxembourg** | Direct · European anchor | For European investor bases and UCITS-style thinking, Luxembourg is our continental base. Same team, same reporting discipline; different regulatory context. |
| **Singapore** | Partnership | APAC mandates often need a local administrator or partner on the ground. We’ve worked through Singapore for years rather than pretending one domicile fits every Asia-Pacific story. |
| **Cayman / Bermuda** | Partnership | Offshore vehicles still matter for certain strategies. We access Cayman and Bermuda through relationships we trust, when the mandate actually calls for it, not as a menu item. |

**Close:** Want the interactive view? [See our global footprint on the home page](/#global-footprint).

`ABOUT_JURISDICTIONS` in `constants.ts` — share image paths with `FOOTER_OFFICES` where useful; **separate about-us copy**. Images support chapter panels, not a parallel card grid.

### 7.6 CTA

- **Line:** Curious if we’re the right fit? We’d rather have a straight conversation than send a deck into the void.
- **Button:** Talk to us → `/consultation`

---

## 8. Technical approach

```
app/(site)/about/page.tsx
components/about/
  constants.ts              # §7 copy + ABOUT_DIALS + ABOUT_LAYOUT_FAMILIES + ABOUT_SECTION_BEATS
  about.css                 # one documented radius system
  AboutHero.tsx
  AboutStory.tsx
  AboutHowWeWork.tsx
  AboutLeadership.tsx
  AboutJurisdictions.tsx    # globe chapter mode — NOT home explore globe
  AboutCta.tsx
  animations/
    useAboutHeroAnimation.ts
    useAboutStoryMask.ts
    useAboutValuesFormation.ts
    useAboutPeopleFocus.ts
    useAboutGlobeChapter.ts
    useAboutCtaAnimation.ts
    aboutGsapDefaults.ts
```

No `AboutStats.tsx`. No `benefits/constants.ts` reuse. ~~Deprecate `components/about-story/*` after ship.~~ Removed.

**Globe #2:** Extend `Globe` with `mode: "chapter"`, `activeLocationId`, `interactive: false` during pin. Precompute lat/lng → rotation at setup.

**Transitions:** Gate ScrollTrigger on `!isNavigating`; respect `scrollTransitionControls` pause. Read [page-transitions.md](./page-transitions.md).

---

## 9. Guardrails (merged)

### 9.1 When to animate

| Interaction | Animate? | How |
|-------------|----------|-----|
| Hero enter | Once per visit | `ScrollTrigger.once`, line mask |
| Story / values / people / globe | Once scroll-through | Scrub, `ease: "none"` |
| Bio expand | Repeatable | CSS 200ms enter / 140ms exit; `aria-expanded` |
| Buttons | Repeatable | `:active scale(0.97)` only |
| Focus rings, skip links | Never | — |

### 9.2 Motion tokens

| Token | Value | Use |
|-------|--------|-----|
| Scrub | `ease: "none"` | All scroll-linked GSAP |
| UI enter | `power2.out` / `power3.out` | Once-plays, chips |
| Brand ease | `cubic-bezier(0.12, 0.23, 0.17, 0.99)` | Buttons (`hero-btn`) |
| Crossfade blur | ≤8px mid-transition | Portraits, chapters (`CONTENT_BLUR` family) |

Never `ease-in` on UI. Never `transition: all`. No bounce/elastic on globe. Parallax ≤8px on mesh.

### 9.3 GSAP rules

- `useGSAP({ scope })` per section; `runWithScrollBreakpoints` + `reduceMotion`; `scheduleScrollRefresh()` after ST setup
- Properties: `x`/`y`/`autoAlpha`/`clipPath` on scrub paths — not `width`/`height`/`top`/`left`
- Pin **parent**, tween **child**; Ken Burns on child `<img>`, not same element as entrance
- Prefer `fromTo` on scrubbed tweens; no `window` scroll listeners
- DIY line mask: `yPercent: 100` + `autoAlpha`, not SplitText plugin
- Flip plugin only if values formation does true layout morph

**Hero markup:**

```html
<span class="about-line overflow-hidden block">
  <span class="about-line__inner inline-block">The people behind</span>
</span>
```

### 9.4 Design & copy bans

Gradient text · side-stripe borders · identical card grids · hero metric wall · glass on every block · gradient text · scroll cues · decoration marquees · section-number eyebrows · pills on photos · `01 · Section` kickers (except in values **animation**).

### 9.5 Imagery (required)

| Section | Asset |
|---------|--------|
| Story | Real editorial photo (founders/office/place) |
| People | Headshots from live site |
| Jurisdictions | Chapter-linked imagery (paths may reuse `FOOTER_OFFICES`; presentation is chapter scrub, not card grid) |
| Hero | Type + mesh OK |

Descriptive `alt` text. Content **visible without JS** (masks/scrub = progressive enhancement).

### 9.6 Typography

Prose 65–75ch · `text-wrap: balance` on h1–h3 · `text-wrap: pretty` on long copy · display clamp ≤6rem · body contrast ≥4.5:1 on navy · audit `--ta-grey-muted`.

### 9.7 Reduced motion

Remove pins, formation flight, globe scrub, line-mask translate. Stack layouts; static globe with highlighted chapter; bio expand instant or opacity-only. `gsap.matchMedia` + `usePrefersReducedMotion`.

### 9.8 Cohesion with home

Same gold active word color · same blur language · page transition owns enter (don’t re-animate hero on section scroll) · don’t use `hero-word` intro classes.

### 9.9 Rejected (do not import)

ScrollSmoother · 400vh+ pins · Physics2D text · 3D carousel for 2 founders · cursor spring mesh · Elastic Grid · WAC pinned letter blur on hero · CTA marquee strip · horizontal scroll hijack (not in locked stack).

Full catalog + links: [research archive](./about-page-research-archive.md).

---

## 10. Phased execution

| Phase | Work |
|-------|------|
| **0 Plan** | Sign off §7 copy; resolve open items |
| **1 Content** | `constants.ts`, headshots, metadata `About Us \| THINQASSET` |
| **2 Layout** | Static sections per matrix |
| **3 Motion** | Hooks per §6; globe `chapter` mode |
| **4 Polish** | Unified ship checklist below |
| **5 Cleanup** | ~~Remove `components/about-story/*`~~ done |

---

## 11. Open items (resolved)

| Item | Decision |
|------|----------|
| Hero headline | **Locked:** “The people behind ThinqAsset” |
| Pull quote | **Kept** in story section (scroll reveal) |
| How we work | **Locked:** three values in §7.3 |

---

## 12. Ship checklist (unified)

Run once before PR.

**Spec & content**  
- [x] §7 copy in `constants.ts`; zero em/en-dash in visible strings  
- [x] `ABOUT_DIALS`, `ABOUT_LAYOUT_FAMILIES`, `ABOUT_SECTION_BEATS` exported  
- [x] One hero eyebrow; one CTA intent (“Talk to us”)  
- [x] Headshots in `public/thinqasset-assets/team/` from `thinqasset.com/team/*`

**Layout**  
- [x] Six sections use six distinct families (§6 matrix)  
- [x] ≤2 zigzag splits in a row; no split-header sections  
- [x] Hero ≤20-word subline, ≤4 text elements  
- [x] Dark navy theme end-to-end; one gold accent; one radius system documented  
- [x] Section anchors: `#our-story`, `#how-we-work`, `#the-people`, `#our-jurisdictions`

**Motion**  
- [x] Each hook has motivation one-liner; verbs match behavior  
- [x] Scrub uses `ease: "none"` + `fromTo` where scrubbed  
- [x] Pin parent / tween child; Ken Burns on image child only  
- [x] Bio expand CSS-only; buttons `scale(0.97)`  
- [x] Reduced-motion fallbacks per §9.7  
- [x] `!isNavigating` before ST creation; `scheduleScrollRefresh` after setup  
- [x] Build / breathe / resolve on pinned beats; handoffs per §6

**Design & a11y**  
- [x] Real images + alts; HTML readable without JS  
- [x] Body contrast on navy; CTA contrast on backgrounds  
- [x] Prose max-width ~65–75ch  
- [x] No banned patterns (§9.4)  
- [ ] `/impeccable audit` on `components/about/` (optional polish pass)

**Cleanup**  
- [x] `components/about-story/*` removed (ADM placeholder)

---

## 13. Implementation

Live at `app/(site)/about/page.tsx` → `AboutPageContent`. Assets: `public/thinqasset-assets/team/alvin-joyekurun.jpg`, `akash-baboolall.jpg` (sourced from live site Dec 2022 uploads).
