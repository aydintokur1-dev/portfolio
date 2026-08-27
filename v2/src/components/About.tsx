import Image from "next/image";
import { bio, experience, education, certifications, skills, languages } from "@/content/about";
import { getPortrait } from "@/lib/images";
import { InView } from "@/components/InView";

export function About() {
  const portrait = getPortrait();
  const featured = certifications.filter((c) => c.featured);

  return (
    <section id="about" className="px-[var(--edge)] py-28 sm:py-36" data-hud="OPERATOR">
      <InView>
        <div className="flex items-center gap-4">
          <span className="cross" aria-hidden />
          <div className="rule flex-1" />
        </div>
        <h2 className="t-label diode mt-8 text-[var(--ink)]">
          03 // Operator <span className="text-[var(--faint)]">— Istanbul, TR · remote-friendly</span>
        </h2>
      </InView>

      <div className="mt-14 grid gap-14 lg:grid-cols-[minmax(260px,0.8fr)_1.6fr]">
        <InView amount={0.1}>
          <div className="fade-up lg:sticky lg:top-28">
            <div className="work-cover max-w-[420px]">
              {portrait ? (
                <Image
                  src={portrait.src}
                  width={portrait.width}
                  height={portrait.height}
                  alt="Aydın"
                  sizes="(min-width: 1024px) 30vw, 80vw"
                />
              ) : (
                <div className="flex aspect-[4/5] items-center justify-center">
                  <span className="t-label text-[var(--faint)]">[ PORTRAIT ]</span>
                </div>
              )}
            </div>
            <p className="t-label mt-4 text-[var(--faint)]">
              FIG. A — the operator. <span className="text-[var(--muted)]">Turkish (native) · English (full professional)</span>
            </p>
          </div>
        </InView>

        <div>
          <InView className="flex flex-col gap-5">
            {bio.map((p, i) => (
              <p
                key={i}
                className={`fade-up ${i === 0 ? "t-display t-display-md max-w-[30ch]" : "t-body max-w-[62ch] text-[var(--muted)]"}`}
                style={{ ["--rv-delay" as string]: `${i * 0.06}s` }}
              >
                {p}
              </p>
            ))}
          </InView>

          <InView className="mt-16">
            <h3 className="t-label text-[var(--faint)]">EXPERIENCE /</h3>
            <ol className="mt-4">
              {experience.map((e, i) => (
                <li key={e.org} className="fade-up hairline-t grid gap-1 py-5 sm:grid-cols-[10rem_1fr] sm:gap-6" style={{ ["--rv-delay" as string]: `${i * 0.05}s` }}>
                  <span className="t-label pt-1 text-[var(--faint)]">{e.period}</span>
                  <div>
                    <p className="t-body text-[var(--ink)]">
                      {e.org} <span className="text-[var(--muted)]">— {e.role}</span>
                      {e.location && <span className="t-label ml-3 text-[var(--faint)]">{e.location}</span>}
                    </p>
                    <p className="t-body mt-1 max-w-[62ch] text-[var(--faint)]">{e.summary}</p>
                  </div>
                </li>
              ))}
            </ol>
          </InView>

          <InView className="mt-14 grid gap-10 sm:grid-cols-2">
            <div className="fade-up">
              <h3 className="t-label text-[var(--faint)]">CAPABILITIES /</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {skills.map((s) => (
                  <li key={s} className="chip t-label">{s}</li>
                ))}
              </ul>
            </div>
            <div className="fade-up" style={{ ["--rv-delay" as string]: "0.1s" }}>
              <h3 className="t-label text-[var(--faint)]">CURRENT CERTIFICATIONS / ( {certifications.length} ) TOTAL</h3>
              <ul className="mt-4 flex flex-col gap-2">
                {featured.map((c) => (
                  <li key={c.name} className="t-body text-[var(--muted)]">
                    {c.name} <span className="t-label ml-2 text-[var(--faint)]">{c.issuer} · {c.year}</span>
                  </li>
                ))}
              </ul>
              <p className="t-label mt-4 text-[var(--faint)]">
                {education.map((e) => `${e.school} — ${e.degree}`).join(" · ")}
              </p>
              <p className="t-label mt-2 text-[var(--faint)]">
                {languages.map((l) => `${l.name}: ${l.level}`).join(" · ")}
              </p>
            </div>
          </InView>
        </div>
      </div>
    </section>
  );
}
