import { chromium } from "playwright-core";
import os from "os";
import path from "path";

const exe = path.join(os.homedir(), "Library/Caches/ms-playwright/chromium-1234/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing");
const outDir = "/private/tmp/claude-502/-Users-pickleball-workspace-portfolio/54ffb0aa-e614-4875-b4a9-2742cecc98c4/scratchpad/shots";

const [,, url = "http://localhost:4321/", name = "home", mode = "sections"] = process.argv;

const browser = await chromium.launch({ executablePath: exe });
const page = await (await browser.newContext({ viewport: { width: 1600, height: 1000 }, deviceScaleFactor: 1 })).newPage();
const errors = [];
page.on("pageerror", (e) => errors.push(String(e)));
page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });

await page.goto(url, { waitUntil: "networkidle" });
await page.waitForTimeout(800);

if (mode === "sections") {
  const height = await page.evaluate(() => document.documentElement.scrollHeight);
  const step = 1000;
  let n = 0;
  for (let y = 0; y < height && n < 14; y += step, n++) {
    await page.evaluate((yy) => window.scrollTo({ top: yy, behavior: "instant" }), y);
    await page.waitForTimeout(650);
    await page.screenshot({ path: `${outDir}/${name}-${String(n).padStart(2, "0")}.png` });
  }
} else {
  await page.screenshot({ path: `${outDir}/${name}.png`, fullPage: mode === "full" });
}

console.log("ERRORS:", errors.length ? errors.join("\n") : "none");
await browser.close();
