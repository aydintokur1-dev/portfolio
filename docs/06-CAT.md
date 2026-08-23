# The cat

**Verdict: yes to the cat. No to the opening sequence.**

## Why the cat is right

A recurring character is how "friendly neighborhood design engineer" stops being a tagline and becomes a thing people remember. Nobody recalls a portfolio's typeface a week later; they recall that there was a cat.

It also happens to be a real engineering flex. **Cats are hard to animate.** Weight, anticipation, follow-through, the tail lagging behind the body, the settle after a landing. A cat animated badly looks like clip-art; a cat animated well tells a motion-literate visitor that you can do anything else on the page too. It's a work sample disguised as a joke — which is the best kind.

So the instinct is good. The staging needs work.

## Why the opening sequence isn't

> "we open the scene with it, it gets smaller, takes its position…"

This is an intro animation that gates content, and it has three problems:

1. **It taxes every visit.** A recruiter with 200 tabs open doesn't wait. Whatever the cat does before they can read your name is charged against you, not to you.
2. **It's charged most to the people who visit most** — you, during interviews, demoing your own site. You will grow to hate it by week two.
3. **It puts the cat's best moment where nobody's paying attention yet.** First-paint is when people are orienting, not admiring.

The rule: **the cat should never be between the visitor and the content.** It should be something they *discover*, not something they *endure*.

## The reshaped version

Keep your ending — the paw-scroll — and throw away the beginning.

**Present from first paint, small.** The cat is already sitting on the edge of the nav bar, or on the corner of the hero card, when the page loads. No entrance. It's just *there*, the way a neighbourhood cat is already on the wall when you walk past.

**It tracks the cursor.** Head turns, eyes follow, ears twitch. Cheap to build, absurdly charming, and it's the thing that makes people realise it's alive rather than a sticker. This alone is worth more than the entire opening sequence.

**It sleeps when you're idle.** Curls up after ~20s of no input, wakes and stretches on the next scroll. This is the detail people screenshot.

**★ It paws the brand row.** Your best idea — keep it exactly. When the logo row scrolls into view, the cat walks over, sits, and bats at it; the row scrolls with each swipe. The reason this works and the intro doesn't: *the cat is doing something useful.* That's the whole line between a mascot and a decoration. Make the row draggable too, so a human can do what the cat does.

**You do have brands for it,** by the way — Pickleball Inc., Bild, Agency Look, Morpa, Akbank, Balkan Transfer, Cuckoo, VOLGEN, Innos. That's a real row, and it's a credibility band you're currently not showing at all.

**It curls up in the footer.** End of page, cat goes to sleep. Closes the loop without a sequence.

**It owns the 404 and the empty states.** This is where mascots actually earn their cost — a cat sitting on a broken page is worth more than any illustration you could buy.

## Optional, if it stays cheap

- Click it → a stretch, a blink, a tiny `mrrp` toast. Never a modal, never sound by default.
- It notices the theme toggle — pupils widen in the dark.
- On a case study, it sits on top of the section you're reading.

## Constraints — these are not optional

| Rule | Why |
|---|---|
| **Never overlaps text or the CTA** | A cat covering your email address is a cat that costs you a job |
| **Never steals focus, never in the tab order** | It's decorative; screen readers should skip it entirely (`aria-hidden`) |
| **`prefers-reduced-motion` → static cat** | Still sitting there, still cute, not moving. Motion sickness is real and a designer shipping motion without this tells on themselves |
| **Pauses when off-screen** | No rAF loop running behind the fold |
| **Hard performance budget** | It cannot cost you the Lighthouse score. A slow site with a cat on it is a slow site. |
| **Must be cuttable** | Ship the site without it. Add it when it's genuinely good. |

## How to build it

**Rive**, not Lottie, not a 3D scene, not a sprite sheet.

Rive is built for exactly this: a state machine with named inputs (`idle`, `sleeping`, `tracking`, `pawing`), tiny file sizes, runs on the GPU, and you drive it from React by setting inputs rather than scrubbing timelines. Cursor-tracking is a built-in feature. Lottie can't do state machines; a 3D cat in Spline would be gorgeous and would eat your performance budget alive.

Rough shape:
```
idle ──20s no input──▸ sleeping ──scroll──▸ stretch ──▸ idle
  │
  ├── cursor moves ──▸ look-at (blend, driven by pointer x/y)
  ├── brand row in view ──▸ walk-in ▸ sit ▸ paw (loop, drives row offset)
  └── footer in view ──▸ curl-up
```

## The honest risk

The cat is the highest-variance element on this site.

At 90% execution it's the thing that gets you remembered and shared. At 60% it reads as a bought widget, and it drags the seniority of everything around it down with it — because a mascot is a *claim* about your craft, and a mediocre one disproves the claim more loudly than no mascot at all.

So: **build it last, judge it honestly, and be willing to ship without it.** The site has to work with a plain logo row. If the cat clears the bar, it's the best thing on the page.
