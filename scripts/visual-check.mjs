import { chromium } from "playwright-core";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const chromePath =
  process.env.CHROME_PATH ||
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const baseUrl = process.env.APP_URL || "http://localhost:5173/";
const outputDir = path.resolve("artifacts");

await mkdir(outputDir, { recursive: true });

const browser = await chromium.launch({
  executablePath: chromePath,
  headless: true,
  args: ["--disable-gpu-sandbox", "--no-first-run"],
});

const viewports = [
  { name: "desktop", width: 1440, height: 1100, isMobile: false },
  { name: "mobile", width: 390, height: 844, isMobile: true },
];

const results = [];

for (const viewport of viewports) {
  const page = await browser.newPage({
    viewport: { width: viewport.width, height: viewport.height },
    deviceScaleFactor: viewport.isMobile ? 2 : 1,
    isMobile: viewport.isMobile,
  });

  const pageErrors = [];
  page.on("pageerror", (error) => pageErrors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") pageErrors.push(message.text());
  });

  await page.goto(baseUrl, { waitUntil: "networkidle" });
  await page.waitForTimeout(1200);

  const screenshotPath = path.join(outputDir, `${viewport.name}.png`);
  await page.screenshot({ path: screenshotPath, fullPage: false });

  const metrics = await page.evaluate(() => {
    const canvas = document.querySelector("canvas");
    const overflowX =
      document.documentElement.scrollWidth - window.innerWidth;
    const hero = document.querySelector("#home");
    const contact = document.querySelector("#contact");

    if (!canvas) {
      return {
        hasCanvas: false,
        canvasWidth: 0,
        canvasHeight: 0,
        litSamples: 0,
        averageAlpha: 0,
        overflowX,
        heroVisible: Boolean(hero),
        contactVisible: Boolean(contact),
      };
    }

    const rect = canvas.getBoundingClientRect();
    const gl =
      canvas.getContext("webgl2", { preserveDrawingBuffer: true }) ||
      canvas.getContext("webgl", { preserveDrawingBuffer: true });
    const samplePoints = [
      [0.35, 0.35],
      [0.5, 0.35],
      [0.65, 0.35],
      [0.35, 0.5],
      [0.5, 0.5],
      [0.65, 0.5],
      [0.35, 0.65],
      [0.5, 0.65],
      [0.65, 0.65],
    ];

    let litSamples = 0;
    let totalAlpha = 0;

    if (gl) {
      for (const [xFactor, yFactor] of samplePoints) {
        const pixel = new Uint8Array(4);
        const x = Math.floor(gl.drawingBufferWidth * xFactor);
        const y = Math.floor(gl.drawingBufferHeight * (1 - yFactor));
        gl.readPixels(x, y, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, pixel);
        const brightness = pixel[0] + pixel[1] + pixel[2];
        totalAlpha += pixel[3];
        if (pixel[3] > 12 && brightness > 24) litSamples += 1;
      }
    }

    return {
      hasCanvas: true,
      innerWidth: window.innerWidth,
      canvasWidth: Math.round(rect.width),
      canvasHeight: Math.round(rect.height),
      litSamples,
      averageAlpha: Math.round(totalAlpha / samplePoints.length),
      overflowX,
      heroVisible: Boolean(hero),
      contactVisible: Boolean(contact),
    };
  });

  const scrollHeight = await page.evaluate(
    () => document.documentElement.scrollHeight,
  );
  for (let y = 0; y <= scrollHeight; y += Math.round(viewport.height * 0.7)) {
    await page.evaluate((nextY) => window.scrollTo(0, nextY), y);
    await page.waitForTimeout(180);
  }
  await page.waitForTimeout(700);

  const revealMetrics = await page.evaluate(() => {
    const reveals = Array.from(document.querySelectorAll("[data-reveal]"));
    const revealed = reveals.filter((element) => {
      const style = window.getComputedStyle(element);
      return Number.parseFloat(style.opacity) > 0.85;
    });

    return {
      totalReveals: reveals.length,
      revealedCount: revealed.length,
    };
  });

  const scrolledScreenshotPath = path.join(
    outputDir,
    `${viewport.name}-scrolled.png`,
  );
  await page.screenshot({ path: scrolledScreenshotPath, fullPage: true });

  results.push({
    viewport: viewport.name,
    screenshotPath,
    scrolledScreenshotPath,
    pageErrors,
    ...metrics,
    ...revealMetrics,
  });

  await page.close();
}

await browser.close();

const failed = results.filter(
  (result) =>
    !result.hasCanvas ||
    result.canvasWidth < 250 ||
    result.canvasHeight < 250 ||
    result.litSamples < 1 ||
    result.overflowX > 4 ||
    !result.heroVisible ||
    !result.contactVisible ||
    result.revealedCount !== result.totalReveals ||
    result.pageErrors.length > 0,
);

console.log(JSON.stringify(results, null, 2));

if (failed.length > 0) {
  process.exitCode = 1;
}
