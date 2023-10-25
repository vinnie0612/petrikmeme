<script lang="ts">
  import { type Post, upvotePost, downvotePost, deletePost } from '$lib/types/post';
  
  import { currentUser } from '$lib/util/pocketbase';
  
  import PostImage from './PostImage.svelte';
  
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
    <span class="p-3">
      <h1 class="text-xl md:text-2xl font-semibold ml-1 md:mb-1">
        {post.title}
      </h1>
      <p class="text-sm md:text-base text-slate-400 flex flex-row items-center">
        <Icon icon="mdi:calendar" class="text-xl mr-1"/>
        {post.created.split(' ')[0]}
      </p>
    </span>
    
    
    
    <span class="text-3xl p-2 md:p-3 flex md:flex-row flex-col">
      {#if $currentUser && $currentUser.id == post.author}
      <button class="bg-red-600 hover:bg-red-700 transition p-2 rounded-lg mr-2" on:click={async () => {deletePost(post)}}>
        <Icon icon="mdi:trash" class="text-xl" />
      </button>
      {/if}
      {#if $currentUser}
      <button on:click={async () => (post = await upvotePost(post, $currentUser?.id))}>
        <Icon icon="mingcute:up-fill" class={post.isVoted == 'up' ? 'text-emerald-500' : ''} />
      </button>
      <p class="text-lg px-2">{post.score}</p>
      <button on:click={async () => (post = await downvotePost(post, $currentUser?.id))}>
        <Icon icon="mingcute:down-fill" class={post.isVoted == 'down' ? 'text-red-500' : ''} />
      </button>
      {:else}
      <p class="text-lg">{post.score}</p>
      {/if}
      
    </span>
  </div>
  
  <PostImage image={post.image} title={post.title}/>
</div>
