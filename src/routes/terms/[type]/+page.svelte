<script lang="ts">
  import { page } from "$app/state";
  import type { PageProps } from "./$types";
  import Kanji from "./kanji.svelte";

  let { data }: PageProps = $props();

  const titles: Record<string, string> = {
    vocab: "Vocabulary",
    kanji: "Kanji",
    grammar: "Grammar",
    sent: "Sentences",
  };
</script>

<h1 class="text-2xl font-medium text-center">
  {titles[page.params.type ?? ""]}
</h1>
<div class="m-4 p-1">
  {#if page.params.type == "kanji"}
    <Kanji groups={data.kanji_by_level} />
  {/if}
</div>
