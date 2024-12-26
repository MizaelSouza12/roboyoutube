import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import RecaptchaPlugin from 'puppeteer-extra-plugin-recaptcha';
import { getNextProxy } from './proxy';
import { solveCaptcha } from './captcha';

puppeteer.use(StealthPlugin());
puppeteer.use(
  RecaptchaPlugin({
    provider: {
      id: '2captcha',
      token: process.env.CAPTCHA_API_KEY || ''
    }
  })
);

interface BrowserConfig {
  proxy?: boolean;
  cookies?: boolean;
  fingerprint?: boolean;
}

export async function createStealthBrowser(config: BrowserConfig = {}) {
  const proxy = config.proxy ? getNextProxy() : undefined;
  
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-infobars',
      '--window-position=0,0',
      '--ignore-certifcate-errors',
      '--ignore-certifcate-errors-spki-list',
      proxy ? `--proxy-server=https://${proxy.host}:${proxy.port}` : '',
    ].filter(Boolean),
  });

  const page = await browser.newPage();
  
  // Configurar fingerprint aleatório
  if (config.fingerprint) {
    await page.evaluateOnNewDocument(() => {
      Object.defineProperty(navigator, 'webdriver', { get: () => false });
      Object.defineProperty(navigator, 'languages', { get: () => ['pt-BR', 'pt', 'en-US', 'en'] });
      Object.defineProperty(navigator, 'plugins', { get: () => [] });
    });
  }

  return { browser, page };
}