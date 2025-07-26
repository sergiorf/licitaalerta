<!-- src/lib/AlertaForm.svelte -->
<script>
  import { onMount } from 'svelte';
  export let onSave = () => {};

  let keyword = '';
  let uf = '';
  let minValue = '';

  function saveAlert() {
    const alert = { keyword, uf, minValue };
    const alerts = JSON.parse(localStorage.getItem('alerts') || '[]');
    alerts.push(alert);
    localStorage.setItem('alerts', JSON.stringify(alerts));
    onSave(alert);
    keyword = ''; uf = ''; minValue = '';
  }
</script>

<div class="bg-white p-4 rounded shadow mb-4">
  <h2 class="text-lg font-semibold mb-2">Criar Alerta</h2>
  <div class="flex flex-col gap-2">
    <input class="p-2 border rounded" placeholder="Palavra-chave" bind:value={keyword} />
    <input class="p-2 border rounded" placeholder="UF (ex: SP)" bind:value={uf} />
    <input class="p-2 border rounded" placeholder="Valor mínimo" type="number" bind:value={minValue} />
    <button class="bg-blue-600 text-white py-1 px-4 rounded" on:click={saveAlert}>Salvar Alerta</button>
  </div>
</div>
