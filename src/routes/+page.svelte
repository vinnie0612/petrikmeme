<script>
  import { currentUser, signIn, signOut } from '$lib/util/pocketbase';

  export let data;

  // Just to see
  import PostCard from '$lib/component/PostCard.svelte';
  import { onMount } from 'svelte';
</script>

<main class="">
  <div class="max-w-3xl grid space-y-4 p-4 mx-auto">
    {#each data.result as post}
      <PostCard {post} />
    {/each}
  </div>
</main>
