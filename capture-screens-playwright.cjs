const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join(__dirname, 'screenshots');
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function captureScreens() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 390, height: 844 });
  
  console.log('Navigating to app...');
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });
  console.log('Page loaded');
  
  await page.waitForTimeout(2000);
  
  // Complete onboarding by clicking the first button 5 times
  for (let i = 1; i <= 5; i++) {
    console.log(`Clicking through onboarding ${i}...`);
    await page.evaluate(() => {
      const btn = document.querySelector('button');
      if (btn) btn.click();
    });
    await page.waitForTimeout(1200);
    await page.screenshot({ path: path.join(OUTPUT_DIR, `onboarding${i}.png`) });
  }
  
  console.log('Getting home...');
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(OUTPUT_DIR, 'home.png') });
  
  // Click tabs using evaluate - click all buttons at bottom of screen
  // The tab bar is the flex container at bottom
  const tabClick = async (index) => {
    await page.evaluate((idx) => {
      const buttons = Array.from(document.querySelectorAll('button'));
      // Tab bar buttons should be in the bottom area - filter for ones with icons
      const tabButtons = buttons.filter(btn => {
        const rect = btn.getBoundingClientRect();
        return rect.top > 600; // Bottom of screen
      });
      if (tabButtons[idx]) tabButtons[idx].click();
    }, index);
    await page.waitForTimeout(1000);
  };
  
  console.log('Clicking Community...');
  await tabClick(1);
  await page.screenshot({ path: path.join(OUTPUT_DIR, 'community.png') });
  
  console.log('Clicking Insights...');
  await tabClick(2);
  await page.screenshot({ path: path.join(OUTPUT_DIR, 'insights.png') });
  
  console.log('Clicking Learn...');
  await tabClick(3);
  await page.screenshot({ path: path.join(OUTPUT_DIR, 'education.png') });
  
  console.log('Clicking Profile...');
  await tabClick(4);
  await page.screenshot({ path: path.join(OUTPUT_DIR, 'profile.png') });
  
  await browser.close();
  console.log('Done!');
  
  const files = fs.readdirSync(OUTPUT_DIR);
  console.log('Saved files:', files.join(', '));
}

captureScreens().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
