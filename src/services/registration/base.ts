import { createStealthBrowser } from '../security/antiBot';
import { solveCaptcha } from '../security/captcha';
import type { RegistrationData } from './types';

export async function registerWithAntiBot(
  url: string,
  data: RegistrationData,
  selectors: Record<string, string>,
  siteKey?: string
) {
  const { browser, page } = await createStealthBrowser({
    proxy: true,
    fingerprint: true
  });

  try {
    await page.goto(url);

    // Preencher formulário
    for (const [field, selector] of Object.entries(selectors)) {
      if (data[field as keyof RegistrationData]) {
        await page.type(selector, String(data[field as keyof RegistrationData]));
      }
    }

    // Resolver CAPTCHA se necessário
    if (siteKey) {
      const token = await solveCaptcha(siteKey, url);
      await page.evaluate(`document.querySelector('[name="g-recaptcha-response"]').innerHTML="${token}";`);
    }

    // Submeter formulário
    await page.click(selectors.submit);
    await page.waitForNavigation({ timeout: 10000 });

    return true;
  } catch (error) {
    console.error('Erro no registro:', error);
    return false;
  } finally {
    await browser.close();
  }
}