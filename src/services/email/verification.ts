import { connect } from 'imap-simple';
import { simpleParser } from 'mailparser';
import type { EmailVerificationResult } from '../../types/email';

export async function checkVerificationEmail(email: string, password: string): Promise<EmailVerificationResult> {
  const config = {
    imap: {
      user: email,
      password: password,
      host: getImapServer(email),
      port: 993,
      tls: true,
      authTimeout: 3000
    }
  };

  try {
    const connection = await connect(config);
    await connection.openBox('INBOX');

    // Procurar email de verificação do YouTube
    const searchCriteria = ['UNSEEN', ['FROM', 'noreply@youtube.com']];
    const messages = await connection.search(searchCriteria, { bodies: [''], struct: true });

    if (messages.length === 0) {
      return { success: false, error: 'Email de verificação não encontrado' };
    }

    // Pegar o link de verificação do último email
    const parsed = await simpleParser(messages[0].parts[0].body);
    const verificationLink = extractVerificationLink(parsed.text || '');

    if (!verificationLink) {
      return { success: false, error: 'Link de verificação não encontrado' };
    }

    return { success: true, verificationLink };
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Erro ao verificar email'
    };
  }
}

function getImapServer(email: string): string {
  const domain = email.split('@')[1];
  // Mapear domínios para servidores IMAP
  const imapServers: Record<string, string> = {
    'tempmail.com': 'imap.tempmail.com',
    'temp-mail.org': 'imap.temp-mail.org',
    // Adicionar mais servidores conforme necessário
  };
  return imapServers[domain] || '';
}

function extractVerificationLink(emailText: string): string | null {
  // Implementar extração do link de verificação baseado no formato do email
  const linkMatch = emailText.match(/https:\/\/accounts\.youtube\.com\/verify[^\s]*/);
  return linkMatch ? linkMatch[0] : null;
}