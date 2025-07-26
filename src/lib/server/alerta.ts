// src/lib/server/alerta.ts

const API_URL = 'http://localhost:8000';

export async function criarAlerta(baseEditalId: string) {
  const res = await fetch(`${API_URL}/api/alerta`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ base_id: baseEditalId })
  });

  if (!res.ok) {
    throw new Error('Erro ao criar alerta');
  }

  return await res.json();
}
