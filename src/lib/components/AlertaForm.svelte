<script>
  import { onMount } from 'svelte';
  let keyword = '';
  let uf = '';
  let valorMin = '';
  let valorMax = '';
  let tipo = '';

  function salvarAlerta() {
    const alerta = { keyword, uf, valorMin, valorMax, tipo };
    const alertasSalvos = JSON.parse(localStorage.getItem('alertas') || '[]');
    alertasSalvos.push(alerta);
    localStorage.setItem('alertas', JSON.stringify(alertasSalvos));
    alert('Alerta salvo com sucesso!');
    keyword = uf = valorMin = valorMax = tipo = '';
  }
</script>

<div class="bg-white p-6 rounded-lg shadow-md border border-gray-200 max-w-xl mx-auto">
  <h2 class="text-xl font-bold mb-4 text-blue-800">Criar Alerta</h2>
  <div class="space-y-4">
    <input type="text" placeholder="Palavra-chave..." bind:value={keyword} class="w-full px-4 py-2 border rounded" />

    <select bind:value={uf} class="w-full px-4 py-2 border rounded">
      <option value="">Todos os estados</option>
      <option value="GO">GO</option>
      <option value="SP">SP</option>
      <option value="DF">DF</option>
    </select>

    <input type="number" placeholder="Valor mínimo" bind:value={valorMin} class="w-full px-4 py-2 border rounded" />
    <input type="number" placeholder="Valor máximo" bind:value={valorMax} class="w-full px-4 py-2 border rounded" />

    <input type="text" placeholder="Tipo de produto / serviço..." bind:value={tipo} class="w-full px-4 py-2 border rounded" />

    <button on:click={salvarAlerta} class="w-full bg-blue-700 text-white font-bold py-2 rounded hover:bg-blue-800 transition">
      Salvar Alerta
    </button>
  </div>
</div>
