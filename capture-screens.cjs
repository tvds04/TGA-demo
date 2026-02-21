const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join(__dirname, 'screenshots');
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function captureScreens() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
  });
  
  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844 });
  
  console.log('Navigating to app...');
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle0', timeout: 30000 });
  console.log('Page loaded');
  
  // Wait a bit for React to render
  await new Promise(r => setTimeout(r, 3000));
  
  // Step 1: Click "Get Started" (first button on page)
  console.log('Clicking Get Started...');
  await page.click('button');
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(OUTPUT_DIR, 'onboarding1.png') });
  console.log('Captured onboarding1');
  
  // Step 2-4: Click Continue buttons (three more times)
  for (let i = 2; i <= 4; i++) {
    console.log(`Clicking continue ${i-1}...`);
    await page.click('button');
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({ path: path.join(OUTPUT_DIR, `onboarding${i}.png`) });
    console.log(`Captured onboarding${i}`);
  }
  
  // Step 5: Final Get Started (button after 4 continues)
  console.log('Clicking final button to finish...');
  await page.click('button');
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: path.join(OUTPUT_DIR, 'home.png') });
  console.log('Captured home');
  
  // Navigate through tabs - click buttons in order (skip first 5 buttons which are in onboarding)
  // Tab bar is at bottom - find buttons with tab labels
  const allButtons = await page.$$('button');
  console.log(`Found ${allButtons.length} buttons`);
  
  // The tab bar buttons should be at indices 5,6,7,8,9 (after onboarding buttons)
  // But let's use text content instead
  const buttons = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('button')).map(b => b.textContent.trim());
  });
  console.log('Button texts:', buttons);
  
  // Click Community tab (label is "Community")
  const communityBtn = await page.$('button:contains("Community")').catch(() => null) 
    || await page.evaluateHandle(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      return btns.find(b => b.textContent.includes('Community'));
    });
  if (communityBtn) {
    await communityBtn.click();
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({ path: path.join(OUTPUT_DIR, 'community.png') });
    console.log('Captured community');
  }
  
  // Insights tab
  const insightsBtn = await page.evaluateHandle(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    return btns.find(b => b.textContent.includes('Insights'));
  });
  if (insightsBtn) {
    await insightsBtn.click();
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({ path: path.join(OUTPUT_DIR, 'insights.png') });
    console.log('Captured insights');
  }
  
  // Learn tab
  const learnBtn = await page.evaluateHandle(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    return btns.find(b => b.textContent.includes('Learn'));
  });
  if (learnBtn) {
    await learnBtn.click();
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({ path: path.join(OUTPUT_DIR, 'education.png') });
    console.log('Captured education');
  }
  
  // Profile tab
  const profileBtn = await page.evaluateHandle(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    return btns.find(b => b.textContent.includes('Profile'));
  });
  if (profileBtn) {
    await profileBtn.click();
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({ path: path.join(OUTPUT_DIR, 'profile.png') });
    console.log('Captured profile');
  }
  
  await browser.close();
  console.log('Done! Screenshots saved to', OUTPUT_DIR);
  
  // List files
  const files = fs.readdirSync(OUTPUT_DIR);
  console.log('Files:', files.join(', '));
}

captureScreens().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
