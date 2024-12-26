import React from 'react';
import type { TempEmail } from '../types/email';

interface StatsProps {
  emails: TempEmail[];
}

export function Stats({ emails }: StatsProps) {
  const total = emails.length;
  const verified = emails.filter(e => e.status === 'verified').length;
  const failed = emails.filter(e => e.status === 'failed').length;
  const pending = total - verified - failed;

  return (
    <div className="grid grid-cols-4 gap-4 mb-6">
      <div className="card p-4">
        <p className="text-sm text-gray-400">Total</p>
        <p className="text-2xl font-bold text-white">{total}</p>
      </div>
      <div className="card p-4">
        <p className="text-sm text-gray-400">Ativos</p>
        <p className="text-2xl font-bold text-green-500">{verified}</p>
      </div>
      <div className="card p-4">
        <p className="text-sm text-gray-400">Pendentes</p>
        <p className="text-2xl font-bold text-yellow-500">{pending}</p>
      </div>
      <div className="card p-4">
        <p className="text-sm text-gray-400">Falhas</p>
        <p className="text-2xl font-bold text-red-500">{failed}</p>
      </div>
    </div>
  );
}