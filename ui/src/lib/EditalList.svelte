<script>
  import { onMount } from 'svelte';

  let keyword = '';
  let editais = [];
  let uf = '';
  let valorMin = '';
  let valorMax = '';

  // Mock de dados
  const todosEditais = [
    {
      titulo: 'Aquisição de notebooks',
      orgao: 'Prefeitura de Goiânia - GO',
      valor: 120000,
      dataLimite: '2025-08-01'
    },
    {
      titulo: 'Obras em escola municipal',
      orgao: 'Governo do Estado de SP',
      valor: 450000,
      dataLimite: '2025-08-05'
    },
    {
      titulo: 'Fornecimento de equipamentos médicos',
      orgao: 'Ministério da Saúde - DF',
      valor: 980000,
      dataLimite: '2025-08-10'
    },
    {
      titulo: 'Construção de UBS',
      orgao: 'Prefeitura de Aparecida de Goiânia - GO',
      valor: 350000,
      dataLimite: '2025-08-15'
    },
    {
      titulo: 'Compra de uniformes escolares',
      orgao: 'Prefeitura de Anápolis - GO',
      valor: 85000,
      dataLimite: '2025-08-20'
    },
    {
      titulo: 'Manutenção de vias urbanas',
      orgao: 'Prefeitura de São Paulo - SP',
      valor: 700000,
      dataLimite: '2025-08-25'
    }
  ];

  // Filtra conforme keyword
  $: editais = todosEditais.filter(e => {
    const matchesKeyword =
      e.titulo.toLowerCase().includes(keyword.toLowerCase()) ||
      e.orgao.toLowerCase().includes(keyword.toLowerCase());

    const ufFromOrgao = e.orgao.split('-').pop()?.trim();
    const matchesUf = !uf || ufFromOrgao === uf;

    const matchesValorMin = !valorMin || e.valor >= parseFloat(valorMin);
    const matchesValorMax = !valorMax || e.valor <= parseFloat(valorMax);

    return matchesKeyword && matchesUf && matchesValorMin && matchesValorMax;
  });
</script>

<!-- Filtros dinâmicos -->
<div class="grid md:grid-cols-4 gap-4 mb-4">
  <!-- Filtro por palavra-chave -->
  <input
    type="text"
    placeholder="Buscar por título ou órgão..."
    bind:value={keyword}
    class="w-full px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
  />

  <!-- Filtro por UF -->
  <select
    bind:value={uf}
    class="w-full px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
  >
    <option value="">Todos os estados</option>
    <option value="GO">GO</option>
    <option value="SP">SP</option>
    <option value="DF">DF</option>
  </select>

  <!-- Filtro por valor mínimo -->
  <input
    type="number"
    placeholder="Valor mínimo"
    bind:value={valorMin}
    class="w-full px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
  />

  <!-- Filtro por valor máximo -->
  <input
    type="number"
    placeholder="Valor máximo"
    bind:value={valorMax}
    class="w-full px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
</div>

<div class="space-y-4">
  {#if editais.length === 0}
    <p class="text-gray-500">Nenhum edital encontrado.</p>
  {:else}
    {#each editais as edital}
      <div class="bg-white p-4 rounded shadow">
        <h2 class="text-xl font-semibold">{edital.titulo}</h2>
        <p><strong>Órgão:</strong> {edital.orgao}</p>
        <p><strong>Valor estimado:</strong> R$ {edital.valor.toLocaleString()}</p>
        <p><strong>Data limite:</strong> {edital.dataLimite}</p>
      </div>
    {/each}
  {/if}
</div>
