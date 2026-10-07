<script lang="ts">
  import { page } from "$app/state";

  const titles: Record<string, string> = {
    vocab: "Vocabulary",
    kanji: "Kanji",
    grammar: "Grammar",
    sent: "Sentences"
  };
</script>

<h1 class="text-2xl font-medium text-center">{titles[page.params.type ?? ""]}</h1>
