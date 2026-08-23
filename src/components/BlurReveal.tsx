"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ElementType } from "react";

/**
 * LaunchFolio's signature, measured live: per word,
 *   blur(5px) → 0 · opacity 0 → 1 · translateY(10px) → 0
 *   ~750ms settle · ~80–100ms stagger
 * with our curve instead of theirs. Headings only — it's the one
 * scroll animation on the site (docs/08-REFERENCES.md).
 *
 * Reduced motion: opacity only, no blur, no travel.
 */
const EASE = [0.23, 1, 0.32, 1] as const;

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
    <Tag className={className} aria-label={children}>
      {words.map((w, i) =>
        /^\s+$/.test(w) ? (
          <span key={i}> </span>
        ) : (
          <motion.span
            key={i}
            aria-hidden
            className="inline-block will-change-[transform,opacity,filter]"
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
              duration: reduce ? 0.3 : 0.75,
              delay: delay + i * 0.08,
              ease: EASE,
            }}
          >
            {w}
          </motion.span>
        ),
      )}
    </Tag>
  );
}
