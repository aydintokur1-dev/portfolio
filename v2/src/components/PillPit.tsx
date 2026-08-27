"use client";

import { useEffect, useRef, useState } from "react";

const PILLS = [
  "DESIGN ENGINEERING",
  "DESIGN SYSTEMS",
  "AI PRODUCT DESIGN",
  "RAPID PROTOTYPING",
  "NEXT.JS / REACT",
  "MOTION",
  "FIGMA",
  "TEAM LEADERSHIP",
  "TR / EN",
];

/**
 * The VOLGEN pills, made real: capability chips drop into the contact
 * section under rigid-body physics and can be thrown around. Desktop,
 * fine-pointer, full-motion only — everywhere else they render as a
 * static wrap of chips, which is a designed state, not a fallback shrug.
 */
export function PillPit() {
  const wrap = useRef<HTMLDivElement>(null);
  const [physics, setPhysics] = useState<boolean | null>(null);

  useEffect(() => {
    const ok =
      window.matchMedia("(pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
      window.innerWidth >= 1024;
    setPhysics(ok);
  }, []);

  useEffect(() => {
    if (!physics) return;
    const el = wrap.current;
    if (!el) return;

    let cleanup: (() => void) | undefined;
    let cancelled = false;

    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        io.disconnect();
        import("matter-js").then((Matter) => {
          if (cancelled) return;
          cleanup = boot(Matter, el);
        });
      },
      { threshold: 0.3 }
    );
    io.observe(el);

    return () => {
      cancelled = true;
      io.disconnect();
      cleanup?.();
    };
  }, [physics]);

  if (physics === false) {
    return (
      <div className="flex flex-wrap gap-2 py-10">
        {PILLS.map((p) => (
          <span key={p} className="chip t-label">{p}</span>
        ))}
      </div>
    );
  }

  return (
    <div
      ref={wrap}
      className="relative mt-6 hidden h-[46vh] min-h-[300px] overflow-clip lg:block"
      aria-hidden={physics ? true : undefined}
    >
      <span className="t-label absolute left-0 top-0 text-[var(--faint)]">
        [ CAPABILITIES — DRAG TO REARRANGE ]
      </span>
      {PILLS.map((p) => (
        <span
          key={p}
          data-pill
          className="t-label absolute left-0 top-0 inline-flex cursor-grab select-none items-center whitespace-nowrap rounded-[var(--r-pill)] border border-[var(--hairline-strong)] bg-[var(--panel)] px-5 py-3 text-[var(--ink)] opacity-0 will-change-transform active:cursor-grabbing"
        >
          {p}
        </span>
      ))}
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function boot(M: any, el: HTMLElement): () => void {
  const { Engine, Bodies, Composite, Mouse, MouseConstraint, Body } = M;
  const w = el.clientWidth;
  const h = el.clientHeight;

  const engine = Engine.create();
  engine.gravity.y = 1.4;

  const pills = Array.from(el.querySelectorAll<HTMLElement>("[data-pill]"));
  const bodies = pills.map((p, i) => {
    const pw = p.offsetWidth;
    const ph = p.offsetHeight;
    const x = (w / (pills.length + 1)) * (i + 1) + (((i * 37) % 60) - 30);
    const y = -80 - i * 90;
    const b = Bodies.rectangle(x, y, pw, ph, {
      chamfer: { radius: ph / 2 },
      restitution: 0.35,
      friction: 0.25,
      frictionAir: 0.012,
      angle: (((i * 53) % 24) - 12) * (Math.PI / 180),
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (b as any).el = p;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (b as any).half = { w: pw / 2, h: ph / 2 };
    return b;
  });

  const wallOpts = { isStatic: true };
  const floor = Bodies.rectangle(w / 2, h + 40, w + 200, 80, wallOpts);
  const left = Bodies.rectangle(-40, h / 2, 80, h * 4, wallOpts);
  const right = Bodies.rectangle(w + 40, h / 2, 80, h * 4, wallOpts);
  Composite.add(engine.world, [...bodies, floor, left, right]);

  const mouse = Mouse.create(el);
  // matter's mouse hijacks wheel events; give scrolling back to the page
  mouse.element.removeEventListener("wheel", mouse.mousewheel);
  const mc = MouseConstraint.create(engine, {
    mouse,
    constraint: { stiffness: 0.12, damping: 0.12, render: { visible: false } },
  });
  Composite.add(engine.world, mc);

  let raf = 0;
  let last = performance.now();
  const loop = (t: number) => {
    const dt = Math.min(t - last, 33);
    last = t;
    Engine.update(engine, dt);
    for (const b of bodies) {
      // keep escapees in play
      if (b.position.y > h + 200) Body.setPosition(b, { x: w / 2, y: -60 });
      const p = b.el as HTMLElement;
      p.style.opacity = "1";
      p.style.transform = `translate(${b.position.x - b.half.w}px, ${b.position.y - b.half.h}px) rotate(${b.angle}rad)`;
    }
    raf = requestAnimationFrame(loop);
  };
  raf = requestAnimationFrame(loop);

  return () => {
    cancelAnimationFrame(raf);
    Composite.clear(engine.world, false);
    Engine.clear(engine);
    mouse.clearSourceEvents?.();
  };
}
