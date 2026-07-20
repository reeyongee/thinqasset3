# Hark Values — Motion Capture Spec

Source: [harkcap.com/about-us](https://www.harkcap.com/about-us) “Our Values” Lotties  
Captured via Chrome DevTools MCP (live SVG sampling) + Lottie JSON keyframe extraction.

**Shared language**

| Token | Value |
|---|---|
| FPS | **60** |
| Primary ease (move) | `cubic-bezier(0.85, 0, 0.15, 1)` ≈ strong ease-in-out |
| Hold / linear-ish | `cubic-bezier(0.167, 0.167, 0.833, 0.833)` |
| Stroke (rings) | `rgb(35,94,128)` or `rgb(17,65,103)` |
| Accents | white `#fff` dots / trim strokes |
| Loop | all 5 loop |
| Renderer | SVG |

Segment cadence that repeats across Experience / Partnerships: **1.5s move → 0.5s hold → 1.5s move** (or similar).

---

## 1. Experience — `04_Experience.json`

| | |
|---|---|
| Canvas | 620×620 |
| Duration | **7.0s** (420 frames) |
| Live motion | Concentric rings + moving white dot travel vertically; trim-path on vertical connector |

**Structure**

- `Circle_01` — static outer ring (no animated props)
- `Circle_02 / 03 / 04` — nested rings, **Y-position** animates (same timing, different amplitudes)
- `Moving Dot` — white filled circle rides the same Y path
- `Static Dot` — fixed
- `Vector` — white stroke with **trimStart / trimEnd** (draw-on vertical line)

**Y travel (center ≈ 310)**

| Layer | Top Y | Mid Y | Bottom Y | Amplitude |
|---|---|---|---|---|
| Circle_04 / Moving Dot | 114.86 | 310 | 505.14 | ±195 |
| Circle_03 | 179.91 | 310 | 440.09 | ±130 |
| Circle_02 | 244.96 | 310 | 375.05 | ±65 |

**Timeline (sec)**

```
0.25 → 1.75   move top → center     ease(0.85,0,0.15,1)   1.5s
1.75 → 3.25   move center → bottom  ease(0.85,0,0.15,1)   1.5s
3.25 → 3.75   HOLD at bottom                              0.5s
3.75 → 5.25   move bottom → center  ease(0.85,0,0.15,1)   1.5s
5.25 → 6.75   move center → top     ease(0.85,0,0.15,1)   1.5s
```

**Trim path (connector)**

- trimEnd: 100→50 (0.25–1.75), hold 50 until 5.25, then 50→100 (5.25–6.75)
- trimStart: 50→0 (1.75–3.25), hold, then 0→50 (3.75–5.25)

**Live sample (Chrome):** group Y deltas matched amplitudes (~130 / ~260 / ~390) over 4.5s — confirms JSON.

---

## 2. Partnerships — `01_Partnerships.json`

| | |
|---|---|
| Canvas | 655×615 |
| Duration | **10.5s** (630 frames) |
| Live motion | 3 static rings in triangle; white dots hop between vertices; connector trim-paths; **Circle_Transition** ellipse wipe bands |

**Static triangle centers (approx)**

- Bottom-right ≈ `(490, 449)`
- Bottom-left ≈ `(165, 449)`
- Top ≈ `(327.5, 166)`

**White dots (Shape 10 & 11) — chase around triangle**

Same 1.5s ease moves + 2.0s holds, phase-offset by 1.5s:

```
Dot A:  BR → BL (0.25–1.75) → hold → Top (3.75–5.25) → hold → BR (7.25–8.75)
Dot B:  BR → BL (1.75–3.25) → hold → Top (5.25–6.75) → hold → BR (8.75–10.25)
```

**Connector trim-paths (Shape 12/13/14)** — each edge draws with 1.5s trimEnd then 1.5s trimStart wipe, staggered every 3.5s:

| Edge | trimEnd | trimStart |
|---|---|---|
| 12 | 0.25–1.75 | 1.75–3.25 |
| 13 | 3.75–5.25 | 5.25–6.75 |
| 14 | 7.25–8.75 | 8.75–10.25 |

**Circle_Transition precomps** (3×, each ~3s window)

- Active windows: **0.25–3.25s**, **3.75–6.75s**, **7.25–10.25s**
- Motion: horizontal **ellipse squash** (`size` 325×325 → 0×325 → 325×325) while translating X across a clipped band
- Opacity pulse: 0 → 100 in **0.33s**, hold, out in **0.33s**
- Staggered child ellipses create the “wipe through circle” look

**Live sample:** display flips on transition groups at ~2.1s / 3.5s / 5.1s / 5.6s / 7.1s — matches precomp windows.

---

## 3. Innovation — `02_Innovation.json`

| | |
|---|---|
| Canvas | 655×755 |
| Duration | **1.5s** (90 frames) — short, snappy loop |
| Live motion | Block/diamond pieces **shift apart then snap back**; many path morphs |

**Live capture (1.5s full cycle)**

- Multiple groups translate on X (~±108px) and Y (~62–187px)
- Pattern: settle near center → hold → jump outward → ease back
- 11+ morphing paths per cycle

Keyframe JSON shows nested `Block Shift` precomp with position + trimStart/trimEnd on many vectors over an extended 0–7.5s internal timeline (composition time vs main 1.5s loop — main comp is 90 frames).

**Rebuild tip:** treat as a **grid of diamond/block shapes** that expand from center and retract, 1.5s loop, aggressive ease.

---

## 4. Trust — `05_Trust.json`

| | |
|---|---|
| Canvas | 400×750 |
| Duration | **4.5s** (270 frames) |
| Live motion | Stacked blocks assemble / disassemble vertically |

**Live capture**

- Groups primarily move on **Y** (deltas ~28–171px)
- Two `BlockBuild` precomps
- Typical beat: hold assembled → drop/shift (~3.0–3.5s) → reassemble
- Morphing paths on a few edges (trim builds)

Keyframe pattern: short 0.25→1.75s build segments with trim paths + position; later 2.5→4.0s shift of whole `BlockBuild 2`.

**Rebuild tip:** vertical stack of outlined blocks; draw-on edges + Y settle; 4.5s loop.

---

## 5. Flexibility — `03_Flexibility.json`

| | |
|---|---|
| Canvas | 610×755 |
| Duration | **6.333s** (380 frames) |
| Live motion | Shapes **orbit / flip** around center via rotation + mirrored scale |

**Live capture (strongest rotational motion)**

- Null controller: position + rotation
- Groups show `scaleX/Y` flipping **1 → -1** and `b` (skew/rotation component) 0 → 1
- Large orbital paths: Δx ~150–545px, Δy ~300–560px over the sample
- Morphing paths on several vectors

Keyframe: Null position 0.25→6.08s; rotation 1.92→4.42s; child vectors with trim paths 0.33→6.0s.

**Rebuild tip:** parent null rotates ~180° while children counter-transform; trim-path strokes; 6.3s loop.

---

## GSAP recreation cheatsheet

```ts
const EASE_MOVE = "cubic-bezier(0.85, 0, 0.15, 1)"; // or CustomEase
const EASE_HOLD = "cubic-bezier(0.167, 0.167, 0.833, 0.833)";
const MOVE = 1.5;
const HOLD = 0.5;
```

**Experience (simplest first):**

1. 4 concentric `<circle>` strokes  
2. GSAP timeline: tween `attr` cy (or `y`) with staggered amplitudes  
3. White dot follows Circle_04 Y  
4. Vertical line: `strokeDashoffset` mapped from trimStart/trimEnd  
5. `repeat: -1`, duration 7  

**Partnerships:** static 3 rings + 2 dots on triangle path + trim connectors + optional ellipse-wipe sequence (hardest part — can simplify to just dots + lines for v1).

---

## Files in this folder

| File | Purpose |
|---|---|
| `summary.txt` | Human-readable full keyframe dump |
| `keyframes.json` | Machine-readable extracted props + easing |
| `*_Experience.json` etc. | Original Lottie sources (reference only — don’t ship) |

**Note:** Original JSON is Hark/Malvah IP. Use for timing/geometry reference when building ThinqAsset-native SVG+GSAP versions.
