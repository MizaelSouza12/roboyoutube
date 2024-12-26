import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import type { RegistrationResult } from '../types/registration';

interface RegistrationResultsProps {
  results: RegistrationResult[];
}

export function RegistrationResults({ results }: RegistrationResultsProps) {
  return (
    <div className="card p-6">
      <h2 className="text-lg font-semibold mb-4 text-white">Resultados do Registro</h2>
      <div className="space-y-2 max-h-[500px] overflow-y-auto">
        {results.map((result, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg border border-gray-600">
            <div>
              <p className="font-mono text-sm text-gray-200">{result.email}</p>
              <p className="text-xs text-gray-400">
                {result.timestamp.toLocaleTimeString()}
              </p>
              {result.error && (
                <p className="text-xs text-red-400 mt-1">{result.error}</p>
              )}
            </div>
            <div className="flex items-center gap-2">
              {result.success ? (
                <CheckCircle className="w-5 h-5 text-green-500" />
              ) : (
                <XCircle className="w-5 h-5 text-red-500" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}