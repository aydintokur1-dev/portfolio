"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import type { CaseStudy } from "@/content/types";
import { useReducedMotion } from "@/lib/use-reduced-motion";

/**
 * LaunchFolio's project entrance (reference video, 0:02): the cards arrive as
 * a loose, slightly rotated pile and settle into the grid. One-shot, on first
 * view — the rare tier, so it's allowed a longer beat. Reduced motion: fade.
 */

// where each card starts relative to its grid slot (2-col grid, reading order)
const PILE = [
  "translate(34%, 22%) rotate(-6deg)",
  "translate(-34%, 22%) rotate(5deg)",
  "translate(34%, -22%) rotate(4deg)",
  "translate(-34%, -22%) rotate(-5deg)",
];

export function WorkGrid({
  items,
  covers,
}: {
  items: CaseStudy[];
  covers: Record<string, { src: string; width: number; height: number } | null>;
}) {
  const reduce = useReducedMotion();

  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((w, i) => {
        const cover = covers[w.slug];
        return (
          <motion.li
            key={w.slug}
            initial={reduce ? { opacity: 0 } : { opacity: 0, transform: PILE[i % PILE.length] }}
            whileInView={{ opacity: 1, transform: "translate(0%, 0%) rotate(0deg)" }}
            viewport={{ once: true, margin: "0px 0px -15% 0px" }}
            transition={
              reduce
                ? { duration: 0.3 }
                : { type: "spring", duration: 0.8, bounce: 0, delay: (i % 4) * 0.06 }
            }
            className={w.tier === "flagship" && i === 0 ? "sm:col-span-2" : w.tier === "flagship" ? "lg:col-span-1" : undefined}
          >
            <Link
              href={`/work/${w.slug}`}
              className="pressable hoverable group block h-full rounded-[var(--radius-lg)] border border-border bg-surface p-3"
            >
              <div className="relative">
                <div
                  className={`w-full overflow-hidden rounded-[var(--radius-md)] border border-border ${
                    w.tier === "flagship" && i === 0 ? "aspect-[2/1]" : "aspect-[16/10]"
                  }`}
                  style={{ background: `var(--tint-${w.tint})` }}
                >
                  {cover && (
                    <Image
                      src={cover.src}
                      width={cover.width}
                      height={cover.height}
                      alt=""
                      sizes="(min-width: 768px) 360px, 100vw"
                      className="block h-full w-full object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.02]"
                    />
                  )}
                </div>
                {w.gated && (
                  <span className="t-mono absolute right-2 top-2 rounded-[var(--radius-pill)] bg-surface/90 px-2 py-0.5 text-text-faint backdrop-blur">
                    🔒 password
                  </span>
                )}
              </div>
              <div className="px-1 pb-1 pt-3">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="t-h2 text-[1.125rem] text-text">{w.org}</h3>
                  <span className="t-mono text-text-faint transition-transform group-hover:translate-x-0.5">→</span>
                </div>
                <p className="t-mono mt-1 text-text-faint">
                  {w.year} · {w.role}
                </p>
                <p className="t-small mt-2 text-text-muted">
                  <span className="font-medium text-text">{w.title}.</span> {w.summary}
                </p>
              </div>
            </Link>
          </motion.li>
        );
      })}
    </ul>
  );
}
