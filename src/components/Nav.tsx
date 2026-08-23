"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { Cat } from "./Cat";
import { DUR, EASE_OUT, SPRING_SETTLE, SPRING_SNAP } from "@/lib/motion";

/**
 * LaunchFolio's morphing pill, measured: expanded at the top, collapsed once
 * scrolled. Theirs used `transition: all`; ours animates layout via Motion
 * (transform under the hood) and names nothing else.
 *
 * Hysteresis on the scroll threshold so jitter can't retrigger the spring.
 * An active-section pill slides between links (state indication — "where am I?").
 * The cat sits on the pill's edge. It's the nav's only decoration.
 */
const LINKS = [
  { href: "#work", id: "work", label: "Work" },
  { href: "#about", id: "about", label: "About" },
  { href: "#notes", id: "notes", label: "Notes" },
  { href: "#contact", id: "contact", label: "Contact" },
];

const COLLAPSE_AT = 112;
const EXPAND_AT = 48;

export function Nav() {
  const reduce = useReducedMotion();
  const [collapsed, setCollapsed] = useState(false);
  const collapsedRef = useRef(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  // collapse / expand with hysteresis; phones start collapsed
  useEffect(() => {
    let raf = 0;
    const narrow = window.matchMedia("(max-width: 639px)");
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        const was = collapsedRef.current;
        const next = narrow.matches || (was ? y > EXPAND_AT : y > COLLAPSE_AT);
        if (next !== was) {
          collapsedRef.current = next;
          setCollapsed(next);
          if (!next) setOpen(false);
        }
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

  // which section is under the reader — the link pill follows it.
  // Rule: the last section whose top has passed 40% of the viewport wins; at the
  // very bottom the last section wins (late sections may never reach that line).
  // A hash navigation wins outright until its scroll settles — the thing you
  // just clicked must be the thing that lights up.
  useEffect(() => {
    const targets = LINKS.map((l) => document.getElementById(l.id)).filter(Boolean) as HTMLElement[];
    if (!targets.length) return;
    let raf = 0;
    let lockUntil = 0;
    const update = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (performance.now() < lockUntil) return;
        const line = window.innerHeight * 0.4;
        const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
        let current: string | null = null;
        for (const t of targets) if (t.getBoundingClientRect().top <= line) current = t.id;
        if (atBottom) current = targets[targets.length - 1].id;
        setActive(current);
      });
    };
    const onHash = () => {
      const id = location.hash.slice(1);
      if (!targets.some((t) => t.id === id)) return;
      lockUntil = performance.now() + 900;
      setActive(id);
    };
    onHash();
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    window.addEventListener("hashchange", onHash);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      window.removeEventListener("hashchange", onHash);
    };
  }, []);

  // `open` only means anything while collapsed; expanding resets it implicitly
  const showLinks = !collapsed || open;

  return (
    <div className="pointer-events-none fixed inset-x-0 top-6 z-50 flex justify-center px-4">
      <motion.nav
        layout
        aria-label="Primary"
        transition={reduce ? { duration: 0 } : SPRING_SETTLE}
        className="glass pointer-events-auto relative flex items-center gap-0.5 rounded-[var(--radius-pill)] py-1 pl-2 pr-1.5"
      >
        {/* the cat, perched on the left edge */}
        <div className="pointer-events-none absolute -top-[27px] left-2.5">
          <Cat size={46} />
        </div>

        <a
          href="#top"
          className="pressable hoverable t-mono flex h-8 items-center gap-2 rounded-[var(--radius-pill)] border border-transparent pl-[46px] pr-3 text-text"
        >
          <span lang="tr" className="normal-case tracking-[-0.01em] text-[0.875rem] font-semibold font-[family-name:var(--font-display)]">
            Aydın
          </span>
        </a>

        {showLinks && (
          <motion.ul
            layout
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: DUR.fast, ease: EASE_OUT }}
            className="flex items-center gap-0.5"
          >
            {LINKS.map((l) => {
              const isActive = active === l.id;
              return (
                <li key={l.href} className="relative">
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      aria-hidden
                      transition={reduce ? { duration: 0 } : SPRING_SNAP}
                      className="absolute inset-0 rounded-[var(--radius-pill)] bg-surface-2"
                    />
                  )}
                  <a
                    href={l.href}
                    aria-current={isActive ? "location" : undefined}
                    onClick={() => setOpen(false)}
                    className={`pressable t-mono relative flex h-8 items-center rounded-[var(--radius-pill)] px-3 transition-colors ${
                      isActive ? "text-text" : "text-text-muted hover:text-text"
                    }`}
                  >
                    {l.label}
                  </a>
                </li>
              );
            })}
          </motion.ul>
        )}

        {collapsed && (
          <motion.button
            layout
            type="button"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
            className="pressable hoverable flex size-8 items-center justify-center rounded-[var(--radius-pill)] border border-transparent text-text-muted hover:text-text"
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
