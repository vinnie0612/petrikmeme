<script lang="ts">
  import type { Post } from '$lib/types/post';
  export let data: { result: Post[] };

  import PostCard from '$lib/component/PostCard.svelte';
</script>

<main class="">
  <div class="max-w-3xl grid space-y-4 p-4 mx-auto">
    {#each data.result as post}
      <PostCard {post} />
    {/each}
  </div>
</main>
