import React, { useState } from 'react';
import { Mail } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { EmailList } from './components/EmailList';
import { Stats } from './components/Stats';
import { RegistrationButtons } from './components/RegistrationButtons';
import { generateEmailAddress } from './utils/emailDomains';
import type { TempEmail } from './types/email';

const BATCH_SIZE = 50;
const INTERVAL_MINUTES = 5;

function App() {
  const [emails, setEmails] = useState<TempEmail[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [nextGeneration, setNextGeneration] = useState<Date | null>(null);
  const [registrationResults, setRegistrationResults] = useState<Array<{
    service: string;
    results: Array<{ email: string; success: boolean }>;
  }>>([]);

  // ... resto do código existente ...

  const handleRegistrationComplete = (
    service: string, 
    results: Array<{ email: string; success: boolean }>
  ) => {
    setRegistrationResults(prev => [...prev, { service, results }]);
    
    // Atualizar status dos emails
    setEmails(prev => prev.map(email => {
      const result = results.find(r => r.email === email.address);
      if (result) {
        return {
          ...email,
          status: result.success ? 'verified' : 'failed'
        };
      }
      return email;
    }));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        {/* ... resto do código existente ... */}
        
        <Stats emails={emails} />
        
        <RegistrationButtons 
          emails={emails.map(e => e.address)}
          onRegistrationComplete={handleRegistrationComplete}
        />

        <div className="grid grid-cols-2 gap-6 mt-6">
          <EmailList emails={emails} />
          <div className="card p-6">
            <h2 className="text-lg font-semibold mb-4">Resultados dos Registros</h2>
            {registrationResults.map((result, index) => (
              <div key={index} className="mb-4">
                <h3 className="text-md font-medium mb-2">
                  {result.service === 'youtube' ? 'YouTube' : 'Spotify'}
                </h3>
                <div className="text-sm">
                  <p className="text-green-500">
                    Sucesso: {result.results.filter(r => r.success).length}
                  </p>
                  <p className="text-red-500">
                    Falhas: {result.results.filter(r => !r.success).length}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;