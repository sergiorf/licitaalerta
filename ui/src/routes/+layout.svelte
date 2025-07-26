<script>
  import "../app.css";
</script>

<header class="bg-white shadow-md py-4 px-6">
  <div class="max-w-6xl mx-auto flex items-center justify-between">
    <a href="/" class="flex items-center gap-2">
      <img src="/logo.png" alt="Licita Alerta" class="w-8 h-8" />
      <span class="text-xl font-bold text-blue-800">Licita Alerta</span>
    </a>

    <nav class="flex items-center gap-6 text-blue-700 font-medium">
      <a href="/" class="hover:underline">Home</a>
      <a href="/novo-alerta" class="hover:underline">Criar Alerta</a>
      <a href="/alertas" class="hover:underline">Meus Alertas</a>
    </nav>
  </div>
</header>

<main class="max-w-6xl mx-auto p-6">
  <slot />
</main>
