"use client";

import { useEffect, useRef } from "react";

/**
 * The hero dust. The marble artwork is never shown — instead it is sampled
 * into a sparse field of pigment dots: bright points survive (the gold veins
 * and blue swirls keep their shape as loose constellations), dark ground
 * yields nothing. Dots drift slowly like dust in light, shy away from the
 * cursor, and scatter upward as the hero scrolls out — scrubbed, so
 * scrolling back settles them again.
 *
 * Deliberately abstract: the dots stay apart, so there is no image to
 * resolve and nothing to read as "pixelated" — only structure.
 *
 * Geometry: the inner box reproduces `object-fit: cover` bottom-center by
 * hand (cq units + the artwork's aspect), so the sampling maps onto the
 * artwork's composition at every viewport.
 *
 * Rendering is a single ImageData write per frame — no WebGL, no deps.
 * The loop pauses while the hero is off-screen or the tab is hidden.
 * Reduced motion gets one static frame of settled dust and no listeners.
 * Decorative only — aria-hidden, inert.
 */

const SRC = "/hero-marble.png";
const STEP = 8; // css px between sample points — dots stay apart
const DOT = 2; // css px dot size
const LUM_FLOOR = 22; // 0–255; darker samples yield no dot on the night bg
const ENTER_MS = 1900;
const REPEL_R = 170; // px around the cursor that disturbs the dust
const REPEL_PUSH = 3.4; // velocity kick at the cursor's center
const CURSOR_IDLE_MS = 700;

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const smooth = (v: number) => v * v * (3 - 2 * v);

export function HeroField() {
  const rootRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const box = boxRef.current;
    const canvas = canvasRef.current;
    if (!root || !box || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // ── dust state ──────────────────────────────────────────────────
    let W = 0, H = 0; // css px
    let S = 1; // device-pixel scale for the buffer
    let W2 = 0, H2 = 0; // buffer px
    let D2 = DOT; // dot size in buffer px
    let n = 0;
    let homeX: Float32Array, homeY: Float32Array;
    let scatX: Float32Array, scatY: Float32Array; // flight path when dissolved
    let delay: Float32Array; // entrance stagger, ms
    let phase: Float32Array; // ambient drift phase
    let rgb: Uint32Array;
    let offX: Float32Array, offY: Float32Array; // cursor displacement
    let velX: Float32Array, velY: Float32Array;
    let frame: ImageData, px: Uint32Array;

    let raf = 0;
    let t0 = 0;
    let built = false;
    let inView = true;
    let cursorX = -1e4, cursorY = -1e4;
    let cursorAt = -1e6;

    const art = document.createElement("img");
    art.src = SRC;

    const build = () => {
      const r = box.getBoundingClientRect();
      W = Math.round(r.width);
      H = Math.round(r.height);
      if (!W || !H || !art.complete || !art.naturalWidth) return;
      S = Math.min(window.devicePixelRatio || 1, 1.5);
      W2 = Math.round(W * S);
      H2 = Math.round(H * S);
      D2 = Math.max(2, Math.round(DOT * S));
      canvas.width = W2;
      canvas.height = H2;

      const off = document.createElement("canvas");
      off.width = W2;
      off.height = H2;
      const octx = off.getContext("2d")!;
      octx.drawImage(art, 0, 0, W2, H2);
      const src = octx.getImageData(0, 0, W2, H2).data;

      // first pass: count survivors so the arrays fit exactly
      const keep: number[] = [];
      for (let y = STEP >> 1; y < H; y += STEP) {
        for (let x = STEP >> 1; x < W; x += STEP) {
          const k = (Math.round(y * S) * W2 + Math.round(x * S)) * 4;
          const lum = (src[k] + src[k + 1] + src[k + 2]) / 3;
          if (lum < LUM_FLOOR) continue;
          // bright pigment is likelier to leave a grain behind
          if (Math.random() > 0.45 + (lum / 255) * 0.55) continue;
          // grains keep the artwork's own pixel colour (same as the main site)
          keep.push(x, y, (src[k + 2] << 16) | (src[k + 1] << 8) | src[k]);
        }
      }
      n = keep.length / 3;
      homeX = new Float32Array(n);
      homeY = new Float32Array(n);
      scatX = new Float32Array(n);
      scatY = new Float32Array(n);
      delay = new Float32Array(n);
      phase = new Float32Array(n);
      rgb = new Uint32Array(n);
      offX = new Float32Array(n);
      offY = new Float32Array(n);
      velX = new Float32Array(n);
      velY = new Float32Array(n);
      for (let i = 0; i < n; i++) {
        const x = keep[i * 3];
        homeX[i] = x;
        homeY[i] = keep[i * 3 + 1];
        rgb[i] = keep[i * 3 + 2];
        const a = Math.random() * Math.PI * 2;
        const amp = 150 + Math.random() * 330;
        scatX[i] = Math.cos(a) * amp;
        scatY[i] = Math.sin(a) * amp - 90; // dust drifts upward
        delay[i] = Math.random() * 1100 + (x / W) * 300;
        phase[i] = Math.random() * Math.PI * 2;
      }
      frame = ctx.createImageData(W2, H2);
      px = new Uint32Array(frame.data.buffer);
      built = true;
      t0 = performance.now();
      if (reduce) render(t0 + 1e5, 0, false); // one settled frame, then quiet
    };

    const render = (now: number, d: number, cursorLive: boolean) => {
      px.fill(0);
      const cx = cursorX;
      const cy = cursorY;
      const tDrift = now * 0.00045;
      for (let i = 0; i < n; i++) {
        const p = clamp01((now - t0 - delay[i]) / (ENTER_MS - 1100));
        const e = 1 - (1 - p) * (1 - p) * (1 - p);
        const a = e * (1 - d) * (1 - d * 0.4);
        if (a < 0.02) continue;

        let ox = offX[i];
        let oy = offY[i];
        let vx = velX[i];
        let vy = velY[i];
        const hx = homeX[i];
        const hy = homeY[i];
        const dx = hx - cx;
        const dy = hy - cy;
        if (cursorLive && dx > -REPEL_R && dx < REPEL_R && dy > -REPEL_R && dy < REPEL_R) {
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          if (dist < REPEL_R) {
            const push = ((REPEL_R - dist) / REPEL_R) * REPEL_PUSH;
            vx += (dx / dist) * push;
            vy += (dy / dist) * push;
          }
        }
        vx += -ox * 0.035 - vx * 0.1;
        vy += -oy * 0.035 - vy * 0.1;
        ox += vx;
        oy += vy;
        offX[i] = ox;
        offY[i] = oy;
        velX[i] = vx;
        velY[i] = vy;

        // slow ambient float — dust in still air
        const ph = phase[i];
        const ax = Math.sin(tDrift + ph) * 2.6;
        const ay = Math.cos(tDrift * 0.8 + ph * 1.7) * 2.2;

        const disp = d + (1 - e) * 0.16; // slight settle-in on entrance
        const x = ((hx + scatX[i] * disp + ox + ax) * S) | 0;
        const y = ((hy + scatY[i] * disp + oy + ay) * S) | 0;
        if (x < 0 || x >= W2 - D2 || y < 0 || y >= H2 - D2) continue;
        const color = (((a * 255) | 0) << 24) | rgb[i];
        for (let yy = y; yy < y + D2; yy++) {
          const row = yy * W2;
          for (let xx = x; xx < x + D2; xx++) px[row + xx] = color;
        }
      }
      ctx.putImageData(frame, 0, 0);
    };

    const step = () => {
      raf = requestAnimationFrame(step);
      if (!built || !inView) return;
      const now = performance.now();
      const d = smooth(clamp01(window.scrollY / (H * 0.72)));
      render(now, d, now - cursorAt < CURSOR_IDLE_MS);
    };

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      cursorX = e.clientX - r.left;
      cursorY = e.clientY - r.top;
      cursorAt = performance.now();
    };

    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(build, 200);
    };
    const onVisible = () => {
      inView = !document.hidden;
    };
    const io = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting && !document.hidden;
    });

    art.onload = build;
    if (art.complete) build();
    if (!reduce) {
      io.observe(root);
      window.addEventListener("pointermove", onMove, { passive: true });
      window.addEventListener("resize", onResize);
      document.addEventListener("visibilitychange", onVisible);
      raf = requestAnimationFrame(step);
    }

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(resizeTimer);
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 hidden select-none overflow-hidden lg:block"
      style={{
        containerType: "size",
        maskImage: "linear-gradient(to bottom, #000 calc(100% - 56px), transparent)",
      }}
    >
      <div
        ref={boxRef}
        className="absolute bottom-0 left-1/2 -translate-x-1/2"
        style={{ width: "max(100cqw, 165.9cqh)", aspectRatio: "1615 / 974" }}
      >
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      </div>
    </div>
  );
}
