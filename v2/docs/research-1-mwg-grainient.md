# Research: madewithgsap.com + grainient.supply

## madewithgsap.com (Awwwards SOTD Jul 2026, 7.65; palette #C9FE6E + #0A0A0B)
- Stack: vanilla JS + GSAP (ScrollTrigger, SplitText, Draggable, InertiaPlugin, MorphSVG, CustomEase) + Lenis + Matter.js.
- Type: LayGrotesk 500 display (140px/.85/-0.03em, 120px/.95, 65px, 48px; body 22px/1.2) vs PP Neue Montreal Mono 13px uppercase labels (.label, 11px .label-s). Two-voice system: giant tight lowercase grotesk vs tiny uppercase mono.
- Color: #0A0A0B body, #FFF, greys #999/#777/#323232/#232323, accent lime #C9FE6E used ONLY as 5px "diode" dot on labels. No gradients/noise. Flat, crisp.
- Architecture: alternating white inset panels on black body — .sec-border::before inset 5px from edges, border-radius 20px (black frame shows around white card sections). Radii tokens 20/12/4px. 12-col grid, gutter 15, margin 25.
- Motion: Lenis smooth scroll; clip-path polygon line reveals with duplicate span at top:90%; quickTo mouse-followers with increasing durations 0.5→3s (trailing inertia); house ease expo.inOut, power4, back.out(1.3–4), elastic.out(0.6,0.3); micro 0.3–0.5s, reveals 0.8–1s; staggers 0.06–0.2. Roll-hover buttons (duplicated label, translateY). Draggable video-card hero with Matter.js physics + live counter "#100 / 113", "Drag to explore" mono caption.
- Components: diode label kicker (mono + lime dot) on every section; section header = label left, title-m + roll CTA right; testimonials = 22px quotes + avatar + 3-line 11px mono credit (Name/Role/Company); pinned statement sections; pricing card with pill toggle.
- Mood: dark, engineered, tactile. Premium = type-scale contrast + inset white panels + physical motion + one acid dot.

## grainient.supply (Framer; CSS Design Awards)
- Stack: Framer (React/Framer Motion), Unicorn Studio WebGL shader hero embed, ticker marquees.
- Type: SF Pro Rounded 400/500/600 — modest sizes (H1 48px/500 centered, H2 34px, body 14px/1.4 grey), zero uppercase, zero mono. Soft/rounded personality; imagery is the display element.
- Color: #000 base, panels #141414/#0f0f0f/#1a1a1a; body grey #b2b2b2; accent lime #C2F13C + alpha glows (33/4d); hairlines rgba(255,255,255,0.1) as inset box-shadow (68 uses); backdrop-filter blur(20px) glass nav.
- 8-layer shadow recipe on hero cards: inset 0 .5px .5px rgba(255,255,255,.4) rim light + 0 70px 30px / 0 40px 25px / 0 20px 20px black drops + 0 -5px 30px rgba(255,255,255,.4) underglow.
- Bento grid centerpiece; radii 20/30px cards, 50/100px pills; hover-img crossfade card swap; counts as design elements "( 375 ) Gradients"; lime glow only on primary CTA: 0 0 40px rgba(accent,.3) + inset 0 0 3px #fff.
- Mood: soft-dark product commerce, Apple-adjacent, ambient motion (shader, tickers, video loops).

## Shared DNA
Near-black base + single acid-lime accent + grey secondary + pill CTAs + 20px card radii + dark-with-light-panel sectioning + surfaced numbers as social proof.
