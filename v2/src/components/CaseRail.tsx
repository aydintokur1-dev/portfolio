"use client";

import { useEffect, useState } from "react";

/**
 * Right-edge chapter rail: one dash per section, growing + tinting when
 * active. Desktop only; a map of the case study you can feel.
 */
export function CaseRail({ headings }: { headings: string[] }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const els = headings.map((_, i) => document.getElementById(`sec-${i}`)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(Number(e.target.id.split("-")[1]));
        }
      },
      { rootMargin: "-35% 0px -55% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [headings]);

  return (
    <nav
      aria-label="Chapters"
      className="fixed right-[calc(var(--edge)/2)] top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-3 xl:flex"
    >
      {headings.map((h, i) => (
        <a key={i} href={`#sec-${i}`} className="group flex items-center gap-3" title={h}>
          <span
            className={`t-label whitespace-nowrap opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${
              i === active ? "text-[rgb(var(--accent-rgb))]" : "text-[var(--faint)]"
            }`}
          >
            {h}
          </span>
          <span
            className="block h-px transition-all duration-500"
            style={{
              width: i === active ? 26 : 10,
              background: i === active ? "rgb(var(--accent-rgb))" : "var(--faint)",
              boxShadow: i === active ? "0 0 8px rgba(var(--accent-rgb),.6)" : undefined,
            }}
          />
        </a>
      ))}
    </nav>
  );
}
