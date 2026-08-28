"use client";

import { useEffect, useRef } from "react";
import { testimonials } from "@/content/testimonials";
import type { Testimonial } from "@/content/types";
import { InView } from "@/components/InView";

const FEATURED = "Here's what my colleagues say about working with me.";

/** First sentence or two, capped — marquee cards want excerpts, not essays.
 *  Always ends on a sentence boundary: an over-long opening sentence is kept
 *  whole rather than sliced mid-word. */
function excerpt(text: string, max = 190): string {
  const flat = text.replace(/\n+/g, " ");
  if (flat.length <= max) return flat;
  const sentences = flat.split(". ");
  let out = "";
  for (const s of sentences) {
    if (out && (out + s).length > max) break;
    out += s + ". ";
  }
  return out.trim().replace(/\.\.$/, ".");
}

export function Testimonials() {
  const half = Math.ceil(testimonials.length / 2);
  const rowA = testimonials.slice(0, half);
  const rowB = testimonials.slice(half);

  return (
    <section className="py-28 sm:py-36" data-hud="SIGNED OFF">
      <InView className="px-[var(--edge)]">
        <div className="flex items-center gap-4">
          <span className="cross" aria-hidden />
          <div className="rule flex-1" />
        </div>
        <h2 className="t-label diode mt-8 text-[var(--ink)]">
          02 // Signed off{" "}
          <span className="text-[var(--faint)]">— ( {testimonials.length} ) recommendations, excerpted</span>
        </h2>
      </InView>

      <FeaturedQuote />

      <div className="mt-4 flex flex-col gap-5">
        <Marquee items={rowA} dur={70} />
        <Marquee items={rowB} dur={84} reverse />
      </div>

      <p className="t-label mt-12 px-[var(--edge)] text-[var(--faint)]">
        Two from people who managed me directly · one from a CEO · one from my current PM ·
        Turkish ones kept in Turkish, translated underneath ·{" "}
        <a
          href="https://www.linkedin.com/in/ayd%C4%B1n-tokur/details/recommendations/"
          target="_blank"
          rel="noreferrer"
          className="wipe-link text-[var(--ink)]"
        >
          full versions on LinkedIn ↗
        </a>
      </p>
    </section>
  );
}

/** Section intro line, lit character by character on scroll. */
function FeaturedQuote() {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let ctx: { kill: () => void } | undefined;
    let cancelled = false;
    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([{ gsap }, { ScrollTrigger }]) => {
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      const chars = Array.from(el.querySelectorAll<HTMLElement>(".q-ch"));
      ctx = ScrollTrigger.create({
        trigger: el,
        start: "top 80%",
        end: "bottom 55%",
        scrub: 0.3,
        onUpdate(self) {
          const lit = Math.floor(self.progress * chars.length);
          chars.forEach((c, i) => c.classList.toggle("lit", i <= lit));
        },
      });
    });
    return () => {
      cancelled = true;
      ctx?.kill();
    };
  }, []);

  return (
    <div className="px-[var(--edge)] py-20 sm:py-28">
      <p ref={ref} className="t-display t-display-lg mx-auto max-w-[26ch] text-center" style={{ lineHeight: 1.08 }}>
        {FEATURED.split("").map((ch, i) => (
          <span key={i} className="q-ch">{ch}</span>
        ))}
      </p>
    </div>
  );
}

function Marquee({ items, dur, reverse }: { items: Testimonial[]; dur: number; reverse?: boolean }) {
  const track = [...items, ...items];
  return (
    <div className="marquee" style={{ ["--marquee-dur" as string]: `${dur}s` }}>
      <div className="marquee-track gap-5 pr-5" style={reverse ? { animationDirection: "reverse" } : undefined}>
        {track.map((t, i) => (
          <Card key={i} t={t} hidden={i >= items.length} />
        ))}
      </div>
    </div>
  );
}

function Card({ t, hidden }: { t: Testimonial; hidden?: boolean }) {
  return (
    <figure
      aria-hidden={hidden || undefined}
      className="w-[min(84vw,420px)] shrink-0 rounded-[var(--r-card)] border border-[var(--hairline)] bg-[rgba(242,239,229,0.018)] p-6"
    >
      <blockquote className="t-body text-[var(--muted)]">
        “{t.excerpt ?? excerpt(t.text)}”
        {t.lang === "tr" && t.en && (
          <span className="t-body mt-3 block text-[var(--faint)]">EN — “{t.excerptEn ?? excerpt(t.en, 150)}”</span>
        )}
      </blockquote>
      <figcaption className="t-label mt-5 text-[var(--faint)]">
        <span className="block text-[var(--ink)]">{t.name}</span>
        <span className="mt-1 block">{t.role}</span>
        <span className="mt-1 block">{t.relation} · {t.date}</span>
      </figcaption>
    </figure>
  );
}
