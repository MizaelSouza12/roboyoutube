import React from 'react';
import { Mail, RefreshCw, Check, X } from 'lucide-react';
import type { TempEmail } from '../types/email';

interface EmailListProps {
  emails: TempEmail[];
}

export function EmailList({ emails }: EmailListProps) {
  return (
    <div className="card p-6">
      <h2 className="text-lg font-semibold mb-4 text-white">Emails Gerados</h2>
      <div className="space-y-2 max-h-[500px] overflow-y-auto">
        {emails.map((email) => (
          <div key={email.id} className="bg-gray-700 rounded-lg p-4 border border-gray-600">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="font-mono text-sm text-gray-200">{email.address}</p>
                <p className="text-xs text-gray-400">
                  Criado: {new Date(email.createdAt).toLocaleTimeString()}
                </p>
              </div>
              <div className="flex items-center gap-2">
                {email.status === 'monitoring' && (
                  <RefreshCw className="w-4 h-4 text-yellow-500 animate-spin" />
                )}
                {email.status === 'verified' && (
                  <Check className="w-4 h-4 text-green-500" />
                )}
                {email.status === 'failed' && (
                  <X className="w-4 h-4 text-red-500" />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}