<script lang="ts">
  import { currentUser, signIn, signOut } from '$lib/util/pocketbase';
</script>

<nav class="bg-slate-800 py-4 px-3 justify-between flex items-center">
  <a class="text-2xl font-bold" href="/">Petrikmeme:3</a>
  {#if $currentUser}
    <button on:click={signOut} class="bg-slate-600 hover:bg-slate-700 transition p-2 rounded-lg"
      >Kilépés</button
    >
  {:else}
    <button on:click={signIn} class="bg-teal-400 p-2 rounded-lg text-slate-800">Belépés</button>
  {/if}
</nav>
{#if $currentUser}
  <div class="bg-teal-400 text-center text-slate-950">
    {$currentUser.email}
  </div>
{:else}
  <div class="bg-slate-400 text-center text-slate-950">Nem vagy belépve!</div>
{/if}
