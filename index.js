const puppeteer = require("puppeteer");

async function crawlSite(url) {
  const browser = await puppeteer.launch({
    headless: false, // Change to true if you don’t want the browser UI
    defaultViewport: null, // Full viewport
    args: ["--start-maximized"], // Start browser maximized
  });

  try {
    const page = await browser.newPage();

    // Set user-agent to avoid detection
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    );

    // Navigate to the website
    await page.goto(url, { waitUntil: "domcontentloaded" });

    // Wait for the button/link to appear and then click
    await page.waitForSelector(".inside-gnbpage", { timeout: 5000 });
    await page.click(".inside-gnbpage");

    // Wait for the search input field to appear
    await page.waitForSelector("#searchInput", { timeout: 5000 });
    await page.type("#searchInput", "John Doe", { delay: 100 });

    // Press Enter
    await page.keyboard.press("Enter");

    // Wait for the search results to load
    await page.waitForNavigation({ waitUntil: "networkidle2" });

    // Get the page content after search
    const content = await page.content();
    console.log("Page Content Length:", content.length);
  } catch (error) {
    console.error("Error during execution:", error);
  } finally {
    await browser.close();
  }
}

crawlSite("https://www.shiksha.com/");
