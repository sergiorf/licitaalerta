<script>
  import AlertaForm from '$lib/components/AlertaForm.svelte';

  function handleNewAlert(alert) {
    console.log('Novo alerta premium:', alert);
    // Futuro: salvar no backend
  }
</script>

<main class="p-6 max-w-3xl mx-auto">
  <h2 class="text-2xl font-bold mb-4">Criar novo alerta</h2>
  <AlertaForm onSave={handleNewAlert} />
</main>
