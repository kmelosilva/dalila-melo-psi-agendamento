'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (!token) {
      router.replace('/cadastro');
      return;
    }

    if (stored) {
      setUser(JSON.parse(stored));
    } else {
      api.me()
        .then(setUser)
        .catch(() => {
          localStorage.removeItem('token');
          router.replace('/cadastro');
        });
    }
  }, [router]);

  function handleLogout() {
    api.logout().finally(() => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      router.replace('/cadastro');
    });
  }

  if (!user) return null;

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
        <div>
          <span className="font-semibold text-gray-800">Dalila Melo</span>
          <span className="text-gray-400 text-sm ml-2">Psicologia</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">{user.name}</span>
          <button
            onClick={handleLogout}
            className="text-sm text-purple-600 hover:underline"
          >
            Sair
          </button>
        </div>
      </header>

      <div className="max-w-2xl mx-auto mt-16 px-4 text-center">
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">
          Olá, {user.name.split(' ')[0]}!
        </h1>
        <p className="text-gray-500">Seu cadastro foi realizado com sucesso.</p>
        <p className="text-gray-400 text-sm mt-2">
          Em breve você poderá agendar suas consultas por aqui.
        </p>
      </div>
    </main>
  );
}
