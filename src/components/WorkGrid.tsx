"use client";

import { motion } from "motion/react";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { Sticker } from "./Sticker";

/**
 * LaunchFolio's project entrance (reference video, 0:02): the cards arrive as
 * a loose, slightly rotated pile and settle into the grid. One-shot, on first
 * view — the rare tier, so it's allowed a longer beat. Reduced motion: fade.
 */
export type Work = {
  title: string;
  org: string;
  meta: string;
  blurb: string;
  tint: "blue" | "yellow" | "green" | "lavender" | "pink";
  tilt: number;
};

// where each card starts relative to its grid slot (2-col grid, reading order)
const PILE = [
  "translate(34%, 22%) rotate(-6deg)",
  "translate(-34%, 22%) rotate(5deg)",
  "translate(34%, -22%) rotate(4deg)",
  "translate(-34%, -22%) rotate(-5deg)",
];

export function WorkGrid({ items }: { items: Work[] }) {
  const reduce = useReducedMotion();

  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {items.map((w, i) => (
        <motion.li
          key={w.org}
          initial={reduce ? { opacity: 0 } : { opacity: 0, transform: PILE[i % PILE.length] }}
          whileInView={{ opacity: 1, transform: "translate(0%, 0%) rotate(0deg)" }}
          viewport={{ once: true, margin: "0px 0px -15% 0px" }}
          transition={
            reduce
              ? { duration: 0.3 }
              : { type: "spring", duration: 0.8, bounce: 0, delay: i * 0.06 }
          }
          className="will-change-transform"
        >
          <a
            href="#"
            className="pressable hoverable group block h-full rounded-[var(--radius-lg)] border border-border bg-surface p-3"
          >
            <div className="relative">
              <div
                className="aspect-[16/10] w-full rounded-[var(--radius-md)] border border-border"
                style={{ background: `var(--tint-${w.tint})` }}
              />
              {/* a sticker *on* a surface is where tilt reads as intent */}
              <Sticker tint={w.tint} tilt={w.tilt} className="absolute -left-1.5 -top-1.5 bg-surface shadow-sm">
                {w.org}
              </Sticker>
            </div>
            <div className="px-1 pb-1 pt-3">
              <div className="flex items-center justify-between gap-3">
                <h3 className="t-h2 text-[1.0625rem] text-text">{w.title}</h3>
                <span className="t-mono text-text-faint transition-transform group-hover:translate-x-0.5">→</span>
              </div>
              <p className="t-mono mt-1 text-text-faint">{w.meta}</p>
              <p className="t-small mt-2 text-text-muted">{w.blurb}</p>
            </div>
          </a>
        </motion.li>
      ))}
    </ul>
  );
}
