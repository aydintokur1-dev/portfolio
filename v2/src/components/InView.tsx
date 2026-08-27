"use client";

import { useEffect, useRef, type ReactNode, type CSSProperties } from "react";

type Props = {
  children: ReactNode;
  as?: "div" | "section" | "span" | "header" | "li" | "figure";
  className?: string;
  style?: CSSProperties;
  /** how much must be visible before firing (default 0.2) */
  amount?: number;
  id?: string;
  /** label for the bottom telemetry bar */
  hud?: string;
};

/**
 * Adds `.is-in` once the element enters the viewport; descendants with
 * .rv / .fade-up / .rule pick it up via CSS. Fires once — entrances don't
 * re-run on scroll-back.
 */
export function InView({ children, as: Tag = "div", className, style, amount = 0.2, id, hud }: Props) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("is-in");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            el.classList.add("is-in");
            io.disconnect();
          }
        }
      },
      { threshold: amount, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [amount]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (
    <Tag ref={ref as any} className={className} style={style} id={id} data-hud={hud}>
      {children}
    </Tag>
  );
}
