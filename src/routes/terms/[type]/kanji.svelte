<script lang="ts">
  import type { kanjiTerm } from "#lib/database/schema/kanji-term.ts";
  import {
    mastery_effect,
    mastery_effects,
  } from "#lib/mastery-effect.svelte.ts";
  import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "#lib/components/ui/popover/index.ts";

  type Props = {
    groups: [string, (typeof kanjiTerm.$inferSelect)[]][];
  };

  let { groups }: Props = $props();

  const jlptColors: Record<string, string> = {
    N5: "text-green-600 dark:text-green-400",
    N4: "text-sky-600 dark:text-sky-400",
    N3: "text-amber-600 dark:text-amber-400",
    N2: "text-orange-600 dark:text-orange-400",
    N1: "text-red-600 dark:text-red-400",
  };
  const color = (jlpt: string) => jlptColors[jlpt] ?? "text-muted-foreground";

  const mastery_steps = [
    { from: 0, to: 15, opacity: 0.3, mastered: false },
    { from: 15, to: 30, opacity: 0.6, mastered: false },
    { from: 30, to: 50, opacity: 0.85, mastered: false },
    { from: 50, to: 75, opacity: 1, mastered: false },
    { from: 75, to: 100, opacity: 1, mastered: true },
  ];

  const masteryStep = (mastery: number) =>
    mastery_steps.findLast((step) => mastery >= step.from)!;

  const effectClass = (step: { mastered: boolean }) =>
    step.mastered ? mastery_effects[mastery_effect.current] : "";
</script>

<!-- mastery legend -->
<div class="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm">
  {#each mastery_steps as step}
    <div class="flex items-center gap-1.5">
      <span
        class="inline-block text-2xl {effectClass(step)}"
        style:opacity={step.opacity}>字</span
      >
      <span class="text-muted-foreground">{step.from}-{step.to}%</span>
    </div>
  {/each}
</div>

{#each groups as [jlpt, kanjis]}
  <!-- jlpt level header -->
  <div
    class="{color(jlpt)} font-bold text-3xl mt-4 mb-2 text-center"
  >
    {jlpt}
  </div>
  <!-- kanji list block -->
  <div class="flex flex-wrap gap-2 justify-center">
    {#each kanjis as kanji}
      {@const step = masteryStep(kanji.mastery_avg_perc)}
      <div
        class="{color(kanji.jlpt)} bg-card text-4xl"
        style:opacity={step.opacity}
      >
        <Popover>
          <!-- "--fx-delay" - the animation delay based on a kanji id, so they start not at the same time -->
          <PopoverTrigger
            class="cursor-pointer {effectClass(step)}"
            style="--fx-delay: -{(kanji.id % 35) / 10}s"
          >
            {kanji.kanji}
          </PopoverTrigger>
          <PopoverContent class="gap-3 p-3">
            <div class="flex items-start gap-3">
              <span
                class="{color(kanji.jlpt)} inline-block text-5xl leading-none {effectClass(step)}"
                style:opacity={step.opacity}
              >
                {kanji.kanji}
              </span>
              <div class="min-w-0">
                <p class="font-medium">{kanji.definition}</p>
                <p class="text-muted-foreground text-xs">
                  {kanji.jlpt} · Kanken {kanji.kanken} · {kanji.scount} strokes
                </p>
              </div>
            </div>

            <dl class="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1">
              {#if kanji.onyomi}
                <dt class="text-muted-foreground">On</dt>
                <dd>{kanji.onyomi.split(",").join("、")}</dd>
              {/if}
              {#if kanji.kunyomi}
                <dt class="text-muted-foreground">Kun</dt>
                <dd>
                  {#each kanji.kunyomi.split(",") as reading, i}
                    {@const [stem, okurigana] = reading.split(".")}
                    {#if i > 0}、{/if}{stem}{#if okurigana}<span
                        class="text-muted-foreground">{okurigana}</span
                      >{/if}
                  {/each}
                </dd>
              {/if}
              <dt class="text-muted-foreground">Radical</dt>
              <dd>{kanji.radical} ({kanji.radical_name})</dd>
            </dl>

            <div>
              <div class="text-muted-foreground flex justify-between text-xs">
                <span>Mastery {kanji.mastery_avg_perc}%</span>
                <span>
                  {kanji.correct_count} correct · {kanji.missed_count} missed
                </span>
              </div>
              <div class="bg-muted mt-1 h-1.5 overflow-hidden rounded-full">
                <div
                  class="bg-primary h-full"
                  style:width="{kanji.mastery_avg_perc}%"
                ></div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    {/each}
  </div>
{/each}
