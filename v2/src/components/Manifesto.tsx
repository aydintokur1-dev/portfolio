"use client";

import { useEffect, useRef } from "react";

const WORDS =
  `Because I build, I know what actually gets made, what breaks, and where the real constraints sit. My design decisions survive contact with production — instead of dying at handoff.`.split(" ");

const HOT = new Set(["build,", "breaks,", "production", "survive"]);

/**
 * The thesis, filled word by word as you scroll — ghost ink to cream,
 * hot words to accent. GSAP ScrollTrigger scrub; static-lit fallback for
 * reduced motion (handled in CSS).
 */
export function Manifesto() {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let ctx: { kill: () => void } | undefined;
    let cancelled = false;

    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([{ gsap }, { ScrollTrigger }]) => {
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      const words = Array.from(el.querySelectorAll<HTMLElement>(".mf-w"));
      const st = ScrollTrigger.create({
        trigger: el,
        start: "top 78%",
        end: "bottom 45%",
        scrub: 0.3,
        onUpdate(self) {
          const lit = Math.floor(self.progress * words.length);
          words.forEach((w, i) => w.classList.toggle("lit", i <= lit));
        },
      });
      ctx = st;
    });

    return () => {
      cancelled = true;
      ctx?.kill();
    };
  }, []);

  return (
    <section className="relative px-[var(--edge)] py-40 sm:py-56" data-hud="THESIS">
      <p
        ref={ref}
        className="t-display t-display-lg mx-auto max-w-[24ch] text-balance"
        style={{ lineHeight: 1.06 }}
      >
        {WORDS.map((w, i) => (
          <span key={i} className={`mf-w ${HOT.has(w) ? "hot" : ""}`}>
            {HOT.has(w) ? <em className="serif-accent">{w}</em> : w}
            {i < WORDS.length - 1 ? " " : ""}
          </span>
        ))}
      </p>
    </section>
  );
}
