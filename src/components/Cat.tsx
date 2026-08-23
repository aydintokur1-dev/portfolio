"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "motion/react";

/**
 * Placeholder cat. Stands in for the Rive character (docs/06-CAT.md) so the
 * interaction can be felt now: eyes + head follow the cursor through a spring,
 * it blinks, and it falls asleep after ~20s without input.
 *
 * Decorative: aria-hidden, no pointer events, never in the tab order.
 * Reduced motion: static, eyes open, no tracking.
 */
export function Cat({ size = 48 }: { size?: number }) {
  const reduce = useReducedMotion();
  const ref = useRef<SVGSVGElement>(null);
  const [asleep, setAsleep] = useState(false);

  // raw pointer vector → spring → pupil/head offsets. Direct binding feels
  // mechanical; the spring is what makes it read as alive (docs/07-MOTION.md).
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const spring = { stiffness: 140, damping: 16, mass: 0.6 };
  const eyeX = useSpring(px, spring);
  const eyeY = useSpring(py, spring);

  useEffect(() => {
    if (reduce) return;
    let idle: ReturnType<typeof setTimeout>;
    const wake = () => {
      setAsleep(false);
      clearTimeout(idle);
      idle = setTimeout(() => setAsleep(true), 20000);
    };
    const onMove = (e: PointerEvent) => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height * 0.42);
      const d = Math.hypot(dx, dy) || 1;
      // ease-in on distance so nearby cursor moves feel gentle
      const k = Math.min(1, d / 260);
      px.set((dx / d) * k);
      py.set((dy / d) * k);
      wake();
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", wake, { passive: true });
    window.addEventListener("keydown", wake);
    wake();
    return () => {
      clearTimeout(idle);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", wake);
      window.removeEventListener("keydown", wake);
    };
  }, [reduce, px, py]);

  // derived transforms (small ranges — subtlety is the craft)
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
      style={{ rotate: headTilt }}
    >
      {/* tail */}
      <path
        className="cat-tail"
        d="M36 40 C 44 40, 46 31, 41 28"
        fill="none"
        stroke="var(--text)"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
      {/* body */}
      <ellipse cx="24" cy="38" rx="13" ry="9" fill="var(--text)" />
      {/* ears */}
      <path d="M11 20 L13 7 L22 15 Z" fill="var(--text)" />
      <path d="M37 20 L35 7 L26 15 Z" fill="var(--text)" />
      <path d="M13.5 18 L14.5 10.5 L20 15.5 Z" fill="var(--accent)" opacity="0.8" />
      <path d="M34.5 18 L33.5 10.5 L28 15.5 Z" fill="var(--accent)" opacity="0.8" />
      {/* head */}
      <circle cx="24" cy="23" r="13" fill="var(--text)" />
      {/* eyes */}
      <g className="cat-eyes">
        <ellipse cx="19" cy="23" rx="3.2" ry="3.6" fill="var(--bg)" />
        <ellipse cx="29" cy="23" rx="3.2" ry="3.6" fill="var(--bg)" />
        <motion.g style={{ x: pupilX, y: pupilY }}>
          <circle cx="19" cy="23.4" r="1.7" fill="var(--text)" />
          <circle cx="29" cy="23.4" r="1.7" fill="var(--text)" />
          <circle cx="19.7" cy="22.6" r="0.55" fill="var(--bg)" />
          <circle cx="29.7" cy="22.6" r="0.55" fill="var(--bg)" />
        </motion.g>
      </g>
      {/* sleeping eyes — two soft arcs, shown via CSS when asleep */}
      <g className="cat-eyes-closed" stroke="var(--bg)" strokeWidth="1.6" strokeLinecap="round" fill="none">
        <path d="M16.4 23.6 q2.6 2.2 5.2 0" />
        <path d="M26.4 23.6 q2.6 2.2 5.2 0" />
      </g>
      {/* nose + mouth */}
      <path d="M23 27.2 h2 l-1 1.3 z" fill="var(--accent)" />
      <path d="M24 28.5 q-1.4 1.6 -2.8 0.4 M24 28.5 q1.4 1.6 2.8 0.4" stroke="var(--bg)" strokeWidth="0.9" fill="none" strokeLinecap="round" />
    </motion.svg>
  );
}
