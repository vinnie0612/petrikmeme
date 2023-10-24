<script lang="ts">
  import { type Post, upvotePost, downvotePost } from '$lib/types/post';

  import { currentUser } from '$lib/util/pocketbase';

  import Icon from '@iconify/svelte';

  export let post: Post;

  if ($currentUser) {
    // "up" or "down" or "none"
    if (post.upvotes.includes($currentUser.id)) {
      post.isVoted = 'up';
    } else if (post.downvotes.includes($currentUser.id)) {
      post.isVoted = 'down';
    } else {
      post.isVoted = 'none';
    }
  }
</script>

<div class="bg-slate-800 shadow-lg overflow-hidden rounded-xl border border-slate-600">
  <div class="border-b border-slate-600 flex flex-row items-center justify-between">
    <h1 class="p-3 text-2xl font-semibold">
      {post.title}
    </h1>
    <span class="text-3xl p-3 flex flex-row">
      {#if $currentUser}
        <button on:click={async () => (post = await upvotePost(post, $currentUser?.id))}>
          <Icon icon="mingcute:up-fill" class={post.isVoted == 'up' ? 'text-emerald-500' : ''} />
        </button>
        <p class="text-lg">{post.score}</p>
        <button on:click={async () => (post = await downvotePost(post, $currentUser?.id))}>
          <Icon icon="mingcute:down-fill" class={post.isVoted == 'down' ? 'text-red-500' : ''} />
        </button>
      {:else}
        <p class="text-lg">{post.score}</p>
      {/if}
    </span>
  </div>

  <img src={post.image} alt={post.title} class="w-full" />
</div>
