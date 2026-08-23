"use client";

import { useState } from "react";
import type { Testimonial } from "@/content/types";
import { BlurReveal } from "./BlurReveal";

/**
 * Eight recommendations. One leads as a centred quote (LaunchFolio 0:04),
 * the rest sit in a grid (0:12). Turkish ones ship bilingually — original
 * by default, English behind a small toggle. Honest, and a tiny bit of craft.
 */
export function Testimonials({ items }: { items: Testimonial[] }) {
  const lead = items.find((t) => t.featured) ?? items[0];
  const rest = items.filter((t) => t !== lead);

  return (
    <section id="kind-words" className="hairline">
      <div className="column py-16 sm:py-20">
        <div className="flex items-end justify-between gap-6">
          <BlurReveal className="t-h2 text-text">Kind words, on the record.</BlurReveal>
          <span className="t-mono hidden text-text-faint sm:block">{items.length} recommendations</span>
        </div>

        {/* lead quote */}
        <figure className="mx-auto mt-10 max-w-[56ch] text-center">
          <blockquote className="t-h2 text-[1.25rem] leading-snug text-text sm:text-[1.5rem]">
            “{lead.pull ?? lead.text}”
          </blockquote>
          <figcaption className="mt-4">
            <span className="block text-[0.875rem] font-medium text-text">{lead.name}</span>
            <span className="t-mono block text-text-faint">
              {lead.role} · {lead.relation}
            </span>
          </figcaption>
        </figure>

        <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((t) => (
            <Card key={t.name} t={t} />
          ))}
        </ul>
      </div>
    </section>
  );
}

function Card({ t }: { t: Testimonial }) {
  const [showEn, setShowEn] = useState(false);
  const bilingual = t.lang === "tr" && !!t.en;
  const body = bilingual && showEn ? t.en! : t.text;

  return (
    <li className="flex flex-col rounded-[var(--radius-lg)] border border-border bg-surface p-5">
      <div className="flex items-start justify-between gap-3">
        <span aria-hidden className="t-h2 -mt-1 text-[1.5rem] leading-none text-text-faint">
          “
        </span>
        {bilingual && (
          <div role="group" aria-label="Language" className="flex rounded-[var(--radius-pill)] border border-border p-0.5">
            {(["tr", "en"] as const).map((l) => {
              const on = (l === "en") === showEn;
              return (
                <button
                  key={l}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setShowEn(l === "en")}
                  className={`pressable t-mono rounded-[var(--radius-pill)] px-2 py-0.5 transition-colors ${
                    on ? "bg-surface-2 text-text" : "text-text-faint hover:text-text"
                  }`}
                >
                  {l}
                </button>
              );
            })}
          </div>
        )}
      </div>
      <p lang={bilingual && !showEn ? "tr" : "en"} className="t-small mt-2 flex-1 text-text-muted">
        {body}
      </p>
      <footer className="mt-5 border-t border-border pt-3">
        <span className="block text-[0.8125rem] font-medium text-text">{t.name}</span>
        <span className="t-mono block text-text-faint">
          {t.role} · {t.relation} · {t.date}
        </span>
      </footer>
    </li>
  );
}
