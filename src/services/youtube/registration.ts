import puppeteer from 'puppeteer';
import { generateFakePerson, generateSecurePassword } from '../../utils/fakeData';

export async function registerYouTubeAccount(email: string): Promise<boolean> {
  const browser = await puppeteer.launch({ 
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  try {
    const page = await browser.newPage();
    await page.goto('https://accounts.google.com/signup');
    
    const person = generateFakePerson();
    const password = generateSecurePassword();

    // Preencher formulário
    await page.type('input[name="firstName"]', person.firstName);
    await page.type('input[name="lastName"]', person.lastName);
    await page.type('input[name="Username"]', email.split('@')[0]);
    await page.type('input[name="Passwd"]', password);
    await page.type('input[name="ConfirmPasswd"]', password);

    // Data de nascimento
    await page.select('select[id="month"]', person.birthMonth.toString());
    await page.type('input[name="day"]', person.birthDay.toString());
    await page.type('input[name="year"]', person.birthYear.toString());

    // Gênero
    await page.select('select[id="gender"]', person.gender);

    // Próximo
    await page.click('#accountDetailsNext');

    // Aguardar possível verificação de telefone
    await page.waitForNavigation({ timeout: 10000 }).catch(() => {
      // Se timeout, provavelmente pediu verificação por telefone
      throw new Error('Verificação por telefone solicitada');
    });

    return true;
  } catch (error) {
    console.error('Erro no registro do YouTube:', error);
    return false;
  } finally {
    await browser.close();
  }
}