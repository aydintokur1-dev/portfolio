import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Breakable } from "@/components/Breakable";
import { notFound } from "next/navigation";
import { studies, getStudy } from "@/content/work";
import { isGated } from "@/lib/gate-client";
import { getCover, getFigure } from "@/lib/images";
import { Blocks } from "@/components/Blocks";
import { GateLink } from "@/components/GateLink";
import { CaseRail } from "@/components/CaseRail";
import { Compare } from "@/components/Compare";
import { InView } from "@/components/InView";
import { Footer } from "@/components/Footer";

export function generateStaticParams() {
  return studies.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata(
  props: PageProps<"/work/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const s = getStudy(slug);
  if (!s) return {};
  const title = `${s.org} — ${s.title} · Aydın`;
  return {
    title,
    description: s.summary,
    alternates: { canonical: `/work/${s.slug}` },
    openGraph: { title, description: s.summary, url: `/work/${s.slug}`, type: "article" },
    // unreleased studies sit behind the gate; keep them out of search too
    robots: isGated(s.slug) ? { index: false, follow: false } : undefined,
  };
}

export default async function CaseStudyPage(props: PageProps<"/work/[slug]">) {
  const { slug } = await props.params;
  const study = getStudy(slug);
  if (!study) notFound();

  const i = studies.findIndex((s) => s.slug === slug);
  const prev = studies[(i - 1 + studies.length) % studies.length];
  const next = studies[(i + 1) % studies.length];
  const cover = getFigure(study.slug, study.cover) ?? getCover(study.slug);

  return (
    <>
      <main style={{ ["--accent-rgb" as string]: `var(--tint-${study.tint})` }}>
        <CaseRail headings={study.sections.map((s) => s.heading)} />
        <article className="px-[var(--edge)]">
          {/* header */}
          <InView
            as="header"
            className="mx-auto max-w-[960px] pt-36"
            amount={0.05}
            hud={study.org.toUpperCase()}
          >
            <p className="t-label flex flex-wrap items-center gap-x-5 gap-y-2 text-[var(--faint)]">
              <Link
                href="/#work"
                className="text-[var(--muted)] transition-colors hover:text-[var(--ink)]"
              >
                ← INDEX
              </Link>
              <span>
                /{String(i + 1).padStart(2, "0")} OF{" "}
                {String(studies.length).padStart(2, "0")}
              </span>
              <span>{study.year}</span>
            </p>

            <h1 className="t-display t-display-xl mt-8">
              <span className="rv">
                <span className="rv-i">
                  <Breakable text={study.org} />
                </span>
              </span>
            </h1>
            <p className="t-display t-display-md mt-4 max-w-[26ch] text-[var(--muted)]">
              <span className="rv">
                <span
                  className="rv-i"
                  style={{ ["--rv-delay" as string]: "0.1s" }}
                >
                  {study.title}.
                </span>
              </span>
            </p>
            <p
              className="t-body-lg fade-up mt-7 max-w-[58ch] text-[var(--faint)]"
              style={{ ["--rv-delay" as string]: "0.2s" }}
            >
              {study.summary}
            </p>

            <dl
              className="fade-up mt-10 grid grid-cols-2 gap-x-8 gap-y-4 border-t border-[var(--hairline)] pt-6 md:grid-cols-4"
              style={{ ["--rv-delay" as string]: "0.3s" }}
            >
              {study.facts.map((f) => (
                <div key={f.label}>
                  <dt className="t-label text-[var(--faint)]">{f.label} /</dt>
                  <dd className="t-body mt-1 text-[var(--muted)]">{f.value}</dd>
                </div>
              ))}
            </dl>

            {study.link && (
              <a
                href={study.link.href}
                target="_blank"
                rel="noreferrer"
                className="pill t-label mt-8 inline-flex text-[var(--ink)]"
              >
                {study.link.label} — LIVE{" "}
                <span className="arr" aria-hidden>
                  ↗
                </span>
              </a>
            )}
          </InView>

          {/* cover */}
          <InView className="mx-auto mt-14 max-w-[1200px]" amount={0.1}>
            {study.coverCompare ? (
              <div className="fade-up">
                <Compare
                  variant="cover"
                  sides={[
                    {
                      img: getFigure(study.slug, study.coverCompare.before.src),
                      thumb: study.coverCompare.before.thumb
                        ? getFigure(study.slug, study.coverCompare.before.thumb)
                        : null,
                      key: study.coverCompare.before.src,
                      label: "BEFORE",
                    },
                    {
                      img: getFigure(study.slug, study.coverCompare.after.src),
                      thumb: study.coverCompare.after.thumb
                        ? getFigure(study.slug, study.coverCompare.after.thumb)
                        : null,
                      key: study.coverCompare.after.src,
                      label: "AFTER",
                    },
                  ]}
                />
              </div>
            ) : (
              <div className="mat fade-up">
                {cover ? (
                  <div className="mat-img">
                    <Image
                      src={cover.src}
                      width={cover.width}
                      height={cover.height}
                      alt={`${study.org} — cover`}
                      priority
                      sizes="(min-width: 1280px) 1200px, 100vw"
                    />
                  </div>
                ) : (
                  <div
                    className="mat-img flex aspect-[16/10] items-center justify-center bg-[var(--recess)]"
                    aria-hidden
                  >
                    <span className="t-label text-[var(--faint)]">
                      [ COVER — TO BE ADDED ]
                    </span>
                  </div>
                )}
              </div>
            )}
          </InView>

          {/* sections */}
          <div className="mx-auto max-w-[960px] pb-10 pt-20">
            {study.sections.map((sec, n) => (
              <InView
                as="section"
                key={n}
                id={`sec-${n}`}
                className="border-t border-[var(--hairline)] py-14 first:border-t-0"
                amount={0.08}
                hud={`${study.org.toUpperCase()} ${String(n + 1).padStart(2, "0")}`}
              >
                <div className="grid gap-8 lg:grid-cols-[13rem_1fr]">
                  <h2 className="t-label pt-1 text-[var(--faint)]">
                    <span style={{ color: "rgb(var(--accent-rgb))" }}>
                      {String(n + 1).padStart(2, "0")}
                    </span>{" "}
                    // {sec.heading}
                  </h2>
                  <Blocks blocks={sec.blocks} slug={study.slug} />
                </div>
              </InView>
            ))}
          </div>
        </article>

        {/* prev / next */}
        <nav aria-label="More work" className="hairline-t px-[var(--edge)]">
          <div className="mx-auto grid max-w-[960px] gap-4 py-14 sm:grid-cols-2">
            <StudyLink
              dir="prev"
              slug={prev.slug}
              org={prev.org}
              title={prev.title}
            />
            <StudyLink
              dir="next"
              slug={next.slug}
              org={next.org}
              title={next.title}
            />
          </div>
        </nav>

        <Footer />
      </main>
    </>
  );
}

function StudyLink({
  dir,
  slug,
  org,
  title,
}: {
  dir: "prev" | "next";
  slug: string;
  org: string;
  title: string;
}) {
  return (
    <GateLink
      slug={slug}
      className={`group rounded-[var(--r-card)] border border-[var(--hairline)] p-6 transition-colors duration-300 hover:border-[var(--hairline-strong)] ${
        dir === "next" ? "sm:text-right" : ""
      }`}
    >
      <span className="t-label text-[var(--faint)]">
        {dir === "prev" ? "← PREV" : "NEXT →"}
      </span>
      <span className="t-display t-display-md mt-3 block transition-colors duration-300 group-hover:text-[var(--accent)]">
        {org}
      </span>
      <span className="t-body mt-1 block text-[var(--faint)]">{title}.</span>
    </GateLink>
  );
}
