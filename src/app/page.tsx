import { Nav } from "@/components/Nav";
import { SayHi } from "@/components/SayHi";
import { MetaBar } from "@/components/MetaBar";
import { Wordmark } from "@/components/Wordmark";
import { BlurReveal } from "@/components/BlurReveal";
import { Sticker } from "@/components/Sticker";

const WORK = [
  {
    title: "Six products, one system",
    org: "Pickleball.com",
    meta: "2024 – present · Senior Product Designer",
    blurb:
      "Pickleball.com, Tournaments, Team Leagues, Leagues, Clubs, Rankings. I keep them feeling like one place — shared components, shared type, shared behaviour.",
    tint: "green" as const,
    tilt: -3,
  },
  {
    title: "Research to live in three days",
    org: "VOLGEN",
    meta: "2026 · Designed & built · Next.js",
    blurb:
      "NotebookLM for the competitor work and IA, then built it — with a working CRM flow — in the same three days. Moving fast shouldn't mean losing the human parts.",
    tint: "yellow" as const,
    tilt: 2.5,
  },
  {
    title: "From form-filling to decision-making",
    org: "Balkan Transfer",
    meta: "2023 · Lead Product Designer",
    blurb:
      "Stop asking travellers to fill a form; help them resolve decisions. Web and mobile, shipped with reusable passenger profiles and self-service booking changes.",
    tint: "blue" as const,
    tilt: -2,
  },
];

export default function Home() {
  return (
    <>
      <Nav />

      <main id="top" className="flex-1">
        {/* ───────────── hero ───────────── */}
        <section className="paper relative">
          <div className="mx-auto max-w-[1400px] px-5 pt-28 sm:px-8 sm:pt-32">
            <MetaBar />

            <div className="enter-scale mt-10 sm:mt-14">
              <Wordmark />
            </div>

            <div className="mt-10 grid gap-10 sm:mt-14 lg:grid-cols-12 lg:gap-8">
              <div className="lg:col-span-7">
                <p className="t-h2 text-[clamp(1.75rem,3.6vw,3rem)]">
                  <BlurReveal as="span" className="text-text-muted">
                    Your friendly neighborhood
                  </BlurReveal>{" "}
                  <BlurReveal as="span" className="text-text" delay={0.2}>
                    design engineer.
                  </BlurReveal>
                </p>
              </div>

              <div className="lg:col-span-5 lg:pt-2">
                <p className="t-body text-text-muted">
                  I design product systems and build them. At Pickleball.com I keep six
                  products feeling like one place. Nights and weekends I take things from
                  research to live on my own.
                </p>
                <p className="t-body mt-4 text-text">
                  Because I build, I know what actually gets made, what breaks, and where
                  the real constraints sit. My design decisions survive contact with
                  production instead of dying at handoff.
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  <Sticker tint="green">Design systems</Sticker>
                  <Sticker tint="blue">Next.js · React</Sticker>
                  <Sticker tint="yellow">Motion</Sticker>
                  <Sticker tint="lavender">AI-assisted</Sticker>
                  <Sticker tint="pink">Istanbul</Sticker>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ───────────── work ───────────── */}
        <section id="work" className="mx-auto max-w-[1400px] px-5 pb-24 pt-28 sm:px-8 sm:pt-36">
          <div className="flex items-end justify-between gap-6">
            <BlurReveal className="t-h2 text-[clamp(2rem,4.6vw,3.75rem)] text-text">
              Selected work, in depth.
            </BlurReveal>
            <span className="t-mono hidden text-text-faint sm:block">07 projects</span>
          </div>

          <ul className="mt-10 grid gap-5 md:grid-cols-3">
            {WORK.map((w) => (
              <li key={w.org}>
                <a
                  href="#"
                  className="pressable hoverable group block h-full rounded-[var(--radius-lg)] border border-border bg-surface p-5"
                >
                  <div className="relative">
                    <div
                      className="aspect-[4/3] w-full rounded-[var(--radius-md)] border border-border"
                      style={{ background: `var(--tint-${w.tint})` }}
                    />
                    {/* a sticker *on* a surface is where tilt reads as intent */}
                    <Sticker tint={w.tint} tilt={w.tilt} className="absolute -left-2 -top-2 bg-surface shadow-lg">
                      {w.org}
                    </Sticker>
                  </div>
                  <div className="mt-5 flex items-center justify-between">
                    <span className="t-mono text-text-faint">{w.meta}</span>
                    <span className="t-mono text-text-faint">→</span>
                  </div>
                  <h3 className="t-h2 mt-3 text-[1.35rem] text-text">{w.title}</h3>
                  <p className="mt-3 text-[0.95rem] leading-relaxed text-text-muted">{w.blurb}</p>
                </a>
              </li>
            ))}
          </ul>
        </section>

        {/* ───────────── about (stub) ───────────── */}
        <section id="about" className="mx-auto max-w-[1400px] px-5 pb-32 sm:px-8">
          <BlurReveal className="t-h2 max-w-[22ch] text-[clamp(1.75rem,3.6vw,3rem)] text-text">
            Warm on the surface. Ruthless underneath.
          </BlurReveal>
          <p className="t-body mt-5 max-w-[60ch] text-text-muted">
            The personality lives in the motion and the small interactions. The discipline
            lives in the spacing, the type, and the states nobody specs. That&apos;s usually
            where a product either feels considered or doesn&apos;t.
          </p>
        </section>
      </main>

      <footer id="contact" className="border-t border-border">
        <div className="t-mono mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-4 px-5 py-6 text-text-faint sm:px-8">
          <span lang="tr">Aydın Tokur</span>
          <span>Istanbul · Built with Next.js, Motion, and a cat</span>
        </div>
      </footer>

      <SayHi />
    </>
  );
}
