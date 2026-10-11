<script lang="ts">
  import { onMount } from "svelte";
  import SparklesIcon from "@lucide/svelte/icons/sparkles";
  import CheckIcon from "@lucide/svelte/icons/check";
  import { buttonVariants } from "#lib/components/ui/button/index.ts";
  import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "#lib/components/ui/popover/index.ts";
  import {
    mastery_effect,
    mastery_effects,
    restoreMasteryEffect,
    setMasteryEffect,
    type MasteryEffect,
  } from "#lib/mastery-effect.svelte.ts";

  let open = $state(false);

  onMount(restoreMasteryEffect);
</script>

<Popover bind:open>
  <PopoverTrigger
    class={buttonVariants({ variant: "outline", size: "icon" })}
    aria-label="Effect for mastered kanji"
  >
    <SparklesIcon />
  </PopoverTrigger>
  <PopoverContent class="w-56 gap-0.5 p-1" align="end">
    <p class="text-muted-foreground px-2 py-1 text-xs">Effect for 75-100% kanji</p>
    {#each Object.entries(mastery_effects) as [name, effect_class]}
      <button
        class="hover:bg-accent flex items-center gap-3 rounded-md px-2 py-1.5 text-left text-sm"
        onclick={() => {
          setMasteryEffect(name as MasteryEffect);
          open = false;
        }}
      >
        <span class="inline-block text-xl {effect_class}">字</span>
        <span class="flex-1">{name}</span>
        {#if mastery_effect.current === name}
          <CheckIcon class="size-4" />
        {/if}
      </button>
    {/each}
  </PopoverContent>
</Popover>
