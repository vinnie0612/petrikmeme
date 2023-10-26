<script lang="ts">
  import '$lib/style/app.css';
  import Navbar from '$lib/component/Navbar.svelte';
</script>

<div class="flex flex-col bg-slate-200 dark:bg-slate-700 text-white">
  <div class="fixed w-full">
    <Navbar />
  </div>
  <div class="mt-24">
    <slot />
  </div>
</div>
