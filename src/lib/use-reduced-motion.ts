"use client";

import { useSyncExternalStore } from "react";

/**
 * Hydration-safe replacement for Motion's `useReducedMotion`.
 *
 * Motion's hook reads matchMedia synchronously into useState, so a user with
 * Reduced Motion enabled gets `true` on the client's first render while the
 * server rendered `false` — a hydration mismatch on every `initial` prop.
 * useSyncExternalStore renders the server snapshot during hydration, then
 * re-renders with the real value. Movement-suppression for mount animations
 * is additionally done in CSS (globals.css) so it never depends on this timing.
 */
const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(cb: () => void) {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}
const getSnapshot = () => window.matchMedia(QUERY).matches;
const getServerSnapshot = () => false;

export function useReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
