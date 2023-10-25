<script lang="ts">
  export let image: string;
  export let title: string;

  let largeView = false;
</script>

<div>
  <div
    on:click={() => {
      largeView = true;
        document.body.style.overflow = 'hidden'
    }}
    class="hover:cursor-pointer"
  >
    <img class="w-full" src={image} alt={title} />
  </div>
  {#if largeView}
    <div
      on:click={() => {
        largeView = false;
        document.body.style.overflow = ''
      }}
      class="fixed fade-bg w-full h-full top-0 left-0 flex items-center hover:cursor-pointer justify-around z-10"
    >
        <a href={image} target="_blank" on:click={(event) => event.stopPropagation()}>
            <img class="w-full" src={image} alt={title} />
        </a>
    </div>
  {/if}
</div>

<style>
    .fade-bg {
        background-color: rgba(15, 23, 42, 0.95)
    }
</style>