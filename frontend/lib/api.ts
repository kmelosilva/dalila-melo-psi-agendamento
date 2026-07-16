const BASE_URL = 'http://localhost:8000/api';

async function request(path: string, options: RequestInit = {}) {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers ?? {}),
    },
  });

  const data = await res.json();

  if (!res.ok) {
    const message =
      data?.errors
        ? Object.values(data.errors as Record<string, string[]>).flat().join(' ')
        : (data?.message ?? 'Erro inesperado.');
    throw new Error(message);
  }

  return data;
}

export const api = {
  register: (body: { name: string; email: string; password: string }) =>
    request('/register', { method: 'POST', body: JSON.stringify(body) }),

  login: (body: { email: string; password: string }) =>
    request('/login', { method: 'POST', body: JSON.stringify(body) }),

  logout: () => request('/logout', { method: 'POST' }),

  me: () => request('/me'),

  servicos: () => request('/servicos'),

  horarios: () => request('/horarios'),

  agendamentos: {
    list: () => request('/agendamentos'),
    create: (body: { service_id?: number; appointment_date: string; notes?: string }) =>
      request('/agendamentos', { method: 'POST', body: JSON.stringify(body) }),
    cancel: (id: number) =>
      request(`/agendamentos/${id}`, { method: 'DELETE' }),
  },
};
