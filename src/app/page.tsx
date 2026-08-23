import { Nav } from "@/components/Nav";
import { SayHi } from "@/components/SayHi";
import { MetaBar } from "@/components/MetaBar";
import { Wordmark } from "@/components/Wordmark";
import { BlurReveal } from "@/components/BlurReveal";
import { Sticker } from "@/components/Sticker";
import { WorkGrid, type Work } from "@/components/WorkGrid";

const WORK: Work[] = [
  {
    title: "Six products, one system",
    org: "Pickleball.com",
    meta: "2024 – present · Senior Product Designer",
    blurb:
      "Pickleball.com, Tournaments, Team Leagues, Leagues, Clubs, Rankings — kept feeling like one place through shared components, type, and behaviour.",
    tint: "green",
    tilt: -3,
  },
  {
    title: "Research to live in three days",
    org: "VOLGEN",
    meta: "2026 · Designed & built · Next.js",
    blurb:
      "NotebookLM for the competitor work and IA, then built — with a working CRM flow — in the same three days.",
    tint: "yellow",
    tilt: 2.5,
  },
  {
    title: "From form-filling to decision-making",
    org: "Balkan Transfer",
    meta: "2023 · Lead Product Designer",
    blurb:
      "Stop asking travellers to fill a form; help them resolve decisions. Web and mobile, with self-service booking changes.",
    tint: "blue",
    tilt: -2,
  },
  {
    title: "Seven small decisions that made a wellbeing app usable",
    org: "Cuckoo",
    meta: "2022 – 2023 · Product Designer",
    blurb:
      "A two-word label fix, chip-based selection, and a completion badge designed around sponsor logos we weren't allowed to cover.",
    tint: "lavender",
    tilt: 2,
  },
];

export default function Home() {
  return (
    <>
      <div className="rails" aria-hidden />
      <Nav />

      <main id="top" className="relative z-[1] flex-1">
        {/* ───────────── hero ───────────── */}
        <section className="paper">
          {/* the one big thing: the wordmark breaks out of the column */}
          <div className="mx-auto max-w-[1400px] px-5 pt-28 sm:px-8 sm:pt-32">
            <MetaBar />
            <div className="enter-scale mt-8 sm:mt-10">
              <Wordmark />
            </div>
          </div>

          {/* everything else lives in the column */}
          <div className="column mt-14 pb-20 sm:mt-20 sm:pb-24">
            <p className="t-h2 text-[clamp(1.5rem,2.6vw,2rem)]">
              <BlurReveal as="span" className="text-text-muted">
                Your friendly neighborhood
              </BlurReveal>{" "}
              <BlurReveal as="span" className="text-text" delay={0.2}>
                design engineer.
              </BlurReveal>
            </p>

            <p className="t-body mt-5 max-w-[56ch] text-text-muted">
              I design product systems and build them. At Pickleball.com I keep six products
              feeling like one place. Nights and weekends I take things from research to live
              on my own.
            </p>
            <p className="t-body mt-3 max-w-[56ch] text-text">
              Because I build, I know what actually gets made, what breaks, and where the real
              constraints sit. My design decisions survive contact with production instead of
              dying at handoff.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-2">
              <a
                href="mailto:aydintokur1@gmail.com?subject=Hi%20Ayd%C4%B1n!"
                className="btn-ink pressable inline-flex h-9 items-center gap-2 rounded-[var(--radius-pill)] px-4 text-[0.8125rem] font-medium"
              >
                Say hi
                <span aria-hidden>→</span>
              </a>
              <Sticker tint="green">Design systems</Sticker>
              <Sticker tint="blue">Next.js · React</Sticker>
              <Sticker tint="yellow">Motion</Sticker>
              <Sticker tint="lavender">AI-assisted</Sticker>
            </div>
          </div>
        </section>

        {/* ───────────── work ───────────── */}
        <section id="work" className="hairline">
          <div className="column py-16 sm:py-20">
            <div className="flex items-end justify-between gap-6">
              <BlurReveal className="t-h2 text-[clamp(1.5rem,2.6vw,2rem)] text-text">
                Selected work, in depth.
              </BlurReveal>
              <span className="t-mono hidden text-text-faint sm:block">07 projects</span>
            </div>
            <div className="mt-8">
              <WorkGrid items={WORK} />
            </div>
          </div>
        </section>

        {/* ───────────── about (stub) ───────────── */}
        <section id="about" className="hairline">
          <div className="column py-16 sm:py-20">
            <BlurReveal className="t-h2 max-w-[24ch] text-[clamp(1.5rem,2.6vw,2rem)] text-text">
              Warm on the surface. Ruthless underneath.
            </BlurReveal>
            <p className="t-body mt-4 max-w-[56ch] text-text-muted">
              The personality lives in the motion and the small interactions. The discipline
              lives in the spacing, the type, and the states nobody specs. That&apos;s usually
              where a product either feels considered or doesn&apos;t.
            </p>
          </div>
        </section>
      </main>

      <footer id="contact" className="hairline relative z-[1]">
        <div className="column t-mono flex flex-wrap items-center justify-between gap-4 py-6 text-text-faint">
          <span lang="tr">Aydın Tokur</span>
          <span>Istanbul · Built with Next.js, Motion, and a cat</span>
        </div>
      </footer>

      <SayHi />
    </>
  );
}
