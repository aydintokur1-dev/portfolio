"use client";

import { useSyncExternalStore } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { studies } from "@/content/work";
import { WorkStack } from "@/components/WorkStack";
import { GateLink } from "@/components/GateLink";
import { openStudy } from "@/lib/gate-client";

// three + gsap only ever download for the branch that uses them.
const Carousel = dynamic(() => import("@/components/viscose/Carousel"), {
  ssr: false,
});

// Whether this browser gets the ring: a mouse, room for it, motion allowed,
// and a WebGL context to draw with. Read through useSyncExternalStore so the
// server renders the stack (links in the HTML, no hydration gamble) and the
// choice stays live if a media query flips.
const CAPABILITY_QUERIES = [
  "(pointer: fine)",
  "(min-width: 1024px)",
  "(prefers-reduced-motion: reduce)",
];

let glOk: boolean | null = null;

function canRing() {
  if (glOk === null) {
    try {
      const c = document.createElement("canvas");
      glOk = !!(c.getContext("webgl2") || c.getContext("webgl"));
    } catch {
      glOk = false;
    }
  }
  return (
    glOk &&
    matchMedia("(pointer: fine)").matches &&
    matchMedia("(min-width: 1024px)").matches &&
    !matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function subscribeCapability(onChange: () => void) {
  const lists = CAPABILITY_QUERIES.map((q) => matchMedia(q));
  lists.forEach((l) => l.addEventListener("change", onChange));
  return () => lists.forEach((l) => l.removeEventListener("change", onChange));
}

/**
 * The work section, two ways. Wide screens with a mouse get the Viscose ring —
 * name cards on one WebGL distance field, holding the page until the tour
 * reaches the last card (the gate, the skip and the wheel all live inside the
 * Carousel). Everyone else (touch, narrow, reduced motion, no WebGL) gets the
 * typographic stack.
 */
export function RingShowcase() {
  const router = useRouter();
  const ring = useSyncExternalStore(subscribeCapability, canRing, () => false);

  if (!ring) return <WorkStack />;

  return (
    <section
      id="work"
      data-hud="WORK"
      className="relative h-screen overflow-hidden"
    >
      <Carousel onOpen={(slug: string) => openStudy(slug, (href) => router.push(href))} />
      {/* The canvas is pointer-only; this is the keyboard and screen-reader
          path to the same case studies. */}
      <nav aria-label="Case studies" className="sr-only">
        <ul>
          {studies.map((s) => (
            <li key={s.slug}>
              <GateLink slug={s.slug}>
                {s.org} — {s.title}
              </GateLink>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
}
