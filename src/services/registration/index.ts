import { registerYouTubeAccount } from '../youtube/registration';
import { checkVerificationEmail } from '../email/verification';
import type { RegistrationConfig, RegistrationResult } from '../../types/registration';

export async function registerAccount(email: string, config: RegistrationConfig): Promise<RegistrationResult> {
  try {
    // Gerar senha segura
    const password = generateSecurePassword();

    // Registrar no YouTube
    const registered = await registerYouTubeAccount(email, password);
    
    if (!registered) {
      throw new Error('Falha no registro do YouTube');
    }

    // Aguardar e verificar email de confirmação
    await new Promise(resolve => setTimeout(resolve, 30000)); // Esperar 30 segundos
    
    const verification = await checkVerificationEmail(email, password);
    
    if (!verification.success) {
      throw new Error(`Falha na verificação: ${verification.error}`);
    }

    // Confirmar verificação
    const confirmed = await confirmVerification(verification.verificationLink);
    
    if (!confirmed) {
      throw new Error('Falha na confirmação do email');
    }

    return {
      email,
      success: true,
      timestamp: new Date(),
      details: {
        password,
        verified: true
      }
    };
  } catch (error) {
    return {
      email,
      success: false,
      error: error instanceof Error ? error.message : 'Erro desconhecido',
      timestamp: new Date()
    };
  }
}

function generateSecurePassword(): string {
  const length = 12;
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
  let password = '';
  
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  
  return password;
}

async function confirmVerification(verificationLink: string): Promise<boolean> {
  try {
    const response = await fetch(verificationLink);
    return response.ok;
  } catch {
    return false;
  }
}