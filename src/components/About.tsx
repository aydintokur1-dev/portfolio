import Image from "next/image";
import type { Experience } from "@/content/types";
import { getPortrait } from "@/lib/images";
import { BlurReveal } from "./BlurReveal";
import { Sticker } from "./Sticker";

/**
 * About: portrait + bio (LaunchFolio 0:06), then experience, education,
 * certifications (three featured, the rest behind a disclosure), skills.
 */
export function About({
  bio,
  experience,
  education,
  certifications,
  skills,
  languages,
}: {
  bio: string[];
  experience: Experience[];
  education: { school: string; degree: string; period: string }[];
  certifications: { name: string; issuer: string; year: string; featured?: boolean }[];
  skills: string[];
  languages: { name: string; level: string }[];
}) {
  const portrait = getPortrait();
  const featuredCerts = certifications.filter((c) => c.featured);
  const otherCerts = certifications.filter((c) => !c.featured);

  return (
    <section id="about" className="hairline">
      <div className="column py-16 sm:py-20">
        <BlurReveal className="t-h2 max-w-[24ch] text-text">About, briefly.</BlurReveal>

        <div className="mt-8 grid gap-8 sm:grid-cols-[200px_1fr] sm:gap-10">
          <div>
            <div className="overflow-hidden rounded-[var(--radius-lg)] border border-border bg-surface-2">
              {portrait ? (
                <Image
                  src={portrait.src}
                  width={portrait.width}
                  height={portrait.height}
                  alt="Aydın, in a camping chair, with a poodle asleep on his lap"
                  sizes="200px"
                  className="block aspect-square h-auto w-full object-cover"
                />
              ) : (
                <div className="aspect-square w-full" aria-hidden />
              )}
            </div>
            <p className="mt-3 text-[0.875rem] font-medium text-text" lang="tr">
              Aydın Tokur
            </p>
            <p className="t-mono text-text-faint">Product designer & design engineer</p>
            <ul className="mt-4 flex flex-wrap gap-1.5">
              {skills.map((s) => (
                <li key={s}>
                  <Sticker tint="blue">{s}</Sticker>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            {bio.map((p, i) => (
              <p key={i} className={`t-body max-w-[60ch] ${i === 0 ? "text-text" : "text-text-muted"}`}>
                {p}
              </p>
            ))}
          </div>
        </div>

        {/* experience */}
        <div className="mt-14 grid gap-8 sm:grid-cols-[9rem_1fr] sm:gap-8">
          <h3 className="t-mono pt-1 text-text-faint">Experience</h3>
          <ol className="divide-y divide-border">
            {experience.map((e) => (
              <li key={e.org + e.period} className="grid gap-1 py-4 first:pt-0 sm:grid-cols-[10rem_1fr] sm:gap-6">
                <div>
                  <p className="text-[0.875rem] font-medium text-text">{e.org}</p>
                  <p className="t-mono text-text-faint">{e.period}</p>
                </div>
                <div>
                  <p className="text-[0.875rem] text-text">{e.role}</p>
                  <p className="t-small mt-1 text-text-muted">{e.summary}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* education + certs + languages */}
        <div className="mt-10 grid gap-8 sm:grid-cols-[9rem_1fr] sm:gap-8">
          <h3 className="t-mono pt-1 text-text-faint">Education</h3>
          <ul className="space-y-3">
            {education.map((e) => (
              <li key={e.school}>
                <p className="text-[0.875rem] font-medium text-text">{e.school}</p>
                <p className="t-small text-text-muted">
                  {e.degree} · <span className="t-mono">{e.period}</span>
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10 grid gap-8 sm:grid-cols-[9rem_1fr] sm:gap-8">
          <h3 className="t-mono pt-1 text-text-faint">Certifications</h3>
          <div>
            <ul className="space-y-2">
              {featuredCerts.map((c) => (
                <li key={c.name} className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <span className="text-[0.875rem] text-text">{c.name}</span>
                  <span className="t-mono text-text-faint">
                    {c.issuer} · {c.year}
                  </span>
                </li>
              ))}
            </ul>
            {otherCerts.length > 0 && (
              <details className="group mt-3">
                <summary className="t-mono cursor-pointer list-none text-text-faint underline-offset-4 hover:underline">
                  <span className="group-open:hidden">+ {otherCerts.length} more</span>
                  <span className="hidden group-open:inline">− fewer</span>
                </summary>
                <ul className="mt-3 space-y-2 border-t border-border pt-3">
                  {otherCerts.map((c) => (
                    <li key={c.name} className="flex flex-wrap items-baseline justify-between gap-x-4">
                      <span className="t-small text-text-muted">{c.name}</span>
                      <span className="t-mono text-text-faint">
                        {c.issuer} · {c.year}
                      </span>
                    </li>
                  ))}
                </ul>
              </details>
            )}
          </div>
        </div>

        <div className="mt-10 grid gap-8 sm:grid-cols-[9rem_1fr] sm:gap-8">
          <h3 className="t-mono pt-1 text-text-faint">Languages</h3>
          <ul className="flex flex-wrap gap-x-6 gap-y-1">
            {languages.map((l) => (
              <li key={l.name} className="text-[0.875rem] text-text">
                {l.name} <span className="t-mono text-text-faint">· {l.level}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
