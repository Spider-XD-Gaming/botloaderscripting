const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 800 });

  await page.goto("file://" + __dirname + "/docs/index.html", { waitUntil: "networkidle0" });

  // Wait for cytoscape to finish rendering
  await page.waitForSelector("#cy");

  // Optional: delay just to be safe
  await page.waitForTimeout(2000);

  const element = await page.$("#cy");
  await element.screenshot({ path: "docs/tree.png" });

  await browser.close();
})();
