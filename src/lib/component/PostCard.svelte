<script lang="ts">
  import type { Post } from '$lib/types/post';

  import Icon from '@iconify/svelte';

  export let post: Post;
</script>

<div class="bg-slate-800 shadow-lg overflow-hidden rounded-xl border border-slate-600">
  <div class="border-b border-slate-600 flex flex-row items-center justify-between">
    <h1 class="p-3 text-2xl font-semibold ">
      {post.title}
    </h1>
    <span class="text-3xl p-3 flex flex-row">

      <Icon icon="mingcute:up-fill" />
      <p class="text-lg px-2">0</p>
      <Icon icon="mingcute:down-fill" />
    </span>
  </div>

  <img src={post.image} alt={post.title} class="w-full" />
</div>
