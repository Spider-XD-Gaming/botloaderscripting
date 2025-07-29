const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox']
  });

  const page = await browser.newPage();
  await page.goto('http://localhost:8080/docs/index.html', {
    waitUntil: 'networkidle2'
  });

  await page.waitForSelector('#cy');
  const element = await page.$('#cy');
  await element.screenshot({ path: 'docs/image.png' });

  await browser.close();
})();
