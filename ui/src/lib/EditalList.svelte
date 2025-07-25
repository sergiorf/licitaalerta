<script>
  import { onMount } from 'svelte';

  let keyword = '';
  let editais = [];

  // Mock de dados
  const todosEditais = [
    {
      titulo: 'Aquisição de notebooks',
      orgao: 'Prefeitura de Goiânia',
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
      orgao: 'Ministério da Saúde',
      valor: 980000,
      dataLimite: '2025-08-10'
    }
  ];

  // Filtra conforme keyword
  $: editais = todosEditais.filter(e =>
    e.titulo.toLowerCase().includes(keyword.toLowerCase()) ||
    e.orgao.toLowerCase().includes(keyword.toLowerCase())
  );
</script>

<div class="mb-4">
  <input
    type="text"
    placeholder="Buscar por título ou órgão..."
    bind:value={keyword}
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
