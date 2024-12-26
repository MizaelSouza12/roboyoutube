export interface FakePerson {
  firstName: string;
  lastName: string;
  birthDay: number;
  birthMonth: number;
  birthYear: number;
  gender: string;
}

export function generateFakePerson(): FakePerson {
  const firstNames = ['Maria', 'João', 'Ana', 'Pedro', 'Julia', 'Lucas'];
  const lastNames = ['Silva', 'Santos', 'Oliveira', 'Souza', 'Rodrigues'];
  
  return {
    firstName: firstNames[Math.floor(Math.random() * firstNames.length)],
    lastName: lastNames[Math.floor(Math.random() * lastNames.length)],
    birthDay: Math.floor(Math.random() * 28) + 1,
    birthMonth: Math.floor(Math.random() * 12) + 1,
    birthYear: Math.floor(Math.random() * (2000 - 1980) + 1980),
    gender: Math.random() > 0.5 ? 'M' : 'F'
  };
}

export function generateSecurePassword(): string {
  const length = 16;
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
  return Array.from(crypto.getRandomValues(new Uint8Array(length)))
    .map(x => charset[x % charset.length])
    .join('');
}