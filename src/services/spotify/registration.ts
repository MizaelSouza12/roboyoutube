import puppeteer from 'puppeteer';
import { generateFakePerson, generateSecurePassword } from '../../utils/fakeData';

export async function registerSpotifyAccount(email: string): Promise<boolean> {
  const browser = await puppeteer.launch({ 
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  try {
    const page = await browser.newPage();
    await page.goto('https://www.spotify.com/signup');
    
    const person = generateFakePerson();
    const password = generateSecurePassword();

    // Preencher formulário
    await page.type('input[name="email"]', email);
    await page.type('input[name="password"]', password);
    await page.type('input[name="displayname"]', `${person.firstName} ${person.lastName}`);
    
    // Data de nascimento
    await page.type('input[name="day"]', person.birthDay.toString());
    await page.select('select[name="month"]', person.birthMonth.toString());
    await page.type('input[name="year"]', person.birthYear.toString());

    // Gênero
    await page.click(`input[value="${person.gender}"]`);

    // Aceitar termos
    await page.click('input[name="terms"]');

    // Registrar
    await page.click('button[type="submit"]');

    // Aguardar confirmação
    await page.waitForNavigation({ timeout: 10000 });

    return true;
  } catch (error) {
    console.error('Erro no registro do Spotify:', error);
    return false;
  } finally {
    await browser.close();
  }
}