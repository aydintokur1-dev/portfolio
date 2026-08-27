"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import type { Img } from "@/lib/images";

type Side = {
  img: Img | null;
  key: string;
  label: string;
  caption?: string;
  /** shown in place of `img` in the grid; the lightbox still opens `img` */ thumb?: Img | null;
};

/**
 * Before/after: both pages laid out in full, side by side, so one scroll
 * walks them together. Two full pages need the cover's width, so the block
 * breaks out of the text column on large screens (CSS .compare). Each column
 * carries a sticky label so the reader never loses which side is which.
 *
 * Side by side, a 1440px design lands at ~40% — hairlines vanish. So each
 * page is also a button: click opens it at 1:1 in a scrollable overlay.
 */
/**
 * `variant="cover"` drops the column break-out (the caller already sits in a
 * full-width container) and uses each side's `thumb` in the grid.
 */
export function Compare({
  sides,
  caption,
  variant,
}: {
  sides: [Side, Side];
  caption?: string;
  variant?: "cover";
}) {
  const [open, setOpen] = useState<number | null>(null);
  const close = useCallback(() => setOpen(null), []);

  // lock the page (lenis + native) while the overlay scrolls
  useEffect(() => {
    if (open === null) return;
    const lenis = (
      window as unknown as { __lenis?: { stop(): void; start(): void } }
    ).__lenis;
    lenis?.stop();
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") setOpen(0);
      if (e.key === "ArrowRight") setOpen(1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = prev;
      lenis?.start();
    };
  }, [open, close]);

  return (
    <figure className={variant === "cover" ? "compare-cover" : "compare"}>
      <div className="mat">
        <div className="grid gap-5 sm:grid-cols-2">
          {sides.map((s, i) => (
            <div key={i} className="flex flex-col">
              <div className="compare-tag">
                <span
                  className="chip t-label"
                  data-after={i === 1 ? "" : undefined}
                >
                  {s.label} /
                </span>
              </div>
              {s.img ? (
                <button
                  type="button"
                  className="compare-zoom mat-img"
                  onClick={() => setOpen(i)}
                  aria-label={`Open ${s.label.toLowerCase()} at full size`}
                >
                  <Image
                    src={(s.thumb ?? s.img).src}
                    width={(s.thumb ?? s.img).width}
                    height={(s.thumb ?? s.img).height}
                    alt={s.caption ?? s.label}
                    quality={90}
                    priority={variant === "cover"}
                    sizes="(min-width: 1280px) 560px, (min-width: 640px) 45vw, 100vw"
                  />
                  <span className="compare-hint t-label">
                    [ CLICK TO ZOOM ]
                  </span>
                </button>
              ) : (
                <div
                  className="mat-img flex aspect-[9/16] items-center justify-center bg-[var(--recess)]"
                  aria-hidden
                >
                  <span className="t-label text-[var(--faint)]">
                    [ FIG: {s.key} — TO BE ADDED ]
                  </span>
                </div>
              )}
              {s.caption && (
                <p className="t-label mt-3 text-[var(--faint)]">{s.caption}</p>
              )}
            </div>
          ))}
        </div>
      </div>
      {caption && (
        <figcaption className="t-label mt-3 text-[var(--faint)]">
          {caption}
        </figcaption>
      )}

      {open !== null && sides[open].img && (
        <div
          className="compare-lightbox"
          data-lenis-prevent=""
          role="dialog"
          aria-modal="true"
          aria-label={`${sides[open].label} at full size`}
          onClick={close}
        >
          <div className="compare-lightbox-bar t-label">
            <span className="flex gap-4">
              {sides.map((s, i) => (
                <button
                  key={i}
                  type="button"
                  className="compare-lightbox-tab"
                  data-on={i === open ? "" : undefined}
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpen(i);
                  }}
                >
                  {s.label} /
                </button>
              ))}
            </span>
            <span className="text-[var(--faint)]">
              1 : 1 — SCROLL · ← → SWITCH · ESC CLOSE
            </span>
            <button
              type="button"
              className="compare-lightbox-close"
              onClick={close}
              aria-label="Close"
            >
              [ CLOSE ]
            </button>
          </div>
          <div className="compare-lightbox-scroll">
            <div
              className="compare-lightbox-page"
              style={{ width: Math.round(sides[open].img!.width / 2) }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={sides[open].img!.src}
                width={sides[open].img!.width}
                height={sides[open].img!.height}
                alt={sides[open].caption ?? sides[open].label}
                quality={90}
                sizes="100vw"
                priority
              />
            </div>
          </div>
        </div>
      )}
    </figure>
  );
}
