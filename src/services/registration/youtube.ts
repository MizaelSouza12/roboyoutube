import { registerWithAntiBot } from './base';
import { generateFakePerson, generateSecurePassword } from '../../utils/fakeData';
import type { RegistrationData } from './types';

const YOUTUBE_SELECTORS = {
  firstName: 'input[name="firstName"]',
  lastName: 'input[name="lastName"]',
  email: 'input[name="Username"]',
  password: 'input[name="Passwd"]',
  confirmPassword: 'input[name="ConfirmPasswd"]',
  submit: '#accountDetailsNext'
};

export async function registerYouTubeAccount(email: string): Promise<boolean> {
  const person = generateFakePerson();
  const password = generateSecurePassword();

  const data: RegistrationData = {
    email,
    password,
    firstName: person.firstName,
    lastName: person.lastName,
    birthDay: person.birthDay,
    birthMonth: person.birthMonth,
    birthYear: person.birthYear,
    gender: person.gender
  };

  return registerWithAntiBot(
    'https://accounts.google.com/signup',
    data,
    YOUTUBE_SELECTORS,
    '6LdyC2cUAAAAACGuDKN6s_H'  // Google reCAPTCHA site key
  );
}