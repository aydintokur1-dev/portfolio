"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { SPRING_ALIVE } from "@/lib/motion";

/**
 * The neighborhood cat, back from v1. Eyes and head follow the cursor
 * through a spring, it blinks irregularly, falls asleep after ~20s of
 * no input (slowly — falling asleep is deliberate) and wakes fast with
 * a stretch. `snooze` pins it asleep (the footer cat).
 *
 * Decorative: aria-hidden, no pointer events, never in the tab order.
 * Reduced motion: static, eyes open, no tracking.
 */
export function Cat({ size = 48, snooze = false, style }: { size?: number; snooze?: boolean; style?: CSSProperties }) {
  const reduce = useReducedMotion();
  const ref = useRef<SVGSVGElement>(null);
  const [asleep, setAsleep] = useState(snooze);
  const [stretching, setStretching] = useState(false);

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const eyeX = useSpring(px, SPRING_ALIVE);
  const eyeY = useSpring(py, SPRING_ALIVE);

  useEffect(() => {
    if (reduce || snooze) return;
    let idle: ReturnType<typeof setTimeout>;
    let stretchTimer: ReturnType<typeof setTimeout>;
    let wasAsleep = false;
    const wake = () => {
      if (wasAsleep) {
        setStretching(true);
        clearTimeout(stretchTimer);
        stretchTimer = setTimeout(() => setStretching(false), 360);
      }
      wasAsleep = false;
      setAsleep(false);
      clearTimeout(idle);
      idle = setTimeout(() => {
        wasAsleep = true;
        setAsleep(true);
      }, 20000);
    };
    let raf = 0;
    let last: { x: number; y: number } | null = null;
    const onMove = (e: PointerEvent) => {
      last = { x: e.clientX, y: e.clientY };
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const el = ref.current;
        if (!el || !last) return;
        const r = el.getBoundingClientRect();
        const dx = last.x - (r.left + r.width / 2);
        const dy = last.y - (r.top + r.height * 0.42);
        const d = Math.hypot(dx, dy) || 1;
        const k = Math.min(1, d / 260);
        px.set((dx / d) * k);
        py.set((dy / d) * k);
      });
      wake();
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", wake, { passive: true });
    window.addEventListener("keydown", wake);
    wake();
    return () => {
      clearTimeout(idle);
      clearTimeout(stretchTimer);
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", wake);
      window.removeEventListener("keydown", wake);
    };
  }, [reduce, snooze, px, py]);

  const pupilX = useTransform(eyeX, (v) => v * 2.4);
  const pupilY = useTransform(eyeY, (v) => v * 2.4);
  const headTilt = useTransform(eyeX, (v) => v * 5);

  return (
    <motion.svg
      ref={ref}
      aria-hidden
      focusable="false"
      width={size}
      height={size}
      viewBox="0 0 48 48"
      className="cat pointer-events-none select-none overflow-visible"
      data-asleep={asleep || undefined}
      data-stretch={stretching || undefined}
      style={{ rotate: snooze ? 0 : headTilt, ...style }}
    >
      <path className="cat-tail" d="M36 40 C 44 40, 46 31, 41 28" fill="none" stroke="var(--ink)" strokeWidth="3.2" strokeLinecap="round" />
      <ellipse cx="24" cy="38" rx="13" ry="9" fill="var(--ink)" />
      <path d="M11 20 L13 7 L22 15 Z" fill="var(--ink)" />
      <path d="M37 20 L35 7 L26 15 Z" fill="var(--ink)" />
      <path d="M13.5 18 L14.5 10.5 L20 15.5 Z" fill="var(--accent)" opacity="0.8" />
      <path d="M34.5 18 L33.5 10.5 L28 15.5 Z" fill="var(--accent)" opacity="0.8" />
      <circle cx="24" cy="23" r="13" fill="var(--ink)" />
      <g className="cat-eyes">
        <ellipse cx="19" cy="23" rx="3.2" ry="3.6" fill="var(--floor)" />
        <ellipse cx="29" cy="23" rx="3.2" ry="3.6" fill="var(--floor)" />
        <motion.g style={{ x: pupilX, y: pupilY }}>
          <circle cx="19" cy="23.4" r="1.7" fill="var(--ink)" />
          <circle cx="29" cy="23.4" r="1.7" fill="var(--ink)" />
          <circle cx="19.7" cy="22.6" r="0.55" fill="var(--floor)" />
          <circle cx="29.7" cy="22.6" r="0.55" fill="var(--floor)" />
        </motion.g>
      </g>
      <g className="cat-eyes-closed" stroke="var(--floor)" strokeWidth="1.6" strokeLinecap="round" fill="none">
        <path d="M16.4 23.6 q2.6 2.2 5.2 0" />
        <path d="M26.4 23.6 q2.6 2.2 5.2 0" />
      </g>
      <path d="M23 27.2 h2 l-1 1.3 z" fill="var(--accent)" />
      <path d="M24 28.5 q-1.4 1.6 -2.8 0.4 M24 28.5 q1.4 1.6 2.8 0.4" stroke="var(--floor)" strokeWidth="0.9" fill="none" strokeLinecap="round" />
    </motion.svg>
  );
}
