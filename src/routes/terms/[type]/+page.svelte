<script lang="ts">
  import type { PageProps } from "./$types";
  import Kanji from "./kanji.svelte";

  let { data }: PageProps = $props();

  const titles = {
    vocab: "Vocabulary",
    kanji: "Kanji",
    grammar: "Grammar",
    sent: "Sentences",
  };
</script>

<h1 class="text-center text-2xl font-medium">
  {titles[data.type]}
</h1>
<div class="m-4 p-1">
  {#if data.type === "kanji"}
    <Kanji groups={data.kanji_by_level} />
  {/if}
</div>
