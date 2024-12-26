import { RecaptchaPlugin } from 'puppeteer-extra-plugin-recaptcha';
import { TwoCaptcha } from '2captcha';

const solver = new TwoCaptcha(process.env.CAPTCHA_API_KEY || '');

export async function solveCaptcha(siteKey: string, url: string): Promise<string> {
  try {
    const result = await solver.recaptcha({
      sitekey: siteKey,
      url: url,
      invisible: true
    });
    
    return result.data;
  } catch (error) {
    console.error('Erro ao resolver captcha:', error);
    throw error;
  }
}