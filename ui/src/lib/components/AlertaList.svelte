<!-- src/lib/AlertaList.svelte -->
<script>
  import { onMount } from 'svelte';
  let alerts = [];

  function loadAlerts() {
    alerts = JSON.parse(localStorage.getItem('alerts') || '[]');
  }

  function removeAlert(index) {
    alerts.splice(index, 1);
    localStorage.setItem('alerts', JSON.stringify(alerts));
  }

  onMount(loadAlerts);
</script>

<div class="bg-white p-4 rounded shadow mb-4">
  <h2 class="text-lg font-semibold mb-2">Meus Alertas</h2>
  {#if alerts.length === 0}
    <p class="text-gray-500">Nenhum alerta salvo.</p>
  {:else}
    <ul class="space-y-2">
      {#each alerts as alert, i}
        <li class="flex justify-between bg-gray-50 p-2 rounded">
          <span class="text-sm">
            Palavra-chave: <strong>{alert.keyword}</strong> — UF: <strong>{alert.uf}</strong> — Valor: R$ <strong>{alert.minValue}</strong>
          </span>
          <button class="text-red-500 text-sm" on:click={() => removeAlert(i)}>Excluir</button>
        </li>
      {/each}
    </ul>
  {/if}
</div>
