export interface RegistrationConfig {
  url: string;
  selectors: {
    email: string;
    password: string;
    submit: string;
  };
  waitTime?: number;
}

export interface RegistrationResult {
  email: string;
  success: boolean;
  error?: string;
  timestamp: Date;
}