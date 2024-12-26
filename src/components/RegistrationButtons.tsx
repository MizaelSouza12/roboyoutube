import React, { useState } from 'react';
import { Youtube, Music } from 'lucide-react';
import { registerYouTubeAccount } from '../services/registration/youtube';
import { registerSpotifyAccount } from '../services/registration/spotify';

interface RegistrationButtonsProps {
  emails: string[];
  onRegistrationComplete: (service: string, results: { email: string; success: boolean }[]) => void;
}

export function RegistrationButtons({ emails, onRegistrationComplete }: RegistrationButtonsProps) {
  const [isRegistering, setIsRegistering] = useState(false);
  const [currentService, setCurrentService] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  const handleRegistration = async (service: 'youtube' | 'spotify') => {
    if (isRegistering) return;
    
    setIsRegistering(true);
    setCurrentService(service);
    setProgress(0);
    
    const results = [];
    const registerFn = service === 'youtube' ? registerYouTubeAccount : registerSpotifyAccount;

    for (let i = 0; i < emails.length; i++) {
      const success = await registerFn(emails[i]);
      results.push({ email: emails[i], success });
      setProgress(((i + 1) / emails.length) * 100);
    }

    onRegistrationComplete(service, results);
    setIsRegistering(false);
    setCurrentService(null);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => handleRegistration('youtube')}
          disabled={isRegistering}
          className={`btn-primary flex items-center justify-center gap-2 py-3 ${
            isRegistering && currentService === 'youtube' ? 'opacity-75' : ''
          }`}
        >
          <Youtube className="w-5 h-5" />
          {isRegistering && currentService === 'youtube' 
            ? 'Criando contas...' 
            : 'Criar contas YouTube'}
        </button>

        <button
          onClick={() => handleRegistration('spotify')}
          disabled={isRegistering}
          className={`btn-primary flex items-center justify-center gap-2 py-3 ${
            isRegistering && currentService === 'spotify' ? 'opacity-75' : ''
          }`}
        >
          <Music className="w-5 h-5" />
          {isRegistering && currentService === 'spotify'
            ? 'Criando contas...'
            : 'Criar contas Spotify'}
        </button>
      </div>

      {isRegistering && (
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div 
            className="bg-orange-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  );
}