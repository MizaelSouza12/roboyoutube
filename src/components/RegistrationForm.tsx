import React, { useState } from 'react';
import { Link } from 'lucide-react';
import type { RegistrationConfig } from '../types/registration';

interface RegistrationFormProps {
  onStartRegistration: (config: RegistrationConfig) => void;
  isRunning: boolean;
}

export function RegistrationForm({ onStartRegistration, isRunning }: RegistrationFormProps) {
  const [url, setUrl] = useState('');
  const [selectors, setSelectors] = useState({
    email: '#email',
    password: '#password',
    submit: 'button[type="submit"]'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onStartRegistration({
      url,
      selectors,
      waitTime: 2000
    });
  };

  return (
    <div className="card p-6 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Link className="w-5 h-5 text-orange-500" />
        <h2 className="text-lg font-semibold text-white">Configuração do Registro Automático</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            URL do Site
          </label>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="input-field"
            placeholder="https://exemplo.com/registro"
            required
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Seletor do Email
            </label>
            <input
              type="text"
              value={selectors.email}
              onChange={(e) => setSelectors({...selectors, email: e.target.value})}
              className="input-field"
              placeholder="#email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Seletor da Senha
            </label>
            <input
              type="text"
              value={selectors.password}
              onChange={(e) => setSelectors({...selectors, password: e.target.value})}
              className="input-field"
              placeholder="#password"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Seletor do Botão
            </label>
            <input
              type="text"
              value={selectors.submit}
              onChange={(e) => setSelectors({...selectors, submit: e.target.value})}
              className="input-field"
              placeholder="button[type='submit']"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isRunning}
          className={`w-full py-2 px-4 rounded-lg transition-colors ${
            isRunning
              ? 'bg-gray-600 cursor-not-allowed'
              : 'btn-primary'
          }`}
        >
          {isRunning ? 'Registro em Andamento...' : 'Iniciar Registro Automático'}
        </button>
      </form>
    </div>
  );
}