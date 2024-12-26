export const availableDomains: string[] = [
  'tempmail.com',
  'temp-mail.org',
  'throwawaymail.com',
  'tmpmail.net',
  'mailinator.com',
  'guerrillamail.com',
  'temp-mail.io',
  'tempmailgen.com',
  'disposablemail.com',
  'tempmail.plus'
];

export const getRandomDomain = (): string => {
  const index = Math.floor(Math.random() * availableDomains.length);
  return availableDomains[index];
};

export const generateEmailAddress = (): string => {
  const username = 'tmp-' + 
    Math.random().toString(36).substring(2, 8) + 
    Date.now().toString(36).substring(-4);
  const domain = getRandomDomain();
  return `${username}@${domain}`;
};