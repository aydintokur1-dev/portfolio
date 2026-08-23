# Aydın Tokur — portfolio

Next.js 16 · Tailwind v4 · Motion 13 · TypeScript. Light theme first; dark is a token block away.

```
npm run dev        # http://localhost:3000
npm run build
```

## Where things live

| Path | What |
|---|---|
| `src/app/page.tsx` | Home: hero · brand row · work grid · testimonials · about · contact |
| `src/app/work/[slug]/` | Case studies, rendered from `src/content/work/*.ts` |
| `src/app/unlock/` + `src/proxy.ts` | Password gate for unreleased work (see below) |
| `src/content/` | All copy as typed data — case studies, testimonials, about, brands, image manifest |
| `src/components/` | Nav (with the cat), BlurReveal, WorkGrid, BrandRow, Testimonials, About, Footer… |
| `src/lib/motion.ts` | Motion tokens (mirror of the CSS custom properties) |
| `public/work/<slug>/` | Optimised WebP figures emitted by the image pipeline |
| `docs/` | Direction, copy, facts, motion spec, reference analysis |
| `plans/` | Motion audits and their status |
| `raw/`, `assets/` | Working material — gitignored |

## The password gate

Unreleased case studies (`GATED_SLUGS` in `src/lib/gate.ts`) redirect to `/unlock` unless a cookie holding a hash of the password is present. Set the password with an env var:

```
GATE_PASSWORD=your-password     # .env.local locally, project env on Vercel
```

Without it the dev fallback is `neighbor`. The password goes in outreach emails, never on the site.

## Decisions (short)

- **Positioning:** *Your friendly neighborhood design engineer. I design product systems and build them.*
- **Type:** Unbounded for the wordmark (modest size), Mona Sans for headings, Inter body, DM Mono labels. All free.
- **Motion:** one signature scroll animation (word-by-word blur reveal on headings), a critically-damped nav morph, a one-shot card fan-in, and a cat. Spec in `docs/07-MOTION.md`.
- **Name:** `Aydın` — dotless ı, `lang="tr"`, never uppercased.
