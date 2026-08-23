"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";

/**
 * LaunchFolio's intent CTA: hidden on load, slides up after the first real
 * scroll — appears exactly when the visitor has shown interest, never before.
 * Exits the way it entered (docs/07-MOTION.md).
 */
export function SayHi() {
  const reduce = useReducedMotion();
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > 240);
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
            animate={{ opacity: 1, transform: "translateY(0%)" }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, transform: "translateY(110%)" }}
            transition={{ duration: 0.32, ease: [0.23, 1, 0.32, 1] }}
            className="glass pressable pointer-events-auto flex items-center gap-3 rounded-[var(--radius-pill)] py-2 pl-4 pr-2 text-text"
          >
            <span className="flex flex-col leading-tight">
              <span className="text-[0.95rem] font-semibold">Say hi</span>
              <span className="t-mono text-text-muted">Email me — I reply</span>
            </span>
            <span className="flex size-9 items-center justify-center rounded-[var(--radius-pill)] bg-accent text-accent-ink">
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
