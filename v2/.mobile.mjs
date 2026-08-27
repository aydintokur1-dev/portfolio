import { chromium } from "playwright-core";
import os from "os"; import path from "path";
const exe = path.join(os.homedir(), "Library/Caches/ms-playwright/chromium-1234/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing");
const outDir = "/private/tmp/claude-502/-Users-pickleball-workspace-portfolio/54ffb0aa-e614-4875-b4a9-2742cecc98c4/scratchpad/shots";
const browser = await chromium.launch({ executablePath: exe });
const page = await (await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true })).newPage();
await page.goto("http://localhost:4321/", { waitUntil: "networkidle" });
await page.waitForTimeout(700);
await page.screenshot({ path: `${outDir}/mob-0.png` });
for (const y of [1400, 3600, 6200]) {
  await page.evaluate((yy) => window.scrollTo(0, yy), y);
  await page.waitForTimeout(600);
  await page.screenshot({ path: `${outDir}/mob-${y}.png` });
}
await browser.close(); console.log("ok");
