<script>
  let keyword = '';
  let editais = [];
  let uf = '';
  let valorMin = '';
  let valorMax = '';

  const todosEditais = [
    { titulo: 'Aquisição de notebooks', orgao: 'Prefeitura de Goiânia - GO', valor: 120000, dataLimite: '2025-08-01' },
    { titulo: 'Obras em escola municipal', orgao: 'Governo do Estado de SP', valor: 450000, dataLimite: '2025-08-05' },
    { titulo: 'Fornecimento de equipamentos médicos', orgao: 'Ministério da Saúde - DF', valor: 980000, dataLimite: '2025-08-10' },
    { titulo: 'Construção de UBS', orgao: 'Prefeitura de Aparecida de Goiânia - GO', valor: 350000, dataLimite: '2025-08-15' },
    { titulo: 'Compra de uniformes escolares', orgao: 'Prefeitura de Anápolis - GO', valor: 85000, dataLimite: '2025-08-20' },
    { titulo: 'Manutenção de vias urbanas', orgao: 'Prefeitura de São Paulo - SP', valor: 700000, dataLimite: '2025-08-25' }
  ];

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

  function abrirDetalhes(edital) {
    alert(`Detalhes do edital:\n\n${edital.titulo}\n${edital.orgao}\nValor: R$ ${edital.valor.toLocaleString()}\nData limite: ${edital.dataLimite}`);
  }
</script>

<!-- Filtros iguais ao anterior -->
<div class="bg-white p-5 rounded-lg shadow-md mb-8 border border-gray-200">
  <div class="grid md:grid-cols-4 gap-6">
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

<!-- Lista compacta -->
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
          <p class="text-green-700 font-semibold whitespace-nowrap">
            R$ {edital.valor.toLocaleString()}
          </p>
        </div>
        <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 text-gray-700 text-sm mt-1">
          <p class="truncate max-w-sm">{edital.orgao}</p>
          <p class="whitespace-nowrap">🗓️ {edital.dataLimite}</p>
        </div>
      </article>
    {/each}
  {/if}
</div>
