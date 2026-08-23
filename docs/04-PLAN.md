# Plan
_Updated 23 Aug 2026. LinkedIn material received — the Phase 0 blockers are mostly cleared._

Sequenced so **content locks before pixels, and pixels before code.** The usual way a portfolio rebuild dies is a beautiful shell built around case studies nobody ever wrote.

---

## Still needed from you

Small list now — the LinkedIn screenshots resolved most of it.

1. **Pickleball disclosure scope.** Which screens are public, which go behind the password? Your PM's recommendation already makes `pickleballtournaments.com` home/search/detail and the Admin area publicly citable — so this is only about the unreleased work.
2. **The password-gated Pickleball images**, when you have them, plus the password you want to use.
3. **One before/after or one number** from the Pickleball systems work — component reuse, time saved, surfaces adopted. Anything falsifiable. If nothing exists, say so and we'll write around it honestly.
4. **Reference sites you like**, and specifically *what* you like in each — the motion, the type, the density, the case-study structure. More useful than the links alone.
5. **Volgen assets** — a few screens of the pieces you're proud of (the dynamic text boxes, the popcorn pills), since the case study is about the build.
6. **Bild discrepancy:** LinkedIn About says 3 major projects, Experience says five. Which?

---

## Phase 1 — Content _(~1 week)_

- [ ] Approve the tagline: *"Your friendly neighborhood design engineer"* — or one of the alternates in `03-COPY.md`
- [ ] Confirm the seven-project cut list
- [ ] **Write the Pickleball case study** — still the single highest-value item here
- [ ] **Write the VOLGEN case study** — the design-engineer proof; you already have the narrative in your LinkedIn post
- [ ] Rewrite Cuckoo as seven decision cards
- [ ] Restructure Balkan Transfer around the "resolve decisions" reframe
- [ ] Merge the two Morpa pages
- [ ] Decide: keep, rewrite, or cut She Ventures and Akbank
- [ ] Assemble the testimonial section, bilingual

**Free win, do it this week:** apply the fixes table in `03-COPY.md` to the current Webflow site. An hour of work, removes the worst signals while the rebuild happens. And fix the Bild number on LinkedIn.

## Phase 2 — Design _(1–2 weeks)_

- [ ] **Dark theme only** — but every colour as a semantic token so light is one file later, not a refactor
- [ ] Warm dark base, generous radii, one playful accent
- [ ] Type scale, spacing scale, elevation
- [ ] Home · case study template · about · testimonials · locked-case-study state
- [ ] Motion spec: spring constants, interruption behaviour, reduced-motion
- [ ] Brand logo row — nine real logos, and the surface the cat will paw
- [ ] Mobile. Recruiters read on phones.

I can produce a multi-artboard design canvas you can push around directly, instead of flat mockups.

## Phase 3 — Build _(2–3 weeks)_

Target: `github.com/aydintokur1-dev/portfolio` (empty, `main`, ready)

- [ ] Next.js + Tailwind tokens + MDX case studies, deployed on Vercel
- [ ] **Interactive case-study demos** — Cuckoo chips, the sponsor-logo badge constraint, the Balkan booking stepper. This is the design-engineer proof; don't cut it for schedule.
- [ ] Password gate on unreleased Pickleball routes — Edge Middleware, env var, friendly unlock interaction
- [ ] `next/image` pipeline — your PNGs are 1–2 MB and need AVIF/WebP
- [ ] Accessibility: keyboard paths, focus states, contrast, `prefers-reduced-motion`
- [ ] Lighthouse ≥ 95. A design engineer's slow site is a contradiction.

## Phase 4 — The cat _(last, and cuttable)_

See `06-CAT.md`. Built last, judged honestly, shipped only if it clears the bar.

- [ ] Rive state machine: idle · sleep · cursor-track · paw · curl-up
- [ ] Wire to the brand row
- [ ] Reduced-motion static state, `aria-hidden`, off-screen pause
- [ ] 404 and empty states

## Phase 5 — Ship _(2 days)_

- [ ] Custom domain, 301s from every Webflow URL
- [ ] Per-case-study OG images
- [ ] Update LinkedIn / Behance / CV links
- [ ] Keep Webflow live until DNS settles

---

## Folder

```
workspace/portfolio/
├── docs/
│   ├── 01-AUDIT.md       current site, honestly
│   ├── 02-DIRECTION.md   positioning, cute-but-senior, dark-first, stack
│   ├── 03-COPY.md        rewritten copy, drop-in
│   ├── 04-PLAN.md        this file
│   ├── 05-FACTS.md       canonical facts + all 8 testimonials
│   └── 06-CAT.md         the cat
├── raw/                  10 scraped pages + extracted text
└── assets/               61 images, full resolution (28 MB)
```

## Where to start

**The two flagship case studies — Pickleball and VOLGEN — before any design work.**

Everything else on this list is rearrangement of material that already exists. Those two are the only things that have to be created, they're the two that carry the positioning, and Pickleball's disclosure constraints will shape the visual direction of the whole site.
