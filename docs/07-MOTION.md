# Motion & interaction spec
_Consolidated from three skills: `emil-design-eng` (Emil Kowalski's practice), `apple-design` (WWDC *Designing Fluid Interfaces*, *UI Typography*, *Principles of Great Design*), and `animate` (build framework). These are build-time rules, not vibes._

---

## The correction to my earlier advice

I wrote *"springy, slightly overshooting"* as the general motion character. **Wrong as a blanket rule**, and both skills say so independently:

> Avoid bounce in most UI contexts. Use it for drag-to-dismiss and playful interactions. — *emil-design-eng*

> Add bounce **only when the gesture itself carried momentum**. Overshoot on a menu that just faded in feels wrong; overshoot on a card you flicked feels right. — *apple-design*

Bounce is a spice, not the base. On a site already leaning cute, over-bouncing is exactly how playful tips into junior.

**Base = fast, crisp, critically damped.** Bounce is rationed to three places: the cat, the drag interactions, and the case-study demos. That contrast is what makes the playful moments land.

---

## Gate 1 — should it animate at all?

| Frequency | Decision |
|---|---|
| 100+ /day | **No animation. Ever.** |
| Tens/day (hover, list nav) | Near-imperceptible or nothing |
| Occasional (modals, drawers) | Standard |
| Rare / first-time | The delight budget lives here |

**Consequence:** theme toggle and nav get near-zero motion. It also retroactively confirms killing the cat's intro — on every page load, that's a 100+/day element for *you*.

## Gate 2 — name the purpose

Feedback · spatial consistency · state indication · preventing a jarring change · explanation · delight. Can't name it? Don't build it.

### ⚠️ The cat fails this gate on a product — and passes on a portfolio

Worth being honest about, because it's the load-bearing justification for the whole mascot:

> Delight is allowed **only** at the rare/first-time tier. — *animate*
> A decorative mouse-tracking effect belongs on **a marketing page**, not on a graph in a banking app. — *animate*

A persistent, cursor-tracking cat is continuous decorative motion. Inside a product UI it would be indefensible. **A portfolio is a marketing page**, which is precisely the exemption — so the cat is legitimate here, but narrowly, and for a stated reason rather than by accident.

Two practical consequences:
- The cat must never sit on top of content someone is *reading or acting on*. Decorative motion next to a paragraph is fine; decorative motion over a form field or a case-study diagram is not.
- The **paw-scroll passes on stronger grounds** — it drives a real control, so its purpose is *feedback*, not delight. That's the most defensible part of the whole idea.

---

## Tool ladder — cheapest that works

Stop at the first that fits. *(Don't install a library for a fade.)*

| Need | Tool |
|---|---|
| Hover, press, colour, class-driven state | CSS transition |
| Entry on mount, no JS | CSS `@starting-style` |
| Predetermined motion that must survive page load | CSS animation *(runs off main thread)* |
| Programmatic, CSS performance, no library | WAAPI `element.animate()` |
| Springs, exit animations, gesture-driven values | Motion (`motion.dev`) |
| Character state machine | **Rive** |

CSS beats JS under load — `requestAnimationFrame` animation drops frames exactly while the browser is loading, which is when first impressions form.

## Easing tokens

```css
--ease-out:    cubic-bezier(0.23, 1, 0.32, 1);   /* entering/exiting — the default */
--ease-in-out: cubic-bezier(0.77, 0, 0.175, 1);  /* moving/morphing on screen */
--ease-drawer: cubic-bezier(0.32, 0.72, 0, 1);   /* iOS-like sheets */
```

**Never `ease-in` on UI.** It delays the initial movement — the exact moment the user is watching hardest.

## Durations

| Element | Duration |
|---|---|
| Button press | 100–160ms |
| Tooltip, small popover | 125–200ms |
| Dropdown, select | 150–250ms |
| Modal, drawer | 200–500ms |
| Case-study demos (explanatory) | Can be longer |

**UI under 300ms.** Exit faster than enter.

## Springs — think in damping + response

Apple's two parameters are easier to reason with than mass/stiffness/damping:

| Interaction | Damping | Response |
|---|---|---|
| Move / reposition | `1.0` | `0.4` |
| Rotation | `0.8` | `0.4` |
| Drawer / sheet | `0.8` | `0.3` |

`damping 1.0` = critically damped, no overshoot — **the house default**. In Motion: `{ type: "spring", bounce: 0, duration: 0.4 }`.

---

## Never ship

| Never | Instead |
|---|---|
| `transition: all` | Name the properties |
| `scale(0)` entrance | `scale(0.95)` + `opacity: 0` — nothing appears from nothing |
| `ease-in` on UI | `ease-out` or a strong custom curve |
| Animating `width`/`height`/`margin`/`top` | `transform` / `opacity` only |
| `transform-origin: center` on a trigger-anchored popover | `var(--transform-origin)` *(modals exempt — they stay centred)* |
| Keyframes on anything rapidly triggered | CSS transitions — they retarget, keyframes restart from zero |
| Motion `x`/`y`/`scale` props | Full `transform: "translateX(100px)"` string — shorthands aren't hardware-accelerated |
| Driving a child's transform from a parent CSS variable | Set `transform` on the element — variables recalc every child |
| Ungated `:hover` motion | `@media (hover: hover) and (pointer: fine)` |
| Everything entering at once | 30–80ms stagger |
| Missing `prefers-reduced-motion` | Gentler variant, never zero |

---

## Gesture physics — for the paw-scroll and any drag

**Respond on pointer-down, not release.** Feedback must be continuous *during* the interaction, not only at the end.

**1:1 tracking with the grab offset preserved.** Snapping to an element's centre on grab breaks the illusion instantly. Use `setPointerCapture` so tracking survives the pointer leaving the element.

**Interruptibility is the single most important principle.** Always animate from the **presentation (live on-screen) value**, never the target value — starting from the logical value causes a visible jump. Never lock out input during a transition.

**Project momentum; don't snap from the release point.** Apple's actual function:

```js
function project(velocity /* px/s */, decel = 0.998) {
  return (velocity / 1000) * decel / (1 - decel);
}
const landing = current + project(releaseVelocity);
// snap to the nearest target to `landing`, then hand off velocity to the spring
```

**Rubber-band at the ends** — progressive resistance, not a hard stop:

```js
const rubberband = (overshoot, dim, c = 0.55) =>
  (overshoot * dim * c) / (dim + c * Math.abs(overshoot));
```

**Hand off velocity** so there's no seam between drag and animation. Decompose 2D motion into independent X and Y springs.

---

## Accessibility — three signals, not one

I only mentioned reduced motion. There are three:

```css
@media (prefers-reduced-motion: reduce)     { /* cross-fade, no transform motion, no overshoot */ }
@media (prefers-reduced-transparency: reduce) { /* raise background opacity, drop backdrop-filter */ }
@media (prefers-contrast: more)             { /* near-solid backgrounds, defined borders */ }
```

Reduced motion means **fewer and gentler**, not zero — keep opacity and colour transitions that aid comprehension, drop movement and position changes. So the cat stops travelling but can still blink via opacity.

Also avoid: full-viewport moving backgrounds, slow loops near 0.2 Hz, and abrupt brightness jumps — ease the dark↔light theme change when light ships.

---

## Applied to our three playful moments

**Cat cursor-tracking.** Explicitly sanctioned as decorative mouse-tracking. Don't bind directly to pointer position — interpolate through a spring or it reads mechanical. `aria-hidden`, out of the tab order, paused off-screen.

**Cat paw-scroll.** The strongest part of the concept: it drives a real control, so it's feedback, not decoration. Momentum projection + rubber-band ends. Make the row draggable by humans too.

**Cuckoo chip demo.** Chips added/removed rapidly → CSS transitions, never keyframes. The opacity/height pairing on list exit has no formula; it's trial and error until it feels right.

---

## Process rules worth stealing

- **Prototype the cat before committing to it.** *"An interactive demo is worth a million static designs."* It also sets a bar that stops the final build being mediocre.
- **Design interaction and visuals together** — *"you shouldn't be able to tell where one ends and the other begins."* Motion isn't a layer added after the pixels.
- **Review animations the next day**, with fresh eyes. Play at 2–5× duration or step frame-by-frame in the DevTools Animations panel.
- **Test gestures on a real device**, not the simulator.

## The line that should govern the cat

> **Delight is the result of getting the other seven principles right, not confetti tacked on top.** — *apple-design*

Which is the same conclusion `06-CAT.md` reached from a different direction: build it last, and only if everything around it already works.
