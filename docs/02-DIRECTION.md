# Direction
_Updated 23 Aug 2026 after LinkedIn material + your brief: cute & friendly, dark-first._

## What changed

Two things from your LinkedIn overturn my first read:

**1. The design-engineer proof already exists.** I said it was missing. It isn't — it just isn't on your portfolio. VOLGEN (`volgen.ai`, live, Next.js + React, research to launch in three days, bilingual, with a working CRM flow), your brother's studio site, and the current portfolio itself. Three shipped sites you designed *and* built. That's the whole argument, sitting outside the thing that's supposed to make it.

**2. Your LinkedIn About is better than your entire website.** Especially this:

> Because I build, I know what actually gets made, what breaks, and where the real constraints sit. **My design decisions survive contact with production instead of dying at handoff.**

That's the thesis. Put it above the fold.

---

## Positioning

> ### Your friendly neighborhood design engineer.
> I design product systems and build them.

The tagline does three jobs at once: it lands the warmth you asked for, it's memorable in a stack of two hundred portfolios, and "neighborhood" quietly carries the actual work — you keep six separate products feeling like one place.

**One caution.** Take the *feeling*, not the costume. No red-and-blue, no webs, no masks, no wall-crawling scroll effect. Spider-Man pastiche would read as a gimmick and undercut the seniority the rest of the site is arguing for. The line alone is enough — everyone gets the reference, and getting it without being shown it is the pleasure.

If it's too on-the-nose for you, the fallbacks: *"I design product systems and build them"* (plain, strong) or *"Six products. One system. I design it and I build it."*

---

## How "cute and friendly" reads senior, not junior

I recommended near-monochrome restraint last time. You want cute and friendly. **Your call wins** — and it's the more distinctive choice. But it has a real failure mode, so here's the mechanism that makes it work.

**Precision is what separates playful-and-expert from playful-and-junior.**

The same rounded, bouncy, warm interface reads as either, depending entirely on execution. Delight that's *decorated on* looks amateur. Delight that's *engineered in* looks like mastery — because a spring that interrupts correctly, a chip that animates out of a list without reflow, a hover that respects `prefers-reduced-motion` are all things only someone who builds can actually pull off.

So the rule is: **the personality lives in the motion and the micro-interactions; the discipline lives in the spacing, the type, and the states.** Warm and rounded on the surface, ruthless underneath.

Prior art that gets this right — friendly, obviously expert, zero condescension: **Raycast, Linear, Warp, Val Town, Vercel's Geist, Emil Kowalski's component work, Rauno Freiberg's interface toys.** Worth a look while you're gathering references. What they share: generous radii, warm neutrals, springy motion, and typography you could set a legal document in.

Your own instinct is already here — *"popcorn-style text pills… moving fast shouldn't mean losing the human parts."* Build from that sentence.

---

## Visual direction — light first (changed 23 Aug, evening)

> **Update:** Aydın reversed the theme call — **light ships first**, dark stays as a token block. Also: the references are *clean and small* — one big element (the wordmark), everything else inside a ~720px column with hairline rails, LaunchFolio-style. The rest of this section predates that and is kept for the reasoning.

### (superseded) dark first

Building dark only for now, per your brief. But **structure the tokens for both from day one** — every color defined as a semantic variable (`--surface`, `--text-primary`, `--accent`), never a raw hex in a component. Light theme then becomes one file, later, instead of a refactor. A design-systems person shipping a theme that can't be re-themed is a bad look.

**Warm dark, not cold dark.** Near-black with a warm or violet tint rather than blue-black — blue-black reads corporate and severe, which fights the whole brief. Think `#111010` over `#0B0F14`.

| | |
|---|---|
| **Geometry** | Generous radii — 12–20px on cards, fully round on pills and chips. Roundness is most of the friendliness, and it's free. |
| **Color** | Warm neutral base + **one** playful accent, used with discipline. Your project covers already carry a lot of color; the shell shouldn't compete. |
| **Type** | Geometric-humanist sans with a slightly quirky lowercase. **Tracking is size-specific, never one value** — negative on display (`-0.02em`), near `0` on body. Leading runs inversely to size: tight on headings (`1.05`), loose on body (`1.5`). Hierarchy from weight + size + leading as a set, not size alone. |
| **Motion** | Fast and crisp by default (under 300ms, custom `ease-out`); bounce reserved for the cat, the chips, and drag — **not** general page motion. Interruptible, honest exits, real reduced-motion. Full spec in `07-MOTION.md`. |
| **Delight** | Small, earned, and never blocking: a hover that reacts with personality, a cursor-aware element, a chip that pops. Never an intro animation someone has to sit through. |
| **Depth** | Translucent layers (`backdrop-filter: blur() saturate()`) with content scrolling *under* the nav, rather than opaque bars. Bigger surfaces read as thicker — stronger blur, deeper shadow. **Never stack a light translucent surface on another**; legibility collapses. Use a scroll-edge fade where content meets floating chrome instead of a 1px divider. Materialize on enter (animate blur + scale together), don't just fade. |
| **3D** | You know Spline — one restrained element could carry a lot, but it must not cost the page its performance budget. Not in v1. |

---

## Structure — seven projects, three tiers

**Flagship**
1. **Pickleball.com** — six products, one system. Your most senior work, currently invisible. Publicly citable via `pickleballtournaments.com` (home, search, detail) and the Admin area — your PM named those in writing.
2. **VOLGEN** — designed and built, research to live in three days. This is the design-engineer case study.

**Depth**
3. **Balkan Transfer** — end-to-end lead, web + mobile
4. **Cuckoo** — seven real product decisions

**Range**
5. **Innos** — three days, vague brief, best submission they'd received
6. **Morpa** (Kampüs + Ders merged) — 1M+ active users, four apps, ages 8–60
7. **Tokur Studio** or **Visit Montenegro** — pick one

Cut: Akbank, She Ventures (or rewrite She Ventures completely — see `03-COPY.md`).

**Testimonials get their own section.** Eight recommendations, two from people who managed you directly, one from a CEO, one from your current PM naming shipped surfaces. Almost no portfolio at your level has this. Half are in Turkish — ship them bilingually with a toggle. That's simultaneously honest, warm, and a small piece of engineering craft.

---

## Password-gated Pickleball work

You mentioned more Pickleball projects coming as static images, not yet live, needing a password. Recommended handling:

- Gate **only** those case studies, never the homepage. The card stays visible with a small lock affordance — a locked door people can see is intriguing; a locked front gate is a bounce.
- Write a real teaser on the card: the problem and your role, no screens. That's often enough for a first conversation.
- Implement as an Edge Middleware check on those routes with the password in an env var. Cheap, no backend, and gives you a nice friendly unlock interaction to build.
- Put the password in your outreach emails, not on the site.

---

## Stack

**Next.js + React** — switching my earlier Astro recommendation. You already shipped Volgen on it, the repo is `aydintokur1-dev/portfolio`, Vercel gives you Edge Middleware for the password gate for free, and there's no reason to make you learn a second framework mid-rebuild.

- **Tailwind** with a semantic token layer (light-theme-ready from day one)
- **Motion** (framer-motion) — springs, layout animations, interruption
- **MDX** for case studies — prose with live components dropped inline
- **next/image** — your assets are 1–2 MB PNGs and need AVIF/WebP
- **Vercel**, custom domain — get off `.webflow.io`
- Keep Webflow live until DNS settles
