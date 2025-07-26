<script>
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';

  let keyword = '';
  let editais = [];
  let uf = '';
  let valorMin = '';
  let valorMax = '';
  let tipo = '';

  const todosEditais = [
    { id: '1', titulo: 'Aquisição de notebooks', tipo: 'Informática', orgao: 'Prefeitura de Goiânia - GO', valor: 120000, dataLimite: '2025-08-01' },
    { id: '2', titulo: 'Obras em escola municipal', tipo: 'Construção Civil', orgao: 'Governo do Estado de SP', valor: 450000, dataLimite: '2025-08-05' },
    { id: '3', titulo: 'Fornecimento de equipamentos médicos', tipo: 'Equipamentos Médicos', orgao: 'Ministério da Saúde - DF', valor: 980000, dataLimite: '2025-08-10' },
    { id: '4', titulo: 'Construção de UBS', tipo: 'Construção Civil', orgao: 'Prefeitura de Aparecida de Goiânia - GO', valor: 350000, dataLimite: '2025-08-15' },
    { id: '5', titulo: 'Compra de uniformes escolares', tipo: 'Vestuário', orgao: 'Prefeitura de Anápolis - GO', valor: 85000, dataLimite: '2025-08-20' },
    { id: '6', titulo: 'Manutenção de vias urbanas', tipo: 'Infraestrutura Urbana', orgao: 'Prefeitura de São Paulo - SP', valor: 700000, dataLimite: '2025-08-25' }
  ];

  const tiposDisponiveis = [...new Set(todosEditais.map(e => e.tipo))];

  $: editais = todosEditais.filter(e => {
    const matchesKeyword =
      e.titulo.toLowerCase().includes(keyword.toLowerCase()) ||
      e.orgao.toLowerCase().includes(keyword.toLowerCase());

    const ufFromOrgao = e.orgao.split('-').pop()?.trim();
    const matchesUf = !uf || ufFromOrgao === uf;

    const matchesTipo = !tipo || e.tipo === tipo;
    const matchesValorMin = !valorMin || e.valor >= parseFloat(valorMin);
    const matchesValorMax = !valorMax || e.valor <= parseFloat(valorMax);

    return matchesKeyword && matchesUf && matchesTipo && matchesValorMin && matchesValorMax;
  });

  function abrirDetalhes(edital) {
    goto(`/edital/${edital.id}`);
  }

  onMount(() => {
    localStorage.setItem('editais', JSON.stringify(todosEditais));
  });
</script>

<!-- Filtros (igual antes) -->
<div class="bg-white p-5 rounded-lg shadow-md mb-8 border border-gray-200">
  <div class="grid md:grid-cols-5 gap-6">
    <input
      type="text"
      placeholder="Buscar por título ou órgão..."
      bind:value={keyword}
      class="w-full px-4 py-3 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
    />
    <select
      bind:value={uf}
      class="w-full px-4 py-3 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
    >
      <option value="">Todos os estados</option>
      <option value="GO">GO</option>
      <option value="SP">SP</option>
      <option value="DF">DF</option>
    </select>
    <select
      bind:value={tipo}
      class="w-full px-4 py-3 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
    >
      <option value="">Todos os tipos</option>
      {#each tiposDisponiveis as t}
        <option value={t}>{t}</option>
      {/each}
    </select>
    <input
      type="number"
      placeholder="Valor mínimo"
      bind:value={valorMin}
      class="w-full px-4 py-3 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
    />
    <input
      type="number"
      placeholder="Valor máximo"
      bind:value={valorMax}
      class="w-full px-4 py-3 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
    />
  </div>
</div>

<!-- Lista compacta uma linha por edital -->
<div class="bg-white rounded-lg shadow-md border border-gray-200 max-h-[600px] overflow-y-auto">
  {#if editais.length === 0}
    <p class="p-4 text-gray-500 text-center">Nenhum edital encontrado com os filtros aplicados.</p>
  {:else}
    <ul>
      {#each editais as edital}
        <li
          class="px-4 py-2 border-b border-gray-300 cursor-pointer hover:bg-blue-50 flex justify-between items-center text-xs"
          on:click={() => abrirDetalhes(edital)}
          title="Clique para ver detalhes"
        >
          <div class="flex gap-4 min-w-0">
            <span class="font-semibold text-blue-900 truncate max-w-[300px]">{edital.titulo}</span>
            <span class="text-gray-700 truncate max-w-[200px]">{edital.orgao}</span>
            <span class="text-gray-600 whitespace-nowrap">{edital.tipo}</span>
          </div>
          <div class="flex gap-6 items-center min-w-[180px] justify-end">
            <span class="text-green-700 font-semibold whitespace-nowrap">R$ {edital.valor.toLocaleString()}</span>
            <span class="text-gray-600 whitespace-nowrap">🗓️ {edital.dataLimite}</span>
          </div>
        </li>
      {/each}
    </ul>
  {/if}
</div>
