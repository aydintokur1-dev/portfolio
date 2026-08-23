# Motion audit — hero build
_`improve-animations` + `find-animation-opportunities`, run against commit `103a095`. Vetted by re-reading every cited line. Measured under 4× CPU throttle: nav morph / cat tracking / blur reveal all held 60fps (one 132ms hitch on the very first collapse), so the backdrop-filter-during-FLIP concern is **cleared**, not a finding._

## Findings

| # | Sev | Category | Location | Finding | Fix |
|---|---|---|---|---|---|
| 1 | **HIGH** | Accessibility | `BlurReveal.tsx:36` | Words are `aria-hidden`, and the full string is exposed only via `aria-label` on a `<span>`/`<h2>` — `aria-label` on a non-interactive span is ignored by most screen readers. The hero tagline is invisible to AT. | Render a visually-hidden copy of the text; drop `aria-label`. |
| 2 | **HIGH** | Function | `globals.css` (html) | Fixed nav pill with no `scroll-padding-top`; anchor links (`#work`, `#about`) land section headings *under* the pill. | `html { scroll-padding-top: 6rem }` |
| 3 | MED | Accessibility | `globals.css:200–207` | Reduced-motion block sets every `transition-duration` to 0.01ms — nukes opacity/colour feedback too. Spec says *fewer and gentler, not zero*. | Scope it: kill `animation` and transform transitions; keep opacity/colour at 120–200ms. |
| 4 | MED | Interruptibility | `Nav.tsx:33` | Single threshold `scrollY > 96` — scroll jitter at 96px toggles the layout spring repeatedly. | Hysteresis: collapse at >112, expand at <48. Same for `SayHi.tsx:16`. |
| 5 | MED | Easing & duration | `SayHi.tsx:29–32` | Enter and exit both 320ms — exit should be faster than enter. | Exit 200ms, same curve, same path. |
| 6 | MED | Interruptibility | `globals.css:254–256` | Falling asleep: open eyes snap to `opacity:0` (no transition) while closed arcs fade in; waking snaps too. | Asymmetric: fall asleep slow (600ms), wake fast (180ms) + a stretch. |
| 7 | LOW | Cohesion | `BlurReveal.tsx:27`, `Nav.tsx:55,77`, `SayHi.tsx:32` | `[0.23,1,0.32,1]`, durations and the spring config hand-typed in three files while CSS has `--ease-out`/`--dur-*` tokens. | `src/lib/motion.ts` exporting `EASE_OUT`, `DUR`, `SPRING_SETTLE`; import everywhere. |
| 8 | LOW | Performance | `BlurReveal.tsx:42` | Permanent `will-change` on every word span — compositor layers that never release. | Remove; Motion manages it during the tween. |
| 9 | LOW | Performance | `Cat.tsx:38` | `getBoundingClientRect()` on every `pointermove` — a layout read per event. | Throttle to one rAF per frame. |
| 10 | LOW | Cohesion | `globals.css:247` | Blink every 5.2s exactly — metronomic; real blinks are irregular. | Two blinks per 9s cycle at uneven offsets. |

## Opportunities (gated — frequency · purpose · speed · function)

| # | Location | Today | Purpose | Freq | Suggested motion |
|---|---|---|---|---|---|
| A | `Nav.tsx` links | No indication of which section you're in | **State indication** (wayfinding) | Occasional (changes ~5×/visit) | Active link gets a sliding background pill via Motion `layoutId`, spring `bounce:0, duration:0.3`; reduced motion → instant. |
| B | `globals.css` html | Anchor clicks teleport | **Preventing a jarring change** | Occasional (3–5 clicks/visit) | `scroll-behavior: smooth`; the existing reduced-motion rule already forces `auto`. |
| C | `Cat.tsx` wake | Eyes pop open | **Delight** (rare — after 20s idle) | Rare | Stretch: `scaleY 1→1.06→1`, 320ms `--ease-out`, eyes open at 180ms. |

## Rejected (and why)

- Work-card grid stagger on scroll — **settled decision**: the blur reveal is the only scroll animation (`docs/08-REFERENCES.md`). Not re-litigated.
- Card hover image zoom — **tens/day hover tier; decoration**. Background/border colour only, as now.
- Wordmark hover effect — **no nameable purpose**.
- Sticker "peel" on hover — **hover tier, decoration**.
- Nav ••• menu on phones — already bridged by the layout spring + fade; nothing to add.

## Verdict
The motion is close to right: one signature scroll animation, a critically-damped nav, a decorative cat that's justified and measured cheap. The two HIGHs aren't motion bugs — they're an a11y hole and a functional anchor bug the sweep surfaced. Highest-leverage single change: **#1**.

## Status
All ten findings and opportunities A–C implemented. Re-traced after the light-theme/column rebuild under 4× CPU throttle: nav morph, cat tracking, blur reveal and the new card fan-in all 0 dropped frames.

Note on A (active pill): an IntersectionObserver band fails near the end of a document (late sections never reach the band). Replaced with a scroll-position rule plus a hash-navigation lock so the link you clicked is the link that lights up.
