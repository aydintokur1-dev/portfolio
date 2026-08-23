"use client";

import { useLayoutEffect, useRef } from "react";

/**
 * The name as a wordmark, not a heading (docs/08-REFERENCES.md, Kirk).
 * Real text — selectable, indexable, theme-able — fitted edge to edge.
 *
 * SSR paints a vw-based estimate so there's no flash; a ResizeObserver then
 * fits it exactly. lang="tr" keeps the dotless ı honest under any casing.
 */
export function Wordmark({ face = "wordmark" }: { face?: "wordmark" | "mona" | "unbounded" }) {
  const ref = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const parent = el.parentElement!;
    const fit = () => {
      // width:max-content makes the box hug the glyphs, so its width *is* the text width
      el.style.fontSize = "100px";
      const textWidth = el.getBoundingClientRect().width;
      const ratio = parent.clientWidth / textWidth;
      el.style.fontSize = `${Math.floor(100 * ratio * 100) / 100}px`;
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(parent);
    document.fonts?.ready.then(fit);
    return () => ro.disconnect();
  }, [face]);

  return (
    <h1
      ref={ref}
      lang="tr"
      className={`${face === "mona" ? "t-display" : face === "unbounded" ? "t-display-alt" : "t-wordmark"} wordmark w-max whitespace-nowrap select-text text-text`}
      style={{ fontSize: face === "mona" ? "17.8vw" : "16.4vw" }}
    >
      Aydın Tokur
    </h1>
  );
}
