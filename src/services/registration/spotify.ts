import { registerWithAntiBot } from './base';
import { generateFakePerson, generateSecurePassword } from '../../utils/fakeData';
import type { RegistrationData } from './types';

const SPOTIFY_SELECTORS = {
  email: 'input[name="email"]',
  password: 'input[name="password"]',
  firstName: 'input[name="displayname"]',
  birthDay: 'input[name="day"]',
  birthMonth: 'select[name="month"]',
  birthYear: 'input[name="year"]',
  submit: 'button[type="submit"]'
};

export async function registerSpotifyAccount(email: string): Promise<boolean> {
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
    'https://www.spotify.com/signup',
    data,
    SPOTIFY_SELECTORS,
    '6LdFSYIUAAAAADGwvDk_6-BC5ZyLKWKzkRRMHxpB'  // Spotify reCAPTCHA site key
  );
}