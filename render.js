const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 800 });

  await page.goto("file://" + __dirname + "/index.html", { waitUntil: "networkidle0" });

  // Wait for cytoscape to finish rendering
  await page.waitForSelector("#cy");
  await page.waitForFunction(() => {
    const cy = window.cy;
    return cy && cy.nodes && cy.nodes().length > 0;
  });

  // Optional: delay just to be safe
  await page.waitForTimeout(500);

  const element = await page.$("#cy");
  await element.screenshot({ path: "docs/tree.png" });

  await browser.close();
})();
