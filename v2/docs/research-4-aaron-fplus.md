# Research: aaronjcunningham.com + fplus.ai

## aaronjcunningham.com (Awwwards nominee; Next.js, ZERO animation libs — CSS + rAF + IO + WebGPU/TSL particles)
- Type: Inter weight-100 display ONLY huge (clamp 2.45-12rem, lh .78-.88, tracking -.047/-.055em, uppercase, max-width 8-11ch, text-wrap:balance) vs JetBrains Mono micro-labels (.53-.62rem, +.1-.14em, uppercase). Body .75-.92rem w300 lh1.58 max-width 330px. "//01" index prefixes + SLASH / SEPARATED / META.
- Color: #020207 blue-cast near-black; warm cream ink #f3f0e8 with hsla(44,31%,93%,.6/.38/.15) alpha ramp; accent mint #55efe4; PER-CHAPTER accent via RGB-triplet CSS var --matter-state (rgb(var(--x)) / rgba(var(--x),.1)) transitioned .8s — whole UI retints per section. 72px hairline grid overlay (.022 alpha) radially masked; aurora radial gradients mix-blend screen; vignette.
- Chrome: HUD — masthead top (31px circular monogram + role left, status right), right-edge chapter rail (1px dashes grow 9→26px + glow when active), bottom telemetry bar (mono labels), animated 1px scroll-cue. Nav = 42px circular portal button → fullscreen overlay (rgba(3,3,4,.97) + grid + radial tint), giant menu links with //0n + status tag + ↗.
- Layout: sticky 100dvh stage over tall track, 6 chapters over persistent particle canvas; edge token clamp(24px,3.6vw,56px); cards 1px hairline hsla(44,31%,93%,.17), radius 3px, fill .018 alpha. Footer: 1px top border with 180px glowing accent segment; giant thin email CTA + circle arrow.
- Motion: easings cubic-bezier(.16,1,.3,1) and (.22,1,.36,1), .24-.58s; cards lift -4px + accent border + glow + img scale 1.035; arrows translate (3px,-3px); underline wipes scaleX. Designed fallback state ("Lightweight experience active") for renderer error/reduced-motion.
- No testimonials — PRESS/RECOGNITION mono text wall. Credibility as data.

## fplus.ai (Awwwards nominee; Nuxt + GSAP/ScrollTrigger + Lenis + three.js)
- Type: Onest 800/900 display (clamp 44-104px, lh .94, -.05em) vs IBM Plex Sans body 1.6 + system mono teal index numbers. Kickers 12-14px w600 +.14-.16em uppercase teal. Oversized colored period/plus at sentence ends ("Imagine. Build. Launch.").
- Color: dark slate #22343c ground (warm, not black), panels #1f3038; TWO-ACCENT discipline: gold #dbb057 = action only, teal #8acbc1 = information only (labels, numbers, hairlines, focus). Light mode = one CSS filter invert trick.
- Tokens: --ease-out cubic-bezier(.16,1,.3,1); --dur-fast .28s / --dur .6s / --dur-slow .9s; radius .5rem/pill.
- Layout: pinned horizontal reel (panels 100vw, project holds 170vw, scrub .4, gold progress bar, vertical fallback <1024px); fixed WebGL canvas behind everything (morphing glass crystal with per-panel morph targets); overlap grid — text overlaps image with blur(48px) dark halo instead of card.
- Motion: flywheel marquee (rAF, hover speed lerps 1x→12x with 1-exp(-k·dt) smoothing, coasts back; mask-image edge fade 9%/91%; solid/outline alternating items with -webkit-text-stroke); gap transition on arrow links (gap 9→15px on hover); grayscale→color image hovers; CSS-staggered overlay menu (transition-delay calc with --i); loader with comet gradient bar.
- No testimonials — client names + stats row (900-weight numerals + teal underline bar).

## Cross-takeaways
Both: warm dark ground, huge tight display vs tiny tracked mono, hairlines at .12-.17 ink alpha, pill CTAs, ↗ arrow micro-motion, explicit reduced-motion fallbacks, ONE persistent scene/system instead of scattered effects. Weight strategies opposite (100 vs 900) — both work; the compression (tracking + lh) is the constant.
