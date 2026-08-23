import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { studies, getStudy } from "@/content/work";
import { getCover, getFigure } from "@/lib/images";
import { Nav } from "@/components/Nav";
import { Blocks } from "@/components/Blocks";
import { BlurReveal } from "@/components/BlurReveal";
import { Sticker } from "@/components/Sticker";
import { Footer } from "@/components/Footer";

export function generateStaticParams() {
  return studies.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata(props: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const s = getStudy(slug);
  if (!s) return {};
  return {
    title: `${s.title} — ${s.org} · Aydın Tokur`,
    description: s.summary,
  };
}

export default async function CaseStudyPage(props: PageProps<"/work/[slug]">) {
  const { slug } = await props.params;
  const study = getStudy(slug);
  if (!study) notFound();

  const i = studies.findIndex((s) => s.slug === slug);
  const prev = studies[(i - 1 + studies.length) % studies.length];
  const next = studies[(i + 1) % studies.length];
  // The 16:10 cover.webp crop is for the home grid tiles; here we show the
  // full cover figure at its real aspect ratio.
  const cover = getFigure(study.slug, study.cover) ?? getCover(study.slug);

  return (
    <>
      <div className="rails" aria-hidden />
      <Nav links={[{ href: "/#work", id: "work", label: "Work" }, { href: "/#about", id: "about", label: "About" }, { href: "/#contact", id: "contact", label: "Contact" }]} />

      <main id="top" className="relative z-[1] flex-1">
        <article>
          {/* ───────── header ───────── */}
          <header className="paper">
            <div className="column pt-28 sm:pt-32">
              <div className="flex flex-wrap items-center gap-2">
                <Link href="/#work" className="t-mono text-text-faint underline-offset-4 hover:underline">
                  ← Work
                </Link>
                <span className="t-mono text-text-faint">/</span>
                <Sticker tint={study.tint}>{study.year}</Sticker>
                {study.gated && <Sticker tint="yellow">Password-protected</Sticker>}
              </div>

              <h1 className="t-h1 mt-6 text-text">
                <BlurReveal as="span">{study.org}</BlurReveal>
              </h1>
              <p className="t-h2 mt-3 max-w-[26ch] text-[1.375rem] text-text-muted">{study.title}.</p>
              <p className="t-body mt-5 max-w-[60ch] text-text-muted">{study.summary}</p>

              <dl className="t-small mt-8 grid grid-cols-2 gap-x-6 gap-y-3 border-t border-border pt-5 sm:grid-cols-4">
                <Fact label="Year" value={study.year} />
                <Fact label="Role" value={study.role} />
                {study.facts.slice(0, 2).map((f) => (
                  <Fact key={f.label} label={f.label} value={f.value} />
                ))}
              </dl>
              {study.facts.length > 2 && (
                <dl className="t-small mt-3 grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-4">
                  {study.facts.slice(2).map((f) => (
                    <Fact key={f.label} label={f.label} value={f.value} />
                  ))}
                </dl>
              )}
              {study.link && (
                <a
                  href={study.link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-ink pressable mt-6 inline-flex h-9 items-center gap-2 rounded-[var(--radius-pill)] px-4 text-[0.8125rem] font-medium"
                >
                  {study.link.label} <span aria-hidden>↗</span>
                </a>
              )}
            </div>

            {/* cover */}
            <div className="column mt-10 sm:mt-12">
              <div
                className="overflow-hidden rounded-[var(--radius-lg)] border border-border"
                style={{ background: `var(--tint-${study.tint})` }}
              >
                {cover ? (
                  <Image
                    src={cover.src}
                    width={cover.width}
                    height={cover.height}
                    alt=""
                    priority
                    sizes="(min-width: 768px) 720px, 100vw"
                    className="block h-auto w-full"
                  />
                ) : (
                  <div className="aspect-[16/10] w-full" aria-hidden />
                )}
              </div>
            </div>
          </header>

          {/* ───────── sections ───────── */}
          <div className="column pb-8 pt-14 sm:pt-16">
            {study.sections.map((sec, n) => (
              <section key={n} className={`grid gap-4 py-8 sm:grid-cols-[11rem_1fr] sm:gap-8 ${n > 0 ? "border-t border-border" : ""}`}>
                <h2 className="t-mono pt-1 text-text-faint">
                  <span className="text-text">{String(n + 1).padStart(2, "0")}</span> · {sec.heading}
                </h2>
                <Blocks blocks={sec.blocks} slug={study.slug} tint={study.tint} />
              </section>
            ))}
          </div>

          {/* ───────── prev / next ───────── */}
          <nav aria-label="More work" className="hairline">
            <div className="column grid gap-3 py-10 sm:grid-cols-2">
              <StudyLink dir="prev" slug={prev.slug} title={prev.title} org={prev.org} />
              <StudyLink dir="next" slug={next.slug} title={next.title} org={next.org} />
            </div>
          </nav>
        </article>
      </main>

      <Footer />
    </>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="t-mono text-text-faint">{label}</dt>
      <dd className="mt-0.5 text-text">{value}</dd>
    </div>
  );
}

function StudyLink({
  dir,
  slug,
  title,
  org,
}: {
  dir: "prev" | "next";
  slug: string;
  title: string;
  org: string;
}) {
  return (
    <Link
      href={`/work/${slug}`}
      className={`pressable hoverable block rounded-[var(--radius-lg)] border border-border bg-surface p-4 ${dir === "next" ? "sm:text-right" : ""}`}
    >
      <span className="t-mono text-text-faint">{dir === "prev" ? "← Previous" : "Next →"}</span>
      <span className="t-h2 mt-2 block text-[1.0625rem] text-text">{org}</span>
      <span className="t-small mt-0.5 block text-text-muted">{title}</span>
    </Link>
  );
}
