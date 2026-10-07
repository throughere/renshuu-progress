<script lang="ts">
  import "./layout.css";
  import favicon from "#lib/assets/favicon.svg";
  import { ModeWatcher } from "mode-watcher";
  import ModeToggle from "#lib/components/mode-toggle.svelte";
  import { Input } from "#lib/components/ui/input/index.ts";
  import type { LayoutProps } from "./$types";

  let { data, children }: LayoutProps = $props();
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<ModeWatcher />
<ModeToggle />
<form class="flex mt-2 ml-20 mr-20 mb-2 text-center gap-2">
  <Input
    class="text-center"
    name="id"
    type="number"
    placeholder="renshuu profile id"
    defaultValue={data.default_id}
    onchange={(event) => event.currentTarget.form?.requestSubmit()}
  />
</form>

{@render children()}
