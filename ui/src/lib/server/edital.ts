// src/lib/server/edital.ts

const API_URL = 'http://localhost:8000';

export async function buscarEditalPorId(id: string) {
  const res = await fetch(`${API_URL}/api/edital/${id}`);
  if (!res.ok) return null;
  return await res.json();
}

export async function buscarEditais(pagina: number = 1) {
  const res = await fetch(`${API_URL}/api/edital?page=${pagina}`);
  if (!res.ok) return [];
  return await res.json();
}
