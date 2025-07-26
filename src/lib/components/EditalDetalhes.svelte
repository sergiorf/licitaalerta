<!-- src/lib/components/EditalDetalhes.svelte -->
<script>
  export let edital;
  import { goto } from '$app/navigation';

  function criarAlertaComBase() {
    const params = new URLSearchParams({
      keyword: edital.titulo || '',
      uf: edital.uf || '',
      tipo: edital.tipo || ''
    });
    goto(`/premium/alerta/novo?${params.toString()}`);
  }
</script>

<div class="bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto mt-8">
  <h2 class="text-2xl font-bold mb-4 text-blue-800">{edital.titulo}</h2>
  <p><strong>UF:</strong> {edital.uf}</p>
  <p><strong>Órgão:</strong> {edital.orgao}</p>
  <p><strong>Tipo:</strong> {edital.tipo}</p>
  <p><strong>Valor estimado:</strong> R$ {edital.valor}</p>
  <p class="mt-4 text-gray-700 whitespace-pre-line">{edital.descricao}</p>

  <button
    on:click={criarAlertaComBase}
    class="mt-6 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
  >
    Criar Alerta com base neste edital
  </button>
</div>
