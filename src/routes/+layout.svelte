<script lang="ts">
  import "./layout.css";
  import favicon from "#lib/assets/favicon.svg";
  import { page } from "$app/state";
  import { ModeWatcher } from "mode-watcher";
  import UserIcon from "@lucide/svelte/icons/user";
  import ModeToggle from "#lib/components/mode-toggle.svelte";
  import EffectPicker from "#lib/components/effect-picker.svelte";
  import { Input } from "#lib/components/ui/input/index.ts";
  import type { LayoutProps } from "./$types";

  let { data, children }: LayoutProps = $props();
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<ModeWatcher />
<header class="bg-background/80 sticky top-0 z-40 border-b backdrop-blur">
  <div class="mx-auto flex h-14 max-w-[1920px] items-center gap-3 px-4">
    <a href="/{page.url.search}" class="flex items-center gap-2 font-semibold">
      <span
        class="bg-primary text-primary-foreground grid size-8 place-items-center rounded-lg"
      >
        練
      </span>
      <span class="hidden sm:inline">Renshuu progress</span>
    </a>

    <form class="relative ml-auto w-40 sm:w-56">
      <UserIcon
        class="text-muted-foreground pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2"
      />
      <Input
        class="pl-8"
        name="id"
        inputmode="numeric"
        pattern="[0-9]*"
        placeholder="Profile id"
        aria-label="Renshuu profile id"
        value={data.id}
        onchange={(event) => event.currentTarget.form?.requestSubmit()}
      />
    </form>
    <EffectPicker />
    <ModeToggle />
  </div>
</header>

<main class="pt-4">
  {@render children()}
</main>
