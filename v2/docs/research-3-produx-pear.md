# Research: produx.design + pear.no

## produx.design (Awwwards SOTD Aug 2026; Next.js + Tailwind v4 + GSAP/ScrollTrigger + View Transitions API)
- Type: At Aero display (self-hosted, several optical weights) + DM Mono for EVERYTHING else (labels, nav, body, tags, CTAs — mono-heavy). Pure vw sizing: headlines 8.95vw/7.9/5.97/4.47/3.48; body 1.56vw; labels 0.97/0.83vw. 102 uppercase instances. Bracketed mono labels "[ MENU ]", "[ scroll down ]" signature. Numbered service list 01-04.
- Color: #0E0E0E ground, panels #141414/#111, cards #282828; fg #F2F2F2 + alpha steps; greys #C6C6C6/#A9A9A9; dividers #2F2F2F; accent lime #CFFF6A (hover states, borders); muted greens #303930/#545E54; alert red #FF302F. No texture; blur used as animation state; mix-blend-difference fixed header.
- Layout: single gutter px-[5.5vw]; vh vertical rhythm; hero = full-viewport SVG wordmark + expanding showreel (perspective 1200, scales on scroll); work = stacked full-width project sections (not grid); draggable logo strip (cursor-grab); footer slash-labels "Menu/" "socials/".
- Motion: server-rendered split text (masked spans in JSX — no flash, SEO-safe); ghost-layer line reveals (dim copy + bright copy translate-y-full inside overflow-hidden); scroll-scrubbed char highlight (dim text-white/20 base + bright overlay chars lit by scrub); blur-sm + rotate(-1/-2deg) + translate entrances that settle sharp/level; morphing navbar (full wordmark → [ MENU ] pill on scroll, mix-blend-difference, letters as SVGs with flex-basis widths); View Transitions + logo .webm portal between routes; per-char split CTA hovers; underline h-px scale-x origin-left.
- Testimonials: 6 cards, headshot + name + company + quote at 2.3vw, plain grid.
- Mood: black-box AI-studio premium; density of micro-motion; one continuous vw composition.

## pear.no (Awwwards nominee; React 19 + Vite, ZERO animation libraries — all hand-rolled rAF)
- Concept: "letterpress prospectus" — palette tokens named --press #0B0A09 / --ink #1D1C19 / --paper #F2F1ED / --rule (14% ink) / --sky #015186 accent; cream finance section #FFFAEA + brown ink #2E2109; procedural canvas paper grain (pulp/fibre/tooth/fleck params) + SVG feTurbulence ink-warp and torn-paper card edges (2 stacked turbulence+displacement passes).
- Type: Flecha serif in L/M/S optical sizes, Light 300 display at negative tracking (77.9px/68.5px/-1.56px — lh < fs) vs GT Standard sans body + GT Standard Mono micro-labels at 8.4-9.2px uppercase +0.2em tracking. 20:1 size ratio is the look.
- Layout: one page, one scroll track — .stage height 5350vh + .pin sticky 100dvh overflow:clip; chapter rail "Ch. 1 The Model..." fixed left with data-at progress fractions; asymmetric book margins; hairline rules that draw themselves in (scaleX 1.15s) + "+" registration crosses at grid intersections; house ease cubic-bezier(.22,1,.36,1).
- Motion: custom virtual scroll (wheel + lerp, disabled for reduced-motion/touch); scroll-scrubbed film with canvas halftone/dither treatment; per-line exit vectors (--exitX/--exitY — text leaves in the camera direction); line masks clipping descenders correctly (margin:-.14em 0 -.2em; padding equal); 3D contact form (perspective 1700, dashed orbiting ellipses, pulsing warm glows, rim-light borders); periodic sheen keyframe; 40% chart with traveling tick marker.
- Mood: premium because nothing is a library default; the metaphor carried through every token name.

## Takeaway
Produx = dark/lime/mono kinetic studio site, techniques transplant piecemeal. Pear = committed metaphor + custom pacing; the lesson is COMMIT TO A METAPHOR and name the tokens after it.
