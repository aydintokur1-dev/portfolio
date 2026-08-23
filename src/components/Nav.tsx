"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Cat } from "./Cat";

/**
 * LaunchFolio's morphing pill, measured: expanded at the top, collapsed once
 * scrolled. Theirs used `transition: all`; ours animates layout via Motion
 * (transform under the hood) and names nothing else.
 *
 * The cat sits on the pill's edge. It's the nav's only decoration.
 */
const LINKS = [
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#notes", label: "Notes" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const reduce = useReducedMotion();
  const [collapsed, setCollapsed] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let raf = 0;
    const narrow = window.matchMedia("(max-width: 639px)");
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        // phones start collapsed: five links don't fit a pill at 390px
        const c = narrow.matches || window.scrollY > 96;
        setCollapsed(c);
        if (!c) setOpen(false);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    narrow.addEventListener("change", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      narrow.removeEventListener("change", onScroll);
    };
  }, []);

  const showLinks = !collapsed || open;

  return (
    <div className="pointer-events-none fixed inset-x-0 top-7 z-50 flex justify-center px-4">
      <motion.nav
        layout
        aria-label="Primary"
        transition={reduce ? { duration: 0 } : { type: "spring", duration: 0.42, bounce: 0 }}
        className="glass pointer-events-auto relative flex items-center gap-1 rounded-[var(--radius-pill)] py-1.5 pl-2 pr-2"
      >
        {/* the cat, perched on the left edge */}
        <div className="pointer-events-none absolute -top-[30px] left-2.5">
          <Cat size={50} />
        </div>

        <a
          href="#top"
          className="pressable hoverable t-mono flex h-9 items-center gap-2 rounded-[var(--radius-pill)] border border-transparent pl-[52px] pr-3 text-text"
        >
          <span lang="tr" className="normal-case tracking-[-0.01em] text-[0.95rem] font-semibold font-[family-name:var(--font-display)]">
            Aydın
          </span>
        </a>

        {showLinks && (
          <motion.ul
            layout
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
            className="flex items-center gap-0.5"
          >
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="pressable hoverable t-mono flex h-9 items-center rounded-[var(--radius-pill)] border border-transparent px-3 text-text-muted hover:text-text"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </motion.ul>
        )}

        {collapsed && (
          <motion.button
            layout
            type="button"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
            className="pressable hoverable flex size-9 items-center justify-center rounded-[var(--radius-pill)] border border-transparent text-text-muted hover:text-text"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden>
              <circle cx="3" cy="8" r="1.4" fill="currentColor" />
              <circle cx="8" cy="8" r="1.4" fill="currentColor" />
              <circle cx="13" cy="8" r="1.4" fill="currentColor" />
            </svg>
          </motion.button>
        )}
      </motion.nav>
    </div>
  );
}
