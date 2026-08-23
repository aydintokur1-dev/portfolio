"use client";

import { motion } from "motion/react";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import type { ElementType } from "react";
import { DUR, EASE_OUT } from "@/lib/motion";

/**
 * LaunchFolio's signature, measured live: per word,
 *   blur(5px) → 0 · opacity 0 → 1 · translateY(10px) → 0
 *   ~750ms settle · ~80ms stagger
 * with our curve instead of theirs. Headings only — it's the one
 * scroll animation on the site (docs/08-REFERENCES.md).
 *
 * Screen readers get the plain string (visually hidden); the animated
 * words are aria-hidden so AT never hears them one at a time.
 * Reduced motion: opacity only, no blur, no travel.
 */
export function BlurReveal({
  children,
  as: Tag = "h2",
  className = "",
  delay = 0,
  once = true,
}: {
  children: string;
  as?: ElementType;
  className?: string;
  delay?: number;
  once?: boolean;
}) {
  const reduce = useReducedMotion();
  const words = children.split(/(\s+)/).filter(Boolean);

  return (
    <Tag className={className}>
      <span className="sr-only">{children}</span>
      <span aria-hidden>
        {words.map((w, i) =>
          /^\s+$/.test(w) ? (
            <span key={i}> </span>
          ) : (
            <motion.span
              key={i}
              className="reveal-word inline-block"
              initial={
                reduce
                  ? { opacity: 0 }
                  : { opacity: 0, filter: "blur(6px)", transform: "translateY(10px)" }
              }
              whileInView={
                reduce
                  ? { opacity: 1 }
                  : { opacity: 1, filter: "blur(0px)", transform: "translateY(0px)" }
              }
              viewport={{ once, margin: "0px 0px -12% 0px" }}
              transition={{
                duration: reduce ? DUR.slow : DUR.reveal,
                delay: delay + i * 0.08,
                ease: EASE_OUT,
              }}
            >
              {w}
            </motion.span>
          ),
        )}
      </span>
    </Tag>
  );
}
