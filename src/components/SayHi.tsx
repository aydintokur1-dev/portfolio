"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { DUR, EASE_OUT } from "@/lib/motion";

/**
 * LaunchFolio's intent CTA: hidden on load, slides up after the first real
 * scroll — appears exactly when the visitor has shown interest, never before.
 * Exits the way it entered, faster than it entered (docs/07-MOTION.md).
 * Hysteresis on the threshold so scroll jitter can't make it flicker.
 */
const SHOW_AT = 260;
const HIDE_AT = 140;

export function SayHi() {
  const reduce = useReducedMotion();
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const onScroll = () =>
      setShown((s) => (s ? window.scrollY > HIDE_AT : window.scrollY > SHOW_AT));
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-5 z-40 flex justify-center px-4">
      <AnimatePresence>
        {shown && (
          <motion.a
            key="sayhi"
            href="mailto:aydintokur1@gmail.com?subject=Hi%20Ayd%C4%B1n!"
            initial={reduce ? { opacity: 0 } : { opacity: 0, transform: "translateY(110%)" }}
            animate={{
              opacity: 1,
              transform: "translateY(0%)",
              transition: { duration: DUR.slow, ease: EASE_OUT },
            }}
            exit={{
              opacity: 0,
              transform: reduce ? "translateY(0%)" : "translateY(110%)",
              transition: { duration: DUR.exit, ease: EASE_OUT },
            }}
            className="glass pressable pointer-events-auto flex items-center gap-3 rounded-[var(--radius-pill)] py-1.5 pl-4 pr-1.5 text-text"
          >
            <span className="flex flex-col leading-tight">
              <span className="text-[0.875rem] font-semibold">Say hi</span>
              <span className="t-mono text-text-muted">Email me — I reply</span>
            </span>
            <span className="btn-ink flex size-8 items-center justify-center rounded-[var(--radius-pill)]">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </motion.a>
        )}
      </AnimatePresence>
    </div>
  );
}
