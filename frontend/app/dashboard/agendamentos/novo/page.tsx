'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { api } from '@/lib/api';

interface Servico {
  id: number;
  name: string;
  price: number;
  description: string | null;
}

interface Horario {
  id: number;
  data: string;
  hora: string;
}

type HorariosPorData = Record<string, Horario[]>;

export default function NovoAgendamento() {
  const router = useRouter();
  const [servicos, setServicos] = useState<Servico[]>([]);
  const [horariosPorData, setHorariosPorData] = useState<HorariosPorData>({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const [selectedDate, setSelectedDate] = useState('');
  const [selectedHora, setSelectedHora] = useState('');
  const [selectedServico, setSelectedServico] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.replace('/login');
      return;
    }

    Promise.all([api.servicos(), api.horarios()])
      .then(([s, h]: [Servico[], Horario[]]) => {
        setServicos(s);
        const grouped: HorariosPorData = {};
        for (const horario of h) {
          if (!grouped[horario.data]) grouped[horario.data] = [];
          grouped[horario.data].push(horario);
        }
        setHorariosPorData(grouped);
      })
      .catch(() => setError('Erro ao carregar dados.'))
      .finally(() => setLoading(false));
  }, [router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedDate || !selectedHora) {
      setError('Selecione uma data e horário.');
      return;
    }

    setError('');
    setSubmitting(true);

    try {
      const appointment_date = `${selectedDate}T${selectedHora}:00`;
      await api.agendamentos.create({
        appointment_date,
        service_id: selectedServico ? Number(selectedServico) : undefined,
        notes: notes || undefined,
      });
      router.push('/dashboard');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Erro ao agendar.');
    } finally {
      setSubmitting(false);
    }
  }

  const datas = Object.keys(horariosPorData).sort();
  const horariosDisponiveis = selectedDate ? (horariosPorData[selectedDate] ?? []) : [];

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
        <div>
          <span className="font-semibold text-gray-800">Dalila Melo</span>
          <span className="text-gray-400 text-sm ml-2">Psicologia</span>
        </div>
        <Link href="/dashboard" className="text-sm text-purple-600 hover:underline">
          ← Voltar
        </Link>
      </header>

      <div className="max-w-lg mx-auto mt-10 px-4">
        <h1 className="text-xl font-semibold text-gray-800 mb-6">Novo agendamento</h1>

        {loading ? (
          <p className="text-sm text-gray-400">Carregando horários disponíveis...</p>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                {error}
              </div>
            )}

            {datas.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500 text-sm">Não há horários disponíveis no momento.</p>
                <p className="text-gray-400 text-xs mt-1">Entre em contato para agendar.</p>
              </div>
            ) : (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Data
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {datas.map((data) => {
                      const date = new Date(data + 'T00:00:00');
                      return (
                        <button
                          key={data}
                          type="button"
                          onClick={() => {
                            setSelectedDate(data);
                            setSelectedHora('');
                          }}
                          className={`p-2 rounded-lg text-center border text-sm transition ${
                            selectedDate === data
                              ? 'bg-purple-600 border-purple-600 text-white'
                              : 'border-gray-200 text-gray-700 hover:border-purple-400'
                          }`}
                        >
                          <div className="font-medium">
                            {date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}
                          </div>
                          <div className="text-xs opacity-75">
                            {date.toLocaleDateString('pt-BR', { weekday: 'short' })}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {selectedDate && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Horário
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {horariosDisponiveis.map((h) => (
                        <button
                          key={h.id}
                          type="button"
                          onClick={() => setSelectedHora(h.hora.slice(0, 5))}
                          className={`py-2 rounded-lg border text-sm transition ${
                            selectedHora === h.hora.slice(0, 5)
                              ? 'bg-purple-600 border-purple-600 text-white'
                              : 'border-gray-200 text-gray-700 hover:border-purple-400'
                          }`}
                        >
                          {h.hora.slice(0, 5)}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {servicos.length > 0 && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Serviço <span className="text-gray-400 font-normal">(opcional)</span>
                    </label>
                    <select
                      value={selectedServico}
                      onChange={(e) => setSelectedServico(e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition bg-white"
                    >
                      <option value="">Selecione um serviço</option>
                      {servicos.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.name} — R$ {Number(s.price).toFixed(2).replace('.', ',')}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Observações <span className="text-gray-400 font-normal">(opcional)</span>
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={3}
                    placeholder="Alguma informação relevante para a consulta..."
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting || !selectedDate || !selectedHora}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2.5 rounded-lg transition disabled:opacity-60"
                >
                  {submitting ? 'Agendando...' : 'Confirmar agendamento'}
                </button>
              </>
            )}
          </form>
        )}
      </div>
    </main>
  );
}
