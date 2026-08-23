import { Nav } from "@/components/Nav";
import { SayHi } from "@/components/SayHi";
import { MetaBar } from "@/components/MetaBar";
import { Wordmark } from "@/components/Wordmark";
import { BlurReveal } from "@/components/BlurReveal";
import { Sticker } from "@/components/Sticker";
import { WorkGrid } from "@/components/WorkGrid";
import { BrandRow } from "@/components/BrandRow";
import { About } from "@/components/About";
import { Testimonials } from "@/components/Testimonials";
import { Footer } from "@/components/Footer";
import { studies } from "@/content/work";
import { testimonials } from "@/content/testimonials";
import { bio, experience, education, certifications, skills, languages } from "@/content/about";
import { brands } from "@/content/brands";
import { getCover } from "@/lib/images";

export default function Home() {
  const covers = Object.fromEntries(studies.map((s) => [s.slug, getCover(s.slug)]));

  return (
    <>
      <div className="rails" aria-hidden />
      <Nav />

      <main id="top" className="relative z-[1] flex-1">
        {/* ───────────── hero ───────────── */}
        <section className="paper">
          <div className="column pt-28 sm:pt-32">
            <MetaBar />

            <div className="enter-scale mt-12 sm:mt-16">
              <Wordmark />
              <h1 className="t-h1 mt-4">
                <BlurReveal as="span" className="text-text-muted">
                  Your friendly neighborhood
                </BlurReveal>{" "}
                <BlurReveal as="span" className="text-text" delay={0.2}>
                  design engineer.
                </BlurReveal>
              </h1>
            </div>

            <p className="t-body mt-6 max-w-[56ch] text-text-muted">
              I design product systems and build them. At Pickleball.com I keep six products
              feeling like one place. Nights and weekends I take things from research to live
              on my own.
            </p>
            <p className="t-body mt-3 max-w-[56ch] text-text">
              Because I build, I know what actually gets made, what breaks, and where the real
              constraints sit. My design decisions survive contact with production instead of
              dying at handoff.
            </p>

            <div className="mb-20 mt-7 flex flex-wrap items-center gap-2 sm:mb-24">
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

        <BrandRow brands={brands} />

        {/* ───────────── work ───────────── */}
        <section id="work" className="hairline">
          <div className="column py-16 sm:py-20">
            <div className="flex items-end justify-between gap-6">
              <BlurReveal className="t-h2 text-text">Selected work, in depth.</BlurReveal>
              <span className="t-mono hidden text-text-faint sm:block">
                {String(studies.length).padStart(2, "0")} projects
              </span>
            </div>
            <p className="t-body mt-3 max-w-[56ch] text-text-muted">
              Two I designed and built end to end, four I led or shaped with a team, one that
              was a three-day test I nearly failed on day one. Unreleased Pickleball work sits
              behind a password — ask me for it.
            </p>
            <div className="mt-8">
              <WorkGrid items={studies} covers={covers} />
            </div>
          </div>
        </section>

        <Testimonials items={testimonials} />

        <About
          bio={bio}
          experience={experience}
          education={education}
          certifications={certifications}
          skills={skills}
          languages={languages}
        />
      </main>

      <Footer />
      <SayHi />
    </>
  );
}
