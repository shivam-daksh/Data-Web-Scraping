const puppeteer = require("puppeteer");

async function crawlSite(url) {
  const browser = await puppeteer.launch({
    headless: true, // Can be set to false to see the browser interaction
  });
  const page = await browser.newPage();

  // Set a common browser user-agent to avoid detection
  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
  );

  await page.goto(url, { waitUntil: "networkidle2" });
  const content = await page.content(); // Get fully-rendered HTML
  console.log(content); // Process the content as needed

  await browser.close();
}

crawlSite("https://www.shiksha.com/");
