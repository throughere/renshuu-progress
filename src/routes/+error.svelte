<script lang="ts">
  import { page } from "$app/state";
</script>

<div class="flex flex-col items-center gap-2 py-24">
  <p class="text-6xl font-bold">{page.status}</p>
  <p class="text-muted-foreground text-sm">{page.error?.message}</p>
</div>
