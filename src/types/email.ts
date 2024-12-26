export type EmailStatus = 'idle' | 'generating' | 'monitoring' | 'verified' | 'failed';

export interface TempEmail {
  id: string;
  address: string;
  createdAt: Date;
  status: EmailStatus;
  lastChecked?: Date;
}

export interface EmailDomain {
  domain: string;
  active: boolean;
}

export interface EmailVerificationResult {
  success: boolean;
  verificationLink?: string;
  error?: string;
}