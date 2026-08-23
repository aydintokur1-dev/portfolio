# Reference analysis — three Framer templates
_Measured, not eyeballed: live previews loaded in headless Chrome, scrolled and screenshotted; computed styles, fonts, colours and animation curves sampled at runtime. Screenshots in `raw/refs/shots/`._

## The tension to resolve first

All three templates are **light**. You asked for **dark-first**. That's not a problem — but it means we take the *qualities* of these references, not their palettes. Each one is a lesson in one thing:

| Template | What you said | What it actually teaches |
|---|---|---|
| **Creatie** | "fun and warm" | Warmth comes from *physical metaphors and imperfection*, not from colour |
| **LaunchFolio** | "animations and interactions" | One signature motion, used consistently, beats ten different ones |
| **Kirk** | "header name written style" | The name as a *wordmark*, not a heading |

---

## 1. Creatie — "fun and warm"

`creatiie.framer.website` · by Talha Nawaz · Mona Sans + Inter

### What it is
A light, maximalist, **paper-and-stickers** portfolio. Photographic hero (a rolling-hills "Bliss" homage) with a huge uppercase headline and draggable sticker-tags on it. Content sections sit on a cream paper background with a faint graph-paper grid. Everything is tilted a few degrees. macOS-dock navigation at the bottom.

### Where the warmth actually comes from — measured
This is the important part, because *none of it is colour*:

1. **Physical metaphors.** Stat cards have folded corners and a red push-pin. Project cards are tilted polaroids with paper clips. Section labels are stickers with a coloured icon dot. The FAQ is sticky notes. Everything looks like it could be picked up.
2. **Deliberate imperfection.** Cards rotate ±3–6°. Tags overlap the headline. Doodles (squiggles, arcs, confetti) scattered at low density. The grid gives it a notebook feel.
3. **Colour-coding as a system.** Service rows: `#d9e7f5` blue · `#f3eebe` yellow · `#dcf5e0` green · `#ebe6f3` lavender · pink — pastel tints on cream `#f6f4ec`, each with a matching saturated icon. It reads as warm because it's *organised* warmth.
4. **One body type, one display type.** Mona Sans 800 uppercase for display, `-0.04em` tracking, `85–100%` line-height. Inter 500 for everything else. The heavy tracking is what makes it feel confident instead of childish.
5. **Eyes that follow the cursor.** Two black dots (`•  •`) in several sections track the pointer. **This is a proto-mascot** — the cheapest possible version of what our cat does, and it proves the idea lands.

### Take
- The **sticker/tag system** for project metadata — role, year, stack as tilted pills with an icon dot. On dark, these become the main source of colour.
- **Tilt and overlap** as the imperfection budget — ±2–4° max, on cards only, never on text blocks.
- **Pastel-on-base colour coding** for project tiers / service categories — rebuilt as tints on warm dark.
- **Graph-paper texture** — very faint grid or dot-grid on the dark base. Cheap, instantly "notebook."
- **The cursor-following eyes** as confirmation: the cat's cursor-tracking is the right call, and it should be the first thing we prototype.

### Leave
- The photographic hero. On dark it fights the palette; on a design-engineer site, the hero should be the type and the cat.
- The macOS dock nav. Cute once, then it's a novelty with no information. LaunchFolio's pill is the better nav.
- Uppercase everything. Reads as *loud*; we want *warm*. One uppercase element (the name) is enough.
- The doodle density. Halve it.

---

## 2. LaunchFolio — "animations and interactions"

`launchfolio.framer.website` · by Joseph Alexander · Switzer + Inter Display

### What it is
Clean, white (`#fafafa`), conversion-focused. Two-tone headings — first line grey, second line black. Lenis smooth scroll. Floating pill nav that morphs on scroll. The motion is *restrained and repeated*, which is why it feels coherent.

### The signature motion — measured live

**Word-by-word blur reveal.** I sampled computed styles every 80ms while scrolling a heading into view:

```
each word:  filter blur(5px) → 0  ·  opacity 0 → 1  ·  translateY(10px) → 0
settle:     ~750ms per word
stagger:    ~100ms between words
curve:      fast start, long tail — ease-out shape
```

At 320ms the first word is at 60% opacity while the third is at 15%. That overlap is the whole effect — words *condense* rather than appear.

**The nav pill.** Fixed, top-centre. `550px` wide at scroll 0 showing avatar + name + five links; collapses to `233px` ("Joseph Alexander •••") once scrolled. Transition is `all` — which `07-MOTION.md` forbids; we name the properties.

**The CTA pill.** "Speak to me — Email or book a call", bottom-centre, hidden at `translateY(100px)`, slides to `0` after the first scroll. Appears exactly when the visitor has shown intent.

**Page-load appear.** Three tiers: `y:40→0`, `y:0` opacity-only, and the hero device stack `scale(0.8), y:200 → 1, 0`. Tween, `0.5–0.6s`, curve `[0.4, 0, 0.2, 1]`, delays `0 / 0.4 / 0.6 / 1.8s`.

**The rest:** client-logo ticker, hover on project cards, a hand-drawn signature in About, and a `296px` name in the footer.

### Take
- **The blur reveal, exactly as measured** — but with *our* curve (`cubic-bezier(0.23, 1, 0.32, 1)`) instead of their `[0.4,0,0.2,1]`, which is Material's "standard" easing and is noticeably weaker. Use it on section headings only. Not on body copy, not on cards. One signature, used consistently.
- **The morphing pill nav.** This is where the cat lives. Expanded at top, collapsed on scroll, the cat sitting on its edge. Name the transitioned properties.
- **The intent-triggered CTA.** For us: "Say hi" pill, appears after the first scroll, never on load.
- **Two-tone headings** — muted first line, full-contrast second. Cheap hierarchy, reads senior.
- **Lenis** for smooth scroll — *only* if it passes the reduced-motion check and doesn't fight the cat's scroll-driven states. Trial it; be willing to drop it.
- The giant footer name — pairs naturally with Kirk's wordmark (below).

### Leave
- White. Obviously.
- `transition: all`. The blur `filter` on every heading is also GPU-expensive on long pages — budget it.
- Their easing. Swap for ours.
- The pricing/quote/blog machinery. Agency template; not our shape.

---

## 3. Kirk — "header name written style"

`kirk-sinner.framer.website` · by Gustave Flowbert · DM Sans + DM Mono

### What it is
White page, one saturated red (`#ff2e31`), and the name as the entire above-the-fold. Deliberately loud — the marketing copy says "unapologetic" three times.

### The name treatment — measured
- **It isn't text.** It's a graphic wordmark in an embedded iframe — fat, extended, rounded, uniform-stroke letterforms with a distinctive angular S. `1293×277px` at 1440 wide: **edge to edge**, nothing beside it.
- **It scales in on load** from `0.962 → 1.0`, settling in ~750ms. Exactly the `scale(0.95)→1` entrance `07-MOTION.md` prescribes — nothing appears from nothing.
- **A three-column mono meta bar above it**: `CREATIVE DIRECTOR · 2026 · @LOLAMADRID` — DM Mono 500, `12px`, uppercase, `+0.06em` tracking, in the accent red.
- **A centred mono subtitle below it**, `20px`, uppercase, split into individual letter spans — i.e. a per-character animation on load.
- Body type is DM Sans 600 with a very tight `-0.07em`.

### Why it works
The name is treated as a **logotype**, not a heading: one colour, one weight, one size, full width, no hierarchy competing with it. The tiny mono labels around it are the opposite register — small, spaced, technical — and the contrast between the two is the whole design. You could remove everything else on the page and it would still be a complete identity.

### Take
- **"Aydın Tokur" as a wordmark.** Set once, huge, edge-to-edge, in a display face chosen for this job. It's the first thing anyone sees and it should survive on its own. Text, not an image — SEO, selectable, theme-able — but with `font-display: block` so it never flashes a fallback.
- **The mono meta bar.** Three columns: `DESIGN ENGINEER · ISTANBUL · 2026` or `@AYDINTOKUR`. Monospace caps is the cheapest way to signal *engineer* without a single line of code on screen.
- **The scale-in entrance**, `0.96 → 1`, ~600ms, our ease-out.
- The per-letter subtitle animation — *maybe*. It's a load animation and you see it every visit; frequency gate applies. If it stays, it's under 600ms total and runs once per session.

### Leave
- The red-on-white shout. Our register is warm, not loud. The wordmark is bold by *size*, not by colour.
- The rest of the page — it didn't render headless (video-driven); the name is the reference, not the template.

---

## Synthesis — how the three combine

They don't contradict; they stack. Each owns one layer:

```
Kirk         →  the first second      name-as-wordmark + mono meta bar
LaunchFolio  →  how the page moves    blur reveal · morphing nav · intent CTA · two-tone headings
Creatie      →  how the page feels    stickers, tilt, paper grid, colour-coded pastels, the cat
Ours         →  the palette           warm dark, not any of the above
```

### What "warm dark" means now, concretely
Creatie's cream paper `#f6f4ec` inverts to a warm near-black — think `#141210`-ish, with the same faint grid at ~4% opacity. The pastel tints become **muted tints on dark** — the same hues at ~12–18% over the base, with their saturated icon dots intact. Kirk's idea of *one* accent stays, but it's the warm accent from `02-DIRECTION.md`, used by the wordmark only at hover, never flooding.

### Type — derived from all three
- **Display (wordmark + H1):** a heavy, slightly extended grotesk with rounded terminals — the Kirk *feeling* via a real font. Candidates to trial: **Mona Sans** (Creatie's, variable, free, has a wide axis), **Switzer** (LaunchFolio's), **Unbounded** or **Dela Gothic One** if we want more Kirk-weight. Tracking `-0.04em`, line-height `0.9`.
- **Body:** Inter or Geist, 400/500, `-0.01em`, line-height `1.5`.
- **Mono (meta, labels, code):** DM Mono or Geist Mono, 500, `12–13px`, uppercase, `+0.06em`.

### Motion — the one signature
The blur reveal is the signature. The nav morph and the CTA are structural. The cat is the character. **Nothing else animates on scroll.** That restraint is what lets the three playful things read as intentional.

---

## Measured tokens — for the build

| | Creatie | LaunchFolio | Kirk |
|---|---|---|---|
| Base | `#f6f4ec` cream | `#fafafa` | `#ffffff` |
| Accent | `#0099ff` | `#0099ff` | `#ff2e31` |
| Tints | `#d9e7f5 #f3eebe #dcf5e0 #ebe6f3` | — | — |
| Display | Mona Sans 800 · `-0.04em` · lh 85–100% | Switzer 500–600 · `-0.02/-0.03em` · lh 112% | wordmark graphic; DM Sans 600 `-0.07em` |
| Body | Inter / Plus Jakarta 500 | Inter 500 · lh 140–160% | DM Sans 500 |
| Mono | — | Fragment Mono | DM Mono 500 · 12px · `+0.06em` |
| Radii | 100px pills | 12 / 16 / 24 | 8 |
| Load entrance | — | y:40→0 · 0.5s · `[0.4,0,0.2,1]` | scale 0.96→1 · ~750ms |
| Scroll signature | draggable tags, cursor-eyes | blur(5px)→0 + y:10→0, ~750ms, 100ms stagger | — |
| Smooth scroll | inner scroller | Lenis | native |
| Nav | macOS dock | morphing pill 550→233px | mono meta bar |
