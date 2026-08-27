"use client";

import { useEffect } from "react";

/** Fired before a navigational jump; the ring drops its hold when it hears it. */
export const NAV_JUMP_EVENT = "nav:jump";

/**
 * In-page navigation — the HUD's Work / About / Contact, the hero's CTAs,
 * the footer links, the case rail. One document-level handler: any link to
 * a hash on the current page scrolls there smoothly instead of the browser's
 * hard jump, and announces itself first so the ring's scroll gate lets the
 * page through. The gate is for people scrolling; a button that says
 * "Contact" has to arrive at Contact.
 */
export function AnchorNav() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a[href]");
      if (!(a instanceof HTMLAnchorElement)) return;
      let url: URL;
      try {
        url = new URL(a.href, location.href);
      } catch {
        return;
      }
      if (url.origin !== location.origin || url.pathname !== location.pathname || !url.hash) return;
      const target = document.getElementById(decodeURIComponent(url.hash.slice(1)));
      if (!target) return;

      e.preventDefault();
      jumpTo(target, url.hash);
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}

export function jumpTo(target: HTMLElement, hash?: string) {
  // Let the ring (and anything else holding the page) know first.
  window.dispatchEvent(new CustomEvent(NAV_JUMP_EVENT));
  if (hash && location.hash !== hash) history.pushState(null, "", hash);

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const top = window.scrollY + target.getBoundingClientRect().top;
  const lenis = (window as unknown as { __lenis?: { scrollTo(t: number, o?: object): void } }).__lenis;
  if (lenis && !reduced) lenis.scrollTo(top, { duration: 1.1, force: true });
  else window.scrollTo({ top, behavior: reduced ? "instant" : "smooth" });
}
