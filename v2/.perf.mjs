// usage: node perf.mjs <chromium|webkit> [headed]
import { chromium, webkit } from "playwright-core";
import os from "os";
import path from "path";
import fs from "fs";

const which = process.argv[2] || "chromium";
const headed = process.argv[3] === "headed";
const cache = path.join(os.homedir(), "Library/Caches/ms-playwright");
const exe = which === "chromium"
  ? path.join(cache, "chromium-1234/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing")
  : path.join(cache, fs.readdirSync(cache).find((d) => d.startsWith("webkit-")), "pw_run.sh");

const browser = await (which === "chromium" ? chromium : webkit).launch({ executablePath: exe, headless: !headed });
const ctx = await browser.newContext({ viewport: { width: 1600, height: 1000 }, deviceScaleFactor: 2 });
const page = await ctx.newPage();
const errors = [];
page.on("pageerror", (e) => errors.push(String(e)));
page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });

await page.goto("http://localhost:4321/", { waitUntil: "networkidle" });
if (process.env.CSS) await page.addStyleTag({ content: process.env.CSS });
if (process.env.HIDE_HERO) await page.evaluate(() => { const c = document.querySelector("section canvas"); const root = c?.closest("[aria-hidden]"); if (root) root.style.display = "none"; });
const ONLY = process.env.ONLY || "";
await page.waitForTimeout(800);
console.log("UA:", await page.evaluate(() => navigator.userAgent));
console.log("dpr:", await page.evaluate(() => devicePixelRatio), "ring canvas:", await page.evaluate(() => { const c = document.querySelector("#work canvas"); return c ? `${c.width}x${c.height}` : "none"; }));

const startRec = () => page.evaluate(() => {
  window.__f = []; window.__rec = true;
  let last = performance.now();
  const loop = (t) => { if (!window.__rec) return; window.__f.push(t - last); last = t; requestAnimationFrame(loop); };
  requestAnimationFrame(loop);
});
const stopRec = (label) => page.evaluate(() => { window.__rec = false; return window.__f.slice(1); }).then((f) => {
  const s = [...f].sort((a, b) => a - b);
  const p = (q) => s[Math.min(s.length - 1, Math.floor(q * s.length))];
  const total = f.reduce((a, b) => a + b, 0);
  const long = f.filter((d) => d > 33).length;
  const miss = f.filter((d) => d > 20).length;
  console.log(`${label.padEnd(10)} frames=${f.length} fps≈${(1000 * f.length / total).toFixed(1)} avg=${(total / f.length).toFixed(1)}ms p95=${p(0.95).toFixed(1)} max=${s.at(-1).toFixed(0)} miss(>20)=${(100 * miss / f.length).toFixed(0)}% long(>33)=${(100 * long / f.length).toFixed(0)}%`);
});

if (ONLY !== "ring") {
// ── 1. manifesto: from the hero's tail, wheel through the thesis ──
await page.evaluate(() => window.scrollTo({ top: window.innerHeight * 0.6, behavior: "instant" }));
await page.mouse.move(800, 400);
await page.waitForTimeout(600);
await startRec();
for (let i = 0; i < 14; i++) { await page.mouse.wheel(0, 110); await page.waitForTimeout(140); }
await page.waitForTimeout(700);
await stopRec("manifesto");
if (process.env.SHOT) await page.screenshot({ path: process.env.SHOT + "-manifesto.png" });
console.log("  scrollY now:", await page.evaluate(() => Math.round(scrollY)), "section:", await page.evaluate(() => document.querySelector("[data-hud=THESIS]")?.getBoundingClientRect().top | 0));

}
if (ONLY !== "manifesto") {
// ── 2. ring: jump to work, let the entry play, then wheel-step ──
await page.evaluate(() => { const el = document.getElementById("work"); window.scrollTo({ top: el.getBoundingClientRect().top + scrollY, behavior: "instant" }); });
await startRec();
await page.waitForTimeout(9000);
await stopRec("ring-entry");
await page.mouse.move(800, 500);
await startRec();
for (let i = 0; i < 6; i++) { await page.mouse.wheel(0, 500); if (process.env.SHOT && i === 2) { await page.waitForTimeout(350); await page.screenshot({ path: process.env.SHOT + "-morph.png" }); await page.waitForTimeout(550); } else await page.waitForTimeout(900); }
if (process.env.SHOT) await page.screenshot({ path: process.env.SHOT + "-ring.png" });
await stopRec("ring-wheel");
await startRec();
await page.waitForTimeout(2500);
await stopRec("ring-idle");
console.log("  locked:", await page.evaluate(() => document.documentElement.style.overflow === "hidden"));
}

console.log("ERRORS:", errors.length ? errors.slice(0, 5).join("\n") : "none");
await browser.close();
