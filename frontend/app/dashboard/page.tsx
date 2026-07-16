'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { api } from '@/lib/api';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  paciente_id: number | null;
}

interface Servico {
  id: number;
  name: string;
}

interface Agendamento {
  id: number;
  appointment_date: string;
  notes: string | null;
  active: number;
  servico: Servico | null;
}

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [loadingAgendamentos, setLoadingAgendamentos] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (!token) {
      router.replace('/login');
      return;
    }

    const currentUser: User = stored ? JSON.parse(stored) : null;
    if (currentUser) {
      setUser(currentUser);
    } else {
      api.me()
        .then((u) => {
          setUser(u);
          localStorage.setItem('user', JSON.stringify(u));
        })
        .catch(() => {
          localStorage.removeItem('token');
          router.replace('/login');
        });
    }
  }, [router]);

  useEffect(() => {
    if (!user) return;

    api.agendamentos
      .list()
      .then(setAgendamentos)
      .catch(() => {})
      .finally(() => setLoadingAgendamentos(false));
  }, [user]);

  function handleLogout() {
    api.logout().finally(() => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      router.replace('/login');
    });
  }

  function handleCancel(id: number) {
    if (!confirm('Deseja cancelar este agendamento?')) return;
    api.agendamentos.cancel(id).then(() => {
      setAgendamentos((prev) =>
        prev.map((a) => (a.id === id ? { ...a, active: 0 } : a))
      );
    });
  }

  if (!user) return null;

  const ativos = agendamentos.filter((a) => a.active === 1);
  const cancelados = agendamentos.filter((a) => a.active === 0);

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

      <div className="max-w-3xl mx-auto mt-10 px-4">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-semibold text-gray-800">
            Olá, {user.name.split(' ')[0]}!
          </h1>
          <Link
            href="/dashboard/agendamentos/novo"
            className="bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition"
          >
            + Novo agendamento
          </Link>
        </div>

        <section>
          <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-3">
            Consultas ativas
          </h2>

          {loadingAgendamentos ? (
            <p className="text-sm text-gray-400">Carregando...</p>
          ) : ativos.length === 0 ? (
            <div className="bg-white rounded-xl border border-gray-100 p-8 text-center">
              <p className="text-gray-500 text-sm">Você não tem consultas agendadas.</p>
              <Link
                href="/dashboard/agendamentos/novo"
                className="mt-3 inline-block text-sm text-purple-600 hover:underline"
              >
                Agendar agora
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {ativos.map((a) => (
                <AgendamentoCard
                  key={a.id}
                  agendamento={a}
                  onCancel={() => handleCancel(a.id)}
                />
              ))}
            </div>
          )}
        </section>

        {cancelados.length > 0 && (
          <section className="mt-8">
            <h2 className="text-sm font-medium text-gray-400 uppercase tracking-wide mb-3">
              Cancelados
            </h2>
            <div className="space-y-3">
              {cancelados.map((a) => (
                <AgendamentoCard key={a.id} agendamento={a} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

function AgendamentoCard({
  agendamento,
  onCancel,
}: {
  agendamento: Agendamento;
  onCancel?: () => void;
}) {
  const date = new Date(agendamento.appointment_date);
  const cancelado = agendamento.active === 0;

  return (
    <div
      className={`bg-white rounded-xl border px-5 py-4 flex items-start justify-between gap-4 ${
        cancelado ? 'border-gray-100 opacity-60' : 'border-gray-100'
      }`}
    >
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm font-medium text-gray-800">
            {date.toLocaleDateString('pt-BR', {
              weekday: 'long',
              day: '2-digit',
              month: 'long',
            })}
          </span>
          <span className="text-gray-400 text-sm">
            às{' '}
            {date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
        {agendamento.servico && (
          <p className="text-sm text-gray-500">{agendamento.servico.name}</p>
        )}
        {agendamento.notes && (
          <p className="text-xs text-gray-400 mt-1">{agendamento.notes}</p>
        )}
      </div>

      <div className="flex items-center gap-3 shrink-0">
        {cancelado ? (
          <span className="text-xs text-red-500 font-medium bg-red-50 px-2 py-0.5 rounded-full">
            Cancelado
          </span>
        ) : (
          <>
            <span className="text-xs text-green-600 font-medium bg-green-50 px-2 py-0.5 rounded-full">
              Confirmado
            </span>
            {onCancel && (
              <button
                onClick={onCancel}
                className="text-xs text-gray-400 hover:text-red-500 transition"
              >
                Cancelar
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
