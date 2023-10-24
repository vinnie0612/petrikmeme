<script lang="ts">
  import { upvotePost, type Post } from '$lib/types/post';
    import type { Vote } from '$lib/types/vote';
  import { currentUser } from '$lib/util/pocketbase';

  import Icon from '@iconify/svelte';

  export let post: Post;
      // If the post is upvoted by the current user, set the upvoted flag

  let upvoted = false;
  if ($currentUser) {
    if (post.upvotes) {
      upvoted = post.upvotes?.some((v: Vote) => v.user === $currentUser?.id);
    } else {
      post.upvotes = [];
      upvoted = false;
    }
  }
  if (post.downvotes == null || post.downvotes == undefined) {
    post.downvotes = [];
  }
</script>

<div class="bg-slate-800 shadow-lg overflow-hidden rounded-xl border border-slate-600">
  <div class="border-b border-slate-600 flex flex-row items-center justify-between">
    <h1 class="p-3 text-2xl font-semibold ">
      {post.title}
    </h1>
    <span class="text-3xl p-3 flex flex-row">

      {#if upvoted}
      <button>
        <Icon icon="mingcute:up-fill" class="text-teal-400" />
      </button>
      {:else}
      <button on:click={async () => {await upvotePost(post.id, $currentUser?.id)}}>
        <Icon icon="mingcute:up-fill" />
      </button>
      {/if}
      {#if post.upvotes && post.downvotes}
      <p class="text-lg px-2">{post.upvotes.length - post.downvotes.length}</p>
      {/if}
      <Icon icon="mingcute:down-fill" />
    </span>
  </div>

  <img src={post.image} alt={post.title} class="w-full" />
</div>
