"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/lib/use-reduced-motion";

/**
 * The brand row — the surface the cat will paw (docs/06-CAT.md).
 * A draggable strip with real physics (docs/07-MOTION.md §gesture):
 *   · 1:1 tracking with the grab offset preserved, pointer capture
 *   · momentum projection on release (Apple's decay, d = 0.998)
 *   · rubber-banding at the ends instead of a hard stop
 * Names for now; monochrome logos when we have them.
 */
export function BrandRow({ brands }: { brands: { name: string; slug: string }[] }) {
  const reduce = useReducedMotion();
  const track = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    let x = 0; // current translate
    let dragging = false;
    let startX = 0;
    let startTx = 0;
    let lastX = 0;
    let lastT = 0;
    let vel = 0;
    let raf = 0;

    const max = () => Math.max(0, el.scrollWidth - el.clientWidth);
    const rubber = (over: number, dim: number, c = 0.55) => (over * dim * c) / (dim + c * Math.abs(over));
    const apply = () => { el.style.transform = `translate3d(${-x}px,0,0)`; };
    const clamp = (v: number) => Math.min(max(), Math.max(0, v));

    const settle = () => {
      cancelAnimationFrame(raf);
      const step = () => {
        // project momentum, then spring back if we overshot an edge
        const lim = clamp(x);
        if (x !== lim) {
          x += (lim - x) * 0.18;
          if (Math.abs(lim - x) < 0.5) x = lim;
        } else {
          x += vel;
          vel *= 0.95; // Apple's exponential decay, per frame
        }
        apply();
        if (Math.abs(vel) > 0.1 || x !== clamp(x)) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    };

    const down = (e: PointerEvent) => {
      if (reduce) return;
      cancelAnimationFrame(raf);
      dragging = true;
      el.setPointerCapture(e.pointerId);
      startX = lastX = e.clientX;
      startTx = x;
      lastT = performance.now();
      vel = 0;
      el.style.cursor = "grabbing";
    };
    const move = (e: PointerEvent) => {
      if (!dragging) return;
      const raw = startTx - (e.clientX - startX);
      const lim = clamp(raw);
      x = raw === lim ? raw : lim + rubber(raw - lim, el.clientWidth);
      const now = performance.now();
      const dt = Math.max(1, now - lastT);
      vel = ((lastX - e.clientX) / dt) * 16; // px per frame
      lastX = e.clientX;
      lastT = now;
      apply();
    };
    const up = (e: PointerEvent) => {
      if (!dragging) return;
      dragging = false;
      el.releasePointerCapture(e.pointerId);
      el.style.cursor = "";
      settle();
    };

    el.addEventListener("pointerdown", down);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerup", up);
    el.addEventListener("pointercancel", up);
    // keyboard + wheel still work natively because the list is in the tab order
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointerdown", down);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerup", up);
      el.removeEventListener("pointercancel", up);
    };
  }, [reduce]);

  return (
    <section aria-label="Places I've worked with" className="hairline overflow-hidden">
      <div className="column py-5">
        <div className="flex items-center gap-4">
          <span className="t-mono shrink-0 text-text-faint">Worked with</span>
          <div className="relative flex-1 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_6%,black_94%,transparent)]">
            <ul
              ref={track}
              id="brand-row"
              className="t-mono flex w-max cursor-grab select-none gap-2 text-text-muted will-change-transform"
            >
              {brands.map((b) => (
                <li
                  key={b.slug}
                  className="whitespace-nowrap rounded-[var(--radius-pill)] border border-border bg-surface px-3 py-1.5"
                >
                  {b.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
