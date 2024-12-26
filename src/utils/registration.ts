import type { RegistrationConfig, RegistrationResult } from '../types/registration';

export async function registerAccount(email: string, config: RegistrationConfig): Promise<RegistrationResult> {
  try {
    const response = await fetch(config.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: 'TempPass123!', // Senha padrão segura
      }),
    });

    if (!response.ok) {
      throw new Error(`Falha no registro: ${response.statusText}`);
    }

    const data = await response.json();
    
    return {
      email,
      success: true,
      timestamp: new Date(),
      responseData: data
    };
  } catch (error) {
    console.error('Erro no registro:', error);
    return {
      email,
      success: false,
      error: error instanceof Error ? error.message : 'Erro desconhecido',
      timestamp: new Date()
    };
  }
}