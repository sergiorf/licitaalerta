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
    {
      id: '1',
      titulo: 'Aquisição de notebooks',
      tipo: 'Informática',
      orgao: 'Prefeitura de Goiânia - GO',
      valor: 120000,
      dataLimite: '2025-08-01'
    },
    {
      id: '2',
      titulo: 'Obras em escola municipal',
      tipo: 'Construção Civil',
      orgao: 'Governo do Estado de SP',
      valor: 450000,
      dataLimite: '2025-08-05'
    },
    {
      id: '3',
      titulo: 'Fornecimento de equipamentos médicos',
      tipo: 'Equipamentos Médicos',
      orgao: 'Ministério da Saúde - DF',
      valor: 980000,
      dataLimite: '2025-08-10'
    },
    {
      id: '4',
      titulo: 'Construção de UBS',
      tipo: 'Construção Civil',
      orgao: 'Prefeitura de Aparecida de Goiânia - GO',
      valor: 350000,
      dataLimite: '2025-08-15'
    },
    {
      id: '5',
      titulo: 'Compra de uniformes escolares',
      tipo: 'Vestuário',
      orgao: 'Prefeitura de Anápolis - GO',
      valor: 85000,
      dataLimite: '2025-08-20'
    },
    {
      id: '6',
      titulo: 'Manutenção de vias urbanas',
      tipo: 'Infraestrutura Urbana',
      orgao: 'Prefeitura de São Paulo - SP',
      valor: 700000,
      dataLimite: '2025-08-25'
    }
  ];

  // Gerar lista de tipos únicos para o filtro
  const tiposDisponiveis = [...new Set(todosEditais.map(e => e.tipo))];

  // Aplicar os filtros dinamicamente
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

  // Armazenar os editais no localStorage para simular persistência
  onMount(() => {
    localStorage.setItem('editais', JSON.stringify(todosEditais));
  });
</script>

<!-- Filtros -->
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

<!-- Lista de editais -->
<div class="space-y-3">
  {#if editais.length === 0}
    <p class="text-gray-500 text-center text-lg font-medium">Nenhum edital encontrado com os filtros aplicados.</p>
  {:else}
    {#each editais as edital}
      <article
        class="bg-white p-4 rounded-lg shadow-sm border border-gray-300 hover:shadow-md transition-shadow cursor-pointer"
        on:click={() => abrirDetalhes(edital)}
      >
        <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
          <h2 class="text-lg font-semibold text-blue-900 truncate max-w-sm">{edital.titulo}</h2>
          <p class="text-green-700 font-semibold whitespace-nowrap">R$ {edital.valor.toLocaleString()}</p>
        </div>
        <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 text-gray-700 text-sm mt-1">
          <p class="truncate max-w-sm">{edital.orgao}</p>
          <p class="whitespace-nowrap">🗓️ {edital.dataLimite}</p>
        </div>
        <p class="text-sm text-gray-600 mt-1">🧾 Tipo: <span class="font-medium">{edital.tipo}</span></p>
      </article>
    {/each}
  {/if}
</div>
