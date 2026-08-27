"use client";

import { useEffect } from "react";

/**
 * Lenis smooth scroll — desktop fine-pointer only, and never when the user
 * asks for reduced motion. Touch devices keep native scrolling.
 */
export function SmoothScroll() {
  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    let cancelled = false;
    let cleanup: (() => void) | undefined;

    import("lenis").then(({ default: Lenis }) => {
      if (cancelled) return;
      const lenis = new Lenis({ lerp: 0.115, wheelMultiplier: 1 });
      // The ring's scroll gate needs to stop and restart the page's scroll;
      // the instance is parked on window so it doesn't have to thread through
      // the tree to one consumer.
      (window as unknown as { __lenis?: unknown }).__lenis = lenis;
      let raf = requestAnimationFrame(function loop(t) {
        lenis.raf(t);
        raf = requestAnimationFrame(loop);
      });
      cleanup = () => {
        cancelAnimationFrame(raf);
        lenis.destroy();
        delete (window as unknown as { __lenis?: unknown }).__lenis;
      };
    });

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  return null;
}
