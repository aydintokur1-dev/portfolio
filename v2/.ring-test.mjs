import { chromium } from "playwright-core";
import os from "os";
import path from "path";

const exe = path.join(os.homedir(), "Library/Caches/ms-playwright/chromium-1234/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing");
const outDir = "/private/tmp/claude-502/-Users-pickleball-workspace-portfolio/d9a97338-0cd8-4b54-b74d-f60d1ed80ef1/scratchpad/shots";

const browser = await chromium.launch({ executablePath: exe });
const page = await (await browser.newContext({ viewport: { width: 1600, height: 1000 }, deviceScaleFactor: 1 })).newPage();
const errors = [];
page.on("pageerror", (e) => errors.push(String(e)));
page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });

await page.goto("http://localhost:4321/", { waitUntil: "networkidle" });
await page.waitForTimeout(500);

// scroll the work section into view; entry starts at 30% visible
await page.evaluate(() => {
  const el = document.getElementById("work");
  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY, behavior: "instant" });
});
await page.waitForTimeout(12000); // let the entry play out
await page.mouse.move(800, 500);
await page.screenshot({ path: `${outDir}/ring-0-entry.png` });

const state = async () => page.evaluate(() => ({
  locked: document.documentElement.style.overflow === "hidden",
  scrollY: Math.round(window.scrollY),
  current: [...document.querySelectorAll('[aria-label="Projects"] li')].findIndex(li => li.hasAttribute("aria-current")),
}));
console.log("after entry:", await state());

// wheel forward a couple of notches
await page.mouse.wheel(0, 600);
await page.waitForTimeout(1800);
await page.screenshot({ path: `${outDir}/ring-1-wheel.png` });
console.log("after wheel:", await state());

// click a name in the column (index 7 = Innos)
const buttons = page.locator('[aria-label="Projects"] li button');
await buttons.nth(7).click();
await page.waitForTimeout(2200);
await page.screenshot({ path: `${outDir}/ring-2-listclick.png` });
console.log("after list click:", await state());

// wheel until the last project, then one more to release
for (let i = 0; i < 20; i++) {
  const s = await state();
  if (!s.locked) break;
  await page.mouse.wheel(0, 500);
  await page.waitForTimeout(900);
}
await page.waitForTimeout(1200);
await page.screenshot({ path: `${outDir}/ring-3-released.png` });
console.log("after wheel-through:", await state());

console.log("ERRORS:", errors.length ? errors.join("\n") : "none");
await browser.close();
