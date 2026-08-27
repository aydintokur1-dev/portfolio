# v2 — "Survives Production"
_Design direction synthesized from 8 reference teardowns (see research-*.md). 24 Aug 2026._

## The concept

The thesis line — "My design decisions survive contact with production instead of dying at handoff" — becomes the site's whole metaphor. The portfolio presents itself as an **instrumented, shipped product**: HUD telemetry chrome, live Istanbul clock, status diode, build-log mono metadata, designed fallback states, and one physics toy that proves the "human parts" claim from VOLGEN. Friendly lives in the copy and the motion; engineer lives in the chrome.

What the references taught (the consensus of all 8):
1. Commit to ONE metaphor and name the tokens after it (Pear's press/ink/paper, Aaron's HUD).
2. Two-voice typography: huge tight display (lh ≤ .9, tracking negative) vs tiny tracked uppercase mono. Nothing in between.
3. Warm near-black + cream ink + ONE accent; every other step is an alpha of the ink.
4. One ease, three durations, linear marquees, designed reduced-motion fallbacks.
5. One signature interaction, not ten gimmicks.
6. Credibility as data: counts, indices, named surfaces, marquee logos, mono press walls.

## Tokens

- Ground: `--floor #0C0B09` (warm near-black) · panels `#14130F` · recessed `#080807`
- Ink: `--ink #F2EFE5` cream · muted `.62` · faint `.38` · hairline `.12` (all alpha of ink)
- Accent: `--accent #C8F44C` acid lime, as RGB triplet so `rgba(var(--accent-rgb), .12)` tints work. Used ONLY: diode dots, hot words, hover states, one glowing footer segment, primary CTA. Never a surface.
- Per-case accents: existing content `tint` (blue/yellow/green/lavender/pink) → RGB triplet swapped on case pages (Aaron's `--matter-state` trick), whole chrome retints.
- Type: **Archivo** (variable) display ~520 weight, sentence case, tracking -0.035em, lh 0.9, sizes vw-clamped (hero ~8vw) · **Instrument Serif Italic** for single accent words inside headlines · **JetBrains Mono** 400/500 for ALL labels: 11–12px, uppercase, +0.12em, `//01` indices, `[ BRACKETS ]`.
- Motion: one ease `cubic-bezier(.16,1,.3,1)`; durations .25s micro / .5s UI / .9s entrance; stagger .07; marquees linear; global reduced-motion kill.
- Radii: 4px cards (technical, sharp) · 999px pills. Hairline borders only, no fills above .04 alpha.
- Libraries: gsap + ScrollTrigger (scroll-fill, scrub), lenis (smooth scroll, desktop), matter-js (pill pit), native View Transitions API for page nav.

## Home (single page + anchors)

1. **HUD chrome** (fixed): top-left wordmark pill "Aydın / design engineer"; top-right live Istanbul clock + lime diode "OPEN TO WORK"; bottom telemetry bar: active section + scroll %. Right-edge dash rail on case pages.
2. **Hero**: mono meta row `[ ISTANBUL, TR ] [ 41.01°N 28.98°E ] [ DESIGN ENGINEER ]`; headline "Your *friendly* neighborhood design engineer." (friendly = serif italic lime); masked line reveals; pill CTAs; animated scroll cue.
3. **Manifesto**: scroll-fill per word (faint→ink), hot words (*build*, *breaks*, *production*) flip lime + serif italic. Sticky-centered.
4. **Work** `01 // SELECTED WORK ( 7 )`: stacked full-width panels, not a grid. Index /01–/07, giant org, claim title, mono meta triplet, cover grayscale→color + scale on hover, gated chip for Pickleball.
5. **Stats strip**: 6 products one system · 1M+ users · 3 days research→live · 8 recommendations. Display numerals + lime tick underline.
6. **Testimonials** `02 // SIGNED OFF`: featured Nancy quote as scroll-scrubbed char highlight; then masked infinite marquee of hairline cards, pause on hover, TR cards with EN/TR flip.
7. **Brands**: outline/solid alternating text marquee with lime `+` separators.
8. **About** `03 // OPERATOR`: portrait, bio, experience as mono table rows, 3 featured certifications, skills chips.
9. **Contact** `04 // SAY HI`: giant email with underline wipe; **pill pit** — skill pills drop under matter-js physics, draggable, desktop-only (the VOLGEN reference, made real).
10. **Footer**: hairline top with glowing lime segment; mono link columns; giant AYDIN at 102% width bleeding off bottom; no © year.

## Case pages
HUD persists; per-case accent retint; giant org + claim; mono facts grid; existing Block types rendered (p/h3/list/quote/figure/figures/stat/decision); right-edge chapter rail with active dash states; prev/next; password gate preserved for Pickleball. 404: "This page didn't survive contact with production."

## What we deliberately do NOT take
Scroll-jacking/virtual scroll (Pear) — hostile on a portfolio someone skims. Custom cursors — cheap-feeling in 2026 unless perfect. A second accent. Blackletter. Full WebGL scene — the pill pit is our one toy; everything else is CSS/rAF discipline.
