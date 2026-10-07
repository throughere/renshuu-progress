<script lang="ts">
  import MoonIcon from "@lucide/svelte/icons/moon";
  import SunIcon from "@lucide/svelte/icons/sun";
  import { mode, toggleMode } from "mode-watcher";
  import { Button } from "#lib/components/ui/button/index.ts";
</script>

<Button
  class="fixed ml-5"
  onclick={toggleMode}
  variant="outline"
  size="icon"
  aria-label="Toggle theme"
>
  {#if mode.current === "dark"}
    <SunIcon />
  {:else}
    <MoonIcon />
  {/if}
</Button>
