<script>
  import { onMount } from 'svelte';

  let alertas = [];

  onMount(() => {
    const alertasSalvos = JSON.parse(localStorage.getItem('alertas') || '[]');
    alertas = Array.isArray(alertasSalvos) ? alertasSalvos : [];
  });
</script>

<div class="bg-white p-6 rounded-lg shadow-md border border-gray-200 max-w-3xl mx-auto mt-8">
  <h2 class="text-xl font-bold mb-4 text-blue-800">Meus Alertas</h2>
  
  {#if alertas.length === 0}
    <p class="text-gray-600">Nenhum alerta salvo.</p>
  {:else}
    <ul class="space-y-4">
      {#each alertas as alerta}
        <li class="border border-gray-300 p-4 rounded-lg shadow-sm">
          <p><strong>Palavra-chave:</strong> {alerta.keyword || '—'}</p>
          <p><strong>UF:</strong> {alerta.uf || 'Todos'}</p>
          <p><strong>Valor:</strong> R$ {alerta.valorMin || '0'} — R$ {alerta.valorMax || '∞'}</p>
          <p><strong>Tipo de Produto / Serviço:</strong> {alerta.tipo || 'Qualquer'}</p>
        </li>
      {/each}
    </ul>
  {/if}
</div>
