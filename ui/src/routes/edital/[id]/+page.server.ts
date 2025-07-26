// src/routes/edital/[id]/+page.server.ts
import { buscarEditalPorId } from '$lib/server/edital';

export async function load({ params }) {
  const id = params.id;
  const edital = await buscarEditalPorId(id); // função que busca no banco de dados

  if (!edital) {
    return {
      status: 404,
      error: new Error('Edital não encontrado')
    };
  }

  return { edital };
}

