<script lang="ts">
  import type { Post } from '$lib/types/post';
  export let data: { result: Post[] };
  $: posts = data.result;

  import PostCard from '$lib/component/PostCard.svelte';
</script>

<svelte:head>
  <title>PetrikMeme</title>
</svelte:head>

<main class="">
  <div class="max-w-3xl grid space-y-4 p-4 mx-auto">
    {#each posts as post}
      <PostCard {post} />
    {/each}
  </div>
</main>
